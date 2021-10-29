
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert$2(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text$1(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text$1(' ');
    }
    function empty() {
        return text$1('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert$2(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/lib/Page.svelte generated by Svelte v3.43.0 */
    const file$k = "src/lib/Page.svelte";

    function create_fragment$l(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "side svelte-z87gs9");
    			add_location(div0, file$k, 24, 2, 563);
    			attr_dev(div1, "class", "container svelte-z87gs9");
    			add_location(div1, file$k, 25, 2, 586);
    			attr_dev(div2, "class", "side svelte-z87gs9");
    			add_location(div2, file$k, 28, 2, 634);
    			attr_dev(div3, "class", "row svelte-z87gs9");
    			add_location(div3, file$k, 23, 0, 543);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t0);
    			append_dev(div3, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, ['default']);
    	let cmp;

    	onMount(() => {
    	}); // const cb = function (entries) {
    	//   if (entries[0].intersectionRatio > 0.2) {
    	//     if (history.pushState) {
    	//       history.pushState(null, null, '#' + name)

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onMount, cmp });

    	$$self.$inject_state = $$props => {
    		if ('cmp' in $$props) cmp = $$props.cmp;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$$scope, slots];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/lib/One.svelte generated by Svelte v3.43.0 */

    const file$j = "src/lib/One.svelte";

    function create_fragment$k(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "body svelte-10fnxb0");
    			set_style(div0, "border-left", "3px solid " + /*left*/ ctx[0]);
    			add_location(div0, file$j, 6, 4, 92);
    			add_location(div1, file$j, 9, 4, 179);
    			attr_dev(div2, "class", "box svelte-10fnxb0");
    			add_location(div2, file$j, 5, 2, 70);
    			attr_dev(div3, "class", "column svelte-10fnxb0");
    			add_location(div3, file$j, 4, 0, 47);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div2, t);
    			append_dev(div2, div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 1) {
    				set_style(div0, "border-left", "3px solid " + /*left*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('One', slots, ['default']);
    	let { left = 'none' } = $$props;
    	const writable_props = ['left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<One> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ left });

    	$$self.$inject_state = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [left, $$scope, slots];
    }

    class One extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get left() {
    		throw new Error("<One>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<One>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Two.svelte generated by Svelte v3.43.0 */

    const file$i = "src/lib/Two.svelte";

    function create_fragment$j(ctx) {
    	let div3;
    	let div0;
    	let t;
    	let div2;
    	let div1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div0, file$i, 5, 2, 70);
    			attr_dev(div1, "class", "body svelte-1li13tp");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			add_location(div1, file$i, 7, 4, 102);
    			attr_dev(div2, "class", "box svelte-1li13tp");
    			add_location(div2, file$i, 6, 2, 80);
    			attr_dev(div3, "class", "column svelte-1li13tp");
    			add_location(div3, file$i, 4, 0, 47);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 1) {
    				set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Two', slots, ['default']);
    	let { left = 'none' } = $$props;
    	const writable_props = ['left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Two> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ left });

    	$$self.$inject_state = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [left, $$scope, slots];
    }

    class Two extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get left() {
    		throw new Error("<Two>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Two>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Three.svelte generated by Svelte v3.43.0 */

    const file$h = "src/lib/Three.svelte";

    function create_fragment$i(ctx) {
    	let div3;
    	let div0;
    	let t;
    	let div2;
    	let div1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div0, file$h, 5, 2, 70);
    			attr_dev(div1, "class", "body svelte-qqah7g");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			add_location(div1, file$h, 7, 4, 102);
    			attr_dev(div2, "class", "box svelte-qqah7g");
    			add_location(div2, file$h, 6, 2, 80);
    			attr_dev(div3, "class", "column svelte-qqah7g");
    			add_location(div3, file$h, 4, 0, 47);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 1) {
    				set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Three', slots, ['default']);
    	let { left = 'none' } = $$props;
    	const writable_props = ['left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Three> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ left });

    	$$self.$inject_state = $$props => {
    		if ('left' in $$props) $$invalidate(0, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [left, $$scope, slots];
    }

    class Three$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get left() {
    		throw new Error("<Three>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Three>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Left.svelte generated by Svelte v3.43.0 */

    const file$g = "src/lib/Left.svelte";

    function create_fragment$h(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "body svelte-l0y2fi");
    			attr_dev(div0, "style", "");
    			add_location(div0, file$g, 5, 4, 65);
    			add_location(div1, file$g, 8, 4, 123);
    			attr_dev(div2, "class", "box svelte-l0y2fi");
    			add_location(div2, file$g, 4, 2, 43);
    			attr_dev(div3, "class", "column svelte-l0y2fi");
    			add_location(div3, file$g, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div2, t);
    			append_dev(div2, div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Left', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Left> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Left extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Left",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/lib/Row.svelte generated by Svelte v3.43.0 */

    const file$f = "src/lib/Row.svelte";

    function create_fragment$g(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "row svelte-hha4zt");
    			add_location(div, file$f, 5, 0, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Row', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/lib/Block.svelte generated by Svelte v3.43.0 */

    const file$e = "src/lib/Block.svelte";

    function create_fragment$f(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "block svelte-4rb7y9");
    			set_style(div, "background-color", /*color*/ ctx[0]);
    			add_location(div, file$e, 4, 0, 53);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 1) {
    				set_style(div, "background-color", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Block', slots, []);
    	let { color = 'steelblue' } = $$props;
    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Block> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ color });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color];
    }

    class Block extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Block",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get color() {
    		throw new Error("<Block>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Block>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Ratio.svelte generated by Svelte v3.43.0 */

    const file$d = "src/lib/Ratio.svelte";

    function create_fragment$e(ctx) {
    	let div;
    	let div_resize_listener;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "container svelte-qzc69a");
    			set_style(div, "height", /*height*/ ctx[1] + "px");
    			add_render_callback(() => /*div_elementresize_handler*/ ctx[5].call(div));
    			add_location(div, file$d, 6, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[5].bind(div));
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*height*/ 2) {
    				set_style(div, "height", /*height*/ ctx[1] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			div_resize_listener();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let height;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ratio', slots, ['default']);
    	let { ratio = 0.5 } = $$props;
    	let clientWidth = 100;
    	const writable_props = ['ratio'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Ratio> was created with unknown prop '${key}'`);
    	});

    	function div_elementresize_handler() {
    		clientWidth = this.clientWidth;
    		$$invalidate(0, clientWidth);
    	}

    	$$self.$$set = $$props => {
    		if ('ratio' in $$props) $$invalidate(2, ratio = $$props.ratio);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ ratio, clientWidth, height });

    	$$self.$inject_state = $$props => {
    		if ('ratio' in $$props) $$invalidate(2, ratio = $$props.ratio);
    		if ('clientWidth' in $$props) $$invalidate(0, clientWidth = $$props.clientWidth);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*clientWidth, ratio*/ 5) {
    			$$invalidate(1, height = clientWidth / ratio);
    		}
    	};

    	return [clientWidth, height, ratio, $$scope, slots, div_elementresize_handler];
    }

    class Ratio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { ratio: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ratio",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get ratio() {
    		throw new Error("<Ratio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ratio(value) {
    		throw new Error("<Ratio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var combos = [
         [ '#6699cc', '#C4ABAB', '#335799', '#8C8C88', '#F2C0BB', '#6D5685' ],
         [ '#914045', '#cc7066', '#cc8a66', '#603a39', '#705E5C', '#8BA3A2' ],
         [ '#8a849a', '#b5b0bf', '#D68881', '#d7d5d2', '#8BA3A2', '#C4ABAB' ],
         [ '#cc7066', '#335799', '#7f9c6c', '#F2C0BB', '#9c896c', '#2D85A8' ],
         [ '#848f9a', '#9aa4ac', '#8C8C88', '#b0b8bf', '#C4ABAB', '#838B91' ],
         [ '#2D85A8', '#50617A', '#735873', '#8C8C88', '#C4ABAB', '#4d4d4d' ],
         [ '#6accb2', '#705E5C', '#cc8a66', '#cc7066', '#7f9c6c', '#6699cc' ],
         [ '#303b50', '#335799', '#e6d7b3', '#914045', '#C4ABAB', '#838B91' ],
         [ '#C4ABAB', '#8C8C88', '#705E5C', '#2D85A8', '#e6d7b3', '#cc7066' ],
         [ '#6699cc', '#6accb2', '#e1e6b3', '#cc7066', '#F2C0BB', '#a3a5a5' ],
         [ '#C4ABAB', '#cc6966', '#275291', '#914045', '#8BA3A2', '#978BA3' ],
         [ '#cc7066', '#2D85A8', '#c67a53', '#8BA3A2', '#dfb59f', '#C4ABAB' ]
    ];

    /* eslint-disable no-bitwise */

    /* eslint-disable no-bitwise */
    // function xorShift(seed){
    //   seed ^= seed << 13;
    //   seed ^= seed >> 17;
    //   seed ^= seed << 5;
    //   let pos= (seed <0)?~seed+1: seed; //2's complement of the negative result to make all numbers positive.
    //   pos= pos%10000
    //   pos=pos/10000
    //   if(pos===0){
    //     pos=0.836
    //   }
    //   return pos
    // }

    // const toNum=function(seed){
    //   let sum=0
    //   for (let i = 0; i < seed.length; i += 1){
    //     sum+=seed.charCodeAt(i)
    //   }
    //   return sum
    // }

    // const getNums=function(seed, num=4){
    //   if(typeof seed==='string'){
    //     seed=toNum(seed)
    //   }
    //   let arr=[]
    //   for (let i = 0; i < num; i += 1){
    //     let n=middleSquare(seed)
    //     arr.push(n/1000)
    //     seed=n
    //   }
    //   return arr
    // }

    function generate() {
      return 'xxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16)
      })
    }

    const getNums = function (seed) {
      let arr = [];
      for (let i = 0; i < seed.length; i += 1) {
        let num = parseInt(seed[i], 16);
        arr.push(num / 16);
      }
      return arr
    };

    function pick(input, num) {
      return input[Math.floor(num * input.length)]
    }
    // export default { generate, getNums, pick }

    // let seed=generate()
    // console.log(seed,fromID(seed))
    // let nums=getNums(seed,4)
    // console.log(nums)
    // let num=nums.pop()
    // console.log(num,pick([],num))

    // console.log(mulberry32(1331))

    /* src/lib/Grid/Grid.svelte generated by Svelte v3.43.0 */
    const file$c = "src/lib/Grid/Grid.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (52:38) 
    function create_if_block_3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "img " + /*cell*/ ctx[10].size + " svelte-vjklc0");
    			set_style(div, "background-image", "url(" + /*cell*/ ctx[10].image + ")");
    			add_location(div, file$c, 52, 8, 1480);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(52:38) ",
    		ctx
    	});

    	return block;
    }

    // (50:38) 
    function create_if_block_2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "color " + /*cell*/ ctx[10].size + " svelte-vjklc0");
    			set_style(div, "background-color", /*cell*/ ctx[10].color);
    			add_location(div, file$c, 50, 8, 1360);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(50:38) ",
    		ctx
    	});

    	return block;
    }

    // (48:6) {#if cell.type === 'empty'}
    function create_if_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			add_location(div, file$c, 48, 8, 1305);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(48:6) {#if cell.type === 'empty'}",
    		ctx
    	});

    	return block;
    }

    // (47:4) {#each cells as cell}
    function create_each_block(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*cell*/ ctx[10].type === 'empty') return create_if_block_1;
    		if (/*cell*/ ctx[10].type === 'color') return create_if_block_2;
    		if (/*cell*/ ctx[10].type === 'image') return create_if_block_3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (if_block) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(47:4) {#each cells as cell}",
    		ctx
    	});

    	return block;
    }

    // (41:0) <Ratio {ratio}>
    function create_default_slot$6(ctx) {
    	let div;
    	let each_value = /*cells*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "goldGrid svelte-vjklc0");
    			set_style(div, "grid-template-columns", "repeat(" + /*cols*/ ctx[3] + ", 1fr)");
    			set_style(div, "grid-template-rows", "repeat(" + /*rows*/ ctx[2] + ", 1fr)");
    			add_location(div, file$c, 41, 2, 1108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*cells*/ 32) {
    				each_value = /*cells*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*cols*/ 8) {
    				set_style(div, "grid-template-columns", "repeat(" + /*cols*/ ctx[3] + ", 1fr)");
    			}

    			if (dirty & /*rows*/ 4) {
    				set_style(div, "grid-template-rows", "repeat(" + /*rows*/ ctx[2] + ", 1fr)");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(41:0) <Ratio {ratio}>",
    		ctx
    	});

    	return block;
    }

    // (59:0) {#if demo}
    function create_if_block(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text$1(/*seed*/ ctx[0]);
    			attr_dev(div, "class", "f1");
    			add_location(div, file$c, 59, 2, 1612);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*seed*/ 1) set_data_dev(t, /*seed*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(59:0) {#if demo}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let ratio_1;
    	let t;
    	let if_block_anchor;
    	let current;

    	ratio_1 = new Ratio({
    			props: {
    				ratio: /*ratio*/ ctx[1],
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*demo*/ ctx[4] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(ratio_1.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(ratio_1, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const ratio_1_changes = {};
    			if (dirty & /*ratio*/ 2) ratio_1_changes.ratio = /*ratio*/ ctx[1];

    			if (dirty & /*$$scope, cols, rows*/ 8204) {
    				ratio_1_changes.$$scope = { dirty, ctx };
    			}

    			ratio_1.$set(ratio_1_changes);

    			if (/*demo*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ratio_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ratio_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ratio_1, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, []);
    	let { images = [] } = $$props;
    	let { image = null } = $$props;
    	let { ratio = 1.618 } = $$props; //0.382
    	let { rows = 3 } = $$props;
    	let { cols = 3 } = $$props;
    	let { seed = null } = $$props;
    	let demo = false;

    	if (seed === null) {
    		seed = generate();
    		demo = true;
    	}

    	let nums = getNums(seed);

    	if (image && images.length === 0) {
    		images.push(image);
    	}

    	let colors = pick(combos, nums.pop());
    	let cells = [];

    	for (let i = 0; i < rows * cols; i += 1) {
    		let type = pick(['empty', 'empty', 'empty', 'color', 'image'], nums.pop());

    		if (images.length === 0 && type === 'image') {
    			type = 'color';
    		}

    		let cell = { type };

    		if (type === 'color') {
    			cell.color = pick(colors, nums.pop());
    			cell.size = pick(['one', 'one', 'row2', 'col2', 'four'], nums.pop());
    		}

    		if (type === 'image') {
    			cell.image = pick(images, nums.pop());
    			cell.size = pick(['one', 'row2', 'col2', 'four'], nums.pop());
    		}

    		cells.push(cell);
    	}

    	const writable_props = ['images', 'image', 'ratio', 'rows', 'cols', 'seed'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('images' in $$props) $$invalidate(6, images = $$props.images);
    		if ('image' in $$props) $$invalidate(7, image = $$props.image);
    		if ('ratio' in $$props) $$invalidate(1, ratio = $$props.ratio);
    		if ('rows' in $$props) $$invalidate(2, rows = $$props.rows);
    		if ('cols' in $$props) $$invalidate(3, cols = $$props.cols);
    		if ('seed' in $$props) $$invalidate(0, seed = $$props.seed);
    	};

    	$$self.$capture_state = () => ({
    		Ratio,
    		combos,
    		generate,
    		getNums,
    		pick,
    		images,
    		image,
    		ratio,
    		rows,
    		cols,
    		seed,
    		demo,
    		nums,
    		colors,
    		cells
    	});

    	$$self.$inject_state = $$props => {
    		if ('images' in $$props) $$invalidate(6, images = $$props.images);
    		if ('image' in $$props) $$invalidate(7, image = $$props.image);
    		if ('ratio' in $$props) $$invalidate(1, ratio = $$props.ratio);
    		if ('rows' in $$props) $$invalidate(2, rows = $$props.rows);
    		if ('cols' in $$props) $$invalidate(3, cols = $$props.cols);
    		if ('seed' in $$props) $$invalidate(0, seed = $$props.seed);
    		if ('demo' in $$props) $$invalidate(4, demo = $$props.demo);
    		if ('nums' in $$props) nums = $$props.nums;
    		if ('colors' in $$props) colors = $$props.colors;
    		if ('cells' in $$props) $$invalidate(5, cells = $$props.cells);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [seed, ratio, rows, cols, demo, cells, images, image];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			images: 6,
    			image: 7,
    			ratio: 1,
    			rows: 2,
    			cols: 3,
    			seed: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get images() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set images(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ratio() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ratio(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rows() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rows(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cols() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cols(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get seed() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set seed(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Intro.svelte generated by Svelte v3.43.0 */
    const file$b = "src/Intro.svelte";

    // (14:2) <One>
    function create_default_slot_7$2(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t6;
    	let div4;
    	let t7;
    	let i0;
    	let t9;
    	let i1;
    	let t11;
    	let t12;
    	let div7;
    	let span;
    	let t14;
    	let div5;
    	let i2;
    	let t16;
    	let i3;
    	let t18;
    	let t19;
    	let div6;
    	let t21;
    	let div8;
    	let t22;
    	let div9;
    	let t23;
    	let i4;
    	let t25;
    	let t26;
    	let div11;
    	let t27;
    	let i5;
    	let t29;
    	let div10;
    	let t31;
    	let div12;
    	let t33;
    	let div13;
    	let t35;
    	let div14;
    	let t37;
    	let div15;
    	let t39;
    	let grid;
    	let current;

    	grid = new Grid({
    			props: { seed: "6daf3fd1a93ca04509c" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "okay consider that -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "all of our information";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "is in text.";
    			t5 = space();
    			div3 = element("div");
    			t6 = space();
    			div4 = element("div");
    			t7 = text$1("and we can ");
    			i0 = element("i");
    			i0.textContent = "search";
    			t9 = text$1("  it, and ");
    			i1 = element("i");
    			i1.textContent = "read";
    			t11 = text$1("  it-");
    			t12 = space();
    			div7 = element("div");
    			span = element("span");
    			span.textContent = "but we can't really";
    			t14 = space();
    			div5 = element("div");
    			i2 = element("i");
    			i2.textContent = "get";
    			t16 = text$1("  the ");
    			i3 = element("i");
    			i3.textContent = "information";
    			t18 = text$1(" -");
    			t19 = space();
    			div6 = element("div");
    			div6.textContent = "... back out ?";
    			t21 = space();
    			div8 = element("div");
    			t22 = space();
    			div9 = element("div");
    			t23 = text$1("things get ");
    			i4 = element("i");
    			i4.textContent = "trapped";
    			t25 = text$1("  -");
    			t26 = space();
    			div11 = element("div");
    			t27 = text$1("a ");
    			i5 = element("i");
    			i5.textContent = "single sentence";
    			t29 = text$1("  bungles it all up\n      ");
    			div10 = element("div");
    			div10.textContent = "in ambiguities";
    			t31 = space();
    			div12 = element("div");
    			div12.textContent = "words are one-way things,";
    			t33 = space();
    			div13 = element("div");
    			div13.textContent = "and text is a dead-end,";
    			t35 = space();
    			div14 = element("div");
    			div14.textContent = "for information.";
    			t37 = space();
    			div15 = element("div");
    			div15.textContent = "which is weird actually.";
    			t39 = space();
    			create_component(grid.$$.fragment);
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$b, 14, 4, 364);
    			attr_dev(div1, "class", "more f2 m1");
    			add_location(div1, file$b, 15, 4, 412);
    			attr_dev(div2, "class", "tab i f2 rose");
    			add_location(div2, file$b, 16, 4, 469);
    			set_style(div3, "margin-top", "3rem");
    			add_location(div3, file$b, 17, 4, 518);
    			attr_dev(i0, "class", "sea");
    			add_location(i0, file$b, 18, 41, 592);
    			attr_dev(i1, "class", "sea");
    			add_location(i1, file$b, 18, 81, 632);
    			attr_dev(div4, "class", "tab down f09");
    			add_location(div4, file$b, 18, 4, 555);
    			attr_dev(span, "class", "f09");
    			add_location(span, file$b, 20, 6, 701);
    			attr_dev(i2, "class", "sea");
    			add_location(i2, file$b, 21, 23, 770);
    			attr_dev(i3, "class", "sea b");
    			add_location(i3, file$b, 21, 56, 803);
    			attr_dev(div5, "class", "tab");
    			add_location(div5, file$b, 21, 6, 753);
    			attr_dev(div6, "class", "down tab cherry i ");
    			set_style(div6, "font-size", "2.0rem");
    			add_location(div6, file$b, 22, 6, 850);
    			attr_dev(div7, "class", "down");
    			add_location(div7, file$b, 19, 4, 676);
    			set_style(div8, "margin-top", "3rem");
    			add_location(div8, file$b, 24, 4, 944);
    			attr_dev(i4, "class", "sky b");
    			add_location(i4, file$b, 25, 59, 1036);
    			attr_dev(div9, "class", "down");
    			set_style(div9, "font-size", "1.4rem");
    			add_location(div9, file$b, 25, 4, 981);
    			attr_dev(i5, "class", "sea b");
    			add_location(i5, file$b, 27, 8, 1118);
    			attr_dev(div10, "class", "tab f09 i");
    			add_location(div10, file$b, 28, 6, 1185);
    			attr_dev(div11, "class", "tab down f09");
    			add_location(div11, file$b, 26, 4, 1083);
    			attr_dev(div12, "class", "tab down f09");
    			add_location(div12, file$b, 30, 4, 1244);
    			attr_dev(div13, "class", "tab f09");
    			add_location(div13, file$b, 31, 4, 1306);
    			attr_dev(div14, "class", "tab f09");
    			add_location(div14, file$b, 32, 4, 1361);
    			attr_dev(div15, "class", "tab down f09");
    			add_location(div15, file$b, 33, 4, 1409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t7);
    			append_dev(div4, i0);
    			append_dev(div4, t9);
    			append_dev(div4, i1);
    			append_dev(div4, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, span);
    			append_dev(div7, t14);
    			append_dev(div7, div5);
    			append_dev(div5, i2);
    			append_dev(div5, t16);
    			append_dev(div5, i3);
    			append_dev(div5, t18);
    			append_dev(div7, t19);
    			append_dev(div7, div6);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, div8, anchor);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, t23);
    			append_dev(div9, i4);
    			append_dev(div9, t25);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, t27);
    			append_dev(div11, i5);
    			append_dev(div11, t29);
    			append_dev(div11, div10);
    			insert_dev(target, t31, anchor);
    			insert_dev(target, div12, anchor);
    			insert_dev(target, t33, anchor);
    			insert_dev(target, div13, anchor);
    			insert_dev(target, t35, anchor);
    			insert_dev(target, div14, anchor);
    			insert_dev(target, t37, anchor);
    			insert_dev(target, div15, anchor);
    			insert_dev(target, t39, anchor);
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(div8);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(div11);
    			if (detaching) detach_dev(t31);
    			if (detaching) detach_dev(div12);
    			if (detaching) detach_dev(t33);
    			if (detaching) detach_dev(div13);
    			if (detaching) detach_dev(t35);
    			if (detaching) detach_dev(div14);
    			if (detaching) detach_dev(t37);
    			if (detaching) detach_dev(div15);
    			if (detaching) detach_dev(t39);
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$2.name,
    		type: "slot",
    		source: "(14:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (40:2) <Two>
    function create_default_slot_6$3(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "and people";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "keep typing";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "even more of it";
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$b, 40, 4, 1606);
    			attr_dev(div1, "class", "i sea tab");
    			add_location(div1, file$b, 41, 4, 1644);
    			attr_dev(div2, "class", "f09 tab");
    			add_location(div2, file$b, 42, 4, 1689);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$3.name,
    		type: "slot",
    		source: "(40:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (46:2) <Two>
    function create_default_slot_5$4(ctx) {
    	let div;
    	let t;
    	let grid;
    	let current;

    	grid = new Grid({
    			props: { seed: "1a30de68df4ea7e7bef" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = space();
    			create_component(grid.$$.fragment);
    			set_style(div, "width", "250px");
    			add_location(div, file$b, 46, 4, 1754);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t);
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$4.name,
    		type: "slot",
    		source: "(46:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (50:2) <Left>
    function create_default_slot_4$5(ctx) {
    	let div2;
    	let div1;
    	let t0;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			t0 = text$1("and this seems like an issue,\n        ");
    			div0 = element("div");
    			div0.textContent = "or maybe it isn't.";
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$b, 54, 8, 2010);
    			attr_dev(div1, "class", "tab down");
    			add_location(div1, file$b, 52, 6, 1941);
    			attr_dev(div2, "class", "tab down");
    			add_location(div2, file$b, 50, 4, 1845);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$5.name,
    		type: "slot",
    		source: "(50:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (60:2) <One>
    function create_default_slot_3$5(ctx) {
    	let div0;
    	let t0;
    	let div2;
    	let b;
    	let t2;
    	let div1;
    	let t4;
    	let ul;
    	let div3;
    	let t6;
    	let div4;
    	let t8;
    	let div5;
    	let t10;
    	let div6;
    	let t12;
    	let div7;
    	let t14;
    	let div8;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div2 = element("div");
    			b = element("b");
    			b.textContent = "compromise";
    			t2 = text$1("  is a loose set\n      ");
    			div1 = element("div");
    			div1.textContent = "of tools and standards,";
    			t4 = space();
    			ul = element("ul");
    			div3 = element("div");
    			div3.textContent = "to flip text around, and mess with it.";
    			t6 = space();
    			div4 = element("div");
    			div4.textContent = "like a crowbar, for text.";
    			t8 = space();
    			div5 = element("div");
    			div5.textContent = "so you can pull information out.";
    			t10 = space();
    			div6 = element("div");
    			div6.textContent = "- or bounce random queries off -";
    			t12 = space();
    			div7 = element("div");
    			div7.textContent = "and understand the words, a little.";
    			t14 = space();
    			div8 = element("div");
    			attr_dev(div0, "class", "space");
    			add_location(div0, file$b, 60, 4, 2151);
    			attr_dev(b, "class", "sky f2");
    			add_location(b, file$b, 62, 6, 2189);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$b, 63, 6, 2249);
    			add_location(div2, file$b, 61, 4, 2177);
    			add_location(div3, file$b, 67, 6, 2387);
    			attr_dev(div4, "class", "sea down tab f2");
    			add_location(div4, file$b, 72, 6, 2593);
    			attr_dev(div5, "class", "f09 i down");
    			add_location(div5, file$b, 73, 6, 2660);
    			attr_dev(div6, "class", "down");
    			add_location(div6, file$b, 77, 6, 2820);
    			attr_dev(div7, "class", "down f09");
    			add_location(div7, file$b, 78, 6, 2883);
    			add_location(ul, file$b, 66, 4, 2376);
    			attr_dev(div8, "class", "down");
    			add_location(div8, file$b, 84, 4, 3099);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, b);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, div3);
    			append_dev(ul, t6);
    			append_dev(ul, div4);
    			append_dev(ul, t8);
    			append_dev(ul, div5);
    			append_dev(ul, t10);
    			append_dev(ul, div6);
    			append_dev(ul, t12);
    			append_dev(ul, div7);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div8, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(ul);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$5.name,
    		type: "slot",
    		source: "(60:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (88:2) <Left accent="steelblue">
    function create_default_slot_2$5(ctx) {
    	let div0;
    	let t0;
    	let hr;
    	let t1;
    	let i;
    	let t3;
    	let div1;
    	let t4;
    	let a;
    	let t6;
    	let t7;
    	let div2;
    	let t9;
    	let div4;
    	let div3;
    	let t11;
    	let div6;
    	let t12;
    	let div5;
    	let t14;
    	let div7;
    	let t15;
    	let div8;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			hr = element("hr");
    			t1 = text$1("\n    we think that  ");
    			i = element("i");
    			i.textContent = "open-source, web-focused";
    			t3 = text$1("  tools\n    ");
    			div1 = element("div");
    			t4 = text$1("and a ");
    			a = element("a");
    			a.textContent = "stupidly-good";
    			t6 = text$1("  group of contributers -");
    			t7 = space();
    			div2 = element("div");
    			div2.textContent = "focusing on configurability";
    			t9 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div3.textContent = "avoiding fancy engineering";
    			t11 = space();
    			div6 = element("div");
    			t12 = text$1("and,\n      ");
    			div5 = element("div");
    			div5.textContent = "keeping filesize tiny.";
    			t14 = space();
    			div7 = element("div");
    			t15 = space();
    			div8 = element("div");
    			div8.textContent = "is the best way to build this.";
    			attr_dev(div0, "class", "down");
    			add_location(div0, file$b, 88, 4, 3162);
    			set_style(hr, "height", "3px");
    			set_style(hr, "background-color", "#50617A");
    			set_style(hr, "width", "250px");
    			set_style(hr, "margin-bottom", "3rem");
    			set_style(hr, "margin-top", "4rem");
    			add_location(hr, file$b, 89, 4, 3187);
    			add_location(i, file$b, 90, 24, 3314);
    			attr_dev(a, "class", "sea b i");
    			attr_dev(a, "href", "https://github.com/spencermountain/compromise/graphs/contributors");
    			add_location(a, file$b, 92, 12, 3401);
    			attr_dev(div1, "class", "tab f09 down");
    			add_location(div1, file$b, 91, 4, 3362);
    			attr_dev(div2, "class", "down f2 fuscia tab");
    			add_location(div2, file$b, 95, 4, 3563);
    			attr_dev(div3, "class", "tab");
    			add_location(div3, file$b, 97, 6, 3712);
    			attr_dev(div4, "class", "down f2 tulip");
    			set_style(div4, "margin-top", "100px");
    			set_style(div4, "margin-left", "250px");
    			add_location(div4, file$b, 96, 4, 3633);
    			attr_dev(div5, "class", "tab f2 blue");
    			add_location(div5, file$b, 101, 6, 3859);
    			attr_dev(div6, "class", "down ");
    			set_style(div6, "margin-top", "100px");
    			set_style(div6, "margin-left", "100px");
    			add_location(div6, file$b, 99, 4, 3777);
    			set_style(div7, "margin-top", "100px");
    			add_location(div7, file$b, 106, 4, 4070);
    			attr_dev(div8, "class", "down tab");
    			add_location(div8, file$b, 107, 4, 4108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, i, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, a);
    			append_dev(div1, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, t12);
    			append_dev(div6, div5);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div7, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div8, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div6);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(88:2) <Left accent=\\\"steelblue\\\">",
    		ctx
    	});

    	return block;
    }

    // (113:2) <One>
    function create_default_slot_1$5(ctx) {
    	let grid0;
    	let t0;
    	let div1;
    	let div0;
    	let t2;
    	let kbd0;
    	let t4;
    	let kbd1;
    	let t6;
    	let grid1;
    	let current;

    	grid0 = new Grid({
    			props: { seed: "0e387bb94350923b76a" },
    			$$inline: true
    		});

    	grid1 = new Grid({
    			props: { seed: "80bb8622591df22c704" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(grid0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "seriously -";
    			t2 = space();
    			kbd0 = element("kbd");
    			kbd0.textContent = "<script src=\"https://unpkg.com/compromise\"></script>";
    			t4 = space();
    			kbd1 = element("kbd");
    			kbd1.textContent = "npm install compromise";
    			t6 = space();
    			create_component(grid1.$$.fragment);
    			attr_dev(div0, "class", "sea f09");
    			add_location(div0, file$b, 115, 6, 4326);
    			add_location(kbd0, file$b, 116, 6, 4371);
    			add_location(kbd1, file$b, 117, 6, 4453);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$b, 114, 4, 4302);
    		},
    		m: function mount(target, anchor) {
    			mount_component(grid0, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    			append_dev(div1, kbd0);
    			append_dev(div1, t4);
    			append_dev(div1, kbd1);
    			insert_dev(target, t6, anchor);
    			mount_component(grid1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid0.$$.fragment, local);
    			transition_in(grid1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid0.$$.fragment, local);
    			transition_out(grid1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(grid0, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t6);
    			destroy_component(grid1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(113:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (12:0) <Page>
    function create_default_slot$5(ctx) {
    	let one0;
    	let t0;
    	let one1;
    	let t1;
    	let two0;
    	let t2;
    	let two1;
    	let t3;
    	let two2;
    	let t4;
    	let left0;
    	let t5;
    	let one2;
    	let t6;
    	let left1;
    	let t7;
    	let one3;
    	let current;
    	one0 = new One({ $$inline: true });

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_7$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two0 = new Two({ $$inline: true });

    	two1 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_6$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two2 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_5$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left0 = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_4$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left1 = new Left({
    			props: {
    				accent: "steelblue",
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one3 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(one0.$$.fragment);
    			t0 = space();
    			create_component(one1.$$.fragment);
    			t1 = space();
    			create_component(two0.$$.fragment);
    			t2 = space();
    			create_component(two1.$$.fragment);
    			t3 = space();
    			create_component(two2.$$.fragment);
    			t4 = space();
    			create_component(left0.$$.fragment);
    			t5 = space();
    			create_component(one2.$$.fragment);
    			t6 = space();
    			create_component(left1.$$.fragment);
    			t7 = space();
    			create_component(one3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(one0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(two0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(two1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(two2, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(left0, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(left1, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(one3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const two1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two1_changes.$$scope = { dirty, ctx };
    			}

    			two1.$set(two1_changes);
    			const two2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two2_changes.$$scope = { dirty, ctx };
    			}

    			two2.$set(two2_changes);
    			const left0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left0_changes.$$scope = { dirty, ctx };
    			}

    			left0.$set(left0_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    			const left1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left1_changes.$$scope = { dirty, ctx };
    			}

    			left1.$set(left1_changes);
    			const one3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one3_changes.$$scope = { dirty, ctx };
    			}

    			one3.$set(one3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(two0.$$.fragment, local);
    			transition_in(two1.$$.fragment, local);
    			transition_in(two2.$$.fragment, local);
    			transition_in(left0.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(left1.$$.fragment, local);
    			transition_in(one3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(two0.$$.fragment, local);
    			transition_out(two1.$$.fragment, local);
    			transition_out(two2.$$.fragment, local);
    			transition_out(left0.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(left1.$$.fragment, local);
    			transition_out(one3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(two1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(two2, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(left0, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(left1, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(one3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(12:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let page;
    	let current;

    	page = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page_changes.$$scope = { dirty, ctx };
    			}

    			page.$set(page_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Two,
    		Three: Three$1,
    		Left,
    		Row,
    		Block,
    		Grid
    	});

    	return [];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/lib/Caret.svelte generated by Svelte v3.43.0 */

    const file$a = "src/lib/Caret.svelte";

    function create_fragment$b(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "fill", /*color*/ ctx[0]);
    			attr_dev(path, "d", "M1299 1088q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z");
    			add_location(path, file$a, 6, 2, 190);
    			attr_dev(svg, "width", "80");
    			attr_dev(svg, "height", "30");
    			attr_dev(svg, "viewBox", "0 0 2048 2048");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$a, 5, 0, 100);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 1) {
    				attr_dev(path, "fill", /*color*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Caret', slots, []);
    	let { href = 'https://blog.spencermounta.in' } = $$props;
    	let { color = 'grey' } = $$props;
    	const writable_props = ['href', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Caret> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(1, href = $$props.href);
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ href, color });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(1, href = $$props.href);
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, href];
    }

    class Caret extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { href: 1, color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Caret",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get href() {
    		throw new Error("<Caret>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Caret>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Caret>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Caret>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Textarea.svelte generated by Svelte v3.43.0 */

    const file$9 = "src/lib/Textarea.svelte";

    function create_fragment$a(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "input svelte-1gzfkwt");
    			set_style(textarea, "width", /*width*/ ctx[1]);
    			set_style(textarea, "height", /*height*/ ctx[2]);
    			set_style(textarea, "font-size", /*size*/ ctx[3]);
    			attr_dev(textarea, "spellcheck", "false");
    			attr_dev(textarea, "type", "text");
    			add_location(textarea, file$9, 17, 0, 313);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*value*/ ctx[0]);
    			/*textarea_binding*/ ctx[8](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*callback*/ ctx[5], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 2) {
    				set_style(textarea, "width", /*width*/ ctx[1]);
    			}

    			if (dirty & /*height*/ 4) {
    				set_style(textarea, "height", /*height*/ ctx[2]);
    			}

    			if (dirty & /*size*/ 8) {
    				set_style(textarea, "font-size", /*size*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[8](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Textarea', slots, []);
    	let { value = '' } = $$props;
    	let el;

    	let { cb = () => {
    		
    	} } = $$props;

    	let { width = '60%' } = $$props;
    	let { height = '142px' } = $$props;
    	let { size = '1.2rem' } = $$props;

    	const callback = function (e) {
    		cb(e.target.value);
    	};

    	const writable_props = ['value', 'cb', 'width', 'height', 'size'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Textarea> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(4, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('cb' in $$props) $$invalidate(6, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('size' in $$props) $$invalidate(3, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		el,
    		cb,
    		width,
    		height,
    		size,
    		callback
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('el' in $$props) $$invalidate(4, el = $$props.el);
    		if ('cb' in $$props) $$invalidate(6, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('size' in $$props) $$invalidate(3, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		width,
    		height,
    		size,
    		el,
    		callback,
    		cb,
    		textarea_input_handler,
    		textarea_binding
    	];
    }

    class Textarea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
    			value: 0,
    			cb: 6,
    			width: 1,
    			height: 2,
    			size: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textarea",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get value() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cb() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cb(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let methods$j = {
      one: {},
      two: {},
      three: {},
      four: {},
    };

    let model$1 = {
      one: {},
      two: {},
      three: {},
    };
    let compute$2 = {};
    let hooks = [];

    var tmp = { methods: methods$j, model: model$1, compute: compute$2, hooks };

    const isArray$4 = input => Object.prototype.toString.call(input) === '[object Array]';

    const fns$3 = {
      /** add metadata to term objects */
      compute: function (input) {
        const { docs, world } = this;
        const compute = world.compute;
        // do one method
        if (typeof input === 'string' && compute.hasOwnProperty(input)) {
          compute[input](docs, world, this);
        }
        // allow a list of methods
        else if (isArray$4(input)) {
          input.forEach(name => world.compute.hasOwnProperty(name) && compute[name](docs, world, this));
        }
        // allow a custom compute function
        else if (typeof input === 'function') {
          input(this.docs, world, this);
        } else {
          console.warn('no compute:', input); // eslint-disable-line
        }
        return this
      },
    };
    var compute$1 = fns$3;

    const forEach = function (cb) {
      let ptrs = this.fullPointer;
      ptrs.forEach((ptr, i) => {
        let view = this.update([ptr]);
        cb(view, i);
      });
      return this
    };

    const map = function (cb) {
      let ptrs = this.fullPointer;
      let res = ptrs.map((ptr, i) => {
        let view = this.update([ptr]);
        return cb(view, i)
      });
      if (res.length === 0) {
        return this.update([])
      }
      // return an array of values, or View objects?
      // user can return either from their callback
      if (res[0] !== undefined && typeof res[0] === 'object' && (res[0] === null || !res[0].isView)) {
        return res
      }
      // return a View object
      let all = [];
      res.forEach(ptr => {
        all = all.concat(ptr.fullPointer);
      });
      return this.toView(all)
    };

    const filter = function (cb) {
      let ptrs = this.fullPointer;
      ptrs = ptrs.filter((ptr, i) => {
        let view = this.update([ptr]);
        return cb(view, i)
      });
      return this.update(ptrs)
    };

    const find = function (cb) {
      let ptrs = this.fullPointer;
      let found = ptrs.find((ptr, i) => {
        let view = this.update([ptr]);
        return cb(view, i)
      });
      return this.update([found])
    };

    const some = function (cb) {
      let ptrs = this.fullPointer;
      return ptrs.some((ptr, i) => {
        let view = this.update([ptr]);
        return cb(view, i)
      })
    };

    const random = function (n = 1) {
      let ptrs = this.fullPointer;
      let r = Math.floor(Math.random() * ptrs.length);
      //prevent it from going over the end
      if (r + n > this.length) {
        r = this.length - n;
        r = r < 0 ? 0 : r;
      }
      ptrs = ptrs.slice(r, r + n);
      return this.update(ptrs)
    };
    var loops = { forEach, map, filter, find, some, random };

    const utils = {
      /** */
      termList: function () {
        return this.methods.one.termList(this.docs)
      },
      /** */
      terms: function (n) {
        let m = this.match('.').toView(); //make this faster
        return typeof n === 'number' ? m.eq(n) : m
      },

      /** */
      groups: function (group) {
        if (group || group === 0) {
          return this.update(this._groups[group] || [])
        }
        // return an object of Views
        let res = {};
        Object.keys(this._groups).forEach(k => {
          res[k] = this.update(this._groups[k]);
        });
        // this._groups = null
        return res
      },
      /** */
      eq: function (n) {
        let ptr = this.pointer;
        if (!ptr) {
          ptr = this.docs.map((_doc, i) => [i]);
        }
        if (ptr[n]) {
          return this.update([ptr[n]])
        }
        return this.none()
      },
      /** */
      first: function () {
        return this.eq(0)
      },
      /** */
      last: function () {
        let n = this.pointer.length - 1;
        return this.eq(n)
      },
      /** */
      slice: function (min, max) {
        let pntrs = this.pointer || this.docs.map((_o, n) => [n]);
        pntrs = pntrs.slice(min, max);
        return this.update(pntrs)
      },

      /** return a view of the entire document */
      all: function () {
        return this.update().toView()
      },
      /**  */
      fullSentences: function () {
        let ptrs = this.fullPointer.map(a => [a[0]]); //lazy!
        return this.update(ptrs).toView()
      },
      /** return a view of no parts of the document */
      none: function () {
        return this.update([])
      },

      /** are these two views looking at the same words? */
      is: function (b) {
        if (!b || !b.isView) {
          return false
        }
        let aPtr = this.fullPointer;
        let bPtr = b.fullPointer;
        if (!aPtr.length === bPtr.length) {
          return false
        }
        // ensure pointers are the same
        return aPtr.every((ptr, i) => {
          if (!bPtr[i]) {
            return false
          }
          // ensure [n, start, end] are all the same
          return ptr[0] === bPtr[i][0] && ptr[1] === bPtr[i][1] && ptr[2] === bPtr[i][2]
        })
      },

      /** how many seperate terms does the document have? */
      wordCount: function () {
        return this.docs.reduce((count, terms) => {
          count += terms.filter(t => t.text !== '').length;
          return count
        }, 0)
      },
    };
    utils.group = utils.groups;
    utils.fullSentence = utils.fullSentences;
    var util = utils;

    const methods$i = {
      // allow re-use of this view, after a mutation
      freeze: function () {
        this.frozen = this.docs;
        return this
      },
      // make it fast again
      unfreeze: function () {
        this.frozen = null;
        return this
      },
    };
    var freeze = methods$i;

    const methods$h = Object.assign({}, util, compute$1, loops, freeze);

    // aliases
    methods$h.get = methods$h.eq;

    var api$5 = methods$h;

    // search for our phrase in the document (sucks!)
    const bruteSearch = function (lookUp, document) {
      for (let n = 0; n < document.length; n += 1) {
        const terms = document[n];
        for (let start = 0; start < terms.length; start += 1) {
          if (terms[start] === lookUp[0]) {
            // ensure all the terms are still there
            if (lookUp.every((term, o) => term === terms[start + o])) {
              return [n, start, start + lookUp.length]
            }
            // we can probably quit here
            return null
          }
        }
      }
      return null
    };

    const isSame = function (docs, frozen) {
      return docs.every((terms, i) => {
        return terms.every((term, k) => term === frozen[i][k])
      })
    };

    const repair = function (view) {
      let { document, frozen } = view;
      // re-engineer a previous pointer
      // let tmp = methods.one.getDoc(pointer, document)
      // something has shifted, since we froze this view
      // if (isSame(tmp, frozen) === false) {
      let found = frozen.map(terms => bruteSearch(terms, document));
      found = found.filter(a => a); //remove now-missing sequences
      view.ptrs = found;
    };

    class View {
      constructor(document, pointer, groups = {}) {
        // invisible props
        [
          ['document', document],
          ['world', tmp],
          ['_groups', groups],
          ['_cache', null],
          ['viewType', 'View']
        ].forEach(a => {
          Object.defineProperty(this, a[0], {
            value: a[1],
            writable: true,
          });
        });
        this.ptrs = pointer;
      }
      /* getters:  */
      get docs() {
        let docs = this.document;
        if (this.ptrs) {
          docs = tmp.methods.one.getDoc(this.ptrs, this.document);
        }
        // is the pointer stale?
        if (this.frozen && isSame(docs, this.frozen) === false) {
          repair(this);
          docs = tmp.methods.one.getDoc(this.ptrs, this.document);
        }
        return docs
      }
      get pointer() {
        return this.ptrs
      }
      get methods() {
        return this.world.methods
      }
      get model() {
        return this.world.model
      }
      get hooks() {
        return this.world.hooks
      }
      get isView() {
        return true //this comes in handy sometimes
      }
      // is the view not-empty?
      get found() {
        return this.docs.length > 0
      }
      // how many matches we have
      get length() {
        return this.docs.length
      }
      // return a more-hackable pointer
      get fullPointer() {
        let { docs, ptrs, document, frozen } = this;
        if (frozen && isSame(docs, this.frozen) === false) {
          repair(this);
          docs = this.docs;
        }
        // compute a proper pointer, from docs
        let pointers = ptrs || docs.map((_d, n) => [n]);
        return pointers.map(a => {
          a = a.slice(0); //clone it
          a[1] = a[1] || 0;
          a[2] = a[2] || (document[a[0]] || []).length;
          return a
        })
      }
      // create a new View, from this one
      update(pointer) {
        let m = new View(this.document, pointer);
        m._cache = this._cache; // share this full thing
        return m
      }
      // create a new View, from this one
      toView(pointer) {
        if (pointer === undefined) {
          pointer = this.pointer;
        }
        let m = new View(this.document, pointer);
        m._cache = this._cache; // share this full thing
        return m
      }
      clone() {
        // clone the whole document
        let document = this.document.slice(0);
        document = document.map(terms => {
          return terms.map(term => {
            term = Object.assign({}, term);
            term.tags = new Set(term.tags);
            return term
          })
        });
        // clone only sub-document ?
        let m = this.update(this.pointer);
        m.document = document;
        // let m = new View(document, this.pointer)
        // m._cache = this._cache //clone this too?
        return m
      }
    }
    Object.assign(View.prototype, api$5);
    var View$1 = View;

    var version = '14rc';

    const isObject$2 = function (item) {
      // let isSet = item instanceof Set
      return item && typeof item === 'object' && !Array.isArray(item)
    };

    // recursive merge of objects
    function mergeDeep(model, plugin) {
      if (isObject$2(plugin)) {
        for (const key in plugin) {
          if (isObject$2(plugin[key])) {
            if (!model[key]) Object.assign(model, { [key]: {} });
            mergeDeep(model[key], plugin[key]); //recursion
          } else {
            Object.assign(model, { [key]: plugin[key] });
          }
        }
      }
      return model
    }

    // const merged = mergeDeep({ a: 1 }, { b: { c: { d: { e: 12345 } } } })
    // console.dir(merged, { depth: 5 })

    const extend = function (plugin, world, View) {
      const { methods, model, compute, hooks } = world;

      mergeDeep(methods, plugin.methods);
      mergeDeep(model, plugin.model);

      // shallow-merge compute
      if (plugin.compute) {
        Object.assign(compute, plugin.compute);
      }
      // append new hooks
      if (hooks) {
        world.hooks = hooks.concat(plugin.hooks || []);
      }
      // assign new class methods
      if (plugin.api) {
        plugin.api(View);
      }
    };
    var extend$1 = extend;

    const isArray$3 = arr => Object.prototype.toString.call(arr) === '[object Array]';

    const isObject$1 = item => item && typeof item === 'object' && !Array.isArray(item);

    const isSet = item => item instanceof Set;

    // not-very-deep clone
    const deepClone$1 = function (obj) {
      for (const key in obj) {
        if (isObject$1(obj[key])) {
          obj[key] = Object.assign({}, obj[key]);
          // obj[key] = deepClone(obj[key]) //recursive
        } else if (isArray$3(obj[key])) {
          obj[key] = obj[key].slice(0);
        } else if (isSet(obj[key])) {
          obj[key] = new Set(obj[key]);
        }
      }
      return obj
    };
    var clone = deepClone$1;

    let world = Object.assign({}, tmp);
    // let world = { methods, model, compute, hooks }

    const nlp = function (input, lex) {
      const { methods, hooks } = world;
      if (lex) {
        nlp.addWords(lex);
      }
      //assume ./01-tokenize is installed
      let document = methods.one.tokenize(input, world);
      let doc = new View$1(document);
      doc.compute(hooks);
      return doc
    };

    /** log the decision-making to console */
    nlp.verbose = function (set) {
      let env = typeof process === undefined ? self.env : process.env; //use window, in browser
      env.DEBUG_TAGS = set === 'tagger' || set === true ? true : '';
      env.DEBUG_MATCH = set === 'match' || set === true ? true : '';
      env.DEBUG_CHUNKS = set === 'chunker' || set === true ? true : '';
      return this
    };

    /** pre-parse any match statements */
    nlp.parseMatch = function (str) {
      return world.methods.one.parseMatch(str)
    };

    /** extend compromise functionality */
    nlp.plugin = function (plugin) {
      extend$1(plugin, world, View$1, this);
      return this
    };
    nlp.extend = nlp.plugin;

    /** reach-into compromise internals */
    nlp.world = () => world;

    nlp.version = version;

    nlp.addWords = function (words) {
      const { methods, model } = world;
      if (!words) {
        return
      }
      // add some words to our lexicon
      if (!methods.two.expandLexicon) {
        Object.assign(model.two.lexicon, words); //no fancy-business
      } else {
        // expand it, if appropriate
        let { lex, _multi } = methods.two.expandLexicon(words, world);
        Object.assign(model.two.lexicon, lex);
        Object.assign(model.two._multiCache, _multi);
      }
    };

    /** don't run the POS-tagger */
    nlp.tokenize = function (input, lex) {
      const { methods, compute } = world;
      // add user-given words to lexicon
      if (lex) {
        nlp.addWords(lex);
      }
      // run the tokenizer
      let document = methods.one.tokenize(input, world);
      let doc = new View$1(document);
      // give contractions a shot, at least
      if (compute.contractions) {
        doc.compute(['alias', 'normal', 'machine', 'contractions']); //run it if we've got it
      }
      return doc
    };

    /** deep-clone the library's model*/
    nlp.fork = function (str) {
      world = Object.assign({}, world);
      world.methods = Object.assign({}, world.methods);
      world.model = clone(world.model);
      world.model.forked = str;
      return nlp
    };

    // some helper methods
    nlp.model = () => world.model;
    nlp.methods = () => world.methods;
    nlp.hooks = () => world.hooks;

    // apply our only default plugins
    var nlp$1 = nlp;

    var caseFns = {
      /** */
      toLowerCase: function () {
        this.termList().forEach(t => {
          t.text = t.text.toLowerCase();
        });
        return this
      },
      /** */
      toUpperCase: function () {
        this.termList().forEach(t => {
          t.text = t.text.toUpperCase();
        });
        return this
      },
      /** */
      toTitleCase: function () {
        this.termList().forEach(t => {
          t.text = t.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()); //support unicode?
        });
        return this
      },
      /** */
      toCamelCase: function () {
        this.docs.forEach(terms => {
          terms.forEach((t, i) => {
            if (i !== 0) {
              t.text = t.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()); //support unicode?
            }
            if (i !== terms.length - 1) {
              t.post = '';
            }
          });
        });
        return this
      },
    };

    // splice an array into an array
    const spliceArr = (parent, index, child) => {
      let args = [index, 0].concat(child);
      Array.prototype.splice.apply(parent, args);
      return parent
    };

    // add a space at end, if required
    const endSpace = function (terms) {
      const hasSpace = / $/;
      let lastTerm = terms[terms.length - 1];
      if (hasSpace.test(lastTerm.post) === false) {
        lastTerm.post += ' ';
      }
    };

    // sentence-ending punctuation should move in append
    const movePunct = (source, end, needle) => {
      const juicy = /[.?!]/g; // punctuation we wanna transfer
      let wasLast = source[end - 1];
      if (!wasLast) {
        return
      }
      let post = wasLast.post;
      if (juicy.test(post)) {
        let punct = post.match(juicy).join(''); //not perfect
        let last = needle[needle.length - 1];
        last.post = punct + last.post + ' ';
        // remove it, from source
        wasLast.post = wasLast.post.replace(juicy, '');
      }
    };

    const isTitleCase = function (str) {
      return /^[A-Z][a-z'\u00C0-\u00FF]/.test(str) || /^[A-Z]$/.test(str)
    };

    const toTitleCase = function (str) {
      str = str.replace(/^[a-z\u00C0-\u00FF]/, x => x.toUpperCase()); //TODO: support unicode
      return str
    };

    const moveTitleCase = function (home, start, needle) {
      let from = home[start];
      // should we bother?
      if (start !== 0 || !isTitleCase(from.text)) {
        return
      }
      // titlecase new first term
      needle[0].text = toTitleCase(needle[0].text);
      // should we un-titlecase the old word?
      let old = home[start];
      if (old.tags.has('ProperNoun') || old.tags.has('Acronym')) {
        return
      }
      if (isTitleCase(old.text) && old.text.length > 1) {
        old.text = old.text.replace(/^[A-Z]/, x => x.toLowerCase());
      }
    };

    // put these words before the others
    const cleanPrepend = function (home, ptr, needle, document) {
      let [n, start, end] = ptr;
      // introduce spaces appropriately
      if (start === 0) {
        // at start - need space in insert
        endSpace(needle);
      } else if (end === document[n].length) {
        // at end - need space in home
        endSpace(needle);
      } else {
        // in middle - need space in home and insert
        endSpace(needle);
        endSpace([home[ptr[1]]]);
      }
      moveTitleCase(home, start, needle);
      movePunct(home, end, needle);
      spliceArr(home, start, needle);
    };

    const cleanAppend = function (home, ptr, needle, document) {
      let [n, , end] = ptr;
      let total = document[n].length;
      if (end < total) {
        // are we in the middle?
        // add trailing space on self
        endSpace(needle);
      } else if (total === end) {
        // are we at the end?
        // add a space to predecessor
        endSpace(home);
        // very end, move period
        movePunct(home, end, needle);
      }
      spliceArr(home, ptr[2], needle);
    };

    const insert = function (str, view, prepend) {
      const { methods, document, world } = view;
      // insert words at end of each doc
      let ptrs = view.fullPointer;
      ptrs.forEach(ptr => {
        let [n] = ptr;
        // add-in the words
        let home = document[n];
        let needle = [];
        if (typeof str === 'string') {
          needle = methods.one.tokenize(str, world)[0]; //assume one sentence
        } else if (typeof str === 'object' && str.docs) {
          needle = str.docs[0]; //assume one sentence
        }
        if (prepend) {
          cleanPrepend(home, ptr, needle, document);
        } else {
          cleanAppend(home, ptr, needle, document);
        }
        // extend the pointer
        ptr[2] += needle.length;
      });
      // convert them to whole sentences
      ptrs = ptrs.map(a => [a[0]]);
      let doc = view.toView(ptrs);
      // try to tag them, too
      doc.compute(['preTagger', 'contractions', 'postTagger', 'index']);
      return doc
    };

    const fns$2 = {
      insertAfter: function (input) {
        return insert(input, this, false)
      },
      insertBefore: function (input) {
        return insert(input, this, true)
      },
      // add string as new sentence
      concat: function (input) {
        const { methods, document, world } = this;
        // parse and splice-in new terms
        if (typeof input === 'string') {
          let json = methods.one.tokenize(input, world);
          let ptrs = this.fullPointer;
          let lastN = ptrs[ptrs.length - 1][0];
          spliceArr(document, lastN + 1, json);
          return this.compute('index')
        }
        // is it other pointers from the same document?
        if (this.document === input.document) {
          let ptrs = this.fullPointer.concat(input.fullPointer);
          return this.toView(ptrs).compute('index')
        }
        return this
      },
    };
    fns$2.append = fns$2.insertAfter;
    fns$2.prepend = fns$2.insertBefore;
    fns$2.insert = fns$2.insertAfter;

    var insert$1 = fns$2;

    const fns$1 = {};

    fns$1.replaceWith = function (input) {
      let ptrs = this.fullPointer;
      // slide this in
      this.insertAfter(input);
      // delete the original terms
      let original = this.update(ptrs);
      this.delete(original);
      // what should we return?
      return this.toView(ptrs).compute('index')
    };

    fns$1.replace = function (match, input) {
      let m = this.match(match);
      if (!m.found) {
        return this
      }
      return m.replaceWith(input)
    };
    var replace = fns$1;

    // transfer sentence-ending punctuation
    const repairPunct = function (terms, len) {
      let last = terms.length - 1;
      let from = terms[last];
      let to = terms[last - len];
      if (to && from) {
        to.post += from.post; //this isn't perfect.
        to.post = to.post.replace(/ +([.?!,;:])/, '$1');
        // don't allow any silly punctuation outcomes like ',!'
        to.post = to.post.replace(/[,;:]+([.?!])/, '$1');
      }
    };

    // remove terms from document json
    const pluckOut = function (document, nots) {
      nots.forEach(ptr => {
        let [n, start, end] = ptr;
        let len = end - start;
        if (!document[n]) {
          return // weird!
        }
        if (end === document[n].length && end > 1) {
          repairPunct(document[n], len);
        }
        document[n].splice(start, len); // replaces len terms at index start
      });
      // remove any now-empty sentences
      // (foreach + splice = 'mutable filter')
      for (let i = document.length - 1; i >= 0; i -= 1) {
        if (document[i].length === 0) {
          document.splice(i, 1);
          // remove any trailing whitespace before our removed sentence
          if (i === document.length && document[i - 1]) {
            let terms = document[i - 1];
            let lastTerm = terms[terms.length - 1];
            if (lastTerm) {
              lastTerm.post = lastTerm.post.trimEnd();
            }
          }
        }
      }
      return document
    };

    const methods$g = {
      /** */
      remove: function (reg) {
        const { indexN } = this.methods.one;
        // two modes:
        //  - a. remove self, from full parent
        let self = this.all();
        let not = this;
        //  - b. remove a new match, from self
        if (reg) {
          self = this;
          not = this.match(reg);
        }
        let ptrs = self.fullPointer;
        let nots = not.fullPointer.reverse();
        // remove them from the actual document)
        let document = pluckOut(this.document, nots);
        // repair our pointers
        let gone = indexN(nots);
        ptrs = ptrs.map(ptr => {
          let [n] = ptr;
          if (!gone[n]) {
            return ptr
          }
          gone[n].forEach(no => {
            let len = no[2] - no[1];
            // does it effect our pointer?
            if (ptr[1] <= no[1] && ptr[2] >= no[2]) {
              ptr[2] -= len;
            }
          });
          return ptr
        });
        // remove any now-empty pointers
        ptrs = ptrs.filter(ptr => {
          const len = ptr[2] - ptr[1];
          if (len <= 0) {
            return false
          }
          return true
        });
        //TODO: fix downstream n pointers
        // mutate original
        self.ptrs = ptrs;
        self.document = document;
        return self.toView(ptrs).compute('index') //return new document
      },
    };
    // aliases
    methods$g.delete = methods$g.remove;
    var remove = methods$g;

    const methods$f = {
      /** add this punctuation or whitespace before each match: */
      pre: function (str, concat) {
        if (str === undefined) {
          return this.docs[0][0].pre
        }
        this.docs.forEach(terms => {
          let term = terms[0];
          if (concat === true) {
            term.pre += str;
          } else {
            term.pre = str;
          }
        });
        return this
      },

      /** add this punctuation or whitespace after each match: */
      post: function (str, concat) {
        if (str === undefined) {
          let last = this.docs[this.docs.length - 1];
          return last[last.length - 1].post
        }
        this.docs.forEach(terms => {
          let term = terms[0];
          if (concat === true) {
            term.post += str;
          } else {
            term.post = str;
          }
        });
        return this
      },

      /** */
      trim: function () {
        let docs = this.docs;
        let start = docs[0][0];
        start.pre = '';
        let last = docs[docs.length - 1];
        let end = last[last.length - 1];
        end.post = '';
        return this
      },

      /** connect words with hyphen, and remove whitespace */
      hyphenate: function () {
        this.docs.forEach(terms => {
          //remove whitespace
          terms.forEach((t, i) => {
            if (i !== 0) {
              t.pre = '';
            }
            if (terms[i + 1]) {
              t.post = '-';
            }
          });
        });
        return this
      },

      /** remove hyphens between words, and set whitespace */
      dehyphenate: function () {
        const hasHyphen = /[-–—]/;
        this.docs.forEach(terms => {
          //remove whitespace
          terms.forEach(t => {
            if (hasHyphen.test(t.post)) {
              t.post = ' ';
            }
          });
        });
        return this
      },

      /** add quotations around these matches */
      toQuotations: function (start, end) {
        start = start || `"`;
        end = end || `"`;
        this.docs.forEach(terms => {
          terms[0].pre = start + terms[0].pre;
          let last = terms[terms.length - 1];
          last.post = end + last.post;
        });
        return this
      },

      /** add brackets around these matches */
      toParentheses: function (start, end) {
        start = start || `(`;
        end = end || `)`;
        this.docs.forEach(terms => {
          terms[0].pre = start + terms[0].pre;
          let last = terms[terms.length - 1];
          last.post = end + last.post;
        });
        return this
      },
    };
    methods$f.deHyphenate = methods$f.dehyphenate;
    methods$f.toQuotation = methods$f.toQuotations;

    var whitespace$1 = methods$f;

    /** alphabetical order */
    const alpha = (a, b) => {
      if (a.normal < b.normal) {
        return -1
      }
      if (a.normal > b.normal) {
        return 1
      }
      return 0
    };

    /** count the # of characters of each match */
    const length = (a, b) => {
      let left = a.normal.trim().length;
      let right = b.normal.trim().length;
      if (left < right) {
        return 1
      }
      if (left > right) {
        return -1
      }
      return 0
    };

    /** count the # of terms in each match */
    const wordCount$2 = (a, b) => {
      if (a.words < b.words) {
        return 1
      }
      if (a.words > b.words) {
        return -1
      }
      return 0
    };

    /** count the # of terms in each match */
    const sequential = (a, b) => {
      let left = a.pointer.join('');
      let right = b.pointer.join('');
      if (left < right) {
        return 1
      }
      if (left > right) {
        return -1
      }
      return 0
    };

    /** sort by # of duplicates in the document*/
    const byFreq = function (arr) {
      let counts = {};
      arr.forEach(o => {
        counts[o.normal] = counts[o.normal] || 0;
        counts[o.normal] += 1;
      });
      // sort by freq
      arr.sort((a, b) => {
        let left = counts[a.normal];
        let right = counts[b.normal];
        if (left < right) {
          return 1
        }
        if (left > right) {
          return -1
        }
        return 0
      });
      return arr
    };

    var methods$e = { alpha, length, wordCount: wordCount$2, sequential, byFreq };

    // aliases
    const seqNames = new Set(['index', 'sequence', 'seq', 'sequential', 'chron', 'chronological']);
    const freqNames = new Set(['freq', 'frequency', 'topk', 'repeats']);

    /** re-arrange the order of the matches (in place) */
    const sort = function (input) {
      let { docs, pointer } = this;
      input = input || 'alpha';
      let ptrs = pointer || docs.map((_d, n) => [n]);
      let arr = docs.map((terms, n) => {
        return {
          index: n,
          words: terms.length,
          normal: terms.map(t => t.machine || t.normal || '').join(' '),
          pointer: ptrs[n],
        }
      });
      // // 'chronological' sorting
      if (seqNames.has(input)) {
        input = 'sequential';
      }
      if (freqNames.has(input)) {
        arr = methods$e.byFreq(arr);
        return this.update(arr.map(o => o.pointer))
      }
      // apply sort method on each phrase
      if (typeof methods$e[input] === 'function') {
        arr = arr.sort(methods$e[input]);
        return this.update(arr.map(o => o.pointer))
      }
      return this
    };

    /** reverse the order of the matches, but not the words or index */
    const reverse = function () {
      let ptrs = this.pointer || this.docs.map((_d, n) => [n]);
      ptrs = [].concat(ptrs);
      ptrs = ptrs.reverse();
      return this.update(ptrs)
    };

    /** remove any duplicate matches */
    const unique = function () {
      let already = new Set();
      let res = this.filter(m => {
        let txt = m.text('normal');
        if (already.has(txt)) {
          return false
        }
        already.add(txt);
        return true
      });
      // this.ptrs = res.ptrs //mutate original?
      return res//.compute('index')
    };

    var sort$1 = { unique, reverse, sort };

    const deepClone = function (obj) {
      return JSON.parse(JSON.stringify(obj))
    };
    const methods$d = {
      fork: function () {
        let after = this;
        after.world.model = deepClone(after.world.model);
        after.world.methods = Object.assign({}, after.world.methods);
        if (after.ptrs) {
          after.ptrs = after.ptrs.slice(0);
        }
        // clone the cache?
        // clone the document?
        return after
      },
    };
    var fork = methods$d;

    const methods$c = Object.assign({}, caseFns, insert$1, replace, remove, whitespace$1, sort$1, fork);

    const addAPI$2 = function (View) {
      Object.assign(View.prototype, methods$c);
    };
    var api$4 = addAPI$2;

    var change = {
      api: api$4,
    };

    const relPointer = function (ptrs, parent) {
      if (!parent) {
        return ptrs
      }
      ptrs.forEach(ptr => {
        let n = ptr[0];
        if (parent[n]) {
          ptr[0] = parent[n][0];
          ptr[1] += parent[n][1];
          ptr[2] += parent[n][1];
        }
      });
      return ptrs
    };

    // make match-result relative to whole document
    const fixPointers = function (res, parent) {
      let { ptrs, byGroup } = res;
      ptrs = relPointer(ptrs, parent);
      Object.keys(byGroup).forEach(k => {
        byGroup[k] = relPointer(byGroup[k], parent);
      });
      return { ptrs, byGroup }
    };

    // did they pass-in a compromise object?
    const isView = regs => regs && typeof regs === 'object' && regs.isView === true;

    const match$2 = function (regs, group) {
      const one = this.methods.one;
      // support param as view object
      if (isView(regs)) {
        let ptrs = regs.fullPointer; // support a view object as input
        return this.toView(ptrs)
      }
      // support param as string
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
      }
      let todo = { regs, group };
      let res = one.match(this.docs, todo, this._cache);
      let { ptrs, byGroup } = fixPointers(res, this.fullPointer);
      let view = this.toView(ptrs);
      view._groups = byGroup;
      return view
    };

    const matchOne = function (regs, group) {
      const one = this.methods.one;
      // support at view as a param
      if (isView(regs)) {
        let ptrs = regs.fullPointer; // support a view object as input
        return this.toView(ptrs)
      }
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
      }
      let todo = { regs, group, justOne: true };
      let res = one.match(this.docs, todo, this._cache);
      let { ptrs, byGroup } = fixPointers(res, this.fullPointer);
      let view = this.toView(ptrs);
      view._groups = byGroup;
      return view
    };

    const has = function (regs, group) {
      const one = this.methods.one;
      let ptrs;
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
        let todo = { regs, group, justOne: true };
        ptrs = one.match(this.docs, todo, this._cache).ptrs;
      } else if (isView(regs)) {
        ptrs = regs.fullPointer; // support a view object as input
      }
      return ptrs.length > 0
    };

    // 'if'
    const ifFn = function (regs, group) {
      const one = this.methods.one;
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
        let todo = { regs, group, justOne: true };
        let ptrs = this.fullPointer;
        ptrs = ptrs.filter(ptr => {
          let m = this.update([ptr]);
          let res = one.match(m.docs, todo, this._cache).ptrs;
          return res.length > 0
        });
        return this.update(ptrs)
      }
      if (isView(regs)) {
        let ptrs = regs.fullPointer; // support a view object as input
        return this.update(ptrs)
      }
      return this.none()
    };

    const ifNo = function (regs, group) {
      const { docs, methods, _cache } = this;
      const one = methods.one;
      let ptrs;
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
        let todo = { regs, group };
        ptrs = one.match(docs, todo, _cache).ptrs;
      } else if (isView(regs)) {
        ptrs = regs.fullPointer; // support a view object as input
      }
      let found = new Set(ptrs.map(a => a[0]));
      let notFound = []; //invert our pointer
      for (let i = 0; i < docs.length; i += 1) {
        if (found.has(i) === false) {
          notFound.push([i]);
        }
      }
      return this.update(notFound)
    };

    var match$3 = { matchOne, match: match$2, has, if: ifFn, ifNo };

    // import { indexN } from '../../pointers/methods/lib/index.js'

    const before = function (regs, group) {
      const { indexN } = this.methods.one;
      let pre = [];
      let byN = indexN(this.fullPointer);
      Object.keys(byN).forEach(k => {
        // check only the earliest match in the sentence
        let first = byN[k].sort((a, b) => (a[1] > b[1] ? 1 : -1))[0];
        if (first[1] > 0) {
          pre.push([first[0], 0, first[1]]);
        }
      });
      let preWords = this.toView(pre);
      if (!regs) {
        return preWords
      }
      return preWords.match(regs, group)
    };

    const after = function (regs, group) {
      const { indexN } = this.methods.one;
      let post = [];
      let byN = indexN(this.fullPointer);
      let document = this.document;
      Object.keys(byN).forEach(k => {
        // check only the latest match in the sentence
        let last = byN[k].sort((a, b) => (a[1] > b[1] ? -1 : 1))[0];
        let [n, , end] = last;
        if (end < document[n].length) {
          post.push([n, end, document[n].length]);
        }
      });
      let postWords = this.toView(post);
      if (!regs) {
        return postWords
      }
      return postWords.match(regs, group)
    };

    var lookaround = { before, after };

    // import splitAll from '../../pointers/methods/lib/split.js'

    const combine = function (left, right) {
      return [left[0], left[1], right[2]]
    };

    const getDoc$2 = (m, view, group) => {
      return typeof m === 'string' ? view.match(m, group) : m
    };

    const methods$b = {};
    // [before], [match], [after]
    methods$b.splitOn = function (m, group) {
      const { splitAll } = this.methods.one;
      let splits = getDoc$2(m, this, group).fullPointer;
      let all = splitAll(this.fullPointer, splits);
      let res = [];
      all.forEach(o => {
        res.push(o.passthrough);
        res.push(o.before);
        res.push(o.match);
        res.push(o.after);
      });
      res = res.filter(p => p);
      return this.update(res)
    };

    // [before], [match after]
    methods$b.splitBefore = function (m, group) {
      const { splitAll } = this.methods.one;
      let splits = getDoc$2(m, this, group).fullPointer;
      let all = splitAll(this.fullPointer, splits);
      let res = [];
      all.forEach(o => {
        res.push(o.passthrough);
        res.push(o.before);
        if (o.match && o.after) {
          res.push(combine(o.match, o.after));
        } else {
          res.push(o.match);
          res.push(o.after);
        }
      });
      res = res.filter(p => p);
      return this.update(res)
    };

    // [before match], [after]
    methods$b.splitAfter = function (m, group) {
      const { splitAll } = this.methods.one;
      let splits = getDoc$2(m, this, group).fullPointer;
      let all = splitAll(this.fullPointer, splits);
      let res = [];
      all.forEach(o => {
        res.push(o.passthrough);
        if (o.before && o.match) {
          res.push(combine(o.before, o.match));
        } else {
          res.push(o.before);
          res.push(o.match);
        }
        res.push(o.after);
      });
      res = res.filter(p => p);
      return this.update(res)
    };
    methods$b.split = methods$b.splitAfter;

    var split$1 = methods$b;

    const methods$a = Object.assign({}, match$3, lookaround, split$1);

    // aliases
    methods$a.lookBehind = methods$a.before;
    methods$a.lookBefore = methods$a.before;

    methods$a.lookAhead = methods$a.after;
    methods$a.lookAfter = methods$a.after;

    methods$a.notIf = methods$a.ifNo;

    const matchAPI = function (View) {
      Object.assign(View.prototype, methods$a);
    };
    var api$3 = matchAPI;

    // match  'foo /yes/' and not 'foo/no/bar'
    const bySlashes = /(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/;
    // match '(yes) but not foo(no)bar'
    const byParentheses = /([![^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/;
    // okay
    const byWord = / /g;

    const isBlock = str => {
      return /^[![^]*(<[^<]*>)?\(/.test(str) && /\)[?\]+*$~]*$/.test(str)
    };
    const isReg = str => {
      return /^[![^]*(<[^<]*>)?\//.test(str) && /\/[?\]+*$~]*$/.test(str)
    };

    const cleanUp = function (arr) {
      arr = arr.map(str => str.trim());
      arr = arr.filter(str => str);
      return arr
    };

    const parseBlocks = function (txt) {
      // parse by /regex/ first
      let arr = txt.split(bySlashes);
      let res = [];
      // parse by (blocks), next
      arr.forEach(str => {
        if (isReg(str)) {
          res.push(str);
          return
        }
        res = res.concat(str.split(byParentheses));
      });
      res = cleanUp(res);
      // split by spaces, now
      let final = [];
      res.forEach(str => {
        if (isBlock(str)) {
          final.push(str);
        } else if (isReg(str)) {
          final.push(str);
        } else {
          final = final.concat(str.split(byWord));
        }
      });
      final = cleanUp(final);
      return final
    };
    var parseBlocks$1 = parseBlocks;

    const hasMinMax = /\{([0-9]+)(, *[0-9]*)?\}/;
    const andSign = /&&/;
    const captureName = new RegExp(/^<\s*(\S+)\s*>/);
    /* break-down a match expression into this:
    {
      word:'',
      tag:'',
      regex:'',

      start:false,
      end:false,
      negative:false,
      anything:false,
      greedy:false,
      optional:false,

      named:'',
      choices:[],
    }
    */
    const titleCase = str => {
      return str.charAt(0).toUpperCase() + str.substr(1)
    };
    const end = function (str) {
      return str[str.length - 1]
    };
    const start = function (str) {
      return str[0]
    };
    const stripStart = function (str) {
      return str.substr(1)
    };
    const stripEnd = function (str) {
      return str.substr(0, str.length - 1)
    };
    const stripBoth = function (str) {
      str = stripStart(str);
      str = stripEnd(str);
      return str
    };
    //
    const parseToken = function (w) {
      let obj = {};
      //collect any flags (do it twice)
      for (let i = 0; i < 2; i += 1) {
        //end-flag
        if (end(w) === '$') {
          obj.end = true;
          w = stripEnd(w);
        }
        //front-flag
        if (start(w) === '^') {
          obj.start = true;
          w = stripStart(w);
        }
        //capture group (this one can span multiple-terms)
        if (start(w) === '[' || end(w) === ']') {
          obj.group = null;
          if (start(w) === '[') {
            obj.groupStart = true;
          }
          if (end(w) === ']') {
            obj.groupEnd = true;
          }
          w = w.replace(/^\[/, '');
          w = w.replace(/\]$/, '');
          // Use capture group name
          if (start(w) === '<') {
            const res = captureName.exec(w);
            if (res.length >= 2) {
              obj.group = res[1];
              w = w.replace(res[0], '');
            }
          }
        }
        //back-flags
        if (end(w) === '+') {
          obj.greedy = true;
          w = stripEnd(w);
        }
        if (w !== '*' && end(w) === '*' && w !== '\\*') {
          obj.greedy = true;
          w = stripEnd(w);
        }
        if (end(w) === '?') {
          obj.optional = true;
          w = stripEnd(w);
        }
        if (start(w) === '!') {
          obj.negative = true;
          // obj.optional = true
          w = stripStart(w);
        }
        //wrapped-flags
        if (start(w) === '(' && end(w) === ')') {
          // support (one && two)
          if (andSign.test(w)) {
            obj.choices = w.split(andSign);
            obj.operator = 'and';
          } else {
            obj.choices = w.split('|');
            obj.operator = 'or';
          }
          //remove '(' and ')'
          obj.choices[0] = stripStart(obj.choices[0]);
          let last = obj.choices.length - 1;
          obj.choices[last] = stripEnd(obj.choices[last]);
          // clean up the results
          obj.choices = obj.choices.map(s => s.trim());
          obj.choices = obj.choices.filter(s => s);
          //recursion alert!
          obj.choices = obj.choices.map(str => {
            return str.split(/ /g).map(parseToken)
          });
          w = '';
        }
        //regex
        if (start(w) === '/' && end(w) === '/') {
          w = stripBoth(w);
          obj.regex = new RegExp(w); //potential vuln - security/detect-non-literal-regexp
          return obj
        }
        //soft-match
        if (start(w) === '~' && end(w) === '~') {
          w = stripBoth(w);
          obj.soft = true;
          obj.word = w;
          return obj
        }
        //machine/sense overloaded
        if (start(w) === '{' && end(w) === '}') {
          w = stripBoth(w);
          if (/\//.test(w)) {
            obj.sense = w;
            obj.greedy = true;
          } else {
            obj.machine = w;
          }
          return obj
        }
        //chunks
        if (start(w) === '<' && end(w) === '>') {
          w = stripBoth(w);
          obj.chunk = titleCase(w);
          obj.greedy = true;
          return obj
        }
      }
      // support #Tag{1,9}
      if (hasMinMax.test(w) === true) {
        w = w.replace(hasMinMax, (_a, b, c) => {
          if (c === undefined) {
            // '{3}'	Exactly three times
            obj.min = Number(b);
            obj.max = Number(b);
          } else {
            c = c.replace(/, */, '');
            // '{2,4}' Two to four times
            // '{3,}' Three or more times
            obj.min = Number(b);
            obj.max = Number(c || 999);
          }
          // use same method as '+'
          obj.greedy = true;
          // 0 as min means the same as '?'
          obj.optional = true;
          return ''
        });
      }
      //do the actual token content
      if (start(w) === '#') {
        obj.tag = stripStart(w);
        obj.tag = titleCase(obj.tag);
        return obj
      }
      //dynamic function on a term object
      if (start(w) === '@') {
        obj.method = stripStart(w);
        return obj
      }
      if (w === '.') {
        obj.anything = true;
        return obj
      }
      //support alone-astrix
      if (w === '*') {
        obj.anything = true;
        obj.greedy = true;
        obj.optional = true;
        return obj
      }
      if (w) {
        //somehow handle encoded-chars?
        w = w.replace('\\*', '*');
        w = w.replace('\\.', '.');
        obj.word = w.toLowerCase();
      }
      return obj
    };
    var parseToken$1 = parseToken;

    // name any [unnamed] capture-groups with a number
    const nameGroups = function (regs) {
      let index = 0;
      let inGroup = null;
      //'fill in' capture groups between start-end
      for (let i = 0; i < regs.length; i++) {
        const token = regs[i];
        if (token.groupStart === true) {
          inGroup = token.group;
          if (inGroup === null) {
            inGroup = String(index);
            index += 1;
          }
        }
        if (inGroup !== null) {
          token.group = inGroup;
        }
        if (token.groupEnd === true) {
          inGroup = null;
        }
      }
      return regs
    };

    // optimize an 'or' lookup, when the (a|b|c) list is simple or multi-word
    const doFastOrMode = function (tokens) {
      return tokens.map(token => {
        if (token.choices !== undefined) {
          // make sure it's an OR
          if (token.operator !== 'or') {
            return token
          }
          // are they all straight-up words? then optimize them.
          let shouldPack = token.choices.every(block => {
            if (block.length !== 1) {
              return false
            }
            let reg = block[0];
            // ^ and $ get lost in fastOr
            if (reg.start || reg.end) {
              return false
            }
            if (reg.word !== undefined && reg.negative !== true && reg.optional !== true && reg.method !== true) {
              return true //reg is simple-enough
            }
            return false
          });
          if (shouldPack === true) {
            token.fastOr = new Set();
            token.choices.forEach(block => {
              token.fastOr.add(block[0].word);
            });
            delete token.choices;
          }
        }
        return token
      })
    };

    const postProcess = function (regs, opts = {}) {
      // ensure all capture groups names are filled between start and end
      regs = nameGroups(regs);
      // convert 'choices' format to 'fastOr' format
      if (!opts.fuzzy) {
        regs = doFastOrMode(regs);
      }
      return regs
    };
    var postProcess$1 = postProcess;

    // add fuzziness etc to each reg
    const addOptions = function (tokens, opts) {
      // add default fuzzy-search limit
      if (opts.fuzzy === true) {
        opts.fuzzy = 0.85;
      }
      if (typeof opts.fuzzy === 'number') {
        tokens = tokens.map(reg => {
          // add a fuzzy-match on 'word' tokens
          if (opts.fuzzy > 0 && reg.word) {
            reg.fuzzy = opts.fuzzy;
          }
          //add it to or|and choices too
          if (reg.choices) {
            reg.choices.forEach(block => {
              block.forEach(r => {
                r.fuzzy = opts.fuzzy;
              });
            });
          }
          return reg
        });
      }
      return tokens
    };
    /** parse a match-syntax string into json */
    const syntax = function (input, opts = {}) {
      // fail-fast
      if (input === null || input === undefined || input === '') {
        return []
      }
      if (typeof input === 'number') {
        input = String(input); //go for it?
      }
      let tokens = parseBlocks$1(input);
      //turn them into objects
      tokens = tokens.map(str => parseToken$1(str, opts));
      //clean up anything weird
      tokens = postProcess$1(tokens, opts);
      // add fuzzy limits, etc
      tokens = addOptions(tokens, opts);
      // console.log(tokens)
      return tokens
    };
    var parseMatch = syntax;

    const anyIntersection = function (setA, setB) {
      for (let elem of setB) {
        if (setA.has(elem)) {
          return true
        }
      }
      return false
    };
    // check words/tags against our cache
    const failFast = function (regs, cache) {
      for (let i = 0; i < regs.length; i += 1) {
        let reg = regs[i];
        if (reg.optional === true || reg.negation === true) {
          continue
        }
        // is the word missing from the cache?
        if (reg.word !== undefined && cache.has(reg.word) === false) {
          return true
        }
        // is the tag missing?
        if (reg.tag !== undefined && cache.has('#' + reg.tag) === false) {
          return true
        }
        // perform a speedup for fast-or
        if (reg.fastOr && anyIntersection(reg.fastOr, cache) === false) {
          return false
        }
      }
      return false
    };
    var failFast$1 = failFast;

    // fuzzy-match (damerau-levenshtein)
    // Based on  tad-lispy /node-damerau-levenshtein
    // https://github.com/tad-lispy/node-damerau-levenshtein/blob/master/index.js
    // count steps (insertions, deletions, substitutions, or transpositions)
    const editDistance = function (strA, strB) {
      let aLength = strA.length,
        bLength = strB.length;
      // fail-fast
      if (aLength === 0) {
        return bLength
      }
      if (bLength === 0) {
        return aLength
      }
      // If the limit is not defined it will be calculate from this and that args.
      let limit = (bLength > aLength ? bLength : aLength) + 1;
      if (Math.abs(aLength - bLength) > (limit || 100)) {
        return limit || 100
      }
      // init the array
      let matrix = [];
      for (let i = 0; i < limit; i++) {
        matrix[i] = [i];
        matrix[i].length = limit;
      }
      for (let i = 0; i < limit; i++) {
        matrix[0][i] = i;
      }
      // Calculate matrix.
      let j, a_index, b_index, cost, min, t;
      for (let i = 1; i <= aLength; ++i) {
        a_index = strA[i - 1];
        for (j = 1; j <= bLength; ++j) {
          // Check the jagged distance total so far
          if (i === j && matrix[i][j] > 4) {
            return aLength
          }
          b_index = strB[j - 1];
          cost = a_index === b_index ? 0 : 1; // Step 5
          // Calculate the minimum (much faster than Math.min(...)).
          min = matrix[i - 1][j] + 1; // Deletion.
          if ((t = matrix[i][j - 1] + 1) < min) min = t; // Insertion.
          if ((t = matrix[i - 1][j - 1] + cost) < min) min = t; // Substitution.
          // Update matrix.
          let shouldUpdate =
            i > 1 && j > 1 && a_index === strB[j - 2] && strA[i - 2] === b_index && (t = matrix[i - 2][j - 2] + cost) < min;
          if (shouldUpdate) {
            matrix[i][j] = t;
          } else {
            matrix[i][j] = min;
          }
        }
      }
      // return number of steps
      return matrix[aLength][bLength]
    };
    // score similarity by from 0-1 (steps/length)
    const fuzzyMatch = function (strA, strB, minLength = 3) {
      if (strA === strB) {
        return 1
      }
      //don't even bother on tiny strings
      if (strA.length < minLength || strB.length < minLength) {
        return 0
      }
      const steps = editDistance(strA, strB);
      let length = Math.max(strA.length, strB.length);
      let relative = length === 0 ? 0 : steps / length;
      let similarity = 1 - relative;
      return similarity
    };
    var fuzzy = fuzzyMatch;

    // these methods are called with '@hasComma' in the match syntax
    // various unicode quotation-mark formats
    const startQuote =
      /([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/;

    const endQuote = /([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/;

    const hasHyphen$1 = /^[-–—]$/;
    const hasDash = / [-–—] /;

    /** search the term's 'post' punctuation  */
    const hasPost = (term, punct) => term.post.indexOf(punct) !== -1;
    /** search the term's 'pre' punctuation  */
    const hasPre = (term, punct) => term.pre.indexOf(punct) !== -1;

    const methods$9 = {
      /** does it have a quotation symbol?  */
      hasQuote: term => startQuote.test(term.pre) || endQuote.test(term.post),
      /** does it have a comma?  */
      hasComma: term => hasPost(term, ','),
      /** does it end in a period? */
      hasPeriod: term => hasPost(term, '.') === true && hasPost(term, '...') === false,
      /** does it end in an exclamation */
      hasExclamation: term => hasPost(term, '!'),
      /** does it end with a question mark? */
      hasQuestionMark: term => hasPost(term, '?') || hasPost(term, '¿'),
      /** is there a ... at the end? */
      hasEllipses: term => hasPost(term, '..') || hasPost(term, '…') || hasPre(term, '..') || hasPre(term, '…'),
      /** is there a semicolon after term word? */
      hasSemicolon: term => hasPost(term, ';'),
      /** is there a slash '/' in term word? */
      hasSlash: term => /\//.test(term.text),
      /** a hyphen connects two words like-term */
      hasHyphen: term => hasHyphen$1.test(term.post) || hasHyphen$1.test(term.pre),
      /** a dash separates words - like that */
      hasDash: term => hasDash.test(term.post) || hasDash.test(term.pre),
      /** is it multiple words combinded */
      hasContraction: term => Boolean(term.implicit),
      /** is it an acronym */
      isAcronym: term => term.tags.has('Acronym'),
      isKnown: term => term.tags.size > 0,
      isTitleCase: term => /^[A-Z][a-z'\u00C0-\u00FF]/.test(term.text), //|| /^[A-Z]$/.test(term.text)
    };
    // aliases
    methods$9.hasQuotation = methods$9.hasQuote;

    var termMethods = methods$9;

    //declare it up here
    let wrapMatch = function () {};
    /** ignore optional/greedy logic, straight-up term match*/
    const doesMatch$1 = function (term, reg, index, length) {
      // support '.'
      if (reg.anything === true) {
        return true
      }
      // support '^' (in parentheses)
      if (reg.start === true && index !== 0) {
        return false
      }
      // support '$' (in parentheses)
      if (reg.end === true && index !== length - 1) {
        return false
      }
      //support a text match
      if (reg.word !== undefined) {
        //match contractions, machine-form
        if (term.machine !== null && term.machine === reg.word) {
          return true
        }
        // term aliases for slashes and things
        if (term.alias !== undefined && term.alias.hasOwnProperty(reg.word)) {
          return true
        }
        // support ~ match
        if (reg.soft === true && reg.word === term.root) {
          return true
        }
        // support fuzzy match param
        if (reg.fuzzy !== undefined) {
          let score = fuzzy(reg.word, term.normal);
          if (score > reg.fuzzy) {
            return true
          }
          // support fuzzy + soft match
          if (reg.soft === true) {
            score = fuzzy(reg.word, term.root);
            if (score > reg.fuzzy) {
              return true
            }
          }
        }
        if (term.alias && term.alias.some(str => str === reg.word)) {
          return true
        }
        //match either .normal or .text
        return reg.word === term.text || reg.word === term.normal
      }
      //support #Tag
      if (reg.tag !== undefined) {
        return term.tags.has(reg.tag) === true
      }
      //support @method
      if (reg.method !== undefined) {
        if (typeof termMethods[reg.method] === 'function' && termMethods[reg.method](term) === true) {
          return true
        }
        return false
      }
      //support /reg/
      if (reg.regex !== undefined) {
        return reg.regex.test(term.normal)
      }
      //support <chunk>
      if (reg.chunk !== undefined) {
        return term.chunk === reg.chunk
      }
      //support {machine}
      if (reg.machine !== undefined) {
        return term.normal === reg.machine || term.machine === reg.machine
      }
      //support {word/sense}
      if (reg.sense !== undefined) {
        return term.sense === reg.sense
      }
      // support optimized (one|two)
      if (reg.fastOr !== undefined) {
        if (term.implicit && reg.fastOr.has(term.implicit) === true) {
          return true
        }
        return reg.fastOr.has(term.normal) || reg.fastOr.has(term.text)
      }
      //support slower (one|two)
      if (reg.choices !== undefined) {
        // try to support && operator
        if (reg.operator === 'and') {
          // must match them all
          return reg.choices.every(r => wrapMatch(term, r, index, length))
        }
        // or must match one
        return reg.choices.some(r => wrapMatch(term, r, index, length))
      }
      return false
    };
    // wrap result for !negative match logic
    wrapMatch = function (t, reg, index, length) {
      let result = doesMatch$1(t, reg, index, length);
      if (reg.negative === true) {
        return !result
      }
      return result
    };
    var matchTerm = wrapMatch;

    const log = msg => {
    };

    // for greedy checking, we no longer care about the reg.start
    // value, and leaving it can cause failures for anchored greedy
    // matches.  ditto for end-greedy matches: we need an earlier non-
    // ending match to succceed until we get to the actual end.
    const getGreedy = function (state, endReg) {
      let reg = Object.assign({}, state.regs[state.r], { start: false, end: false });
      let start = state.t;
      for (; state.t < state.terms.length; state.t += 1) {
        //stop for next-reg match
        if (endReg && matchTerm(state.terms[state.t], endReg, state.start_i + state.t, state.phrase_length)) {
          return state.t
        }
        let count = state.t - start + 1;
        // is it max-length now?
        if (reg.max !== undefined && count === reg.max) {
          return state.t
        }
        //stop here
        if (matchTerm(state.terms[state.t], reg, state.start_i + state.t, state.phrase_length) === false) {
          // is it too short?
          if (reg.min !== undefined && count < reg.min) {
            return null
          }
          return state.t
        }
      }
      return state.t
    };

    const greedyTo = function (state, nextReg) {
      let t = state.t;
      //if there's no next one, just go off the end!
      if (!nextReg) {
        return state.terms.length
      }
      //otherwise, we're looking for the next one
      for (; t < state.terms.length; t += 1) {
        if (matchTerm(state.terms[t], nextReg, state.start_i + t, state.phrase_length) === true) {
          log(`greedyTo ${state.terms[t].normal}`);
          return t
        }
      }
      //guess it doesn't exist, then.
      return null
    };

    const isEndGreedy = function (reg, state) {
      if (reg.end === true && reg.greedy === true) {
        if (state.start_i + state.t < state.phrase_length - 1) {
          let tmpReg = Object.assign({}, reg, { end: false });
          if (matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length) === true) {
            log(`endGreedy ${state.terms[state.t].normal}`);
            return true
          }
        }
      }
      return false
    };

    const doOrBlock = function (state, skipN = 0) {
      let block = state.regs[state.r];
      let wasFound = false;
      // do each multiword sequence
      for (let c = 0; c < block.choices.length; c += 1) {
        // try to match this list of tokens
        let regs = block.choices[c];
        wasFound = regs.every((cr, w_index) => {
          let extra = 0;
          let t = state.t + w_index + skipN + extra;
          if (state.terms[t] === undefined) {
            return false
          }
          let foundBlock = matchTerm(state.terms[t], cr, t + state.start_i, state.phrase_length);
          // this can be greedy - '(foo+ bar)'
          if (foundBlock === true && cr.greedy === true) {
            for (let i = 1; i < state.terms.length; i += 1) {
              let term = state.terms[t + i];
              if (term) {
                let keepGoing = matchTerm(term, cr, state.start_i + i, state.phrase_length);
                if (keepGoing === true) {
                  extra += 1;
                } else {
                  break
                }
              }
            }
          }
          skipN += extra;
          return foundBlock
        });
        if (wasFound) {
          skipN += regs.length;
          break
        }
      }
      // we found a match -  is it greedy though?
      if (wasFound && block.greedy === true) {
        return doOrBlock(state, skipN) // try it again!
      }
      return skipN
    };

    const doAndBlock = function (state) {
      let longest = 0;
      // all blocks must match, and we return the greediest match
      let reg = state.regs[state.r];
      let allDidMatch = reg.choices.every(block => {
        //  for multi-word blocks, all must match
        let allWords = block.every((cr, w_index) => {
          let tryTerm = state.t + w_index;
          if (state.terms[tryTerm] === undefined) {
            return false
          }
          return matchTerm(state.terms[tryTerm], cr, tryTerm, state.phrase_length)
        });
        if (allWords === true && block.length > longest) {
          longest = block.length;
        }
        return allWords
      });
      if (allDidMatch === true) {
        log(`doAndBlock ${state.terms[state.t].normal}`);
        return longest
      }
      return false
    };

    const getGroup$2 = function (state, term_index) {
      if (state.groups[state.inGroup]) {
        return state.groups[state.inGroup]
      }
      state.groups[state.inGroup] = {
        start: term_index,
        length: 0,
      };
      return state.groups[state.inGroup]
    };

    // const log = msg => {
    //   const env = typeof process === undefined ? self.env : process.env
    //   if (env.DEBUG_MATCH === true) {
    //     console.log(`\n  \x1b[32m ${msg} \x1b[0m`) // eslint-disable-line
    //   }
    // }

    // i formally apologize for how complicated this is.
    /** tries to match a sequence of terms, starting from here */
    const tryHere = function (terms, regs, start_i, phrase_length) {
      if (terms.length === 0 || regs.length === 0) {
        return null
      }
      // all the variables that matter
      let state = {
        t: 0,
        terms: terms,
        r: 0,
        regs: regs,
        groups: {},
        start_i: start_i,
        phrase_length: phrase_length,
        inGroup: null,
      };
      // log('-> [' + terms.map(t => t.implicit || t.normal).join(', ') + ']')

      // we must satisfy each rule in 'regs'
      for (; state.r < regs.length; state.r += 1) {
        let reg = regs[state.r];
        // Check if this reg has a named capture group
        state.hasGroup = Boolean(reg.group);
        // Reuse previous capture group if same
        if (state.hasGroup === true) {
          state.inGroup = reg.group;
        } else {
          state.inGroup = null;
        }
        //have we run-out of terms?
        if (!state.terms[state.t]) {
          //are all remaining regs optional or negative?
          const haveNeeds = regs.slice(state.r).some(remain => !remain.optional);
          if (haveNeeds === false) {
            break //done!
          }
          // log(`✗ |terms done|`)
          return null // die
        }
        //support 'unspecific greedy' .* properly
        if (reg.anything === true && reg.greedy === true) {
          let skipto = greedyTo(state, regs[state.r + 1]);
          //maybe we couldn't find it
          if (skipto === null || skipto === 0) {
            return null
          }
          // ensure it's long enough
          if (reg.min !== undefined && skipto - state.t < reg.min) {
            return null
          }
          // reduce it back, if it's too long
          if (reg.max !== undefined && skipto - state.t > reg.max) {
            state.t = state.t + reg.max;
            continue
          }
          // set the group result
          if (state.hasGroup === true) {
            const g = getGroup$2(state, state.t);
            g.length = skipto - state.t;
          }
          state.t = skipto;
          // log(`✓ |greedy|`)
          continue
        }
        // support multi-word OR (a|b|foo bar)
        if (reg.choices !== undefined && reg.operator === 'or') {
          let skipNum = doOrBlock(state);
          if (skipNum) {
            // handle 'not' logic
            if (reg.negative === true) {
              return null // die
            }
            if (state.hasGroup === true) {
              const g = getGroup$2(state, state.t);
              g.length += skipNum;
            }
            // ensure we're at the end
            if (reg.end === true) {
              let end = state.phrase_length - 1;
              if (state.t + state.start_i !== end) {
                return null
              }
            }
            state.t += skipNum;
            // log(`✓ |found-or|`)
            continue
          } else if (!reg.optional) {
            return null //die
          }
        }
        // support AND (#Noun && foo) blocks
        if (reg.choices !== undefined && reg.operator === 'and') {
          let skipNum = doAndBlock(state);
          if (skipNum) {
            // handle 'not' logic
            if (reg.negative === true) {
              return null // die
            }
            if (state.hasGroup === true) {
              const g = getGroup$2(state, state.t);
              g.length += skipNum;
            }
            // ensure we're at the end
            if (reg.end === true) {
              let end = state.phrase_length - 1;
              if (state.t + state.start_i !== end) {
                return null
              }
            }
            state.t += skipNum;
            // log(`✓ |found-and|`)
            continue
          } else if (!reg.optional) {
            return null //die
          }
        }
        // ok, finally test the term/reg
        let term = state.terms[state.t];
        let hasMatch = matchTerm(term, reg, state.start_i + state.t, state.phrase_length);
        if (reg.anything === true || hasMatch === true || isEndGreedy(reg, state)) {
          let startAt = state.t;
          // if it's a negative optional match... :0
          if (reg.optional && regs[state.r + 1] && reg.negative) {
            continue
          }
          // okay, it was a match, but if it's optional too,
          // we should check the next reg too, to skip it?
          if (reg.optional && regs[state.r + 1]) {
            // does the next reg match it too?
            let nextRegMatched = matchTerm(term, regs[state.r + 1], state.start_i + state.t, state.phrase_length);
            if (reg.negative || nextRegMatched) {
              // but does the next reg match the next term??
              // only skip if it doesn't
              let nextTerm = state.terms[state.t + 1];
              if (!nextTerm || !matchTerm(nextTerm, regs[state.r + 1], state.start_i + state.t, state.phrase_length)) {
                state.r += 1;
              }
            }
          }
          // log(`✓ |matched '${state.terms[state.t].normal}'|`)
          //advance to the next term!
          state.t += 1;
          //check any ending '$' flags
          if (reg.end === true) {
            //if this isn't the last term, refuse the match
            if (state.t !== state.terms.length && reg.greedy !== true) {
              // log(`✗ |end-flag|`)
              return null //die
            }
          }
          //try keep it going!
          if (reg.greedy === true) {
            state.t = getGreedy(state, regs[state.r + 1]);
            if (state.t === null) {
              // log(`✗ |too-short|`)
              return null //greedy was too short
            }
            if (reg.min && reg.min > state.t) {
              // log(`✗ |too-short2|`)
              return null //greedy was too short
            }
            // if this was also an end-anchor match, check to see we really
            // reached the end
            if (reg.end === true && state.start_i + state.t !== phrase_length) {
              // log(`✗ |not-end|`)
              return null //greedy didn't reach the end
            }
          }
          if (state.hasGroup === true) {
            // Get or create capture group
            const g = getGroup$2(state, startAt);
            // Update group - add greedy or increment length
            if (state.t > 1 && reg.greedy) {
              g.length += state.t - startAt;
            } else {
              g.length++;
            }
          }
          // should we clump-in the 2nd word of a contraction?
          // let lastTerm = state.terms[state.t - 1]
          // let thisTerm = state.terms[state.t]
          // if (lastTerm && thisTerm && lastTerm.implicit && thisTerm.implicit) {
          //   // only if it wouldn't match, organically
          //   let nextReg = regs[state.r + 1]
          //   if (!nextReg || !matchTerm(thisTerm, nextReg, state.start_i + state.t, state.phrase_length)) {
          //     state.t += 1
          //   }
          // }
          continue
        }

        // ok, it doesn't match.
        // did it *actually match* a negative?
        if (reg.negative) {
          let tmpReg = Object.assign({}, reg);
          tmpReg.negative = false; // try removing it
          let foundNeg = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length);
          if (foundNeg === true) {
            // log(`✗ |no neg|`)
            return null //bye!
          }
        }
        //bah, who cares, keep going
        if (reg.optional === true) {
          // log(`- |optional reg '${reg.word}'|`)
          continue
        }

        if (Boolean(state.terms[state.t].implicit) && regs[state.r - 1] && state.terms[state.t + 1]) {
          // if the last match was implicit too, we're missing a word.
          if (state.terms[state.t - 1] && state.terms[state.t - 1].implicit === regs[state.r - 1].word) {
            return null
          }
          // does the next one match?
          if (matchTerm(state.terms[state.t + 1], reg, state.start_i + state.t, state.phrase_length)) {
            // log(`✓ |contraction| '${state.terms[state.t + 1].implicit}'`)
            state.t += 2;
            continue
          }
        }
        return null //die
      }
      //return our results, as pointers
      let pntr = [null, start_i, state.t + start_i]; //`${start_i}:${state.t + start_i}`
      if (pntr[1] === pntr[2]) {
        // log(`✗ |found nothing|`)
        return null
      }
      let groups = {};
      Object.keys(state.groups).forEach(k => {
        let o = state.groups[k];
        let start = start_i + o.start;
        groups[k] = [null, start, start + o.length]; //`${start}:${start + o.length}`
      });
      return { pointer: pntr, groups: groups }
    };
    var fromHere = tryHere;

    const getGroup = function (res, group) {
      let ptrs = [];
      let byGroup = {};
      if (res.length === 0) {
        return { ptrs, byGroup }
      }
      if (typeof group === 'number') {
        group = String(group);
      }
      if (group) {
        res.forEach(r => {
          if (r.groups[group]) {
            ptrs.push(r.groups[group]);
          }
        });
      } else {
        res.forEach(r => {
          ptrs.push(r.pointer);
          Object.keys(r.groups).forEach(k => {
            byGroup[k] = byGroup[k] || [];
            byGroup[k].push(r.groups[k]);
          });
        });
      }
      return { ptrs, byGroup }
    };
    var getGroup$1 = getGroup;

    // make proper pointers
    const addSentence = function (res, n) {
      res.pointer[0] = n;
      Object.keys(res.groups).forEach(k => {
        res.groups[k][0] = n;
      });
      return res
    };

    const handleStart = function (terms, regs, n) {
      let res = fromHere(terms, regs, 0, terms.length);
      if (res) {
        res = addSentence(res, n);
        return res //getGroup([res], group)
      }
      return null
    };

    // ok, here we go.
    const runMatch = function (docs, todo, cache) {
      cache = cache || [];
      let { regs, group, justOne } = todo;
      let results = [];
      if (!regs || regs.length === 0) {
        return { ptrs: [], byGroup: {} }
      }

      const minLength = regs.filter(r => r.optional !== true && r.negative !== true).length;
      docs: for (let n = 0; n < docs.length; n += 1) {
        let terms = docs[n];
        // can we skip this sentence?
        if (cache[n] && failFast$1(regs, cache[n])) {
          continue
        }
        // ^start regs only run once, per phrase
        if (regs[0].start === true) {
          let foundStart = handleStart(terms, regs, n);
          if (foundStart) {
            results.push(foundStart);
          }
          continue
        }
        //ok, try starting the match now from every term
        for (let i = 0; i < terms.length; i += 1) {
          let slice = terms.slice(i);
          // ensure it's long-enough
          if (slice.length < minLength) {
            break
          }
          let res = fromHere(slice, regs, i, terms.length);
          // did we find a result?
          if (res) {
            res = addSentence(res, n);
            results.push(res);
            // should we stop here?
            if (justOne === true) {
              break docs
            }
            // skip ahead, over these results
            let end = res.pointer[2];
            if (Math.abs(end - 1) > i) {
              i = Math.abs(end - 1);
            }
          }
        }
      }
      // ensure any end-results ($) match until the last term
      if (regs[regs.length - 1].end === true) {
        results = results.filter(res => {
          let n = res.pointer[0];
          return docs[n].length === res.pointer[2]
        });
      }
      // grab the requested group
      results = getGroup$1(results, group);
      return results
    };

    var match$1 = runMatch;

    const methods$7 = {
      one: {
        termMethods,
        parseMatch,
        match: match$1,
      },
    };

    var methods$8 = methods$7;

    var match = {
      api: api$3,
      methods: methods$8,
    };

    // some nice colors for client-side debug
    const css = {
      green: '#7f9c6c',
      red: '#914045',
      blue: '#6699cc',
      magenta: '#6D5685',
      cyan: '#2D85A8',
      yellow: '#e6d7b3',
      black: '#303b50',
    };
    const logClientSide = function (view) {
      let tagset = view.world.tags;
      view.forEach(terms => {
        terms.forEach(t => {
          let tags = Array.from(t.tags);
          let text = t.text || '-';
          if (t.implicit) {
            text = '[' + t.implicit + ']';
          }
          let word = "'" + text + "'";
          word = word.padEnd(8);
          let found = tags.find(tag => tagset[tag] && tagset[tag].color);
          let color = 'steelblue';
          if (tagset[found]) {
            color = tagset[found].color;
            color = css[color];
          }
          console.log(`   ${word}  -  %c${tags.join(', ')}`, `color: ${color || 'steelblue'};`); // eslint-disable-line
        });
      });
    };
    var logClientSide$1 = logClientSide;

    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    const reset = '\x1b[0m';

    //cheaper than requiring chalk
    const cli = {
      green: str => '\x1b[32m' + str + reset,
      red: str => '\x1b[31m' + str + reset,
      blue: str => '\x1b[34m' + str + reset,
      magenta: str => '\x1b[35m' + str + reset,
      cyan: str => '\x1b[36m' + str + reset,
      yellow: str => '\x1b[33m' + str + reset,
      black: str => '\x1b[30m' + str + reset,
      dim: str => '\x1b[2m' + str + reset,
      i: str => '\x1b[3m' + str + reset,
    };
    var cli$1 = cli;

    /* eslint-disable no-console */

    const tagString = function (tags, model) {
      if (model.two.tagSet) {
        tags = tags.map(tag => {
          if (!model.two.tagSet.hasOwnProperty(tag)) {
            return tag
          }
          const c = model.two.tagSet[tag].color || 'blue';
          return cli$1[c](tag)
        });
      }
      return tags.join(', ')
    };

    const showTags = function (view) {
      let { docs, model } = view;
      if (docs.length === 0) {
        console.log(cli$1.blue('\n     ──────'));
      }
      docs.forEach(terms => {
        console.log(cli$1.blue('\n  ┌─────────'));
        terms.forEach(t => {
          let tags = [...(t.tags || [])];
          let text = t.text || '-';
          if (t.sense) {
            text = '{' + t.sense + '}';
          }
          if (t.implicit) {
            text = '[' + t.implicit + ']';
          }
          if (typeof module !== undefined) {
            text = cli$1.yellow(text);
          }
          let word = "'" + text + "'";
          word = word.padEnd(18);
          let str = cli$1.blue('  │ ') + cli$1.i(word) + '  - ' + tagString(tags, model);
          console.log(str);
        });
      });
    };
    var showTags$1 = showTags;

    /* eslint-disable no-console */

    const showChunks = function (view) {
      let { docs } = view;
      console.log('');
      docs.forEach(terms => {
        let out = [];
        terms.forEach(term => {
          if (term.chunk === 'Noun') {
            out.push(cli$1.blue(term.implicit || term.normal));
          } else if (term.chunk === 'Verb') {
            out.push(cli$1.green(term.implicit || term.normal));
          } else if (term.chunk === 'Adjective') {
            out.push(cli$1.yellow(term.implicit || term.normal));
          } else if (term.chunk === 'Pivot') {
            out.push(cli$1.red(term.implicit || term.normal));
          } else {
            out.push(term.implicit || term.normal);
          }
        });
        console.log(out.join(' '), '\n');
      });
    };
    var showChunks$1 = showChunks;

    const split = (txt, offset, index) => {
      let buff = index * 9; //there are 9 new chars addded to each highlight
      let start = offset.start + buff;
      let end = start + offset.length;
      let pre = txt.substring(0, start);
      let mid = txt.substring(start, end);
      let post = txt.substring(end, txt.length);
      return [pre, mid, post]
    };

    const spliceIn = function (txt, offset, index) {
      let parts = split(txt, offset, index);
      return `${parts[0]}${cli$1.blue(parts[1])}${parts[2]}`
    };

    const showHighlight = function (doc) {
      if (!doc.found) {
        return
      }
      let bySentence = {};
      doc.fullPointer.forEach(ptr => {
        bySentence[ptr[0]] = bySentence[ptr[0]] || [];
        bySentence[ptr[0]].push(ptr);
      });
      Object.keys(bySentence).forEach(k => {
        let full = doc.update([[Number(k)]]);
        let txt = full.text();
        let matches = doc.update(bySentence[k]);
        let json = matches.json({ offset: true });
        json.forEach((obj, i) => {
          txt = spliceIn(txt, obj.offset, i);
        });
        console.log(txt); // eslint-disable-line
      });
    };
    var showHighlight$1 = showHighlight;

    /* eslint-disable no-console */

    function isClientSide() {
      return typeof window !== 'undefined' && window.document
    }
    //output some helpful stuff to the console
    const debug = function (opts = {}) {
      let view = this;
      if (typeof opts === 'string') {
        let tmp = {};
        tmp[opts] = true; //allow string input
        opts = tmp;
      }
      if (isClientSide()) {
        logClientSide$1(view);
        return view
      }
      if (opts.tags !== false) {
        showTags$1(view);
        console.log('\n');
      }
      // output chunk-view, too
      if (opts.chunks === true) {
        showChunks$1(view);
        console.log('\n');
      }
      // highlight match in sentence
      if (opts.highlight === true) {
        showHighlight$1(view);
        console.log('\n');
      }
      return view
    };
    var debug$1 = debug;

    /** some named output formats */
    const out$1 = function (method) {
      // text out formats
      if (method === 'text') {
        return this.text()
      }
      if (method === 'normal') {
        return this.text('normal')
      }
      if (method === 'machine' || method === 'reduced') {
        return this.text('machine')
      }

      // json data formats
      if (method === 'json') {
        return this.json()
      }
      if (method === 'offset' || method === 'offsets') {
        this.compute('offset');
        return this.json({ offset: true })
      }
      if (method === 'array') {
        let arr = this.docs.map(terms => {
          return terms
            .reduce((str, t) => {
              return str + t.pre + t.text + t.post
            }, '')
            .trim()
        });
        return arr.filter(str => str)
      }
      // return terms sorted by frequency
      if (method === 'freq' || method === 'frequency' || method === 'topk') {
        let terms = this.compute('freq').terms().unique().termList();
        return terms.sort((a, b) => (a.freq > b.freq ? -1 : 0))
      }

      // some handy ad-hoc outputs
      if (method === 'terms') {
        let list = [];
        this.docs.forEach(s => {
          let terms = s.terms.map(t => t.text);
          terms = terms.filter(t => t);
          list = list.concat(terms);
        });
        return list
      }
      if (method === 'tags') {
        return this.docs.map(terms => {
          return terms.reduce((h, t) => {
            h[t.implicit || t.normal] = Array.from(t.tags);
            return h
          }, {})
        })
      }
      if (method === 'debug') {
        return this.debug()
      }
      return this.text()
    };
    var out$2 = out$1;

    const trimEnd = /[,:;)\]*.?~!\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+/;
    const trimStart =
      /^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/;

    const punctToKill = /[,:;)('"]/;
    const isHyphen = /^[-–—]$/;

    const textFromTerms = function (terms, opts, keepSpace = true) {
      let txt = '';
      terms.forEach(t => {
        let pre = t.pre || '';
        let post = t.post || '';

        if (opts.punctuation === 'some') {
          pre = pre.replace(trimStart, '');
          // replace a hyphen with a space
          if (isHyphen.test(post)) {
            post = ' ';
          }
          post = post.replace(punctToKill, '');
        }
        if (opts.whitespcae === 'some') {
          pre = pre.replace(/\s/, ''); //remove pre-whitespace
          post = post.replace(/\s+/, ' '); //replace post-whitespace with a space
        }
        if (!opts.keepPunct) {
          pre = pre.replace(trimStart, '');
          if (post === '-') {
            post = ' ';
          } else {
            post = post.replace(trimEnd, '');
          }
        }
        // grab the correct word format
        let word = t[opts.use || 'text'] || t.normal || '';
        txt += pre + word + post;
      });
      if (keepSpace === false) {
        txt = txt.trim();
      }
      if (opts.lowerCase === true) {
        txt = txt.toLowerCase();
      }
      return txt
    };

    const textFromDoc = function (docs, opts) {
      let text = '';
      for (let i = 0; i < docs.length; i += 1) {
        // middle
        text += textFromTerms(docs[i], opts, true);
      }
      if (!opts.keepSpace) {
        text = text.trim();
      }
      if (opts.keepPunct === false) {
        text = text.replace(trimStart, '');
        text = text.replace(trimEnd, '');
      }
      if (opts.cleanWhitespace === true) {
        text = text.trim();
      }
      return text
    };

    const termJSON = function (terms) {
      return terms.map(t => {
        let term = Object.assign({}, t);
        term.tags = Array.from(t.tags);
        return term
      })
    };
    const defaults = {
      text: true,
      terms: true,
    };

    const toJson = function (view, opts) {
      opts = opts || {};
      if (typeof opts === 'string') {
        opts = {};
      }
      opts = Object.assign({}, defaults, opts);
      // run any necessary upfront steps
      if (opts.offset) {
        view.compute('offset');
      }
      return view.docs.map(terms => {
        let res = {};
        if (opts.text) {
          res.text = textFromTerms(terms, { keepPunct: true }, false);
        }
        if (opts.normal || opts.machine || opts.reduced) {
          res.normal = textFromTerms(terms, { use: 'normal', punctuation: 'some' }, false);
        }
        if (opts.terms) {
          res.terms = termJSON(terms);
        }
        if (opts.offset) {
          let len = res.text.length;
          res.offset = {
            index: terms[0].offset.index,
            start: terms[0].offset.start,
            length: len,
          };
        }
        return res
      })
    };
    var json = toJson;

    const methods$6 = {
      /** return data */
      json: function (n) {
        let res = json(this, n);
        if (typeof n === 'number') {
          return res[n]
        }
        return res
      },

      /** */
      debug: debug$1,
      /** */
      out: out$2,
    };
    // aliases
    methods$6.data = methods$6.json;

    var out = methods$6;

    const isObject = val => {
      return Object.prototype.toString.call(val) === '[object Object]'
    };

    const fmts = {
      text: {
        use: 'text',
      },
      normal: {
        whitespace: 'some',
        punctuation: 'some',
        case: 'some',
        unicode: 'some',
        use: 'normal',
      },
      machine: {
        whitespace: 'some',
        punctuation: 'some',
        case: 'none',
        unicode: 'some',
        use: 'machine',
      },
      root: {
        whitespace: 'some',
        punctuation: 'some',
        case: 'some',
        unicode: 'some',
        use: 'normal',
      },
    };
    fmts.clean = fmts.normal;
    fmts.reduced = fmts.root;

    var text = {
      /** */
      text: function (fmt) {
        let opts = {
          keepSpace: true,
          keepPunct: true,
        };
        if (fmt && typeof fmt === 'string' && fmts.hasOwnProperty(fmt)) {
          opts = Object.assign({}, fmts[fmt]);
        } else if (fmt && isObject(fmt)) {
          opts = Object.assign({}, fmt, opts);
        }
        if (this.pointer) {
          opts.keepSpace = false;
          let ptr = this.pointer[0];
          if (ptr && ptr[1]) {
            opts.keepPunct = false;
          } else {
            opts.keepPunct = true;
          }
        }
        return textFromDoc(this.docs, opts)
      },
    };

    const methods$5 = Object.assign({}, out, text);

    const addAPI$1 = function (View) {
      Object.assign(View.prototype, methods$5);
    };
    var api$2 = addAPI$1;

    var output = {
      api: api$2,
    };

    // do the pointers intersect?
    const doesOverlap = function (a, b) {
      if (a[0] !== b[0]) {
        return false
      }
      let startA = a[1];
      let startB = b[1];
      // [a,a,a,-,-,-,]
      // [-,-,b,b,b,-,]
      if (startA <= startB && a[2] >= startB) {
        return true
      }
      // [-,-,-,a,a,-,]
      // [-,-,b,b,b,-,]
      if (startB <= startA && b[2] >= startA) {
        return true
      }
      return false
    };

    // get widest min/max
    const getExtent = function (ptrs) {
      let min = ptrs[0][1];
      let max = ptrs[0][2];
      ptrs.forEach(ptr => {
        if (ptr[1] < min) {
          min = ptr[1];
        }
        if (ptr[2] > max) {
          max = ptr[2];
        }
      });
      return [ptrs[0][0], min, max]
    };

    // collect pointers by sentence number
    const indexN = function (ptrs) {
      let byN = {};
      ptrs.forEach(ref => {
        byN[ref[0]] = byN[ref[0]] || [];
        byN[ref[0]].push(ref);
      });
      return byN
    };

    // remove exact duplicates
    const uniquePtrs = function (arr) {
      let obj = {};
      for (let i = 0; i < arr.length; i += 1) {
        obj[arr[i].join(',')] = arr[i];
      }
      return Object.values(obj)
    };

    // a before b
    // console.log(doesOverlap([0, 0, 4], [0, 2, 5]))
    // // b before a
    // console.log(doesOverlap([0, 3, 4], [0, 1, 5]))
    // // disjoint
    // console.log(doesOverlap([0, 0, 3], [0, 4, 5]))

    // console.log(
    //   getExtent([
    //     [0, 3, 4],
    //     [0, 4, 5],
    //     [0, 1, 2],
    //   ])
    // )

    // split a pointer, by match pointer
    const pivotBy = function (full, m) {
      let [n, start] = full;
      let mStart = m[1];
      let mEnd = m[2];
      let res = {};
      // is there space before the match?
      if (start < mStart) {
        let end = mStart < full[2] ? mStart : full[2]; // find closest end-point
        res.before = [n, start, end]; //before segment
      }
      res.match = m;
      // is there space after the match?
      if (full[2] > mEnd) {
        res.after = [n, mEnd, full[2]]; //after segment
      }
      return res
    };

    const doesMatch = function (full, m) {
      return full[1] <= m[1] && m[2] <= full[2]
    };

    const splitAll = function (full, m) {
      let byN = indexN(m);
      let res = [];
      full.forEach(ptr => {
        let [n] = ptr;
        let matches = byN[n] || [];
        matches = matches.filter(p => doesMatch(ptr, p));
        if (matches.length === 0) {
          res.push({ passthrough: ptr });
          return
        }
        // ensure matches are in-order
        matches = matches.sort((a, b) => a[1] - b[1]);
        // start splitting our left-to-right
        let carry = ptr;
        matches.forEach((p, i) => {
          let found = pivotBy(carry, p);
          // last one
          if (!byN[n][i + 1]) {
            res.push(found);
          } else {
            res.push({ before: found.before, match: found.match });
            if (found.after) {
              carry = found.after;
            }
          }
        });
      });
      // console.log(res)
      return res
    };

    var splitAll$1 = splitAll;

    const subtract = function (refs, not) {
      let res = [];
      let found = splitAll$1(refs, not);
      found.forEach(o => {
        if (o.passthrough) {
          res.push(o.passthrough);
        }
        if (o.before) {
          res.push(o.before);
        }
        if (o.after) {
          res.push(o.after);
        }
      });
      return res
    };
    var getDifference = subtract;

    // console.log(subtract([[0, 0, 2]], [[0, 0, 1]]))
    // console.log(subtract([[0, 0, 2]], [[0, 1, 2]]))

    // [a,a,a,a,-,-,]
    // [-,-,b,b,b,-,]
    // [-,-,x,x,-,-,]
    const intersection = function (a, b) {
      // find the latest-start
      let start = a[1] < b[1] ? b[1] : a[1];
      // find the earliest-end
      let end = a[2] > b[2] ? b[2] : a[2];
      // does it form a valid pointer?
      if (start < end) {
        return [a[0], start, end]
      }
      return null
    };

    const getIntersection = function (a, b) {
      let byN = indexN(b);
      let res = [];
      a.forEach(ptr => {
        let hmm = byN[ptr[0]] || [];
        hmm = hmm.filter(p => doesOverlap(ptr, p));
        // no sentence-pairs, so no intersection
        if (hmm.length === 0) {
          return
        }
        // grow all b matches into one match
        hmm = getExtent(hmm);
        let overlap = intersection(ptr, hmm);
        if (overlap) {
          res.push(overlap);
        }
      });

      return res
    };
    var getIntersection$1 = getIntersection;

    // console.log(getIntersection([[0, 1, 3]], [[0, 2, 4]]))

    // a union is a + b, minus duplicates
    const getUnion = function (a, b) {
      let both = a.concat(b);
      let byN = indexN(both);
      let res = [];
      both.forEach(ptr => {
        let [n] = ptr;
        if (byN[n].length === 1) {
          // we're alone on this sentence, so we're good
          res.push(ptr);
          return
        }
        // there may be overlaps
        let hmm = byN[n].filter(m => doesOverlap(ptr, m));
        hmm.push(ptr);
        let range = getExtent(hmm);
        res.push(range);
      });
      res = uniquePtrs(res);
      return res
    };
    var getUnion$1 = getUnion;

    // two disjoint
    // console.log(getUnion([[1, 3, 4]], [[0, 1, 2]]))
    // two disjoint
    // console.log(getUnion([[0, 3, 4]], [[0, 1, 2]]))
    // overlap-plus
    // console.log(getUnion([[0, 1, 4]], [[0, 2, 6]]))
    // overlap
    // console.log(getUnion([[0, 1, 4]], [[0, 2, 3]]))

    const pointerFromTerms = function (docs, document) {};
    var pointerFromTerms$1 = pointerFromTerms;

    // flat list of terms from nested document
    const termList = function (docs) {
      let arr = [];
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          arr.push(docs[i][t]);
        }
      }
      return arr
    };

    /** return a subset of the document, from a pointer */
    const getDoc$1 = function (pointer, document) {
      let doc = [];
      pointer.forEach(ptr => {
        if (!ptr) {
          return
        }
        let [n, start, end] = ptr; //parsePointer(ptr)
        let terms = document[n] || [];
        if (start === undefined) {
          start = 0;
        }
        if (end === undefined) {
          end = terms.length;
        }
        terms = terms.slice(start, end);
        if (terms.length > 0) {
          doc.push(terms);
        }
      });
      return doc
    };

    var methods$4 = {
      one: {
        termList,
        getDoc: getDoc$1,
        getUnion: getUnion$1,
        getIntersection: getIntersection$1,
        getDifference,
        indexN,
        doesOverlap,
        splitAll: splitAll$1,
        pointerFromTerms: pointerFromTerms$1,
      },
    };

    // import { getUnion, getIntersection, getDifference } from '../methods/lib/index.js'

    const getDoc = (m, view) => {
      return typeof m === 'string' ? view.match(m) : m
    };

    const methods$3 = {};

    // all parts, minus duplicates
    methods$3.union = function (m) {
      const { getUnion } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getUnion(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };
    methods$3.and = methods$3.union;

    // only parts they both have
    methods$3.intersection = function (m) {
      const { getIntersection } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getIntersection(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };

    // only parts of a that b does not have
    methods$3.difference = function (m) {
      const { getDifference } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getDifference(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };
    methods$3.not = methods$3.difference;

    // get opposite of a
    methods$3.complement = function () {
      const { getDifference } = this.methods.one;
      let doc = this.all();
      let ptrs = getDifference(doc.fullPointer, this.fullPointer);
      return this.toView(ptrs)
    };

    // remove overlaps
    methods$3.settle = function () {
      const { getUnion } = this.methods.one;
      let ptrs = this.fullPointer;
      ptrs.forEach(ptr => {
        ptrs = getUnion(ptrs, [ptr]);
      });
      return this.update(ptrs)
    };

    var sets = methods$3;

    const addAPI = function (View) {
      // add set/intersection/union
      Object.assign(View.prototype, sets);
    };
    var api$1 = addAPI;

    var pointers = {
      methods: methods$4,
      api: api$1,
    };

    const isMulti = / /;

    const tagTerm = function (term, tag, tagSet, isSafe) {
      // does it already have this tag?
      if (term.tags.has(tag) === true) {
        return null
      }
      // allow this shorthand in multiple-tag strings
      if (tag === '.') {
        return null
      }
      // for known tags, do logical dependencies first
      let known = tagSet[tag];
      if (known) {
        // first, we remove any conflicting tags
        if (known.not && known.not.length > 0) {
          for (let o = 0; o < known.not.length; o += 1) {
            // if we're in tagSafe, skip this term.
            if (isSafe === true && term.tags.has(known.not[o])) {
              return null
            }
            term.tags.delete(known.not[o]);
          }
        }
        // add parent tags
        if (known.parents && known.parents.length > 0) {
          for (let o = 0; o < known.parents.length; o += 1) {
            term.tags.add(known.parents[o]);
          }
        }
      }
      // finally, add our tag
      term.tags.add(tag);
      return true
    };

    // support '#Noun . #Adjective' syntax
    const multiTag = function (terms, tagString, tagSet, isSafe) {
      let tags = tagString.split(isMulti);
      terms.forEach((term, i) => {
        let tag = tags[i];
        if (tag) {
          tag = tag.replace(/^#/, '');
          tagTerm(term, tag, tagSet, isSafe);
        }
      });
    };

    const isArray$2 = function (arr) {
      return Object.prototype.toString.call(arr) === '[object Array]'
    };

    // add a tag to all these terms
    const setTag = function (terms, tag, world = {}, isSafe) {
      const tagSet = world.model.two.tagSet || {};
      if (!tag) {
        return
      }
      if (isArray$2(tag) === true) {
        tag.forEach(tg => setTag(terms, tg, world, isSafe));
        return
      }
      tag = tag.trim();
      // support '#Noun . #Adjective' syntax
      if (isMulti.test(tag)) {
        multiTag(terms, tag, tagSet, isSafe);
        return
      }
      tag = tag.replace(/^#/, '');
      // let set = false
      for (let i = 0; i < terms.length; i += 1) {
        tagTerm(terms[i], tag, tagSet, isSafe);
      }
    };
    var setTag$1 = setTag;

    // remove this tag, and its children, from these terms
    const unTag = function (terms, tag, tagSet) {
      tag = tag.trim().replace(/^#/, '');
      for (let i = 0; i < terms.length; i += 1) {
        let term = terms[i];
        // support clearing all tags, with '*'
        if (tag === '*') {
          term.tags.clear();
          continue
        }
        // for known tags, do logical dependencies first
        let known = tagSet[tag];
        // removing #Verb should also remove #PastTense
        if (known && known.children.length > 0) {
          for (let o = 0; o < known.children.length; o += 1) {
            term.tags.delete(known.children[o]);
          }
        }
        term.tags.delete(tag);
      }
    };
    var unTag$1 = unTag;

    var methods$2 = {
      one: {
        setTag: setTag$1,
        unTag: unTag$1,
      },
    };

    /* eslint no-console: 0 */
    const isArray$1 = function (arr) {
      return Object.prototype.toString.call(arr) === '[object Array]'
    };
    const fns = {
      /** add a given tag, to all these terms */
      tag: function (input, reason = '', isSafe) {
        if (!this.found || !input) {
          return this
        }
        let terms = this.termList();
        if (terms.length === 0) {
          return this
        }
        const { methods, verbose, world } = this;
        // logger
        if (verbose === true) {
          console.log(' +  ', input, reason || '');
        }
        if (isArray$1(input)) {
          input.forEach(tag => methods.one.setTag(terms, tag, world, isSafe));
        } else {
          methods.one.setTag(terms, input, world, isSafe);
        }
        return this
      },

      /** add a given tag, only if it is consistent */
      tagSafe: function (input, reason = '') {
        return this.tag(input, reason, true)
      },

      /** remove a given tag from all these terms */
      unTag: function (input, reason) {
        if (!this.found || !input) {
          return this
        }
        let terms = this.termList();
        if (terms.length === 0) {
          return this
        }
        const { methods, verbose, model } = this;
        // logger
        if (verbose === true) {
          console.log(' -  ', input, reason || '');
        }
        let tagSet = model.two.tagSet;
        if (isArray$1(input)) {
          input.forEach(tag => methods.one.unTag(terms, tag, tagSet));
        } else {
          methods.one.unTag(terms, input, tagSet);
        }
        return this
      },

      /** return only the terms that can be this tag  */
      canBe: function (tag) {
        let tagSet = this.model.two.tagSet;
        // everything can be an unknown tag
        if (!tagSet.hasOwnProperty(tag)) {
          return this
        }
        let not = tagSet[tag].not || [];
        let nope = [];
        this.document.forEach((terms, n) => {
          terms.forEach((term, i) => {
            let found = not.find(no => term.tags.has(no));
            if (found) {
              nope.push([n, i, i + 1]);
            }
          });
        });
        let noDoc = this.update(nope);
        return this.difference(noDoc)
      },
    };
    var tag$1 = fns;

    const tagAPI = function (View) {
      Object.assign(View.prototype, tag$1);
    };
    var api = tagAPI;

    var tag = {
      methods: methods$2,
      api,
    };

    const initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s|$)/g;
    const newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats
    // Start with a regex:
    const basicSplit = function (text) {
      let all = [];
      //first, split by newline
      let lines = text.split(newLine);
      for (let i = 0; i < lines.length; i++) {
        //split by period, question-mark, and exclamation-mark
        let arr = lines[i].split(initSplit);
        for (let o = 0; o < arr.length; o++) {
          all.push(arr[o]);
        }
      }
      return all
    };
    var basicSplit$1 = basicSplit;

    const isAcronym$1 = /[ .][A-Z]\.? *$/i;
    const hasEllipse = /(?:\u2026|\.{2,}) *$/;
    const hasLetter$1 = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;

    /** does this look like a sentence? */
    const isSentence = function (str, abbrevs) {
      // must have a letter
      if (hasLetter$1.test(str) === false) {
        return false
      }
      // check for 'F.B.I.'
      if (isAcronym$1.test(str) === true) {
        return false
      }
      //check for '...'
      if (hasEllipse.test(str) === true) {
        return false
      }
      let txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '');
      let words = txt.split(' ');
      let lastWord = words[words.length - 1].toLowerCase();
      // check for 'Mr.'
      if (abbrevs.hasOwnProperty(lastWord) === true) {
        return false
      }
      // //check for jeopardy!
      // if (blacklist.hasOwnProperty(lastWord)) {
      //   return false
      // }
      return true
    };
    var isSentence$1 = isSentence;

    //(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
    // Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
    //regs-
    const hasSomething = /\S/;
    const startWhitespace = /^\s+/;
    const hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;

    const splitSentences = function (text, model) {
      let abbrevs = model.one.abbreviations || new Set();
      text = text || '';
      text = String(text);
      let sentences = [];
      // First do a greedy-split..
      let chunks = [];
      // Ensure it 'smells like' a sentence
      if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
        return sentences
      }
      // cleanup unicode-spaces
      text = text.replace('\xa0', ' ');
      // Start somewhere:
      let splits = basicSplit$1(text);
      // Filter-out the crap ones
      for (let i = 0; i < splits.length; i++) {
        let s = splits[i];
        if (s === undefined || s === '') {
          continue
        }
        //this is meaningful whitespace
        if (hasSomething.test(s) === false || hasLetter.test(s) === false) {
          //add it to the last one
          if (chunks[chunks.length - 1]) {
            chunks[chunks.length - 1] += s;
            continue
          } else if (splits[i + 1]) {
            //add it to the next one
            splits[i + 1] = s + splits[i + 1];
            continue
          }
        }
        //else, only whitespace, no terms, no sentence
        chunks.push(s);
      }
      //detection of non-sentence chunks:
      //loop through these chunks, and join the non-sentence chunks back together..
      for (let i = 0; i < chunks.length; i++) {
        let c = chunks[i];
        //should this chunk be combined with the next one?
        if (chunks[i + 1] && isSentence$1(c, abbrevs, hasLetter) === false) {
          chunks[i + 1] = c + (chunks[i + 1] || '');
        } else if (c && c.length > 0) {
          //this chunk is a proper sentence..
          sentences.push(c);
          chunks[i] = '';
        }
      }
      //if we never got a sentence, return the given text
      if (sentences.length === 0) {
        return [text]
      }
      //move whitespace to the ends of sentences, when possible
      //['hello',' world'] -> ['hello ','world']
      for (let i = 1; i < sentences.length; i += 1) {
        let ws = sentences[i].match(startWhitespace);
        if (ws !== null) {
          sentences[i - 1] += ws[0];
          sentences[i] = sentences[i].replace(startWhitespace, '');
        }
      }
      return sentences
    };
    var sentence = splitSentences;

    const hasHyphen = function (str) {
      //dont split 're-do'
      if (/^(re|un|micro|macro|trans|bi|mono|over)-?[^aeiou]./.test(str) === true) {
        return false
      }
      //dont split 'bat-like'
      if (/^([a-z\u00C0-\u00FF/]+)[-–—](like|ish|less|able)/i.test(str) === true) {
        return false
      }
      //letter-number 'aug-20'
      let reg = /^([a-z\u00C0-\u00FF`"'/]+)[-–—]([a-z0-9\u00C0-\u00FF].*)/i;
      if (reg.test(str) === true) {
        return true
      }
      //number-letter '20-aug'
      let reg2 = /^([0-9]{1,4})[-–—]([a-z\u00C0-\u00FF`"'/-]+$)/i;
      if (reg2.test(str) === true) {
        return true
      }
      return false
    };

    const splitHyphens = function (word) {
      let arr = [];
      //support multiple-hyphenated-terms
      const hyphens = word.split(/[-–—]/);
      let whichDash = '-';
      let found = word.match(/[-–—]/);
      if (found && found[0]) {
        whichDash = found;
      }
      for (let o = 0; o < hyphens.length; o++) {
        if (o === hyphens.length - 1) {
          arr.push(hyphens[o]);
        } else {
          arr.push(hyphens[o] + whichDash);
        }
      }
      return arr
    };

    // combine '2 - 5' like '2-5' is
    // 2-4: 2, 4
    const combineRanges = function (arr) {
      const startRange = /^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?[-–—] ?$/;
      const endRange = /^[0-9]{1,4}([a-z]{1,2})? ?$/;
      for (let i = 0; i < arr.length - 1; i += 1) {
        if (arr[i + 1] && startRange.test(arr[i]) && endRange.test(arr[i + 1])) {
          arr[i] = arr[i] + arr[i + 1];
          arr[i + 1] = null;
        }
      }
      return arr
    };
    var combineRanges$1 = combineRanges;

    const isSlash = /[a-z] ?\/ ?[a-z]+$/;
    // 'he / she' should be one word
    const combineSlashes = function (arr) {
      for (let i = 1; i < arr.length - 1; i++) {
        if (isSlash.test(arr[i])) {
          arr[i - 1] += arr[i] + arr[i + 1];
          arr[i] = null;
          arr[i + 1] = null;
        }
      }
      return arr
    };
    var combineSlashes$1 = combineSlashes;

    const wordlike = /\S/;
    const isBoundary = /^[!?.]+$/;
    const naiiveSplit = /(\S+)/;

    let notWord = ['.', '?', '!', ':', ';', '-', '–', '—', '--', '...', '(', ')', '[', ']', '"', "'", '`'];
    notWord = notWord.reduce((h, c) => {
      h[c] = true;
      return h
    }, {});

    const isArray = function (arr) {
      return Object.prototype.toString.call(arr) === '[object Array]'
    };

    //turn a string into an array of strings (naiive for now, lumped later)
    const splitWords = function (str) {
      let result = [];
      let arr = [];
      //start with a naiive split
      str = str || '';
      if (typeof str === 'number') {
        str = String(str);
      }
      if (isArray(str)) {
        return str
      }
      const words = str.split(naiiveSplit);
      for (let i = 0; i < words.length; i++) {
        //split 'one-two'
        if (hasHyphen(words[i]) === true) {
          arr = arr.concat(splitHyphens(words[i]));
          continue
        }
        arr.push(words[i]);
      }
      //greedy merge whitespace+arr to the right
      let carry = '';
      for (let i = 0; i < arr.length; i++) {
        let word = arr[i];
        //if it's more than a whitespace
        if (wordlike.test(word) === true && notWord.hasOwnProperty(word) === false && isBoundary.test(word) === false) {
          //put whitespace on end of previous term, if possible
          if (result.length > 0) {
            result[result.length - 1] += carry;
            result.push(word);
          } else {
            //otherwise, but whitespace before
            result.push(carry + word);
          }
          carry = '';
        } else {
          carry += word;
        }
      }
      //handle last one
      if (carry) {
        if (result.length === 0) {
          result[0] = '';
        }
        result[result.length - 1] += carry; //put it on the end
      }
      // combine 'one / two'
      result = combineSlashes$1(result);
      result = combineRanges$1(result);
      // remove empty results
      result = result.filter(s => s);
      return result
    };
    var term = splitWords;

    //all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
    //we have slightly different rules for start/end - like #hashtags.
    const startings =
      /^[ \n\t.[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/;
    const endings =
      /[ \n\t.'[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/;
    const hasApostrophe = /['’]/;
    const hasAcronym = /^[a-z]\.([a-z]\.)+/i;
    const minusNumber = /^[-+.][0-9]/;
    const shortYear = /^'[0-9]{2}/;

    const normalizePunctuation = function (str) {
      let original = str;
      let pre = '';
      let post = '';
      // number cleanups
      str = str.replace(startings, found => {
        pre = found;
        // support '-40'
        if ((pre === '-' || pre === '+' || pre === '.') && minusNumber.test(str)) {
          pre = '';
          return found
        }
        // support years like '97
        if (pre === `'` && shortYear.test(str)) {
          pre = '';
          return found
        }
        return ''
      });
      str = str.replace(endings, found => {
        post = found;
        // keep s-apostrophe - "flanders'" or "chillin'"
        if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
          post = post.replace(hasApostrophe, '');
          return `'`
        }
        //keep end-period in acronym
        if (hasAcronym.test(str) === true) {
          post = post.replace(/\./, '');
          return '.'
        }
        return ''
      });
      //we went too far..
      if (str === '') {
        // do a very mild parse, and hope for the best.
        original = original.replace(/ *$/, after => {
          post = after || '';
          return ''
        });
        str = original;
        pre = '';
      }
      return { str, pre, post }
    };
    var tokenize$2 = normalizePunctuation;

    const parseTerm = txt => {
      // cleanup any punctuation as whitespace
      let { str, pre, post } = tokenize$2(txt);
      const parsed = {
        text: str,
        pre: pre,
        post: post,
        tags: new Set(),
      };
      return parsed
    };
    var whitespace = parseTerm;

    // turn a string input into a 'document' json format
    const tokenize$1 = function (input, world) {
      const { methods, model, compute } = world;
      const { splitSentences, splitTerms, splitWhitespace } = methods.one;
      input = input || '';
      if (typeof input === 'number') {
        input = String(input);
      }
      if (typeof input === 'string') {
        // split into sentences
        let sentences = splitSentences(input, model);
        // split into word objects
        input = sentences.map(txt => {
          let terms = splitTerms(txt);
          // split into [pre-text-post]
          return terms.map(splitWhitespace)
        });
        // add normalized term format, always
        compute.normal(input);
        // support slashes, apostrophes, etc
        // compute.alias(input, world)
      }
      return input
    };

    var methods$1 = {
      one: {
        splitSentences: sentence,
        splitTerms: term,
        splitWhitespace: whitespace,
        tokenize: tokenize$1,
      },
    };

    const aliases = {
      '&': 'and',
      '@': 'at',
      '%': 'percent',
    };
    var aliases$1 = aliases;

    var misc = [
      'approx',
      'apt',
      'bc',
      'cyn',
      'eg',
      'esp',
      'est',
      'etc',
      'ex',
      'exp',
      'prob', //probably
      'pron', // Pronunciation
      'gal', //gallon
      'min',
      'pseud',
      'fig', //figure
      'jd',
      'lat', //latitude
      'lng', //longitude
      'vol', //volume
      'fm', //not am
      'def', //definition
      'misc',
      'plz', //please
      'ea', //each
      'ps',
      'sec', //second
      'pt',
      'pref', //preface
      'pl', //plural
      'pp', //pages
      'qt', //quarter
      'fr', //french
      'sq',
      'nee', //given name at birth
      'ss', //ship, or sections
      'tel',
      'temp',
      'vet',
      'ver', //version
      'fem', //feminine
      'masc', //masculine
      'eng', //engineering/english
      'adj', //adjective
      'vb', //verb
      'rb', //adverb
      'inf', //infinitive
      'situ', // in situ
      'vivo',
      'vitro',
      'wr', //world record
    ];

    var honorifics = [
      'adj',
      'adm',
      'adv',
      'asst',
      'atty',
      'bldg',
      'brig',
      'capt',
      'cmdr',
      'comdr',
      'cpl',
      'det',
      'dr',
      'esq',
      'gen',
      'gov',
      'hon',
      'jr',
      'llb',
      'lt',
      'maj',
      'messrs',
      'mister',
      'mlle',
      'mme',
      'mr',
      'mrs',
      'ms',
      'mstr',
      'phd',
      'prof',
      'pvt',
      'rep',
      'reps',
      'res',
      'rev',
      'sen',
      'sens',
      'sfc',
      'sgt',
      'sir',
      'sr',
      'supt',
      'surg',
      //miss
      //misses
    ];

    var months = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec'];

    var nouns = [
      'ad',
      'al',
      'arc',
      'ba',
      'bl',
      'ca',
      'cca',
      'col',
      'corp',
      'ft',
      'fy',
      'ie',
      'lit',
      'ma',
      'md',
      'pd',
      'tce',
    ];

    var organizations = ['dept', 'univ', 'assn', 'bros', 'inc', 'ltd', 'co'];

    var places = [
      'rd',
      'st',
      'dist',
      'mt',
      'ave',
      'blvd',
      'cl',
      // 'ct',
      'cres',
      'hwy',
      //states
      'ariz',
      'cal',
      'calif',
      'colo',
      'conn',
      'fla',
      'fl',
      'ga',
      'ida',
      'ia',
      'kan',
      'kans',

      'minn',
      'neb',
      'nebr',
      'okla',
      'penna',
      'penn',
      'pa',
      'dak',
      'tenn',
      'tex',
      'ut',
      'vt',
      'va',
      'wis',
      'wisc',
      'wy',
      'wyo',
      'usafa',
      'alta',
      'ont',
      'que',
      'sask',
    ];

    // units that are abbreviations too
    var units = [
      'dl',
      'ml',
      'gal',
      'ft', //ambiguous
      'qt',
      'pt',
      'tbl',
      'tsp',
      'tbsp',
      'km',
      'dm', //decimeter
      'cm',
      'mm',
      'mi',
      'td',
      'hr', //hour
      'hrs', //hour
      'kg',
      'hg',
      'dg', //decigram
      'cg', //centigram
      'mg', //milligram
      'µg', //microgram
      'lb', //pound
      'oz', //ounce
      'sq ft',
      'hz', //hertz
      'mps', //meters per second
      'mph',
      'kmph', //kilometers per hour
      'kb', //kilobyte
      'mb', //megabyte
      'gb', //ambig
      'tb', //terabyte
      'lx', //lux
      'lm', //lumen
      'pa', //ambig
      'fl oz', //

      'yb',
    ];

    // add our abbreviation list to our lexicon
    let list = [
      [misc],
      [units, 'Unit'],
      [nouns, 'Noun'],
      [honorifics, 'Honorific'],
      [months, 'Month'],
      [organizations, 'Organization'],
      [places, 'Place'],
    ];
    // create key-val for sentence-tokenizer
    let abbreviations = {};
    // add them to a future lexicon
    let lexicon = {};

    list.forEach(a => {
      a[0].forEach(w => {
        // sentence abbrevs
        abbreviations[w] = true;
        // future-lexicon
        lexicon[w] = 'Abbreviation';
        if (a[1] !== undefined) {
          lexicon[w] = [lexicon[w], a[1]];
        }
      });
    });

    var model = {
      one: {
        aliases: aliases$1,
        abbreviations,
      },
      two: {
        lexicon, //give this one forward
      },
    };

    const hasSlash = /\//;
    const hasDomain = /[a-z]\.[a-z]/i;
    const isMath = /[0-9]/;
    // const hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/
    // const hasApostrophe = /['’]s$/

    const addAliases = function (term, world) {
      let str = term.normal || term.text;
      const aliases = world.model.one.aliases;
      // lookup known aliases like '&'
      if (aliases.hasOwnProperty(str)) {
        term.alias = term.alias || [];
        term.alias.push(aliases[str]);
      }
      // support slashes as aliases
      if (hasSlash.test(str) && !hasDomain.test(str) && !isMath.test(str)) {
        let arr = str.split(hasSlash);
        // don't split urls and things
        if (arr.length <= 2) {
          arr.forEach(word => {
            word = word.trim();
            if (word !== '') {
              term.alias = term.alias || [];
              term.alias.push(word);
            }
          });
        }
      }
      // aliases for apostrophe-s
      // if (hasApostrophe.test(str)) {
      //   let main = str.replace(hasApostrophe, '').trim()
      //   term.alias = term.alias || []
      //   term.alias.push(main)
      // }
      return term
    };
    var alias = addAliases;

    /** some basic operations on a string to reduce noise */
    const clean = function (str) {
      str = str || '';
      str = str.toLowerCase();
      str = str.trim();
      let original = str;
      //punctuation
      str = str.replace(/[,;.!?]+$/, '');
      // coerce single curly quotes
      str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'");
      // coerce double curly quotes
      str = str.replace(
        /[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g,
        '"'
      );
      //coerce Unicode ellipses
      str = str.replace(/\u2026/g, '...');
      //en-dash
      str = str.replace(/\u2013/g, '-');
      //strip leading & trailing grammatical punctuation
      if (/^[:;]/.test(str) === false) {
        str = str.replace(/\.{3,}$/g, '');
        str = str.replace(/[",.!:;?)]+$/g, '');
        str = str.replace(/^['"(]+/g, '');
      }
      // remove zero-width characters
      str = str.replace(/[\u200B-\u200D\uFEFF]/g, '');
      //do this again..
      str = str.trim();
      //oh shucks,
      if (str === '') {
        str = original;
      }
      //no-commas in numbers
      str = str.replace(/([0-9]),([0-9])/g, '$1$2');
      return str
    };
    var cleanup = clean;

    //a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
    //approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
    //http://en.wikipedia.org/wiki/List_of_Unicode_characters
    //https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
    let compact = {
      '!': '¡',
      '?': '¿Ɂ',
      '"': '“”"❝❞',
      "'": '‘‛❛❜',
      '-': '—–',
      a: 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ',
      b: 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ',
      c: '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ',
      d: 'ÐĎďĐđƉƊȡƋƌ',
      e: 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ',
      f: 'ƑƒϜϝӺӻҒғſ',
      g: 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
      h: 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
      I: 'ÌÍÎÏ',
      i: 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
      j: 'ĴĵǰȷɈɉϳЈј',
      k: 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
      l: 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
      m: 'ΜϺϻМмӍӎ',
      n: 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
      o: 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ',
      p: 'ƤΡρϷϸϼРрҎҏÞ',
      q: 'Ɋɋ',
      r: 'ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ',
      s: 'ŚśŜŝŞşŠšƧƨȘșȿЅѕ',
      t: 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт',
      u: 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ',
      v: 'νѴѵѶѷ',
      w: 'ŴŵƜωώϖϢϣШЩшщѡѿ',
      x: '×ΧχϗϰХхҲҳӼӽӾӿ',
      y: 'ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
      z: 'ŹźŻżŽžƵƶȤȥɀΖ',
    };
    //decompress data into two hashes
    let unicode = {};
    Object.keys(compact).forEach(function (k) {
      compact[k].split('').forEach(function (s) {
        unicode[s] = k;
      });
    });
    const killUnicode = str => {
      let chars = str.split('');
      chars.forEach((s, i) => {
        if (unicode[s]) {
          chars[i] = unicode[s];
        }
      });
      return chars.join('')
    };
    var doUnicode = killUnicode;

    const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
    const oneLetterAcronym = /^[A-Z]\.,?$/;
    const noPeriodAcronym = /[A-Z]{2,}('s|,)?$/;
    const lowerCaseAcronym = /([a-z]\.)+[a-z]\.?$/;

    const isAcronym = function (str) {
      //like N.D.A
      if (periodAcronym.test(str) === true) {
        return true
      }
      //like c.e.o
      if (lowerCaseAcronym.test(str) === true) {
        return true
      }
      //like 'F.'
      if (oneLetterAcronym.test(str) === true) {
        return true
      }
      //like NDA
      if (noPeriodAcronym.test(str) === true) {
        return true
      }
      return false
    };

    const doAcronym = function (str) {
      if (isAcronym(str)) {
        str = str.replace(/\./g, '');
      }
      return str
    };
    var doAcronyms = doAcronym;

    const normalize = function (term) {
      let str = term.text || '';
      str = cleanup(str);
      //(very) rough ASCII transliteration -  bjŏrk -> bjork
      str = doUnicode(str);
      str = doAcronyms(str);
      term.normal = str;
    };
    var normal = normalize;

    // 'machine' is a normalized form that looses human-readability
    const doMachine = function (term) {
      let str = term.implicit || term.normal || term.text;
      // remove apostrophes
      str = str.replace(/['’]s$/, '');
      str = str.replace(/s['’]$/, 's');
      //lookin'->looking (make it easier for conjugation)
      str = str.replace(/([aeiou][ktrp])in$/, '$1ing');

      //turn re-enactment to reenactment
      if (/^(re|un)-?[^aeiou]./.test(str) === true) {
        str = str.replace('-', '');
      }

      //#tags, @mentions
      str = str.replace(/^[#@]/, '');
      if (str !== term.normal) {
        term.machine = str;
      }
    };
    var machine = doMachine;

    // sort words by frequency
    const freq = function (docs) {
      let counts = {};
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          let term = docs[i][t];
          let word = term.machine || term.normal;
          counts[word] = counts[word] || 0;
          counts[word] += 1;
        }
      }
      // add counts on each term
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          let term = docs[i][t];
          let word = term.machine || term.normal;
          term.freq = counts[word];
        }
      }
    };
    var freq$1 = freq;

    // get all character startings in doc
    const offset = function (_docs, _a, b) {
      let elapsed = 0;
      let index = 0;
      let docs = b.document; //start from the actual-top
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          let term = docs[i][t];
          term.offset = {
            index: index,
            start: elapsed + term.pre.length,
            length: term.text.length,
          };
          elapsed += term.pre.length + term.text.length + term.post.length;
          index += 1;
        }
      }
    };


    var offset$1 = offset;

    // cheat- add the document's pointer to the terms
    const index = function (_d, _w, view) {
      let document = view.document;
      for (let n = 0; n < document.length; n += 1) {
        for (let i = 0; i < document[n].length; i += 1) {
          document[n][i].index = [n, i];
        }
      }
      // let ptrs = b.fullPointer
      // console.log(ptrs)
      // for (let i = 0; i < docs.length; i += 1) {
      //   const [n, start] = ptrs[i]
      //   for (let t = 0; t < docs[i].length; t += 1) {
      //     let term = docs[i][t]
      //     term.index = [n, start + t]
      //   }
      // }
    };

    var index$1 = index;

    const wordCount = function (docs) {
      let n = 0;
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          if (docs[i][t].normal === '') {
            continue //skip implicit words
          }
          n += 1;
          docs[i][t].wordCount = n;
        }
      }
    };

    var wordCount$1 = wordCount;

    // cheat-method for a quick loop
    const termLoop = function (docs, fn, world) {
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          fn(docs[i][t], world);
        }
      }
    };

    const methods = {
      alias: (docs, world) => termLoop(docs, alias, world),
      normal: (docs, world) => termLoop(docs, normal, world),
      machine: (docs, world) => termLoop(docs, machine, world),
      freq: freq$1,
      offset: offset$1,
      index: index$1,
      wordCount: wordCount$1,
    };
    var compute = methods;

    var tokenize = {
      compute: compute,
      methods: methods$1,
      model: model,
      hooks: ['alias', 'machine', 'index'],
    };

    // const plugin = function (world) {
    //   let { methods, model, parsers } = world
    //   Object.assign({}, methods, _methods)
    //   Object.assign(model, _model)
    //   methods.one.tokenize = tokenize
    //   parsers.push('normal')
    //   parsers.push('alias')
    //   parsers.push('machine')
    //   // extend View class
    //   // addMethods(View)
    // }
    // export default plugin

    nlp$1.extend(change); //0kb
    nlp$1.extend(output); //0kb
    nlp$1.extend(match); //10kb
    nlp$1.extend(pointers); //2kb
    nlp$1.extend(tag); //2kb
    nlp$1.extend(tokenize); //7kb

    /* src/demos/Tokenize.svelte generated by Svelte v3.43.0 */

    const file$8 = "src/demos/Tokenize.svelte";

    function create_fragment$9(ctx) {
    	let div1;
    	let textarea;
    	let t0;
    	let div0;
    	let pre;
    	let t1_value = JSON.stringify(/*json*/ ctx[0], null, 1) + "";
    	let t1;
    	let current;

    	textarea = new Textarea({
    			props: {
    				value: /*text*/ ctx[1],
    				size: "18px",
    				cb: /*onchange*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(textarea.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			pre = element("pre");
    			t1 = text$1(t1_value);
    			add_location(pre, file$8, 30, 4, 997);
    			attr_dev(div0, "class", "json down svelte-rgvpo4");
    			add_location(div0, file$8, 29, 2, 969);
    			set_style(div1, "min-width", "800px");
    			add_location(div1, file$8, 27, 0, 882);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(textarea, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, pre);
    			append_dev(pre, t1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*json*/ 1) && t1_value !== (t1_value = JSON.stringify(/*json*/ ctx[0], null, 1) + "")) set_data_dev(t1, t1_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(textarea);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tokenize', slots, []);
    	let text = `Maybe it's the beer talking, Marge. But you've got a butt that won't quit. They've got these big chewy pretzels here <undecipherable slurring> five dollars?! Get outta here!`;

    	let json = nlp$1(text).json({
    		terms: {
    			tags: false,
    			index: false,
    			machine: false
    		}
    	});

    	const onchange = function (txt) {
    		$$invalidate(0, json = nlp$1(txt).json());
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tokenize> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Textarea, nlp: nlp$1, text, json, onchange });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('json' in $$props) $$invalidate(0, json = $$props.json);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [json, text, onchange];
    }

    class Tokenize extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tokenize",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/One.svelte generated by Svelte v3.43.0 */
    const file$7 = "src/One.svelte";

    // (12:0) <Page>
    function create_default_slot_6$2(ctx) {
    	let block;
    	let current;

    	block = new Block({
    			props: { color: "#D68881" },
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(12:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (16:2) <Left>
    function create_default_slot_5$3(ctx) {
    	let kbd;
    	let span0;
    	let t2;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let span1;
    	let t6;
    	let t7;
    	let div2;
    	let t9;
    	let div3;
    	let tokenize;
    	let current;
    	tokenize = new Tokenize({ $$inline: true });

    	const block = {
    		c: function create() {
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			span0 = element("span");
    			span0.textContent = ":";
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div1 = element("div");
    			t4 = text$1("- ");
    			span1 = element("span");
    			span1.textContent = "  splitting - it - up  ";
    			t6 = text$1(" -");
    			t7 = space();
    			div2 = element("div");
    			div2.textContent = "turn your novel into JSON -";
    			t9 = space();
    			div3 = element("div");
    			create_component(tokenize.$$.fragment);
    			set_style(kbd, "font-size", "2rem");
    			set_style(kbd, "line-height", "2rem");
    			add_location(kbd, file$7, 16, 4, 410);
    			attr_dev(span0, "class", "f2");
    			add_location(span0, file$7, 16, 70, 476);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file$7, 17, 4, 506);
    			set_style(span1, "border-bottom", "4px solid #D68881");
    			set_style(span1, "padding-bottom", "5px");
    			add_location(span1, file$7, 19, 8, 596);
    			attr_dev(div1, "class", "tab");
    			set_style(div1, "font-size", "1.8rem");
    			add_location(div1, file$7, 18, 4, 543);
    			attr_dev(div2, "class", "down tab");
    			add_location(div2, file$7, 21, 4, 720);
    			attr_dev(div3, "class", "");
    			set_style(div3, "margin-top", "4.5rem");
    			add_location(div3, file$7, 22, 4, 780);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, kbd, anchor);
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(div1, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div3, anchor);
    			mount_component(tokenize, div3, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tokenize.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tokenize.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(kbd);
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div3);
    			destroy_component(tokenize);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(16:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (27:2) <One>
    function create_default_slot_4$4(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t2;
    	let div2;
    	let t3;
    	let span0;
    	let t5;
    	let span1;
    	let t7;
    	let span2;
    	let t9;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text$1("with a one-liner-\n\n      ");
    			div0 = element("div");
    			div0.textContent = "in a couple milliseconds";
    			t2 = space();
    			div2 = element("div");
    			t3 = text$1("split text into ");
    			span0 = element("span");
    			span0.textContent = "sentences";
    			t5 = text$1(" and ");
    			span1 = element("span");
    			span1.textContent = "words";
    			t7 = text$1(" and\n      ");
    			span2 = element("span");
    			span2.textContent = "punctuation";
    			t9 = text$1(".");
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$7, 33, 6, 1099);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$7, 30, 4, 1050);
    			attr_dev(span0, "class", "cherry");
    			add_location(span0, file$7, 36, 22, 1202);
    			attr_dev(span1, "class", "rose");
    			add_location(span1, file$7, 36, 64, 1244);
    			attr_dev(span2, "class", "sky");
    			add_location(span2, file$7, 37, 6, 1286);
    			attr_dev(div2, "class", "tab");
    			add_location(div2, file$7, 35, 4, 1162);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t3);
    			append_dev(div2, span0);
    			append_dev(div2, t5);
    			append_dev(div2, span1);
    			append_dev(div2, t7);
    			append_dev(div2, span2);
    			append_dev(div2, t9);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$4.name,
    		type: "slot",
    		source: "(27:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (42:2) <One>
    function create_default_slot_3$4(ctx) {
    	let div0;
    	let t1;
    	let div3;
    	let t2;
    	let div1;
    	let t4;
    	let div2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "the tokenizer's been refined over 10 ruthless github-years";
    			t1 = space();
    			div3 = element("div");
    			t2 = text$1("when someone tells you it's impossible,\n      ");
    			div1 = element("div");
    			div1.textContent = "give a polite shrug.";
    			t4 = space();
    			div2 = element("div");
    			div2.textContent = "haha, i dunno man!";
    			attr_dev(div0, "class", "down");
    			add_location(div0, file$7, 42, 4, 1357);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$7, 50, 6, 1869);
    			attr_dev(div2, "class", "tab i f09 down");
    			add_location(div2, file$7, 51, 6, 1919);
    			attr_dev(div3, "class", "tab down f09");
    			add_location(div3, file$7, 48, 4, 1790);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(42:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (56:2) <One>
    function create_default_slot_2$4(ctx) {
    	let div1;
    	let kbd;
    	let t1;
    	let div0;
    	let t3;
    	let grid;
    	let current;

    	grid = new Grid({
    			props: { seed: "1645e30c3c09ed478e5" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "is 20kb of javascript:";
    			t3 = space();
    			create_component(grid.$$.fragment);
    			add_location(kbd, file$7, 57, 6, 2017);
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$7, 58, 6, 2049);
    			add_location(div1, file$7, 56, 4, 2005);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, kbd);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			insert_dev(target, t3, anchor);
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(56:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (69:2) <Two>
    function create_default_slot_1$4(ctx) {
    	let div;
    	let t1;
    	let ul;
    	let li0;
    	let a0;
    	let span0;
    	let t3;
    	let caret0;
    	let t4;
    	let li1;
    	let a1;
    	let span1;
    	let t6;
    	let caret1;
    	let t7;
    	let li2;
    	let a2;
    	let span2;
    	let t9;
    	let caret2;
    	let t10;
    	let li3;
    	let a3;
    	let span3;
    	let t12;
    	let caret3;
    	let current;
    	caret0 = new Caret({ $$inline: true });
    	caret1 = new Caret({ $$inline: true });
    	caret2 = new Caret({ $$inline: true });
    	caret3 = new Caret({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "you can do:";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "Contractions";
    			t3 = space();
    			create_component(caret0.$$.fragment);
    			t4 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "Syllable parsing";
    			t6 = space();
    			create_component(caret1.$$.fragment);
    			t7 = space();
    			li2 = element("li");
    			a2 = element("a");
    			span2 = element("span");
    			span2.textContent = "Lookup";
    			t9 = space();
    			create_component(caret2.$$.fragment);
    			t10 = space();
    			li3 = element("li");
    			a3 = element("a");
    			span3 = element("span");
    			span3.textContent = "Type-ahead";
    			t12 = space();
    			create_component(caret3.$$.fragment);
    			attr_dev(div, "class", "down f09");
    			add_location(div, file$7, 69, 4, 2297);
    			attr_dev(span0, "class", "choose");
    			set_style(span0, "color", "white");
    			add_location(span0, file$7, 71, 22, 2386);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$7, 71, 10, 2374);
    			add_location(li0, file$7, 71, 6, 2370);
    			attr_dev(span1, "class", "choose");
    			set_style(span1, "color", "white");
    			add_location(span1, file$7, 72, 35, 2502);
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$7, 72, 23, 2490);
    			attr_dev(li1, "class", "down");
    			add_location(li1, file$7, 72, 6, 2473);
    			attr_dev(span2, "class", "choose");
    			set_style(span2, "color", "white");
    			add_location(span2, file$7, 73, 35, 2622);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$7, 73, 23, 2610);
    			attr_dev(li2, "class", "down");
    			add_location(li2, file$7, 73, 6, 2593);
    			attr_dev(span3, "class", "choose");
    			set_style(span3, "color", "white");
    			add_location(span3, file$7, 74, 35, 2732);
    			attr_dev(a3, "href", "#");
    			add_location(a3, file$7, 74, 23, 2720);
    			attr_dev(li3, "class", "down");
    			add_location(li3, file$7, 74, 6, 2703);
    			attr_dev(ul, "class", "list down");
    			add_location(ul, file$7, 70, 4, 2341);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span0);
    			append_dev(a0, t3);
    			mount_component(caret0, a0, null);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span1);
    			append_dev(a1, t6);
    			mount_component(caret1, a1, null);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, span2);
    			append_dev(a2, t9);
    			mount_component(caret2, a2, null);
    			append_dev(ul, t10);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(a3, span3);
    			append_dev(a3, t12);
    			mount_component(caret3, a3, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(caret0.$$.fragment, local);
    			transition_in(caret1.$$.fragment, local);
    			transition_in(caret2.$$.fragment, local);
    			transition_in(caret3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(caret0.$$.fragment, local);
    			transition_out(caret1.$$.fragment, local);
    			transition_out(caret2.$$.fragment, local);
    			transition_out(caret3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_component(caret0);
    			destroy_component(caret1);
    			destroy_component(caret2);
    			destroy_component(caret3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(69:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (15:0) <Page>
    function create_default_slot$4(ctx) {
    	let left;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let one2;
    	let t3;
    	let two;
    	let t4;
    	let div0;
    	let t6;
    	let div1;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_5$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_4$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(one1.$$.fragment);
    			t2 = space();
    			create_component(one2.$$.fragment);
    			t3 = space();
    			create_component(two.$$.fragment);
    			t4 = space();
    			div0 = element("div");
    			div0.textContent = "sometimes just splitting things up is enough.";
    			t6 = space();
    			div1 = element("div");
    			div1.textContent = "or swing harder ↓";
    			add_location(div0, file$7, 78, 2, 2833);
    			attr_dev(div1, "class", "m2 sea down f09");
    			add_location(div1, file$7, 79, 2, 2892);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(two, target, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one0_changes.$$scope = { dirty, ctx };
    			}

    			one0.$set(one0_changes);
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    			const two_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two_changes.$$scope = { dirty, ctx };
    			}

    			two.$set(two_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(two, detaching);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(15:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let page0;
    	let t;
    	let page1;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_6$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page1 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page0.$$.fragment);
    			t = space();
    			create_component(page1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(page1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page0_changes.$$scope = { dirty, ctx };
    			}

    			page0.$set(page0_changes);
    			const page1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page1_changes.$$scope = { dirty, ctx };
    			}

    			page1.$set(page1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page0.$$.fragment, local);
    			transition_in(page1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page0.$$.fragment, local);
    			transition_out(page1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(page1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('One', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<One> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Two,
    		Grid,
    		Left,
    		Caret,
    		Block,
    		Tokenize
    	});

    	return [];
    }

    class One_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One_1",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/lib/TextArea.svelte generated by Svelte v3.43.0 */

    const file$6 = "src/lib/TextArea.svelte";

    function create_fragment$7(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "input svelte-1gzfkwt");
    			set_style(textarea, "width", /*width*/ ctx[1]);
    			set_style(textarea, "height", /*height*/ ctx[2]);
    			set_style(textarea, "font-size", /*size*/ ctx[3]);
    			attr_dev(textarea, "spellcheck", "false");
    			attr_dev(textarea, "type", "text");
    			add_location(textarea, file$6, 17, 0, 313);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*value*/ ctx[0]);
    			/*textarea_binding*/ ctx[8](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*callback*/ ctx[5], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*width*/ 2) {
    				set_style(textarea, "width", /*width*/ ctx[1]);
    			}

    			if (dirty & /*height*/ 4) {
    				set_style(textarea, "height", /*height*/ ctx[2]);
    			}

    			if (dirty & /*size*/ 8) {
    				set_style(textarea, "font-size", /*size*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[8](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextArea', slots, []);
    	let { value = '' } = $$props;
    	let el;

    	let { cb = () => {
    		
    	} } = $$props;

    	let { width = '60%' } = $$props;
    	let { height = '142px' } = $$props;
    	let { size = '1.2rem' } = $$props;

    	const callback = function (e) {
    		cb(e.target.value);
    	};

    	const writable_props = ['value', 'cb', 'width', 'height', 'size'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextArea> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(4, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('cb' in $$props) $$invalidate(6, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('size' in $$props) $$invalidate(3, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		el,
    		cb,
    		width,
    		height,
    		size,
    		callback
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('el' in $$props) $$invalidate(4, el = $$props.el);
    		if ('cb' in $$props) $$invalidate(6, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('size' in $$props) $$invalidate(3, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		width,
    		height,
    		size,
    		el,
    		callback,
    		cb,
    		textarea_input_handler,
    		textarea_binding
    	];
    }

    class TextArea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			value: 0,
    			cb: 6,
    			width: 1,
    			height: 2,
    			size: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextArea",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get value() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<TextArea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cb() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cb(value) {
    		throw new Error("<TextArea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<TextArea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<TextArea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TextArea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/demos/Tagger.svelte generated by Svelte v3.43.0 */

    const file$5 = "src/demos/Tagger.svelte";

    function create_fragment$6(ctx) {
    	let div1;
    	let textarea;
    	let t0;
    	let div0;
    	let current;

    	textarea = new TextArea({
    			props: {
    				value: /*text*/ ctx[0],
    				size: "18px",
    				cb: /*onchange*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(textarea.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "here";
    			attr_dev(div0, "class", "json down svelte-rgvpo4");
    			add_location(div0, file$5, 29, 2, 1136);
    			set_style(div1, "min-width", "800px");
    			add_location(div1, file$5, 27, 0, 1049);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(textarea, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(textarea);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tagger', slots, []);
    	let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`;

    	let json = nlp$1(text).json({
    		terms: {
    			tags: false,
    			index: false,
    			machine: false
    		}
    	});

    	const onchange = function (txt) {
    		json = nlp$1(txt).json();
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tagger> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Textarea: TextArea, nlp: nlp$1, text, json, onchange });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('json' in $$props) json = $$props.json;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, onchange];
    }

    class Tagger extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tagger",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Two.svelte generated by Svelte v3.43.0 */
    const file$4 = "src/Two.svelte";

    // (13:0) <Page>
    function create_default_slot_10(ctx) {
    	let block;
    	let current;

    	block = new Block({
    			props: { color: "#978BA3" },
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(13:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (17:2) <Left>
    function create_default_slot_9(ctx) {
    	let kbd;
    	let span0;
    	let t2;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let span4;
    	let t5;
    	let span1;
    	let t7;
    	let span2;
    	let t9;
    	let span3;
    	let t11;
    	let t12;
    	let t13;
    	let div2;
    	let t15;
    	let div3;

    	const block = {
    		c: function create() {
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			span0 = element("span");
    			span0.textContent = ":";
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div1 = element("div");
    			t4 = text$1("- ");
    			span4 = element("span");
    			t5 = text$1(" \n        ");
    			span1 = element("span");
    			span1.textContent = "buffalo";
    			t7 = text$1("/\n        ");
    			span2 = element("span");
    			span2.textContent = "buffalo";
    			t9 = text$1("/\n        ");
    			span3 = element("span");
    			span3.textContent = "buffalo";
    			t11 = text$1("  ");
    			t12 = text$1(" -");
    			t13 = space();
    			div2 = element("div");
    			div2.textContent = "identify words as Noun/Verb/Adjective";
    			t15 = space();
    			div3 = element("div");
    			div3.textContent = "which is more handy than you may think -";
    			set_style(kbd, "font-size", "2rem");
    			set_style(kbd, "line-height", "2rem");
    			add_location(kbd, file$4, 17, 4, 447);
    			attr_dev(span0, "class", "f2");
    			add_location(span0, file$4, 17, 70, 513);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file$4, 18, 4, 543);
    			attr_dev(span1, "class", "sky");
    			add_location(span1, file$4, 22, 8, 739);
    			attr_dev(span2, "class", "rose");
    			add_location(span2, file$4, 23, 8, 781);
    			attr_dev(span3, "class", "red");
    			add_location(span3, file$4, 24, 8, 824);
    			set_style(span4, "border-bottom", "4px solid #D68881");
    			set_style(span4, "padding-bottom", "5px");
    			add_location(span4, file$4, 20, 8, 647);
    			attr_dev(div1, "class", "tab");
    			set_style(div1, "font-size", "1.5rem");
    			set_style(div1, "color", "#949a9e");
    			add_location(div1, file$4, 19, 4, 580);
    			attr_dev(div2, "class", "down tab");
    			add_location(div2, file$4, 27, 4, 895);
    			attr_dev(div3, "class", "down f09");
    			add_location(div3, file$4, 28, 4, 965);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, kbd, anchor);
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, span4);
    			append_dev(span4, t5);
    			append_dev(span4, span1);
    			append_dev(span4, t7);
    			append_dev(span4, span2);
    			append_dev(span4, t9);
    			append_dev(span4, span3);
    			append_dev(span4, t11);
    			append_dev(div1, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(kbd);
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(17:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (32:2) <One>
    function create_default_slot_8(ctx) {
    	let tagger;
    	let current;
    	tagger = new Tagger({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(tagger.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tagger, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tagger.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tagger.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tagger, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(32:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (36:2) <One>
    function create_default_slot_7$1(ctx) {
    	let div0;
    	let t1;
    	let div3;
    	let t2;
    	let b0;
    	let t4;
    	let b1;
    	let t6;
    	let div1;
    	let t8;
    	let div2;
    	let t10;
    	let div4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "it's nice because,";
    			t1 = space();
    			div3 = element("div");
    			t2 = text$1("you can say that ");
    			b0 = element("b");
    			b0.textContent = "'buffalo'";
    			t4 = text$1(" and ");
    			b1 = element("b");
    			b1.textContent = "'hamilton'";
    			t6 = space();
    			div1 = element("div");
    			div1.textContent = "are";
    			t8 = space();
    			div2 = element("div");
    			div2.textContent = "#Nouns";
    			t10 = space();
    			div4 = element("div");
    			div4.textContent = "without actually knowing what those things are.";
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$4, 36, 4, 1090);
    			attr_dev(b0, "class", "f2 sea");
    			add_location(b0, file$4, 38, 23, 1177);
    			attr_dev(b1, "class", "f2 sky");
    			add_location(b1, file$4, 38, 59, 1213);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 39, 6, 1252);
    			attr_dev(div2, "class", "f2 red tab down");
    			add_location(div2, file$4, 40, 6, 1285);
    			attr_dev(div3, "class", "tab");
    			add_location(div3, file$4, 37, 4, 1136);
    			attr_dev(div4, "class", "tab down i");
    			add_location(div4, file$4, 42, 4, 1342);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t2);
    			append_dev(div3, b0);
    			append_dev(div3, t4);
    			append_dev(div3, b1);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div3, t8);
    			append_dev(div3, div2);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(36:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (45:2) <Two>
    function create_default_slot_6$1(ctx) {
    	let div0;
    	let t1;
    	let ul;
    	let kbd0;
    	let t3;
    	let kbd1;
    	let t5;
    	let kbd2;
    	let t7;
    	let div1;
    	let a;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "and sometimes this is helpful:";
    			t1 = space();
    			ul = element("ul");
    			kbd0 = element("kbd");
    			kbd0.textContent = "it was the #Adjective of times";
    			t3 = space();
    			kbd1 = element("kbd");
    			kbd1.textContent = "simon says [#Verb+ the? <Noun>]";
    			t5 = space();
    			kbd2 = element("kbd");
    			kbd2.textContent = "#FirstName is on #Ordinal";
    			t7 = space();
    			div1 = element("div");
    			a = element("a");
    			a.textContent = "- match docs";
    			attr_dev(div0, "class", "down");
    			add_location(div0, file$4, 45, 4, 1441);
    			attr_dev(kbd0, "class", "blue f2 i");
    			add_location(kbd0, file$4, 47, 6, 1511);
    			attr_dev(kbd1, "class", "blue f2 i down");
    			add_location(kbd1, file$4, 48, 6, 1577);
    			attr_dev(kbd2, "class", "blue f2 i down");
    			add_location(kbd2, file$4, 49, 6, 1655);
    			add_location(ul, file$4, 46, 4, 1500);
    			attr_dev(a, "href", "https://observablehq.com/@spencermountain/compromise-match-syntax");
    			attr_dev(a, "class", "red tab");
    			add_location(a, file$4, 52, 6, 1753);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 51, 4, 1729);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, kbd0);
    			append_dev(ul, t3);
    			append_dev(ul, kbd1);
    			append_dev(ul, t5);
    			append_dev(ul, kbd2);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, a);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(45:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (56:2) <One>
    function create_default_slot_5$2(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "these match-templates -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "can scoop-up information -";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "like some kind of little database -";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "your matches can be clumsy, ad-hoc";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "they can be written by non-programmers.";
    			add_location(div0, file$4, 56, 4, 1895);
    			attr_dev(div1, "class", "tab i");
    			add_location(div1, file$4, 57, 4, 1934);
    			attr_dev(div2, "class", "tab sky i");
    			add_location(div2, file$4, 58, 4, 1990);
    			attr_dev(div3, "class", "down");
    			add_location(div3, file$4, 60, 4, 2131);
    			attr_dev(div4, "class", "tab");
    			add_location(div4, file$4, 61, 4, 2194);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(56:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (64:2) <Two>
    function create_default_slot_4$3(ctx) {
    	let div2;
    	let t0;
    	let div0;
    	let t1;
    	let span0;
    	let t3;
    	let t4;
    	let div1;
    	let t6;
    	let br;
    	let t7;
    	let t8;
    	let ul;
    	let li0;
    	let a0;
    	let span1;
    	let t10;
    	let caret0;
    	let t11;
    	let li1;
    	let a1;
    	let span2;
    	let t13;
    	let caret1;
    	let t14;
    	let li2;
    	let a2;
    	let span3;
    	let t16;
    	let caret2;
    	let current;
    	caret0 = new Caret({ $$inline: true });
    	caret1 = new Caret({ $$inline: true });
    	caret2 = new Caret({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			t0 = text$1("this can do helpful -\n      ");
    			div0 = element("div");
    			t1 = text$1("before some crazy ");
    			span0 = element("span");
    			span0.textContent = "AI-thing";
    			t3 = text$1(" -");
    			t4 = space();
    			div1 = element("div");
    			div1.textContent = "just does it all,";
    			t6 = space();
    			br = element("br");
    			t7 = text$1("\n      or more often, some person's tired eyes:");
    			t8 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span1 = element("span");
    			span1.textContent = "Match-syntax";
    			t10 = space();
    			create_component(caret0.$$.fragment);
    			t11 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span2 = element("span");
    			span2.textContent = "Automated Redaction";
    			t13 = space();
    			create_component(caret1.$$.fragment);
    			t14 = space();
    			li2 = element("li");
    			a2 = element("a");
    			span3 = element("span");
    			span3.textContent = "Chat bots";
    			t16 = space();
    			create_component(caret2.$$.fragment);
    			attr_dev(span0, "class", "red ");
    			add_location(span0, file$4, 66, 44, 2384);
    			attr_dev(div0, "class", "tab f2");
    			add_location(div0, file$4, 66, 6, 2346);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 67, 6, 2433);
    			add_location(br, file$4, 68, 6, 2480);
    			set_style(div2, "margin-bottom", "3rem");
    			add_location(div2, file$4, 64, 4, 2278);
    			attr_dev(span1, "class", "choose down");
    			set_style(span1, "color", "white");
    			add_location(span1, file$4, 72, 22, 2594);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$4, 72, 10, 2582);
    			add_location(li0, file$4, 72, 6, 2578);
    			attr_dev(span2, "class", "choose");
    			set_style(span2, "color", "white");
    			add_location(span2, file$4, 74, 20, 2724);
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$4, 74, 8, 2712);
    			attr_dev(li1, "class", "down");
    			add_location(li1, file$4, 73, 6, 2686);
    			attr_dev(span3, "class", "choose");
    			set_style(span3, "color", "white");
    			add_location(span3, file$4, 76, 35, 2854);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$4, 76, 23, 2842);
    			attr_dev(li2, "class", "down");
    			add_location(li2, file$4, 76, 6, 2825);
    			attr_dev(ul, "class", "list down");
    			add_location(ul, file$4, 71, 4, 2549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t0);
    			append_dev(div2, div0);
    			append_dev(div0, t1);
    			append_dev(div0, span0);
    			append_dev(div0, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div2, t6);
    			append_dev(div2, br);
    			append_dev(div2, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span1);
    			append_dev(a0, t10);
    			mount_component(caret0, a0, null);
    			append_dev(ul, t11);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span2);
    			append_dev(a1, t13);
    			mount_component(caret1, a1, null);
    			append_dev(ul, t14);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, span3);
    			append_dev(a2, t16);
    			mount_component(caret2, a2, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(caret0.$$.fragment, local);
    			transition_in(caret1.$$.fragment, local);
    			transition_in(caret2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(caret0.$$.fragment, local);
    			transition_out(caret1.$$.fragment, local);
    			transition_out(caret2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(ul);
    			destroy_component(caret0);
    			destroy_component(caret1);
    			destroy_component(caret2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(64:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (81:2) <One>
    function create_default_slot_3$3(ctx) {
    	let div1;
    	let kbd;
    	let t1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "is 130kb minified.";
    			add_location(kbd, file$4, 82, 6, 2976);
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$4, 83, 6, 3008);
    			add_location(div1, file$4, 81, 4, 2964);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, kbd);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(81:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (87:2) <Two>
    function create_default_slot_2$3(ctx) {
    	let div;
    	let t1;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "so is this gif";
    			t1 = space();
    			img = element("img");
    			attr_dev(div, "class", "i");
    			add_location(div, file$4, 88, 4, 3194);
    			if (!src_url_equal(img.src, img_src_value = "./assets/jesus.gif")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "jesus gif");
    			add_location(img, file$4, 89, 4, 3234);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(87:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (92:2) <Three>
    function create_default_slot_1$3(ctx) {
    	let div;
    	let t;
    	let grid;
    	let current;

    	grid = new Grid({
    			props: { seed: "76b36bcb2b4e1fec394" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = space();
    			create_component(grid.$$.fragment);
    			set_style(div, "width", "200px");
    			add_location(div, file$4, 92, 4, 3306);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(grid, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t);
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(92:2) <Three>",
    		ctx
    	});

    	return block;
    }

    // (16:0) <Page>
    function create_default_slot$3(ctx) {
    	let left;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let two0;
    	let t3;
    	let one2;
    	let t4;
    	let two1;
    	let t5;
    	let one3;
    	let t6;
    	let two2;
    	let t7;
    	let three;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two0 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two1 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one3 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two2 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	three = new Three$1({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(one1.$$.fragment);
    			t2 = space();
    			create_component(two0.$$.fragment);
    			t3 = space();
    			create_component(one2.$$.fragment);
    			t4 = space();
    			create_component(two1.$$.fragment);
    			t5 = space();
    			create_component(one3.$$.fragment);
    			t6 = space();
    			create_component(two2.$$.fragment);
    			t7 = space();
    			create_component(three.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(two0, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(two1, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(one3, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(two2, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(three, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one0_changes.$$scope = { dirty, ctx };
    			}

    			one0.$set(one0_changes);
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const two0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two0_changes.$$scope = { dirty, ctx };
    			}

    			two0.$set(two0_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    			const two1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two1_changes.$$scope = { dirty, ctx };
    			}

    			two1.$set(two1_changes);
    			const one3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one3_changes.$$scope = { dirty, ctx };
    			}

    			one3.$set(one3_changes);
    			const two2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two2_changes.$$scope = { dirty, ctx };
    			}

    			two2.$set(two2_changes);
    			const three_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				three_changes.$$scope = { dirty, ctx };
    			}

    			three.$set(three_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(two0.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(two1.$$.fragment, local);
    			transition_in(one3.$$.fragment, local);
    			transition_in(two2.$$.fragment, local);
    			transition_in(three.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(two0.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(two1.$$.fragment, local);
    			transition_out(one3.$$.fragment, local);
    			transition_out(two2.$$.fragment, local);
    			transition_out(three.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(two0, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(two1, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(one3, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(two2, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(three, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(16:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let page0;
    	let t;
    	let page1;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page1 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page0.$$.fragment);
    			t = space();
    			create_component(page1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(page1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page0_changes.$$scope = { dirty, ctx };
    			}

    			page0.$set(page0_changes);
    			const page1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page1_changes.$$scope = { dirty, ctx };
    			}

    			page1.$set(page1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page0.$$.fragment, local);
    			transition_in(page1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page0.$$.fragment, local);
    			transition_out(page1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(page1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Two', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Two> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Two,
    		Three: Three$1,
    		Left,
    		Caret,
    		Block,
    		Tagger,
    		Grid
    	});

    	return [];
    }

    class Two_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two_1",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/demos/Chunker.svelte generated by Svelte v3.43.0 */

    const file$3 = "src/demos/Chunker.svelte";

    function create_fragment$4(ctx) {
    	let div1;
    	let textarea;
    	let t0;
    	let div0;
    	let current;

    	textarea = new TextArea({
    			props: {
    				value: /*text*/ ctx[0],
    				size: "18px",
    				cb: /*onchange*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(textarea.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "here";
    			attr_dev(div0, "class", "json down svelte-rgvpo4");
    			add_location(div0, file$3, 29, 2, 1136);
    			set_style(div1, "min-width", "800px");
    			add_location(div1, file$3, 27, 0, 1049);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(textarea, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(textarea);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chunker', slots, []);
    	let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`;

    	let json = nlp$1(text).json({
    		terms: {
    			tags: false,
    			index: false,
    			machine: false
    		}
    	});

    	const onchange = function (txt) {
    		json = nlp$1(txt).json();
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Chunker> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Textarea: TextArea, nlp: nlp$1, text, json, onchange });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('json' in $$props) json = $$props.json;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, onchange];
    }

    class Chunker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chunker",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Three.svelte generated by Svelte v3.43.0 */
    const file$2 = "src/Three.svelte";

    // (11:0) <Page>
    function create_default_slot_7(ctx) {
    	let block;
    	let current;

    	block = new Block({
    			props: { color: "#e6b3bc" },
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(11:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (16:2) <Left>
    function create_default_slot_6(ctx) {
    	let kbd;
    	let span0;
    	let t2;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let span1;
    	let t6;

    	const block = {
    		c: function create() {
    			kbd = element("kbd");
    			kbd.textContent = "compromise/three";
    			span0 = element("span");
    			span0.textContent = ":";
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div1 = element("div");
    			t4 = text$1("- ");
    			span1 = element("span");
    			span1.textContent = "  chunks / phrases / clauses";
    			t6 = text$1(" -");
    			set_style(kbd, "font-size", "2rem");
    			set_style(kbd, "line-height", "2rem");
    			add_location(kbd, file$2, 16, 4, 365);
    			attr_dev(span0, "class", "f2");
    			add_location(span0, file$2, 16, 72, 433);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file$2, 17, 4, 463);
    			set_style(span1, "border-bottom", "4px solid #D68881");
    			set_style(span1, "padding-bottom", "5px");
    			add_location(span1, file$2, 19, 8, 553);
    			attr_dev(div1, "class", "tab");
    			set_style(div1, "font-size", "1.8rem");
    			add_location(div1, file$2, 18, 4, 500);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, kbd, anchor);
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(div1, t6);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(kbd);
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(16:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (24:2) <One>
    function create_default_slot_5$1(ctx) {
    	let chunker;
    	let current;
    	chunker = new Chunker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(chunker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(chunker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chunker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chunker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(chunker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(24:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (28:2) <One>
    function create_default_slot_4$2(ctx) {
    	let div7;
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div6;
    	let div3;
    	let t4;
    	let span0;
    	let t6;
    	let div4;
    	let span1;
    	let t8;
    	let div5;
    	let t9;
    	let span2;
    	let t11;
    	let t12;
    	let div8;
    	let t13;
    	let div11;
    	let div10;
    	let t14;
    	let div9;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "'captain of the football team'";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "is one thing.";
    			t3 = space();
    			div6 = element("div");
    			div3 = element("div");
    			t4 = text$1("so is ");
    			span0 = element("span");
    			span0.textContent = "'jet skiing'";
    			t6 = space();
    			div4 = element("div");
    			span1 = element("span");
    			span1.textContent = "'breaking up'";
    			t8 = space();
    			div5 = element("div");
    			t9 = text$1("and ");
    			span2 = element("span");
    			span2.textContent = "'Calgary Alberta'";
    			t11 = text$1(".");
    			t12 = space();
    			div8 = element("div");
    			t13 = space();
    			div11 = element("div");
    			div10 = element("div");
    			t14 = text$1("a word can be two things,\n        ");
    			div9 = element("div");
    			div9.textContent = "or a 3rd of a thing.";
    			attr_dev(div0, "class", "blue");
    			add_location(div0, file$2, 30, 8, 834);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$2, 31, 8, 897);
    			attr_dev(div2, "class", "f2");
    			add_location(div2, file$2, 29, 6, 809);
    			attr_dev(span0, "class", "sea i");
    			add_location(span0, file$2, 34, 36, 1007);
    			attr_dev(div3, "class", "down tab");
    			add_location(div3, file$2, 34, 8, 979);
    			attr_dev(span1, "class", "sky i");
    			add_location(span1, file$2, 35, 26, 1079);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$2, 35, 8, 1061);
    			attr_dev(span2, "class", "rose i");
    			add_location(span2, file$2, 36, 34, 1160);
    			attr_dev(div5, "class", "down tab");
    			add_location(div5, file$2, 36, 8, 1134);
    			attr_dev(div6, "class", "tab");
    			add_location(div6, file$2, 33, 6, 953);
    			add_location(div7, file$2, 28, 4, 797);
    			attr_dev(div8, "class", "mt4");
    			add_location(div8, file$2, 39, 4, 1241);
    			attr_dev(div9, "class", "tab f09");
    			add_location(div9, file$2, 44, 8, 1388);
    			attr_dev(div10, "class", "");
    			add_location(div10, file$2, 42, 6, 1331);
    			attr_dev(div11, "class", "tab");
    			add_location(div11, file$2, 40, 4, 1265);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div7, t3);
    			append_dev(div7, div6);
    			append_dev(div6, div3);
    			append_dev(div3, t4);
    			append_dev(div3, span0);
    			append_dev(div6, t6);
    			append_dev(div6, div4);
    			append_dev(div4, span1);
    			append_dev(div6, t8);
    			append_dev(div6, div5);
    			append_dev(div5, t9);
    			append_dev(div5, span2);
    			append_dev(div5, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, div8, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, div10);
    			append_dev(div10, t14);
    			append_dev(div10, div9);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(div8);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div11);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(28:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (49:2) <One>
    function create_default_slot_3$2(ctx) {
    	let div0;
    	let t0;
    	let i;
    	let t2;
    	let t3;
    	let div3;
    	let div1;
    	let t5;
    	let div2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text$1("in practice, people want a ");
    			i = element("i");
    			i.textContent = "group";
    			t2 = text$1(" -");
    			t3 = space();
    			div3 = element("div");
    			div1 = element("div");
    			div1.textContent = "and not trip-over some #Adverb,";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "or contraction, or something.";
    			attr_dev(i, "class", "sea");
    			add_location(i, file$2, 49, 36, 1513);
    			add_location(div0, file$2, 49, 4, 1481);
    			attr_dev(div1, "class", "down sky");
    			add_location(div1, file$2, 52, 6, 1615);
    			attr_dev(div2, "class", "f09 tab");
    			add_location(div2, file$2, 53, 6, 1681);
    			attr_dev(div3, "class", "tab i");
    			add_location(div3, file$2, 50, 4, 1550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, i);
    			append_dev(div0, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(49:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (72:2) <Two>
    function create_default_slot_2$2(ctx) {
    	let div;
    	let t1;
    	let ul;
    	let li0;
    	let a0;
    	let span0;
    	let t3;
    	let caret0;
    	let t4;
    	let li1;
    	let a1;
    	let span1;
    	let t6;
    	let caret1;
    	let t7;
    	let li2;
    	let a2;
    	let span2;
    	let t9;
    	let caret2;
    	let current;
    	caret0 = new Caret({ $$inline: true });
    	caret1 = new Caret({ $$inline: true });
    	caret2 = new Caret({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "this also lets things happen:";
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "Number parsing";
    			t3 = space();
    			create_component(caret0.$$.fragment);
    			t4 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "Date parsing";
    			t6 = space();
    			create_component(caret1.$$.fragment);
    			t7 = space();
    			li2 = element("li");
    			a2 = element("a");
    			span2 = element("span");
    			span2.textContent = "Tense conjugation";
    			t9 = space();
    			create_component(caret2.$$.fragment);
    			attr_dev(div, "class", "down f09");
    			add_location(div, file$2, 72, 4, 2324);
    			attr_dev(span0, "class", "choose");
    			set_style(span0, "color", "white");
    			add_location(span0, file$2, 74, 22, 2431);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$2, 74, 10, 2419);
    			add_location(li0, file$2, 74, 6, 2415);
    			attr_dev(span1, "class", "choose");
    			set_style(span1, "color", "white");
    			add_location(span1, file$2, 75, 35, 2549);
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$2, 75, 23, 2537);
    			attr_dev(li1, "class", "down");
    			add_location(li1, file$2, 75, 6, 2520);
    			attr_dev(span2, "class", "choose");
    			set_style(span2, "color", "white");
    			add_location(span2, file$2, 76, 35, 2665);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$2, 76, 23, 2653);
    			attr_dev(li2, "class", "down");
    			add_location(li2, file$2, 76, 6, 2636);
    			attr_dev(ul, "class", "list down");
    			add_location(ul, file$2, 73, 4, 2386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span0);
    			append_dev(a0, t3);
    			mount_component(caret0, a0, null);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span1);
    			append_dev(a1, t6);
    			mount_component(caret1, a1, null);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, span2);
    			append_dev(a2, t9);
    			mount_component(caret2, a2, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(caret0.$$.fragment, local);
    			transition_in(caret1.$$.fragment, local);
    			transition_in(caret2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(caret0.$$.fragment, local);
    			transition_out(caret1.$$.fragment, local);
    			transition_out(caret2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_component(caret0);
    			destroy_component(caret1);
    			destroy_component(caret2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(72:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (82:2) <One>
    function create_default_slot_1$2(ctx) {
    	let t0;
    	let div0;
    	let t2;
    	let div1;
    	let t4;
    	let div3;
    	let span0;
    	let t6;
    	let div2;
    	let t7;
    	let span1;
    	let t9;
    	let span2;
    	let t11;
    	let t12;
    	let div4;
    	let t13;
    	let b;
    	let t15;
    	let t16;
    	let div5;

    	const block = {
    		c: function create() {
    			t0 = text$1("If you’re cautious, and worried this won’t work,\n    ");
    			div0 = element("div");
    			div0.textContent = "you are very clever.";
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "but remember -";
    			t4 = space();
    			div3 = element("div");
    			span0 = element("span");
    			span0.textContent = "\"ripped\"";
    			t6 = space();
    			div2 = element("div");
    			t7 = text$1("can mean ");
    			span1 = element("span");
    			span1.textContent = "torn";
    			t9 = text$1(" or\n        ");
    			span2 = element("span");
    			span2.textContent = "drunk";
    			t11 = text$1(".");
    			t12 = space();
    			div4 = element("div");
    			t13 = text$1("but both times it's just an ");
    			b = element("b");
    			b.textContent = "#Adjective";
    			t15 = text$1(" -");
    			t16 = space();
    			div5 = element("div");
    			div5.textContent = "so the hard problem, still ahead ↓";
    			attr_dev(div0, "class", "tab sea");
    			add_location(div0, file$2, 83, 4, 2846);
    			attr_dev(div1, "class", "tab down");
    			add_location(div1, file$2, 84, 4, 2898);
    			attr_dev(span0, "class", "sky i");
    			add_location(span0, file$2, 86, 6, 2973);
    			attr_dev(span1, "class", "rose i");
    			add_location(span1, file$2, 88, 17, 3077);
    			attr_dev(span2, "class", "red i");
    			add_location(span2, file$2, 89, 8, 3121);
    			attr_dev(div2, "class", "tab");
    			set_style(div2, "font-size", "1.2rem");
    			add_location(div2, file$2, 87, 6, 3015);
    			attr_dev(div3, "class", "f2 down");
    			add_location(div3, file$2, 85, 4, 2945);
    			attr_dev(b, "class", "sky i");
    			add_location(b, file$2, 93, 34, 3236);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$2, 92, 4, 3183);
    			attr_dev(div5, "class", "down tab f09");
    			add_location(div5, file$2, 95, 4, 3285);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, span0);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, t7);
    			append_dev(div2, span1);
    			append_dev(div2, t9);
    			append_dev(div2, span2);
    			append_dev(div2, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t13);
    			append_dev(div4, b);
    			append_dev(div4, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, div5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(82:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (15:0) <Page>
    function create_default_slot$2(ctx) {
    	let left;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let one2;
    	let t3;
    	let two;
    	let t4;
    	let one3;
    	let t5;
    	let one4;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one3 = new One({ $$inline: true });

    	one4 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(one1.$$.fragment);
    			t2 = space();
    			create_component(one2.$$.fragment);
    			t3 = space();
    			create_component(two.$$.fragment);
    			t4 = space();
    			create_component(one3.$$.fragment);
    			t5 = space();
    			create_component(one4.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(two, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(one3, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(one4, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one0_changes.$$scope = { dirty, ctx };
    			}

    			one0.$set(one0_changes);
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    			const two_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two_changes.$$scope = { dirty, ctx };
    			}

    			two.$set(two_changes);
    			const one4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one4_changes.$$scope = { dirty, ctx };
    			}

    			one4.$set(one4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			transition_in(one3.$$.fragment, local);
    			transition_in(one4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			transition_out(one3.$$.fragment, local);
    			transition_out(one4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(two, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(one3, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(one4, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(15:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let page0;
    	let t;
    	let page1;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page1 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page0.$$.fragment);
    			t = space();
    			create_component(page1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(page1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page0_changes.$$scope = { dirty, ctx };
    			}

    			page0.$set(page0_changes);
    			const page1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page1_changes.$$scope = { dirty, ctx };
    			}

    			page1.$set(page1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page0.$$.fragment, local);
    			transition_in(page1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page0.$$.fragment, local);
    			transition_out(page1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(page1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Three', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Three> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Two,
    		Left,
    		Caret,
    		Block,
    		Chunker
    	});

    	return [];
    }

    class Three extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Four.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/Four.svelte";

    // (24:0) <Page>
    function create_default_slot_4$1(ctx) {
    	let block;
    	let current;

    	block = new Block({
    			props: { color: "#6699cc" },
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(24:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (29:2) <Left>
    function create_default_slot_3$1(ctx) {
    	let kbd;
    	let span0;
    	let t2;
    	let div0;
    	let t3;
    	let div1;
    	let t4;
    	let span1;
    	let t6;

    	const block = {
    		c: function create() {
    			kbd = element("kbd");
    			kbd.textContent = "compromise/four";
    			span0 = element("span");
    			span0.textContent = ":";
    			t2 = space();
    			div0 = element("div");
    			t3 = space();
    			div1 = element("div");
    			t4 = text$1("- ");
    			span1 = element("span");
    			span1.textContent = "  word-sense";
    			t6 = text$1(" -");
    			set_style(kbd, "font-size", "2rem");
    			set_style(kbd, "line-height", "2rem");
    			add_location(kbd, file$1, 29, 4, 682);
    			attr_dev(span0, "class", "f2");
    			add_location(span0, file$1, 29, 71, 749);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file$1, 30, 4, 779);
    			set_style(span1, "border-bottom", "4px solid #D68881");
    			set_style(span1, "padding-bottom", "5px");
    			add_location(span1, file$1, 32, 8, 869);
    			attr_dev(div1, "class", "tab");
    			set_style(div1, "font-size", "1.8rem");
    			add_location(div1, file$1, 31, 4, 816);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, kbd, anchor);
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(div1, t6);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(kbd);
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(29:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (37:2) <One>
    function create_default_slot_2$1(ctx) {
    	let t0;
    	let div;

    	const block = {
    		c: function create() {
    			t0 = text$1("hahaha,\n    ");
    			div = element("div");
    			div.textContent = "ya right.";
    			attr_dev(div, "class", "tab i");
    			add_location(div, file$1, 38, 4, 1075);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(37:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (47:2) <Two>
    function create_default_slot_1$1(ctx) {
    	let div0;
    	let t1;
    	let div1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "this work is in development,";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "- probably forever.";
    			add_location(div0, file$1, 47, 4, 1344);
    			attr_dev(div1, "class", "f09 tab");
    			add_location(div1, file$1, 48, 4, 1388);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(47:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (28:0) <Page>
    function create_default_slot$1(ctx) {
    	let left;
    	let t0;
    	let one;
    	let t1;
    	let two;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left.$$.fragment);
    			t0 = space();
    			create_component(one.$$.fragment);
    			t1 = space();
    			create_component(two.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(two, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				one_changes.$$scope = { dirty, ctx };
    			}

    			one.$set(one_changes);
    			const two_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				two_changes.$$scope = { dirty, ctx };
    			}

    			two.$set(two_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(28:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let page0;
    	let t;
    	let page1;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page1 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page0.$$.fragment);
    			t = space();
    			create_component(page1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(page1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				page0_changes.$$scope = { dirty, ctx };
    			}

    			page0.$set(page0_changes);
    			const page1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				page1_changes.$$scope = { dirty, ctx };
    			}

    			page1.$set(page1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page0.$$.fragment, local);
    			transition_in(page1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page0.$$.fragment, local);
    			transition_out(page1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(page1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Four', slots, []);

    	let str = `model.senses.Verb = {
    plug:{
      sell:{words: [book, biography, album]},
      stop:{words: [drain, sink, pipe], fallback:true},
    },
    strike:{
      hit: {fallback:true}
      protest: {words:[job, union, worker]}
    }
}
doc = nlp(‘plugged the drain’)
doc.match('{plug/stop} (a|the) #Noun')
  `;

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Four> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Two,
    		Left,
    		Row,
    		Block,
    		TextArea,
    		str
    	});

    	$$self.$inject_state = $$props => {
    		if ('str' in $$props) str = $$props.str;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Four extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Four",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Out.svelte generated by Svelte v3.43.0 */
    const file = "src/Out.svelte";

    // (15:2) <One>
    function create_default_slot_5(ctx) {
    	let div0;
    	let t0;
    	let b;
    	let t2;
    	let div3;
    	let t3;
    	let div1;
    	let t5;
    	let div2;
    	let t6;
    	let a;
    	let t8;
    	let div4;
    	let t9;
    	let span;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text$1("Compromise was created ");
    			b = element("b");
    			b.textContent = "in 2010";
    			t2 = space();
    			div3 = element("div");
    			t3 = text$1("the benevolent dictator,\n      ");
    			div1 = element("div");
    			div1.textContent = "and territorial benefactor -";
    			t5 = space();
    			div2 = element("div");
    			t6 = text$1("is ");
    			a = element("a");
    			a.textContent = "Spencer Kelly";
    			t8 = space();
    			div4 = element("div");
    			t9 = text$1("PRs are ");
    			span = element("span");
    			span.textContent = "well-respected.";
    			add_location(b, file, 15, 32, 388);
    			add_location(div0, file, 15, 4, 360);
    			attr_dev(div1, "class", "f09 tab sea");
    			add_location(div1, file, 20, 6, 544);
    			attr_dev(a, "href", "https://spencermounta.in/");
    			attr_dev(a, "class", "sky");
    			add_location(a, file, 22, 11, 639);
    			attr_dev(div2, "class", "tab");
    			add_location(div2, file, 21, 6, 610);
    			attr_dev(div3, "class", "down f09");
    			add_location(div3, file, 18, 4, 484);
    			attr_dev(span, "class", "sky i");
    			add_location(span, file, 26, 34, 862);
    			attr_dev(div4, "class", "down f09");
    			add_location(div4, file, 26, 4, 832);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, b);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t3);
    			append_dev(div3, div1);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, t6);
    			append_dev(div2, a);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t9);
    			append_dev(div4, span);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(15:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (29:2) <Two>
    function create_default_slot_4(ctx) {
    	let div0;
    	let t0;
    	let b0;
    	let t2;
    	let div1;
    	let b1;
    	let t4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text$1("Web-Assembly ");
    			b0 = element("b");
    			b0.textContent = "<should definetly happen>";
    			t2 = space();
    			div1 = element("div");
    			b1 = element("b");
    			b1.textContent = "Non-english versions";
    			t4 = text$1(" <are happening slowly>.");
    			add_location(b0, file, 29, 39, 967);
    			attr_dev(div0, "class", "f09 down");
    			add_location(div0, file, 29, 4, 932);
    			attr_dev(b1, "class", "sea");
    			add_location(b1, file, 30, 22, 1034);
    			attr_dev(div1, "class", "down");
    			add_location(div1, file, 30, 4, 1016);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, b0);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, b1);
    			append_dev(div1, t4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(29:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (34:2) <Left>
    function create_default_slot_3(ctx) {
    	let div2;
    	let div0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let t1;
    	let div1;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t2;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = text$1("\n          Github");
    			t1 = space();
    			div1 = element("div");
    			a1 = element("a");
    			img1 = element("img");
    			t2 = text$1("\n          Twitter");
    			if (!src_url_equal(img0.src, img0_src_value = "")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file, 38, 10, 1320);
    			attr_dev(a0, "href", "https://github.com/spencermountain/compromise/");
    			add_location(a0, file, 37, 8, 1252);
    			add_location(div0, file, 36, 6, 1238);
    			if (!src_url_equal(img1.src, img1_src_value = "")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file, 44, 10, 1461);
    			attr_dev(a1, "href", "https://twitter.com/nlp_compromise");
    			add_location(a1, file, 43, 8, 1405);
    			add_location(div1, file, 42, 6, 1391);
    			attr_dev(div2, "class", "row ");
    			set_style(div2, "font-size", "1.5rem");
    			add_location(div2, file, 35, 4, 1187);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img0);
    			append_dev(a0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, a1);
    			append_dev(a1, img1);
    			append_dev(a1, t2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(34:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (52:2) <One>
    function create_default_slot_2(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let a;
    	let img;
    	let img_src_value;
    	let t1;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			a = element("a");
    			img = element("img");
    			t1 = text$1("\n          Observable");
    			add_location(div0, file, 53, 6, 1612);
    			if (!src_url_equal(img.src, img_src_value = "")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file, 61, 10, 1821);
    			attr_dev(a, "href", "https://observablehq.com/@spencermountain/nlp-compromise");
    			add_location(a, file, 60, 8, 1743);
    			add_location(div1, file, 59, 6, 1729);
    			attr_dev(div2, "class", "row ");
    			set_style(div2, "font-size", "1.5rem");
    			add_location(div2, file, 52, 4, 1561);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, a);
    			append_dev(a, img);
    			append_dev(a, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(52:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (68:2) <Two>
    function create_default_slot_1(ctx) {
    	let div;
    	let t0;
    	let grid;
    	let t1;
    	let current;

    	grid = new Grid({
    			props: { seed: "114a2660d759a54cd70" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			create_component(grid.$$.fragment);
    			t1 = text$1("\n    MIT");
    			set_style(div, "width", "300px");
    			add_location(div, file, 68, 4, 1922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(grid, target, anchor);
    			insert_dev(target, t1, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			destroy_component(grid, detaching);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(68:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (13:0) <Page>
    function create_default_slot(ctx) {
    	let block;
    	let t0;
    	let one0;
    	let t1;
    	let two0;
    	let t2;
    	let left;
    	let t3;
    	let one1;
    	let t4;
    	let two1;
    	let current;

    	block = new Block({
    			props: { color: "#bfb0b3" },
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two0 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two1 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(two0.$$.fragment);
    			t2 = space();
    			create_component(left.$$.fragment);
    			t3 = space();
    			create_component(one1.$$.fragment);
    			t4 = space();
    			create_component(two1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(two0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(left, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(two1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one0_changes.$$scope = { dirty, ctx };
    			}

    			one0.$set(one0_changes);
    			const two0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two0_changes.$$scope = { dirty, ctx };
    			}

    			two0.$set(two0_changes);
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const two1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two1_changes.$$scope = { dirty, ctx };
    			}

    			two1.$set(two1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(two0.$$.fragment, local);
    			transition_in(left.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(two1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(two0.$$.fragment, local);
    			transition_out(left.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(two1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(two1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(13:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$1(ctx) {
    	let page;
    	let current;

    	page = new Page({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page_changes.$$scope = { dirty, ctx };
    			}

    			page.$set(page_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Out', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Out> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Grid, Block });
    	return [];
    }

    class Out extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Out",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.43.0 */

    function create_fragment(ctx) {
    	let intro;
    	let t0;
    	let one;
    	let t1;
    	let two;
    	let t2;
    	let three;
    	let t3;
    	let four;
    	let t4;
    	let out;
    	let current;
    	intro = new Intro({ $$inline: true });
    	one = new One_1({ $$inline: true });
    	two = new Two_1({ $$inline: true });
    	three = new Three({ $$inline: true });
    	four = new Four({ $$inline: true });
    	out = new Out({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(intro.$$.fragment);
    			t0 = space();
    			create_component(one.$$.fragment);
    			t1 = space();
    			create_component(two.$$.fragment);
    			t2 = space();
    			create_component(three.$$.fragment);
    			t3 = space();
    			create_component(four.$$.fragment);
    			t4 = space();
    			create_component(out.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(intro, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(two, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(three, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(four, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(out, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			transition_in(one.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			transition_in(three.$$.fragment, local);
    			transition_in(four.$$.fragment, local);
    			transition_in(out.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			transition_out(one.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			transition_out(three.$$.fragment, local);
    			transition_out(four.$$.fragment, local);
    			transition_out(out.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(intro, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(three, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(four, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(out, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Intro, One: One_1, Two: Two_1, Three, Four, Out });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
