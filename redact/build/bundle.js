
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
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
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

    var colors = {
      blue: '#6699cc',
      green: '#6accb2',
      yellow: '#e1e6b3',
      red: '#cc7066',
      pink: '#F2C0BB', //'#e6b8b3',

      brown: '#705E5C',
      orange: '#cc8a66',
      purple: '#d8b3e6',
      navy: '#335799',
      olive: '#7f9c6c',

      fuscia: '#735873', //'#603960',
      beige: '#e6d7b3',
      slate: '#8C8C88',
      suede: '#9c896c',
      burnt: '#603a39',

      sea: '#50617A',
      sky: '#2D85A8',
      night: '#303b50',
      // dark: '#2C3133',
      rouge: '#914045',
      grey: '#838B91',

      mud: '#C4ABAB',
      royal: '#275291',
      cherry: '#cc6966',
      tulip: '#e6b3bc',
      rose: '#D68881',
      fire: '#AB5850',

      greyblue: '#72697D',
      greygreen: '#8BA3A2',
      greypurple: '#978BA3',
      burn: '#6D5685',

      slategrey: '#bfb0b3',
      light: '#a3a5a5',
      lighter: '#d7d5d2',
      fudge: '#4d4d4d',
      lightgrey: '#949a9e',

      white: '#fbfbfb',
      dimgrey: '#606c74',
      softblack: '#463D4F',
      dark: '#443d3d',
      black: '#333333'
    };

    /* lib/Page.svelte generated by Svelte v3.43.0 */
    const file$6 = "lib/Page.svelte";

    function create_fragment$6(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "side svelte-ppbo48");
    			add_location(div0, file$6, 9, 2, 143);
    			attr_dev(div1, "class", "container svelte-ppbo48");
    			add_location(div1, file$6, 10, 2, 166);
    			attr_dev(div2, "class", "side svelte-ppbo48");
    			add_location(div2, file$6, 13, 2, 214);
    			attr_dev(div3, "class", "row svelte-ppbo48");
    			add_location(div3, file$6, 8, 0, 123);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, ['default']);
    	let { color = null } = $$props;
    	color = colors[color] || color;
    	let cmp;
    	const writable_props = ['color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ colors, color, cmp });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('cmp' in $$props) cmp = $$props.cmp;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, $$scope, slots];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get color() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/One.svelte generated by Svelte v3.43.0 */
    const file$5 = "lib/One.svelte";

    // (11:4) {#if accent}
    function create_if_block$3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-1kpipmv");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$5, 11, 6, 274);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*accent*/ 1) {
    				set_style(div, "background-color", /*accent*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(11:4) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div2;
    	let div1;
    	let t0;
    	let t1;
    	let div0;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$3(ctx);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div0 = element("div");
    			add_location(div0, file$5, 14, 4, 357);
    			attr_dev(div1, "class", "body svelte-1kpipmv");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$5, 9, 2, 194);
    			attr_dev(div2, "class", "column svelte-1kpipmv");
    			add_location(div2, file$5, 8, 0, 171);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t0);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*accent*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(div1, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 2) {
    				set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
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
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
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
    	validate_slots('One', slots, ['default']);
    	let { accent = '' } = $$props;
    	let { left = 'none' } = $$props;
    	left = colors[left] || left;
    	accent = colors[accent] || accent;
    	const writable_props = ['accent', 'left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<One> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ accent, left, colors });

    	$$self.$inject_state = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [accent, left, $$scope, slots];
    }

    class One extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get accent() {
    		throw new Error("<One>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set accent(value) {
    		throw new Error("<One>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<One>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<One>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/Left.svelte generated by Svelte v3.43.0 */
    const file$4 = "lib/Left.svelte";

    // (11:4) {#if accent}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-6r4k1");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$4, 11, 6, 272);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*accent*/ 1) {
    				set_style(div, "background-color", /*accent*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(11:4) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$2(ctx);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "body svelte-6r4k1");
    			set_style(div0, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div0, file$4, 9, 2, 192);
    			add_location(div1, file$4, 15, 2, 362);
    			attr_dev(div2, "class", "column svelte-6r4k1");
    			add_location(div2, file$4, 8, 0, 169);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			if (if_block) if_block.m(div0, null);
    			append_dev(div0, t0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*accent*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(div0, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 2) {
    				set_style(div0, "border-left", "3px solid " + /*left*/ ctx[1]);
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
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
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
    	validate_slots('Left', slots, ['default']);
    	let { accent } = $$props;
    	let { left = 'none' } = $$props;
    	left = colors[left] || left;
    	accent = colors[accent] || accent;
    	const writable_props = ['accent', 'left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Left> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ accent, left, colors });

    	$$self.$inject_state = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [accent, left, $$scope, slots];
    }

    class Left extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Left",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*accent*/ ctx[0] === undefined && !('accent' in props)) {
    			console.warn("<Left> was created without expected prop 'accent'");
    		}
    	}

    	get accent() {
    		throw new Error("<Left>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set accent(value) {
    		throw new Error("<Left>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<Left>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Left>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/Three.svelte generated by Svelte v3.43.0 */
    const file$3 = "lib/Three.svelte";

    // (12:4) {#if accent}
    function create_if_block$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-1nervpm");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$3, 12, 6, 282);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*accent*/ 1) {
    				set_style(div, "background-color", /*accent*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(12:4) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$1(ctx);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			add_location(div0, file$3, 9, 2, 192);
    			attr_dev(div1, "class", "body svelte-1nervpm");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$3, 10, 2, 202);
    			attr_dev(div2, "class", "column svelte-1nervpm");
    			add_location(div2, file$3, 8, 0, 169);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*accent*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(div1, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*left*/ 2) {
    				set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
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
    			if (detaching) detach_dev(div2);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
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
    	validate_slots('Three', slots, ['default']);
    	let { accent } = $$props;
    	let { left = 'none' } = $$props;
    	left = colors[left] || left;
    	accent = colors[accent] || accent;
    	const writable_props = ['accent', 'left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Three> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ accent, left, colors });

    	$$self.$inject_state = $$props => {
    		if ('accent' in $$props) $$invalidate(0, accent = $$props.accent);
    		if ('left' in $$props) $$invalidate(1, left = $$props.left);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [accent, left, $$scope, slots];
    }

    class Three extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*accent*/ ctx[0] === undefined && !('accent' in props)) {
    			console.warn("<Three> was created without expected prop 'accent'");
    		}
    	}

    	get accent() {
    		throw new Error("<Three>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set accent(value) {
    		throw new Error("<Three>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<Three>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Three>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/Back.svelte generated by Svelte v3.43.0 */

    const file$2 = "lib/Back.svelte";

    // (19:2) {#if hover}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "spencermountain";
    			attr_dev(div, "class", "name svelte-1l5xd6a");
    			add_location(div, file$2, 19, 4, 573);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(19:2) {#if hover}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let a;
    	let svg;
    	let g;
    	let path;
    	let t;
    	let if_block = /*hover*/ ctx[2] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(path, "d", "M81.5,6 C69.8240666,23.5139001 45.8240666,49.9277635 9.5,85.2415902\n        C45.7984814,120.80686 69.7984814,147.22633 81.5,164.5");
    			attr_dev(path, "stroke", /*color*/ ctx[1]);
    			attr_dev(path, "stroke-width", "20");
    			attr_dev(path, "fill-rule", "nonzero");
    			add_location(path, file$2, 9, 6, 303);
    			attr_dev(g, "stroke", "none");
    			attr_dev(g, "stroke-width", "1");
    			attr_dev(g, "fill", "none");
    			attr_dev(g, "fill-rule", "evenodd");
    			attr_dev(g, "stroke-linejoin", "round");
    			add_location(g, file$2, 8, 4, 206);
    			attr_dev(svg, "width", "11px");
    			attr_dev(svg, "height", "30px");
    			attr_dev(svg, "viewBox", "0 0 90 170");
    			add_location(svg, file$2, 7, 2, 148);
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "class", "container svelte-1l5xd6a");
    			add_location(a, file$2, 6, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, svg);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(a, t);
    			if (if_block) if_block.m(a, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 2) {
    				attr_dev(path, "stroke", /*color*/ ctx[1]);
    			}

    			if (dirty & /*href*/ 1) {
    				attr_dev(a, "href", /*href*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
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
    	validate_slots('Back', slots, []);
    	let { href = 'https://compromise.cool' } = $$props;
    	let { color = '#303b50' } = $$props;
    	let hover = false;
    	const writable_props = ['href', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Back> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ href, color, hover });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('hover' in $$props) $$invalidate(2, hover = $$props.hover);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, color, hover];
    }

    class Back extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { href: 0, color: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Back",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get href() {
    		throw new Error("<Back>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Back>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Back>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Back>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/TextArea.svelte generated by Svelte v3.43.0 */

    const file$1 = "lib/TextArea.svelte";

    function create_fragment$1(ctx) {
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
    			add_location(textarea, file$1, 17, 0, 313);
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
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
    			id: create_fragment$1.name
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

    let methods$l = {
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
    let compute$3 = {};
    let hooks = [];

    var tmp = { methods: methods$l, model: model$1, compute: compute$3, hooks };

    const isArray$4 = input => Object.prototype.toString.call(input) === '[object Array]';

    const fns$3 = {
      /** add metadata to term objects */
      compute: function (input) {
        const { world } = this;
        const compute = world.compute;
        // do one method
        if (typeof input === 'string' && compute.hasOwnProperty(input)) {
          compute[input](this);
        }
        // allow a list of methods
        else if (isArray$4(input)) {
          input.forEach(name => world.compute.hasOwnProperty(name) && compute[name](this));
        }
        // allow a custom compute function
        else if (typeof input === 'function') {
          input(this);
        } else {
          console.warn('no compute:', input); // eslint-disable-line
        }
        return this
      },
    };
    var compute$2 = fns$3;

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

    const methods$k = {
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
    var freeze = methods$k;

    const methods$j = Object.assign({}, util, compute$2, loops, freeze);

    // aliases
    methods$j.get = methods$j.eq;
    var api$7 = methods$j;

    const getPtrs = function (view) {
      const { methods, frozen, ptrs, document } = view;
      let frznPtr = methods.one.pointerFromTerms(frozen);
      // let docs = methods.one.getDoc(ptrs, document)
      // remove any results that no-longer line-up
      // console.log(docs)
      // console.log('====')
      // console.log(frozen)
      // frznPtr = frznPtr.filter((p, n) => {
      //   // check that every term is vaguly the same
      //   return docs[n] && docs[n].every((term, i) => sameTerm(term, frozen[n][i]))
      // })
      return frznPtr
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
        if (this.frozen) {
          return this.frozen
        }
        if (this.ptrs) {
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
        // compute our pointer from frozen terms
        if (frozen) {
          return getPtrs(this)
          // return this.methods.one.pointerFromTerms(frozen)
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
        // send the cache down, too?
        if (m._cache && pointer && pointer.length > 1) {
          // only if it's full
          let cache = [];
          pointer.forEach(ptr => {
            if (ptr.length === 1) {
              cache.push(m._cache[ptr[0]]);
            }
          });
          m._cache = cache;
        }
        m.world = this.world;
        return m
      }
      // create a new View, from this one
      toView(pointer) {
        if (pointer === undefined) {
          pointer = this.pointer;
        }
        let m = new View(this.document, pointer);
        // m._cache = this._cache // share this full thing
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
        m._cache = this._cache; //clone this too?
        return m
      }
    }
    Object.assign(View.prototype, api$7);
    var View$1 = View;

    var version = '14rc';

    const isObject$3 = function (item) {
      // let isSet = item instanceof Set
      return item && typeof item === 'object' && !Array.isArray(item)
    };

    // recursive merge of objects
    function mergeDeep(model, plugin) {
      if (isObject$3(plugin)) {
        for (const key in plugin) {
          if (isObject$3(plugin[key])) {
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

    // vroom
    function mergeQuick(model, plugin) {
      for (const key in plugin) {
        model[key] = model[key] || {};
        Object.assign(model[key], plugin[key]);
      }
      return model
    }

    const extend = function (plugin, world, View) {
      const { methods, model, compute, hooks } = world;
      if (plugin.methods) {
        mergeQuick(methods, plugin.methods);
      }
      if (plugin.model) {
        mergeDeep(model, plugin.model);
      }
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

    const isObject$2 = item => item && typeof item === 'object' && !Array.isArray(item);

    const isSet = item => item instanceof Set;

    // not-very-deep clone
    const deepClone$1 = function (obj) {
      for (const key in obj) {
        if (isObject$2(obj[key])) {
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

    /** add words to assume by prefix in typeahead */
    const typeAhead = function (lex = {}) {
      // interpret array as input
      if (Object.prototype.toString.call(lex) === '[object Array]') {
        lex = lex.reduce((h, k) => {
          h[k] = true;
          return h
        }, {});
      }
      this.world.one.typeahead = lex;
      return this
    };

    /** log the decision-making to console */
    const verbose = function (set) {
      let env = typeof process === 'undefined' ? self.env : process.env; //use window, in browser
      env.DEBUG_TAGS = set === 'tagger' || set === true ? true : '';
      env.DEBUG_MATCH = set === 'match' || set === true ? true : '';
      env.DEBUG_CHUNKS = set === 'chunker' || set === true ? true : '';
      return this
    };

    /** pre-compile a list of matches to lookup */
    const compile = function (input) {
      return this().compile(input)
    };

    let world = Object.assign({}, tmp);

    const nlp = function (input, lex) {
      const { methods, hooks } = world;
      if (lex) {
        nlp.addWords(lex);
      }
      //assume ./01-tokenize is installed
      let document = methods.one.tokenize(input, world);
      let doc = new View$1(document);
      doc.world = world;
      doc.compute(hooks);
      return doc
    };

    /** log the decision-making to console */
    nlp.verbose = verbose;

    /** pre-parse any match statements */
    nlp.parseMatch = function (str) {
      return world.methods.one.parseMatch(str)
    };

    /** pre-compile a list of matches to lookup */
    nlp.compile = compile;

    /** add words to assume by prefix in typeahead */
    nlp.typeAhead = typeAhead;

    /** extend compromise functionality */
    nlp.plugin = function (plugin) {
      extend$1(plugin, world, View$1, this);
      return this
    };
    nlp.extend = nlp.plugin;

    /** reach-into compromise internals */
    nlp.world = () => world;

    /** current library release version */
    nlp.version = version;

    /** insert new words/phrases into the lexicon */
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
        last.post = punct + last.post; //+ ' '
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
      let selfPtrs = view.fullPointer;
      ptrs.forEach((ptr, i) => {
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
        // change self backwards by len
        selfPtrs[i] = ptr;
        // extend the pointer
        ptr[2] += needle.length;
      });
      // convert them to whole sentences
      // ptrs = ptrs.map(a => [a[0]])
      let doc = view.toView(ptrs);
      // shift our self pointer, if necessary
      view.ptrs = selfPtrs;
      // try to tag them, too
      doc.compute('index');
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
      if (match && !input) {
        return this.replaceWith(match)
      }
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
          // repair any downstream indexes
          // for (let k = i; k < document.length; k += 1) {
          //   document[k].forEach(term => term.index[0] -= 1)
          // }
        }
      }
      // console.log(document)
      return document
    };

    const methods$i = {
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
        ptrs = ptrs.filter((ptr, i) => {
          const len = ptr[2] - ptr[1];
          if (len <= 0) {
            // adjust downstream pointers
            for (let x = i + 1; x < ptrs.length; x += 1) {
              ptrs[x][0] -= 1;
            }
            return false
          }
          return true
        });
        // mutate original
        self.ptrs = ptrs;
        self.document = document;
        return self.toView(ptrs).compute('index') //return new document
      },
    };
    // aliases
    methods$i.delete = methods$i.remove;
    var remove = methods$i;

    const methods$h = {
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
          let term = terms[terms.length - 1];
          if (concat === true) {
            term.post += str;
          } else {
            term.post = str;
          }
        });
        return this
      },

      /** remove whitespace from start/end */
      trim: function () {
        let docs = this.docs;
        let start = docs[0][0];
        start.pre = start.pre.trimStart();
        let last = docs[docs.length - 1];
        let end = last[last.length - 1];
        end.post = end.post.trimEnd();
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
    methods$h.deHyphenate = methods$h.dehyphenate;
    methods$h.toQuotation = methods$h.toQuotations;

    var whitespace$1 = methods$h;

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

    var methods$g = { alpha, length, wordCount: wordCount$2, sequential, byFreq };

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
        arr = methods$g.byFreq(arr);
        return this.update(arr.map(o => o.pointer))
      }
      // apply sort method on each phrase
      if (typeof methods$g[input] === 'function') {
        arr = arr.sort(methods$g[input]);
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
    const methods$f = {
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
    var fork = methods$f;

    const methods$e = Object.assign({}, caseFns, insert$1, replace, remove, whitespace$1, sort$1, fork);

    const addAPI$3 = function (View) {
      Object.assign(View.prototype, methods$e);
    };
    var api$6 = addAPI$3;

    var change = {
      api: api$6,
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
        return this.intersection(regs)
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
        return this.intersection(regs).eq(0)
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
        return this.intersection(regs)
      }
      return this.none()
    };

    const ifNo = function (regs, group) {
      const { methods } = this;
      const one = methods.one;
      // support a view object as input
      if (isView(regs)) {
        return this.difference(regs)
      }
      // otherwise parse the match string
      if (typeof regs === 'string') {
        regs = one.parseMatch(regs);
      }
      return this.filter(m => {
        let todo = { regs, group, justOne: true };
        let ptrs = one.match(m.docs, todo, m._cache).ptrs;
        return ptrs.length === 0
      })

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

    const combine = function (left, right) {
      return [left[0], left[1], right[2]]
    };

    const getDoc$2 = (m, view, group) => {
      return typeof m === 'string' ? view.match(m, group) : m
    };

    const methods$d = {};
    // [before], [match], [after]
    methods$d.splitOn = function (m, group) {
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
    methods$d.splitBefore = function (m, group) {
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
    methods$d.splitAfter = function (m, group) {
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
    methods$d.split = methods$d.splitAfter;

    var split$1 = methods$d;

    const methods$c = Object.assign({}, match$3, lookaround, split$1);

    // aliases
    methods$c.lookBehind = methods$c.before;
    methods$c.lookBefore = methods$c.before;

    methods$c.lookAhead = methods$c.after;
    methods$c.lookAfter = methods$c.after;

    methods$c.notIf = methods$c.ifNo;
    const matchAPI = function (View) {
      Object.assign(View.prototype, methods$c);
    };
    var api$5 = matchAPI;

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

    const methods$b = {
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
    methods$b.hasQuotation = methods$b.hasQuote;

    var termMethods = methods$b;

    //declare it up here
    let wrapMatch = function () { };
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
      //support whitespace/punctuation
      if (reg.pre !== undefined) {
        return term.pre && term.pre.includes(reg.pre)
      }
      if (reg.post !== undefined) {
        return term.post && term.post.includes(reg.post)
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

    const env = typeof process === 'undefined' ? self.env : process.env;
    const log = msg => {
      if (env.DEBUG_MATCH) {
        console.log(`\n  \x1b[32m ${msg} \x1b[0m`); // eslint-disable-line
      }
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
    //   const env = typeof process === 'undefined' ? self.env : process.env
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

    const methods$9 = {
      one: {
        termMethods,
        parseMatch,
        match: match$1,
      },
    };

    var methods$a = methods$9;

    var match = {
      api: api$5,
      methods: methods$a,
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

    const trimEnd = /[,:;)\]*.?~!\u0022\uFF02\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+$/;
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
      return view.docs.map((terms, i) => {
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
        if (opts.confidence && view.confidence) {
          res.confidence = view.eq(i).confidence();
        }
        return res
      })
    };
    var json = toJson;

    const methods$8 = {
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
    methods$8.data = methods$8.json;

    var out = methods$8;

    const isObject$1 = val => {
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
        } else if (fmt && isObject$1(fmt)) {
          opts = Object.assign({}, fmt, opts);//todo: fixme
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

    const methods$7 = Object.assign({}, out, text);

    const addAPI$2 = function (View) {
      Object.assign(View.prototype, methods$7);
    };
    var api$4 = addAPI$2;

    var output = {
      api: api$4,
    };

    // do the pointers intersect?
    const doesOverlap = function (a, b) {
      if (a[0] !== b[0]) {
        return false
      }
      let [, startA, endA] = a;
      let [, startB, endB] = b;
      // [a,a,a,-,-,-,]
      // [-,-,b,b,b,-,]
      if (startA <= startB && endA > startB) {
        return true
      }
      // [-,-,-,a,a,-,]
      // [-,-,b,b,b,-,]
      if (startB <= startA && endB > startA) {
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
    // neighbours
    // console.log(doesOverlap([0, 1, 3], [0, 3, 5]))
    // console.log(doesOverlap([0, 3, 5], [0, 1, 3]))

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
          if (!matches[i + 1]) {
            res.push(found);
          } else {
            res.push({ before: found.before, match: found.match });
            if (found.after) {
              carry = found.after;
            }
          }
        });
      });
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
    // neighbours
    // console.log(getUnion([[0, 1, 3]], [[0, 3, 5]]))

    const pointerFromTerms = function (docs) {
      let ptr = [];
      docs.forEach(terms => {
        let [n, start] = terms[0].index;
        let [_, end] = terms[terms.length - 1].index;
        ptr.push([n, start, end + 1]);
      });
      return ptr
    };
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

    var methods$6 = {
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

    const methods$5 = {};

    // all parts, minus duplicates
    methods$5.union = function (m) {
      const { getUnion } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getUnion(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };
    methods$5.and = methods$5.union;

    // only parts they both have
    methods$5.intersection = function (m) {
      const { getIntersection } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getIntersection(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };

    // only parts of a that b does not have
    methods$5.difference = function (m) {
      const { getDifference } = this.methods.one;
      m = getDoc(m, this);
      let ptrs = getDifference(this.fullPointer, m.fullPointer);
      return this.toView(ptrs)
    };
    methods$5.not = methods$5.difference;

    // get opposite of a
    methods$5.complement = function () {
      const { getDifference } = this.methods.one;
      let doc = this.all();
      let ptrs = getDifference(doc.fullPointer, this.fullPointer);
      return this.toView(ptrs)
    };

    // remove overlaps
    methods$5.settle = function () {
      const { getUnion } = this.methods.one;
      let ptrs = this.fullPointer;
      ptrs.forEach(ptr => {
        ptrs = getUnion(ptrs, [ptr]);
      });
      return this.update(ptrs)
    };

    var sets = methods$5;

    const addAPI$1 = function (View) {
      // add set/intersection/union
      Object.assign(View.prototype, sets);
    };
    var api$3 = addAPI$1;

    var pointers = {
      methods: methods$6,
      api: api$3,
    };

    const isMulti = / /;

    const addChunk = function (term, tag) {
      if (tag === 'Noun') {
        term.chunk = tag;
      }
      if (tag === 'Verb') {
        term.chunk = tag;
      }
    };

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
            addChunk(term, known.parents[o]);
          }
        }
      }
      // finally, add our tag
      term.tags.add(tag);
      // add a chunk too, if it's easy
      addChunk(term, tag);
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

    var methods$4 = {
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
        // uncache
        this.uncache();
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
        // uncache
        this.uncache();
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
    var api$2 = tagAPI;

    var tag = {
      methods: methods$4,
      api: api$2,
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

    const hasHyphen = function (str, model) {
      let parts = str.split(/[-–—]/);
      if (parts.length <= 1) {
        return false
      }
      const { prefixes, suffixes } = model.one;

      //dont split 're-do'
      if (prefixes.hasOwnProperty(parts[0])) {
        return false
      }
      //dont split 'flower-like'
      parts[1] = parts[1].trim().replace(/[.?!]$/, '');
      if (suffixes.hasOwnProperty(parts[1])) {
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
    const splitWords = function (str, model) {
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
        if (hasHyphen(words[i], model) === true) {
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
    var tokenize$3 = normalizePunctuation;

    const parseTerm = txt => {
      // cleanup any punctuation as whitespace
      let { str, pre, post } = tokenize$3(txt);
      const parsed = {
        text: str,
        pre: pre,
        post: post,
        tags: new Set(),
      };
      return parsed
    };
    var whitespace = parseTerm;

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

    // turn a string input into a 'document' json format
    const tokenize$2 = function (input, world) {
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
          let terms = splitTerms(txt, model);
          // split into [pre-text-post]
          terms = terms.map(splitWhitespace);
          // add normalized term format, always
          terms.forEach(normal);
          return terms
        });
        // compute.normal(input)
        // support slashes, apostrophes, etc
        // compute.alias(input, world)
      }
      return input
    };

    var methods$3 = {
      one: {
        splitSentences: sentence,
        splitTerms: term,
        splitWhitespace: whitespace,
        tokenize: tokenize$2,
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

    // dashed prefixes that are not independent words
    //  'mid-century', 'pre-history'
    var prefixes = [
      'anti',
      'bi',
      'co',
      'contra',
      'counter',
      'de',
      'extra',
      'infra',
      'inter',
      'intra',
      'macro',
      'micro',
      'mid',
      'mis',
      'mono',
      'multi',
      'non',
      'over',
      'peri',
      'post',
      'pre',
      'pro',
      'proto',
      'pseudo',
      're',
      'semi',
      'sub',
      // 'super', //'super-cool'
      'supra',
      'trans',
      'tri',
      // 'ultra', //'ulta-cool'
      'un',
      'out',
      // 'under',
      // 'whole',
    ].reduce((h, str) => {
      h[str] = true;
      return h
    }, {});

    // dashed suffixes that are not independent words
    //  'flower-like', 'president-elect'
    var suffixes = {
      'like': true,
      'ish': true,
      'less': true,
      'able': true,
      'elect': true,
      'type': true,
      'designate': true,
      // 'fold':true,
    };

    var model = {
      one: {
        aliases: aliases$1,
        abbreviations,
        prefixes,
        suffixes,
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
    const freq = function (view) {
      let docs = view.docs;
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
    const offset = function (view) {
      let elapsed = 0;
      let index = 0;
      let docs = view.document; //start from the actual-top
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
    const index = function (view) {
      // console.log('reindex')
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

    const wordCount = function (view) {
      let n = 0;
      let docs = view.docs;
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
    const termLoop = function (view, fn) {
      let docs = view.docs;
      for (let i = 0; i < docs.length; i += 1) {
        for (let t = 0; t < docs[i].length; t += 1) {
          fn(docs[i][t], view.world);
        }
      }
    };

    const methods$2 = {
      alias: (view) => termLoop(view, alias),
      normal: (view) => termLoop(view, normal),
      machine: (view) => termLoop(view, machine),
      freq: freq$1,
      offset: offset$1,
      index: index$1,
      wordCount: wordCount$1,
    };
    var compute$1 = methods$2;

    var tokenize$1 = {
      compute: compute$1,
      methods: methods$3,
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

    // edited by Spencer Kelly
    // credit to https://github.com/BrunoRB/ahocorasick by Bruno Roberto Búrigo.

    const tokenize = function (phrase, world) {
      const { methods, model } = world;
      let terms = methods.one.splitTerms(phrase, model).map(methods.one.splitWhitespace);
      return terms.map(term => term.text.toLowerCase())
    };

    // turn an array or object into a compressed aho-corasick structure
    const buildTrie = function (phrases, world) {

      // const tokenize=methods.one.
      let goNext = [{}];
      let endAs = [null];
      let failTo = [0];

      let xs = [];
      let n = 0;
      phrases.forEach(function (phrase) {
        let curr = 0;
        // let wordsB = phrase.split(/ /g).filter(w => w)
        let words = tokenize(phrase, world);
        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          if (goNext[curr] && goNext[curr].hasOwnProperty(word)) {
            curr = goNext[curr][word];
          } else {
            n++;
            goNext[curr][word] = n;
            goNext[n] = {};
            curr = n;
            endAs[n] = null;
          }
        }
        endAs[curr] = [words.length];
      });

      // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
      for (let word in goNext[0]) {
        n = goNext[0][word];
        failTo[n] = 0;
        xs.push(n);
      }

      while (xs.length) {
        let r = xs.shift();
        // for each symbol a such that g(r, a) = s
        for (let word in goNext[r]) {
          let s = goNext[r][word];
          xs.push(s);
          // set state = f(r)
          n = failTo[r];
          while (n > 0 && !goNext[n].hasOwnProperty(word)) {
            n = failTo[n];
          }
          if (word in goNext[n]) {
            let fs = goNext[n][word];
            failTo[s] = fs;
            if (endAs[fs]) {
              endAs[s] = endAs[s] || [];
              endAs[s] = endAs[s].concat(endAs[fs]);
            }
          } else {
            failTo[s] = 0;
          }
        }
      }
      return { goNext, endAs, failTo, }
    };
    var build = buildTrie;

    // console.log(buildTrie(['smart and cool', 'smart and nice']))

    // chop-off tail of redundant vals at end of array
    const truncate = (list, val) => {
      for (let i = list.length - 1; i >= 0; i -= 1) {
        if (list[i] !== val) {
          list = list.slice(0, i + 1);
          return list
        }
      }
      return list
    };

    // prune trie a bit
    const compress = function (trie) {
      trie.goNext = trie.goNext.map(o => {
        if (Object.keys(o).length === 0) {
          return undefined
        }
        return o
      });
      // chop-off tail of undefined vals in goNext array
      trie.goNext = truncate(trie.goNext, undefined);
      // chop-off tail of zeros in failTo array
      trie.failTo = truncate(trie.failTo, 0);
      // chop-off tail of nulls in endAs array
      trie.endAs = truncate(trie.endAs, null);
      return trie
    };
    var compress$1 = compress;

    // follow our trie structure
    const scanWords = function (terms, trie) {
      let n = 0;
      let results = [];
      for (let i = 0; i < terms.length; i++) {
        let word = terms[i].normal;
        // main match-logic loop:
        while (n > 0 && (trie.goNext[n] === undefined || !trie.goNext[n].hasOwnProperty(word))) {
          n = trie.failTo[n] || 0; // (usually back to 0)
        }
        // did we fail?
        if (!trie.goNext[n].hasOwnProperty(word)) {
          continue
        }
        n = trie.goNext[n][word];
        if (trie.endAs[n]) {
          let arr = trie.endAs[n];
          for (let o = 0; o < arr.length; o++) {
            let len = arr[o];
            let term = terms[i - len + 1];
            let [n, start] = term.index;
            results.push([n, start, start + len]);
          }
        }
      }
      return results
    };

    const cacheMiss = function (words, cache) {
      for (let i = 0; i < words.length; i += 1) {
        if (cache.has(words[i]) === true) {
          return false
        }
      }
      return true
    };

    const scan = function (view, trie) {
      let results = [];
      let docs = view.docs;
      let firstWords = Object.keys(trie.goNext[0]);
      // do each phrase
      for (let i = 0; i < docs.length; i++) {
        // can we skip the phrase, all together?
        if (view._cache && view._cache[i] && cacheMiss(firstWords, view._cache[i]) === true) {
          continue
        }
        let terms = docs[i];
        let found = scanWords(terms, trie);
        if (found.length > 0) {
          results = results.concat(found);
        }
      }
      return view.update(results)
    };
    var scan$1 = scan;

    const isObject = val => {
      return Object.prototype.toString.call(val) === '[object Object]'
    };

    const api$1 = function (View) {
      /** turn an array or object into a compressed trie*/
      View.prototype.compile = function (obj) {
        const trie = build(obj, this.world);
        return compress$1(trie)
      };

      /** find all matches in this document */
      View.prototype.lookup = function (input) {
        if (!input) {
          return this.none()
        }
        if (typeof input === 'string') {
          input = [input];
        }
        let trie = isObject(input) ? input : build(input, this.world);
        let res = scan$1(this, trie);
        res = res.settle();
        return res
      };
    };

    var lookup = {
      api: api$1,
    };

    const createCache = function (document) {
      let cache = document.map(terms => {
        let stuff = new Set();
        terms.forEach(term => {
          // add words
          if (term.normal !== '') {
            stuff.add(term.normal);
          }
          // cache implicit words, too
          if (term.implicit) {
            stuff.add(term.implicit);
          }
          let tags = Array.from(term.tags);
          for (let t = 0; t < tags.length; t += 1) {
            stuff.add('#' + tags[t]);
          }
        });
        return stuff
      });
      return cache
    };
    var cacheDoc = createCache;

    const cacheMatch = function (regs) {
      // parse match strings
      let need = new Set();
      regs.forEach(reg => {
        // negatives can't be cached
        if (reg.optional === true || reg.negative === true) {
          return
        }
        if (reg.tag) {
          need.add('#' + reg.tag);
        }
        if (reg.word) {
          need.add(reg.word);
        }
      });
      return need
    };
    var cacheMatch$1 = cacheMatch;

    var methods$1 = {
      one: {
        cacheDoc,
        cacheMatch: cacheMatch$1,
      },
    };

    const methods = {
      /** */
      cache: function () {
        this._cache = this.methods.one.cacheDoc(this.document);
        return this
      },
      /** */
      uncache: function () {
        this._cache = null;
        return this
      },
    };
    const addAPI = function (View) {
      Object.assign(View.prototype, methods);
    };
    var api = addAPI;

    const cache$1 = function (view) {
      view._cache = view.methods.one.cacheDoc(view.document);
    };

    var compute = {
      cache: cache$1
    };

    var cache = {
      api,
      compute,
      methods: methods$1,
      // hooks: ['cache']
    };

    nlp$1.extend(change); //0kb
    nlp$1.extend(output); //0kb
    nlp$1.extend(match); //10kb
    nlp$1.extend(pointers); //2kb
    nlp$1.extend(tag); //2kb
    nlp$1.extend(tokenize$1); //7kb
    nlp$1.plugin(cache); //~1kb
    nlp$1.extend(lookup); //7kb

    /* redact/App.svelte generated by Svelte v3.43.0 */
    const file = "redact/App.svelte";

    // (38:2) <Left>
    function create_default_slot_2(ctx) {
    	let kbd;
    	let t1;
    	let div0;
    	let t2;
    	let div1;

    	const block = {
    		c: function create() {
    			kbd = element("kbd");
    			kbd.textContent = "compromise/three/redact";
    			t1 = space();
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "turn your novel into JSON -";
    			set_style(kbd, "font-size", "1.7rem");
    			set_style(kbd, "line-height", "2rem");
    			add_location(kbd, file, 38, 4, 1204);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file, 39, 4, 1286);
    			attr_dev(div1, "class", "down tab");
    			add_location(div1, file, 40, 4, 1323);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, kbd, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(kbd);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(38:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (44:0) <One >
    function create_default_slot_1(ctx) {
    	let textarea;
    	let t0;
    	let div;
    	let t1;
    	let current;

    	textarea = new TextArea({
    			props: {
    				value: /*text*/ ctx[1],
    				size: "18px",
    				cb: /*onchange*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(textarea.$$.fragment);
    			t0 = space();
    			div = element("div");
    			t1 = text$1(/*res*/ ctx[0]);
    			attr_dev(div, "class", "res down svelte-1twwmwr");
    			add_location(div, file, 45, 2, 1453);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textarea, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, t1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*res*/ 1) set_data_dev(t1, /*res*/ ctx[0]);
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
    			destroy_component(textarea, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(44:0) <One >",
    		ctx
    	});

    	return block;
    }

    // (37:0) <Page bottom='40px'>
    function create_default_slot(ctx) {
    	let left;
    	let t;
    	let one;
    	let current;

    	left = new Left({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	one = new One({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(left.$$.fragment);
    			t = space();
    			create_component(one.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(left, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(one, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const left_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				left_changes.$$scope = { dirty, ctx };
    			}

    			left.$set(left_changes);
    			const one_changes = {};

    			if (dirty & /*$$scope, res*/ 9) {
    				one_changes.$$scope = { dirty, ctx };
    			}

    			one.$set(one_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(left.$$.fragment, local);
    			transition_in(one.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(left.$$.fragment, local);
    			transition_out(one.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(left, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(one, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(37:0) <Page bottom='40px'>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let back;
    	let t0;
    	let page;
    	let t1;
    	let div;
    	let a;
    	let current;
    	back = new Back({ $$inline: true });

    	page = new Page({
    			props: {
    				bottom: "40px",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(back.$$.fragment);
    			t0 = space();
    			create_component(page.$$.fragment);
    			t1 = space();
    			div = element("div");
    			a = element("a");
    			a.textContent = "github";
    			attr_dev(a, "href", "https://github.com/spencermountain/compromise/");
    			attr_dev(a, "class", "");
    			add_location(a, file, 52, 2, 1545);
    			attr_dev(div, "class", "right light f09 svelte-1twwmwr");
    			add_location(div, file, 51, 0, 1513);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(back, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(page, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page_changes = {};

    			if (dirty & /*$$scope, res*/ 9) {
    				page_changes.$$scope = { dirty, ctx };
    			}

    			page.$set(page_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(back.$$.fragment, local);
    			transition_in(page.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(back.$$.fragment, local);
    			transition_out(page.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(back, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(page, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
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
    	let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`;
    	let res = nlp$1(text).text();

    	const onchange = function (txt) {
    		$$invalidate(0, res = nlp$1(txt).text());
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		One,
    		Left,
    		Three,
    		Back,
    		Textarea: TextArea,
    		nlp: nlp$1,
    		text,
    		res,
    		onchange
    	});

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('res' in $$props) $$invalidate(0, res = $$props.res);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [res, text, onchange];
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
