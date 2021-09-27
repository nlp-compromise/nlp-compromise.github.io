
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
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
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
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
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
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
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
    const file$a = "src/lib/Page.svelte";

    function create_fragment$b(ctx) {
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
    			add_location(div0, file$a, 24, 2, 563);
    			attr_dev(div1, "class", "container svelte-z87gs9");
    			add_location(div1, file$a, 25, 2, 586);
    			attr_dev(div2, "class", "side svelte-z87gs9");
    			add_location(div2, file$a, 28, 2, 634);
    			attr_dev(div3, "class", "row svelte-z87gs9");
    			add_location(div3, file$a, 23, 0, 543);
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/lib/One.svelte generated by Svelte v3.43.0 */

    const file$9 = "src/lib/One.svelte";

    function create_fragment$a(ctx) {
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
    			add_location(div0, file$9, 6, 4, 92);
    			add_location(div1, file$9, 9, 4, 179);
    			attr_dev(div2, "class", "box svelte-10fnxb0");
    			add_location(div2, file$9, 5, 2, 70);
    			attr_dev(div3, "class", "column svelte-10fnxb0");
    			add_location(div3, file$9, 4, 0, 47);
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
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One",
    			options,
    			id: create_fragment$a.name
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

    const file$8 = "src/lib/Two.svelte";

    function create_fragment$9(ctx) {
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
    			add_location(div0, file$8, 5, 2, 70);
    			attr_dev(div1, "class", "body svelte-1li13tp");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[0]);
    			add_location(div1, file$8, 7, 4, 102);
    			attr_dev(div2, "class", "box svelte-1li13tp");
    			add_location(div2, file$8, 6, 2, 80);
    			attr_dev(div3, "class", "column svelte-1li13tp");
    			add_location(div3, file$8, 4, 0, 47);
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
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { left: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two",
    			options,
    			id: create_fragment$9.name
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

    const file$7 = "src/lib/Left.svelte";

    function create_fragment$8(ctx) {
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
    			add_location(div0, file$7, 5, 4, 65);
    			add_location(div1, file$7, 8, 4, 123);
    			attr_dev(div2, "class", "box svelte-l0y2fi");
    			add_location(div2, file$7, 4, 2, 43);
    			attr_dev(div3, "class", "column svelte-l0y2fi");
    			add_location(div3, file$7, 3, 0, 20);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Left",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/lib/Row.svelte generated by Svelte v3.43.0 */

    const file$6 = "src/lib/Row.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "row svelte-hha4zt");
    			add_location(div, file$6, 5, 0, 73);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/lib/Block.svelte generated by Svelte v3.43.0 */

    const file$5 = "src/lib/Block.svelte";

    function create_fragment$6(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "block svelte-4rb7y9");
    			set_style(div, "background-color", /*color*/ ctx[0]);
    			add_location(div, file$5, 4, 0, 53);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Block",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get color() {
    		throw new Error("<Block>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Block>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Intro.svelte generated by Svelte v3.43.0 */
    const file$4 = "src/Intro.svelte";

    // (12:2) <One>
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
    			attr_dev(div0, "class", "f09");
    			add_location(div0, file$4, 12, 4, 279);
    			attr_dev(div1, "class", "more f2 m1");
    			add_location(div1, file$4, 13, 4, 322);
    			attr_dev(div2, "class", "tab i f2 rose");
    			add_location(div2, file$4, 14, 4, 379);
    			set_style(div3, "margin-top", "3rem");
    			add_location(div3, file$4, 15, 4, 428);
    			attr_dev(span, "class", "blue i ");
    			set_style(span, "font-size", "1.8rem");
    			add_location(span, file$4, 16, 37, 498);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$4, 16, 4, 465);
    			attr_dev(div5, "class", "tab down f09");
    			add_location(div5, file$4, 17, 4, 581);
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
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(12:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (21:2) <Left>
    function create_default_slot_4$3(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("and there doesn't seem to be a plan to -\n      ");
    			div0 = element("div");
    			div0.textContent = "which seems like an issue.";
    			t2 = text("\n      or maybe it isn't");
    			attr_dev(div0, "class", "tab ");
    			add_location(div0, file$4, 23, 6, 808);
    			attr_dev(div1, "class", "tab down f09");
    			add_location(div1, file$4, 21, 4, 728);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(21:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (37:4) <One>
    function create_default_slot_3$3(ctx) {
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
    	let div3;
    	let t10;
    	let div5;
    	let t11;
    	let div4;

    	const block = {
    		c: function create() {
    			t0 = text("we think ");
    			i = element("i");
    			i.textContent = "open-source, web-focused";
    			t2 = text(" tools\n      ");
    			br = element("br");
    			t3 = text("\n      and a ");
    			a = element("a");
    			a.textContent = "stupidly-good group";
    			t5 = text(" of\n      contributers -\n      ");
    			div0 = element("div");
    			div0.textContent = "focusing on configurability";
    			t7 = space();
    			div2 = element("div");
    			div1 = element("div");
    			div1.textContent = "avoiding really fancy engineering.";
    			t9 = space();
    			div3 = element("div");
    			t10 = space();
    			div5 = element("div");
    			t11 = text("that's the best way to build\n        ");
    			div4 = element("div");
    			div4.textContent = "such a crazy set of things.";
    			add_location(i, file$4, 37, 15, 1274);
    			add_location(br, file$4, 38, 6, 1318);
    			attr_dev(a, "href", "https://github.com/spencermountain/compromise/graphs/contributors");
    			add_location(a, file$4, 39, 12, 1337);
    			attr_dev(div0, "class", "down f2 fuscia tab");
    			add_location(div0, file$4, 41, 6, 1467);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$4, 43, 8, 1620);
    			attr_dev(div2, "class", "down f2 tulip");
    			set_style(div2, "margin-top", "100px");
    			set_style(div2, "margin-left", "200px");
    			add_location(div2, file$4, 42, 6, 1539);
    			set_style(div3, "margin-top", "100px");
    			add_location(div3, file$4, 45, 6, 1697);
    			attr_dev(div4, "class", "tab");
    			add_location(div4, file$4, 49, 8, 1876);
    			attr_dev(div5, "class", "down tab");
    			add_location(div5, file$4, 47, 6, 1808);
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
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, t11);
    			append_dev(div5, div4);
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
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(37:4) <One>",
    		ctx
    	});

    	return block;
    }

    // (28:2) <One>
    function create_default_slot_2$3(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t2;
    	let ul;
    	let li0;
    	let t4;
    	let li1;
    	let t6;
    	let li2;
    	let t8;
    	let one;
    	let current;

    	one = new One({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			div1.textContent = "compromise is a loose organization of standards,";
    			t2 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "ways to flip text around, and mess with it";
    			t4 = space();
    			li1 = element("li");
    			li1.textContent = "ways to bounce queries off of it";
    			t6 = space();
    			li2 = element("li");
    			li2.textContent = "ways to make text-interfaces less painful";
    			t8 = space();
    			create_component(one.$$.fragment);
    			attr_dev(div0, "class", "space");
    			add_location(div0, file$4, 28, 4, 916);
    			add_location(div1, file$4, 29, 4, 942);
    			add_location(li0, file$4, 32, 6, 1082);
    			add_location(li1, file$4, 33, 6, 1140);
    			add_location(li2, file$4, 34, 6, 1188);
    			add_location(ul, file$4, 31, 4, 1071);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    			insert_dev(target, t8, anchor);
    			mount_component(one, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one_changes.$$scope = { dirty, ctx };
    			}

    			one.$set(one_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(one.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(one.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(ul);
    			if (detaching) detach_dev(t8);
    			destroy_component(one, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(28:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (54:2) <One>
    function create_default_slot_1$4(ctx) {
    	let div0;
    	let t1;
    	let kbd0;
    	let t3;
    	let div1;
    	let t4;
    	let kbd1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "seriously -";
    			t1 = space();
    			kbd0 = element("kbd");
    			kbd0.textContent = "<script src=\"https://unpkg.com/compromise\"></script>";
    			t3 = space();
    			div1 = element("div");
    			t4 = space();
    			kbd1 = element("kbd");
    			kbd1.textContent = "npm install compromise";
    			attr_dev(div0, "class", "sea f09");
    			add_location(div0, file$4, 54, 4, 1972);
    			add_location(kbd0, file$4, 55, 4, 2015);
    			add_location(div1, file$4, 56, 4, 2095);
    			add_location(kbd1, file$4, 57, 4, 2107);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, kbd0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, kbd1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(kbd0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(kbd1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(54:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (10:0) <Page>
    function create_default_slot$4(ctx) {
    	let one0;
    	let t0;
    	let one1;
    	let t1;
    	let left;
    	let t2;
    	let one2;
    	let t3;
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

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one3 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1$4] },
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
    			create_component(left.$$.fragment);
    			t2 = space();
    			create_component(one2.$$.fragment);
    			t3 = space();
    			create_component(one3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(one0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(one1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(left, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(one2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(one3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const one1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one1_changes.$$scope = { dirty, ctx };
    			}

    			one1.$set(one1_changes);
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				one2_changes.$$scope = { dirty, ctx };
    			}

    			one2.$set(one2_changes);
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
    			transition_in(left.$$.fragment, local);
    			transition_in(one2.$$.fragment, local);
    			transition_in(one3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(one0.$$.fragment, local);
    			transition_out(one1.$$.fragment, local);
    			transition_out(left.$$.fragment, local);
    			transition_out(one2.$$.fragment, local);
    			transition_out(one3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(one0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(one1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(one2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(one3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(10:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let page;
    	let current;

    	page = new Page({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block });
    	return [];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/One.svelte generated by Svelte v3.43.0 */
    const file$3 = "src/One.svelte";

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
    			h2.textContent = "Step 1: Splitting";
    			t1 = space();
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			add_location(h2, file$3, 14, 4, 313);
    			add_location(kbd, file$3, 16, 6, 368);
    			attr_dev(div, "class", "tab");
    			add_location(div, file$3, 15, 4, 344);
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
    function create_default_slot_3$2(ctx) {
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
    	let t16;
    	let br;
    	let t17;
    	let t18;
    	let div7;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "an uncontroversial way";
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
    			div5.textContent = "you're allowed to be suspicious of it";
    			t15 = space();
    			div6 = element("div");
    			t16 = text("turn your novel into JSON, ");
    			br = element("br");
    			t17 = text("with a one-liner:");
    			t18 = space();
    			div7 = element("div");
    			div7.textContent = "when someone tells you it's impossible, give them a polite shrug";
    			add_location(div0, file$3, 21, 4, 473);
    			attr_dev(span0, "class", "cherry");
    			add_location(span0, file$3, 22, 40, 547);
    			attr_dev(span1, "class", "rose");
    			add_location(span1, file$3, 22, 82, 589);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$3, 22, 4, 511);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file$3, 23, 4, 632);
    			attr_dev(div3, "class", "tab f09");
    			add_location(div3, file$3, 24, 4, 707);
    			attr_dev(div4, "class", "down f09");
    			add_location(div4, file$3, 27, 4, 904);
    			attr_dev(div5, "class", "down f09");
    			add_location(div5, file$3, 28, 4, 960);
    			add_location(br, file$3, 29, 56, 1082);
    			attr_dev(div6, "class", "down f2 tab");
    			add_location(div6, file$3, 29, 4, 1030);
    			attr_dev(div7, "class", "tab f09");
    			add_location(div7, file$3, 30, 4, 1116);
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
    			append_dev(div6, t16);
    			append_dev(div6, br);
    			append_dev(div6, t17);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, div7, anchor);
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
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(div7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(20:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (34:2) <One>
    function create_default_slot_2$2(ctx) {
    	let div;
    	let kbd;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/one";
    			t1 = text(" is like 20kb of javascript:");
    			add_location(kbd, file$3, 34, 9, 1235);
    			add_location(div, file$3, 34, 4, 1230);
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
    		source: "(34:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (45:2) <One>
    function create_default_slot_1$3(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;

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
    			li0.textContent = "syllable parsing";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "text-typeahead";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "indexing and lookup";
    			add_location(div0, file$3, 45, 4, 1467);
    			add_location(div1, file$3, 46, 4, 1515);
    			add_location(li0, file$3, 48, 6, 1583);
    			add_location(li1, file$3, 49, 6, 1615);
    			add_location(li2, file$3, 50, 6, 1645);
    			attr_dev(ul, "class", "list");
    			add_location(ul, file$3, 47, 4, 1559);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(45:2) <One>",
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
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one1 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
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
    			create_component(one2.$$.fragment);
    			t3 = space();
    			div = element("div");
    			div.textContent = "or take a bigger bite ↓";
    			attr_dev(div, "class", "m2 slate down f09");
    			add_location(div, file$3, 53, 2, 1695);
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
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(13:0) <Page>",
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
    				$$slots: { default: [create_default_slot_5$2] },
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('One', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<One> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block });
    	return [];
    }

    class One_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One_1",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Two.svelte generated by Svelte v3.43.0 */
    const file$2 = "src/Two.svelte";

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
    			h2.textContent = "Step 2: Tagging";
    			t1 = space();
    			div0 = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			add_location(h2, file$2, 15, 6, 337);
    			add_location(kbd, file$2, 17, 8, 394);
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$2, 16, 6, 368);
    			attr_dev(div1, "class", "tab");
    			add_location(div1, file$2, 14, 4, 313);
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
    			add_location(b0, file$2, 22, 26, 488);
    			attr_dev(b1, "class", "f2 sky");
    			add_location(b1, file$2, 22, 62, 524);
    			add_location(i, file$2, 22, 99, 561);
    			add_location(div0, file$2, 22, 4, 466);
    			attr_dev(div1, "class", "tab down i");
    			add_location(div1, file$2, 23, 4, 585);
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
    	let div;
    	let t1;
    	let ul;
    	let kbd0;
    	let t3;
    	let kbd1;
    	let t5;
    	let kbd2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "and sometimes this is helpful:";
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
    			attr_dev(div, "class", "down");
    			add_location(div, file$2, 26, 4, 676);
    			attr_dev(kbd0, "class", "blue f2 i");
    			add_location(kbd0, file$2, 28, 6, 746);
    			attr_dev(kbd1, "class", "blue f2 i");
    			add_location(kbd1, file$2, 29, 6, 812);
    			attr_dev(kbd2, "class", "blue f2 i");
    			add_location(kbd2, file$2, 30, 6, 877);
    			add_location(ul, file$2, 27, 4, 735);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, kbd0);
    			append_dev(ul, t3);
    			append_dev(ul, kbd1);
    			append_dev(ul, t5);
    			append_dev(ul, kbd2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
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

    // (34:2) <One>
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
    			div2.textContent = "like it's in some kind of little database";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "it surprising how helpful this is.";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "your matches can be clumsy, ad-hoc,";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "they can be written by product designers.";
    			add_location(div0, file$2, 34, 4, 963);
    			attr_dev(div1, "class", "tab i");
    			add_location(div1, file$2, 35, 4, 1011);
    			attr_dev(div2, "class", "tab sky i");
    			add_location(div2, file$2, 36, 4, 1066);
    			attr_dev(div3, "class", "down");
    			add_location(div3, file$2, 37, 4, 1141);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$2, 38, 4, 1204);
    			attr_dev(div5, "class", "tab");
    			add_location(div5, file$2, 39, 4, 1268);
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
    		source: "(34:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (42:2) <Two>
    function create_default_slot_3$1(ctx) {
    	let div1;
    	let t0;
    	let div0;
    	let t1;
    	let span;
    	let t3;
    	let t4;
    	let br;
    	let t5;
    	let t6;
    	let ul;
    	let li0;
    	let t8;
    	let li1;
    	let t10;
    	let li2;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text("solutions like this can do a lot of leg-work -\n      ");
    			div0 = element("div");
    			t1 = text("before some crazy ");
    			span = element("span");
    			span.textContent = "AI-thing";
    			t3 = text(" -");
    			t4 = space();
    			br = element("br");
    			t5 = text("\n      or more-often, some person's tired eyes.");
    			t6 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "bot-interfaces";
    			t8 = space();
    			li1 = element("li");
    			li1.textContent = "redaction";
    			t10 = space();
    			li2 = element("li");
    			li2.textContent = "contractions";
    			attr_dev(span, "class", "red ");
    			add_location(span, file$2, 44, 44, 1457);
    			attr_dev(div0, "class", "tab f2");
    			add_location(div0, file$2, 44, 6, 1419);
    			add_location(br, file$2, 45, 6, 1506);
    			add_location(div1, file$2, 42, 4, 1354);
    			add_location(li0, file$2, 49, 6, 1586);
    			add_location(li1, file$2, 50, 6, 1616);
    			add_location(li2, file$2, 51, 6, 1641);
    			add_location(ul, file$2, 48, 4, 1575);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div0, span);
    			append_dev(div0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, br);
    			append_dev(div1, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t8);
    			append_dev(ul, li1);
    			append_dev(ul, t10);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(42:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (56:2) <One>
    function create_default_slot_2$1(ctx) {
    	let div;
    	let kbd;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			kbd = element("kbd");
    			kbd.textContent = "compromise/two";
    			t1 = text(" is 130kb minified");
    			add_location(kbd, file$2, 56, 9, 1700);
    			add_location(div, file$2, 56, 4, 1695);
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
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(56:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (59:2) <Two>
    function create_default_slot_1$2(ctx) {
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
    			add_location(div, file$2, 60, 4, 1883);
    			if (!src_url_equal(img.src, img_src_value = "./assets/jesus.gif")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "jesus gif");
    			add_location(img, file$2, 61, 4, 1923);
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
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(59:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (13:0) <Page>
    function create_default_slot$2(ctx) {
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
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two2 = new Two({
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
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(13:0) <Page>",
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
    				$$slots: { default: [create_default_slot_8] },
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
    	validate_slots('Two', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Two> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page, One, Two, Left, Row, Block });
    	return [];
    }

    class Two_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two_1",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Three.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/Three.svelte";

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
    			add_location(h2, file$1, 15, 4, 314);
    			add_location(kbd, file$1, 17, 6, 367);
    			attr_dev(div, "class", "tab");
    			add_location(div, file$1, 16, 4, 343);
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
    			add_location(span0, file$1, 22, 22, 456);
    			attr_dev(div0, "class", "f2");
    			add_location(div0, file$1, 22, 6, 440);
    			attr_dev(span1, "class", "blue i");
    			add_location(span1, file$1, 23, 30, 563);
    			attr_dev(div1, "class", "down");
    			add_location(div1, file$1, 23, 6, 539);
    			attr_dev(div2, "class", "down blue i");
    			add_location(div2, file$1, 24, 6, 616);
    			attr_dev(span2, "class", "blue i");
    			add_location(span2, file$1, 25, 29, 690);
    			attr_dev(div3, "class", "down ");
    			add_location(div3, file$1, 25, 6, 667);
    			add_location(div4, file$1, 21, 4, 428);
    			attr_dev(div5, "class", "mt4");
    			add_location(div5, file$1, 27, 4, 759);
    			add_location(div6, file$1, 29, 6, 808);
    			add_location(br, file$1, 30, 55, 889);
    			attr_dev(div7, "class", "tab");
    			add_location(div7, file$1, 30, 6, 840);
    			add_location(div8, file$1, 31, 6, 937);
    			attr_dev(div9, "class", "tab");
    			add_location(div9, file$1, 28, 4, 783);
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
    	let div3;
    	let t4;
    	let div2;
    	let t6;
    	let div4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "in practice, people want a phrase, a clause, or a chunk of words -";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "that do one thing.";
    			t3 = space();
    			div3 = element("div");
    			t4 = text("this is a harder, more-goofy task ");
    			div2 = element("div");
    			div2.textContent = "but not impossible.";
    			t6 = space();
    			div4 = element("div");
    			div4.textContent = "it allows a lot of neat things to happen";
    			add_location(div0, file$1, 35, 4, 998);
    			attr_dev(div1, "class", "tab i");
    			add_location(div1, file$1, 36, 4, 1080);
    			add_location(div2, file$1, 38, 40, 1187);
    			attr_dev(div3, "class", "down");
    			add_location(div3, file$1, 37, 4, 1128);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$1, 40, 4, 1233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div4);
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
    function create_default_slot_3(ctx) {
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
    			add_location(div0, file$1, 44, 6, 1332);
    			add_location(div1, file$1, 43, 4, 1320);
    			add_location(div2, file$1, 48, 6, 1434);
    			add_location(div3, file$1, 47, 4, 1422);
    			add_location(div4, file$1, 52, 6, 1519);
    			add_location(div5, file$1, 51, 4, 1507);
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
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(43:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (57:2) <Two>
    function create_default_slot_2(ctx) {
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
    			add_location(li0, file$1, 58, 6, 1622);
    			add_location(li1, file$1, 59, 6, 1650);
    			add_location(li2, file$1, 60, 6, 1675);
    			add_location(ul, file$1, 57, 4, 1611);
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
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(57:2) <Two>",
    		ctx
    	});

    	return block;
    }

    // (64:2) <One>
    function create_default_slot_1$1(ctx) {
    	let t0;
    	let div0;
    	let t2;
    	let div1;
    	let t4;
    	let div3;
    	let t5;
    	let span0;
    	let t7;
    	let span1;
    	let t9;
    	let span2;
    	let t11;
    	let div2;
    	let t12;
    	let b;
    	let t14;
    	let t15;
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
    			t5 = text("when ");
    			span0 = element("span");
    			span0.textContent = "\"ripped\"";
    			t7 = text(" means ");
    			span1 = element("span");
    			span1.textContent = "torn";
    			t9 = text(" or\n      ");
    			span2 = element("span");
    			span2.textContent = "drunk";
    			t11 = text(",\n      ");
    			div2 = element("div");
    			t12 = text("both times it is still an ");
    			b = element("b");
    			b.textContent = "#Adjective";
    			t14 = text(".");
    			t15 = space();
    			div4 = element("div");
    			div4.textContent = "that's a big problem, but still ahead.";
    			attr_dev(div0, "class", "tab");
    			add_location(div0, file$1, 65, 4, 1785);
    			add_location(div1, file$1, 66, 4, 1833);
    			attr_dev(span0, "class", "blue i");
    			add_location(span0, file$1, 68, 11, 1896);
    			attr_dev(span1, "class", "rose i");
    			add_location(span1, file$1, 68, 54, 1939);
    			attr_dev(span2, "class", "red i");
    			add_location(span2, file$1, 69, 6, 1981);
    			add_location(b, file$1, 71, 34, 2074);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file$1, 70, 6, 2021);
    			attr_dev(div3, "class", "f2 down");
    			add_location(div3, file$1, 67, 4, 1863);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file$1, 74, 4, 2121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t5);
    			append_dev(div3, span0);
    			append_dev(div3, t7);
    			append_dev(div3, span1);
    			append_dev(div3, t9);
    			append_dev(div3, span2);
    			append_dev(div3, t11);
    			append_dev(div3, div2);
    			append_dev(div2, t12);
    			append_dev(div2, b);
    			append_dev(div2, t14);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(64:2) <One>",
    		ctx
    	});

    	return block;
    }

    // (14:0) <Page>
    function create_default_slot$1(ctx) {
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
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	two = new Two({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one2 = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
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
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(14:0) <Page>",
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
    				$$slots: { default: [create_default_slot_7] },
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
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
    			div1.textContent = "we have published a release every 10 days or so.";
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
    			add_location(a0, file, 17, 6, 465);
    			attr_dev(div2, "class", "down");
    			add_location(div2, file, 16, 4, 440);
    			attr_dev(a1, "href", "");
    			add_location(a1, file, 19, 46, 643);
    			attr_dev(div3, "class", "tab");
    			add_location(div3, file, 19, 4, 601);
    			attr_dev(a2, "href", "");
    			add_location(a2, file, 20, 30, 717);
    			attr_dev(div4, "class", "down");
    			add_location(div4, file, 20, 4, 691);
    			add_location(b, file, 21, 35, 806);
    			attr_dev(div5, "class", "down");
    			add_location(div5, file, 21, 4, 775);
    			attr_dev(div6, "class", "down");
    			add_location(div6, file, 22, 4, 845);
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
    			add_location(img0, file, 30, 8, 1083);
    			attr_dev(a0, "href", "");
    			add_location(a0, file, 29, 6, 1063);
    			add_location(div0, file, 28, 4, 1051);
    			if (!src_url_equal(img1.src, img1_src_value = "")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file, 36, 8, 1178);
    			attr_dev(a1, "href", "");
    			add_location(a1, file, 35, 6, 1158);
    			add_location(div1, file, 34, 4, 1146);
    			if (!src_url_equal(img2.src, img2_src_value = "")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			add_location(img2, file, 42, 8, 1274);
    			attr_dev(a2, "href", "");
    			add_location(a2, file, 41, 6, 1254);
    			add_location(div2, file, 40, 4, 1242);
    			if (!src_url_equal(img3.src, img3_src_value = "")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			add_location(img3, file, 48, 8, 1426);
    			attr_dev(a3, "href", "https://observablehq.com/@spencermountain/nlp-compromise");
    			add_location(a3, file, 47, 6, 1350);
    			add_location(div3, file, 46, 4, 1338);
    			attr_dev(div4, "class", "row ");
    			set_style(div4, "font-size", "1.5rem");
    			add_location(div4, file, 27, 2, 1002);
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
    	let t2;
    	let three;
    	let t3;
    	let out;
    	let current;
    	intro = new Intro({ $$inline: true });
    	one = new One_1({ $$inline: true });
    	two = new Two_1({ $$inline: true });
    	three = new Three({ $$inline: true });
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
    			transition_in(out.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			transition_out(one.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			transition_out(three.$$.fragment, local);
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

    	$$self.$capture_state = () => ({ Intro, One: One_1, Two: Two_1, Three, Out });
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
