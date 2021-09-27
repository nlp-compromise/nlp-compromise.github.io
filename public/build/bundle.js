
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
    function insert(target, node, anchor) {
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
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
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
        insert(target, node, anchor);
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
    const file$f = "src/lib/Page.svelte";

    function create_fragment$g(ctx) {
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
    			add_location(div0, file$f, 24, 2, 563);
    			attr_dev(div1, "class", "container svelte-z87gs9");
    			add_location(div1, file$f, 25, 2, 586);
    			attr_dev(div2, "class", "side svelte-z87gs9");
    			add_location(div2, file$f, 28, 2, 634);
    			attr_dev(div3, "class", "row svelte-z87gs9");
    			add_location(div3, file$f, 23, 0, 543);
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
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/lib/One.svelte generated by Svelte v3.43.0 */

    const file$e = "src/lib/One.svelte";

    function create_fragment$f(ctx) {
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
    			add_location(div0, file$e, 6, 4, 92);
    			add_location(div1, file$e, 9, 4, 179);
    			attr_dev(div2, "class", "box svelte-10fnxb0");
    			add_location(div2, file$e, 5, 2, 70);
    			attr_dev(div3, "class", "column svelte-10fnxb0");
    			add_location(div3, file$e, 4, 0, 47);
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
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One",
    			options,
    			id: create_fragment$f.name
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

    const file$d = "src/lib/Two.svelte";

    function create_fragment$e(ctx) {
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
    			add_location(div0, file$d, 5, 2, 70);
    			attr_dev(div1, "class", "body svelte-1li13tp");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			add_location(div1, file$d, 7, 4, 102);
    			attr_dev(div2, "class", "box svelte-1li13tp");
    			add_location(div2, file$d, 6, 2, 80);
    			attr_dev(div3, "class", "column svelte-1li13tp");
    			add_location(div3, file$d, 4, 0, 47);
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get left() {
    		throw new Error("<Two>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Two>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/lib/Left.svelte generated by Svelte v3.43.0 */

    const file$c = "src/lib/Left.svelte";

    function create_fragment$d(ctx) {
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
    			add_location(div0, file$c, 5, 4, 65);
    			add_location(div1, file$c, 8, 4, 123);
    			attr_dev(div2, "class", "box svelte-l0y2fi");
    			add_location(div2, file$c, 4, 2, 43);
    			attr_dev(div3, "class", "column svelte-l0y2fi");
    			add_location(div3, file$c, 3, 0, 20);
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Left",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/lib/Row.svelte generated by Svelte v3.43.0 */

    const file$b = "src/lib/Row.svelte";

    function create_fragment$c(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "row svelte-hha4zt");
    			add_location(div, file$b, 5, 0, 73);
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
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/lib/Block.svelte generated by Svelte v3.43.0 */

    const file$a = "src/lib/Block.svelte";

    function create_fragment$b(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "block svelte-4rb7y9");
    			set_style(div, "background-color", /*color*/ ctx[0]);
    			add_location(div, file$a, 4, 0, 53);
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Block",
    			options,
    			id: create_fragment$b.name
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

    const file$9 = "src/lib/Ratio.svelte";

    function create_fragment$a(ctx) {
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
    			add_location(div, file$9, 6, 0, 103);
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { ratio: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ratio",
    			options,
    			id: create_fragment$a.name
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
    const file$8 = "src/lib/Grid/Grid.svelte";

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
    			add_location(div, file$8, 52, 8, 1480);
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
    			add_location(div, file$8, 50, 8, 1360);
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
    			add_location(div, file$8, 48, 8, 1305);
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
    			add_location(div, file$8, 41, 2, 1108);
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
    			t = text(/*seed*/ ctx[0]);
    			attr_dev(div, "class", "f1");
    			add_location(div, file$8, 59, 2, 1612);
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

    function create_fragment$9(ctx) {
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
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
    			id: create_fragment$9.name
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
    const file$7 = "src/Intro.svelte";

    // (13:2) <One>
    function create_default_slot_5$3(ctx) {
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
    	let span;
    	let t9;
    	let t10;
    	let div5;
    	let t12;
    	let grid;
    	let current;

    	grid = new Grid({
    			props: { seed: "6daf3fd1a93ca04509c" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "okay consider -";
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
    			t7 = text("and we can't - ");
    			span = element("span");
    			span.textContent = "get it back out";
    			t9 = text(" -");
    			t10 = space();
    			div5 = element("div");
    			div5.textContent = "which is crazy actually.";
    			t12 = space();
    			create_component(grid.$$.fragment);
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$7, 13, 4, 323);
    			attr_dev(div1, "class", "more f2 m1");
    			add_location(div1, file$7, 14, 4, 366);
    			attr_dev(div2, "class", "tab i f2 rose");
    			add_location(div2, file$7, 15, 4, 423);
    			set_style(div3, "margin-top", "3rem");
    			add_location(div3, file$7, 16, 4, 472);
    			attr_dev(span, "class", "blue i ");
    			set_style(span, "font-size", "1.8rem");
    			add_location(span, file$7, 17, 37, 542);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$7, 17, 4, 509);
    			attr_dev(div5, "class", "tab down f09");
    			add_location(div5, file$7, 18, 4, 625);
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
    			append_dev(div4, span);
    			append_dev(div4, t9);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t12, anchor);
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
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t12);
    			destroy_component(grid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(13:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (23:2) <Left>
    function create_default_slot_4$3(ctx) {
    	let div2;
    	let t0;
    	let div1;
    	let t1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			t0 = text("and there doesn't seem to be a plan to - get it out?\n      ");
    			div1 = element("div");
    			t1 = text("which seems like an issue.\n        ");
    			div0 = element("div");
    			div0.textContent = "or maybe it isn't.";
    			add_location(div0, file$7, 27, 8, 966);
    			attr_dev(div1, "class", "tab ");
    			add_location(div1, file$7, 25, 6, 904);
    			attr_dev(div2, "class", "tab down f09");
    			add_location(div2, file$7, 23, 4, 812);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(23:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (32:2) <One>
    function create_default_slot_3$4(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t2;
    	let div2;
    	let t4;
    	let ul;
    	let li0;
    	let t5;
    	let div3;
    	let t7;
    	let li1;
    	let t8;
    	let div4;
    	let t10;
    	let li2;
    	let t11;
    	let div5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			div1.textContent = "compromise is a loose organization -";
    			t2 = space();
    			div2 = element("div");
    			div2.textContent = "a set of standards and tools";
    			t4 = space();
    			ul = element("ul");
    			li0 = element("li");
    			t5 = text("ways to flip text around, and mess with it\n        ");
    			div3 = element("div");
    			div3.textContent = "rejig, and hack it";
    			t7 = space();
    			li1 = element("li");
    			t8 = text("ways to bounce queries off of a text\n        ");
    			div4 = element("div");
    			div4.textContent = "like a ping-pong ball.";
    			t10 = space();
    			li2 = element("li");
    			t11 = text("ways to make typing-interfaces\n        ");
    			div5 = element("div");
    			div5.textContent = "and make them actually good";
    			attr_dev(div0, "class", "space");
    			add_location(div0, file$7, 32, 4, 1042);
    			add_location(div1, file$7, 33, 4, 1068);
    			attr_dev(div2, "class", "f09 tab");
    			add_location(div2, file$7, 34, 4, 1120);
    			attr_dev(div3, "class", "i grey f09 tab2 svelte-sv41b7");
    			add_location(div3, file$7, 39, 8, 1320);
    			add_location(li0, file$7, 37, 6, 1256);
    			attr_dev(div4, "class", "i grey f09 tab2 svelte-sv41b7");
    			add_location(div4, file$7, 43, 8, 1450);
    			add_location(li1, file$7, 41, 6, 1392);
    			attr_dev(div5, "class", "i grey f09 tab2 svelte-sv41b7");
    			add_location(div5, file$7, 47, 8, 1578);
    			add_location(li2, file$7, 45, 6, 1526);
    			add_location(ul, file$7, 36, 4, 1245);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, t5);
    			append_dev(li0, div3);
    			append_dev(ul, t7);
    			append_dev(ul, li1);
    			append_dev(li1, t8);
    			append_dev(li1, div4);
    			append_dev(ul, t10);
    			append_dev(ul, li2);
    			append_dev(li2, t11);
    			append_dev(li2, div5);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(32:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (52:2) <Left>
    function create_default_slot_2$4(ctx) {
    	let t0;
    	let i;
    	let t2;
    	let br;
    	let t3;
    	let a;
    	let t5;
    	let div0;
    	let t7;
    	let div2;
    	let div1;
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
    	let div9;
    	let t16;
    	let div8;

    	const block = {
    		c: function create() {
    			t0 = text("we think ");
    			i = element("i");
    			i.textContent = "open-source, web-focused";
    			t2 = text(" tools\n    ");
    			br = element("br");
    			t3 = text("\n    and a ");
    			a = element("a");
    			a.textContent = "stupidly-good group";
    			t5 = text(" of\n    contributers -\n    ");
    			div0 = element("div");
    			div0.textContent = "focusing on configurability";
    			t7 = space();
    			div2 = element("div");
    			div1 = element("div");
    			div1.textContent = "avoiding fancy engineering";
    			t9 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div3.textContent = "minimizing jargon";
    			t11 = space();
    			div6 = element("div");
    			t12 = text("and,\n      ");
    			div5 = element("div");
    			div5.textContent = "keeping filesize tiny.";
    			t14 = space();
    			div7 = element("div");
    			t15 = space();
    			div9 = element("div");
    			t16 = text("that's the best way to build\n      ");
    			div8 = element("div");
    			div8.textContent = "a crazy set of things.";
    			add_location(i, file$7, 52, 13, 1694);
    			add_location(br, file$7, 53, 4, 1736);
    			attr_dev(a, "href", "https://github.com/spencermountain/compromise/graphs/contributors");
    			add_location(a, file$7, 54, 10, 1753);
    			attr_dev(div0, "class", "down f2 fuscia tab");
    			add_location(div0, file$7, 56, 4, 1879);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$7, 58, 6, 2028);
    			attr_dev(div2, "class", "down f2 tulip");
    			set_style(div2, "margin-top", "100px");
    			set_style(div2, "margin-left", "250px");
    			add_location(div2, file$7, 57, 4, 1949);
    			attr_dev(div3, "class", "tab");
    			add_location(div3, file$7, 61, 6, 2170);
    			attr_dev(div4, "class", "down f2 sky");
    			set_style(div4, "margin-top", "100px");
    			set_style(div4, "margin-left", "100px");
    			add_location(div4, file$7, 60, 4, 2093);
    			attr_dev(div5, "class", "tab f2 blue");
    			add_location(div5, file$7, 65, 6, 2308);
    			attr_dev(div6, "class", "down ");
    			set_style(div6, "margin-top", "100px");
    			set_style(div6, "margin-left", "100px");
    			add_location(div6, file$7, 63, 4, 2226);
    			set_style(div7, "margin-top", "100px");
    			add_location(div7, file$7, 67, 4, 2377);
    			attr_dev(div8, "class", "tab");
    			add_location(div8, file$7, 70, 6, 2479);
    			attr_dev(div9, "class", "down tab");
    			add_location(div9, file$7, 68, 4, 2415);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, i, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, a, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
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
    			insert_dev(target, div9, anchor);
    			append_dev(div9, t16);
    			append_dev(div9, div8);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(a);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div6);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(52:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (74:2) <One>
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
    			add_location(div0, file$7, 76, 6, 2622);
    			add_location(kbd0, file$7, 77, 6, 2667);
    			add_location(kbd1, file$7, 78, 6, 2749);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$7, 75, 4, 2598);
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
    		source: "(74:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (11:0) <Page>
    function create_default_slot$5(ctx) {
    	let one0;
    	let t0;
    	let one1;
    	let t1;
    	let left0;
    	let t2;
    	let one2;
    	let t3;
    	let left1;
    	let t4;
    	let one3;
    	let current;
    	one0 = new One({ $$inline: true });

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_5$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left0 = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left1 = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_2$4] },
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
    			create_component(left0.$$.fragment);
    			t2 = space();
    			create_component(one2.$$.fragment);
    			t3 = space();
    			create_component(left1.$$.fragment);
    			t4 = space();
    			create_component(one3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(one0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(left0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(left1, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(one3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
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
    			transition_in(left0.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(left1.$$.fragment, local);
    			transition_in(one3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
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
    			destroy_component(left0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(left1, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(one3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(11:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block, Grid });
    	return [];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/lib/Caret.svelte generated by Svelte v3.43.0 */

    const file$6 = "src/lib/Caret.svelte";

    function create_fragment$7(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "fill", /*color*/ ctx[0]);
    			attr_dev(path, "d", "M1299 1088q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z");
    			add_location(path, file$6, 6, 2, 190);
    			attr_dev(svg, "width", "80");
    			attr_dev(svg, "height", "30");
    			attr_dev(svg, "viewBox", "0 0 2048 2048");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$6, 5, 0, 100);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { href: 1, color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Caret",
    			options,
    			id: create_fragment$7.name
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

    /* src/One.svelte generated by Svelte v3.43.0 */
    const file$5 = "src/One.svelte";

    // (10:0) <Page>
    function create_default_slot_5$2(ctx) {
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
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(10:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (14:2) <Left>
    function create_default_slot_4$2(ctx) {
    	let h2;
    	let t1;
    	let div;
    	let kbd;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Step 1: Splitting up text";
    			t1 = space();
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			add_location(h2, file$5, 14, 4, 317);
    			add_location(kbd, file$5, 16, 6, 380);
    			attr_dev(div, "class", "tab");
    			add_location(div, file$5, 15, 4, 356);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, kbd);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(14:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (20:2) <One>
    function create_default_slot_3$3(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let span0;
    	let t4;
    	let span1;
    	let t6;
    	let t7;
    	let div2;
    	let t9;
    	let div3;
    	let t11;
    	let div4;
    	let t13;
    	let div5;
    	let t15;
    	let div6;
    	let t17;
    	let div7;
    	let t19;
    	let div8;
    	let t21;
    	let div9;
    	let t23;
    	let i;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "a completely uncontroversial way";
    			t1 = space();
    			div1 = element("div");
    			t2 = text("to split text into ");
    			span0 = element("span");
    			span0.textContent = "sentences";
    			t4 = text(" and ");
    			span1 = element("span");
    			span1.textContent = "words";
    			t6 = text(".");
    			t7 = space();
    			div2 = element("div");
    			div2.textContent = "it's been refined over 8 ruthless github-years";
    			t9 = space();
    			div3 = element("div");
    			div3.textContent = "and is running at the UN, government orgs, banks, and many software companies.";
    			t11 = space();
    			div4 = element("div");
    			div4.textContent = "it actually just works.";
    			t13 = space();
    			div5 = element("div");
    			div5.textContent = "you're allowed to be suspicious of it, though.";
    			t15 = space();
    			div6 = element("div");
    			div6.textContent = "but, you can";
    			t17 = space();
    			div7 = element("div");
    			div7.textContent = "turn your novel into JSON";
    			t19 = space();
    			div8 = element("div");
    			div8.textContent = "with a one-liner-";
    			t21 = space();
    			div9 = element("div");
    			div9.textContent = "when someone tells you it's impossible, give a polite shrug";
    			t23 = space();
    			i = element("i");
    			i.textContent = "haha, i dunno man!";
    			add_location(div0, file$5, 21, 4, 485);
    			attr_dev(span0, "class", "cherry");
    			add_location(span0, file$5, 22, 40, 569);
    			attr_dev(span1, "class", "rose");
    			add_location(span1, file$5, 22, 82, 611);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$5, 22, 4, 533);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file$5, 23, 4, 654);
    			attr_dev(div3, "class", "tab f09");
    			add_location(div3, file$5, 24, 4, 729);
    			attr_dev(div4, "class", "down f09");
    			add_location(div4, file$5, 27, 4, 926);
    			attr_dev(div5, "class", "f09");
    			add_location(div5, file$5, 28, 4, 982);
    			attr_dev(div6, "class", "down f09");
    			add_location(div6, file$5, 29, 4, 1057);
    			attr_dev(div7, "class", "down f2 tab");
    			add_location(div7, file$5, 30, 4, 1102);
    			attr_dev(div8, "class", "tab");
    			add_location(div8, file$5, 31, 4, 1163);
    			attr_dev(div9, "class", "tab down f09");
    			add_location(div9, file$5, 32, 4, 1208);
    			attr_dev(i, "class", "tab f09");
    			add_location(i, file$5, 33, 4, 1304);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, span0);
    			append_dev(div1, t4);
    			append_dev(div1, span1);
    			append_dev(div1, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div6, anchor);
    			insert_dev(target, t17, anchor);
    			insert_dev(target, div7, anchor);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, div8, anchor);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, div9, anchor);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div6);
    			if (detaching) detach_dev(t17);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(div8);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(20:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (37:2) <One>
    function create_default_slot_2$3(ctx) {
    	let div;
    	let kbd;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			t1 = text(" is like 20kb of javascript:");
    			add_location(kbd, file$5, 37, 9, 1373);
    			add_location(div, file$5, 37, 4, 1368);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, kbd);
    			append_dev(div, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(37:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (48:2) <One>
    function create_default_slot_1$4(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let ul;
    	let li0;
    	let a0;
    	let span0;
    	let t5;
    	let caret0;
    	let t6;
    	let li1;
    	let a1;
    	let span1;
    	let t8;
    	let caret1;
    	let t9;
    	let li2;
    	let a2;
    	let span2;
    	let t11;
    	let caret2;
    	let t12;
    	let li3;
    	let a3;
    	let span3;
    	let t14;
    	let caret3;
    	let current;
    	caret0 = new Caret({ $$inline: true });
    	caret1 = new Caret({ $$inline: true });
    	caret2 = new Caret({ $$inline: true });
    	caret3 = new Caret({ $$inline: true });

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "sometimes tokenization is enough";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "you can do this sorta stuff:";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span0 = element("span");
    			span0.textContent = "Contractions";
    			t5 = space();
    			create_component(caret0.$$.fragment);
    			t6 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span1 = element("span");
    			span1.textContent = "Type-ahead";
    			t8 = space();
    			create_component(caret1.$$.fragment);
    			t9 = space();
    			li2 = element("li");
    			a2 = element("a");
    			span2 = element("span");
    			span2.textContent = "Syllable parsing";
    			t11 = space();
    			create_component(caret2.$$.fragment);
    			t12 = space();
    			li3 = element("li");
    			a3 = element("a");
    			span3 = element("span");
    			span3.textContent = "Indexing and lookup";
    			t14 = space();
    			create_component(caret3.$$.fragment);
    			add_location(div0, file$5, 48, 4, 1605);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$5, 49, 4, 1653);
    			attr_dev(span0, "class", "choose");
    			add_location(span0, file$5, 51, 22, 1754);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$5, 51, 10, 1742);
    			add_location(li0, file$5, 51, 6, 1738);
    			attr_dev(span1, "class", "choose");
    			add_location(span1, file$5, 52, 22, 1836);
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$5, 52, 10, 1824);
    			add_location(li1, file$5, 52, 6, 1820);
    			attr_dev(span2, "class", "choose");
    			add_location(span2, file$5, 53, 31, 1925);
    			attr_dev(a2, "href", "#syllables");
    			add_location(a2, file$5, 53, 10, 1904);
    			add_location(li2, file$5, 53, 6, 1900);
    			attr_dev(span3, "class", "choose");
    			add_location(span3, file$5, 54, 22, 2011);
    			attr_dev(a3, "href", "#");
    			add_location(a3, file$5, 54, 10, 1999);
    			add_location(li3, file$5, 54, 6, 1995);
    			attr_dev(ul, "class", "list down");
    			add_location(ul, file$5, 50, 4, 1709);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span0);
    			append_dev(a0, t5);
    			mount_component(caret0, a0, null);
    			append_dev(ul, t6);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span1);
    			append_dev(a1, t8);
    			mount_component(caret1, a1, null);
    			append_dev(ul, t9);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, span2);
    			append_dev(a2, t11);
    			mount_component(caret2, a2, null);
    			append_dev(ul, t12);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(a3, span3);
    			append_dev(a3, t14);
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
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
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
    		source: "(48:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (13:0) <Page>
    function create_default_slot$4(ctx) {
    	let left;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let one2;
    	let t3;
    	let div;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
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
    			div = element("div");
    			div.textContent = "or take a bigger bite ↓";
    			attr_dev(div, "class", "m2 slate down f09");
    			add_location(div, file$5, 57, 2, 2099);
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
    			insert_dev(target, div, anchor);
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
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
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
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(13:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let page0;
    	let t;
    	let page1;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_5$2] },
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('One', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<One> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Caret, Block });
    	return [];
    }

    class One_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One_1",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Two.svelte generated by Svelte v3.43.0 */
    const file$4 = "src/Two.svelte";

    // (10:0) <Page>
    function create_default_slot_8(ctx) {
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
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(10:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (14:2) <Left>
    function create_default_slot_7$1(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let div0;
    	let kbd;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Step 2: Light grammar";
    			t1 = space();
    			div0 = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			add_location(h2, file$4, 15, 6, 341);
    			add_location(kbd, file$4, 17, 8, 404);
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$4, 16, 6, 378);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 14, 4, 317);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, kbd);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(14:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (22:2) <One>
    function create_default_slot_6$1(ctx) {
    	let div0;
    	let t0;
    	let b0;
    	let t2;
    	let b1;
    	let t4;
    	let i;
    	let t6;
    	let t7;
    	let div1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text("you can say that ");
    			b0 = element("b");
    			b0.textContent = "'buffalo'";
    			t2 = text(" and ");
    			b1 = element("b");
    			b1.textContent = "'hamilton'";
    			t4 = text(" are ");
    			i = element("i");
    			i.textContent = "Nouns";
    			t6 = text(",");
    			t7 = space();
    			div1 = element("div");
    			div1.textContent = "without actually knowing what they are.";
    			attr_dev(b0, "class", "f2 sky");
    			add_location(b0, file$4, 22, 26, 498);
    			attr_dev(b1, "class", "f2 sky");
    			add_location(b1, file$4, 22, 62, 534);
    			add_location(i, file$4, 22, 99, 571);
    			add_location(div0, file$4, 22, 4, 476);
    			attr_dev(div1, "class", "tab down i");
    			add_location(div1, file$4, 23, 4, 595);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, b0);
    			append_dev(div0, t2);
    			append_dev(div0, b1);
    			append_dev(div0, t4);
    			append_dev(div0, i);
    			append_dev(div0, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(22:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (26:2) <Two>
    function create_default_slot_5$1(ctx) {
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
    			kbd1.textContent = "simon says #Verb+ the? #Noun+";
    			t5 = space();
    			kbd2 = element("kbd");
    			kbd2.textContent = "#FirstName is on #Ordinal";
    			t7 = space();
    			div1 = element("div");
    			a = element("a");
    			a.textContent = "- match docs";
    			attr_dev(div0, "class", "down");
    			add_location(div0, file$4, 26, 4, 686);
    			attr_dev(kbd0, "class", "blue f2 i");
    			add_location(kbd0, file$4, 28, 6, 756);
    			attr_dev(kbd1, "class", "blue f2 i");
    			add_location(kbd1, file$4, 29, 6, 822);
    			attr_dev(kbd2, "class", "blue f2 i");
    			add_location(kbd2, file$4, 30, 6, 887);
    			add_location(ul, file$4, 27, 4, 745);
    			attr_dev(a, "href", "https://observablehq.com/@spencermountain/compromise-match-syntax");
    			add_location(a, file$4, 33, 6, 980);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 32, 4, 956);
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
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(26:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (37:2) <One>
    function create_default_slot_4$1(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "creating these match-templates -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "to scoop-up information -";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "like it's some kind of little database -";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "it surprising how helpful this is.";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "your matches can be clumsy, ad-hoc";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "they can be written by product designers.";
    			add_location(div0, file$4, 37, 4, 1106);
    			attr_dev(div1, "class", "tab i");
    			add_location(div1, file$4, 38, 4, 1154);
    			attr_dev(div2, "class", "tab sky i");
    			add_location(div2, file$4, 39, 4, 1209);
    			attr_dev(div3, "class", "down");
    			add_location(div3, file$4, 40, 4, 1283);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$4, 41, 4, 1346);
    			attr_dev(div5, "class", "tab");
    			add_location(div5, file$4, 42, 4, 1409);
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
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
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
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(37:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (45:2) <Two>
    function create_default_slot_3$2(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let span0;
    	let t3;
    	let t4;
    	let br;
    	let t5;
    	let t6;
    	let ul;
    	let li0;
    	let a0;
    	let span1;
    	let t8;
    	let caret0;
    	let t9;
    	let li1;
    	let a1;
    	let span2;
    	let t11;
    	let caret1;
    	let t12;
    	let li2;
    	let a2;
    	let span3;
    	let t14;
    	let caret2;
    	let current;
    	caret0 = new Caret({ $$inline: true });
    	caret1 = new Caret({ $$inline: true });
    	caret2 = new Caret({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("solutions like this can do a lot of leg-work -\n      ");
    			div0 = element("div");
    			t1 = text("before some crazy ");
    			span0 = element("span");
    			span0.textContent = "AI-thing";
    			t3 = text(" -");
    			t4 = space();
    			br = element("br");
    			t5 = text("\n      or more-often, some tired person's eyes");
    			t6 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			span1 = element("span");
    			span1.textContent = "Match-syntax";
    			t8 = space();
    			create_component(caret0.$$.fragment);
    			t9 = space();
    			li1 = element("li");
    			a1 = element("a");
    			span2 = element("span");
    			span2.textContent = "Automatic Redaction";
    			t11 = space();
    			create_component(caret1.$$.fragment);
    			t12 = space();
    			li2 = element("li");
    			a2 = element("a");
    			span3 = element("span");
    			span3.textContent = "Chat bots";
    			t14 = space();
    			create_component(caret2.$$.fragment);
    			attr_dev(span0, "class", "red ");
    			add_location(span0, file$4, 47, 44, 1598);
    			attr_dev(div0, "class", "tab f2");
    			add_location(div0, file$4, 47, 6, 1560);
    			add_location(br, file$4, 48, 6, 1647);
    			add_location(div1, file$4, 45, 4, 1495);
    			attr_dev(span1, "class", "choose");
    			add_location(span1, file$4, 52, 22, 1760);
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$4, 52, 10, 1748);
    			add_location(li0, file$4, 52, 6, 1744);
    			attr_dev(span2, "class", "choose");
    			add_location(span2, file$4, 53, 22, 1842);
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$4, 53, 10, 1830);
    			add_location(li1, file$4, 53, 6, 1826);
    			attr_dev(span3, "class", "choose");
    			add_location(span3, file$4, 54, 22, 1931);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$4, 54, 10, 1919);
    			add_location(li2, file$4, 54, 6, 1915);
    			attr_dev(ul, "class", "list down");
    			add_location(ul, file$4, 51, 4, 1715);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div0, span0);
    			append_dev(div0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, br);
    			append_dev(div1, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, span1);
    			append_dev(a0, t8);
    			mount_component(caret0, a0, null);
    			append_dev(ul, t9);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, span2);
    			append_dev(a1, t11);
    			mount_component(caret1, a1, null);
    			append_dev(ul, t12);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, span3);
    			append_dev(a2, t14);
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
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(ul);
    			destroy_component(caret0);
    			destroy_component(caret1);
    			destroy_component(caret2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(45:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (59:2) <One>
    function create_default_slot_2$2(ctx) {
    	let div;
    	let kbd;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			t1 = text(" is 130kb minified");
    			add_location(kbd, file$4, 59, 9, 2025);
    			add_location(div, file$4, 59, 4, 2020);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, kbd);
    			append_dev(div, t1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(59:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (62:2) <Two>
    function create_default_slot_1$3(ctx) {
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
    			add_location(div, file$4, 63, 4, 2208);
    			if (!src_url_equal(img.src, img_src_value = "./assets/jesus.gif")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "jesus gif");
    			add_location(img, file$4, 64, 4, 2248);
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
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(62:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (13:0) <Page>
    function create_default_slot$3(ctx) {
    	let left;
    	let t0;
    	let one0;
    	let t1;
    	let two0;
    	let t2;
    	let one1;
    	let t3;
    	let two1;
    	let t4;
    	let one2;
    	let t5;
    	let two2;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two0 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two1 = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two2 = new Two({
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
    			create_component(two0.$$.fragment);
    			t2 = space();
    			create_component(one1.$$.fragment);
    			t3 = space();
    			create_component(two1.$$.fragment);
    			t4 = space();
    			create_component(one2.$$.fragment);
    			t5 = space();
    			create_component(two2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(two0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(two1, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(two2, target, anchor);
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
    			const two0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two0_changes.$$scope = { dirty, ctx };
    			}

    			two0.$set(two0_changes);
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
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    			const two2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two2_changes.$$scope = { dirty, ctx };
    			}

    			two2.$set(two2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(two0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(two1.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(two2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(two0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(two1.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(two2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(two1, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(two2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(13:0) <Page>",
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
    				$$slots: { default: [create_default_slot_8] },
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

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Caret, Block });
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

    /* src/Three.svelte generated by Svelte v3.43.0 */
    const file$3 = "src/Three.svelte";

    // (10:0) <Page>
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
    		source: "(10:0) <Page>",
    		ctx
    	});

    	return block_1;
    }

    // (15:2) <Left>
    function create_default_slot_6(ctx) {
    	let h2;
    	let t1;
    	let div;
    	let kbd;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Step 3: Phrases";
    			t1 = space();
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/three";
    			add_location(h2, file$3, 15, 4, 314);
    			add_location(kbd, file$3, 17, 6, 367);
    			attr_dev(div, "class", "tab");
    			add_location(div, file$3, 16, 4, 343);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, kbd);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(15:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (21:2) <One>
    function create_default_slot_5(ctx) {
    	let div4;
    	let div0;
    	let span0;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let span1;
    	let t5;
    	let div2;
    	let t7;
    	let div3;
    	let t8;
    	let span2;
    	let t10;
    	let t11;
    	let div5;
    	let t12;
    	let div9;
    	let div6;
    	let t14;
    	let div7;
    	let t15;
    	let br;
    	let t16;
    	let t17;
    	let div8;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "'captain of the football team'";
    			t1 = text(" is one thing.");
    			t2 = space();
    			div1 = element("div");
    			t3 = text("so is ");
    			span1 = element("span");
    			span1.textContent = "'jet skiing'";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "'breaking up'";
    			t7 = space();
    			div3 = element("div");
    			t8 = text("and ");
    			span2 = element("span");
    			span2.textContent = "'Calgary, Alberta'";
    			t10 = text(".");
    			t11 = space();
    			div5 = element("div");
    			t12 = space();
    			div9 = element("div");
    			div6 = element("div");
    			div6.textContent = "it's too bad -";
    			t14 = space();
    			div7 = element("div");
    			t15 = text("sometimes a word is two things, ");
    			br = element("br");
    			t16 = text("sometimes a third of a thing.");
    			t17 = space();
    			div8 = element("div");
    			div8.textContent = "words are tricky.";
    			attr_dev(span0, "class", "blue");
    			add_location(span0, file$3, 22, 22, 456);
    			attr_dev(div0, "class", "f2");
    			add_location(div0, file$3, 22, 6, 440);
    			attr_dev(span1, "class", "blue i");
    			add_location(span1, file$3, 23, 30, 563);
    			attr_dev(div1, "class", "down");
    			add_location(div1, file$3, 23, 6, 539);
    			attr_dev(div2, "class", "down blue i");
    			add_location(div2, file$3, 24, 6, 616);
    			attr_dev(span2, "class", "blue i");
    			add_location(span2, file$3, 25, 29, 690);
    			attr_dev(div3, "class", "down ");
    			add_location(div3, file$3, 25, 6, 667);
    			add_location(div4, file$3, 21, 4, 428);
    			attr_dev(div5, "class", "mt4");
    			add_location(div5, file$3, 27, 4, 759);
    			add_location(div6, file$3, 29, 6, 808);
    			add_location(br, file$3, 30, 55, 889);
    			attr_dev(div7, "class", "tab");
    			add_location(div7, file$3, 30, 6, 840);
    			add_location(div8, file$3, 31, 6, 937);
    			attr_dev(div9, "class", "tab");
    			add_location(div9, file$3, 28, 4, 783);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div1, t3);
    			append_dev(div1, span1);
    			append_dev(div4, t5);
    			append_dev(div4, div2);
    			append_dev(div4, t7);
    			append_dev(div4, div3);
    			append_dev(div3, t8);
    			append_dev(div3, span2);
    			append_dev(div3, t10);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div6);
    			append_dev(div9, t14);
    			append_dev(div9, div7);
    			append_dev(div7, t15);
    			append_dev(div7, br);
    			append_dev(div7, t16);
    			append_dev(div9, t17);
    			append_dev(div9, div8);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(div9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(21:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (35:2) <One>
    function create_default_slot_4(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "in practice, people want a phrase, a clause, or a chunk of words -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "that do one thing.";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "people don't wanna trip-over some adverb.";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "this is a harder, more-goofy task";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "but it is not impossible.";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "it allows a lot of neat things to happen";
    			add_location(div0, file$3, 35, 4, 998);
    			attr_dev(div1, "class", "tab i");
    			add_location(div1, file$3, 36, 4, 1080);
    			attr_dev(div2, "class", "down f09");
    			add_location(div2, file$3, 37, 4, 1128);
    			attr_dev(div3, "class", "down");
    			add_location(div3, file$3, 38, 4, 1202);
    			add_location(div4, file$3, 39, 4, 1264);
    			attr_dev(div5, "class", "down");
    			add_location(div5, file$3, 40, 4, 1305);
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
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
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
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(35:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (43:2) <Left>
    function create_default_slot_3$1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let div3;
    	let div2;
    	let t3;
    	let div5;
    	let div4;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "turn 'four hundred and five' into '405'";
    			t1 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div2.textContent = "pull-out the details -";
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div4.textContent = "or throw a tense around";
    			add_location(div0, file$3, 44, 6, 1404);
    			add_location(div1, file$3, 43, 4, 1392);
    			add_location(div2, file$3, 48, 6, 1506);
    			add_location(div3, file$3, 47, 4, 1494);
    			add_location(div4, file$3, 52, 6, 1591);
    			add_location(div5, file$3, 51, 4, 1579);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(43:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (57:2) <Two>
    function create_default_slot_2$1(ctx) {
    	let ul;
    	let li0;
    	let t1;
    	let li1;
    	let t3;
    	let li2;

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "date parsing";
    			t1 = space();
    			li1 = element("li");
    			li1.textContent = "redaction";
    			t3 = space();
    			li2 = element("li");
    			li2.textContent = "verb-conjugation";
    			add_location(li0, file$3, 58, 6, 1694);
    			add_location(li1, file$3, 59, 6, 1722);
    			add_location(li2, file$3, 60, 6, 1747);
    			add_location(ul, file$3, 57, 4, 1683);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(57:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (64:2) <One>
    function create_default_slot_1$2(ctx) {
    	let t0;
    	let div0;
    	let t2;
    	let div1;
    	let t4;
    	let div3;
    	let span0;
    	let t6;
    	let span1;
    	let t8;
    	let span2;
    	let t10;
    	let div2;
    	let t11;
    	let b;
    	let t13;
    	let t14;
    	let div4;

    	const block = {
    		c: function create() {
    			t0 = text("If you’re cautious, and worried this won’t work,\n    ");
    			div0 = element("div");
    			div0.textContent = "you are very clever.";
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "but remember -";
    			t4 = space();
    			div3 = element("div");
    			span0 = element("span");
    			span0.textContent = "\"ripped\"";
    			t6 = text(" means ");
    			span1 = element("span");
    			span1.textContent = "torn";
    			t8 = text(" or\n      ");
    			span2 = element("span");
    			span2.textContent = "drunk";
    			t10 = text(",\n      ");
    			div2 = element("div");
    			t11 = text("but both times it's an ");
    			b = element("b");
    			b.textContent = "#Adjective";
    			t13 = text(".");
    			t14 = space();
    			div4 = element("div");
    			div4.textContent = "that's a big problem, but still ahead ↓";
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$3, 65, 4, 1857);
    			add_location(div1, file$3, 66, 4, 1905);
    			attr_dev(span0, "class", "blue i");
    			add_location(span0, file$3, 68, 6, 1963);
    			attr_dev(span1, "class", "rose i");
    			add_location(span1, file$3, 68, 49, 2006);
    			attr_dev(span2, "class", "red i");
    			add_location(span2, file$3, 69, 6, 2048);
    			add_location(b, file$3, 71, 31, 2138);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file$3, 70, 6, 2088);
    			attr_dev(div3, "class", "f2 down");
    			add_location(div3, file$3, 67, 4, 1935);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$3, 74, 4, 2185);
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
    			append_dev(div3, span1);
    			append_dev(div3, t8);
    			append_dev(div3, span2);
    			append_dev(div3, t10);
    			append_dev(div3, div2);
    			append_dev(div2, t11);
    			append_dev(div2, b);
    			append_dev(div2, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(64:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (14:0) <Page>
    function create_default_slot$2(ctx) {
    	let left0;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let left1;
    	let t3;
    	let two;
    	let t4;
    	let one2;
    	let current;

    	left0 = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	left1 = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left0.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(one1.$$.fragment);
    			t2 = space();
    			create_component(left1.$$.fragment);
    			t3 = space();
    			create_component(two.$$.fragment);
    			t4 = space();
    			create_component(one2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(left1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(two, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(one2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left0_changes.$$scope = { dirty, ctx };
    			}

    			left0.$set(left0_changes);
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
    			const left1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left1_changes.$$scope = { dirty, ctx };
    			}

    			left1.$set(left1_changes);
    			const two_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				two_changes.$$scope = { dirty, ctx };
    			}

    			two.$set(two_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left0.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(left1.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left0.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(left1.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(left1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(two, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(one2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(14:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Three', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Three> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block });
    	return [];
    }

    class Three extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/lib/TextArea.svelte generated by Svelte v3.43.0 */
    const file$2 = "src/lib/TextArea.svelte";

    function create_fragment$3(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "input svelte-1j9oqeb");
    			set_style(textarea, "width", /*width*/ ctx[1]);
    			set_style(textarea, "height", /*height*/ ctx[2]);
    			set_style(textarea, "font-size", /*size*/ ctx[3]);
    			attr_dev(textarea, "spellcheck", "false");
    			attr_dev(textarea, "type", "text");
    			add_location(textarea, file$2, 17, 0, 301);
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextArea', slots, []);
    	let { value = '' } = $$props;
    	let el;

    	let { cb = () => {
    		
    	} } = $$props;

    	onMount(() => {
    		el.focus();
    	});

    	let { width = '60%' } = $$props;
    	let { height = '162px' } = $$props;
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
    		onMount,
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

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
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
    			id: create_fragment$3.name
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

    /* src/Four.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/Four.svelte";

    // (25:2) <Left>
    function create_default_slot_3(ctx) {
    	let div1;
    	let h2;
    	let t1;
    	let div0;
    	let kbd;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Step 4: -";
    			t1 = space();
    			div0 = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/<four>";
    			add_location(h2, file$1, 26, 6, 662);
    			add_location(kbd, file$1, 28, 8, 713);
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$1, 27, 6, 687);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$1, 25, 4, 638);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, kbd);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(25:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (33:2) <One>
    function create_default_slot_2(ctx) {
    	let t0;
    	let div0;
    	let t2;
    	let div1;
    	let t4;
    	let textarea;
    	let current;

    	textarea = new TextArea({
    			props: {
    				value: /*str*/ ctx[0],
    				width: "600px",
    				height: "500px"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = text("Or wait, the word-sense problem? Verb frames?\n    ");
    			div0 = element("div");
    			div0.textContent = "Oh ya, we should try that.";
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "Why not.";
    			t4 = space();
    			create_component(textarea.$$.fragment);
    			attr_dev(div0, "class", "down");
    			add_location(div0, file$1, 34, 4, 844);
    			add_location(div1, file$1, 35, 4, 899);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(textarea, target, anchor);
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
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			destroy_component(textarea, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(33:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (39:2) <Two>
    function create_default_slot_1$1(ctx) {
    	let div0;
    	let t1;
    	let div1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "This work is unpublished and still in development.";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "This is planned for 2022.";
    			add_location(div0, file$1, 39, 4, 998);
    			add_location(div1, file$1, 40, 4, 1064);
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
    		source: "(39:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (24:0) <Page>
    function create_default_slot$1(ctx) {
    	let left;
    	let t0;
    	let one;
    	let t1;
    	let two;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
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
    		source: "(24:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let page;
    	let current;

    	page = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
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

    			if (dirty & /*$$scope*/ 2) {
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
    		if ('str' in $$props) $$invalidate(0, str = $$props.str);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [str];
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

    // (14:2) <One>
    function create_default_slot_1(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let a0;
    	let t5;
    	let t6;
    	let div3;
    	let t7;
    	let a1;
    	let t9;
    	let t10;
    	let div4;
    	let t11;
    	let a2;
    	let t13;
    	let t14;
    	let div5;
    	let t15;
    	let b;
    	let t17;
    	let div6;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Compromise was created in 2010 -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "we have published > 100 releases.";
    			t3 = space();
    			div2 = element("div");
    			a0 = element("a");
    			a0.textContent = "Spencer Kelly";
    			t5 = text(" is the benevolent dictator and territorial benefactor.");
    			t6 = space();
    			div3 = element("div");
    			t7 = text("paid work often shows up ");
    			a1 = element("a");
    			a1.textContent = "in our public discord";
    			t9 = text(".");
    			t10 = space();
    			div4 = element("div");
    			t11 = text("PRs are ");
    			a2 = element("a");
    			a2.textContent = "well-considered";
    			t13 = text(" and respected 🔵");
    			t14 = space();
    			div5 = element("div");
    			t15 = text("Web-assembly ");
    			b = element("b");
    			b.textContent = "<should happen>";
    			t17 = space();
    			div6 = element("div");
    			div6.textContent = "Languages other than english <are happening slowly>:";
    			add_location(div0, file, 14, 4, 316);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file, 15, 4, 364);
    			attr_dev(a0, "href", "https://spencermounta.in/");
    			attr_dev(a0, "class", "sky");
    			add_location(a0, file, 17, 6, 450);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file, 16, 4, 425);
    			attr_dev(a1, "href", "");
    			add_location(a1, file, 19, 46, 628);
    			attr_dev(div3, "class", "tab");
    			add_location(div3, file, 19, 4, 586);
    			attr_dev(a2, "href", "");
    			add_location(a2, file, 20, 30, 702);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file, 20, 4, 676);
    			add_location(b, file, 21, 35, 791);
    			attr_dev(div5, "class", "down");
    			add_location(div5, file, 21, 4, 760);
    			attr_dev(div6, "class", "down");
    			add_location(div6, file, 22, 4, 830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, a0);
    			append_dev(div2, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t7);
    			append_dev(div3, a1);
    			append_dev(div3, t9);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t11);
    			append_dev(div4, a2);
    			append_dev(div4, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, t15);
    			append_dev(div5, b);
    			insert_dev(target, t17, anchor);
    			insert_dev(target, div6, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t17);
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(14:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (12:0) <Page>
    function create_default_slot(ctx) {
    	let block;
    	let t0;
    	let one0;
    	let t1;
    	let one1;
    	let t2;
    	let div4;
    	let div0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let t4;
    	let div1;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t5;
    	let t6;
    	let div2;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t7;
    	let t8;
    	let div3;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let t9;
    	let t10;
    	let left;
    	let current;

    	block = new Block({
    			props: { color: "#bfb0b3" },
    			$$inline: true
    		});

    	one0 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({ $$inline: true });
    	left = new Left({ $$inline: true });

    	const block_1 = {
    		c: function create() {
    			create_component(block.$$.fragment);
    			t0 = space();
    			create_component(one0.$$.fragment);
    			t1 = space();
    			create_component(one1.$$.fragment);
    			t2 = space();
    			div4 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t3 = text("\n        Github");
    			t4 = space();
    			div1 = element("div");
    			a1 = element("a");
    			img1 = element("img");
    			t5 = text("\n        Twitter");
    			t6 = space();
    			div2 = element("div");
    			a2 = element("a");
    			img2 = element("img");
    			t7 = text("\n        Discord");
    			t8 = space();
    			div3 = element("div");
    			a3 = element("a");
    			img3 = element("img");
    			t9 = text("\n        Observable");
    			t10 = space();
    			create_component(left.$$.fragment);
    			if (!src_url_equal(img0.src, img0_src_value = "")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file, 30, 8, 1114);
    			attr_dev(a0, "href", "https://github.com/spencermountain/compromise/");
    			add_location(a0, file, 29, 6, 1048);
    			add_location(div0, file, 28, 4, 1036);
    			if (!src_url_equal(img1.src, img1_src_value = "")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file, 36, 8, 1243);
    			attr_dev(a1, "href", "https://twitter.com/nlp_compromise");
    			add_location(a1, file, 35, 6, 1189);
    			add_location(div1, file, 34, 4, 1177);
    			if (!src_url_equal(img2.src, img2_src_value = "")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			add_location(img2, file, 42, 8, 1339);
    			attr_dev(a2, "href", "");
    			add_location(a2, file, 41, 6, 1319);
    			add_location(div2, file, 40, 4, 1307);
    			if (!src_url_equal(img3.src, img3_src_value = "")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			add_location(img3, file, 48, 8, 1491);
    			attr_dev(a3, "href", "https://observablehq.com/@spencermountain/nlp-compromise");
    			add_location(a3, file, 47, 6, 1415);
    			add_location(div3, file, 46, 4, 1403);
    			attr_dev(div4, "class", "row ");
    			set_style(div4, "font-size", "1.5rem");
    			add_location(div4, file, 27, 2, 987);
    		},
    		m: function mount(target, anchor) {
    			mount_component(block, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img0);
    			append_dev(a0, t3);
    			append_dev(div4, t4);
    			append_dev(div4, div1);
    			append_dev(div1, a1);
    			append_dev(a1, img1);
    			append_dev(a1, t5);
    			append_dev(div4, t6);
    			append_dev(div4, div2);
    			append_dev(div2, a2);
    			append_dev(a2, img2);
    			append_dev(a2, t7);
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			append_dev(div3, a3);
    			append_dev(a3, img3);
    			append_dev(a3, t9);
    			insert_dev(target, t10, anchor);
    			mount_component(left, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one0_changes.$$scope = { dirty, ctx };
    			}

    			one0.$set(one0_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(block.$$.fragment, local);
    			transition_in(one0.$$.fragment, local);
    			transition_in(one1.$$.fragment, local);
    			transition_in(left.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(block.$$.fragment, local);
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(left.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(block, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t10);
    			destroy_component(left, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(12:0) <Page>",
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

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block });
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
    	let current;
    	intro = new Intro({ $$inline: true });
    	one = new One_1({ $$inline: true });
    	two = new Two_1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(intro.$$.fragment);
    			t0 = space();
    			create_component(one.$$.fragment);
    			t1 = space();
    			create_component(two.$$.fragment);
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
    			current = true;
    		},
    		p: noop,
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			transition_in(one.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			transition_out(one.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(intro, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(two, detaching);
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
