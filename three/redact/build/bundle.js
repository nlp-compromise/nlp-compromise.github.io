
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
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
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
    const file$8 = "lib/Page.svelte";

    function create_fragment$8(ctx) {
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
    			add_location(div0, file$8, 9, 2, 143);
    			attr_dev(div1, "class", "container svelte-ppbo48");
    			add_location(div1, file$8, 10, 2, 166);
    			attr_dev(div2, "class", "side svelte-ppbo48");
    			add_location(div2, file$8, 13, 2, 214);
    			attr_dev(div3, "class", "row svelte-ppbo48");
    			add_location(div3, file$8, 8, 0, 123);
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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { color: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$8.name
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
    const file$7 = "lib/One.svelte";

    // (11:4) {#if accent}
    function create_if_block$4(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-1kpipmv");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$7, 11, 6, 274);
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
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(11:4) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div2;
    	let div1;
    	let t0;
    	let t1;
    	let div0;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$4(ctx);
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
    			add_location(div0, file$7, 14, 4, 357);
    			attr_dev(div1, "class", "body svelte-1kpipmv");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$7, 9, 2, 194);
    			attr_dev(div2, "class", "column svelte-1kpipmv");
    			add_location(div2, file$7, 8, 0, 171);
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
    					if_block = create_if_block$4(ctx);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "One",
    			options,
    			id: create_fragment$7.name
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

    /* lib/Two.svelte generated by Svelte v3.43.0 */
    const file$6 = "lib/Two.svelte";

    // (13:6) {#if accent}
    function create_if_block$3(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-s0w7u3");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$6, 13, 8, 313);
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
    		source: "(13:6) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div2;
    	let div1;
    	let t1;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$3(ctx);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			add_location(div0, file$6, 9, 2, 197);
    			attr_dev(div1, "class", "body svelte-s0w7u3");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$6, 11, 4, 229);
    			attr_dev(div2, "class", "box svelte-s0w7u3");
    			add_location(div2, file$6, 10, 2, 207);
    			attr_dev(div3, "class", "column svelte-s0w7u3");
    			add_location(div3, file$6, 8, 0, 174);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
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
    					if_block = create_if_block$3(ctx);
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
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
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
    	validate_slots('Two', slots, ['default']);
    	let { accent = '' } = $$props;
    	let { left = 'none' } = $$props;
    	left = colors[left] || left;
    	accent = colors[accent] || accent;
    	const writable_props = ['accent', 'left'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Two> was created with unknown prop '${key}'`);
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

    class Two extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get accent() {
    		throw new Error("<Two>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set accent(value) {
    		throw new Error("<Two>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<Two>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Two>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/Three.svelte generated by Svelte v3.43.0 */
    const file$5 = "lib/Three.svelte";

    // (12:4) {#if accent}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-1nervpm");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$5, 12, 6, 282);
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
    		source: "(12:4) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$2(ctx);
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
    			add_location(div0, file$5, 9, 2, 192);
    			attr_dev(div1, "class", "body svelte-1nervpm");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$5, 10, 2, 202);
    			attr_dev(div2, "class", "column svelte-1nervpm");
    			add_location(div2, file$5, 8, 0, 169);
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
    					if_block = create_if_block$2(ctx);
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Three",
    			options,
    			id: create_fragment$5.name
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

    /* lib/Left.svelte generated by Svelte v3.43.0 */
    const file$4 = "lib/Left.svelte";

    // (11:4) {#if accent}
    function create_if_block$1(ctx) {
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
    		id: create_if_block$1.name,
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
    	let if_block = /*accent*/ ctx[0] && create_if_block$1(ctx);
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
    					if_block = create_if_block$1(ctx);
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

    /* lib/TextArea.svelte generated by Svelte v3.43.0 */

    const file$3 = "lib/TextArea.svelte";

    function create_fragment$3(ctx) {
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
    			add_location(textarea, file$3, 17, 0, 313);
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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var lib = createCommonjsModule(function (module, exports) {
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    // Distributed under an MIT license: https://codemirror.net/LICENSE

    // This is CodeMirror (https://codemirror.net), a code editor
    // implemented in JavaScript on top of the browser's DOM.
    //
    // You can find some technical background for some of the code below
    // at http://marijnhaverbeke.nl/blog/#cm-internals .

    (function (global, factory) {
      module.exports = factory() ;
    }(commonjsGlobal, (function () {
      // Kludges for bugs and behavior differences that can't be feature
      // detected are enabled based on userAgent etc sniffing.
      var userAgent = navigator.userAgent;
      var platform = navigator.platform;

      var gecko = /gecko\/\d/i.test(userAgent);
      var ie_upto10 = /MSIE \d/.test(userAgent);
      var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
      var edge = /Edge\/(\d+)/.exec(userAgent);
      var ie = ie_upto10 || ie_11up || edge;
      var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
      var webkit = !edge && /WebKit\//.test(userAgent);
      var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
      var chrome = !edge && /Chrome\//.test(userAgent);
      var presto = /Opera\//.test(userAgent);
      var safari = /Apple Computer/.test(navigator.vendor);
      var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
      var phantom = /PhantomJS/.test(userAgent);

      var ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
      var android = /Android/.test(userAgent);
      // This is woefully incomplete. Suggestions for alternative methods welcome.
      var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
      var mac = ios || /Mac/.test(platform);
      var chromeOS = /\bCrOS\b/.test(userAgent);
      var windows = /win/i.test(platform);

      var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
      if (presto_version) { presto_version = Number(presto_version[1]); }
      if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
      // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
      var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
      var captureRightClick = gecko || (ie && ie_version >= 9);

      function classTest(cls) { return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*") }

      var rmClass = function(node, cls) {
        var current = node.className;
        var match = classTest(cls).exec(current);
        if (match) {
          var after = current.slice(match.index + match[0].length);
          node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
        }
      };

      function removeChildren(e) {
        for (var count = e.childNodes.length; count > 0; --count)
          { e.removeChild(e.firstChild); }
        return e
      }

      function removeChildrenAndAdd(parent, e) {
        return removeChildren(parent).appendChild(e)
      }

      function elt(tag, content, className, style) {
        var e = document.createElement(tag);
        if (className) { e.className = className; }
        if (style) { e.style.cssText = style; }
        if (typeof content == "string") { e.appendChild(document.createTextNode(content)); }
        else if (content) { for (var i = 0; i < content.length; ++i) { e.appendChild(content[i]); } }
        return e
      }
      // wrapper for elt, which removes the elt from the accessibility tree
      function eltP(tag, content, className, style) {
        var e = elt(tag, content, className, style);
        e.setAttribute("role", "presentation");
        return e
      }

      var range;
      if (document.createRange) { range = function(node, start, end, endNode) {
        var r = document.createRange();
        r.setEnd(endNode || node, end);
        r.setStart(node, start);
        return r
      }; }
      else { range = function(node, start, end) {
        var r = document.body.createTextRange();
        try { r.moveToElementText(node.parentNode); }
        catch(e) { return r }
        r.collapse(true);
        r.moveEnd("character", end);
        r.moveStart("character", start);
        return r
      }; }

      function contains(parent, child) {
        if (child.nodeType == 3) // Android browser always returns false when child is a textnode
          { child = child.parentNode; }
        if (parent.contains)
          { return parent.contains(child) }
        do {
          if (child.nodeType == 11) { child = child.host; }
          if (child == parent) { return true }
        } while (child = child.parentNode)
      }

      function activeElt() {
        // IE and Edge may throw an "Unspecified Error" when accessing document.activeElement.
        // IE < 10 will throw when accessed while the page is loading or in an iframe.
        // IE > 9 and Edge will throw when accessed in an iframe if document.body is unavailable.
        var activeElement;
        try {
          activeElement = document.activeElement;
        } catch(e) {
          activeElement = document.body || null;
        }
        while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement)
          { activeElement = activeElement.shadowRoot.activeElement; }
        return activeElement
      }

      function addClass(node, cls) {
        var current = node.className;
        if (!classTest(cls).test(current)) { node.className += (current ? " " : "") + cls; }
      }
      function joinClasses(a, b) {
        var as = a.split(" ");
        for (var i = 0; i < as.length; i++)
          { if (as[i] && !classTest(as[i]).test(b)) { b += " " + as[i]; } }
        return b
      }

      var selectInput = function(node) { node.select(); };
      if (ios) // Mobile Safari apparently has a bug where select() is broken.
        { selectInput = function(node) { node.selectionStart = 0; node.selectionEnd = node.value.length; }; }
      else if (ie) // Suppress mysterious IE10 errors
        { selectInput = function(node) { try { node.select(); } catch(_e) {} }; }

      function bind(f) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function(){return f.apply(null, args)}
      }

      function copyObj(obj, target, overwrite) {
        if (!target) { target = {}; }
        for (var prop in obj)
          { if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
            { target[prop] = obj[prop]; } }
        return target
      }

      // Counts the column offset in a string, taking tabs into account.
      // Used mostly to find indentation.
      function countColumn(string, end, tabSize, startIndex, startValue) {
        if (end == null) {
          end = string.search(/[^\s\u00a0]/);
          if (end == -1) { end = string.length; }
        }
        for (var i = startIndex || 0, n = startValue || 0;;) {
          var nextTab = string.indexOf("\t", i);
          if (nextTab < 0 || nextTab >= end)
            { return n + (end - i) }
          n += nextTab - i;
          n += tabSize - (n % tabSize);
          i = nextTab + 1;
        }
      }

      var Delayed = function() {
        this.id = null;
        this.f = null;
        this.time = 0;
        this.handler = bind(this.onTimeout, this);
      };
      Delayed.prototype.onTimeout = function (self) {
        self.id = 0;
        if (self.time <= +new Date) {
          self.f();
        } else {
          setTimeout(self.handler, self.time - +new Date);
        }
      };
      Delayed.prototype.set = function (ms, f) {
        this.f = f;
        var time = +new Date + ms;
        if (!this.id || time < this.time) {
          clearTimeout(this.id);
          this.id = setTimeout(this.handler, ms);
          this.time = time;
        }
      };

      function indexOf(array, elt) {
        for (var i = 0; i < array.length; ++i)
          { if (array[i] == elt) { return i } }
        return -1
      }

      // Number of pixels added to scroller and sizer to hide scrollbar
      var scrollerGap = 30;

      // Returned or thrown by various protocols to signal 'I'm not
      // handling this'.
      var Pass = {toString: function(){return "CodeMirror.Pass"}};

      // Reused option objects for setSelection & friends
      var sel_dontScroll = {scroll: false}, sel_mouse = {origin: "*mouse"}, sel_move = {origin: "+move"};

      // The inverse of countColumn -- find the offset that corresponds to
      // a particular column.
      function findColumn(string, goal, tabSize) {
        for (var pos = 0, col = 0;;) {
          var nextTab = string.indexOf("\t", pos);
          if (nextTab == -1) { nextTab = string.length; }
          var skipped = nextTab - pos;
          if (nextTab == string.length || col + skipped >= goal)
            { return pos + Math.min(skipped, goal - col) }
          col += nextTab - pos;
          col += tabSize - (col % tabSize);
          pos = nextTab + 1;
          if (col >= goal) { return pos }
        }
      }

      var spaceStrs = [""];
      function spaceStr(n) {
        while (spaceStrs.length <= n)
          { spaceStrs.push(lst(spaceStrs) + " "); }
        return spaceStrs[n]
      }

      function lst(arr) { return arr[arr.length-1] }

      function map(array, f) {
        var out = [];
        for (var i = 0; i < array.length; i++) { out[i] = f(array[i], i); }
        return out
      }

      function insertSorted(array, value, score) {
        var pos = 0, priority = score(value);
        while (pos < array.length && score(array[pos]) <= priority) { pos++; }
        array.splice(pos, 0, value);
      }

      function nothing() {}

      function createObj(base, props) {
        var inst;
        if (Object.create) {
          inst = Object.create(base);
        } else {
          nothing.prototype = base;
          inst = new nothing();
        }
        if (props) { copyObj(props, inst); }
        return inst
      }

      var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function isWordCharBasic(ch) {
        return /\w/.test(ch) || ch > "\x80" &&
          (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))
      }
      function isWordChar(ch, helper) {
        if (!helper) { return isWordCharBasic(ch) }
        if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) { return true }
        return helper.test(ch)
      }

      function isEmpty(obj) {
        for (var n in obj) { if (obj.hasOwnProperty(n) && obj[n]) { return false } }
        return true
      }

      // Extending unicode characters. A series of a non-extending char +
      // any number of extending chars is treated as a single unit as far
      // as editing and measuring is concerned. This is not fully correct,
      // since some scripts/fonts/browsers also treat other configurations
      // of code points as a group.
      var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch) }

      // Returns a number from the range [`0`; `str.length`] unless `pos` is outside that range.
      function skipExtendingChars(str, pos, dir) {
        while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) { pos += dir; }
        return pos
      }

      // Returns the value from the range [`from`; `to`] that satisfies
      // `pred` and is closest to `from`. Assumes that at least `to`
      // satisfies `pred`. Supports `from` being greater than `to`.
      function findFirst(pred, from, to) {
        // At any point we are certain `to` satisfies `pred`, don't know
        // whether `from` does.
        var dir = from > to ? -1 : 1;
        for (;;) {
          if (from == to) { return from }
          var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
          if (mid == from) { return pred(mid) ? from : to }
          if (pred(mid)) { to = mid; }
          else { from = mid + dir; }
        }
      }

      // BIDI HELPERS

      function iterateBidiSections(order, from, to, f) {
        if (!order) { return f(from, to, "ltr", 0) }
        var found = false;
        for (var i = 0; i < order.length; ++i) {
          var part = order[i];
          if (part.from < to && part.to > from || from == to && part.to == from) {
            f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i);
            found = true;
          }
        }
        if (!found) { f(from, to, "ltr"); }
      }

      var bidiOther = null;
      function getBidiPartAt(order, ch, sticky) {
        var found;
        bidiOther = null;
        for (var i = 0; i < order.length; ++i) {
          var cur = order[i];
          if (cur.from < ch && cur.to > ch) { return i }
          if (cur.to == ch) {
            if (cur.from != cur.to && sticky == "before") { found = i; }
            else { bidiOther = i; }
          }
          if (cur.from == ch) {
            if (cur.from != cur.to && sticky != "before") { found = i; }
            else { bidiOther = i; }
          }
        }
        return found != null ? found : bidiOther
      }

      // Bidirectional ordering algorithm
      // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
      // that this (partially) implements.

      // One-char codes used for character types:
      // L (L):   Left-to-Right
      // R (R):   Right-to-Left
      // r (AL):  Right-to-Left Arabic
      // 1 (EN):  European Number
      // + (ES):  European Number Separator
      // % (ET):  European Number Terminator
      // n (AN):  Arabic Number
      // , (CS):  Common Number Separator
      // m (NSM): Non-Spacing Mark
      // b (BN):  Boundary Neutral
      // s (B):   Paragraph Separator
      // t (S):   Segment Separator
      // w (WS):  Whitespace
      // N (ON):  Other Neutrals

      // Returns null if characters are ordered as they appear
      // (left-to-right), or an array of sections ({from, to, level}
      // objects) in the order in which they occur visually.
      var bidiOrdering = (function() {
        // Character types for codepoints 0 to 0xff
        var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        // Character types for codepoints 0x600 to 0x6f9
        var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function charType(code) {
          if (code <= 0xf7) { return lowTypes.charAt(code) }
          else if (0x590 <= code && code <= 0x5f4) { return "R" }
          else if (0x600 <= code && code <= 0x6f9) { return arabicTypes.charAt(code - 0x600) }
          else if (0x6ee <= code && code <= 0x8ac) { return "r" }
          else if (0x2000 <= code && code <= 0x200b) { return "w" }
          else if (code == 0x200c) { return "b" }
          else { return "L" }
        }

        var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;

        function BidiSpan(level, from, to) {
          this.level = level;
          this.from = from; this.to = to;
        }

        return function(str, direction) {
          var outerType = direction == "ltr" ? "L" : "R";

          if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) { return false }
          var len = str.length, types = [];
          for (var i = 0; i < len; ++i)
            { types.push(charType(str.charCodeAt(i))); }

          // W1. Examine each non-spacing mark (NSM) in the level run, and
          // change the type of the NSM to the type of the previous
          // character. If the NSM is at the start of the level run, it will
          // get the type of sor.
          for (var i$1 = 0, prev = outerType; i$1 < len; ++i$1) {
            var type = types[i$1];
            if (type == "m") { types[i$1] = prev; }
            else { prev = type; }
          }

          // W2. Search backwards from each instance of a European number
          // until the first strong type (R, L, AL, or sor) is found. If an
          // AL is found, change the type of the European number to Arabic
          // number.
          // W3. Change all ALs to R.
          for (var i$2 = 0, cur = outerType; i$2 < len; ++i$2) {
            var type$1 = types[i$2];
            if (type$1 == "1" && cur == "r") { types[i$2] = "n"; }
            else if (isStrong.test(type$1)) { cur = type$1; if (type$1 == "r") { types[i$2] = "R"; } }
          }

          // W4. A single European separator between two European numbers
          // changes to a European number. A single common separator between
          // two numbers of the same type changes to that type.
          for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
            var type$2 = types[i$3];
            if (type$2 == "+" && prev$1 == "1" && types[i$3+1] == "1") { types[i$3] = "1"; }
            else if (type$2 == "," && prev$1 == types[i$3+1] &&
                     (prev$1 == "1" || prev$1 == "n")) { types[i$3] = prev$1; }
            prev$1 = type$2;
          }

          // W5. A sequence of European terminators adjacent to European
          // numbers changes to all European numbers.
          // W6. Otherwise, separators and terminators change to Other
          // Neutral.
          for (var i$4 = 0; i$4 < len; ++i$4) {
            var type$3 = types[i$4];
            if (type$3 == ",") { types[i$4] = "N"; }
            else if (type$3 == "%") {
              var end = (void 0);
              for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {}
              var replace = (i$4 && types[i$4-1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
              for (var j = i$4; j < end; ++j) { types[j] = replace; }
              i$4 = end - 1;
            }
          }

          // W7. Search backwards from each instance of a European number
          // until the first strong type (R, L, or sor) is found. If an L is
          // found, then change the type of the European number to L.
          for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
            var type$4 = types[i$5];
            if (cur$1 == "L" && type$4 == "1") { types[i$5] = "L"; }
            else if (isStrong.test(type$4)) { cur$1 = type$4; }
          }

          // N1. A sequence of neutrals takes the direction of the
          // surrounding strong text if the text on both sides has the same
          // direction. European and Arabic numbers act as if they were R in
          // terms of their influence on neutrals. Start-of-level-run (sor)
          // and end-of-level-run (eor) are used at level run boundaries.
          // N2. Any remaining neutrals take the embedding direction.
          for (var i$6 = 0; i$6 < len; ++i$6) {
            if (isNeutral.test(types[i$6])) {
              var end$1 = (void 0);
              for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {}
              var before = (i$6 ? types[i$6-1] : outerType) == "L";
              var after = (end$1 < len ? types[end$1] : outerType) == "L";
              var replace$1 = before == after ? (before ? "L" : "R") : outerType;
              for (var j$1 = i$6; j$1 < end$1; ++j$1) { types[j$1] = replace$1; }
              i$6 = end$1 - 1;
            }
          }

          // Here we depart from the documented algorithm, in order to avoid
          // building up an actual levels array. Since there are only three
          // levels (0, 1, 2) in an implementation that doesn't take
          // explicit embedding into account, we can build up the order on
          // the fly, without following the level-based algorithm.
          var order = [], m;
          for (var i$7 = 0; i$7 < len;) {
            if (countsAsLeft.test(types[i$7])) {
              var start = i$7;
              for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {}
              order.push(new BidiSpan(0, start, i$7));
            } else {
              var pos = i$7, at = order.length;
              for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {}
              for (var j$2 = pos; j$2 < i$7;) {
                if (countsAsNum.test(types[j$2])) {
                  if (pos < j$2) { order.splice(at, 0, new BidiSpan(1, pos, j$2)); }
                  var nstart = j$2;
                  for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {}
                  order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                  pos = j$2;
                } else { ++j$2; }
              }
              if (pos < i$7) { order.splice(at, 0, new BidiSpan(1, pos, i$7)); }
            }
          }
          if (direction == "ltr") {
            if (order[0].level == 1 && (m = str.match(/^\s+/))) {
              order[0].from = m[0].length;
              order.unshift(new BidiSpan(0, 0, m[0].length));
            }
            if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
              lst(order).to -= m[0].length;
              order.push(new BidiSpan(0, len - m[0].length, len));
            }
          }

          return direction == "rtl" ? order.reverse() : order
        }
      })();

      // Get the bidi ordering for the given line (and cache it). Returns
      // false for lines that are fully left-to-right, and an array of
      // BidiSpan objects otherwise.
      function getOrder(line, direction) {
        var order = line.order;
        if (order == null) { order = line.order = bidiOrdering(line.text, direction); }
        return order
      }

      // EVENT HANDLING

      // Lightweight event framework. on/off also work on DOM nodes,
      // registering native DOM handlers.

      var noHandlers = [];

      var on = function(emitter, type, f) {
        if (emitter.addEventListener) {
          emitter.addEventListener(type, f, false);
        } else if (emitter.attachEvent) {
          emitter.attachEvent("on" + type, f);
        } else {
          var map$$1 = emitter._handlers || (emitter._handlers = {});
          map$$1[type] = (map$$1[type] || noHandlers).concat(f);
        }
      };

      function getHandlers(emitter, type) {
        return emitter._handlers && emitter._handlers[type] || noHandlers
      }

      function off(emitter, type, f) {
        if (emitter.removeEventListener) {
          emitter.removeEventListener(type, f, false);
        } else if (emitter.detachEvent) {
          emitter.detachEvent("on" + type, f);
        } else {
          var map$$1 = emitter._handlers, arr = map$$1 && map$$1[type];
          if (arr) {
            var index = indexOf(arr, f);
            if (index > -1)
              { map$$1[type] = arr.slice(0, index).concat(arr.slice(index + 1)); }
          }
        }
      }

      function signal(emitter, type /*, values...*/) {
        var handlers = getHandlers(emitter, type);
        if (!handlers.length) { return }
        var args = Array.prototype.slice.call(arguments, 2);
        for (var i = 0; i < handlers.length; ++i) { handlers[i].apply(null, args); }
      }

      // The DOM events that CodeMirror handles can be overridden by
      // registering a (non-DOM) handler on the editor for the event name,
      // and preventDefault-ing the event in that handler.
      function signalDOMEvent(cm, e, override) {
        if (typeof e == "string")
          { e = {type: e, preventDefault: function() { this.defaultPrevented = true; }}; }
        signal(cm, override || e.type, cm, e);
        return e_defaultPrevented(e) || e.codemirrorIgnore
      }

      function signalCursorActivity(cm) {
        var arr = cm._handlers && cm._handlers.cursorActivity;
        if (!arr) { return }
        var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
        for (var i = 0; i < arr.length; ++i) { if (indexOf(set, arr[i]) == -1)
          { set.push(arr[i]); } }
      }

      function hasHandler(emitter, type) {
        return getHandlers(emitter, type).length > 0
      }

      // Add on and off methods to a constructor's prototype, to make
      // registering events on such objects more convenient.
      function eventMixin(ctor) {
        ctor.prototype.on = function(type, f) {on(this, type, f);};
        ctor.prototype.off = function(type, f) {off(this, type, f);};
      }

      // Due to the fact that we still support jurassic IE versions, some
      // compatibility wrappers are needed.

      function e_preventDefault(e) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      function e_stopPropagation(e) {
        if (e.stopPropagation) { e.stopPropagation(); }
        else { e.cancelBubble = true; }
      }
      function e_defaultPrevented(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false
      }
      function e_stop(e) {e_preventDefault(e); e_stopPropagation(e);}

      function e_target(e) {return e.target || e.srcElement}
      function e_button(e) {
        var b = e.which;
        if (b == null) {
          if (e.button & 1) { b = 1; }
          else if (e.button & 2) { b = 3; }
          else if (e.button & 4) { b = 2; }
        }
        if (mac && e.ctrlKey && b == 1) { b = 3; }
        return b
      }

      // Detect drag-and-drop
      var dragAndDrop = function() {
        // There is *some* kind of drag-and-drop support in IE6-8, but I
        // couldn't get it to work yet.
        if (ie && ie_version < 9) { return false }
        var div = elt('div');
        return "draggable" in div || "dragDrop" in div
      }();

      var zwspSupported;
      function zeroWidthElement(measure) {
        if (zwspSupported == null) {
          var test = elt("span", "\u200b");
          removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
          if (measure.firstChild.offsetHeight != 0)
            { zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8); }
        }
        var node = zwspSupported ? elt("span", "\u200b") :
          elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
        node.setAttribute("cm-text", "");
        return node
      }

      // Feature-detect IE's crummy client rect reporting for bidi text
      var badBidiRects;
      function hasBadBidiRects(measure) {
        if (badBidiRects != null) { return badBidiRects }
        var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
        var r0 = range(txt, 0, 1).getBoundingClientRect();
        var r1 = range(txt, 1, 2).getBoundingClientRect();
        removeChildren(measure);
        if (!r0 || r0.left == r0.right) { return false } // Safari returns null in some cases (#2780)
        return badBidiRects = (r1.right - r0.right < 3)
      }

      // See if "".split is the broken IE version, if so, provide an
      // alternative way to split lines.
      var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function (string) {
        var pos = 0, result = [], l = string.length;
        while (pos <= l) {
          var nl = string.indexOf("\n", pos);
          if (nl == -1) { nl = string.length; }
          var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
          var rt = line.indexOf("\r");
          if (rt != -1) {
            result.push(line.slice(0, rt));
            pos += rt + 1;
          } else {
            result.push(line);
            pos = nl + 1;
          }
        }
        return result
      } : function (string) { return string.split(/\r\n?|\n/); };

      var hasSelection = window.getSelection ? function (te) {
        try { return te.selectionStart != te.selectionEnd }
        catch(e) { return false }
      } : function (te) {
        var range$$1;
        try {range$$1 = te.ownerDocument.selection.createRange();}
        catch(e) {}
        if (!range$$1 || range$$1.parentElement() != te) { return false }
        return range$$1.compareEndPoints("StartToEnd", range$$1) != 0
      };

      var hasCopyEvent = (function () {
        var e = elt("div");
        if ("oncopy" in e) { return true }
        e.setAttribute("oncopy", "return;");
        return typeof e.oncopy == "function"
      })();

      var badZoomedRects = null;
      function hasBadZoomedRects(measure) {
        if (badZoomedRects != null) { return badZoomedRects }
        var node = removeChildrenAndAdd(measure, elt("span", "x"));
        var normal = node.getBoundingClientRect();
        var fromRange = range(node, 0, 1).getBoundingClientRect();
        return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1
      }

      // Known modes, by name and by MIME
      var modes = {}, mimeModes = {};

      // Extra arguments are stored as the mode's dependencies, which is
      // used by (legacy) mechanisms like loadmode.js to automatically
      // load a mode. (Preferred mechanism is the require/define calls.)
      function defineMode(name, mode) {
        if (arguments.length > 2)
          { mode.dependencies = Array.prototype.slice.call(arguments, 2); }
        modes[name] = mode;
      }

      function defineMIME(mime, spec) {
        mimeModes[mime] = spec;
      }

      // Given a MIME type, a {name, ...options} config object, or a name
      // string, return a mode config object.
      function resolveMode(spec) {
        if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
          spec = mimeModes[spec];
        } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
          var found = mimeModes[spec.name];
          if (typeof found == "string") { found = {name: found}; }
          spec = createObj(found, spec);
          spec.name = found.name;
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
          return resolveMode("application/xml")
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
          return resolveMode("application/json")
        }
        if (typeof spec == "string") { return {name: spec} }
        else { return spec || {name: "null"} }
      }

      // Given a mode spec (anything that resolveMode accepts), find and
      // initialize an actual mode object.
      function getMode(options, spec) {
        spec = resolveMode(spec);
        var mfactory = modes[spec.name];
        if (!mfactory) { return getMode(options, "text/plain") }
        var modeObj = mfactory(options, spec);
        if (modeExtensions.hasOwnProperty(spec.name)) {
          var exts = modeExtensions[spec.name];
          for (var prop in exts) {
            if (!exts.hasOwnProperty(prop)) { continue }
            if (modeObj.hasOwnProperty(prop)) { modeObj["_" + prop] = modeObj[prop]; }
            modeObj[prop] = exts[prop];
          }
        }
        modeObj.name = spec.name;
        if (spec.helperType) { modeObj.helperType = spec.helperType; }
        if (spec.modeProps) { for (var prop$1 in spec.modeProps)
          { modeObj[prop$1] = spec.modeProps[prop$1]; } }

        return modeObj
      }

      // This can be used to attach properties to mode objects from
      // outside the actual mode definition.
      var modeExtensions = {};
      function extendMode(mode, properties) {
        var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
        copyObj(properties, exts);
      }

      function copyState(mode, state) {
        if (state === true) { return state }
        if (mode.copyState) { return mode.copyState(state) }
        var nstate = {};
        for (var n in state) {
          var val = state[n];
          if (val instanceof Array) { val = val.concat([]); }
          nstate[n] = val;
        }
        return nstate
      }

      // Given a mode and a state (for that mode), find the inner mode and
      // state at the position that the state refers to.
      function innerMode(mode, state) {
        var info;
        while (mode.innerMode) {
          info = mode.innerMode(state);
          if (!info || info.mode == mode) { break }
          state = info.state;
          mode = info.mode;
        }
        return info || {mode: mode, state: state}
      }

      function startState(mode, a1, a2) {
        return mode.startState ? mode.startState(a1, a2) : true
      }

      // STRING STREAM

      // Fed to the mode parsers, provides helper functions to make
      // parsers more succinct.

      var StringStream = function(string, tabSize, lineOracle) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
        this.lineOracle = lineOracle;
      };

      StringStream.prototype.eol = function () {return this.pos >= this.string.length};
      StringStream.prototype.sol = function () {return this.pos == this.lineStart};
      StringStream.prototype.peek = function () {return this.string.charAt(this.pos) || undefined};
      StringStream.prototype.next = function () {
        if (this.pos < this.string.length)
          { return this.string.charAt(this.pos++) }
      };
      StringStream.prototype.eat = function (match) {
        var ch = this.string.charAt(this.pos);
        var ok;
        if (typeof match == "string") { ok = ch == match; }
        else { ok = ch && (match.test ? match.test(ch) : match(ch)); }
        if (ok) {++this.pos; return ch}
      };
      StringStream.prototype.eatWhile = function (match) {
        var start = this.pos;
        while (this.eat(match)){}
        return this.pos > start
      };
      StringStream.prototype.eatSpace = function () {
          var this$1$1 = this;

        var start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) { ++this$1$1.pos; }
        return this.pos > start
      };
      StringStream.prototype.skipToEnd = function () {this.pos = this.string.length;};
      StringStream.prototype.skipTo = function (ch) {
        var found = this.string.indexOf(ch, this.pos);
        if (found > -1) {this.pos = found; return true}
      };
      StringStream.prototype.backUp = function (n) {this.pos -= n;};
      StringStream.prototype.column = function () {
        if (this.lastColumnPos < this.start) {
          this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
          this.lastColumnPos = this.start;
        }
        return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
      };
      StringStream.prototype.indentation = function () {
        return countColumn(this.string, null, this.tabSize) -
          (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
      };
      StringStream.prototype.match = function (pattern, consume, caseInsensitive) {
        if (typeof pattern == "string") {
          var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
          var substr = this.string.substr(this.pos, pattern.length);
          if (cased(substr) == cased(pattern)) {
            if (consume !== false) { this.pos += pattern.length; }
            return true
          }
        } else {
          var match = this.string.slice(this.pos).match(pattern);
          if (match && match.index > 0) { return null }
          if (match && consume !== false) { this.pos += match[0].length; }
          return match
        }
      };
      StringStream.prototype.current = function (){return this.string.slice(this.start, this.pos)};
      StringStream.prototype.hideFirstChars = function (n, inner) {
        this.lineStart += n;
        try { return inner() }
        finally { this.lineStart -= n; }
      };
      StringStream.prototype.lookAhead = function (n) {
        var oracle = this.lineOracle;
        return oracle && oracle.lookAhead(n)
      };
      StringStream.prototype.baseToken = function () {
        var oracle = this.lineOracle;
        return oracle && oracle.baseToken(this.pos)
      };

      // Find the line object corresponding to the given line number.
      function getLine(doc, n) {
        n -= doc.first;
        if (n < 0 || n >= doc.size) { throw new Error("There is no line " + (n + doc.first) + " in the document.") }
        var chunk = doc;
        while (!chunk.lines) {
          for (var i = 0;; ++i) {
            var child = chunk.children[i], sz = child.chunkSize();
            if (n < sz) { chunk = child; break }
            n -= sz;
          }
        }
        return chunk.lines[n]
      }

      // Get the part of a document between two positions, as an array of
      // strings.
      function getBetween(doc, start, end) {
        var out = [], n = start.line;
        doc.iter(start.line, end.line + 1, function (line) {
          var text = line.text;
          if (n == end.line) { text = text.slice(0, end.ch); }
          if (n == start.line) { text = text.slice(start.ch); }
          out.push(text);
          ++n;
        });
        return out
      }
      // Get the lines between from and to, as array of strings.
      function getLines(doc, from, to) {
        var out = [];
        doc.iter(from, to, function (line) { out.push(line.text); }); // iter aborts when callback returns truthy value
        return out
      }

      // Update the height of a line, propagating the height change
      // upwards to parent nodes.
      function updateLineHeight(line, height) {
        var diff = height - line.height;
        if (diff) { for (var n = line; n; n = n.parent) { n.height += diff; } }
      }

      // Given a line object, find its line number by walking up through
      // its parent links.
      function lineNo(line) {
        if (line.parent == null) { return null }
        var cur = line.parent, no = indexOf(cur.lines, line);
        for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
          for (var i = 0;; ++i) {
            if (chunk.children[i] == cur) { break }
            no += chunk.children[i].chunkSize();
          }
        }
        return no + cur.first
      }

      // Find the line at the given vertical position, using the height
      // information in the document tree.
      function lineAtHeight(chunk, h) {
        var n = chunk.first;
        outer: do {
          for (var i$1 = 0; i$1 < chunk.children.length; ++i$1) {
            var child = chunk.children[i$1], ch = child.height;
            if (h < ch) { chunk = child; continue outer }
            h -= ch;
            n += child.chunkSize();
          }
          return n
        } while (!chunk.lines)
        var i = 0;
        for (; i < chunk.lines.length; ++i) {
          var line = chunk.lines[i], lh = line.height;
          if (h < lh) { break }
          h -= lh;
        }
        return n + i
      }

      function isLine(doc, l) {return l >= doc.first && l < doc.first + doc.size}

      function lineNumberFor(options, i) {
        return String(options.lineNumberFormatter(i + options.firstLineNumber))
      }

      // A Pos instance represents a position within the text.
      function Pos(line, ch, sticky) {
        if ( sticky === void 0 ) sticky = null;

        if (!(this instanceof Pos)) { return new Pos(line, ch, sticky) }
        this.line = line;
        this.ch = ch;
        this.sticky = sticky;
      }

      // Compare two positions, return 0 if they are the same, a negative
      // number when a is less, and a positive number otherwise.
      function cmp(a, b) { return a.line - b.line || a.ch - b.ch }

      function equalCursorPos(a, b) { return a.sticky == b.sticky && cmp(a, b) == 0 }

      function copyPos(x) {return Pos(x.line, x.ch)}
      function maxPos(a, b) { return cmp(a, b) < 0 ? b : a }
      function minPos(a, b) { return cmp(a, b) < 0 ? a : b }

      // Most of the external API clips given positions to make sure they
      // actually exist within the document.
      function clipLine(doc, n) {return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1))}
      function clipPos(doc, pos) {
        if (pos.line < doc.first) { return Pos(doc.first, 0) }
        var last = doc.first + doc.size - 1;
        if (pos.line > last) { return Pos(last, getLine(doc, last).text.length) }
        return clipToLen(pos, getLine(doc, pos.line).text.length)
      }
      function clipToLen(pos, linelen) {
        var ch = pos.ch;
        if (ch == null || ch > linelen) { return Pos(pos.line, linelen) }
        else if (ch < 0) { return Pos(pos.line, 0) }
        else { return pos }
      }
      function clipPosArray(doc, array) {
        var out = [];
        for (var i = 0; i < array.length; i++) { out[i] = clipPos(doc, array[i]); }
        return out
      }

      var SavedContext = function(state, lookAhead) {
        this.state = state;
        this.lookAhead = lookAhead;
      };

      var Context = function(doc, state, line, lookAhead) {
        this.state = state;
        this.doc = doc;
        this.line = line;
        this.maxLookAhead = lookAhead || 0;
        this.baseTokens = null;
        this.baseTokenPos = 1;
      };

      Context.prototype.lookAhead = function (n) {
        var line = this.doc.getLine(this.line + n);
        if (line != null && n > this.maxLookAhead) { this.maxLookAhead = n; }
        return line
      };

      Context.prototype.baseToken = function (n) {
          var this$1$1 = this;

        if (!this.baseTokens) { return null }
        while (this.baseTokens[this.baseTokenPos] <= n)
          { this$1$1.baseTokenPos += 2; }
        var type = this.baseTokens[this.baseTokenPos + 1];
        return {type: type && type.replace(/( |^)overlay .*/, ""),
                size: this.baseTokens[this.baseTokenPos] - n}
      };

      Context.prototype.nextLine = function () {
        this.line++;
        if (this.maxLookAhead > 0) { this.maxLookAhead--; }
      };

      Context.fromSaved = function (doc, saved, line) {
        if (saved instanceof SavedContext)
          { return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead) }
        else
          { return new Context(doc, copyState(doc.mode, saved), line) }
      };

      Context.prototype.save = function (copy) {
        var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state
      };


      // Compute a style array (an array starting with a mode generation
      // -- for invalidation -- followed by pairs of end positions and
      // style strings), which is used to highlight the tokens on the
      // line.
      function highlightLine(cm, line, context, forceToEnd) {
        // A styles array always starts with a number identifying the
        // mode/overlays that it is based on (for easy invalidation).
        var st = [cm.state.modeGen], lineClasses = {};
        // Compute the base array of styles
        runMode(cm, line.text, cm.doc.mode, context, function (end, style) { return st.push(end, style); },
                lineClasses, forceToEnd);
        var state = context.state;

        // Run overlays, adjust style array.
        var loop = function ( o ) {
          context.baseTokens = st;
          var overlay = cm.state.overlays[o], i = 1, at = 0;
          context.state = true;
          runMode(cm, line.text, overlay.mode, context, function (end, style) {
            var start = i;
            // Ensure there's a token end at the current position, and that i points at it
            while (at < end) {
              var i_end = st[i];
              if (i_end > end)
                { st.splice(i, 1, end, st[i+1], i_end); }
              i += 2;
              at = Math.min(end, i_end);
            }
            if (!style) { return }
            if (overlay.opaque) {
              st.splice(start, i - start, end, "overlay " + style);
              i = start + 2;
            } else {
              for (; start < i; start += 2) {
                var cur = st[start+1];
                st[start+1] = (cur ? cur + " " : "") + "overlay " + style;
              }
            }
          }, lineClasses);
          context.state = state;
          context.baseTokens = null;
          context.baseTokenPos = 1;
        };

        for (var o = 0; o < cm.state.overlays.length; ++o) loop( o );

        return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null}
      }

      function getLineStyles(cm, line, updateFrontier) {
        if (!line.styles || line.styles[0] != cm.state.modeGen) {
          var context = getContextBefore(cm, lineNo(line));
          var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
          var result = highlightLine(cm, line, context);
          if (resetState) { context.state = resetState; }
          line.stateAfter = context.save(!resetState);
          line.styles = result.styles;
          if (result.classes) { line.styleClasses = result.classes; }
          else if (line.styleClasses) { line.styleClasses = null; }
          if (updateFrontier === cm.doc.highlightFrontier)
            { cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier); }
        }
        return line.styles
      }

      function getContextBefore(cm, n, precise) {
        var doc = cm.doc, display = cm.display;
        if (!doc.mode.startState) { return new Context(doc, true, n) }
        var start = findStartLine(cm, n, precise);
        var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
        var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);

        doc.iter(start, n, function (line) {
          processLine(cm, line.text, context);
          var pos = context.line;
          line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
          context.nextLine();
        });
        if (precise) { doc.modeFrontier = context.line; }
        return context
      }

      // Lightweight form of highlight -- proceed over this line and
      // update state, but don't save a style array. Used for lines that
      // aren't currently visible.
      function processLine(cm, text, context, startAt) {
        var mode = cm.doc.mode;
        var stream = new StringStream(text, cm.options.tabSize, context);
        stream.start = stream.pos = startAt || 0;
        if (text == "") { callBlankLine(mode, context.state); }
        while (!stream.eol()) {
          readToken(mode, stream, context.state);
          stream.start = stream.pos;
        }
      }

      function callBlankLine(mode, state) {
        if (mode.blankLine) { return mode.blankLine(state) }
        if (!mode.innerMode) { return }
        var inner = innerMode(mode, state);
        if (inner.mode.blankLine) { return inner.mode.blankLine(inner.state) }
      }

      function readToken(mode, stream, state, inner) {
        for (var i = 0; i < 10; i++) {
          if (inner) { inner[0] = innerMode(mode, state).mode; }
          var style = mode.token(stream, state);
          if (stream.pos > stream.start) { return style }
        }
        throw new Error("Mode " + mode.name + " failed to advance stream.")
      }

      var Token = function(stream, type, state) {
        this.start = stream.start; this.end = stream.pos;
        this.string = stream.current();
        this.type = type || null;
        this.state = state;
      };

      // Utility for getTokenAt and getLineTokens
      function takeToken(cm, pos, precise, asArray) {
        var doc = cm.doc, mode = doc.mode, style;
        pos = clipPos(doc, pos);
        var line = getLine(doc, pos.line), context = getContextBefore(cm, pos.line, precise);
        var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
        if (asArray) { tokens = []; }
        while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
          stream.start = stream.pos;
          style = readToken(mode, stream, context.state);
          if (asArray) { tokens.push(new Token(stream, style, copyState(doc.mode, context.state))); }
        }
        return asArray ? tokens : new Token(stream, style, context.state)
      }

      function extractLineClasses(type, output) {
        if (type) { for (;;) {
          var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!lineClass) { break }
          type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
          var prop = lineClass[1] ? "bgClass" : "textClass";
          if (output[prop] == null)
            { output[prop] = lineClass[2]; }
          else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
            { output[prop] += " " + lineClass[2]; }
        } }
        return type
      }

      // Run the given mode's parser over a line, calling f for each token.
      function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
        var flattenSpans = mode.flattenSpans;
        if (flattenSpans == null) { flattenSpans = cm.options.flattenSpans; }
        var curStart = 0, curStyle = null;
        var stream = new StringStream(text, cm.options.tabSize, context), style;
        var inner = cm.options.addModeClass && [null];
        if (text == "") { extractLineClasses(callBlankLine(mode, context.state), lineClasses); }
        while (!stream.eol()) {
          if (stream.pos > cm.options.maxHighlightLength) {
            flattenSpans = false;
            if (forceToEnd) { processLine(cm, text, context, stream.pos); }
            stream.pos = text.length;
            style = null;
          } else {
            style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
          }
          if (inner) {
            var mName = inner[0].name;
            if (mName) { style = "m-" + (style ? mName + " " + style : mName); }
          }
          if (!flattenSpans || curStyle != style) {
            while (curStart < stream.start) {
              curStart = Math.min(stream.start, curStart + 5000);
              f(curStart, curStyle);
            }
            curStyle = style;
          }
          stream.start = stream.pos;
        }
        while (curStart < stream.pos) {
          // Webkit seems to refuse to render text nodes longer than 57444
          // characters, and returns inaccurate measurements in nodes
          // starting around 5000 chars.
          var pos = Math.min(stream.pos, curStart + 5000);
          f(pos, curStyle);
          curStart = pos;
        }
      }

      // Finds the line to start with when starting a parse. Tries to
      // find a line with a stateAfter, so that it can start with a
      // valid state. If that fails, it returns the line with the
      // smallest indentation, which tends to need the least context to
      // parse correctly.
      function findStartLine(cm, n, precise) {
        var minindent, minline, doc = cm.doc;
        var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
        for (var search = n; search > lim; --search) {
          if (search <= doc.first) { return doc.first }
          var line = getLine(doc, search - 1), after = line.stateAfter;
          if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier))
            { return search }
          var indented = countColumn(line.text, null, cm.options.tabSize);
          if (minline == null || minindent > indented) {
            minline = search - 1;
            minindent = indented;
          }
        }
        return minline
      }

      function retreatFrontier(doc, n) {
        doc.modeFrontier = Math.min(doc.modeFrontier, n);
        if (doc.highlightFrontier < n - 10) { return }
        var start = doc.first;
        for (var line = n - 1; line > start; line--) {
          var saved = getLine(doc, line).stateAfter;
          // change is on 3
          // state on line 1 looked ahead 2 -- so saw 3
          // test 1 + 2 < 3 should cover this
          if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
            start = line + 1;
            break
          }
        }
        doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
      }

      // Optimize some code when these features are not used.
      var sawReadOnlySpans = false, sawCollapsedSpans = false;

      function seeReadOnlySpans() {
        sawReadOnlySpans = true;
      }

      function seeCollapsedSpans() {
        sawCollapsedSpans = true;
      }

      // TEXTMARKER SPANS

      function MarkedSpan(marker, from, to) {
        this.marker = marker;
        this.from = from; this.to = to;
      }

      // Search an array of spans for a span matching the given marker.
      function getMarkedSpanFor(spans, marker) {
        if (spans) { for (var i = 0; i < spans.length; ++i) {
          var span = spans[i];
          if (span.marker == marker) { return span }
        } }
      }
      // Remove a span from an array, returning undefined if no spans are
      // left (we don't store arrays for lines without spans).
      function removeMarkedSpan(spans, span) {
        var r;
        for (var i = 0; i < spans.length; ++i)
          { if (spans[i] != span) { (r || (r = [])).push(spans[i]); } }
        return r
      }
      // Add a span to a line.
      function addMarkedSpan(line, span) {
        line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
        span.marker.attachLine(line);
      }

      // Used for the algorithm that adjusts markers for a change in the
      // document. These functions cut an array of spans at a given
      // character position, returning an array of remaining chunks (or
      // undefined if nothing remains).
      function markedSpansBefore(old, startCh, isInsert) {
        var nw;
        if (old) { for (var i = 0; i < old.length; ++i) {
          var span = old[i], marker = span.marker;
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
          if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh)
            ;(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
          }
        } }
        return nw
      }
      function markedSpansAfter(old, endCh, isInsert) {
        var nw;
        if (old) { for (var i = 0; i < old.length; ++i) {
          var span = old[i], marker = span.marker;
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
          if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh)
            ;(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
                                                  span.to == null ? null : span.to - endCh));
          }
        } }
        return nw
      }

      // Given a change object, compute the new set of marker spans that
      // cover the line in which the change took place. Removes spans
      // entirely within the change, reconnects spans belonging to the
      // same marker that appear on both sides of the change, and cuts off
      // spans partially within the change. Returns an array of span
      // arrays with one element for each line in (after) the change.
      function stretchSpansOverChange(doc, change) {
        if (change.full) { return null }
        var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
        var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
        if (!oldFirst && !oldLast) { return null }

        var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
        // Get the spans that 'stick out' on both sides
        var first = markedSpansBefore(oldFirst, startCh, isInsert);
        var last = markedSpansAfter(oldLast, endCh, isInsert);

        // Next, merge those two ends
        var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
        if (first) {
          // Fix up .to properties of first
          for (var i = 0; i < first.length; ++i) {
            var span = first[i];
            if (span.to == null) {
              var found = getMarkedSpanFor(last, span.marker);
              if (!found) { span.to = startCh; }
              else if (sameLine) { span.to = found.to == null ? null : found.to + offset; }
            }
          }
        }
        if (last) {
          // Fix up .from in last (or move them into first in case of sameLine)
          for (var i$1 = 0; i$1 < last.length; ++i$1) {
            var span$1 = last[i$1];
            if (span$1.to != null) { span$1.to += offset; }
            if (span$1.from == null) {
              var found$1 = getMarkedSpanFor(first, span$1.marker);
              if (!found$1) {
                span$1.from = offset;
                if (sameLine) { (first || (first = [])).push(span$1); }
              }
            } else {
              span$1.from += offset;
              if (sameLine) { (first || (first = [])).push(span$1); }
            }
          }
        }
        // Make sure we didn't create any zero-length spans
        if (first) { first = clearEmptySpans(first); }
        if (last && last != first) { last = clearEmptySpans(last); }

        var newMarkers = [first];
        if (!sameLine) {
          // Fill gap with whole-line-spans
          var gap = change.text.length - 2, gapMarkers;
          if (gap > 0 && first)
            { for (var i$2 = 0; i$2 < first.length; ++i$2)
              { if (first[i$2].to == null)
                { (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$2].marker, null, null)); } } }
          for (var i$3 = 0; i$3 < gap; ++i$3)
            { newMarkers.push(gapMarkers); }
          newMarkers.push(last);
        }
        return newMarkers
      }

      // Remove spans that are empty and don't have a clearWhenEmpty
      // option of false.
      function clearEmptySpans(spans) {
        for (var i = 0; i < spans.length; ++i) {
          var span = spans[i];
          if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
            { spans.splice(i--, 1); }
        }
        if (!spans.length) { return null }
        return spans
      }

      // Used to 'clip' out readOnly ranges when making a change.
      function removeReadOnlyRanges(doc, from, to) {
        var markers = null;
        doc.iter(from.line, to.line + 1, function (line) {
          if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
            var mark = line.markedSpans[i].marker;
            if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
              { (markers || (markers = [])).push(mark); }
          } }
        });
        if (!markers) { return null }
        var parts = [{from: from, to: to}];
        for (var i = 0; i < markers.length; ++i) {
          var mk = markers[i], m = mk.find(0);
          for (var j = 0; j < parts.length; ++j) {
            var p = parts[j];
            if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) { continue }
            var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
            if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
              { newParts.push({from: p.from, to: m.from}); }
            if (dto > 0 || !mk.inclusiveRight && !dto)
              { newParts.push({from: m.to, to: p.to}); }
            parts.splice.apply(parts, newParts);
            j += newParts.length - 3;
          }
        }
        return parts
      }

      // Connect or disconnect spans from a line.
      function detachMarkedSpans(line) {
        var spans = line.markedSpans;
        if (!spans) { return }
        for (var i = 0; i < spans.length; ++i)
          { spans[i].marker.detachLine(line); }
        line.markedSpans = null;
      }
      function attachMarkedSpans(line, spans) {
        if (!spans) { return }
        for (var i = 0; i < spans.length; ++i)
          { spans[i].marker.attachLine(line); }
        line.markedSpans = spans;
      }

      // Helpers used when computing which overlapping collapsed span
      // counts as the larger one.
      function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0 }
      function extraRight(marker) { return marker.inclusiveRight ? 1 : 0 }

      // Returns a number indicating which of two overlapping collapsed
      // spans is larger (and thus includes the other). Falls back to
      // comparing ids when the spans cover exactly the same range.
      function compareCollapsedMarkers(a, b) {
        var lenDiff = a.lines.length - b.lines.length;
        if (lenDiff != 0) { return lenDiff }
        var aPos = a.find(), bPos = b.find();
        var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
        if (fromCmp) { return -fromCmp }
        var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
        if (toCmp) { return toCmp }
        return b.id - a.id
      }

      // Find out whether a line ends or starts in a collapsed span. If
      // so, return the marker for that span.
      function collapsedSpanAtSide(line, start) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
          sp = sps[i];
          if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
              (!found || compareCollapsedMarkers(found, sp.marker) < 0))
            { found = sp.marker; }
        } }
        return found
      }
      function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true) }
      function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false) }

      function collapsedSpanAround(line, ch) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) { for (var i = 0; i < sps.length; ++i) {
          var sp = sps[i];
          if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) &&
              (!found || compareCollapsedMarkers(found, sp.marker) < 0)) { found = sp.marker; }
        } }
        return found
      }

      // Test whether there exists a collapsed span that partially
      // overlaps (covers the start or end, but not both) of a new span.
      // Such overlap is not allowed.
      function conflictingCollapsedRange(doc, lineNo$$1, from, to, marker) {
        var line = getLine(doc, lineNo$$1);
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) { for (var i = 0; i < sps.length; ++i) {
          var sp = sps[i];
          if (!sp.marker.collapsed) { continue }
          var found = sp.marker.find(0);
          var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
          var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
          if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) { continue }
          if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) ||
              fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0))
            { return true }
        } }
      }

      // A visual line is a line as drawn on the screen. Folding, for
      // example, can cause multiple logical lines to appear on the same
      // visual line. This finds the start of the visual line that the
      // given line is part of (usually that is the line itself).
      function visualLine(line) {
        var merged;
        while (merged = collapsedSpanAtStart(line))
          { line = merged.find(-1, true).line; }
        return line
      }

      function visualLineEnd(line) {
        var merged;
        while (merged = collapsedSpanAtEnd(line))
          { line = merged.find(1, true).line; }
        return line
      }

      // Returns an array of logical lines that continue the visual line
      // started by the argument, or undefined if there are no such lines.
      function visualLineContinued(line) {
        var merged, lines;
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line
          ;(lines || (lines = [])).push(line);
        }
        return lines
      }

      // Get the line number of the start of the visual line that the
      // given line number is part of.
      function visualLineNo(doc, lineN) {
        var line = getLine(doc, lineN), vis = visualLine(line);
        if (line == vis) { return lineN }
        return lineNo(vis)
      }

      // Get the line number of the start of the next visual line after
      // the given line.
      function visualLineEndNo(doc, lineN) {
        if (lineN > doc.lastLine()) { return lineN }
        var line = getLine(doc, lineN), merged;
        if (!lineIsHidden(doc, line)) { return lineN }
        while (merged = collapsedSpanAtEnd(line))
          { line = merged.find(1, true).line; }
        return lineNo(line) + 1
      }

      // Compute whether a line is hidden. Lines count as hidden when they
      // are part of a visual line that starts with another line, or when
      // they are entirely covered by collapsed, non-widget span.
      function lineIsHidden(doc, line) {
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
          sp = sps[i];
          if (!sp.marker.collapsed) { continue }
          if (sp.from == null) { return true }
          if (sp.marker.widgetNode) { continue }
          if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
            { return true }
        } }
      }
      function lineIsHiddenInner(doc, line, span) {
        if (span.to == null) {
          var end = span.marker.find(1, true);
          return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker))
        }
        if (span.marker.inclusiveRight && span.to == line.text.length)
          { return true }
        for (var sp = (void 0), i = 0; i < line.markedSpans.length; ++i) {
          sp = line.markedSpans[i];
          if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
              (sp.to == null || sp.to != span.from) &&
              (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
              lineIsHiddenInner(doc, line, sp)) { return true }
        }
      }

      // Find the height above the given line.
      function heightAtLine(lineObj) {
        lineObj = visualLine(lineObj);

        var h = 0, chunk = lineObj.parent;
        for (var i = 0; i < chunk.lines.length; ++i) {
          var line = chunk.lines[i];
          if (line == lineObj) { break }
          else { h += line.height; }
        }
        for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
          for (var i$1 = 0; i$1 < p.children.length; ++i$1) {
            var cur = p.children[i$1];
            if (cur == chunk) { break }
            else { h += cur.height; }
          }
        }
        return h
      }

      // Compute the character length of a line, taking into account
      // collapsed ranges (see markText) that might hide parts, and join
      // other lines onto it.
      function lineLength(line) {
        if (line.height == 0) { return 0 }
        var len = line.text.length, merged, cur = line;
        while (merged = collapsedSpanAtStart(cur)) {
          var found = merged.find(0, true);
          cur = found.from.line;
          len += found.from.ch - found.to.ch;
        }
        cur = line;
        while (merged = collapsedSpanAtEnd(cur)) {
          var found$1 = merged.find(0, true);
          len -= cur.text.length - found$1.from.ch;
          cur = found$1.to.line;
          len += cur.text.length - found$1.to.ch;
        }
        return len
      }

      // Find the longest line in the document.
      function findMaxLine(cm) {
        var d = cm.display, doc = cm.doc;
        d.maxLine = getLine(doc, doc.first);
        d.maxLineLength = lineLength(d.maxLine);
        d.maxLineChanged = true;
        doc.iter(function (line) {
          var len = lineLength(line);
          if (len > d.maxLineLength) {
            d.maxLineLength = len;
            d.maxLine = line;
          }
        });
      }

      // LINE DATA STRUCTURE

      // Line objects. These hold state related to a line, including
      // highlighting info (the styles array).
      var Line = function(text, markedSpans, estimateHeight) {
        this.text = text;
        attachMarkedSpans(this, markedSpans);
        this.height = estimateHeight ? estimateHeight(this) : 1;
      };

      Line.prototype.lineNo = function () { return lineNo(this) };
      eventMixin(Line);

      // Change the content (text, markers) of a line. Automatically
      // invalidates cached information and tries to re-estimate the
      // line's height.
      function updateLine(line, text, markedSpans, estimateHeight) {
        line.text = text;
        if (line.stateAfter) { line.stateAfter = null; }
        if (line.styles) { line.styles = null; }
        if (line.order != null) { line.order = null; }
        detachMarkedSpans(line);
        attachMarkedSpans(line, markedSpans);
        var estHeight = estimateHeight ? estimateHeight(line) : 1;
        if (estHeight != line.height) { updateLineHeight(line, estHeight); }
      }

      // Detach a line from the document tree and its markers.
      function cleanUpLine(line) {
        line.parent = null;
        detachMarkedSpans(line);
      }

      // Convert a style as returned by a mode (either null, or a string
      // containing one or more styles) to a CSS style. This is cached,
      // and also looks for line-wide styles.
      var styleToClassCache = {}, styleToClassCacheWithMode = {};
      function interpretTokenStyle(style, options) {
        if (!style || /^\s*$/.test(style)) { return null }
        var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
        return cache[style] ||
          (cache[style] = style.replace(/\S+/g, "cm-$&"))
      }

      // Render the DOM representation of the text of a line. Also builds
      // up a 'line map', which points at the DOM nodes that represent
      // specific stretches of text, and is used by the measuring code.
      // The returned object contains the DOM node, this map, and
      // information about line-wide styles that were set by the mode.
      function buildLineContent(cm, lineView) {
        // The padding-right forces the element to have a 'border', which
        // is needed on Webkit to be able to get line-level bounding
        // rectangles for it (in measureChar).
        var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
        var builder = {pre: eltP("pre", [content], "CodeMirror-line"), content: content,
                       col: 0, pos: 0, cm: cm,
                       trailingSpace: false,
                       splitSpaces: cm.getOption("lineWrapping")};
        lineView.measure = {};

        // Iterate over the logical lines that make up this visual line.
        for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
          var line = i ? lineView.rest[i - 1] : lineView.line, order = (void 0);
          builder.pos = 0;
          builder.addToken = buildToken;
          // Optionally wire in some hacks into the token-rendering
          // algorithm, to deal with browser quirks.
          if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction)))
            { builder.addToken = buildTokenBadBidi(builder.addToken, order); }
          builder.map = [];
          var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
          insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
          if (line.styleClasses) {
            if (line.styleClasses.bgClass)
              { builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || ""); }
            if (line.styleClasses.textClass)
              { builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || ""); }
          }

          // Ensure at least a single node is present, for measuring.
          if (builder.map.length == 0)
            { builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure))); }

          // Store the map and a cache object for the current logical line
          if (i == 0) {
            lineView.measure.map = builder.map;
            lineView.measure.cache = {};
          } else {
      (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map)
            ;(lineView.measure.caches || (lineView.measure.caches = [])).push({});
          }
        }

        // See issue #2901
        if (webkit) {
          var last = builder.content.lastChild;
          if (/\bcm-tab\b/.test(last.className) || (last.querySelector && last.querySelector(".cm-tab")))
            { builder.content.className = "cm-tab-wrap-hack"; }
        }

        signal(cm, "renderLine", cm, lineView.line, builder.pre);
        if (builder.pre.className)
          { builder.textClass = joinClasses(builder.pre.className, builder.textClass || ""); }

        return builder
      }

      function defaultSpecialCharPlaceholder(ch) {
        var token = elt("span", "\u2022", "cm-invalidchar");
        token.title = "\\u" + ch.charCodeAt(0).toString(16);
        token.setAttribute("aria-label", token.title);
        return token
      }

      // Build up the DOM representation for a single token, and add it to
      // the line map. Takes care to render special characters separately.
      function buildToken(builder, text, style, startStyle, endStyle, css, attributes) {
        if (!text) { return }
        var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
        var special = builder.cm.state.specialChars, mustWrap = false;
        var content;
        if (!special.test(text)) {
          builder.col += text.length;
          content = document.createTextNode(displayText);
          builder.map.push(builder.pos, builder.pos + text.length, content);
          if (ie && ie_version < 9) { mustWrap = true; }
          builder.pos += text.length;
        } else {
          content = document.createDocumentFragment();
          var pos = 0;
          while (true) {
            special.lastIndex = pos;
            var m = special.exec(text);
            var skipped = m ? m.index - pos : text.length - pos;
            if (skipped) {
              var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
              if (ie && ie_version < 9) { content.appendChild(elt("span", [txt])); }
              else { content.appendChild(txt); }
              builder.map.push(builder.pos, builder.pos + skipped, txt);
              builder.col += skipped;
              builder.pos += skipped;
            }
            if (!m) { break }
            pos += skipped + 1;
            var txt$1 = (void 0);
            if (m[0] == "\t") {
              var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
              txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
              txt$1.setAttribute("role", "presentation");
              txt$1.setAttribute("cm-text", "\t");
              builder.col += tabWidth;
            } else if (m[0] == "\r" || m[0] == "\n") {
              txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
              txt$1.setAttribute("cm-text", m[0]);
              builder.col += 1;
            } else {
              txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
              txt$1.setAttribute("cm-text", m[0]);
              if (ie && ie_version < 9) { content.appendChild(elt("span", [txt$1])); }
              else { content.appendChild(txt$1); }
              builder.col += 1;
            }
            builder.map.push(builder.pos, builder.pos + 1, txt$1);
            builder.pos++;
          }
        }
        builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
        if (style || startStyle || endStyle || mustWrap || css) {
          var fullStyle = style || "";
          if (startStyle) { fullStyle += startStyle; }
          if (endStyle) { fullStyle += endStyle; }
          var token = elt("span", [content], fullStyle, css);
          if (attributes) {
            for (var attr in attributes) { if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class")
              { token.setAttribute(attr, attributes[attr]); } }
          }
          return builder.content.appendChild(token)
        }
        builder.content.appendChild(content);
      }

      // Change some spaces to NBSP to prevent the browser from collapsing
      // trailing spaces at the end of a line when rendering text (issue #1362).
      function splitSpaces(text, trailingBefore) {
        if (text.length > 1 && !/  /.test(text)) { return text }
        var spaceBefore = trailingBefore, result = "";
        for (var i = 0; i < text.length; i++) {
          var ch = text.charAt(i);
          if (ch == " " && spaceBefore && (i == text.length - 1 || text.charCodeAt(i + 1) == 32))
            { ch = "\u00a0"; }
          result += ch;
          spaceBefore = ch == " ";
        }
        return result
      }

      // Work around nonsense dimensions being reported for stretches of
      // right-to-left text.
      function buildTokenBadBidi(inner, order) {
        return function (builder, text, style, startStyle, endStyle, css, attributes) {
          style = style ? style + " cm-force-border" : "cm-force-border";
          var start = builder.pos, end = start + text.length;
          for (;;) {
            // Find the part that overlaps with the start of this text
            var part = (void 0);
            for (var i = 0; i < order.length; i++) {
              part = order[i];
              if (part.to > start && part.from <= start) { break }
            }
            if (part.to >= end) { return inner(builder, text, style, startStyle, endStyle, css, attributes) }
            inner(builder, text.slice(0, part.to - start), style, startStyle, null, css, attributes);
            startStyle = null;
            text = text.slice(part.to - start);
            start = part.to;
          }
        }
      }

      function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
        var widget = !ignoreWidget && marker.widgetNode;
        if (widget) { builder.map.push(builder.pos, builder.pos + size, widget); }
        if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
          if (!widget)
            { widget = builder.content.appendChild(document.createElement("span")); }
          widget.setAttribute("cm-marker", marker.id);
        }
        if (widget) {
          builder.cm.display.input.setUneditable(widget);
          builder.content.appendChild(widget);
        }
        builder.pos += size;
        builder.trailingSpace = false;
      }

      // Outputs a number of spans to make up a line, taking highlighting
      // and marked text into account.
      function insertLineContent(line, builder, styles) {
        var spans = line.markedSpans, allText = line.text, at = 0;
        if (!spans) {
          for (var i$1 = 1; i$1 < styles.length; i$1+=2)
            { builder.addToken(builder, allText.slice(at, at = styles[i$1]), interpretTokenStyle(styles[i$1+1], builder.cm.options)); }
          return
        }

        var len = allText.length, pos = 0, i = 1, text = "", style, css;
        var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
        for (;;) {
          if (nextChange == pos) { // Update current marker set
            spanStyle = spanEndStyle = spanStartStyle = css = "";
            attributes = null;
            collapsed = null; nextChange = Infinity;
            var foundBookmarks = [], endStyles = (void 0);
            for (var j = 0; j < spans.length; ++j) {
              var sp = spans[j], m = sp.marker;
              if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
                foundBookmarks.push(m);
              } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
                if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                  nextChange = sp.to;
                  spanEndStyle = "";
                }
                if (m.className) { spanStyle += " " + m.className; }
                if (m.css) { css = (css ? css + ";" : "") + m.css; }
                if (m.startStyle && sp.from == pos) { spanStartStyle += " " + m.startStyle; }
                if (m.endStyle && sp.to == nextChange) { (endStyles || (endStyles = [])).push(m.endStyle, sp.to); }
                // support for the old title property
                // https://github.com/codemirror/CodeMirror/pull/5673
                if (m.title) { (attributes || (attributes = {})).title = m.title; }
                if (m.attributes) {
                  for (var attr in m.attributes)
                    { (attributes || (attributes = {}))[attr] = m.attributes[attr]; }
                }
                if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
                  { collapsed = sp; }
              } else if (sp.from > pos && nextChange > sp.from) {
                nextChange = sp.from;
              }
            }
            if (endStyles) { for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2)
              { if (endStyles[j$1 + 1] == nextChange) { spanEndStyle += " " + endStyles[j$1]; } } }

            if (!collapsed || collapsed.from == pos) { for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2)
              { buildCollapsedSpan(builder, 0, foundBookmarks[j$2]); } }
            if (collapsed && (collapsed.from || 0) == pos) {
              buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
                                 collapsed.marker, collapsed.from == null);
              if (collapsed.to == null) { return }
              if (collapsed.to == pos) { collapsed = false; }
            }
          }
          if (pos >= len) { break }

          var upto = Math.min(len, nextChange);
          while (true) {
            if (text) {
              var end = pos + text.length;
              if (!collapsed) {
                var tokenText = end > upto ? text.slice(0, upto - pos) : text;
                builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
                                 spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", css, attributes);
              }
              if (end >= upto) {text = text.slice(upto - pos); pos = upto; break}
              pos = end;
              spanStartStyle = "";
            }
            text = allText.slice(at, at = styles[i++]);
            style = interpretTokenStyle(styles[i++], builder.cm.options);
          }
        }
      }


      // These objects are used to represent the visible (currently drawn)
      // part of the document. A LineView may correspond to multiple
      // logical lines, if those are connected by collapsed ranges.
      function LineView(doc, line, lineN) {
        // The starting line
        this.line = line;
        // Continuing lines, if any
        this.rest = visualLineContinued(line);
        // Number of logical lines in this visual line
        this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
        this.node = this.text = null;
        this.hidden = lineIsHidden(doc, line);
      }

      // Create a range of LineView objects for the given lines.
      function buildViewArray(cm, from, to) {
        var array = [], nextPos;
        for (var pos = from; pos < to; pos = nextPos) {
          var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
          nextPos = pos + view.size;
          array.push(view);
        }
        return array
      }

      var operationGroup = null;

      function pushOperation(op) {
        if (operationGroup) {
          operationGroup.ops.push(op);
        } else {
          op.ownsGroup = operationGroup = {
            ops: [op],
            delayedCallbacks: []
          };
        }
      }

      function fireCallbacksForOps(group) {
        // Calls delayed callbacks and cursorActivity handlers until no
        // new ones appear
        var callbacks = group.delayedCallbacks, i = 0;
        do {
          for (; i < callbacks.length; i++)
            { callbacks[i].call(null); }
          for (var j = 0; j < group.ops.length; j++) {
            var op = group.ops[j];
            if (op.cursorActivityHandlers)
              { while (op.cursorActivityCalled < op.cursorActivityHandlers.length)
                { op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm); } }
          }
        } while (i < callbacks.length)
      }

      function finishOperation(op, endCb) {
        var group = op.ownsGroup;
        if (!group) { return }

        try { fireCallbacksForOps(group); }
        finally {
          operationGroup = null;
          endCb(group);
        }
      }

      var orphanDelayedCallbacks = null;

      // Often, we want to signal events at a point where we are in the
      // middle of some work, but don't want the handler to start calling
      // other methods on the editor, which might be in an inconsistent
      // state or simply not expect any other events to happen.
      // signalLater looks whether there are any handlers, and schedules
      // them to be executed when the last operation ends, or, if no
      // operation is active, when a timeout fires.
      function signalLater(emitter, type /*, values...*/) {
        var arr = getHandlers(emitter, type);
        if (!arr.length) { return }
        var args = Array.prototype.slice.call(arguments, 2), list;
        if (operationGroup) {
          list = operationGroup.delayedCallbacks;
        } else if (orphanDelayedCallbacks) {
          list = orphanDelayedCallbacks;
        } else {
          list = orphanDelayedCallbacks = [];
          setTimeout(fireOrphanDelayed, 0);
        }
        var loop = function ( i ) {
          list.push(function () { return arr[i].apply(null, args); });
        };

        for (var i = 0; i < arr.length; ++i)
          loop( i );
      }

      function fireOrphanDelayed() {
        var delayed = orphanDelayedCallbacks;
        orphanDelayedCallbacks = null;
        for (var i = 0; i < delayed.length; ++i) { delayed[i](); }
      }

      // When an aspect of a line changes, a string is added to
      // lineView.changes. This updates the relevant part of the line's
      // DOM structure.
      function updateLineForChanges(cm, lineView, lineN, dims) {
        for (var j = 0; j < lineView.changes.length; j++) {
          var type = lineView.changes[j];
          if (type == "text") { updateLineText(cm, lineView); }
          else if (type == "gutter") { updateLineGutter(cm, lineView, lineN, dims); }
          else if (type == "class") { updateLineClasses(cm, lineView); }
          else if (type == "widget") { updateLineWidgets(cm, lineView, dims); }
        }
        lineView.changes = null;
      }

      // Lines with gutter elements, widgets or a background class need to
      // be wrapped, and have the extra elements added to the wrapper div
      function ensureLineWrapped(lineView) {
        if (lineView.node == lineView.text) {
          lineView.node = elt("div", null, null, "position: relative");
          if (lineView.text.parentNode)
            { lineView.text.parentNode.replaceChild(lineView.node, lineView.text); }
          lineView.node.appendChild(lineView.text);
          if (ie && ie_version < 8) { lineView.node.style.zIndex = 2; }
        }
        return lineView.node
      }

      function updateLineBackground(cm, lineView) {
        var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
        if (cls) { cls += " CodeMirror-linebackground"; }
        if (lineView.background) {
          if (cls) { lineView.background.className = cls; }
          else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
        } else if (cls) {
          var wrap = ensureLineWrapped(lineView);
          lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
          cm.display.input.setUneditable(lineView.background);
        }
      }

      // Wrapper around buildLineContent which will reuse the structure
      // in display.externalMeasured when possible.
      function getLineContent(cm, lineView) {
        var ext = cm.display.externalMeasured;
        if (ext && ext.line == lineView.line) {
          cm.display.externalMeasured = null;
          lineView.measure = ext.measure;
          return ext.built
        }
        return buildLineContent(cm, lineView)
      }

      // Redraw the line's text. Interacts with the background and text
      // classes because the mode may output tokens that influence these
      // classes.
      function updateLineText(cm, lineView) {
        var cls = lineView.text.className;
        var built = getLineContent(cm, lineView);
        if (lineView.text == lineView.node) { lineView.node = built.pre; }
        lineView.text.parentNode.replaceChild(built.pre, lineView.text);
        lineView.text = built.pre;
        if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
          lineView.bgClass = built.bgClass;
          lineView.textClass = built.textClass;
          updateLineClasses(cm, lineView);
        } else if (cls) {
          lineView.text.className = cls;
        }
      }

      function updateLineClasses(cm, lineView) {
        updateLineBackground(cm, lineView);
        if (lineView.line.wrapClass)
          { ensureLineWrapped(lineView).className = lineView.line.wrapClass; }
        else if (lineView.node != lineView.text)
          { lineView.node.className = ""; }
        var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
        lineView.text.className = textClass || "";
      }

      function updateLineGutter(cm, lineView, lineN, dims) {
        if (lineView.gutter) {
          lineView.node.removeChild(lineView.gutter);
          lineView.gutter = null;
        }
        if (lineView.gutterBackground) {
          lineView.node.removeChild(lineView.gutterBackground);
          lineView.gutterBackground = null;
        }
        if (lineView.line.gutterClass) {
          var wrap = ensureLineWrapped(lineView);
          lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass,
                                          ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + (dims.gutterTotalWidth) + "px"));
          cm.display.input.setUneditable(lineView.gutterBackground);
          wrap.insertBefore(lineView.gutterBackground, lineView.text);
        }
        var markers = lineView.line.gutterMarkers;
        if (cm.options.lineNumbers || markers) {
          var wrap$1 = ensureLineWrapped(lineView);
          var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"));
          cm.display.input.setUneditable(gutterWrap);
          wrap$1.insertBefore(gutterWrap, lineView.text);
          if (lineView.line.gutterClass)
            { gutterWrap.className += " " + lineView.line.gutterClass; }
          if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
            { lineView.lineNumber = gutterWrap.appendChild(
              elt("div", lineNumberFor(cm.options, lineN),
                  "CodeMirror-linenumber CodeMirror-gutter-elt",
                  ("left: " + (dims.gutterLeft["CodeMirror-linenumbers"]) + "px; width: " + (cm.display.lineNumInnerWidth) + "px"))); }
          if (markers) { for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
            var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
            if (found)
              { gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt",
                                         ("left: " + (dims.gutterLeft[id]) + "px; width: " + (dims.gutterWidth[id]) + "px"))); }
          } }
        }
      }

      function updateLineWidgets(cm, lineView, dims) {
        if (lineView.alignable) { lineView.alignable = null; }
        var isWidget = classTest("CodeMirror-linewidget");
        for (var node = lineView.node.firstChild, next = (void 0); node; node = next) {
          next = node.nextSibling;
          if (isWidget.test(node.className)) { lineView.node.removeChild(node); }
        }
        insertLineWidgets(cm, lineView, dims);
      }

      // Build a line's DOM representation from scratch
      function buildLineElement(cm, lineView, lineN, dims) {
        var built = getLineContent(cm, lineView);
        lineView.text = lineView.node = built.pre;
        if (built.bgClass) { lineView.bgClass = built.bgClass; }
        if (built.textClass) { lineView.textClass = built.textClass; }

        updateLineClasses(cm, lineView);
        updateLineGutter(cm, lineView, lineN, dims);
        insertLineWidgets(cm, lineView, dims);
        return lineView.node
      }

      // A lineView may contain multiple logical lines (when merged by
      // collapsed spans). The widgets for all of them need to be drawn.
      function insertLineWidgets(cm, lineView, dims) {
        insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
        if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
          { insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false); } }
      }

      function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
        if (!line.widgets) { return }
        var wrap = ensureLineWrapped(lineView);
        for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
          var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
          if (!widget.handleMouseEvents) { node.setAttribute("cm-ignore-events", "true"); }
          positionLineWidget(widget, node, lineView, dims);
          cm.display.input.setUneditable(node);
          if (allowAbove && widget.above)
            { wrap.insertBefore(node, lineView.gutter || lineView.text); }
          else
            { wrap.appendChild(node); }
          signalLater(widget, "redraw");
        }
      }

      function positionLineWidget(widget, node, lineView, dims) {
        if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
          var width = dims.wrapperWidth;
          node.style.left = dims.fixedPos + "px";
          if (!widget.coverGutter) {
            width -= dims.gutterTotalWidth;
            node.style.paddingLeft = dims.gutterTotalWidth + "px";
          }
          node.style.width = width + "px";
        }
        if (widget.coverGutter) {
          node.style.zIndex = 5;
          node.style.position = "relative";
          if (!widget.noHScroll) { node.style.marginLeft = -dims.gutterTotalWidth + "px"; }
        }
      }

      function widgetHeight(widget) {
        if (widget.height != null) { return widget.height }
        var cm = widget.doc.cm;
        if (!cm) { return 0 }
        if (!contains(document.body, widget.node)) {
          var parentStyle = "position: relative;";
          if (widget.coverGutter)
            { parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;"; }
          if (widget.noHScroll)
            { parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;"; }
          removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
        }
        return widget.height = widget.node.parentNode.offsetHeight
      }

      // Return true when the given mouse event happened in a widget
      function eventInWidget(display, e) {
        for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
          if (!n || (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") ||
              (n.parentNode == display.sizer && n != display.mover))
            { return true }
        }
      }

      // POSITION MEASUREMENT

      function paddingTop(display) {return display.lineSpace.offsetTop}
      function paddingVert(display) {return display.mover.offsetHeight - display.lineSpace.offsetHeight}
      function paddingH(display) {
        if (display.cachedPaddingH) { return display.cachedPaddingH }
        var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
        var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
        var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
        if (!isNaN(data.left) && !isNaN(data.right)) { display.cachedPaddingH = data; }
        return data
      }

      function scrollGap(cm) { return scrollerGap - cm.display.nativeBarWidth }
      function displayWidth(cm) {
        return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth
      }
      function displayHeight(cm) {
        return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight
      }

      // Ensure the lineView.wrapping.heights array is populated. This is
      // an array of bottom offsets for the lines that make up a drawn
      // line. When lineWrapping is on, there might be more than one
      // height.
      function ensureLineHeights(cm, lineView, rect) {
        var wrapping = cm.options.lineWrapping;
        var curWidth = wrapping && displayWidth(cm);
        if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
          var heights = lineView.measure.heights = [];
          if (wrapping) {
            lineView.measure.width = curWidth;
            var rects = lineView.text.firstChild.getClientRects();
            for (var i = 0; i < rects.length - 1; i++) {
              var cur = rects[i], next = rects[i + 1];
              if (Math.abs(cur.bottom - next.bottom) > 2)
                { heights.push((cur.bottom + next.top) / 2 - rect.top); }
            }
          }
          heights.push(rect.bottom - rect.top);
        }
      }

      // Find a line map (mapping character offsets to text nodes) and a
      // measurement cache for the given line number. (A line view might
      // contain multiple lines when collapsed ranges are present.)
      function mapFromLineView(lineView, line, lineN) {
        if (lineView.line == line)
          { return {map: lineView.measure.map, cache: lineView.measure.cache} }
        for (var i = 0; i < lineView.rest.length; i++)
          { if (lineView.rest[i] == line)
            { return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i]} } }
        for (var i$1 = 0; i$1 < lineView.rest.length; i$1++)
          { if (lineNo(lineView.rest[i$1]) > lineN)
            { return {map: lineView.measure.maps[i$1], cache: lineView.measure.caches[i$1], before: true} } }
      }

      // Render a line into the hidden node display.externalMeasured. Used
      // when measurement is needed for a line that's not in the viewport.
      function updateExternalMeasurement(cm, line) {
        line = visualLine(line);
        var lineN = lineNo(line);
        var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
        view.lineN = lineN;
        var built = view.built = buildLineContent(cm, view);
        view.text = built.pre;
        removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
        return view
      }

      // Get a {top, bottom, left, right} box (in line-local coordinates)
      // for a given character.
      function measureChar(cm, line, ch, bias) {
        return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias)
      }

      // Find a line view that corresponds to the given line number.
      function findViewForLine(cm, lineN) {
        if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
          { return cm.display.view[findViewIndex(cm, lineN)] }
        var ext = cm.display.externalMeasured;
        if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
          { return ext }
      }

      // Measurement can be split in two steps, the set-up work that
      // applies to the whole line, and the measurement of the actual
      // character. Functions like coordsChar, that need to do a lot of
      // measurements in a row, can thus ensure that the set-up work is
      // only done once.
      function prepareMeasureForLine(cm, line) {
        var lineN = lineNo(line);
        var view = findViewForLine(cm, lineN);
        if (view && !view.text) {
          view = null;
        } else if (view && view.changes) {
          updateLineForChanges(cm, view, lineN, getDimensions(cm));
          cm.curOp.forceUpdate = true;
        }
        if (!view)
          { view = updateExternalMeasurement(cm, line); }

        var info = mapFromLineView(view, line, lineN);
        return {
          line: line, view: view, rect: null,
          map: info.map, cache: info.cache, before: info.before,
          hasHeights: false
        }
      }

      // Given a prepared measurement object, measures the position of an
      // actual character (or fetches it from the cache).
      function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
        if (prepared.before) { ch = -1; }
        var key = ch + (bias || ""), found;
        if (prepared.cache.hasOwnProperty(key)) {
          found = prepared.cache[key];
        } else {
          if (!prepared.rect)
            { prepared.rect = prepared.view.text.getBoundingClientRect(); }
          if (!prepared.hasHeights) {
            ensureLineHeights(cm, prepared.view, prepared.rect);
            prepared.hasHeights = true;
          }
          found = measureCharInner(cm, prepared, ch, bias);
          if (!found.bogus) { prepared.cache[key] = found; }
        }
        return {left: found.left, right: found.right,
                top: varHeight ? found.rtop : found.top,
                bottom: varHeight ? found.rbottom : found.bottom}
      }

      var nullRect = {left: 0, right: 0, top: 0, bottom: 0};

      function nodeAndOffsetInLineMap(map$$1, ch, bias) {
        var node, start, end, collapse, mStart, mEnd;
        // First, search the line map for the text node corresponding to,
        // or closest to, the target character.
        for (var i = 0; i < map$$1.length; i += 3) {
          mStart = map$$1[i];
          mEnd = map$$1[i + 1];
          if (ch < mStart) {
            start = 0; end = 1;
            collapse = "left";
          } else if (ch < mEnd) {
            start = ch - mStart;
            end = start + 1;
          } else if (i == map$$1.length - 3 || ch == mEnd && map$$1[i + 3] > ch) {
            end = mEnd - mStart;
            start = end - 1;
            if (ch >= mEnd) { collapse = "right"; }
          }
          if (start != null) {
            node = map$$1[i + 2];
            if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
              { collapse = bias; }
            if (bias == "left" && start == 0)
              { while (i && map$$1[i - 2] == map$$1[i - 3] && map$$1[i - 1].insertLeft) {
                node = map$$1[(i -= 3) + 2];
                collapse = "left";
              } }
            if (bias == "right" && start == mEnd - mStart)
              { while (i < map$$1.length - 3 && map$$1[i + 3] == map$$1[i + 4] && !map$$1[i + 5].insertLeft) {
                node = map$$1[(i += 3) + 2];
                collapse = "right";
              } }
            break
          }
        }
        return {node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd}
      }

      function getUsefulRect(rects, bias) {
        var rect = nullRect;
        if (bias == "left") { for (var i = 0; i < rects.length; i++) {
          if ((rect = rects[i]).left != rect.right) { break }
        } } else { for (var i$1 = rects.length - 1; i$1 >= 0; i$1--) {
          if ((rect = rects[i$1]).left != rect.right) { break }
        } }
        return rect
      }

      function measureCharInner(cm, prepared, ch, bias) {
        var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
        var node = place.node, start = place.start, end = place.end, collapse = place.collapse;

        var rect;
        if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
          for (var i$1 = 0; i$1 < 4; i$1++) { // Retry a maximum of 4 times when nonsense rectangles are returned
            while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) { --start; }
            while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) { ++end; }
            if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart)
              { rect = node.parentNode.getBoundingClientRect(); }
            else
              { rect = getUsefulRect(range(node, start, end).getClientRects(), bias); }
            if (rect.left || rect.right || start == 0) { break }
            end = start;
            start = start - 1;
            collapse = "right";
          }
          if (ie && ie_version < 11) { rect = maybeUpdateRectForZooming(cm.display.measure, rect); }
        } else { // If it is a widget, simply get the box for the whole widget.
          if (start > 0) { collapse = bias = "right"; }
          var rects;
          if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
            { rect = rects[bias == "right" ? rects.length - 1 : 0]; }
          else
            { rect = node.getBoundingClientRect(); }
        }
        if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
          var rSpan = node.parentNode.getClientRects()[0];
          if (rSpan)
            { rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom}; }
          else
            { rect = nullRect; }
        }

        var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
        var mid = (rtop + rbot) / 2;
        var heights = prepared.view.measure.heights;
        var i = 0;
        for (; i < heights.length - 1; i++)
          { if (mid < heights[i]) { break } }
        var top = i ? heights[i - 1] : 0, bot = heights[i];
        var result = {left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
                      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
                      top: top, bottom: bot};
        if (!rect.left && !rect.right) { result.bogus = true; }
        if (!cm.options.singleCursorHeightPerLine) { result.rtop = rtop; result.rbottom = rbot; }

        return result
      }

      // Work around problem with bounding client rects on ranges being
      // returned incorrectly when zoomed on IE10 and below.
      function maybeUpdateRectForZooming(measure, rect) {
        if (!window.screen || screen.logicalXDPI == null ||
            screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure))
          { return rect }
        var scaleX = screen.logicalXDPI / screen.deviceXDPI;
        var scaleY = screen.logicalYDPI / screen.deviceYDPI;
        return {left: rect.left * scaleX, right: rect.right * scaleX,
                top: rect.top * scaleY, bottom: rect.bottom * scaleY}
      }

      function clearLineMeasurementCacheFor(lineView) {
        if (lineView.measure) {
          lineView.measure.cache = {};
          lineView.measure.heights = null;
          if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
            { lineView.measure.caches[i] = {}; } }
        }
      }

      function clearLineMeasurementCache(cm) {
        cm.display.externalMeasure = null;
        removeChildren(cm.display.lineMeasure);
        for (var i = 0; i < cm.display.view.length; i++)
          { clearLineMeasurementCacheFor(cm.display.view[i]); }
      }

      function clearCaches(cm) {
        clearLineMeasurementCache(cm);
        cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
        if (!cm.options.lineWrapping) { cm.display.maxLineChanged = true; }
        cm.display.lineNumChars = null;
      }

      function pageScrollX() {
        // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=489206
        // which causes page_Offset and bounding client rects to use
        // different reference viewports and invalidate our calculations.
        if (chrome && android) { return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) }
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
      }
      function pageScrollY() {
        if (chrome && android) { return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) }
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
      }

      function widgetTopHeight(lineObj) {
        var height = 0;
        if (lineObj.widgets) { for (var i = 0; i < lineObj.widgets.length; ++i) { if (lineObj.widgets[i].above)
          { height += widgetHeight(lineObj.widgets[i]); } } }
        return height
      }

      // Converts a {top, bottom, left, right} box from line-local
      // coordinates into another coordinate system. Context may be one of
      // "line", "div" (display.lineDiv), "local"./null (editor), "window",
      // or "page".
      function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
        if (!includeWidgets) {
          var height = widgetTopHeight(lineObj);
          rect.top += height; rect.bottom += height;
        }
        if (context == "line") { return rect }
        if (!context) { context = "local"; }
        var yOff = heightAtLine(lineObj);
        if (context == "local") { yOff += paddingTop(cm.display); }
        else { yOff -= cm.display.viewOffset; }
        if (context == "page" || context == "window") {
          var lOff = cm.display.lineSpace.getBoundingClientRect();
          yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
          var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
          rect.left += xOff; rect.right += xOff;
        }
        rect.top += yOff; rect.bottom += yOff;
        return rect
      }

      // Coverts a box from "div" coords to another coordinate system.
      // Context may be "window", "page", "div", or "local"./null.
      function fromCoordSystem(cm, coords, context) {
        if (context == "div") { return coords }
        var left = coords.left, top = coords.top;
        // First move into "page" coordinate system
        if (context == "page") {
          left -= pageScrollX();
          top -= pageScrollY();
        } else if (context == "local" || !context) {
          var localBox = cm.display.sizer.getBoundingClientRect();
          left += localBox.left;
          top += localBox.top;
        }

        var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
        return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top}
      }

      function charCoords(cm, pos, context, lineObj, bias) {
        if (!lineObj) { lineObj = getLine(cm.doc, pos.line); }
        return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context)
      }

      // Returns a box for a given cursor position, which may have an
      // 'other' property containing the position of the secondary cursor
      // on a bidi boundary.
      // A cursor Pos(line, char, "before") is on the same visual line as `char - 1`
      // and after `char - 1` in writing order of `char - 1`
      // A cursor Pos(line, char, "after") is on the same visual line as `char`
      // and before `char` in writing order of `char`
      // Examples (upper-case letters are RTL, lower-case are LTR):
      //     Pos(0, 1, ...)
      //     before   after
      // ab     a|b     a|b
      // aB     a|B     aB|
      // Ab     |Ab     A|b
      // AB     B|A     B|A
      // Every position after the last character on a line is considered to stick
      // to the last character on the line.
      function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
        lineObj = lineObj || getLine(cm.doc, pos.line);
        if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
        function get(ch, right) {
          var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
          if (right) { m.left = m.right; } else { m.right = m.left; }
          return intoCoordSystem(cm, lineObj, m, context)
        }
        var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
        if (ch >= lineObj.text.length) {
          ch = lineObj.text.length;
          sticky = "before";
        } else if (ch <= 0) {
          ch = 0;
          sticky = "after";
        }
        if (!order) { return get(sticky == "before" ? ch - 1 : ch, sticky == "before") }

        function getBidi(ch, partPos, invert) {
          var part = order[partPos], right = part.level == 1;
          return get(invert ? ch - 1 : ch, right != invert)
        }
        var partPos = getBidiPartAt(order, ch, sticky);
        var other = bidiOther;
        var val = getBidi(ch, partPos, sticky == "before");
        if (other != null) { val.other = getBidi(ch, other, sticky != "before"); }
        return val
      }

      // Used to cheaply estimate the coordinates for a position. Used for
      // intermediate scroll updates.
      function estimateCoords(cm, pos) {
        var left = 0;
        pos = clipPos(cm.doc, pos);
        if (!cm.options.lineWrapping) { left = charWidth(cm.display) * pos.ch; }
        var lineObj = getLine(cm.doc, pos.line);
        var top = heightAtLine(lineObj) + paddingTop(cm.display);
        return {left: left, right: left, top: top, bottom: top + lineObj.height}
      }

      // Positions returned by coordsChar contain some extra information.
      // xRel is the relative x position of the input coordinates compared
      // to the found position (so xRel > 0 means the coordinates are to
      // the right of the character position, for example). When outside
      // is true, that means the coordinates lie outside the line's
      // vertical range.
      function PosWithInfo(line, ch, sticky, outside, xRel) {
        var pos = Pos(line, ch, sticky);
        pos.xRel = xRel;
        if (outside) { pos.outside = outside; }
        return pos
      }

      // Compute the character position closest to the given coordinates.
      // Input must be lineSpace-local ("div" coordinate system).
      function coordsChar(cm, x, y) {
        var doc = cm.doc;
        y += cm.display.viewOffset;
        if (y < 0) { return PosWithInfo(doc.first, 0, null, -1, -1) }
        var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
        if (lineN > last)
          { return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, 1, 1) }
        if (x < 0) { x = 0; }

        var lineObj = getLine(doc, lineN);
        for (;;) {
          var found = coordsCharInner(cm, lineObj, lineN, x, y);
          var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
          if (!collapsed) { return found }
          var rangeEnd = collapsed.find(1);
          if (rangeEnd.line == lineN) { return rangeEnd }
          lineObj = getLine(doc, lineN = rangeEnd.line);
        }
      }

      function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
        y -= widgetTopHeight(lineObj);
        var end = lineObj.text.length;
        var begin = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y; }, end, 0);
        end = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch).top > y; }, begin, end);
        return {begin: begin, end: end}
      }

      function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
        if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
        var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
        return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop)
      }

      // Returns true if the given side of a box is after the given
      // coordinates, in top-to-bottom, left-to-right order.
      function boxIsAfter(box, x, y, left) {
        return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x
      }

      function coordsCharInner(cm, lineObj, lineNo$$1, x, y) {
        // Move y into line-local coordinate space
        y -= heightAtLine(lineObj);
        var preparedMeasure = prepareMeasureForLine(cm, lineObj);
        // When directly calling `measureCharPrepared`, we have to adjust
        // for the widgets at this line.
        var widgetHeight$$1 = widgetTopHeight(lineObj);
        var begin = 0, end = lineObj.text.length, ltr = true;

        var order = getOrder(lineObj, cm.doc.direction);
        // If the line isn't plain left-to-right text, first figure out
        // which bidi section the coordinates fall into.
        if (order) {
          var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)
                       (cm, lineObj, lineNo$$1, preparedMeasure, order, x, y);
          ltr = part.level != 1;
          // The awkward -1 offsets are needed because findFirst (called
          // on these below) will treat its first bound as inclusive,
          // second as exclusive, but we want to actually address the
          // characters in the part's range
          begin = ltr ? part.from : part.to - 1;
          end = ltr ? part.to : part.from - 1;
        }

        // A binary search to find the first character whose bounding box
        // starts after the coordinates. If we run across any whose box wrap
        // the coordinates, store that.
        var chAround = null, boxAround = null;
        var ch = findFirst(function (ch) {
          var box = measureCharPrepared(cm, preparedMeasure, ch);
          box.top += widgetHeight$$1; box.bottom += widgetHeight$$1;
          if (!boxIsAfter(box, x, y, false)) { return false }
          if (box.top <= y && box.left <= x) {
            chAround = ch;
            boxAround = box;
          }
          return true
        }, begin, end);

        var baseX, sticky, outside = false;
        // If a box around the coordinates was found, use that
        if (boxAround) {
          // Distinguish coordinates nearer to the left or right side of the box
          var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
          ch = chAround + (atStart ? 0 : 1);
          sticky = atStart ? "after" : "before";
          baseX = atLeft ? boxAround.left : boxAround.right;
        } else {
          // (Adjust for extended bound, if necessary.)
          if (!ltr && (ch == end || ch == begin)) { ch++; }
          // To determine which side to associate with, get the box to the
          // left of the character and compare it's vertical position to the
          // coordinates
          sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" :
            (measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight$$1 <= y) == ltr ?
            "after" : "before";
          // Now get accurate coordinates for this place, in order to get a
          // base X position
          var coords = cursorCoords(cm, Pos(lineNo$$1, ch, sticky), "line", lineObj, preparedMeasure);
          baseX = coords.left;
          outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
        }

        ch = skipExtendingChars(lineObj.text, ch, 1);
        return PosWithInfo(lineNo$$1, ch, sticky, outside, x - baseX)
      }

      function coordsBidiPart(cm, lineObj, lineNo$$1, preparedMeasure, order, x, y) {
        // Bidi parts are sorted left-to-right, and in a non-line-wrapping
        // situation, we can take this ordering to correspond to the visual
        // ordering. This finds the first part whose end is after the given
        // coordinates.
        var index = findFirst(function (i) {
          var part = order[i], ltr = part.level != 1;
          return boxIsAfter(cursorCoords(cm, Pos(lineNo$$1, ltr ? part.to : part.from, ltr ? "before" : "after"),
                                         "line", lineObj, preparedMeasure), x, y, true)
        }, 0, order.length - 1);
        var part = order[index];
        // If this isn't the first part, the part's start is also after
        // the coordinates, and the coordinates aren't on the same line as
        // that start, move one part back.
        if (index > 0) {
          var ltr = part.level != 1;
          var start = cursorCoords(cm, Pos(lineNo$$1, ltr ? part.from : part.to, ltr ? "after" : "before"),
                                   "line", lineObj, preparedMeasure);
          if (boxIsAfter(start, x, y, true) && start.top > y)
            { part = order[index - 1]; }
        }
        return part
      }

      function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
        // In a wrapped line, rtl text on wrapping boundaries can do things
        // that don't correspond to the ordering in our `order` array at
        // all, so a binary search doesn't work, and we want to return a
        // part that only spans one line so that the binary search in
        // coordsCharInner is safe. As such, we first find the extent of the
        // wrapped line, and then do a flat search in which we discard any
        // spans that aren't on the line.
        var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
        var begin = ref.begin;
        var end = ref.end;
        if (/\s/.test(lineObj.text.charAt(end - 1))) { end--; }
        var part = null, closestDist = null;
        for (var i = 0; i < order.length; i++) {
          var p = order[i];
          if (p.from >= end || p.to <= begin) { continue }
          var ltr = p.level != 1;
          var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
          // Weigh against spans ending before this, so that they are only
          // picked if nothing ends after
          var dist = endX < x ? x - endX + 1e9 : endX - x;
          if (!part || closestDist > dist) {
            part = p;
            closestDist = dist;
          }
        }
        if (!part) { part = order[order.length - 1]; }
        // Clip the part to the wrapped line.
        if (part.from < begin) { part = {from: begin, to: part.to, level: part.level}; }
        if (part.to > end) { part = {from: part.from, to: end, level: part.level}; }
        return part
      }

      var measureText;
      // Compute the default text height.
      function textHeight(display) {
        if (display.cachedTextHeight != null) { return display.cachedTextHeight }
        if (measureText == null) {
          measureText = elt("pre", null, "CodeMirror-line-like");
          // Measure a bunch of lines, for browsers that compute
          // fractional heights.
          for (var i = 0; i < 49; ++i) {
            measureText.appendChild(document.createTextNode("x"));
            measureText.appendChild(elt("br"));
          }
          measureText.appendChild(document.createTextNode("x"));
        }
        removeChildrenAndAdd(display.measure, measureText);
        var height = measureText.offsetHeight / 50;
        if (height > 3) { display.cachedTextHeight = height; }
        removeChildren(display.measure);
        return height || 1
      }

      // Compute the default character width.
      function charWidth(display) {
        if (display.cachedCharWidth != null) { return display.cachedCharWidth }
        var anchor = elt("span", "xxxxxxxxxx");
        var pre = elt("pre", [anchor], "CodeMirror-line-like");
        removeChildrenAndAdd(display.measure, pre);
        var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
        if (width > 2) { display.cachedCharWidth = width; }
        return width || 10
      }

      // Do a bulk-read of the DOM positions and sizes needed to draw the
      // view, so that we don't interleave reading and writing to the DOM.
      function getDimensions(cm) {
        var d = cm.display, left = {}, width = {};
        var gutterLeft = d.gutters.clientLeft;
        for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
          var id = cm.display.gutterSpecs[i].className;
          left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
          width[id] = n.clientWidth;
        }
        return {fixedPos: compensateForHScroll(d),
                gutterTotalWidth: d.gutters.offsetWidth,
                gutterLeft: left,
                gutterWidth: width,
                wrapperWidth: d.wrapper.clientWidth}
      }

      // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
      // but using getBoundingClientRect to get a sub-pixel-accurate
      // result.
      function compensateForHScroll(display) {
        return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left
      }

      // Returns a function that estimates the height of a line, to use as
      // first approximation until the line becomes visible (and is thus
      // properly measurable).
      function estimateHeight(cm) {
        var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
        var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
        return function (line) {
          if (lineIsHidden(cm.doc, line)) { return 0 }

          var widgetsHeight = 0;
          if (line.widgets) { for (var i = 0; i < line.widgets.length; i++) {
            if (line.widgets[i].height) { widgetsHeight += line.widgets[i].height; }
          } }

          if (wrapping)
            { return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th }
          else
            { return widgetsHeight + th }
        }
      }

      function estimateLineHeights(cm) {
        var doc = cm.doc, est = estimateHeight(cm);
        doc.iter(function (line) {
          var estHeight = est(line);
          if (estHeight != line.height) { updateLineHeight(line, estHeight); }
        });
      }

      // Given a mouse event, find the corresponding position. If liberal
      // is false, it checks whether a gutter or scrollbar was clicked,
      // and returns null if it was. forRect is used by rectangular
      // selections, and tries to estimate a character position even for
      // coordinates beyond the right of the text.
      function posFromMouse(cm, e, liberal, forRect) {
        var display = cm.display;
        if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") { return null }

        var x, y, space = display.lineSpace.getBoundingClientRect();
        // Fails unpredictably on IE[67] when mouse is dragged around quickly.
        try { x = e.clientX - space.left; y = e.clientY - space.top; }
        catch (e) { return null }
        var coords = coordsChar(cm, x, y), line;
        if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
          var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
          coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
        }
        return coords
      }

      // Find the view element corresponding to a given line. Return null
      // when the line isn't visible.
      function findViewIndex(cm, n) {
        if (n >= cm.display.viewTo) { return null }
        n -= cm.display.viewFrom;
        if (n < 0) { return null }
        var view = cm.display.view;
        for (var i = 0; i < view.length; i++) {
          n -= view[i].size;
          if (n < 0) { return i }
        }
      }

      // Updates the display.view data structure for a given change to the
      // document. From and to are in pre-change coordinates. Lendiff is
      // the amount of lines added or subtracted by the change. This is
      // used for changes that span multiple lines, or change the way
      // lines are divided into visual lines. regLineChange (below)
      // registers single-line changes.
      function regChange(cm, from, to, lendiff) {
        if (from == null) { from = cm.doc.first; }
        if (to == null) { to = cm.doc.first + cm.doc.size; }
        if (!lendiff) { lendiff = 0; }

        var display = cm.display;
        if (lendiff && to < display.viewTo &&
            (display.updateLineNumbers == null || display.updateLineNumbers > from))
          { display.updateLineNumbers = from; }

        cm.curOp.viewChanged = true;

        if (from >= display.viewTo) { // Change after
          if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
            { resetView(cm); }
        } else if (to <= display.viewFrom) { // Change before
          if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
            resetView(cm);
          } else {
            display.viewFrom += lendiff;
            display.viewTo += lendiff;
          }
        } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
          resetView(cm);
        } else if (from <= display.viewFrom) { // Top overlap
          var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cut) {
            display.view = display.view.slice(cut.index);
            display.viewFrom = cut.lineN;
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        } else if (to >= display.viewTo) { // Bottom overlap
          var cut$1 = viewCuttingPoint(cm, from, from, -1);
          if (cut$1) {
            display.view = display.view.slice(0, cut$1.index);
            display.viewTo = cut$1.lineN;
          } else {
            resetView(cm);
          }
        } else { // Gap in the middle
          var cutTop = viewCuttingPoint(cm, from, from, -1);
          var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cutTop && cutBot) {
            display.view = display.view.slice(0, cutTop.index)
              .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
              .concat(display.view.slice(cutBot.index));
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        }

        var ext = display.externalMeasured;
        if (ext) {
          if (to < ext.lineN)
            { ext.lineN += lendiff; }
          else if (from < ext.lineN + ext.size)
            { display.externalMeasured = null; }
        }
      }

      // Register a change to a single line. Type must be one of "text",
      // "gutter", "class", "widget"
      function regLineChange(cm, line, type) {
        cm.curOp.viewChanged = true;
        var display = cm.display, ext = cm.display.externalMeasured;
        if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
          { display.externalMeasured = null; }

        if (line < display.viewFrom || line >= display.viewTo) { return }
        var lineView = display.view[findViewIndex(cm, line)];
        if (lineView.node == null) { return }
        var arr = lineView.changes || (lineView.changes = []);
        if (indexOf(arr, type) == -1) { arr.push(type); }
      }

      // Clear the view.
      function resetView(cm) {
        cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
        cm.display.view = [];
        cm.display.viewOffset = 0;
      }

      function viewCuttingPoint(cm, oldN, newN, dir) {
        var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
        if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
          { return {index: index, lineN: newN} }
        var n = cm.display.viewFrom;
        for (var i = 0; i < index; i++)
          { n += view[i].size; }
        if (n != oldN) {
          if (dir > 0) {
            if (index == view.length - 1) { return null }
            diff = (n + view[index].size) - oldN;
            index++;
          } else {
            diff = n - oldN;
          }
          oldN += diff; newN += diff;
        }
        while (visualLineNo(cm.doc, newN) != newN) {
          if (index == (dir < 0 ? 0 : view.length - 1)) { return null }
          newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
          index += dir;
        }
        return {index: index, lineN: newN}
      }

      // Force the view to cover a given range, adding empty view element
      // or clipping off existing ones as needed.
      function adjustView(cm, from, to) {
        var display = cm.display, view = display.view;
        if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
          display.view = buildViewArray(cm, from, to);
          display.viewFrom = from;
        } else {
          if (display.viewFrom > from)
            { display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view); }
          else if (display.viewFrom < from)
            { display.view = display.view.slice(findViewIndex(cm, from)); }
          display.viewFrom = from;
          if (display.viewTo < to)
            { display.view = display.view.concat(buildViewArray(cm, display.viewTo, to)); }
          else if (display.viewTo > to)
            { display.view = display.view.slice(0, findViewIndex(cm, to)); }
        }
        display.viewTo = to;
      }

      // Count the number of lines in the view whose DOM representation is
      // out of date (or nonexistent).
      function countDirtyView(cm) {
        var view = cm.display.view, dirty = 0;
        for (var i = 0; i < view.length; i++) {
          var lineView = view[i];
          if (!lineView.hidden && (!lineView.node || lineView.changes)) { ++dirty; }
        }
        return dirty
      }

      function updateSelection(cm) {
        cm.display.input.showSelection(cm.display.input.prepareSelection());
      }

      function prepareSelection(cm, primary) {
        if ( primary === void 0 ) primary = true;

        var doc = cm.doc, result = {};
        var curFragment = result.cursors = document.createDocumentFragment();
        var selFragment = result.selection = document.createDocumentFragment();

        for (var i = 0; i < doc.sel.ranges.length; i++) {
          if (!primary && i == doc.sel.primIndex) { continue }
          var range$$1 = doc.sel.ranges[i];
          if (range$$1.from().line >= cm.display.viewTo || range$$1.to().line < cm.display.viewFrom) { continue }
          var collapsed = range$$1.empty();
          if (collapsed || cm.options.showCursorWhenSelecting)
            { drawSelectionCursor(cm, range$$1.head, curFragment); }
          if (!collapsed)
            { drawSelectionRange(cm, range$$1, selFragment); }
        }
        return result
      }

      // Draws a cursor for the given range
      function drawSelectionCursor(cm, head, output) {
        var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

        var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
        cursor.style.left = pos.left + "px";
        cursor.style.top = pos.top + "px";
        cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

        if (pos.other) {
          // Secondary cursor, shown when on a 'jump' in bi-directional text
          var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          otherCursor.style.display = "";
          otherCursor.style.left = pos.other.left + "px";
          otherCursor.style.top = pos.other.top + "px";
          otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
        }
      }

      function cmpCoords(a, b) { return a.top - b.top || a.left - b.left }

      // Draws the given range as a highlighted selection
      function drawSelectionRange(cm, range$$1, output) {
        var display = cm.display, doc = cm.doc;
        var fragment = document.createDocumentFragment();
        var padding = paddingH(cm.display), leftSide = padding.left;
        var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
        var docLTR = doc.direction == "ltr";

        function add(left, top, width, bottom) {
          if (top < 0) { top = 0; }
          top = Math.round(top);
          bottom = Math.round(bottom);
          fragment.appendChild(elt("div", null, "CodeMirror-selected", ("position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px")));
        }

        function drawForLine(line, fromArg, toArg) {
          var lineObj = getLine(doc, line);
          var lineLen = lineObj.text.length;
          var start, end;
          function coords(ch, bias) {
            return charCoords(cm, Pos(line, ch), "div", lineObj, bias)
          }

          function wrapX(pos, dir, side) {
            var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
            var prop = (dir == "ltr") == (side == "after") ? "left" : "right";
            var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
            return coords(ch, prop)[prop]
          }

          var order = getOrder(lineObj, doc.direction);
          iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir, i) {
            var ltr = dir == "ltr";
            var fromPos = coords(from, ltr ? "left" : "right");
            var toPos = coords(to - 1, ltr ? "right" : "left");

            var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
            var first = i == 0, last = !order || i == order.length - 1;
            if (toPos.top - fromPos.top <= 3) { // Single line
              var openLeft = (docLTR ? openStart : openEnd) && first;
              var openRight = (docLTR ? openEnd : openStart) && last;
              var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
              var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
              add(left, fromPos.top, right - left, fromPos.bottom);
            } else { // Multiple lines
              var topLeft, topRight, botLeft, botRight;
              if (ltr) {
                topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
                topRight = docLTR ? rightSide : wrapX(from, dir, "before");
                botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
                botRight = docLTR && openEnd && last ? rightSide : toPos.right;
              } else {
                topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
                topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
                botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
                botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
              }
              add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
              if (fromPos.bottom < toPos.top) { add(leftSide, fromPos.bottom, null, toPos.top); }
              add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
            }

            if (!start || cmpCoords(fromPos, start) < 0) { start = fromPos; }
            if (cmpCoords(toPos, start) < 0) { start = toPos; }
            if (!end || cmpCoords(fromPos, end) < 0) { end = fromPos; }
            if (cmpCoords(toPos, end) < 0) { end = toPos; }
          });
          return {start: start, end: end}
        }

        var sFrom = range$$1.from(), sTo = range$$1.to();
        if (sFrom.line == sTo.line) {
          drawForLine(sFrom.line, sFrom.ch, sTo.ch);
        } else {
          var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
          var singleVLine = visualLine(fromLine) == visualLine(toLine);
          var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
          var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
          if (singleVLine) {
            if (leftEnd.top < rightStart.top - 2) {
              add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
              add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
            } else {
              add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
            }
          }
          if (leftEnd.bottom < rightStart.top)
            { add(leftSide, leftEnd.bottom, null, rightStart.top); }
        }

        output.appendChild(fragment);
      }

      // Cursor-blinking
      function restartBlink(cm) {
        if (!cm.state.focused) { return }
        var display = cm.display;
        clearInterval(display.blinker);
        var on = true;
        display.cursorDiv.style.visibility = "";
        if (cm.options.cursorBlinkRate > 0)
          { display.blinker = setInterval(function () { return display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden"; },
            cm.options.cursorBlinkRate); }
        else if (cm.options.cursorBlinkRate < 0)
          { display.cursorDiv.style.visibility = "hidden"; }
      }

      function ensureFocus(cm) {
        if (!cm.state.focused) { cm.display.input.focus(); onFocus(cm); }
      }

      function delayBlurEvent(cm) {
        cm.state.delayingBlurEvent = true;
        setTimeout(function () { if (cm.state.delayingBlurEvent) {
          cm.state.delayingBlurEvent = false;
          onBlur(cm);
        } }, 100);
      }

      function onFocus(cm, e) {
        if (cm.state.delayingBlurEvent) { cm.state.delayingBlurEvent = false; }

        if (cm.options.readOnly == "nocursor") { return }
        if (!cm.state.focused) {
          signal(cm, "focus", cm, e);
          cm.state.focused = true;
          addClass(cm.display.wrapper, "CodeMirror-focused");
          // This test prevents this from firing when a context
          // menu is closed (since the input reset would kill the
          // select-all detection hack)
          if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
            cm.display.input.reset();
            if (webkit) { setTimeout(function () { return cm.display.input.reset(true); }, 20); } // Issue #1730
          }
          cm.display.input.receivedFocus();
        }
        restartBlink(cm);
      }
      function onBlur(cm, e) {
        if (cm.state.delayingBlurEvent) { return }

        if (cm.state.focused) {
          signal(cm, "blur", cm, e);
          cm.state.focused = false;
          rmClass(cm.display.wrapper, "CodeMirror-focused");
        }
        clearInterval(cm.display.blinker);
        setTimeout(function () { if (!cm.state.focused) { cm.display.shift = false; } }, 150);
      }

      // Read the actual heights of the rendered lines, and update their
      // stored heights to match.
      function updateHeightsInViewport(cm) {
        var display = cm.display;
        var prevBottom = display.lineDiv.offsetTop;
        for (var i = 0; i < display.view.length; i++) {
          var cur = display.view[i], wrapping = cm.options.lineWrapping;
          var height = (void 0), width = 0;
          if (cur.hidden) { continue }
          if (ie && ie_version < 8) {
            var bot = cur.node.offsetTop + cur.node.offsetHeight;
            height = bot - prevBottom;
            prevBottom = bot;
          } else {
            var box = cur.node.getBoundingClientRect();
            height = box.bottom - box.top;
            // Check that lines don't extend past the right of the current
            // editor width
            if (!wrapping && cur.text.firstChild)
              { width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1; }
          }
          var diff = cur.line.height - height;
          if (diff > .005 || diff < -.005) {
            updateLineHeight(cur.line, height);
            updateWidgetHeight(cur.line);
            if (cur.rest) { for (var j = 0; j < cur.rest.length; j++)
              { updateWidgetHeight(cur.rest[j]); } }
          }
          if (width > cm.display.sizerWidth) {
            var chWidth = Math.ceil(width / charWidth(cm.display));
            if (chWidth > cm.display.maxLineLength) {
              cm.display.maxLineLength = chWidth;
              cm.display.maxLine = cur.line;
              cm.display.maxLineChanged = true;
            }
          }
        }
      }

      // Read and store the height of line widgets associated with the
      // given line.
      function updateWidgetHeight(line) {
        if (line.widgets) { for (var i = 0; i < line.widgets.length; ++i) {
          var w = line.widgets[i], parent = w.node.parentNode;
          if (parent) { w.height = parent.offsetHeight; }
        } }
      }

      // Compute the lines that are visible in a given viewport (defaults
      // the the current scroll position). viewport may contain top,
      // height, and ensure (see op.scrollToPos) properties.
      function visibleLines(display, doc, viewport) {
        var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
        top = Math.floor(top - paddingTop(display));
        var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

        var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
        // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
        // forces those lines into the viewport (if possible).
        if (viewport && viewport.ensure) {
          var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
          if (ensureFrom < from) {
            from = ensureFrom;
            to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
          } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
            from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
            to = ensureTo;
          }
        }
        return {from: from, to: Math.max(to, from + 1)}
      }

      // SCROLLING THINGS INTO VIEW

      // If an editor sits on the top or bottom of the window, partially
      // scrolled out of view, this ensures that the cursor is visible.
      function maybeScrollWindow(cm, rect) {
        if (signalDOMEvent(cm, "scrollCursorIntoView")) { return }

        var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
        if (rect.top + box.top < 0) { doScroll = true; }
        else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) { doScroll = false; }
        if (doScroll != null && !phantom) {
          var scrollNode = elt("div", "\u200b", null, ("position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + (rect.left) + "px; width: " + (Math.max(2, rect.right - rect.left)) + "px;"));
          cm.display.lineSpace.appendChild(scrollNode);
          scrollNode.scrollIntoView(doScroll);
          cm.display.lineSpace.removeChild(scrollNode);
        }
      }

      // Scroll a given position into view (immediately), verifying that
      // it actually became visible (as line heights are accurately
      // measured, the position of something may 'drift' during drawing).
      function scrollPosIntoView(cm, pos, end, margin) {
        if (margin == null) { margin = 0; }
        var rect;
        if (!cm.options.lineWrapping && pos == end) {
          // Set pos and end to the cursor positions around the character pos sticks to
          // If pos.sticky == "before", that is around pos.ch - 1, otherwise around pos.ch
          // If pos == Pos(_, 0, "before"), pos and end are unchanged
          pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
          end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
        }
        for (var limit = 0; limit < 5; limit++) {
          var changed = false;
          var coords = cursorCoords(cm, pos);
          var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
          rect = {left: Math.min(coords.left, endCoords.left),
                  top: Math.min(coords.top, endCoords.top) - margin,
                  right: Math.max(coords.left, endCoords.left),
                  bottom: Math.max(coords.bottom, endCoords.bottom) + margin};
          var scrollPos = calculateScrollPos(cm, rect);
          var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
          if (scrollPos.scrollTop != null) {
            updateScrollTop(cm, scrollPos.scrollTop);
            if (Math.abs(cm.doc.scrollTop - startTop) > 1) { changed = true; }
          }
          if (scrollPos.scrollLeft != null) {
            setScrollLeft(cm, scrollPos.scrollLeft);
            if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) { changed = true; }
          }
          if (!changed) { break }
        }
        return rect
      }

      // Scroll a given set of coordinates into view (immediately).
      function scrollIntoView(cm, rect) {
        var scrollPos = calculateScrollPos(cm, rect);
        if (scrollPos.scrollTop != null) { updateScrollTop(cm, scrollPos.scrollTop); }
        if (scrollPos.scrollLeft != null) { setScrollLeft(cm, scrollPos.scrollLeft); }
      }

      // Calculate a new scroll position needed to scroll the given
      // rectangle into view. Returns an object with scrollTop and
      // scrollLeft properties. When these are undefined, the
      // vertical/horizontal position does not need to be adjusted.
      function calculateScrollPos(cm, rect) {
        var display = cm.display, snapMargin = textHeight(cm.display);
        if (rect.top < 0) { rect.top = 0; }
        var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
        var screen = displayHeight(cm), result = {};
        if (rect.bottom - rect.top > screen) { rect.bottom = rect.top + screen; }
        var docBottom = cm.doc.height + paddingVert(display);
        var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
        if (rect.top < screentop) {
          result.scrollTop = atTop ? 0 : rect.top;
        } else if (rect.bottom > screentop + screen) {
          var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen);
          if (newTop != screentop) { result.scrollTop = newTop; }
        }

        var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
        var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
        var tooWide = rect.right - rect.left > screenw;
        if (tooWide) { rect.right = rect.left + screenw; }
        if (rect.left < 10)
          { result.scrollLeft = 0; }
        else if (rect.left < screenleft)
          { result.scrollLeft = Math.max(0, rect.left - (tooWide ? 0 : 10)); }
        else if (rect.right > screenw + screenleft - 3)
          { result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw; }
        return result
      }

      // Store a relative adjustment to the scroll position in the current
      // operation (to be applied when the operation finishes).
      function addToScrollTop(cm, top) {
        if (top == null) { return }
        resolveScrollToPos(cm);
        cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
      }

      // Make sure that at the end of the operation the current cursor is
      // shown.
      function ensureCursorVisible(cm) {
        resolveScrollToPos(cm);
        var cur = cm.getCursor();
        cm.curOp.scrollToPos = {from: cur, to: cur, margin: cm.options.cursorScrollMargin};
      }

      function scrollToCoords(cm, x, y) {
        if (x != null || y != null) { resolveScrollToPos(cm); }
        if (x != null) { cm.curOp.scrollLeft = x; }
        if (y != null) { cm.curOp.scrollTop = y; }
      }

      function scrollToRange(cm, range$$1) {
        resolveScrollToPos(cm);
        cm.curOp.scrollToPos = range$$1;
      }

      // When an operation has its scrollToPos property set, and another
      // scroll action is applied before the end of the operation, this
      // 'simulates' scrolling that position into view in a cheap way, so
      // that the effect of intermediate scroll commands is not ignored.
      function resolveScrollToPos(cm) {
        var range$$1 = cm.curOp.scrollToPos;
        if (range$$1) {
          cm.curOp.scrollToPos = null;
          var from = estimateCoords(cm, range$$1.from), to = estimateCoords(cm, range$$1.to);
          scrollToCoordsRange(cm, from, to, range$$1.margin);
        }
      }

      function scrollToCoordsRange(cm, from, to, margin) {
        var sPos = calculateScrollPos(cm, {
          left: Math.min(from.left, to.left),
          top: Math.min(from.top, to.top) - margin,
          right: Math.max(from.right, to.right),
          bottom: Math.max(from.bottom, to.bottom) + margin
        });
        scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
      }

      // Sync the scrollable area and scrollbars, ensure the viewport
      // covers the visible area.
      function updateScrollTop(cm, val) {
        if (Math.abs(cm.doc.scrollTop - val) < 2) { return }
        if (!gecko) { updateDisplaySimple(cm, {top: val}); }
        setScrollTop(cm, val, true);
        if (gecko) { updateDisplaySimple(cm); }
        startWorker(cm, 100);
      }

      function setScrollTop(cm, val, forceScroll) {
        val = Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val);
        if (cm.display.scroller.scrollTop == val && !forceScroll) { return }
        cm.doc.scrollTop = val;
        cm.display.scrollbars.setScrollTop(val);
        if (cm.display.scroller.scrollTop != val) { cm.display.scroller.scrollTop = val; }
      }

      // Sync scroller and scrollbar, ensure the gutter elements are
      // aligned.
      function setScrollLeft(cm, val, isScroller, forceScroll) {
        val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
        if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) { return }
        cm.doc.scrollLeft = val;
        alignHorizontally(cm);
        if (cm.display.scroller.scrollLeft != val) { cm.display.scroller.scrollLeft = val; }
        cm.display.scrollbars.setScrollLeft(val);
      }

      // SCROLLBARS

      // Prepare DOM reads needed to update the scrollbars. Done in one
      // shot to minimize update/measure roundtrips.
      function measureForScrollbars(cm) {
        var d = cm.display, gutterW = d.gutters.offsetWidth;
        var docH = Math.round(cm.doc.height + paddingVert(cm.display));
        return {
          clientHeight: d.scroller.clientHeight,
          viewHeight: d.wrapper.clientHeight,
          scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
          viewWidth: d.wrapper.clientWidth,
          barLeft: cm.options.fixedGutter ? gutterW : 0,
          docHeight: docH,
          scrollHeight: docH + scrollGap(cm) + d.barHeight,
          nativeBarWidth: d.nativeBarWidth,
          gutterWidth: gutterW
        }
      }

      var NativeScrollbars = function(place, scroll, cm) {
        this.cm = cm;
        var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        vert.tabIndex = horiz.tabIndex = -1;
        place(vert); place(horiz);

        on(vert, "scroll", function () {
          if (vert.clientHeight) { scroll(vert.scrollTop, "vertical"); }
        });
        on(horiz, "scroll", function () {
          if (horiz.clientWidth) { scroll(horiz.scrollLeft, "horizontal"); }
        });

        this.checkedZeroWidth = false;
        // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
        if (ie && ie_version < 8) { this.horiz.style.minHeight = this.vert.style.minWidth = "18px"; }
      };

      NativeScrollbars.prototype.update = function (measure) {
        var needsH = measure.scrollWidth > measure.clientWidth + 1;
        var needsV = measure.scrollHeight > measure.clientHeight + 1;
        var sWidth = measure.nativeBarWidth;

        if (needsV) {
          this.vert.style.display = "block";
          this.vert.style.bottom = needsH ? sWidth + "px" : "0";
          var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
          // A bug in IE8 can cause this value to be negative, so guard it.
          this.vert.firstChild.style.height =
            Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
        } else {
          this.vert.style.display = "";
          this.vert.firstChild.style.height = "0";
        }

        if (needsH) {
          this.horiz.style.display = "block";
          this.horiz.style.right = needsV ? sWidth + "px" : "0";
          this.horiz.style.left = measure.barLeft + "px";
          var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
          this.horiz.firstChild.style.width =
            Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
        } else {
          this.horiz.style.display = "";
          this.horiz.firstChild.style.width = "0";
        }

        if (!this.checkedZeroWidth && measure.clientHeight > 0) {
          if (sWidth == 0) { this.zeroWidthHack(); }
          this.checkedZeroWidth = true;
        }

        return {right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0}
      };

      NativeScrollbars.prototype.setScrollLeft = function (pos) {
        if (this.horiz.scrollLeft != pos) { this.horiz.scrollLeft = pos; }
        if (this.disableHoriz) { this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz"); }
      };

      NativeScrollbars.prototype.setScrollTop = function (pos) {
        if (this.vert.scrollTop != pos) { this.vert.scrollTop = pos; }
        if (this.disableVert) { this.enableZeroWidthBar(this.vert, this.disableVert, "vert"); }
      };

      NativeScrollbars.prototype.zeroWidthHack = function () {
        var w = mac && !mac_geMountainLion ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = w;
        this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
        this.disableHoriz = new Delayed;
        this.disableVert = new Delayed;
      };

      NativeScrollbars.prototype.enableZeroWidthBar = function (bar, delay, type) {
        bar.style.pointerEvents = "auto";
        function maybeDisable() {
          // To find out whether the scrollbar is still visible, we
          // check whether the element under the pixel in the bottom
          // right corner of the scrollbar box is the scrollbar box
          // itself (when the bar is still visible) or its filler child
          // (when the bar is hidden). If it is still visible, we keep
          // it enabled, if it's hidden, we disable pointer events.
          var box = bar.getBoundingClientRect();
          var elt$$1 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2)
              : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
          if (elt$$1 != bar) { bar.style.pointerEvents = "none"; }
          else { delay.set(1000, maybeDisable); }
        }
        delay.set(1000, maybeDisable);
      };

      NativeScrollbars.prototype.clear = function () {
        var parent = this.horiz.parentNode;
        parent.removeChild(this.horiz);
        parent.removeChild(this.vert);
      };

      var NullScrollbars = function () {};

      NullScrollbars.prototype.update = function () { return {bottom: 0, right: 0} };
      NullScrollbars.prototype.setScrollLeft = function () {};
      NullScrollbars.prototype.setScrollTop = function () {};
      NullScrollbars.prototype.clear = function () {};

      function updateScrollbars(cm, measure) {
        if (!measure) { measure = measureForScrollbars(cm); }
        var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
        updateScrollbarsInner(cm, measure);
        for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
          if (startWidth != cm.display.barWidth && cm.options.lineWrapping)
            { updateHeightsInViewport(cm); }
          updateScrollbarsInner(cm, measureForScrollbars(cm));
          startWidth = cm.display.barWidth; startHeight = cm.display.barHeight;
        }
      }

      // Re-synchronize the fake scrollbars with the actual size of the
      // content.
      function updateScrollbarsInner(cm, measure) {
        var d = cm.display;
        var sizes = d.scrollbars.update(measure);

        d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
        d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
        d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";

        if (sizes.right && sizes.bottom) {
          d.scrollbarFiller.style.display = "block";
          d.scrollbarFiller.style.height = sizes.bottom + "px";
          d.scrollbarFiller.style.width = sizes.right + "px";
        } else { d.scrollbarFiller.style.display = ""; }
        if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
          d.gutterFiller.style.display = "block";
          d.gutterFiller.style.height = sizes.bottom + "px";
          d.gutterFiller.style.width = measure.gutterWidth + "px";
        } else { d.gutterFiller.style.display = ""; }
      }

      var scrollbarModel = {"native": NativeScrollbars, "null": NullScrollbars};

      function initScrollbars(cm) {
        if (cm.display.scrollbars) {
          cm.display.scrollbars.clear();
          if (cm.display.scrollbars.addClass)
            { rmClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
        }

        cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function (node) {
          cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
          // Prevent clicks in the scrollbars from killing focus
          on(node, "mousedown", function () {
            if (cm.state.focused) { setTimeout(function () { return cm.display.input.focus(); }, 0); }
          });
          node.setAttribute("cm-not-content", "true");
        }, function (pos, axis) {
          if (axis == "horizontal") { setScrollLeft(cm, pos); }
          else { updateScrollTop(cm, pos); }
        }, cm);
        if (cm.display.scrollbars.addClass)
          { addClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
      }

      // Operations are used to wrap a series of changes to the editor
      // state in such a way that each change won't have to update the
      // cursor and display (which would be awkward, slow, and
      // error-prone). Instead, display updates are batched and then all
      // combined and executed at once.

      var nextOpId = 0;
      // Start a new operation.
      function startOperation(cm) {
        cm.curOp = {
          cm: cm,
          viewChanged: false,      // Flag that indicates that lines might need to be redrawn
          startHeight: cm.doc.height, // Used to detect need to update scrollbar
          forceUpdate: false,      // Used to force a redraw
          updateInput: 0,       // Whether to reset the input textarea
          typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
          changeObjs: null,        // Accumulated changes, for firing change events
          cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
          cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
          selectionChanged: false, // Whether the selection needs to be redrawn
          updateMaxLine: false,    // Set when the widest line needs to be determined anew
          scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
          scrollToPos: null,       // Used to scroll to a specific position
          focus: false,
          id: ++nextOpId           // Unique ID
        };
        pushOperation(cm.curOp);
      }

      // Finish an operation, updating the display and signalling delayed events
      function endOperation(cm) {
        var op = cm.curOp;
        if (op) { finishOperation(op, function (group) {
          for (var i = 0; i < group.ops.length; i++)
            { group.ops[i].cm.curOp = null; }
          endOperations(group);
        }); }
      }

      // The DOM updates done when an operation finishes are batched so
      // that the minimum number of relayouts are required.
      function endOperations(group) {
        var ops = group.ops;
        for (var i = 0; i < ops.length; i++) // Read DOM
          { endOperation_R1(ops[i]); }
        for (var i$1 = 0; i$1 < ops.length; i$1++) // Write DOM (maybe)
          { endOperation_W1(ops[i$1]); }
        for (var i$2 = 0; i$2 < ops.length; i$2++) // Read DOM
          { endOperation_R2(ops[i$2]); }
        for (var i$3 = 0; i$3 < ops.length; i$3++) // Write DOM (maybe)
          { endOperation_W2(ops[i$3]); }
        for (var i$4 = 0; i$4 < ops.length; i$4++) // Read DOM
          { endOperation_finish(ops[i$4]); }
      }

      function endOperation_R1(op) {
        var cm = op.cm, display = cm.display;
        maybeClipScrollbars(cm);
        if (op.updateMaxLine) { findMaxLine(cm); }

        op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null ||
          op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
                             op.scrollToPos.to.line >= display.viewTo) ||
          display.maxLineChanged && cm.options.lineWrapping;
        op.update = op.mustUpdate &&
          new DisplayUpdate(cm, op.mustUpdate && {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
      }

      function endOperation_W1(op) {
        op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
      }

      function endOperation_R2(op) {
        var cm = op.cm, display = cm.display;
        if (op.updatedDisplay) { updateHeightsInViewport(cm); }

        op.barMeasure = measureForScrollbars(cm);

        // If the max line changed since it was last measured, measure it,
        // and ensure the document's width matches it.
        // updateDisplay_W2 will use these properties to do the actual resizing
        if (display.maxLineChanged && !cm.options.lineWrapping) {
          op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
          cm.display.sizerWidth = op.adjustWidthTo;
          op.barMeasure.scrollWidth =
            Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
          op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
        }

        if (op.updatedDisplay || op.selectionChanged)
          { op.preparedSelection = display.input.prepareSelection(); }
      }

      function endOperation_W2(op) {
        var cm = op.cm;

        if (op.adjustWidthTo != null) {
          cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
          if (op.maxScrollLeft < cm.doc.scrollLeft)
            { setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true); }
          cm.display.maxLineChanged = false;
        }

        var takeFocus = op.focus && op.focus == activeElt();
        if (op.preparedSelection)
          { cm.display.input.showSelection(op.preparedSelection, takeFocus); }
        if (op.updatedDisplay || op.startHeight != cm.doc.height)
          { updateScrollbars(cm, op.barMeasure); }
        if (op.updatedDisplay)
          { setDocumentHeight(cm, op.barMeasure); }

        if (op.selectionChanged) { restartBlink(cm); }

        if (cm.state.focused && op.updateInput)
          { cm.display.input.reset(op.typing); }
        if (takeFocus) { ensureFocus(op.cm); }
      }

      function endOperation_finish(op) {
        var cm = op.cm, display = cm.display, doc = cm.doc;

        if (op.updatedDisplay) { postUpdateDisplay(cm, op.update); }

        // Abort mouse wheel delta measurement, when scrolling explicitly
        if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
          { display.wheelStartX = display.wheelStartY = null; }

        // Propagate the scroll position to the actual DOM scroller
        if (op.scrollTop != null) { setScrollTop(cm, op.scrollTop, op.forceScroll); }

        if (op.scrollLeft != null) { setScrollLeft(cm, op.scrollLeft, true, true); }
        // If we need to scroll a specific position into view, do so.
        if (op.scrollToPos) {
          var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from),
                                       clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
          maybeScrollWindow(cm, rect);
        }

        // Fire events for markers that are hidden/unidden by editing or
        // undoing
        var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
        if (hidden) { for (var i = 0; i < hidden.length; ++i)
          { if (!hidden[i].lines.length) { signal(hidden[i], "hide"); } } }
        if (unhidden) { for (var i$1 = 0; i$1 < unhidden.length; ++i$1)
          { if (unhidden[i$1].lines.length) { signal(unhidden[i$1], "unhide"); } } }

        if (display.wrapper.offsetHeight)
          { doc.scrollTop = cm.display.scroller.scrollTop; }

        // Fire change events, and delayed event handlers
        if (op.changeObjs)
          { signal(cm, "changes", cm, op.changeObjs); }
        if (op.update)
          { op.update.finish(); }
      }

      // Run the given function in an operation
      function runInOp(cm, f) {
        if (cm.curOp) { return f() }
        startOperation(cm);
        try { return f() }
        finally { endOperation(cm); }
      }
      // Wraps a function in an operation. Returns the wrapped function.
      function operation(cm, f) {
        return function() {
          if (cm.curOp) { return f.apply(cm, arguments) }
          startOperation(cm);
          try { return f.apply(cm, arguments) }
          finally { endOperation(cm); }
        }
      }
      // Used to add methods to editor and doc instances, wrapping them in
      // operations.
      function methodOp(f) {
        return function() {
          if (this.curOp) { return f.apply(this, arguments) }
          startOperation(this);
          try { return f.apply(this, arguments) }
          finally { endOperation(this); }
        }
      }
      function docMethodOp(f) {
        return function() {
          var cm = this.cm;
          if (!cm || cm.curOp) { return f.apply(this, arguments) }
          startOperation(cm);
          try { return f.apply(this, arguments) }
          finally { endOperation(cm); }
        }
      }

      // HIGHLIGHT WORKER

      function startWorker(cm, time) {
        if (cm.doc.highlightFrontier < cm.display.viewTo)
          { cm.state.highlight.set(time, bind(highlightWorker, cm)); }
      }

      function highlightWorker(cm) {
        var doc = cm.doc;
        if (doc.highlightFrontier >= cm.display.viewTo) { return }
        var end = +new Date + cm.options.workTime;
        var context = getContextBefore(cm, doc.highlightFrontier);
        var changedLines = [];

        doc.iter(context.line, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
          if (context.line >= cm.display.viewFrom) { // Visible
            var oldStyles = line.styles;
            var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
            var highlighted = highlightLine(cm, line, context, true);
            if (resetState) { context.state = resetState; }
            line.styles = highlighted.styles;
            var oldCls = line.styleClasses, newCls = highlighted.classes;
            if (newCls) { line.styleClasses = newCls; }
            else if (oldCls) { line.styleClasses = null; }
            var ischange = !oldStyles || oldStyles.length != line.styles.length ||
              oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
            for (var i = 0; !ischange && i < oldStyles.length; ++i) { ischange = oldStyles[i] != line.styles[i]; }
            if (ischange) { changedLines.push(context.line); }
            line.stateAfter = context.save();
            context.nextLine();
          } else {
            if (line.text.length <= cm.options.maxHighlightLength)
              { processLine(cm, line.text, context); }
            line.stateAfter = context.line % 5 == 0 ? context.save() : null;
            context.nextLine();
          }
          if (+new Date > end) {
            startWorker(cm, cm.options.workDelay);
            return true
          }
        });
        doc.highlightFrontier = context.line;
        doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
        if (changedLines.length) { runInOp(cm, function () {
          for (var i = 0; i < changedLines.length; i++)
            { regLineChange(cm, changedLines[i], "text"); }
        }); }
      }

      // DISPLAY DRAWING

      var DisplayUpdate = function(cm, viewport, force) {
        var display = cm.display;

        this.viewport = viewport;
        // Store some values that we'll need later (but don't want to force a relayout for)
        this.visible = visibleLines(display, cm.doc, viewport);
        this.editorIsHidden = !display.wrapper.offsetWidth;
        this.wrapperHeight = display.wrapper.clientHeight;
        this.wrapperWidth = display.wrapper.clientWidth;
        this.oldDisplayWidth = displayWidth(cm);
        this.force = force;
        this.dims = getDimensions(cm);
        this.events = [];
      };

      DisplayUpdate.prototype.signal = function (emitter, type) {
        if (hasHandler(emitter, type))
          { this.events.push(arguments); }
      };
      DisplayUpdate.prototype.finish = function () {
          var this$1$1 = this;

        for (var i = 0; i < this.events.length; i++)
          { signal.apply(null, this$1$1.events[i]); }
      };

      function maybeClipScrollbars(cm) {
        var display = cm.display;
        if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
          display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
          display.heightForcer.style.height = scrollGap(cm) + "px";
          display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
          display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
          display.scrollbarsClipped = true;
        }
      }

      function selectionSnapshot(cm) {
        if (cm.hasFocus()) { return null }
        var active = activeElt();
        if (!active || !contains(cm.display.lineDiv, active)) { return null }
        var result = {activeElt: active};
        if (window.getSelection) {
          var sel = window.getSelection();
          if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
            result.anchorNode = sel.anchorNode;
            result.anchorOffset = sel.anchorOffset;
            result.focusNode = sel.focusNode;
            result.focusOffset = sel.focusOffset;
          }
        }
        return result
      }

      function restoreSelection(snapshot) {
        if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) { return }
        snapshot.activeElt.focus();
        if (snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
          var sel = window.getSelection(), range$$1 = document.createRange();
          range$$1.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
          range$$1.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range$$1);
          sel.extend(snapshot.focusNode, snapshot.focusOffset);
        }
      }

      // Does the actual updating of the line display. Bails out
      // (returning false) when there is nothing to be done and forced is
      // false.
      function updateDisplayIfNeeded(cm, update) {
        var display = cm.display, doc = cm.doc;

        if (update.editorIsHidden) {
          resetView(cm);
          return false
        }

        // Bail out if the visible area is already rendered and nothing changed.
        if (!update.force &&
            update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo &&
            (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) &&
            display.renderedView == display.view && countDirtyView(cm) == 0)
          { return false }

        if (maybeUpdateLineNumberWidth(cm)) {
          resetView(cm);
          update.dims = getDimensions(cm);
        }

        // Compute a suitable new viewport (from & to)
        var end = doc.first + doc.size;
        var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
        var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
        if (display.viewFrom < from && from - display.viewFrom < 20) { from = Math.max(doc.first, display.viewFrom); }
        if (display.viewTo > to && display.viewTo - to < 20) { to = Math.min(end, display.viewTo); }
        if (sawCollapsedSpans) {
          from = visualLineNo(cm.doc, from);
          to = visualLineEndNo(cm.doc, to);
        }

        var different = from != display.viewFrom || to != display.viewTo ||
          display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
        adjustView(cm, from, to);

        display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
        // Position the mover div to align with the current scroll position
        cm.display.mover.style.top = display.viewOffset + "px";

        var toUpdate = countDirtyView(cm);
        if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view &&
            (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo))
          { return false }

        // For big changes, we hide the enclosing element during the
        // update, since that speeds up the operations on most browsers.
        var selSnapshot = selectionSnapshot(cm);
        if (toUpdate > 4) { display.lineDiv.style.display = "none"; }
        patchDisplay(cm, display.updateLineNumbers, update.dims);
        if (toUpdate > 4) { display.lineDiv.style.display = ""; }
        display.renderedView = display.view;
        // There might have been a widget with a focused element that got
        // hidden or updated, if so re-focus it.
        restoreSelection(selSnapshot);

        // Prevent selection and cursors from interfering with the scroll
        // width and height.
        removeChildren(display.cursorDiv);
        removeChildren(display.selectionDiv);
        display.gutters.style.height = display.sizer.style.minHeight = 0;

        if (different) {
          display.lastWrapHeight = update.wrapperHeight;
          display.lastWrapWidth = update.wrapperWidth;
          startWorker(cm, 400);
        }

        display.updateLineNumbers = null;

        return true
      }

      function postUpdateDisplay(cm, update) {
        var viewport = update.viewport;

        for (var first = true;; first = false) {
          if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
            // Clip forced viewport to actual scrollable area.
            if (viewport && viewport.top != null)
              { viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)}; }
            // Updated line heights might result in the drawn area not
            // actually covering the viewport. Keep looping until it does.
            update.visible = visibleLines(cm.display, cm.doc, viewport);
            if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo)
              { break }
          }
          if (!updateDisplayIfNeeded(cm, update)) { break }
          updateHeightsInViewport(cm);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.force = false;
        }

        update.signal(cm, "update", cm);
        if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
          update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
          cm.display.reportedViewFrom = cm.display.viewFrom; cm.display.reportedViewTo = cm.display.viewTo;
        }
      }

      function updateDisplaySimple(cm, viewport) {
        var update = new DisplayUpdate(cm, viewport);
        if (updateDisplayIfNeeded(cm, update)) {
          updateHeightsInViewport(cm);
          postUpdateDisplay(cm, update);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.finish();
        }
      }

      // Sync the actual display DOM structure with display.view, removing
      // nodes for lines that are no longer in view, and creating the ones
      // that are not there yet, and updating the ones that are out of
      // date.
      function patchDisplay(cm, updateNumbersFrom, dims) {
        var display = cm.display, lineNumbers = cm.options.lineNumbers;
        var container = display.lineDiv, cur = container.firstChild;

        function rm(node) {
          var next = node.nextSibling;
          // Works around a throw-scroll bug in OS X Webkit
          if (webkit && mac && cm.display.currentWheelTarget == node)
            { node.style.display = "none"; }
          else
            { node.parentNode.removeChild(node); }
          return next
        }

        var view = display.view, lineN = display.viewFrom;
        // Loop over the elements in the view, syncing cur (the DOM nodes
        // in display.lineDiv) with the view as we go.
        for (var i = 0; i < view.length; i++) {
          var lineView = view[i];
          if (lineView.hidden) ; else if (!lineView.node || lineView.node.parentNode != container) { // Not drawn yet
            var node = buildLineElement(cm, lineView, lineN, dims);
            container.insertBefore(node, cur);
          } else { // Already drawn
            while (cur != lineView.node) { cur = rm(cur); }
            var updateNumber = lineNumbers && updateNumbersFrom != null &&
              updateNumbersFrom <= lineN && lineView.lineNumber;
            if (lineView.changes) {
              if (indexOf(lineView.changes, "gutter") > -1) { updateNumber = false; }
              updateLineForChanges(cm, lineView, lineN, dims);
            }
            if (updateNumber) {
              removeChildren(lineView.lineNumber);
              lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
            }
            cur = lineView.node.nextSibling;
          }
          lineN += lineView.size;
        }
        while (cur) { cur = rm(cur); }
      }

      function updateGutterSpace(display) {
        var width = display.gutters.offsetWidth;
        display.sizer.style.marginLeft = width + "px";
      }

      function setDocumentHeight(cm, measure) {
        cm.display.sizer.style.minHeight = measure.docHeight + "px";
        cm.display.heightForcer.style.top = measure.docHeight + "px";
        cm.display.gutters.style.height = (measure.docHeight + cm.display.barHeight + scrollGap(cm)) + "px";
      }

      // Re-align line numbers and gutter marks to compensate for
      // horizontal scrolling.
      function alignHorizontally(cm) {
        var display = cm.display, view = display.view;
        if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) { return }
        var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
        var gutterW = display.gutters.offsetWidth, left = comp + "px";
        for (var i = 0; i < view.length; i++) { if (!view[i].hidden) {
          if (cm.options.fixedGutter) {
            if (view[i].gutter)
              { view[i].gutter.style.left = left; }
            if (view[i].gutterBackground)
              { view[i].gutterBackground.style.left = left; }
          }
          var align = view[i].alignable;
          if (align) { for (var j = 0; j < align.length; j++)
            { align[j].style.left = left; } }
        } }
        if (cm.options.fixedGutter)
          { display.gutters.style.left = (comp + gutterW) + "px"; }
      }

      // Used to ensure that the line number gutter is still the right
      // size for the current document size. Returns true when an update
      // is needed.
      function maybeUpdateLineNumberWidth(cm) {
        if (!cm.options.lineNumbers) { return false }
        var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
        if (last.length != display.lineNumChars) {
          var test = display.measure.appendChild(elt("div", [elt("div", last)],
                                                     "CodeMirror-linenumber CodeMirror-gutter-elt"));
          var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
          display.lineGutter.style.width = "";
          display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
          display.lineNumWidth = display.lineNumInnerWidth + padding;
          display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
          display.lineGutter.style.width = display.lineNumWidth + "px";
          updateGutterSpace(cm.display);
          return true
        }
        return false
      }

      function getGutters(gutters, lineNumbers) {
        var result = [], sawLineNumbers = false;
        for (var i = 0; i < gutters.length; i++) {
          var name = gutters[i], style = null;
          if (typeof name != "string") { style = name.style; name = name.className; }
          if (name == "CodeMirror-linenumbers") {
            if (!lineNumbers) { continue }
            else { sawLineNumbers = true; }
          }
          result.push({className: name, style: style});
        }
        if (lineNumbers && !sawLineNumbers) { result.push({className: "CodeMirror-linenumbers", style: null}); }
        return result
      }

      // Rebuild the gutter elements, ensure the margin to the left of the
      // code matches their width.
      function renderGutters(display) {
        var gutters = display.gutters, specs = display.gutterSpecs;
        removeChildren(gutters);
        display.lineGutter = null;
        for (var i = 0; i < specs.length; ++i) {
          var ref = specs[i];
          var className = ref.className;
          var style = ref.style;
          var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
          if (style) { gElt.style.cssText = style; }
          if (className == "CodeMirror-linenumbers") {
            display.lineGutter = gElt;
            gElt.style.width = (display.lineNumWidth || 1) + "px";
          }
        }
        gutters.style.display = specs.length ? "" : "none";
        updateGutterSpace(display);
      }

      function updateGutters(cm) {
        renderGutters(cm.display);
        regChange(cm);
        alignHorizontally(cm);
      }

      // The display handles the DOM integration, both for input reading
      // and content drawing. It holds references to DOM nodes and
      // display-related state.

      function Display(place, doc, input, options) {
        var d = this;
        this.input = input;

        // Covers bottom-right square when both scrollbars are present.
        d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
        d.scrollbarFiller.setAttribute("cm-not-content", "true");
        // Covers bottom of gutter when coverGutterNextToScrollbar is on
        // and h scrollbar is present.
        d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
        d.gutterFiller.setAttribute("cm-not-content", "true");
        // Will contain the actual code, positioned to cover the viewport.
        d.lineDiv = eltP("div", null, "CodeMirror-code");
        // Elements are added to these to represent selection and cursors.
        d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
        d.cursorDiv = elt("div", null, "CodeMirror-cursors");
        // A visibility: hidden element used to find the size of things.
        d.measure = elt("div", null, "CodeMirror-measure");
        // When lines outside of the viewport are measured, they are drawn in this.
        d.lineMeasure = elt("div", null, "CodeMirror-measure");
        // Wraps everything that needs to exist inside the vertically-padded coordinate system
        d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
                          null, "position: relative; outline: none");
        var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
        // Moved around its parent to cover visible view.
        d.mover = elt("div", [lines], null, "position: relative");
        // Set to the height of the document, allowing scrolling.
        d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
        d.sizerWidth = null;
        // Behavior of elts with overflow: auto and padding is
        // inconsistent across browsers. This is used to ensure the
        // scrollable area is big enough.
        d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
        // Will contain the gutters, if any.
        d.gutters = elt("div", null, "CodeMirror-gutters");
        d.lineGutter = null;
        // Actual scrollable element.
        d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
        d.scroller.setAttribute("tabIndex", "-1");
        // The element in which the editor lives.
        d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

        // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
        if (ie && ie_version < 8) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
        if (!webkit && !(gecko && mobile)) { d.scroller.draggable = true; }

        if (place) {
          if (place.appendChild) { place.appendChild(d.wrapper); }
          else { place(d.wrapper); }
        }

        // Current rendered range (may be bigger than the view window).
        d.viewFrom = d.viewTo = doc.first;
        d.reportedViewFrom = d.reportedViewTo = doc.first;
        // Information about the rendered lines.
        d.view = [];
        d.renderedView = null;
        // Holds info about a single rendered line when it was rendered
        // for measurement, while not in view.
        d.externalMeasured = null;
        // Empty space (in pixels) above the view
        d.viewOffset = 0;
        d.lastWrapHeight = d.lastWrapWidth = 0;
        d.updateLineNumbers = null;

        d.nativeBarWidth = d.barHeight = d.barWidth = 0;
        d.scrollbarsClipped = false;

        // Used to only resize the line number gutter when necessary (when
        // the amount of lines crosses a boundary that makes its width change)
        d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
        // Set to true when a non-horizontal-scrolling line widget is
        // added. As an optimization, line widget aligning is skipped when
        // this is false.
        d.alignWidgets = false;

        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

        // Tracks the maximum line length so that the horizontal scrollbar
        // can be kept static when scrolling.
        d.maxLine = null;
        d.maxLineLength = 0;
        d.maxLineChanged = false;

        // Used for measuring wheel scrolling granularity
        d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

        // True when shift is held down.
        d.shift = false;

        // Used to track whether anything happened since the context menu
        // was opened.
        d.selForContextMenu = null;

        d.activeTouch = null;

        d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
        renderGutters(d);

        input.init(d);
      }

      // Since the delta values reported on mouse wheel events are
      // unstandardized between browsers and even browser versions, and
      // generally horribly unpredictable, this code starts by measuring
      // the scroll effect that the first few mouse wheel events have,
      // and, from that, detects the way it can convert deltas to pixel
      // offsets afterwards.
      //
      // The reason we want to know the amount a wheel event will scroll
      // is that it gives us a chance to update the display before the
      // actual scrolling happens, reducing flickering.

      var wheelSamples = 0, wheelPixelsPerUnit = null;
      // Fill in a browser-detected starting value on browsers where we
      // know one. These don't have to be accurate -- the result of them
      // being wrong would just be a slight flicker on the first wheel
      // scroll (if it is large enough).
      if (ie) { wheelPixelsPerUnit = -.53; }
      else if (gecko) { wheelPixelsPerUnit = 15; }
      else if (chrome) { wheelPixelsPerUnit = -.7; }
      else if (safari) { wheelPixelsPerUnit = -1/3; }

      function wheelEventDelta(e) {
        var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
        if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) { dx = e.detail; }
        if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) { dy = e.detail; }
        else if (dy == null) { dy = e.wheelDelta; }
        return {x: dx, y: dy}
      }
      function wheelEventPixels(e) {
        var delta = wheelEventDelta(e);
        delta.x *= wheelPixelsPerUnit;
        delta.y *= wheelPixelsPerUnit;
        return delta
      }

      function onScrollWheel(cm, e) {
        var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;

        var display = cm.display, scroll = display.scroller;
        // Quit if there's nothing to scroll here
        var canScrollX = scroll.scrollWidth > scroll.clientWidth;
        var canScrollY = scroll.scrollHeight > scroll.clientHeight;
        if (!(dx && canScrollX || dy && canScrollY)) { return }

        // Webkit browsers on OS X abort momentum scrolls when the target
        // of the scroll event is removed from the scrollable element.
        // This hack (see related code in patchDisplay) makes sure the
        // element is kept around.
        if (dy && mac && webkit) {
          outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
            for (var i = 0; i < view.length; i++) {
              if (view[i].node == cur) {
                cm.display.currentWheelTarget = cur;
                break outer
              }
            }
          }
        }

        // On some browsers, horizontal scrolling will cause redraws to
        // happen before the gutter has been realigned, causing it to
        // wriggle around in a most unseemly way. When we have an
        // estimated pixels/delta value, we just handle horizontal
        // scrolling entirely here. It'll be slightly off from native, but
        // better than glitching out.
        if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
          if (dy && canScrollY)
            { updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * wheelPixelsPerUnit)); }
          setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * wheelPixelsPerUnit));
          // Only prevent default scrolling if vertical scrolling is
          // actually possible. Otherwise, it causes vertical scroll
          // jitter on OSX trackpads when deltaX is small and deltaY
          // is large (issue #3579)
          if (!dy || (dy && canScrollY))
            { e_preventDefault(e); }
          display.wheelStartX = null; // Abort measurement, if in progress
          return
        }

        // 'Project' the visible viewport to cover the area that is being
        // scrolled into view (if we know enough to estimate it).
        if (dy && wheelPixelsPerUnit != null) {
          var pixels = dy * wheelPixelsPerUnit;
          var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
          if (pixels < 0) { top = Math.max(0, top + pixels - 50); }
          else { bot = Math.min(cm.doc.height, bot + pixels + 50); }
          updateDisplaySimple(cm, {top: top, bottom: bot});
        }

        if (wheelSamples < 20) {
          if (display.wheelStartX == null) {
            display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
            display.wheelDX = dx; display.wheelDY = dy;
            setTimeout(function () {
              if (display.wheelStartX == null) { return }
              var movedX = scroll.scrollLeft - display.wheelStartX;
              var movedY = scroll.scrollTop - display.wheelStartY;
              var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
                (movedX && display.wheelDX && movedX / display.wheelDX);
              display.wheelStartX = display.wheelStartY = null;
              if (!sample) { return }
              wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
              ++wheelSamples;
            }, 200);
          } else {
            display.wheelDX += dx; display.wheelDY += dy;
          }
        }
      }

      // Selection objects are immutable. A new one is created every time
      // the selection changes. A selection is one or more non-overlapping
      // (and non-touching) ranges, sorted, and an integer that indicates
      // which one is the primary selection (the one that's scrolled into
      // view, that getCursor returns, etc).
      var Selection = function(ranges, primIndex) {
        this.ranges = ranges;
        this.primIndex = primIndex;
      };

      Selection.prototype.primary = function () { return this.ranges[this.primIndex] };

      Selection.prototype.equals = function (other) {
          var this$1$1 = this;

        if (other == this) { return true }
        if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) { return false }
        for (var i = 0; i < this.ranges.length; i++) {
          var here = this$1$1.ranges[i], there = other.ranges[i];
          if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) { return false }
        }
        return true
      };

      Selection.prototype.deepCopy = function () {
          var this$1$1 = this;

        var out = [];
        for (var i = 0; i < this.ranges.length; i++)
          { out[i] = new Range(copyPos(this$1$1.ranges[i].anchor), copyPos(this$1$1.ranges[i].head)); }
        return new Selection(out, this.primIndex)
      };

      Selection.prototype.somethingSelected = function () {
          var this$1$1 = this;

        for (var i = 0; i < this.ranges.length; i++)
          { if (!this$1$1.ranges[i].empty()) { return true } }
        return false
      };

      Selection.prototype.contains = function (pos, end) {
          var this$1$1 = this;

        if (!end) { end = pos; }
        for (var i = 0; i < this.ranges.length; i++) {
          var range = this$1$1.ranges[i];
          if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
            { return i }
        }
        return -1
      };

      var Range = function(anchor, head) {
        this.anchor = anchor; this.head = head;
      };

      Range.prototype.from = function () { return minPos(this.anchor, this.head) };
      Range.prototype.to = function () { return maxPos(this.anchor, this.head) };
      Range.prototype.empty = function () { return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch };

      // Take an unsorted, potentially overlapping set of ranges, and
      // build a selection out of it. 'Consumes' ranges array (modifying
      // it).
      function normalizeSelection(cm, ranges, primIndex) {
        var mayTouch = cm && cm.options.selectionsMayTouch;
        var prim = ranges[primIndex];
        ranges.sort(function (a, b) { return cmp(a.from(), b.from()); });
        primIndex = indexOf(ranges, prim);
        for (var i = 1; i < ranges.length; i++) {
          var cur = ranges[i], prev = ranges[i - 1];
          var diff = cmp(prev.to(), cur.from());
          if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
            var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
            var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
            if (i <= primIndex) { --primIndex; }
            ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
          }
        }
        return new Selection(ranges, primIndex)
      }

      function simpleSelection(anchor, head) {
        return new Selection([new Range(anchor, head || anchor)], 0)
      }

      // Compute the position of the end of a change (its 'to' property
      // refers to the pre-change end).
      function changeEnd(change) {
        if (!change.text) { return change.to }
        return Pos(change.from.line + change.text.length - 1,
                   lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0))
      }

      // Adjust a position to refer to the post-change position of the
      // same text, or the end of the change if the change covers it.
      function adjustForChange(pos, change) {
        if (cmp(pos, change.from) < 0) { return pos }
        if (cmp(pos, change.to) <= 0) { return changeEnd(change) }

        var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
        if (pos.line == change.to.line) { ch += changeEnd(change).ch - change.to.ch; }
        return Pos(line, ch)
      }

      function computeSelAfterChange(doc, change) {
        var out = [];
        for (var i = 0; i < doc.sel.ranges.length; i++) {
          var range = doc.sel.ranges[i];
          out.push(new Range(adjustForChange(range.anchor, change),
                             adjustForChange(range.head, change)));
        }
        return normalizeSelection(doc.cm, out, doc.sel.primIndex)
      }

      function offsetPos(pos, old, nw) {
        if (pos.line == old.line)
          { return Pos(nw.line, pos.ch - old.ch + nw.ch) }
        else
          { return Pos(nw.line + (pos.line - old.line), pos.ch) }
      }

      // Used by replaceSelections to allow moving the selection to the
      // start or around the replaced test. Hint may be "start" or "around".
      function computeReplacedSel(doc, changes, hint) {
        var out = [];
        var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
          var from = offsetPos(change.from, oldPrev, newPrev);
          var to = offsetPos(changeEnd(change), oldPrev, newPrev);
          oldPrev = change.to;
          newPrev = to;
          if (hint == "around") {
            var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
            out[i] = new Range(inv ? to : from, inv ? from : to);
          } else {
            out[i] = new Range(from, from);
          }
        }
        return new Selection(out, doc.sel.primIndex)
      }

      // Used to get the editor into a consistent state again when options change.

      function loadMode(cm) {
        cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
        resetModeState(cm);
      }

      function resetModeState(cm) {
        cm.doc.iter(function (line) {
          if (line.stateAfter) { line.stateAfter = null; }
          if (line.styles) { line.styles = null; }
        });
        cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
        startWorker(cm, 100);
        cm.state.modeGen++;
        if (cm.curOp) { regChange(cm); }
      }

      // DOCUMENT DATA STRUCTURE

      // By default, updates that start and end at the beginning of a line
      // are treated specially, in order to make the association of line
      // widgets and marker elements with the text behave more intuitive.
      function isWholeLineUpdate(doc, change) {
        return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
          (!doc.cm || doc.cm.options.wholeLineUpdateBefore)
      }

      // Perform a change on the document data structure.
      function updateDoc(doc, change, markedSpans, estimateHeight$$1) {
        function spansFor(n) {return markedSpans ? markedSpans[n] : null}
        function update(line, text, spans) {
          updateLine(line, text, spans, estimateHeight$$1);
          signalLater(line, "change", line, change);
        }
        function linesFor(start, end) {
          var result = [];
          for (var i = start; i < end; ++i)
            { result.push(new Line(text[i], spansFor(i), estimateHeight$$1)); }
          return result
        }

        var from = change.from, to = change.to, text = change.text;
        var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
        var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;

        // Adjust the line structure
        if (change.full) {
          doc.insert(0, linesFor(0, text.length));
          doc.remove(text.length, doc.size - text.length);
        } else if (isWholeLineUpdate(doc, change)) {
          // This is a whole-line replace. Treated specially to make
          // sure line objects move the way they are supposed to.
          var added = linesFor(0, text.length - 1);
          update(lastLine, lastLine.text, lastSpans);
          if (nlines) { doc.remove(from.line, nlines); }
          if (added.length) { doc.insert(from.line, added); }
        } else if (firstLine == lastLine) {
          if (text.length == 1) {
            update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
          } else {
            var added$1 = linesFor(1, text.length - 1);
            added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight$$1));
            update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
            doc.insert(from.line + 1, added$1);
          }
        } else if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
          doc.remove(from.line + 1, nlines);
        } else {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
          var added$2 = linesFor(1, text.length - 1);
          if (nlines > 1) { doc.remove(from.line + 1, nlines - 1); }
          doc.insert(from.line + 1, added$2);
        }

        signalLater(doc, "change", doc, change);
      }

      // Call f for all linked documents.
      function linkedDocs(doc, f, sharedHistOnly) {
        function propagate(doc, skip, sharedHist) {
          if (doc.linked) { for (var i = 0; i < doc.linked.length; ++i) {
            var rel = doc.linked[i];
            if (rel.doc == skip) { continue }
            var shared = sharedHist && rel.sharedHist;
            if (sharedHistOnly && !shared) { continue }
            f(rel.doc, shared);
            propagate(rel.doc, doc, shared);
          } }
        }
        propagate(doc, null, true);
      }

      // Attach a document to an editor.
      function attachDoc(cm, doc) {
        if (doc.cm) { throw new Error("This document is already in use.") }
        cm.doc = doc;
        doc.cm = cm;
        estimateLineHeights(cm);
        loadMode(cm);
        setDirectionClass(cm);
        if (!cm.options.lineWrapping) { findMaxLine(cm); }
        cm.options.mode = doc.modeOption;
        regChange(cm);
      }

      function setDirectionClass(cm) {
      (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
      }

      function directionChanged(cm) {
        runInOp(cm, function () {
          setDirectionClass(cm);
          regChange(cm);
        });
      }

      function History(startGen) {
        // Arrays of change events and selections. Doing something adds an
        // event to done and clears undo. Undoing moves events from done
        // to undone, redoing moves them in the other direction.
        this.done = []; this.undone = [];
        this.undoDepth = Infinity;
        // Used to track when changes can be merged into a single undo
        // event
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = this.lastSelOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        // Used by the isClean() method
        this.generation = this.maxGeneration = startGen || 1;
      }

      // Create a history change event from an updateDoc-style change
      // object.
      function historyChangeFromChange(doc, change) {
        var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to)};
        attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
        linkedDocs(doc, function (doc) { return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1); }, true);
        return histChange
      }

      // Pop all selection events off the end of a history array. Stop at
      // a change event.
      function clearSelectionEvents(array) {
        while (array.length) {
          var last = lst(array);
          if (last.ranges) { array.pop(); }
          else { break }
        }
      }

      // Find the top change event in the history. Pop off selection
      // events that are in the way.
      function lastChangeEvent(hist, force) {
        if (force) {
          clearSelectionEvents(hist.done);
          return lst(hist.done)
        } else if (hist.done.length && !lst(hist.done).ranges) {
          return lst(hist.done)
        } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
          hist.done.pop();
          return lst(hist.done)
        }
      }

      // Register a change in the history. Merges changes that are within
      // a single operation, or are close together with an origin that
      // allows merging (starting with "+") into a single event.
      function addChangeToHistory(doc, change, selAfter, opId) {
        var hist = doc.history;
        hist.undone.length = 0;
        var time = +new Date, cur;
        var last;

        if ((hist.lastOp == opId ||
             hist.lastOrigin == change.origin && change.origin &&
             ((change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc.cm ? doc.cm.options.historyEventDelay : 500)) ||
              change.origin.charAt(0) == "*")) &&
            (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
          // Merge this change into the last event
          last = lst(cur.changes);
          if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
            // Optimized case for simple insertion -- don't want to add
            // new changesets for every character typed
            last.to = changeEnd(change);
          } else {
            // Add new sub-event
            cur.changes.push(historyChangeFromChange(doc, change));
          }
        } else {
          // Can not be merged, start a new event.
          var before = lst(hist.done);
          if (!before || !before.ranges)
            { pushSelectionToHistory(doc.sel, hist.done); }
          cur = {changes: [historyChangeFromChange(doc, change)],
                 generation: hist.generation};
          hist.done.push(cur);
          while (hist.done.length > hist.undoDepth) {
            hist.done.shift();
            if (!hist.done[0].ranges) { hist.done.shift(); }
          }
        }
        hist.done.push(selAfter);
        hist.generation = ++hist.maxGeneration;
        hist.lastModTime = hist.lastSelTime = time;
        hist.lastOp = hist.lastSelOp = opId;
        hist.lastOrigin = hist.lastSelOrigin = change.origin;

        if (!last) { signal(doc, "historyAdded"); }
      }

      function selectionEventCanBeMerged(doc, origin, prev, sel) {
        var ch = origin.charAt(0);
        return ch == "*" ||
          ch == "+" &&
          prev.ranges.length == sel.ranges.length &&
          prev.somethingSelected() == sel.somethingSelected() &&
          new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500)
      }

      // Called whenever the selection changes, sets the new selection as
      // the pending selection in the history, and pushes the old pending
      // selection into the 'done' array when it was significantly
      // different (in number of selected ranges, emptiness, or time).
      function addSelectionToHistory(doc, sel, opId, options) {
        var hist = doc.history, origin = options && options.origin;

        // A new event is started when the previous origin does not match
        // the current, or the origins don't allow matching. Origins
        // starting with * are always merged, those starting with + are
        // merged when similar and close together in time.
        if (opId == hist.lastSelOp ||
            (origin && hist.lastSelOrigin == origin &&
             (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
              selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
          { hist.done[hist.done.length - 1] = sel; }
        else
          { pushSelectionToHistory(sel, hist.done); }

        hist.lastSelTime = +new Date;
        hist.lastSelOrigin = origin;
        hist.lastSelOp = opId;
        if (options && options.clearRedo !== false)
          { clearSelectionEvents(hist.undone); }
      }

      function pushSelectionToHistory(sel, dest) {
        var top = lst(dest);
        if (!(top && top.ranges && top.equals(sel)))
          { dest.push(sel); }
      }

      // Used to store marked span information in the history.
      function attachLocalSpans(doc, change, from, to) {
        var existing = change["spans_" + doc.id], n = 0;
        doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
          if (line.markedSpans)
            { (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans; }
          ++n;
        });
      }

      // When un/re-doing restores text containing marked spans, those
      // that have been explicitly cleared should not be restored.
      function removeClearedSpans(spans) {
        if (!spans) { return null }
        var out;
        for (var i = 0; i < spans.length; ++i) {
          if (spans[i].marker.explicitlyCleared) { if (!out) { out = spans.slice(0, i); } }
          else if (out) { out.push(spans[i]); }
        }
        return !out ? spans : out.length ? out : null
      }

      // Retrieve and filter the old marked spans stored in a change event.
      function getOldSpans(doc, change) {
        var found = change["spans_" + doc.id];
        if (!found) { return null }
        var nw = [];
        for (var i = 0; i < change.text.length; ++i)
          { nw.push(removeClearedSpans(found[i])); }
        return nw
      }

      // Used for un/re-doing changes from the history. Combines the
      // result of computing the existing spans with the set of spans that
      // existed in the history (so that deleting around a span and then
      // undoing brings back the span).
      function mergeOldSpans(doc, change) {
        var old = getOldSpans(doc, change);
        var stretched = stretchSpansOverChange(doc, change);
        if (!old) { return stretched }
        if (!stretched) { return old }

        for (var i = 0; i < old.length; ++i) {
          var oldCur = old[i], stretchCur = stretched[i];
          if (oldCur && stretchCur) {
            spans: for (var j = 0; j < stretchCur.length; ++j) {
              var span = stretchCur[j];
              for (var k = 0; k < oldCur.length; ++k)
                { if (oldCur[k].marker == span.marker) { continue spans } }
              oldCur.push(span);
            }
          } else if (stretchCur) {
            old[i] = stretchCur;
          }
        }
        return old
      }

      // Used both to provide a JSON-safe object in .getHistory, and, when
      // detaching a document, to split the history in two
      function copyHistoryArray(events, newGroup, instantiateSel) {
        var copy = [];
        for (var i = 0; i < events.length; ++i) {
          var event = events[i];
          if (event.ranges) {
            copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
            continue
          }
          var changes = event.changes, newChanges = [];
          copy.push({changes: newChanges});
          for (var j = 0; j < changes.length; ++j) {
            var change = changes[j], m = (void 0);
            newChanges.push({from: change.from, to: change.to, text: change.text});
            if (newGroup) { for (var prop in change) { if (m = prop.match(/^spans_(\d+)$/)) {
              if (indexOf(newGroup, Number(m[1])) > -1) {
                lst(newChanges)[prop] = change[prop];
                delete change[prop];
              }
            } } }
          }
        }
        return copy
      }

      // The 'scroll' parameter given to many of these indicated whether
      // the new cursor position should be scrolled into view after
      // modifying the selection.

      // If shift is held or the extend flag is set, extends a range to
      // include a given position (and optionally a second position).
      // Otherwise, simply returns the range between the given positions.
      // Used for cursor motion and such.
      function extendRange(range, head, other, extend) {
        if (extend) {
          var anchor = range.anchor;
          if (other) {
            var posBefore = cmp(head, anchor) < 0;
            if (posBefore != (cmp(other, anchor) < 0)) {
              anchor = head;
              head = other;
            } else if (posBefore != (cmp(head, other) < 0)) {
              head = other;
            }
          }
          return new Range(anchor, head)
        } else {
          return new Range(other || head, head)
        }
      }

      // Extend the primary selection range, discard the rest.
      function extendSelection(doc, head, other, options, extend) {
        if (extend == null) { extend = doc.cm && (doc.cm.display.shift || doc.extend); }
        setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
      }

      // Extend all selections (pos is an array of selections with length
      // equal the number of selections)
      function extendSelections(doc, heads, options) {
        var out = [];
        var extend = doc.cm && (doc.cm.display.shift || doc.extend);
        for (var i = 0; i < doc.sel.ranges.length; i++)
          { out[i] = extendRange(doc.sel.ranges[i], heads[i], null, extend); }
        var newSel = normalizeSelection(doc.cm, out, doc.sel.primIndex);
        setSelection(doc, newSel, options);
      }

      // Updates a single range in the selection.
      function replaceOneSelection(doc, i, range, options) {
        var ranges = doc.sel.ranges.slice(0);
        ranges[i] = range;
        setSelection(doc, normalizeSelection(doc.cm, ranges, doc.sel.primIndex), options);
      }

      // Reset the selection to a single range.
      function setSimpleSelection(doc, anchor, head, options) {
        setSelection(doc, simpleSelection(anchor, head), options);
      }

      // Give beforeSelectionChange handlers a change to influence a
      // selection update.
      function filterSelectionChange(doc, sel, options) {
        var obj = {
          ranges: sel.ranges,
          update: function(ranges) {
            var this$1$1 = this;

            this.ranges = [];
            for (var i = 0; i < ranges.length; i++)
              { this$1$1.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
                                         clipPos(doc, ranges[i].head)); }
          },
          origin: options && options.origin
        };
        signal(doc, "beforeSelectionChange", doc, obj);
        if (doc.cm) { signal(doc.cm, "beforeSelectionChange", doc.cm, obj); }
        if (obj.ranges != sel.ranges) { return normalizeSelection(doc.cm, obj.ranges, obj.ranges.length - 1) }
        else { return sel }
      }

      function setSelectionReplaceHistory(doc, sel, options) {
        var done = doc.history.done, last = lst(done);
        if (last && last.ranges) {
          done[done.length - 1] = sel;
          setSelectionNoUndo(doc, sel, options);
        } else {
          setSelection(doc, sel, options);
        }
      }

      // Set a new selection.
      function setSelection(doc, sel, options) {
        setSelectionNoUndo(doc, sel, options);
        addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
      }

      function setSelectionNoUndo(doc, sel, options) {
        if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
          { sel = filterSelectionChange(doc, sel, options); }

        var bias = options && options.bias ||
          (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
        setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

        if (!(options && options.scroll === false) && doc.cm)
          { ensureCursorVisible(doc.cm); }
      }

      function setSelectionInner(doc, sel) {
        if (sel.equals(doc.sel)) { return }

        doc.sel = sel;

        if (doc.cm) {
          doc.cm.curOp.updateInput = 1;
          doc.cm.curOp.selectionChanged = true;
          signalCursorActivity(doc.cm);
        }
        signalLater(doc, "cursorActivity", doc);
      }

      // Verify that the selection does not partially select any atomic
      // marked ranges.
      function reCheckSelection(doc) {
        setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
      }

      // Return a selection that does not partially select any atomic
      // ranges.
      function skipAtomicInSelection(doc, sel, bias, mayClear) {
        var out;
        for (var i = 0; i < sel.ranges.length; i++) {
          var range = sel.ranges[i];
          var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
          var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
          var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
          if (out || newAnchor != range.anchor || newHead != range.head) {
            if (!out) { out = sel.ranges.slice(0, i); }
            out[i] = new Range(newAnchor, newHead);
          }
        }
        return out ? normalizeSelection(doc.cm, out, sel.primIndex) : sel
      }

      function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
        var line = getLine(doc, pos.line);
        if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
          var sp = line.markedSpans[i], m = sp.marker;

          // Determine if we should prevent the cursor being placed to the left/right of an atomic marker
          // Historically this was determined using the inclusiveLeft/Right option, but the new way to control it
          // is with selectLeft/Right
          var preventCursorLeft = ("selectLeft" in m) ? !m.selectLeft : m.inclusiveLeft;
          var preventCursorRight = ("selectRight" in m) ? !m.selectRight : m.inclusiveRight;

          if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) &&
              (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
            if (mayClear) {
              signal(m, "beforeCursorEnter");
              if (m.explicitlyCleared) {
                if (!line.markedSpans) { break }
                else {--i; continue}
              }
            }
            if (!m.atomic) { continue }

            if (oldPos) {
              var near = m.find(dir < 0 ? 1 : -1), diff = (void 0);
              if (dir < 0 ? preventCursorRight : preventCursorLeft)
                { near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null); }
              if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0))
                { return skipAtomicInner(doc, near, pos, dir, mayClear) }
            }

            var far = m.find(dir < 0 ? -1 : 1);
            if (dir < 0 ? preventCursorLeft : preventCursorRight)
              { far = movePos(doc, far, dir, far.line == pos.line ? line : null); }
            return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null
          }
        } }
        return pos
      }

      // Ensure a given position is not inside an atomic range.
      function skipAtomic(doc, pos, oldPos, bias, mayClear) {
        var dir = bias || 1;
        var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) ||
            (!mayClear && skipAtomicInner(doc, pos, oldPos, dir, true)) ||
            skipAtomicInner(doc, pos, oldPos, -dir, mayClear) ||
            (!mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true));
        if (!found) {
          doc.cantEdit = true;
          return Pos(doc.first, 0)
        }
        return found
      }

      function movePos(doc, pos, dir, line) {
        if (dir < 0 && pos.ch == 0) {
          if (pos.line > doc.first) { return clipPos(doc, Pos(pos.line - 1)) }
          else { return null }
        } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
          if (pos.line < doc.first + doc.size - 1) { return Pos(pos.line + 1, 0) }
          else { return null }
        } else {
          return new Pos(pos.line, pos.ch + dir)
        }
      }

      function selectAll(cm) {
        cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
      }

      // UPDATING

      // Allow "beforeChange" event handlers to influence a change
      function filterChange(doc, change, update) {
        var obj = {
          canceled: false,
          from: change.from,
          to: change.to,
          text: change.text,
          origin: change.origin,
          cancel: function () { return obj.canceled = true; }
        };
        if (update) { obj.update = function (from, to, text, origin) {
          if (from) { obj.from = clipPos(doc, from); }
          if (to) { obj.to = clipPos(doc, to); }
          if (text) { obj.text = text; }
          if (origin !== undefined) { obj.origin = origin; }
        }; }
        signal(doc, "beforeChange", doc, obj);
        if (doc.cm) { signal(doc.cm, "beforeChange", doc.cm, obj); }

        if (obj.canceled) {
          if (doc.cm) { doc.cm.curOp.updateInput = 2; }
          return null
        }
        return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin}
      }

      // Apply a change to a document, and add it to the document's
      // history, and propagating it to all linked documents.
      function makeChange(doc, change, ignoreReadOnly) {
        if (doc.cm) {
          if (!doc.cm.curOp) { return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly) }
          if (doc.cm.state.suppressEdits) { return }
        }

        if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
          change = filterChange(doc, change, true);
          if (!change) { return }
        }

        // Possibly split or suppress the update based on the presence
        // of read-only spans in its range.
        var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
        if (split) {
          for (var i = split.length - 1; i >= 0; --i)
            { makeChangeInner(doc, {from: split[i].from, to: split[i].to, text: i ? [""] : change.text, origin: change.origin}); }
        } else {
          makeChangeInner(doc, change);
        }
      }

      function makeChangeInner(doc, change) {
        if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) { return }
        var selAfter = computeSelAfterChange(doc, change);
        addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

        makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
        var rebased = [];

        linkedDocs(doc, function (doc, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc.history) == -1) {
            rebaseHist(doc.history, change);
            rebased.push(doc.history);
          }
          makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
        });
      }

      // Revert a change stored in a document's history.
      function makeChangeFromHistory(doc, type, allowSelectionOnly) {
        var suppress = doc.cm && doc.cm.state.suppressEdits;
        if (suppress && !allowSelectionOnly) { return }

        var hist = doc.history, event, selAfter = doc.sel;
        var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;

        // Verify that there is a useable event (so that ctrl-z won't
        // needlessly clear selection events)
        var i = 0;
        for (; i < source.length; i++) {
          event = source[i];
          if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
            { break }
        }
        if (i == source.length) { return }
        hist.lastOrigin = hist.lastSelOrigin = null;

        for (;;) {
          event = source.pop();
          if (event.ranges) {
            pushSelectionToHistory(event, dest);
            if (allowSelectionOnly && !event.equals(doc.sel)) {
              setSelection(doc, event, {clearRedo: false});
              return
            }
            selAfter = event;
          } else if (suppress) {
            source.push(event);
            return
          } else { break }
        }

        // Build up a reverse change object to add to the opposite history
        // stack (redo when undoing, and vice versa).
        var antiChanges = [];
        pushSelectionToHistory(selAfter, dest);
        dest.push({changes: antiChanges, generation: hist.generation});
        hist.generation = event.generation || ++hist.maxGeneration;

        var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

        var loop = function ( i ) {
          var change = event.changes[i];
          change.origin = type;
          if (filter && !filterChange(doc, change, false)) {
            source.length = 0;
            return {}
          }

          antiChanges.push(historyChangeFromChange(doc, change));

          var after = i ? computeSelAfterChange(doc, change) : lst(source);
          makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
          if (!i && doc.cm) { doc.cm.scrollIntoView({from: change.from, to: changeEnd(change)}); }
          var rebased = [];

          // Propagate to the linked documents
          linkedDocs(doc, function (doc, sharedHist) {
            if (!sharedHist && indexOf(rebased, doc.history) == -1) {
              rebaseHist(doc.history, change);
              rebased.push(doc.history);
            }
            makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
          });
        };

        for (var i$1 = event.changes.length - 1; i$1 >= 0; --i$1) {
          var returned = loop( i$1 );

          if ( returned ) return returned.v;
        }
      }

      // Sub-views need their line numbers shifted when text is added
      // above or below them in the parent document.
      function shiftDoc(doc, distance) {
        if (distance == 0) { return }
        doc.first += distance;
        doc.sel = new Selection(map(doc.sel.ranges, function (range) { return new Range(
          Pos(range.anchor.line + distance, range.anchor.ch),
          Pos(range.head.line + distance, range.head.ch)
        ); }), doc.sel.primIndex);
        if (doc.cm) {
          regChange(doc.cm, doc.first, doc.first - distance, distance);
          for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++)
            { regLineChange(doc.cm, l, "gutter"); }
        }
      }

      // More lower-level change function, handling only a single document
      // (not linked ones).
      function makeChangeSingleDoc(doc, change, selAfter, spans) {
        if (doc.cm && !doc.cm.curOp)
          { return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans) }

        if (change.to.line < doc.first) {
          shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
          return
        }
        if (change.from.line > doc.lastLine()) { return }

        // Clip the change to the size of this doc
        if (change.from.line < doc.first) {
          var shift = change.text.length - 1 - (doc.first - change.from.line);
          shiftDoc(doc, shift);
          change = {from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
                    text: [lst(change.text)], origin: change.origin};
        }
        var last = doc.lastLine();
        if (change.to.line > last) {
          change = {from: change.from, to: Pos(last, getLine(doc, last).text.length),
                    text: [change.text[0]], origin: change.origin};
        }

        change.removed = getBetween(doc, change.from, change.to);

        if (!selAfter) { selAfter = computeSelAfterChange(doc, change); }
        if (doc.cm) { makeChangeSingleDocInEditor(doc.cm, change, spans); }
        else { updateDoc(doc, change, spans); }
        setSelectionNoUndo(doc, selAfter, sel_dontScroll);

        if (doc.cantEdit && skipAtomic(doc, Pos(doc.firstLine(), 0)))
          { doc.cantEdit = false; }
      }

      // Handle the interaction of a change to a document with the editor
      // that this document is part of.
      function makeChangeSingleDocInEditor(cm, change, spans) {
        var doc = cm.doc, display = cm.display, from = change.from, to = change.to;

        var recomputeMaxLength = false, checkWidthStart = from.line;
        if (!cm.options.lineWrapping) {
          checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
          doc.iter(checkWidthStart, to.line + 1, function (line) {
            if (line == display.maxLine) {
              recomputeMaxLength = true;
              return true
            }
          });
        }

        if (doc.sel.contains(change.from, change.to) > -1)
          { signalCursorActivity(cm); }

        updateDoc(doc, change, spans, estimateHeight(cm));

        if (!cm.options.lineWrapping) {
          doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
            var len = lineLength(line);
            if (len > display.maxLineLength) {
              display.maxLine = line;
              display.maxLineLength = len;
              display.maxLineChanged = true;
              recomputeMaxLength = false;
            }
          });
          if (recomputeMaxLength) { cm.curOp.updateMaxLine = true; }
        }

        retreatFrontier(doc, from.line);
        startWorker(cm, 400);

        var lendiff = change.text.length - (to.line - from.line) - 1;
        // Remember that these lines changed, for updating the display
        if (change.full)
          { regChange(cm); }
        else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
          { regLineChange(cm, from.line, "text"); }
        else
          { regChange(cm, from.line, to.line + 1, lendiff); }

        var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
        if (changeHandler || changesHandler) {
          var obj = {
            from: from, to: to,
            text: change.text,
            removed: change.removed,
            origin: change.origin
          };
          if (changeHandler) { signalLater(cm, "change", cm, obj); }
          if (changesHandler) { (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj); }
        }
        cm.display.selForContextMenu = null;
      }

      function replaceRange(doc, code, from, to, origin) {
        var assign;

        if (!to) { to = from; }
        if (cmp(to, from) < 0) { (assign = [to, from], from = assign[0], to = assign[1]); }
        if (typeof code == "string") { code = doc.splitLines(code); }
        makeChange(doc, {from: from, to: to, text: code, origin: origin});
      }

      // Rebasing/resetting history to deal with externally-sourced changes

      function rebaseHistSelSingle(pos, from, to, diff) {
        if (to < pos.line) {
          pos.line += diff;
        } else if (from < pos.line) {
          pos.line = from;
          pos.ch = 0;
        }
      }

      // Tries to rebase an array of history events given a change in the
      // document. If the change touches the same lines as the event, the
      // event, and everything 'behind' it, is discarded. If the change is
      // before the event, the event's positions are updated. Uses a
      // copy-on-write scheme for the positions, to avoid having to
      // reallocate them all on every rebase, but also avoid problems with
      // shared position objects being unsafely updated.
      function rebaseHistArray(array, from, to, diff) {
        for (var i = 0; i < array.length; ++i) {
          var sub = array[i], ok = true;
          if (sub.ranges) {
            if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
            for (var j = 0; j < sub.ranges.length; j++) {
              rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
              rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
            }
            continue
          }
          for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
            var cur = sub.changes[j$1];
            if (to < cur.from.line) {
              cur.from = Pos(cur.from.line + diff, cur.from.ch);
              cur.to = Pos(cur.to.line + diff, cur.to.ch);
            } else if (from <= cur.to.line) {
              ok = false;
              break
            }
          }
          if (!ok) {
            array.splice(0, i + 1);
            i = 0;
          }
        }
      }

      function rebaseHist(hist, change) {
        var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
        rebaseHistArray(hist.done, from, to, diff);
        rebaseHistArray(hist.undone, from, to, diff);
      }

      // Utility for applying a change to a line by handle or number,
      // returning the number and optionally registering the line as
      // changed.
      function changeLine(doc, handle, changeType, op) {
        var no = handle, line = handle;
        if (typeof handle == "number") { line = getLine(doc, clipLine(doc, handle)); }
        else { no = lineNo(handle); }
        if (no == null) { return null }
        if (op(line, no) && doc.cm) { regLineChange(doc.cm, no, changeType); }
        return line
      }

      // The document is represented as a BTree consisting of leaves, with
      // chunk of lines in them, and branches, with up to ten leaves or
      // other branch nodes below them. The top node is always a branch
      // node, and is the document object itself (meaning it has
      // additional methods and properties).
      //
      // All nodes have parent links. The tree is used both to go from
      // line numbers to line objects, and to go from objects to numbers.
      // It also indexes by height, and is used to convert between height
      // and line object, and to find the total height of the document.
      //
      // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

      function LeafChunk(lines) {
        var this$1$1 = this;

        this.lines = lines;
        this.parent = null;
        var height = 0;
        for (var i = 0; i < lines.length; ++i) {
          lines[i].parent = this$1$1;
          height += lines[i].height;
        }
        this.height = height;
      }

      LeafChunk.prototype = {
        chunkSize: function() { return this.lines.length },

        // Remove the n lines at offset 'at'.
        removeInner: function(at, n) {
          var this$1$1 = this;

          for (var i = at, e = at + n; i < e; ++i) {
            var line = this$1$1.lines[i];
            this$1$1.height -= line.height;
            cleanUpLine(line);
            signalLater(line, "delete");
          }
          this.lines.splice(at, n);
        },

        // Helper used to collapse a small branch into a single leaf.
        collapse: function(lines) {
          lines.push.apply(lines, this.lines);
        },

        // Insert the given array of lines at offset 'at', count them as
        // having the given height.
        insertInner: function(at, lines, height) {
          var this$1$1 = this;

          this.height += height;
          this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
          for (var i = 0; i < lines.length; ++i) { lines[i].parent = this$1$1; }
        },

        // Used to iterate over a part of the tree.
        iterN: function(at, n, op) {
          var this$1$1 = this;

          for (var e = at + n; at < e; ++at)
            { if (op(this$1$1.lines[at])) { return true } }
        }
      };

      function BranchChunk(children) {
        var this$1$1 = this;

        this.children = children;
        var size = 0, height = 0;
        for (var i = 0; i < children.length; ++i) {
          var ch = children[i];
          size += ch.chunkSize(); height += ch.height;
          ch.parent = this$1$1;
        }
        this.size = size;
        this.height = height;
        this.parent = null;
      }

      BranchChunk.prototype = {
        chunkSize: function() { return this.size },

        removeInner: function(at, n) {
          var this$1$1 = this;

          this.size -= n;
          for (var i = 0; i < this.children.length; ++i) {
            var child = this$1$1.children[i], sz = child.chunkSize();
            if (at < sz) {
              var rm = Math.min(n, sz - at), oldHeight = child.height;
              child.removeInner(at, rm);
              this$1$1.height -= oldHeight - child.height;
              if (sz == rm) { this$1$1.children.splice(i--, 1); child.parent = null; }
              if ((n -= rm) == 0) { break }
              at = 0;
            } else { at -= sz; }
          }
          // If the result is smaller than 25 lines, ensure that it is a
          // single leaf node.
          if (this.size - n < 25 &&
              (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
            var lines = [];
            this.collapse(lines);
            this.children = [new LeafChunk(lines)];
            this.children[0].parent = this;
          }
        },

        collapse: function(lines) {
          var this$1$1 = this;

          for (var i = 0; i < this.children.length; ++i) { this$1$1.children[i].collapse(lines); }
        },

        insertInner: function(at, lines, height) {
          var this$1$1 = this;

          this.size += lines.length;
          this.height += height;
          for (var i = 0; i < this.children.length; ++i) {
            var child = this$1$1.children[i], sz = child.chunkSize();
            if (at <= sz) {
              child.insertInner(at, lines, height);
              if (child.lines && child.lines.length > 50) {
                // To avoid memory thrashing when child.lines is huge (e.g. first view of a large file), it's never spliced.
                // Instead, small slices are taken. They're taken in order because sequential memory accesses are fastest.
                var remaining = child.lines.length % 25 + 25;
                for (var pos = remaining; pos < child.lines.length;) {
                  var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                  child.height -= leaf.height;
                  this$1$1.children.splice(++i, 0, leaf);
                  leaf.parent = this$1$1;
                }
                child.lines = child.lines.slice(0, remaining);
                this$1$1.maybeSpill();
              }
              break
            }
            at -= sz;
          }
        },

        // When a node has grown, check whether it should be split.
        maybeSpill: function() {
          if (this.children.length <= 10) { return }
          var me = this;
          do {
            var spilled = me.children.splice(me.children.length - 5, 5);
            var sibling = new BranchChunk(spilled);
            if (!me.parent) { // Become the parent node
              var copy = new BranchChunk(me.children);
              copy.parent = me;
              me.children = [copy, sibling];
              me = copy;
           } else {
              me.size -= sibling.size;
              me.height -= sibling.height;
              var myIndex = indexOf(me.parent.children, me);
              me.parent.children.splice(myIndex + 1, 0, sibling);
            }
            sibling.parent = me.parent;
          } while (me.children.length > 10)
          me.parent.maybeSpill();
        },

        iterN: function(at, n, op) {
          var this$1$1 = this;

          for (var i = 0; i < this.children.length; ++i) {
            var child = this$1$1.children[i], sz = child.chunkSize();
            if (at < sz) {
              var used = Math.min(n, sz - at);
              if (child.iterN(at, used, op)) { return true }
              if ((n -= used) == 0) { break }
              at = 0;
            } else { at -= sz; }
          }
        }
      };

      // Line widgets are block elements displayed above or below a line.

      var LineWidget = function(doc, node, options) {
        var this$1$1 = this;

        if (options) { for (var opt in options) { if (options.hasOwnProperty(opt))
          { this$1$1[opt] = options[opt]; } } }
        this.doc = doc;
        this.node = node;
      };

      LineWidget.prototype.clear = function () {
          var this$1$1 = this;

        var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
        if (no == null || !ws) { return }
        for (var i = 0; i < ws.length; ++i) { if (ws[i] == this$1$1) { ws.splice(i--, 1); } }
        if (!ws.length) { line.widgets = null; }
        var height = widgetHeight(this);
        updateLineHeight(line, Math.max(0, line.height - height));
        if (cm) {
          runInOp(cm, function () {
            adjustScrollWhenAboveVisible(cm, line, -height);
            regLineChange(cm, no, "widget");
          });
          signalLater(cm, "lineWidgetCleared", cm, this, no);
        }
      };

      LineWidget.prototype.changed = function () {
          var this$1$1 = this;

        var oldH = this.height, cm = this.doc.cm, line = this.line;
        this.height = null;
        var diff = widgetHeight(this) - oldH;
        if (!diff) { return }
        if (!lineIsHidden(this.doc, line)) { updateLineHeight(line, line.height + diff); }
        if (cm) {
          runInOp(cm, function () {
            cm.curOp.forceUpdate = true;
            adjustScrollWhenAboveVisible(cm, line, diff);
            signalLater(cm, "lineWidgetChanged", cm, this$1$1, lineNo(line));
          });
        }
      };
      eventMixin(LineWidget);

      function adjustScrollWhenAboveVisible(cm, line, diff) {
        if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
          { addToScrollTop(cm, diff); }
      }

      function addLineWidget(doc, handle, node, options) {
        var widget = new LineWidget(doc, node, options);
        var cm = doc.cm;
        if (cm && widget.noHScroll) { cm.display.alignWidgets = true; }
        changeLine(doc, handle, "widget", function (line) {
          var widgets = line.widgets || (line.widgets = []);
          if (widget.insertAt == null) { widgets.push(widget); }
          else { widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget); }
          widget.line = line;
          if (cm && !lineIsHidden(doc, line)) {
            var aboveVisible = heightAtLine(line) < doc.scrollTop;
            updateLineHeight(line, line.height + widgetHeight(widget));
            if (aboveVisible) { addToScrollTop(cm, widget.height); }
            cm.curOp.forceUpdate = true;
          }
          return true
        });
        if (cm) { signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle)); }
        return widget
      }

      // TEXTMARKERS

      // Created with markText and setBookmark methods. A TextMarker is a
      // handle that can be used to clear or find a marked position in the
      // document. Line objects hold arrays (markedSpans) containing
      // {from, to, marker} object pointing to such marker objects, and
      // indicating that such a marker is present on that line. Multiple
      // lines may point to the same marker when it spans across lines.
      // The spans will have null for their from/to properties when the
      // marker continues beyond the start/end of the line. Markers have
      // links back to the lines they currently touch.

      // Collapsed markers have unique ids, in order to be able to order
      // them, which is needed for uniquely determining an outer marker
      // when they overlap (they may nest, but not partially overlap).
      var nextMarkerId = 0;

      var TextMarker = function(doc, type) {
        this.lines = [];
        this.type = type;
        this.doc = doc;
        this.id = ++nextMarkerId;
      };

      // Clear the marker.
      TextMarker.prototype.clear = function () {
          var this$1$1 = this;

        if (this.explicitlyCleared) { return }
        var cm = this.doc.cm, withOp = cm && !cm.curOp;
        if (withOp) { startOperation(cm); }
        if (hasHandler(this, "clear")) {
          var found = this.find();
          if (found) { signalLater(this, "clear", found.from, found.to); }
        }
        var min = null, max = null;
        for (var i = 0; i < this.lines.length; ++i) {
          var line = this$1$1.lines[i];
          var span = getMarkedSpanFor(line.markedSpans, this$1$1);
          if (cm && !this$1$1.collapsed) { regLineChange(cm, lineNo(line), "text"); }
          else if (cm) {
            if (span.to != null) { max = lineNo(line); }
            if (span.from != null) { min = lineNo(line); }
          }
          line.markedSpans = removeMarkedSpan(line.markedSpans, span);
          if (span.from == null && this$1$1.collapsed && !lineIsHidden(this$1$1.doc, line) && cm)
            { updateLineHeight(line, textHeight(cm.display)); }
        }
        if (cm && this.collapsed && !cm.options.lineWrapping) { for (var i$1 = 0; i$1 < this.lines.length; ++i$1) {
          var visual = visualLine(this$1$1.lines[i$1]), len = lineLength(visual);
          if (len > cm.display.maxLineLength) {
            cm.display.maxLine = visual;
            cm.display.maxLineLength = len;
            cm.display.maxLineChanged = true;
          }
        } }

        if (min != null && cm && this.collapsed) { regChange(cm, min, max + 1); }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
          this.doc.cantEdit = false;
          if (cm) { reCheckSelection(cm.doc); }
        }
        if (cm) { signalLater(cm, "markerCleared", cm, this, min, max); }
        if (withOp) { endOperation(cm); }
        if (this.parent) { this.parent.clear(); }
      };

      // Find the position of the marker in the document. Returns a {from,
      // to} object by default. Side can be passed to get a specific side
      // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
      // Pos objects returned contain a line object, rather than a line
      // number (used to prevent looking up the same line twice).
      TextMarker.prototype.find = function (side, lineObj) {
          var this$1$1 = this;

        if (side == null && this.type == "bookmark") { side = 1; }
        var from, to;
        for (var i = 0; i < this.lines.length; ++i) {
          var line = this$1$1.lines[i];
          var span = getMarkedSpanFor(line.markedSpans, this$1$1);
          if (span.from != null) {
            from = Pos(lineObj ? line : lineNo(line), span.from);
            if (side == -1) { return from }
          }
          if (span.to != null) {
            to = Pos(lineObj ? line : lineNo(line), span.to);
            if (side == 1) { return to }
          }
        }
        return from && {from: from, to: to}
      };

      // Signals that the marker's widget changed, and surrounding layout
      // should be recomputed.
      TextMarker.prototype.changed = function () {
          var this$1$1 = this;

        var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
        if (!pos || !cm) { return }
        runInOp(cm, function () {
          var line = pos.line, lineN = lineNo(pos.line);
          var view = findViewForLine(cm, lineN);
          if (view) {
            clearLineMeasurementCacheFor(view);
            cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
          }
          cm.curOp.updateMaxLine = true;
          if (!lineIsHidden(widget.doc, line) && widget.height != null) {
            var oldHeight = widget.height;
            widget.height = null;
            var dHeight = widgetHeight(widget) - oldHeight;
            if (dHeight)
              { updateLineHeight(line, line.height + dHeight); }
          }
          signalLater(cm, "markerChanged", cm, this$1$1);
        });
      };

      TextMarker.prototype.attachLine = function (line) {
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp;
          if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
            { (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this); }
        }
        this.lines.push(line);
      };

      TextMarker.prototype.detachLine = function (line) {
        this.lines.splice(indexOf(this.lines, line), 1);
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp
          ;(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
        }
      };
      eventMixin(TextMarker);

      // Create a marker, wire it up to the right lines, and
      function markText(doc, from, to, options, type) {
        // Shared markers (across linked documents) are handled separately
        // (markTextShared will call out to this again, once per
        // document).
        if (options && options.shared) { return markTextShared(doc, from, to, options, type) }
        // Ensure we are in an operation.
        if (doc.cm && !doc.cm.curOp) { return operation(doc.cm, markText)(doc, from, to, options, type) }

        var marker = new TextMarker(doc, type), diff = cmp(from, to);
        if (options) { copyObj(options, marker, false); }
        // Don't connect empty markers unless clearWhenEmpty is false
        if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
          { return marker }
        if (marker.replacedWith) {
          // Showing up as a widget implies collapsed (widget replaces text)
          marker.collapsed = true;
          marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
          if (!options.handleMouseEvents) { marker.widgetNode.setAttribute("cm-ignore-events", "true"); }
          if (options.insertLeft) { marker.widgetNode.insertLeft = true; }
        }
        if (marker.collapsed) {
          if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
              from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
            { throw new Error("Inserting collapsed marker partially overlapping an existing one") }
          seeCollapsedSpans();
        }

        if (marker.addToHistory)
          { addChangeToHistory(doc, {from: from, to: to, origin: "markText"}, doc.sel, NaN); }

        var curLine = from.line, cm = doc.cm, updateMaxLine;
        doc.iter(curLine, to.line + 1, function (line) {
          if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
            { updateMaxLine = true; }
          if (marker.collapsed && curLine != from.line) { updateLineHeight(line, 0); }
          addMarkedSpan(line, new MarkedSpan(marker,
                                             curLine == from.line ? from.ch : null,
                                             curLine == to.line ? to.ch : null));
          ++curLine;
        });
        // lineIsHidden depends on the presence of the spans, so needs a second pass
        if (marker.collapsed) { doc.iter(from.line, to.line + 1, function (line) {
          if (lineIsHidden(doc, line)) { updateLineHeight(line, 0); }
        }); }

        if (marker.clearOnEnter) { on(marker, "beforeCursorEnter", function () { return marker.clear(); }); }

        if (marker.readOnly) {
          seeReadOnlySpans();
          if (doc.history.done.length || doc.history.undone.length)
            { doc.clearHistory(); }
        }
        if (marker.collapsed) {
          marker.id = ++nextMarkerId;
          marker.atomic = true;
        }
        if (cm) {
          // Sync editor state
          if (updateMaxLine) { cm.curOp.updateMaxLine = true; }
          if (marker.collapsed)
            { regChange(cm, from.line, to.line + 1); }
          else if (marker.className || marker.startStyle || marker.endStyle || marker.css ||
                   marker.attributes || marker.title)
            { for (var i = from.line; i <= to.line; i++) { regLineChange(cm, i, "text"); } }
          if (marker.atomic) { reCheckSelection(cm.doc); }
          signalLater(cm, "markerAdded", cm, marker);
        }
        return marker
      }

      // SHARED TEXTMARKERS

      // A shared marker spans multiple linked documents. It is
      // implemented as a meta-marker-object controlling multiple normal
      // markers.
      var SharedTextMarker = function(markers, primary) {
        var this$1$1 = this;

        this.markers = markers;
        this.primary = primary;
        for (var i = 0; i < markers.length; ++i)
          { markers[i].parent = this$1$1; }
      };

      SharedTextMarker.prototype.clear = function () {
          var this$1$1 = this;

        if (this.explicitlyCleared) { return }
        this.explicitlyCleared = true;
        for (var i = 0; i < this.markers.length; ++i)
          { this$1$1.markers[i].clear(); }
        signalLater(this, "clear");
      };

      SharedTextMarker.prototype.find = function (side, lineObj) {
        return this.primary.find(side, lineObj)
      };
      eventMixin(SharedTextMarker);

      function markTextShared(doc, from, to, options, type) {
        options = copyObj(options);
        options.shared = false;
        var markers = [markText(doc, from, to, options, type)], primary = markers[0];
        var widget = options.widgetNode;
        linkedDocs(doc, function (doc) {
          if (widget) { options.widgetNode = widget.cloneNode(true); }
          markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
          for (var i = 0; i < doc.linked.length; ++i)
            { if (doc.linked[i].isParent) { return } }
          primary = lst(markers);
        });
        return new SharedTextMarker(markers, primary)
      }

      function findSharedMarkers(doc) {
        return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function (m) { return m.parent; })
      }

      function copySharedMarkers(doc, markers) {
        for (var i = 0; i < markers.length; i++) {
          var marker = markers[i], pos = marker.find();
          var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
          if (cmp(mFrom, mTo)) {
            var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
            marker.markers.push(subMark);
            subMark.parent = marker;
          }
        }
      }

      function detachSharedMarkers(markers) {
        var loop = function ( i ) {
          var marker = markers[i], linked = [marker.primary.doc];
          linkedDocs(marker.primary.doc, function (d) { return linked.push(d); });
          for (var j = 0; j < marker.markers.length; j++) {
            var subMarker = marker.markers[j];
            if (indexOf(linked, subMarker.doc) == -1) {
              subMarker.parent = null;
              marker.markers.splice(j--, 1);
            }
          }
        };

        for (var i = 0; i < markers.length; i++) loop( i );
      }

      var nextDocId = 0;
      var Doc = function(text, mode, firstLine, lineSep, direction) {
        if (!(this instanceof Doc)) { return new Doc(text, mode, firstLine, lineSep, direction) }
        if (firstLine == null) { firstLine = 0; }

        BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
        this.first = firstLine;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.modeFrontier = this.highlightFrontier = firstLine;
        var start = Pos(firstLine, 0);
        this.sel = simpleSelection(start);
        this.history = new History(null);
        this.id = ++nextDocId;
        this.modeOption = mode;
        this.lineSep = lineSep;
        this.direction = (direction == "rtl") ? "rtl" : "ltr";
        this.extend = false;

        if (typeof text == "string") { text = this.splitLines(text); }
        updateDoc(this, {from: start, to: start, text: text});
        setSelection(this, simpleSelection(start), sel_dontScroll);
      };

      Doc.prototype = createObj(BranchChunk.prototype, {
        constructor: Doc,
        // Iterate over the document. Supports two forms -- with only one
        // argument, it calls that for each line in the document. With
        // three, it iterates over the range given by the first two (with
        // the second being non-inclusive).
        iter: function(from, to, op) {
          if (op) { this.iterN(from - this.first, to - from, op); }
          else { this.iterN(this.first, this.first + this.size, from); }
        },

        // Non-public interface for adding and removing lines.
        insert: function(at, lines) {
          var height = 0;
          for (var i = 0; i < lines.length; ++i) { height += lines[i].height; }
          this.insertInner(at - this.first, lines, height);
        },
        remove: function(at, n) { this.removeInner(at - this.first, n); },

        // From here, the methods are part of the public interface. Most
        // are also available from CodeMirror (editor) instances.

        getValue: function(lineSep) {
          var lines = getLines(this, this.first, this.first + this.size);
          if (lineSep === false) { return lines }
          return lines.join(lineSep || this.lineSeparator())
        },
        setValue: docMethodOp(function(code) {
          var top = Pos(this.first, 0), last = this.first + this.size - 1;
          makeChange(this, {from: top, to: Pos(last, getLine(this, last).text.length),
                            text: this.splitLines(code), origin: "setValue", full: true}, true);
          if (this.cm) { scrollToCoords(this.cm, 0, 0); }
          setSelection(this, simpleSelection(top), sel_dontScroll);
        }),
        replaceRange: function(code, from, to, origin) {
          from = clipPos(this, from);
          to = to ? clipPos(this, to) : from;
          replaceRange(this, code, from, to, origin);
        },
        getRange: function(from, to, lineSep) {
          var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
          if (lineSep === false) { return lines }
          return lines.join(lineSep || this.lineSeparator())
        },

        getLine: function(line) {var l = this.getLineHandle(line); return l && l.text},

        getLineHandle: function(line) {if (isLine(this, line)) { return getLine(this, line) }},
        getLineNumber: function(line) {return lineNo(line)},

        getLineHandleVisualStart: function(line) {
          if (typeof line == "number") { line = getLine(this, line); }
          return visualLine(line)
        },

        lineCount: function() {return this.size},
        firstLine: function() {return this.first},
        lastLine: function() {return this.first + this.size - 1},

        clipPos: function(pos) {return clipPos(this, pos)},

        getCursor: function(start) {
          var range$$1 = this.sel.primary(), pos;
          if (start == null || start == "head") { pos = range$$1.head; }
          else if (start == "anchor") { pos = range$$1.anchor; }
          else if (start == "end" || start == "to" || start === false) { pos = range$$1.to(); }
          else { pos = range$$1.from(); }
          return pos
        },
        listSelections: function() { return this.sel.ranges },
        somethingSelected: function() {return this.sel.somethingSelected()},

        setCursor: docMethodOp(function(line, ch, options) {
          setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
        }),
        setSelection: docMethodOp(function(anchor, head, options) {
          setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
        }),
        extendSelection: docMethodOp(function(head, other, options) {
          extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
        }),
        extendSelections: docMethodOp(function(heads, options) {
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        extendSelectionsBy: docMethodOp(function(f, options) {
          var heads = map(this.sel.ranges, f);
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        setSelections: docMethodOp(function(ranges, primary, options) {
          var this$1$1 = this;

          if (!ranges.length) { return }
          var out = [];
          for (var i = 0; i < ranges.length; i++)
            { out[i] = new Range(clipPos(this$1$1, ranges[i].anchor),
                               clipPos(this$1$1, ranges[i].head)); }
          if (primary == null) { primary = Math.min(ranges.length - 1, this.sel.primIndex); }
          setSelection(this, normalizeSelection(this.cm, out, primary), options);
        }),
        addSelection: docMethodOp(function(anchor, head, options) {
          var ranges = this.sel.ranges.slice(0);
          ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
          setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
        }),

        getSelection: function(lineSep) {
          var this$1$1 = this;

          var ranges = this.sel.ranges, lines;
          for (var i = 0; i < ranges.length; i++) {
            var sel = getBetween(this$1$1, ranges[i].from(), ranges[i].to());
            lines = lines ? lines.concat(sel) : sel;
          }
          if (lineSep === false) { return lines }
          else { return lines.join(lineSep || this.lineSeparator()) }
        },
        getSelections: function(lineSep) {
          var this$1$1 = this;

          var parts = [], ranges = this.sel.ranges;
          for (var i = 0; i < ranges.length; i++) {
            var sel = getBetween(this$1$1, ranges[i].from(), ranges[i].to());
            if (lineSep !== false) { sel = sel.join(lineSep || this$1$1.lineSeparator()); }
            parts[i] = sel;
          }
          return parts
        },
        replaceSelection: function(code, collapse, origin) {
          var dup = [];
          for (var i = 0; i < this.sel.ranges.length; i++)
            { dup[i] = code; }
          this.replaceSelections(dup, collapse, origin || "+input");
        },
        replaceSelections: docMethodOp(function(code, collapse, origin) {
          var this$1$1 = this;

          var changes = [], sel = this.sel;
          for (var i = 0; i < sel.ranges.length; i++) {
            var range$$1 = sel.ranges[i];
            changes[i] = {from: range$$1.from(), to: range$$1.to(), text: this$1$1.splitLines(code[i]), origin: origin};
          }
          var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
          for (var i$1 = changes.length - 1; i$1 >= 0; i$1--)
            { makeChange(this$1$1, changes[i$1]); }
          if (newSel) { setSelectionReplaceHistory(this, newSel); }
          else if (this.cm) { ensureCursorVisible(this.cm); }
        }),
        undo: docMethodOp(function() {makeChangeFromHistory(this, "undo");}),
        redo: docMethodOp(function() {makeChangeFromHistory(this, "redo");}),
        undoSelection: docMethodOp(function() {makeChangeFromHistory(this, "undo", true);}),
        redoSelection: docMethodOp(function() {makeChangeFromHistory(this, "redo", true);}),

        setExtending: function(val) {this.extend = val;},
        getExtending: function() {return this.extend},

        historySize: function() {
          var hist = this.history, done = 0, undone = 0;
          for (var i = 0; i < hist.done.length; i++) { if (!hist.done[i].ranges) { ++done; } }
          for (var i$1 = 0; i$1 < hist.undone.length; i$1++) { if (!hist.undone[i$1].ranges) { ++undone; } }
          return {undo: done, redo: undone}
        },
        clearHistory: function() {this.history = new History(this.history.maxGeneration);},

        markClean: function() {
          this.cleanGeneration = this.changeGeneration(true);
        },
        changeGeneration: function(forceSplit) {
          if (forceSplit)
            { this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null; }
          return this.history.generation
        },
        isClean: function (gen) {
          return this.history.generation == (gen || this.cleanGeneration)
        },

        getHistory: function() {
          return {done: copyHistoryArray(this.history.done),
                  undone: copyHistoryArray(this.history.undone)}
        },
        setHistory: function(histData) {
          var hist = this.history = new History(this.history.maxGeneration);
          hist.done = copyHistoryArray(histData.done.slice(0), null, true);
          hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
        },

        setGutterMarker: docMethodOp(function(line, gutterID, value) {
          return changeLine(this, line, "gutter", function (line) {
            var markers = line.gutterMarkers || (line.gutterMarkers = {});
            markers[gutterID] = value;
            if (!value && isEmpty(markers)) { line.gutterMarkers = null; }
            return true
          })
        }),

        clearGutter: docMethodOp(function(gutterID) {
          var this$1$1 = this;

          this.iter(function (line) {
            if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
              changeLine(this$1$1, line, "gutter", function () {
                line.gutterMarkers[gutterID] = null;
                if (isEmpty(line.gutterMarkers)) { line.gutterMarkers = null; }
                return true
              });
            }
          });
        }),

        lineInfo: function(line) {
          var n;
          if (typeof line == "number") {
            if (!isLine(this, line)) { return null }
            n = line;
            line = getLine(this, line);
            if (!line) { return null }
          } else {
            n = lineNo(line);
            if (n == null) { return null }
          }
          return {line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
                  textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
                  widgets: line.widgets}
        },

        addLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
            var prop = where == "text" ? "textClass"
                     : where == "background" ? "bgClass"
                     : where == "gutter" ? "gutterClass" : "wrapClass";
            if (!line[prop]) { line[prop] = cls; }
            else if (classTest(cls).test(line[prop])) { return false }
            else { line[prop] += " " + cls; }
            return true
          })
        }),
        removeLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
            var prop = where == "text" ? "textClass"
                     : where == "background" ? "bgClass"
                     : where == "gutter" ? "gutterClass" : "wrapClass";
            var cur = line[prop];
            if (!cur) { return false }
            else if (cls == null) { line[prop] = null; }
            else {
              var found = cur.match(classTest(cls));
              if (!found) { return false }
              var end = found.index + found[0].length;
              line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
            }
            return true
          })
        }),

        addLineWidget: docMethodOp(function(handle, node, options) {
          return addLineWidget(this, handle, node, options)
        }),
        removeLineWidget: function(widget) { widget.clear(); },

        markText: function(from, to, options) {
          return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range")
        },
        setBookmark: function(pos, options) {
          var realOpts = {replacedWith: options && (options.nodeType == null ? options.widget : options),
                          insertLeft: options && options.insertLeft,
                          clearWhenEmpty: false, shared: options && options.shared,
                          handleMouseEvents: options && options.handleMouseEvents};
          pos = clipPos(this, pos);
          return markText(this, pos, pos, realOpts, "bookmark")
        },
        findMarksAt: function(pos) {
          pos = clipPos(this, pos);
          var markers = [], spans = getLine(this, pos.line).markedSpans;
          if (spans) { for (var i = 0; i < spans.length; ++i) {
            var span = spans[i];
            if ((span.from == null || span.from <= pos.ch) &&
                (span.to == null || span.to >= pos.ch))
              { markers.push(span.marker.parent || span.marker); }
          } }
          return markers
        },
        findMarks: function(from, to, filter) {
          from = clipPos(this, from); to = clipPos(this, to);
          var found = [], lineNo$$1 = from.line;
          this.iter(from.line, to.line + 1, function (line) {
            var spans = line.markedSpans;
            if (spans) { for (var i = 0; i < spans.length; i++) {
              var span = spans[i];
              if (!(span.to != null && lineNo$$1 == from.line && from.ch >= span.to ||
                    span.from == null && lineNo$$1 != from.line ||
                    span.from != null && lineNo$$1 == to.line && span.from >= to.ch) &&
                  (!filter || filter(span.marker)))
                { found.push(span.marker.parent || span.marker); }
            } }
            ++lineNo$$1;
          });
          return found
        },
        getAllMarks: function() {
          var markers = [];
          this.iter(function (line) {
            var sps = line.markedSpans;
            if (sps) { for (var i = 0; i < sps.length; ++i)
              { if (sps[i].from != null) { markers.push(sps[i].marker); } } }
          });
          return markers
        },

        posFromIndex: function(off) {
          var ch, lineNo$$1 = this.first, sepSize = this.lineSeparator().length;
          this.iter(function (line) {
            var sz = line.text.length + sepSize;
            if (sz > off) { ch = off; return true }
            off -= sz;
            ++lineNo$$1;
          });
          return clipPos(this, Pos(lineNo$$1, ch))
        },
        indexFromPos: function (coords) {
          coords = clipPos(this, coords);
          var index = coords.ch;
          if (coords.line < this.first || coords.ch < 0) { return 0 }
          var sepSize = this.lineSeparator().length;
          this.iter(this.first, coords.line, function (line) { // iter aborts when callback returns a truthy value
            index += line.text.length + sepSize;
          });
          return index
        },

        copy: function(copyHistory) {
          var doc = new Doc(getLines(this, this.first, this.first + this.size),
                            this.modeOption, this.first, this.lineSep, this.direction);
          doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
          doc.sel = this.sel;
          doc.extend = false;
          if (copyHistory) {
            doc.history.undoDepth = this.history.undoDepth;
            doc.setHistory(this.getHistory());
          }
          return doc
        },

        linkedDoc: function(options) {
          if (!options) { options = {}; }
          var from = this.first, to = this.first + this.size;
          if (options.from != null && options.from > from) { from = options.from; }
          if (options.to != null && options.to < to) { to = options.to; }
          var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
          if (options.sharedHist) { copy.history = this.history
          ; }(this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
          copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
          copySharedMarkers(copy, findSharedMarkers(this));
          return copy
        },
        unlinkDoc: function(other) {
          var this$1$1 = this;

          if (other instanceof CodeMirror) { other = other.doc; }
          if (this.linked) { for (var i = 0; i < this.linked.length; ++i) {
            var link = this$1$1.linked[i];
            if (link.doc != other) { continue }
            this$1$1.linked.splice(i, 1);
            other.unlinkDoc(this$1$1);
            detachSharedMarkers(findSharedMarkers(this$1$1));
            break
          } }
          // If the histories were shared, split them again
          if (other.history == this.history) {
            var splitIds = [other.id];
            linkedDocs(other, function (doc) { return splitIds.push(doc.id); }, true);
            other.history = new History(null);
            other.history.done = copyHistoryArray(this.history.done, splitIds);
            other.history.undone = copyHistoryArray(this.history.undone, splitIds);
          }
        },
        iterLinkedDocs: function(f) {linkedDocs(this, f);},

        getMode: function() {return this.mode},
        getEditor: function() {return this.cm},

        splitLines: function(str) {
          if (this.lineSep) { return str.split(this.lineSep) }
          return splitLinesAuto(str)
        },
        lineSeparator: function() { return this.lineSep || "\n" },

        setDirection: docMethodOp(function (dir) {
          if (dir != "rtl") { dir = "ltr"; }
          if (dir == this.direction) { return }
          this.direction = dir;
          this.iter(function (line) { return line.order = null; });
          if (this.cm) { directionChanged(this.cm); }
        })
      });

      // Public alias.
      Doc.prototype.eachLine = Doc.prototype.iter;

      // Kludge to work around strange IE behavior where it'll sometimes
      // re-fire a series of drag-related events right after the drop (#1551)
      var lastDrop = 0;

      function onDrop(e) {
        var cm = this;
        clearDragCursor(cm);
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
          { return }
        e_preventDefault(e);
        if (ie) { lastDrop = +new Date; }
        var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
        if (!pos || cm.isReadOnly()) { return }
        // Might be a file drop, in which case we simply extract the text
        // and insert it.
        if (files && files.length && window.FileReader && window.File) {
          var n = files.length, text = Array(n), read = 0;
          var loadFile = function (file, i) {
            if (cm.options.allowDropFileTypes &&
                indexOf(cm.options.allowDropFileTypes, file.type) == -1)
              { return }

            var reader = new FileReader;
            reader.onload = operation(cm, function () {
              var content = reader.result;
              if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) { content = ""; }
              text[i] = content;
              if (++read == n) {
                pos = clipPos(cm.doc, pos);
                var change = {from: pos, to: pos,
                              text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
                              origin: "paste"};
                makeChange(cm.doc, change);
                setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
              }
            });
            reader.readAsText(file);
          };
          for (var i = 0; i < n; ++i) { loadFile(files[i], i); }
        } else { // Normal drop
          // Don't do a replace if the drop happened inside of the selected text.
          if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
            cm.state.draggingText(e);
            // Ensure the editor is re-focused
            setTimeout(function () { return cm.display.input.focus(); }, 20);
            return
          }
          try {
            var text$1 = e.dataTransfer.getData("Text");
            if (text$1) {
              var selected;
              if (cm.state.draggingText && !cm.state.draggingText.copy)
                { selected = cm.listSelections(); }
              setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
              if (selected) { for (var i$1 = 0; i$1 < selected.length; ++i$1)
                { replaceRange(cm.doc, "", selected[i$1].anchor, selected[i$1].head, "drag"); } }
              cm.replaceSelection(text$1, "around", "paste");
              cm.display.input.focus();
            }
          }
          catch(e){}
        }
      }

      function onDragStart(cm, e) {
        if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return }
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) { return }

        e.dataTransfer.setData("Text", cm.getSelection());
        e.dataTransfer.effectAllowed = "copyMove";

        // Use dummy image instead of default browsers image.
        // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
        if (e.dataTransfer.setDragImage && !safari) {
          var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
          img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          if (presto) {
            img.width = img.height = 1;
            cm.display.wrapper.appendChild(img);
            // Force a relayout, or Opera won't use our image for some obscure reason
            img._top = img.offsetTop;
          }
          e.dataTransfer.setDragImage(img, 0, 0);
          if (presto) { img.parentNode.removeChild(img); }
        }
      }

      function onDragOver(cm, e) {
        var pos = posFromMouse(cm, e);
        if (!pos) { return }
        var frag = document.createDocumentFragment();
        drawSelectionCursor(cm, pos, frag);
        if (!cm.display.dragCursor) {
          cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
          cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
        }
        removeChildrenAndAdd(cm.display.dragCursor, frag);
      }

      function clearDragCursor(cm) {
        if (cm.display.dragCursor) {
          cm.display.lineSpace.removeChild(cm.display.dragCursor);
          cm.display.dragCursor = null;
        }
      }

      // These must be handled carefully, because naively registering a
      // handler for each editor will cause the editors to never be
      // garbage collected.

      function forEachCodeMirror(f) {
        if (!document.getElementsByClassName) { return }
        var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
        for (var i = 0; i < byClass.length; i++) {
          var cm = byClass[i].CodeMirror;
          if (cm) { editors.push(cm); }
        }
        if (editors.length) { editors[0].operation(function () {
          for (var i = 0; i < editors.length; i++) { f(editors[i]); }
        }); }
      }

      var globalsRegistered = false;
      function ensureGlobalHandlers() {
        if (globalsRegistered) { return }
        registerGlobalHandlers();
        globalsRegistered = true;
      }
      function registerGlobalHandlers() {
        // When the window resizes, we need to refresh active editors.
        var resizeTimer;
        on(window, "resize", function () {
          if (resizeTimer == null) { resizeTimer = setTimeout(function () {
            resizeTimer = null;
            forEachCodeMirror(onResize);
          }, 100); }
        });
        // When the window loses focus, we want to show the editor as blurred
        on(window, "blur", function () { return forEachCodeMirror(onBlur); });
      }
      // Called when the window resizes
      function onResize(cm) {
        var d = cm.display;
        // Might be a text scaling operation, clear size caches.
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.scrollbarsClipped = false;
        cm.setSize();
      }

      var keyNames = {
        3: "Pause", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
        19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
        36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
        46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
        106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 145: "ScrollLock",
        173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
        221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
        63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
      };

      // Number keys
      for (var i = 0; i < 10; i++) { keyNames[i + 48] = keyNames[i + 96] = String(i); }
      // Alphabetic keys
      for (var i$1 = 65; i$1 <= 90; i$1++) { keyNames[i$1] = String.fromCharCode(i$1); }
      // Function keys
      for (var i$2 = 1; i$2 <= 12; i$2++) { keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2; }

      var keyMap = {};

      keyMap.basic = {
        "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
        "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
        "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
        "Tab": "defaultTab", "Shift-Tab": "indentAuto",
        "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
        "Esc": "singleSelection"
      };
      // Note that the save and find-related commands aren't defined by
      // default. User code or addons can define them. Unknown commands
      // are simply ignored.
      keyMap.pcDefault = {
        "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
        "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
        "fallthrough": "basic"
      };
      // Very basic readline/emacs-style bindings, which are standard on Mac.
      keyMap.emacsy = {
        "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
      };
      keyMap.macDefault = {
        "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
        "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
        "fallthrough": ["basic", "emacsy"]
      };
      keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

      // KEYMAP DISPATCH

      function normalizeKeyName(name) {
        var parts = name.split(/-(?!$)/);
        name = parts[parts.length - 1];
        var alt, ctrl, shift, cmd;
        for (var i = 0; i < parts.length - 1; i++) {
          var mod = parts[i];
          if (/^(cmd|meta|m)$/i.test(mod)) { cmd = true; }
          else if (/^a(lt)?$/i.test(mod)) { alt = true; }
          else if (/^(c|ctrl|control)$/i.test(mod)) { ctrl = true; }
          else if (/^s(hift)?$/i.test(mod)) { shift = true; }
          else { throw new Error("Unrecognized modifier name: " + mod) }
        }
        if (alt) { name = "Alt-" + name; }
        if (ctrl) { name = "Ctrl-" + name; }
        if (cmd) { name = "Cmd-" + name; }
        if (shift) { name = "Shift-" + name; }
        return name
      }

      // This is a kludge to keep keymaps mostly working as raw objects
      // (backwards compatibility) while at the same time support features
      // like normalization and multi-stroke key bindings. It compiles a
      // new normalized keymap, and then updates the old object to reflect
      // this.
      function normalizeKeyMap(keymap) {
        var copy = {};
        for (var keyname in keymap) { if (keymap.hasOwnProperty(keyname)) {
          var value = keymap[keyname];
          if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) { continue }
          if (value == "...") { delete keymap[keyname]; continue }

          var keys = map(keyname.split(" "), normalizeKeyName);
          for (var i = 0; i < keys.length; i++) {
            var val = (void 0), name = (void 0);
            if (i == keys.length - 1) {
              name = keys.join(" ");
              val = value;
            } else {
              name = keys.slice(0, i + 1).join(" ");
              val = "...";
            }
            var prev = copy[name];
            if (!prev) { copy[name] = val; }
            else if (prev != val) { throw new Error("Inconsistent bindings for " + name) }
          }
          delete keymap[keyname];
        } }
        for (var prop in copy) { keymap[prop] = copy[prop]; }
        return keymap
      }

      function lookupKey(key, map$$1, handle, context) {
        map$$1 = getKeyMap(map$$1);
        var found = map$$1.call ? map$$1.call(key, context) : map$$1[key];
        if (found === false) { return "nothing" }
        if (found === "...") { return "multi" }
        if (found != null && handle(found)) { return "handled" }

        if (map$$1.fallthrough) {
          if (Object.prototype.toString.call(map$$1.fallthrough) != "[object Array]")
            { return lookupKey(key, map$$1.fallthrough, handle, context) }
          for (var i = 0; i < map$$1.fallthrough.length; i++) {
            var result = lookupKey(key, map$$1.fallthrough[i], handle, context);
            if (result) { return result }
          }
        }
      }

      // Modifier key presses don't count as 'real' key presses for the
      // purpose of keymap fallthrough.
      function isModifierKey(value) {
        var name = typeof value == "string" ? value : keyNames[value.keyCode];
        return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod"
      }

      function addModifierNames(name, event, noShift) {
        var base = name;
        if (event.altKey && base != "Alt") { name = "Alt-" + name; }
        if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") { name = "Ctrl-" + name; }
        if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") { name = "Cmd-" + name; }
        if (!noShift && event.shiftKey && base != "Shift") { name = "Shift-" + name; }
        return name
      }

      // Look up the name of a key as indicated by an event object.
      function keyName(event, noShift) {
        if (presto && event.keyCode == 34 && event["char"]) { return false }
        var name = keyNames[event.keyCode];
        if (name == null || event.altGraphKey) { return false }
        // Ctrl-ScrollLock has keyCode 3, same as Ctrl-Pause,
        // so we'll use event.code when available (Chrome 48+, FF 38+, Safari 10.1+)
        if (event.keyCode == 3 && event.code) { name = event.code; }
        return addModifierNames(name, event, noShift)
      }

      function getKeyMap(val) {
        return typeof val == "string" ? keyMap[val] : val
      }

      // Helper for deleting text near the selection(s), used to implement
      // backspace, delete, and similar functionality.
      function deleteNearSelection(cm, compute) {
        var ranges = cm.doc.sel.ranges, kill = [];
        // Build up a set of ranges to kill first, merging overlapping
        // ranges.
        for (var i = 0; i < ranges.length; i++) {
          var toKill = compute(ranges[i]);
          while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
            var replaced = kill.pop();
            if (cmp(replaced.from, toKill.from) < 0) {
              toKill.from = replaced.from;
              break
            }
          }
          kill.push(toKill);
        }
        // Next, remove those actual ranges.
        runInOp(cm, function () {
          for (var i = kill.length - 1; i >= 0; i--)
            { replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete"); }
          ensureCursorVisible(cm);
        });
      }

      function moveCharLogically(line, ch, dir) {
        var target = skipExtendingChars(line.text, ch + dir, dir);
        return target < 0 || target > line.text.length ? null : target
      }

      function moveLogically(line, start, dir) {
        var ch = moveCharLogically(line, start.ch, dir);
        return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before")
      }

      function endOfLine(visually, cm, lineObj, lineNo, dir) {
        if (visually) {
          var order = getOrder(lineObj, cm.doc.direction);
          if (order) {
            var part = dir < 0 ? lst(order) : order[0];
            var moveInStorageOrder = (dir < 0) == (part.level == 1);
            var sticky = moveInStorageOrder ? "after" : "before";
            var ch;
            // With a wrapped rtl chunk (possibly spanning multiple bidi parts),
            // it could be that the last bidi part is not on the last visual line,
            // since visual lines contain content order-consecutive chunks.
            // Thus, in rtl, we are looking for the first (content-order) character
            // in the rtl chunk that is on the last line (that is, the same line
            // as the last (content-order) character).
            if (part.level > 0 || cm.doc.direction == "rtl") {
              var prep = prepareMeasureForLine(cm, lineObj);
              ch = dir < 0 ? lineObj.text.length - 1 : 0;
              var targetTop = measureCharPrepared(cm, prep, ch).top;
              ch = findFirst(function (ch) { return measureCharPrepared(cm, prep, ch).top == targetTop; }, (dir < 0) == (part.level == 1) ? part.from : part.to - 1, ch);
              if (sticky == "before") { ch = moveCharLogically(lineObj, ch, 1); }
            } else { ch = dir < 0 ? part.to : part.from; }
            return new Pos(lineNo, ch, sticky)
          }
        }
        return new Pos(lineNo, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after")
      }

      function moveVisually(cm, line, start, dir) {
        var bidi = getOrder(line, cm.doc.direction);
        if (!bidi) { return moveLogically(line, start, dir) }
        if (start.ch >= line.text.length) {
          start.ch = line.text.length;
          start.sticky = "before";
        } else if (start.ch <= 0) {
          start.ch = 0;
          start.sticky = "after";
        }
        var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
        if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
          // Case 1: We move within an ltr part in an ltr editor. Even with wrapped lines,
          // nothing interesting happens.
          return moveLogically(line, start, dir)
        }

        var mv = function (pos, dir) { return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir); };
        var prep;
        var getWrappedLineExtent = function (ch) {
          if (!cm.options.lineWrapping) { return {begin: 0, end: line.text.length} }
          prep = prep || prepareMeasureForLine(cm, line);
          return wrappedLineExtentChar(cm, line, prep, ch)
        };
        var wrappedLineExtent = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);

        if (cm.doc.direction == "rtl" || part.level == 1) {
          var moveInStorageOrder = (part.level == 1) == (dir < 0);
          var ch = mv(start, moveInStorageOrder ? 1 : -1);
          if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent.begin : ch <= part.to && ch <= wrappedLineExtent.end)) {
            // Case 2: We move within an rtl part or in an rtl editor on the same visual line
            var sticky = moveInStorageOrder ? "before" : "after";
            return new Pos(start.line, ch, sticky)
          }
        }

        // Case 3: Could not move within this bidi part in this visual line, so leave
        // the current bidi part

        var searchInVisualLine = function (partPos, dir, wrappedLineExtent) {
          var getRes = function (ch, moveInStorageOrder) { return moveInStorageOrder
            ? new Pos(start.line, mv(ch, 1), "before")
            : new Pos(start.line, ch, "after"); };

          for (; partPos >= 0 && partPos < bidi.length; partPos += dir) {
            var part = bidi[partPos];
            var moveInStorageOrder = (dir > 0) == (part.level != 1);
            var ch = moveInStorageOrder ? wrappedLineExtent.begin : mv(wrappedLineExtent.end, -1);
            if (part.from <= ch && ch < part.to) { return getRes(ch, moveInStorageOrder) }
            ch = moveInStorageOrder ? part.from : mv(part.to, -1);
            if (wrappedLineExtent.begin <= ch && ch < wrappedLineExtent.end) { return getRes(ch, moveInStorageOrder) }
          }
        };

        // Case 3a: Look for other bidi parts on the same visual line
        var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent);
        if (res) { return res }

        // Case 3b: Look for other bidi parts on the next visual line
        var nextCh = dir > 0 ? wrappedLineExtent.end : mv(wrappedLineExtent.begin, -1);
        if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
          res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
          if (res) { return res }
        }

        // Case 4: Nowhere to move
        return null
      }

      // Commands are parameter-less actions that can be performed on an
      // editor, mostly used for keybindings.
      var commands = {
        selectAll: selectAll,
        singleSelection: function (cm) { return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll); },
        killLine: function (cm) { return deleteNearSelection(cm, function (range) {
          if (range.empty()) {
            var len = getLine(cm.doc, range.head.line).text.length;
            if (range.head.ch == len && range.head.line < cm.lastLine())
              { return {from: range.head, to: Pos(range.head.line + 1, 0)} }
            else
              { return {from: range.head, to: Pos(range.head.line, len)} }
          } else {
            return {from: range.from(), to: range.to()}
          }
        }); },
        deleteLine: function (cm) { return deleteNearSelection(cm, function (range) { return ({
          from: Pos(range.from().line, 0),
          to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
        }); }); },
        delLineLeft: function (cm) { return deleteNearSelection(cm, function (range) { return ({
          from: Pos(range.from().line, 0), to: range.from()
        }); }); },
        delWrappedLineLeft: function (cm) { return deleteNearSelection(cm, function (range) {
          var top = cm.charCoords(range.head, "div").top + 5;
          var leftPos = cm.coordsChar({left: 0, top: top}, "div");
          return {from: leftPos, to: range.from()}
        }); },
        delWrappedLineRight: function (cm) { return deleteNearSelection(cm, function (range) {
          var top = cm.charCoords(range.head, "div").top + 5;
          var rightPos = cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
          return {from: range.from(), to: rightPos }
        }); },
        undo: function (cm) { return cm.undo(); },
        redo: function (cm) { return cm.redo(); },
        undoSelection: function (cm) { return cm.undoSelection(); },
        redoSelection: function (cm) { return cm.redoSelection(); },
        goDocStart: function (cm) { return cm.extendSelection(Pos(cm.firstLine(), 0)); },
        goDocEnd: function (cm) { return cm.extendSelection(Pos(cm.lastLine())); },
        goLineStart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStart(cm, range.head.line); },
          {origin: "+move", bias: 1}
        ); },
        goLineStartSmart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStartSmart(cm, range.head); },
          {origin: "+move", bias: 1}
        ); },
        goLineEnd: function (cm) { return cm.extendSelectionsBy(function (range) { return lineEnd(cm, range.head.line); },
          {origin: "+move", bias: -1}
        ); },
        goLineRight: function (cm) { return cm.extendSelectionsBy(function (range) {
          var top = cm.cursorCoords(range.head, "div").top + 5;
          return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div")
        }, sel_move); },
        goLineLeft: function (cm) { return cm.extendSelectionsBy(function (range) {
          var top = cm.cursorCoords(range.head, "div").top + 5;
          return cm.coordsChar({left: 0, top: top}, "div")
        }, sel_move); },
        goLineLeftSmart: function (cm) { return cm.extendSelectionsBy(function (range) {
          var top = cm.cursorCoords(range.head, "div").top + 5;
          var pos = cm.coordsChar({left: 0, top: top}, "div");
          if (pos.ch < cm.getLine(pos.line).search(/\S/)) { return lineStartSmart(cm, range.head) }
          return pos
        }, sel_move); },
        goLineUp: function (cm) { return cm.moveV(-1, "line"); },
        goLineDown: function (cm) { return cm.moveV(1, "line"); },
        goPageUp: function (cm) { return cm.moveV(-1, "page"); },
        goPageDown: function (cm) { return cm.moveV(1, "page"); },
        goCharLeft: function (cm) { return cm.moveH(-1, "char"); },
        goCharRight: function (cm) { return cm.moveH(1, "char"); },
        goColumnLeft: function (cm) { return cm.moveH(-1, "column"); },
        goColumnRight: function (cm) { return cm.moveH(1, "column"); },
        goWordLeft: function (cm) { return cm.moveH(-1, "word"); },
        goGroupRight: function (cm) { return cm.moveH(1, "group"); },
        goGroupLeft: function (cm) { return cm.moveH(-1, "group"); },
        goWordRight: function (cm) { return cm.moveH(1, "word"); },
        delCharBefore: function (cm) { return cm.deleteH(-1, "char"); },
        delCharAfter: function (cm) { return cm.deleteH(1, "char"); },
        delWordBefore: function (cm) { return cm.deleteH(-1, "word"); },
        delWordAfter: function (cm) { return cm.deleteH(1, "word"); },
        delGroupBefore: function (cm) { return cm.deleteH(-1, "group"); },
        delGroupAfter: function (cm) { return cm.deleteH(1, "group"); },
        indentAuto: function (cm) { return cm.indentSelection("smart"); },
        indentMore: function (cm) { return cm.indentSelection("add"); },
        indentLess: function (cm) { return cm.indentSelection("subtract"); },
        insertTab: function (cm) { return cm.replaceSelection("\t"); },
        insertSoftTab: function (cm) {
          var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
          for (var i = 0; i < ranges.length; i++) {
            var pos = ranges[i].from();
            var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
            spaces.push(spaceStr(tabSize - col % tabSize));
          }
          cm.replaceSelections(spaces);
        },
        defaultTab: function (cm) {
          if (cm.somethingSelected()) { cm.indentSelection("add"); }
          else { cm.execCommand("insertTab"); }
        },
        // Swap the two chars left and right of each selection's head.
        // Move cursor behind the two swapped characters afterwards.
        //
        // Doesn't consider line feeds a character.
        // Doesn't scan more than one line above to find a character.
        // Doesn't do anything on an empty line.
        // Doesn't do anything with non-empty selections.
        transposeChars: function (cm) { return runInOp(cm, function () {
          var ranges = cm.listSelections(), newSel = [];
          for (var i = 0; i < ranges.length; i++) {
            if (!ranges[i].empty()) { continue }
            var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
            if (line) {
              if (cur.ch == line.length) { cur = new Pos(cur.line, cur.ch - 1); }
              if (cur.ch > 0) {
                cur = new Pos(cur.line, cur.ch + 1);
                cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                                Pos(cur.line, cur.ch - 2), cur, "+transpose");
              } else if (cur.line > cm.doc.first) {
                var prev = getLine(cm.doc, cur.line - 1).text;
                if (prev) {
                  cur = new Pos(cur.line, 1);
                  cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() +
                                  prev.charAt(prev.length - 1),
                                  Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
                }
              }
            }
            newSel.push(new Range(cur, cur));
          }
          cm.setSelections(newSel);
        }); },
        newlineAndIndent: function (cm) { return runInOp(cm, function () {
          var sels = cm.listSelections();
          for (var i = sels.length - 1; i >= 0; i--)
            { cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input"); }
          sels = cm.listSelections();
          for (var i$1 = 0; i$1 < sels.length; i$1++)
            { cm.indentLine(sels[i$1].from().line, null, true); }
          ensureCursorVisible(cm);
        }); },
        openLine: function (cm) { return cm.replaceSelection("\n", "start"); },
        toggleOverwrite: function (cm) { return cm.toggleOverwrite(); }
      };


      function lineStart(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLine(line);
        if (visual != line) { lineN = lineNo(visual); }
        return endOfLine(true, cm, visual, lineN, 1)
      }
      function lineEnd(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLineEnd(line);
        if (visual != line) { lineN = lineNo(visual); }
        return endOfLine(true, cm, line, lineN, -1)
      }
      function lineStartSmart(cm, pos) {
        var start = lineStart(cm, pos.line);
        var line = getLine(cm.doc, start.line);
        var order = getOrder(line, cm.doc.direction);
        if (!order || order[0].level == 0) {
          var firstNonWS = Math.max(0, line.text.search(/\S/));
          var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
          return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky)
        }
        return start
      }

      // Run a handler that was bound to a key.
      function doHandleBinding(cm, bound, dropShift) {
        if (typeof bound == "string") {
          bound = commands[bound];
          if (!bound) { return false }
        }
        // Ensure previous input has been read, so that the handler sees a
        // consistent view of the document
        cm.display.input.ensurePolled();
        var prevShift = cm.display.shift, done = false;
        try {
          if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
          if (dropShift) { cm.display.shift = false; }
          done = bound(cm) != Pass;
        } finally {
          cm.display.shift = prevShift;
          cm.state.suppressEdits = false;
        }
        return done
      }

      function lookupKeyForEditor(cm, name, handle) {
        for (var i = 0; i < cm.state.keyMaps.length; i++) {
          var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
          if (result) { return result }
        }
        return (cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm))
          || lookupKey(name, cm.options.keyMap, handle, cm)
      }

      // Note that, despite the name, this function is also used to check
      // for bound mouse clicks.

      var stopSeq = new Delayed;

      function dispatchKey(cm, name, e, handle) {
        var seq = cm.state.keySeq;
        if (seq) {
          if (isModifierKey(name)) { return "handled" }
          if (/\'$/.test(name))
            { cm.state.keySeq = null; }
          else
            { stopSeq.set(50, function () {
              if (cm.state.keySeq == seq) {
                cm.state.keySeq = null;
                cm.display.input.reset();
              }
            }); }
          if (dispatchKeyInner(cm, seq + " " + name, e, handle)) { return true }
        }
        return dispatchKeyInner(cm, name, e, handle)
      }

      function dispatchKeyInner(cm, name, e, handle) {
        var result = lookupKeyForEditor(cm, name, handle);

        if (result == "multi")
          { cm.state.keySeq = name; }
        if (result == "handled")
          { signalLater(cm, "keyHandled", cm, name, e); }

        if (result == "handled" || result == "multi") {
          e_preventDefault(e);
          restartBlink(cm);
        }

        return !!result
      }

      // Handle a key from the keydown event.
      function handleKeyBinding(cm, e) {
        var name = keyName(e, true);
        if (!name) { return false }

        if (e.shiftKey && !cm.state.keySeq) {
          // First try to resolve full name (including 'Shift-'). Failing
          // that, see if there is a cursor-motion command (starting with
          // 'go') bound to the keyname without 'Shift-'.
          return dispatchKey(cm, "Shift-" + name, e, function (b) { return doHandleBinding(cm, b, true); })
              || dispatchKey(cm, name, e, function (b) {
                   if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
                     { return doHandleBinding(cm, b) }
                 })
        } else {
          return dispatchKey(cm, name, e, function (b) { return doHandleBinding(cm, b); })
        }
      }

      // Handle a key from the keypress event
      function handleCharBinding(cm, e, ch) {
        return dispatchKey(cm, "'" + ch + "'", e, function (b) { return doHandleBinding(cm, b, true); })
      }

      var lastStoppedKey = null;
      function onKeyDown(e) {
        var cm = this;
        cm.curOp.focus = activeElt();
        if (signalDOMEvent(cm, e)) { return }
        // IE does strange things with escape.
        if (ie && ie_version < 11 && e.keyCode == 27) { e.returnValue = false; }
        var code = e.keyCode;
        cm.display.shift = code == 16 || e.shiftKey;
        var handled = handleKeyBinding(cm, e);
        if (presto) {
          lastStoppedKey = handled ? code : null;
          // Opera has no cut event... we try to at least catch the key combo
          if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
            { cm.replaceSelection("", null, "cut"); }
        }
        if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand)
          { document.execCommand("cut"); }

        // Turn mouse into crosshair when Alt is held on Mac.
        if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
          { showCrossHair(cm); }
      }

      function showCrossHair(cm) {
        var lineDiv = cm.display.lineDiv;
        addClass(lineDiv, "CodeMirror-crosshair");

        function up(e) {
          if (e.keyCode == 18 || !e.altKey) {
            rmClass(lineDiv, "CodeMirror-crosshair");
            off(document, "keyup", up);
            off(document, "mouseover", up);
          }
        }
        on(document, "keyup", up);
        on(document, "mouseover", up);
      }

      function onKeyUp(e) {
        if (e.keyCode == 16) { this.doc.sel.shift = false; }
        signalDOMEvent(this, e);
      }

      function onKeyPress(e) {
        var cm = this;
        if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) { return }
        var keyCode = e.keyCode, charCode = e.charCode;
        if (presto && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return}
        if ((presto && (!e.which || e.which < 10)) && handleKeyBinding(cm, e)) { return }
        var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
        // Some browsers fire keypress events for backspace
        if (ch == "\x08") { return }
        if (handleCharBinding(cm, e, ch)) { return }
        cm.display.input.onKeyPress(e);
      }

      var DOUBLECLICK_DELAY = 400;

      var PastClick = function(time, pos, button) {
        this.time = time;
        this.pos = pos;
        this.button = button;
      };

      PastClick.prototype.compare = function (time, pos, button) {
        return this.time + DOUBLECLICK_DELAY > time &&
          cmp(pos, this.pos) == 0 && button == this.button
      };

      var lastClick, lastDoubleClick;
      function clickRepeat(pos, button) {
        var now = +new Date;
        if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
          lastClick = lastDoubleClick = null;
          return "triple"
        } else if (lastClick && lastClick.compare(now, pos, button)) {
          lastDoubleClick = new PastClick(now, pos, button);
          lastClick = null;
          return "double"
        } else {
          lastClick = new PastClick(now, pos, button);
          lastDoubleClick = null;
          return "single"
        }
      }

      // A mouse down can be a single click, double click, triple click,
      // start of selection drag, start of text drag, new cursor
      // (ctrl-click), rectangle drag (alt-drag), or xwin
      // middle-click-paste. Or it might be a click on something we should
      // not interfere with, such as a scrollbar or widget.
      function onMouseDown(e) {
        var cm = this, display = cm.display;
        if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) { return }
        display.input.ensurePolled();
        display.shift = e.shiftKey;

        if (eventInWidget(display, e)) {
          if (!webkit) {
            // Briefly turn off draggability, to allow widgets to do
            // normal dragging things.
            display.scroller.draggable = false;
            setTimeout(function () { return display.scroller.draggable = true; }, 100);
          }
          return
        }
        if (clickInGutter(cm, e)) { return }
        var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
        window.focus();

        // #3261: make sure, that we're not starting a second selection
        if (button == 1 && cm.state.selectingText)
          { cm.state.selectingText(e); }

        if (pos && handleMappedButton(cm, button, pos, repeat, e)) { return }

        if (button == 1) {
          if (pos) { leftButtonDown(cm, pos, repeat, e); }
          else if (e_target(e) == display.scroller) { e_preventDefault(e); }
        } else if (button == 2) {
          if (pos) { extendSelection(cm.doc, pos); }
          setTimeout(function () { return display.input.focus(); }, 20);
        } else if (button == 3) {
          if (captureRightClick) { cm.display.input.onContextMenu(e); }
          else { delayBlurEvent(cm); }
        }
      }

      function handleMappedButton(cm, button, pos, repeat, event) {
        var name = "Click";
        if (repeat == "double") { name = "Double" + name; }
        else if (repeat == "triple") { name = "Triple" + name; }
        name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;

        return dispatchKey(cm,  addModifierNames(name, event), event, function (bound) {
          if (typeof bound == "string") { bound = commands[bound]; }
          if (!bound) { return false }
          var done = false;
          try {
            if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
            done = bound(cm, pos) != Pass;
          } finally {
            cm.state.suppressEdits = false;
          }
          return done
        })
      }

      function configureMouse(cm, repeat, event) {
        var option = cm.getOption("configureMouse");
        var value = option ? option(cm, repeat, event) : {};
        if (value.unit == null) {
          var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
          value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
        }
        if (value.extend == null || cm.doc.extend) { value.extend = cm.doc.extend || event.shiftKey; }
        if (value.addNew == null) { value.addNew = mac ? event.metaKey : event.ctrlKey; }
        if (value.moveOnDrag == null) { value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey); }
        return value
      }

      function leftButtonDown(cm, pos, repeat, event) {
        if (ie) { setTimeout(bind(ensureFocus, cm), 0); }
        else { cm.curOp.focus = activeElt(); }

        var behavior = configureMouse(cm, repeat, event);

        var sel = cm.doc.sel, contained;
        if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
            repeat == "single" && (contained = sel.contains(pos)) > -1 &&
            (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) &&
            (cmp(contained.to(), pos) > 0 || pos.xRel < 0))
          { leftButtonStartDrag(cm, event, pos, behavior); }
        else
          { leftButtonSelect(cm, event, pos, behavior); }
      }

      // Start a text drag. When it ends, see if any dragging actually
      // happen, and treat as a click if it didn't.
      function leftButtonStartDrag(cm, event, pos, behavior) {
        var display = cm.display, moved = false;
        var dragEnd = operation(cm, function (e) {
          if (webkit) { display.scroller.draggable = false; }
          cm.state.draggingText = false;
          off(display.wrapper.ownerDocument, "mouseup", dragEnd);
          off(display.wrapper.ownerDocument, "mousemove", mouseMove);
          off(display.scroller, "dragstart", dragStart);
          off(display.scroller, "drop", dragEnd);
          if (!moved) {
            e_preventDefault(e);
            if (!behavior.addNew)
              { extendSelection(cm.doc, pos, null, null, behavior.extend); }
            // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
            if (webkit || ie && ie_version == 9)
              { setTimeout(function () {display.wrapper.ownerDocument.body.focus(); display.input.focus();}, 20); }
            else
              { display.input.focus(); }
          }
        });
        var mouseMove = function(e2) {
          moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
        };
        var dragStart = function () { return moved = true; };
        // Let the drag handler handle this.
        if (webkit) { display.scroller.draggable = true; }
        cm.state.draggingText = dragEnd;
        dragEnd.copy = !behavior.moveOnDrag;
        // IE's approach to draggable
        if (display.scroller.dragDrop) { display.scroller.dragDrop(); }
        on(display.wrapper.ownerDocument, "mouseup", dragEnd);
        on(display.wrapper.ownerDocument, "mousemove", mouseMove);
        on(display.scroller, "dragstart", dragStart);
        on(display.scroller, "drop", dragEnd);

        delayBlurEvent(cm);
        setTimeout(function () { return display.input.focus(); }, 20);
      }

      function rangeForUnit(cm, pos, unit) {
        if (unit == "char") { return new Range(pos, pos) }
        if (unit == "word") { return cm.findWordAt(pos) }
        if (unit == "line") { return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))) }
        var result = unit(cm, pos);
        return new Range(result.from, result.to)
      }

      // Normal selection, as opposed to text dragging.
      function leftButtonSelect(cm, event, start, behavior) {
        var display = cm.display, doc = cm.doc;
        e_preventDefault(event);

        var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
        if (behavior.addNew && !behavior.extend) {
          ourIndex = doc.sel.contains(start);
          if (ourIndex > -1)
            { ourRange = ranges[ourIndex]; }
          else
            { ourRange = new Range(start, start); }
        } else {
          ourRange = doc.sel.primary();
          ourIndex = doc.sel.primIndex;
        }

        if (behavior.unit == "rectangle") {
          if (!behavior.addNew) { ourRange = new Range(start, start); }
          start = posFromMouse(cm, event, true, true);
          ourIndex = -1;
        } else {
          var range$$1 = rangeForUnit(cm, start, behavior.unit);
          if (behavior.extend)
            { ourRange = extendRange(ourRange, range$$1.anchor, range$$1.head, behavior.extend); }
          else
            { ourRange = range$$1; }
        }

        if (!behavior.addNew) {
          ourIndex = 0;
          setSelection(doc, new Selection([ourRange], 0), sel_mouse);
          startSel = doc.sel;
        } else if (ourIndex == -1) {
          ourIndex = ranges.length;
          setSelection(doc, normalizeSelection(cm, ranges.concat([ourRange]), ourIndex),
                       {scroll: false, origin: "*mouse"});
        } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
          setSelection(doc, normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
                       {scroll: false, origin: "*mouse"});
          startSel = doc.sel;
        } else {
          replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
        }

        var lastPos = start;
        function extendTo(pos) {
          if (cmp(lastPos, pos) == 0) { return }
          lastPos = pos;

          if (behavior.unit == "rectangle") {
            var ranges = [], tabSize = cm.options.tabSize;
            var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
            var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
            var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
            for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
                 line <= end; line++) {
              var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
              if (left == right)
                { ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos))); }
              else if (text.length > leftPos)
                { ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize)))); }
            }
            if (!ranges.length) { ranges.push(new Range(start, start)); }
            setSelection(doc, normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
                         {origin: "*mouse", scroll: false});
            cm.scrollIntoView(pos);
          } else {
            var oldRange = ourRange;
            var range$$1 = rangeForUnit(cm, pos, behavior.unit);
            var anchor = oldRange.anchor, head;
            if (cmp(range$$1.anchor, anchor) > 0) {
              head = range$$1.head;
              anchor = minPos(oldRange.from(), range$$1.anchor);
            } else {
              head = range$$1.anchor;
              anchor = maxPos(oldRange.to(), range$$1.head);
            }
            var ranges$1 = startSel.ranges.slice(0);
            ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc, anchor), head));
            setSelection(doc, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
          }
        }

        var editorSize = display.wrapper.getBoundingClientRect();
        // Used to ensure timeout re-tries don't fire when another extend
        // happened in the meantime (clearTimeout isn't reliable -- at
        // least on Chrome, the timeouts still happen even when cleared,
        // if the clear happens after their scheduled firing time).
        var counter = 0;

        function extend(e) {
          var curCount = ++counter;
          var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
          if (!cur) { return }
          if (cmp(cur, lastPos) != 0) {
            cm.curOp.focus = activeElt();
            extendTo(cur);
            var visible = visibleLines(display, doc);
            if (cur.line >= visible.to || cur.line < visible.from)
              { setTimeout(operation(cm, function () {if (counter == curCount) { extend(e); }}), 150); }
          } else {
            var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
            if (outside) { setTimeout(operation(cm, function () {
              if (counter != curCount) { return }
              display.scroller.scrollTop += outside;
              extend(e);
            }), 50); }
          }
        }

        function done(e) {
          cm.state.selectingText = false;
          counter = Infinity;
          // If e is null or undefined we interpret this as someone trying
          // to explicitly cancel the selection rather than the user
          // letting go of the mouse button.
          if (e) {
            e_preventDefault(e);
            display.input.focus();
          }
          off(display.wrapper.ownerDocument, "mousemove", move);
          off(display.wrapper.ownerDocument, "mouseup", up);
          doc.history.lastSelOrigin = null;
        }

        var move = operation(cm, function (e) {
          if (e.buttons === 0 || !e_button(e)) { done(e); }
          else { extend(e); }
        });
        var up = operation(cm, done);
        cm.state.selectingText = up;
        on(display.wrapper.ownerDocument, "mousemove", move);
        on(display.wrapper.ownerDocument, "mouseup", up);
      }

      // Used when mouse-selecting to adjust the anchor to the proper side
      // of a bidi jump depending on the visual position of the head.
      function bidiSimplify(cm, range$$1) {
        var anchor = range$$1.anchor;
        var head = range$$1.head;
        var anchorLine = getLine(cm.doc, anchor.line);
        if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) { return range$$1 }
        var order = getOrder(anchorLine);
        if (!order) { return range$$1 }
        var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
        if (part.from != anchor.ch && part.to != anchor.ch) { return range$$1 }
        var boundary = index + ((part.from == anchor.ch) == (part.level != 1) ? 0 : 1);
        if (boundary == 0 || boundary == order.length) { return range$$1 }

        // Compute the relative visual position of the head compared to the
        // anchor (<0 is to the left, >0 to the right)
        var leftSide;
        if (head.line != anchor.line) {
          leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
        } else {
          var headIndex = getBidiPartAt(order, head.ch, head.sticky);
          var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
          if (headIndex == boundary - 1 || headIndex == boundary)
            { leftSide = dir < 0; }
          else
            { leftSide = dir > 0; }
        }

        var usePart = order[boundary + (leftSide ? -1 : 0)];
        var from = leftSide == (usePart.level == 1);
        var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
        return anchor.ch == ch && anchor.sticky == sticky ? range$$1 : new Range(new Pos(anchor.line, ch, sticky), head)
      }


      // Determines whether an event happened in the gutter, and fires the
      // handlers for the corresponding event.
      function gutterEvent(cm, e, type, prevent) {
        var mX, mY;
        if (e.touches) {
          mX = e.touches[0].clientX;
          mY = e.touches[0].clientY;
        } else {
          try { mX = e.clientX; mY = e.clientY; }
          catch(e) { return false }
        }
        if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) { return false }
        if (prevent) { e_preventDefault(e); }

        var display = cm.display;
        var lineBox = display.lineDiv.getBoundingClientRect();

        if (mY > lineBox.bottom || !hasHandler(cm, type)) { return e_defaultPrevented(e) }
        mY -= lineBox.top - display.viewOffset;

        for (var i = 0; i < cm.display.gutterSpecs.length; ++i) {
          var g = display.gutters.childNodes[i];
          if (g && g.getBoundingClientRect().right >= mX) {
            var line = lineAtHeight(cm.doc, mY);
            var gutter = cm.display.gutterSpecs[i];
            signal(cm, type, cm, line, gutter.className, e);
            return e_defaultPrevented(e)
          }
        }
      }

      function clickInGutter(cm, e) {
        return gutterEvent(cm, e, "gutterClick", true)
      }

      // CONTEXT MENU HANDLING

      // To make the context menu work, we need to briefly unhide the
      // textarea (making it as unobtrusive as possible) to let the
      // right-click take effect on it.
      function onContextMenu(cm, e) {
        if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) { return }
        if (signalDOMEvent(cm, e, "contextmenu")) { return }
        if (!captureRightClick) { cm.display.input.onContextMenu(e); }
      }

      function contextMenuInGutter(cm, e) {
        if (!hasHandler(cm, "gutterContextMenu")) { return false }
        return gutterEvent(cm, e, "gutterContextMenu", false)
      }

      function themeChanged(cm) {
        cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
          cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        clearCaches(cm);
      }

      var Init = {toString: function(){return "CodeMirror.Init"}};

      var defaults = {};
      var optionHandlers = {};

      function defineOptions(CodeMirror) {
        var optionHandlers = CodeMirror.optionHandlers;

        function option(name, deflt, handle, notOnInit) {
          CodeMirror.defaults[name] = deflt;
          if (handle) { optionHandlers[name] =
            notOnInit ? function (cm, val, old) {if (old != Init) { handle(cm, val, old); }} : handle; }
        }

        CodeMirror.defineOption = option;

        // Passed to option handlers when there is no old value.
        CodeMirror.Init = Init;

        // These two are, on init, called from the constructor because they
        // have to be initialized before the editor can start at all.
        option("value", "", function (cm, val) { return cm.setValue(val); }, true);
        option("mode", null, function (cm, val) {
          cm.doc.modeOption = val;
          loadMode(cm);
        }, true);

        option("indentUnit", 2, loadMode, true);
        option("indentWithTabs", false);
        option("smartIndent", true);
        option("tabSize", 4, function (cm) {
          resetModeState(cm);
          clearCaches(cm);
          regChange(cm);
        }, true);

        option("lineSeparator", null, function (cm, val) {
          cm.doc.lineSep = val;
          if (!val) { return }
          var newBreaks = [], lineNo = cm.doc.first;
          cm.doc.iter(function (line) {
            for (var pos = 0;;) {
              var found = line.text.indexOf(val, pos);
              if (found == -1) { break }
              pos = found + val.length;
              newBreaks.push(Pos(lineNo, found));
            }
            lineNo++;
          });
          for (var i = newBreaks.length - 1; i >= 0; i--)
            { replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length)); }
        });
        option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function (cm, val, old) {
          cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
          if (old != Init) { cm.refresh(); }
        });
        option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) { return cm.refresh(); }, true);
        option("electricChars", true);
        option("inputStyle", mobile ? "contenteditable" : "textarea", function () {
          throw new Error("inputStyle can not (yet) be changed in a running editor") // FIXME
        }, true);
        option("spellcheck", false, function (cm, val) { return cm.getInputField().spellcheck = val; }, true);
        option("autocorrect", false, function (cm, val) { return cm.getInputField().autocorrect = val; }, true);
        option("autocapitalize", false, function (cm, val) { return cm.getInputField().autocapitalize = val; }, true);
        option("rtlMoveVisually", !windows);
        option("wholeLineUpdateBefore", true);

        option("theme", "default", function (cm) {
          themeChanged(cm);
          updateGutters(cm);
        }, true);
        option("keyMap", "default", function (cm, val, old) {
          var next = getKeyMap(val);
          var prev = old != Init && getKeyMap(old);
          if (prev && prev.detach) { prev.detach(cm, next); }
          if (next.attach) { next.attach(cm, prev || null); }
        });
        option("extraKeys", null);
        option("configureMouse", null);

        option("lineWrapping", false, wrappingChanged, true);
        option("gutters", [], function (cm, val) {
          cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
          updateGutters(cm);
        }, true);
        option("fixedGutter", true, function (cm, val) {
          cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
          cm.refresh();
        }, true);
        option("coverGutterNextToScrollbar", false, function (cm) { return updateScrollbars(cm); }, true);
        option("scrollbarStyle", "native", function (cm) {
          initScrollbars(cm);
          updateScrollbars(cm);
          cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
          cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
        }, true);
        option("lineNumbers", false, function (cm, val) {
          cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
          updateGutters(cm);
        }, true);
        option("firstLineNumber", 1, updateGutters, true);
        option("lineNumberFormatter", function (integer) { return integer; }, updateGutters, true);
        option("showCursorWhenSelecting", false, updateSelection, true);

        option("resetSelectionOnContextMenu", true);
        option("lineWiseCopyCut", true);
        option("pasteLinesPerSelection", true);
        option("selectionsMayTouch", false);

        option("readOnly", false, function (cm, val) {
          if (val == "nocursor") {
            onBlur(cm);
            cm.display.input.blur();
          }
          cm.display.input.readOnlyChanged(val);
        });
        option("disableInput", false, function (cm, val) {if (!val) { cm.display.input.reset(); }}, true);
        option("dragDrop", true, dragDropChanged);
        option("allowDropFileTypes", null);

        option("cursorBlinkRate", 530);
        option("cursorScrollMargin", 0);
        option("cursorHeight", 1, updateSelection, true);
        option("singleCursorHeightPerLine", true, updateSelection, true);
        option("workTime", 100);
        option("workDelay", 100);
        option("flattenSpans", true, resetModeState, true);
        option("addModeClass", false, resetModeState, true);
        option("pollInterval", 100);
        option("undoDepth", 200, function (cm, val) { return cm.doc.history.undoDepth = val; });
        option("historyEventDelay", 1250);
        option("viewportMargin", 10, function (cm) { return cm.refresh(); }, true);
        option("maxHighlightLength", 10000, resetModeState, true);
        option("moveInputWithCursor", true, function (cm, val) {
          if (!val) { cm.display.input.resetPosition(); }
        });

        option("tabindex", null, function (cm, val) { return cm.display.input.getField().tabIndex = val || ""; });
        option("autofocus", null);
        option("direction", "ltr", function (cm, val) { return cm.doc.setDirection(val); }, true);
        option("phrases", null);
      }

      function dragDropChanged(cm, value, old) {
        var wasOn = old && old != Init;
        if (!value != !wasOn) {
          var funcs = cm.display.dragFunctions;
          var toggle = value ? on : off;
          toggle(cm.display.scroller, "dragstart", funcs.start);
          toggle(cm.display.scroller, "dragenter", funcs.enter);
          toggle(cm.display.scroller, "dragover", funcs.over);
          toggle(cm.display.scroller, "dragleave", funcs.leave);
          toggle(cm.display.scroller, "drop", funcs.drop);
        }
      }

      function wrappingChanged(cm) {
        if (cm.options.lineWrapping) {
          addClass(cm.display.wrapper, "CodeMirror-wrap");
          cm.display.sizer.style.minWidth = "";
          cm.display.sizerWidth = null;
        } else {
          rmClass(cm.display.wrapper, "CodeMirror-wrap");
          findMaxLine(cm);
        }
        estimateLineHeights(cm);
        regChange(cm);
        clearCaches(cm);
        setTimeout(function () { return updateScrollbars(cm); }, 100);
      }

      // A CodeMirror instance represents an editor. This is the object
      // that user code is usually dealing with.

      function CodeMirror(place, options) {
        var this$1$1 = this;

        if (!(this instanceof CodeMirror)) { return new CodeMirror(place, options) }

        this.options = options = options ? copyObj(options) : {};
        // Determine effective options based on given values and defaults.
        copyObj(defaults, options, false);

        var doc = options.value;
        if (typeof doc == "string") { doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction); }
        else if (options.mode) { doc.modeOption = options.mode; }
        this.doc = doc;

        var input = new CodeMirror.inputStyles[options.inputStyle](this);
        var display = this.display = new Display(place, doc, input, options);
        display.wrapper.CodeMirror = this;
        themeChanged(this);
        if (options.lineWrapping)
          { this.display.wrapper.className += " CodeMirror-wrap"; }
        initScrollbars(this);

        this.state = {
          keyMaps: [],  // stores maps added by addKeyMap
          overlays: [], // highlighting overlays, as added by addOverlay
          modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
          overwrite: false,
          delayingBlurEvent: false,
          focused: false,
          suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
          pasteIncoming: -1, cutIncoming: -1, // help recognize paste/cut edits in input.poll
          selectingText: false,
          draggingText: false,
          highlight: new Delayed(), // stores highlight worker timeout
          keySeq: null,  // Unfinished key sequence
          specialChars: null
        };

        if (options.autofocus && !mobile) { display.input.focus(); }

        // Override magic textarea content restore that IE sometimes does
        // on our hidden textarea on reload
        if (ie && ie_version < 11) { setTimeout(function () { return this$1$1.display.input.reset(true); }, 20); }

        registerEventHandlers(this);
        ensureGlobalHandlers();

        startOperation(this);
        this.curOp.forceUpdate = true;
        attachDoc(this, doc);

        if ((options.autofocus && !mobile) || this.hasFocus())
          { setTimeout(bind(onFocus, this), 20); }
        else
          { onBlur(this); }

        for (var opt in optionHandlers) { if (optionHandlers.hasOwnProperty(opt))
          { optionHandlers[opt](this$1$1, options[opt], Init); } }
        maybeUpdateLineNumberWidth(this);
        if (options.finishInit) { options.finishInit(this); }
        for (var i = 0; i < initHooks.length; ++i) { initHooks[i](this$1$1); }
        endOperation(this);
        // Suppress optimizelegibility in Webkit, since it breaks text
        // measuring on line wrapping boundaries.
        if (webkit && options.lineWrapping &&
            getComputedStyle(display.lineDiv).textRendering == "optimizelegibility")
          { display.lineDiv.style.textRendering = "auto"; }
      }

      // The default configuration options.
      CodeMirror.defaults = defaults;
      // Functions to run when options are changed.
      CodeMirror.optionHandlers = optionHandlers;

      // Attach the necessary event handlers when initializing the editor
      function registerEventHandlers(cm) {
        var d = cm.display;
        on(d.scroller, "mousedown", operation(cm, onMouseDown));
        // Older IE's will not fire a second mousedown for a double click
        if (ie && ie_version < 11)
          { on(d.scroller, "dblclick", operation(cm, function (e) {
            if (signalDOMEvent(cm, e)) { return }
            var pos = posFromMouse(cm, e);
            if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) { return }
            e_preventDefault(e);
            var word = cm.findWordAt(pos);
            extendSelection(cm.doc, word.anchor, word.head);
          })); }
        else
          { on(d.scroller, "dblclick", function (e) { return signalDOMEvent(cm, e) || e_preventDefault(e); }); }
        // Some browsers fire contextmenu *after* opening the menu, at
        // which point we can't mess with it anymore. Context menu is
        // handled in onMouseDown for these browsers.
        on(d.scroller, "contextmenu", function (e) { return onContextMenu(cm, e); });

        // Used to suppress mouse event handling when a touch happens
        var touchFinished, prevTouch = {end: 0};
        function finishTouch() {
          if (d.activeTouch) {
            touchFinished = setTimeout(function () { return d.activeTouch = null; }, 1000);
            prevTouch = d.activeTouch;
            prevTouch.end = +new Date;
          }
        }
        function isMouseLikeTouchEvent(e) {
          if (e.touches.length != 1) { return false }
          var touch = e.touches[0];
          return touch.radiusX <= 1 && touch.radiusY <= 1
        }
        function farAway(touch, other) {
          if (other.left == null) { return true }
          var dx = other.left - touch.left, dy = other.top - touch.top;
          return dx * dx + dy * dy > 20 * 20
        }
        on(d.scroller, "touchstart", function (e) {
          if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
            d.input.ensurePolled();
            clearTimeout(touchFinished);
            var now = +new Date;
            d.activeTouch = {start: now, moved: false,
                             prev: now - prevTouch.end <= 300 ? prevTouch : null};
            if (e.touches.length == 1) {
              d.activeTouch.left = e.touches[0].pageX;
              d.activeTouch.top = e.touches[0].pageY;
            }
          }
        });
        on(d.scroller, "touchmove", function () {
          if (d.activeTouch) { d.activeTouch.moved = true; }
        });
        on(d.scroller, "touchend", function (e) {
          var touch = d.activeTouch;
          if (touch && !eventInWidget(d, e) && touch.left != null &&
              !touch.moved && new Date - touch.start < 300) {
            var pos = cm.coordsChar(d.activeTouch, "page"), range;
            if (!touch.prev || farAway(touch, touch.prev)) // Single tap
              { range = new Range(pos, pos); }
            else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
              { range = cm.findWordAt(pos); }
            else // Triple tap
              { range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))); }
            cm.setSelection(range.anchor, range.head);
            cm.focus();
            e_preventDefault(e);
          }
          finishTouch();
        });
        on(d.scroller, "touchcancel", finishTouch);

        // Sync scrolling between fake scrollbars and real scrollable
        // area, ensure viewport is updated when scrolling.
        on(d.scroller, "scroll", function () {
          if (d.scroller.clientHeight) {
            updateScrollTop(cm, d.scroller.scrollTop);
            setScrollLeft(cm, d.scroller.scrollLeft, true);
            signal(cm, "scroll", cm);
          }
        });

        // Listen to wheel events in order to try and update the viewport on time.
        on(d.scroller, "mousewheel", function (e) { return onScrollWheel(cm, e); });
        on(d.scroller, "DOMMouseScroll", function (e) { return onScrollWheel(cm, e); });

        // Prevent wrapper from ever scrolling
        on(d.wrapper, "scroll", function () { return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });

        d.dragFunctions = {
          enter: function (e) {if (!signalDOMEvent(cm, e)) { e_stop(e); }},
          over: function (e) {if (!signalDOMEvent(cm, e)) { onDragOver(cm, e); e_stop(e); }},
          start: function (e) { return onDragStart(cm, e); },
          drop: operation(cm, onDrop),
          leave: function (e) {if (!signalDOMEvent(cm, e)) { clearDragCursor(cm); }}
        };

        var inp = d.input.getField();
        on(inp, "keyup", function (e) { return onKeyUp.call(cm, e); });
        on(inp, "keydown", operation(cm, onKeyDown));
        on(inp, "keypress", operation(cm, onKeyPress));
        on(inp, "focus", function (e) { return onFocus(cm, e); });
        on(inp, "blur", function (e) { return onBlur(cm, e); });
      }

      var initHooks = [];
      CodeMirror.defineInitHook = function (f) { return initHooks.push(f); };

      // Indent the given line. The how parameter can be "smart",
      // "add"/null, "subtract", or "prev". When aggressive is false
      // (typically set to true for forced single-line indents), empty
      // lines are not indented, and places where the mode returns Pass
      // are left alone.
      function indentLine(cm, n, how, aggressive) {
        var doc = cm.doc, state;
        if (how == null) { how = "add"; }
        if (how == "smart") {
          // Fall back to "prev" when the mode doesn't have an indentation
          // method.
          if (!doc.mode.indent) { how = "prev"; }
          else { state = getContextBefore(cm, n).state; }
        }

        var tabSize = cm.options.tabSize;
        var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
        if (line.stateAfter) { line.stateAfter = null; }
        var curSpaceString = line.text.match(/^\s*/)[0], indentation;
        if (!aggressive && !/\S/.test(line.text)) {
          indentation = 0;
          how = "not";
        } else if (how == "smart") {
          indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
          if (indentation == Pass || indentation > 150) {
            if (!aggressive) { return }
            how = "prev";
          }
        }
        if (how == "prev") {
          if (n > doc.first) { indentation = countColumn(getLine(doc, n-1).text, null, tabSize); }
          else { indentation = 0; }
        } else if (how == "add") {
          indentation = curSpace + cm.options.indentUnit;
        } else if (how == "subtract") {
          indentation = curSpace - cm.options.indentUnit;
        } else if (typeof how == "number") {
          indentation = curSpace + how;
        }
        indentation = Math.max(0, indentation);

        var indentString = "", pos = 0;
        if (cm.options.indentWithTabs)
          { for (var i = Math.floor(indentation / tabSize); i; --i) {pos += tabSize; indentString += "\t";} }
        if (pos < indentation) { indentString += spaceStr(indentation - pos); }

        if (indentString != curSpaceString) {
          replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
          line.stateAfter = null;
          return true
        } else {
          // Ensure that, if the cursor was in the whitespace at the start
          // of the line, it is moved to the end of that space.
          for (var i$1 = 0; i$1 < doc.sel.ranges.length; i$1++) {
            var range = doc.sel.ranges[i$1];
            if (range.head.line == n && range.head.ch < curSpaceString.length) {
              var pos$1 = Pos(n, curSpaceString.length);
              replaceOneSelection(doc, i$1, new Range(pos$1, pos$1));
              break
            }
          }
        }
      }

      // This will be set to a {lineWise: bool, text: [string]} object, so
      // that, when pasting, we know what kind of selections the copied
      // text was made out of.
      var lastCopied = null;

      function setLastCopied(newLastCopied) {
        lastCopied = newLastCopied;
      }

      function applyTextInput(cm, inserted, deleted, sel, origin) {
        var doc = cm.doc;
        cm.display.shift = false;
        if (!sel) { sel = doc.sel; }

        var recent = +new Date - 200;
        var paste = origin == "paste" || cm.state.pasteIncoming > recent;
        var textLines = splitLinesAuto(inserted), multiPaste = null;
        // When pasting N lines into N selections, insert one line per selection
        if (paste && sel.ranges.length > 1) {
          if (lastCopied && lastCopied.text.join("\n") == inserted) {
            if (sel.ranges.length % lastCopied.text.length == 0) {
              multiPaste = [];
              for (var i = 0; i < lastCopied.text.length; i++)
                { multiPaste.push(doc.splitLines(lastCopied.text[i])); }
            }
          } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
            multiPaste = map(textLines, function (l) { return [l]; });
          }
        }

        var updateInput = cm.curOp.updateInput;
        // Normal behavior is to insert the new text into every selection
        for (var i$1 = sel.ranges.length - 1; i$1 >= 0; i$1--) {
          var range$$1 = sel.ranges[i$1];
          var from = range$$1.from(), to = range$$1.to();
          if (range$$1.empty()) {
            if (deleted && deleted > 0) // Handle deletion
              { from = Pos(from.line, from.ch - deleted); }
            else if (cm.state.overwrite && !paste) // Handle overwrite
              { to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length)); }
            else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == inserted)
              { from = to = Pos(from.line, 0); }
          }
          var changeEvent = {from: from, to: to, text: multiPaste ? multiPaste[i$1 % multiPaste.length] : textLines,
                             origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")};
          makeChange(cm.doc, changeEvent);
          signalLater(cm, "inputRead", cm, changeEvent);
        }
        if (inserted && !paste)
          { triggerElectric(cm, inserted); }

        ensureCursorVisible(cm);
        if (cm.curOp.updateInput < 2) { cm.curOp.updateInput = updateInput; }
        cm.curOp.typing = true;
        cm.state.pasteIncoming = cm.state.cutIncoming = -1;
      }

      function handlePaste(e, cm) {
        var pasted = e.clipboardData && e.clipboardData.getData("Text");
        if (pasted) {
          e.preventDefault();
          if (!cm.isReadOnly() && !cm.options.disableInput)
            { runInOp(cm, function () { return applyTextInput(cm, pasted, 0, null, "paste"); }); }
          return true
        }
      }

      function triggerElectric(cm, inserted) {
        // When an 'electric' character is inserted, immediately trigger a reindent
        if (!cm.options.electricChars || !cm.options.smartIndent) { return }
        var sel = cm.doc.sel;

        for (var i = sel.ranges.length - 1; i >= 0; i--) {
          var range$$1 = sel.ranges[i];
          if (range$$1.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range$$1.head.line)) { continue }
          var mode = cm.getModeAt(range$$1.head);
          var indented = false;
          if (mode.electricChars) {
            for (var j = 0; j < mode.electricChars.length; j++)
              { if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
                indented = indentLine(cm, range$$1.head.line, "smart");
                break
              } }
          } else if (mode.electricInput) {
            if (mode.electricInput.test(getLine(cm.doc, range$$1.head.line).text.slice(0, range$$1.head.ch)))
              { indented = indentLine(cm, range$$1.head.line, "smart"); }
          }
          if (indented) { signalLater(cm, "electricInput", cm, range$$1.head.line); }
        }
      }

      function copyableRanges(cm) {
        var text = [], ranges = [];
        for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
          var line = cm.doc.sel.ranges[i].head.line;
          var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
          ranges.push(lineRange);
          text.push(cm.getRange(lineRange.anchor, lineRange.head));
        }
        return {text: text, ranges: ranges}
      }

      function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
        field.setAttribute("autocorrect", autocorrect ? "" : "off");
        field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
        field.setAttribute("spellcheck", !!spellcheck);
      }

      function hiddenTextarea() {
        var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
        var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        // The textarea is kept positioned near the cursor to prevent the
        // fact that it'll be scrolled into view on input from scrolling
        // our fake cursor out of view. On webkit, when wrap=off, paste is
        // very slow. So make the area wide instead.
        if (webkit) { te.style.width = "1000px"; }
        else { te.setAttribute("wrap", "off"); }
        // If border: 0; -- iOS fails to open keyboard (issue #1287)
        if (ios) { te.style.border = "1px solid black"; }
        disableBrowserMagic(te);
        return div
      }

      // The publicly visible API. Note that methodOp(f) means
      // 'wrap f in an operation, performed on its `this` parameter'.

      // This is not the complete set of editor methods. Most of the
      // methods defined on the Doc type are also injected into
      // CodeMirror.prototype, for backwards compatibility and
      // convenience.

      function addEditorMethods(CodeMirror) {
        var optionHandlers = CodeMirror.optionHandlers;

        var helpers = CodeMirror.helpers = {};

        CodeMirror.prototype = {
          constructor: CodeMirror,
          focus: function(){window.focus(); this.display.input.focus();},

          setOption: function(option, value) {
            var options = this.options, old = options[option];
            if (options[option] == value && option != "mode") { return }
            options[option] = value;
            if (optionHandlers.hasOwnProperty(option))
              { operation(this, optionHandlers[option])(this, value, old); }
            signal(this, "optionChange", this, option);
          },

          getOption: function(option) {return this.options[option]},
          getDoc: function() {return this.doc},

          addKeyMap: function(map$$1, bottom) {
            this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map$$1));
          },
          removeKeyMap: function(map$$1) {
            var maps = this.state.keyMaps;
            for (var i = 0; i < maps.length; ++i)
              { if (maps[i] == map$$1 || maps[i].name == map$$1) {
                maps.splice(i, 1);
                return true
              } }
          },

          addOverlay: methodOp(function(spec, options) {
            var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
            if (mode.startState) { throw new Error("Overlays may not be stateful.") }
            insertSorted(this.state.overlays,
                         {mode: mode, modeSpec: spec, opaque: options && options.opaque,
                          priority: (options && options.priority) || 0},
                         function (overlay) { return overlay.priority; });
            this.state.modeGen++;
            regChange(this);
          }),
          removeOverlay: methodOp(function(spec) {
            var this$1$1 = this;

            var overlays = this.state.overlays;
            for (var i = 0; i < overlays.length; ++i) {
              var cur = overlays[i].modeSpec;
              if (cur == spec || typeof spec == "string" && cur.name == spec) {
                overlays.splice(i, 1);
                this$1$1.state.modeGen++;
                regChange(this$1$1);
                return
              }
            }
          }),

          indentLine: methodOp(function(n, dir, aggressive) {
            if (typeof dir != "string" && typeof dir != "number") {
              if (dir == null) { dir = this.options.smartIndent ? "smart" : "prev"; }
              else { dir = dir ? "add" : "subtract"; }
            }
            if (isLine(this.doc, n)) { indentLine(this, n, dir, aggressive); }
          }),
          indentSelection: methodOp(function(how) {
            var this$1$1 = this;

            var ranges = this.doc.sel.ranges, end = -1;
            for (var i = 0; i < ranges.length; i++) {
              var range$$1 = ranges[i];
              if (!range$$1.empty()) {
                var from = range$$1.from(), to = range$$1.to();
                var start = Math.max(end, from.line);
                end = Math.min(this$1$1.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
                for (var j = start; j < end; ++j)
                  { indentLine(this$1$1, j, how); }
                var newRanges = this$1$1.doc.sel.ranges;
                if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0)
                  { replaceOneSelection(this$1$1.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll); }
              } else if (range$$1.head.line > end) {
                indentLine(this$1$1, range$$1.head.line, how, true);
                end = range$$1.head.line;
                if (i == this$1$1.doc.sel.primIndex) { ensureCursorVisible(this$1$1); }
              }
            }
          }),

          // Fetch the parser token for a given character. Useful for hacks
          // that want to inspect the mode state (say, for completion).
          getTokenAt: function(pos, precise) {
            return takeToken(this, pos, precise)
          },

          getLineTokens: function(line, precise) {
            return takeToken(this, Pos(line), precise, true)
          },

          getTokenTypeAt: function(pos) {
            pos = clipPos(this.doc, pos);
            var styles = getLineStyles(this, getLine(this.doc, pos.line));
            var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
            var type;
            if (ch == 0) { type = styles[2]; }
            else { for (;;) {
              var mid = (before + after) >> 1;
              if ((mid ? styles[mid * 2 - 1] : 0) >= ch) { after = mid; }
              else if (styles[mid * 2 + 1] < ch) { before = mid + 1; }
              else { type = styles[mid * 2 + 2]; break }
            } }
            var cut = type ? type.indexOf("overlay ") : -1;
            return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1)
          },

          getModeAt: function(pos) {
            var mode = this.doc.mode;
            if (!mode.innerMode) { return mode }
            return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode
          },

          getHelper: function(pos, type) {
            return this.getHelpers(pos, type)[0]
          },

          getHelpers: function(pos, type) {
            var this$1$1 = this;

            var found = [];
            if (!helpers.hasOwnProperty(type)) { return found }
            var help = helpers[type], mode = this.getModeAt(pos);
            if (typeof mode[type] == "string") {
              if (help[mode[type]]) { found.push(help[mode[type]]); }
            } else if (mode[type]) {
              for (var i = 0; i < mode[type].length; i++) {
                var val = help[mode[type][i]];
                if (val) { found.push(val); }
              }
            } else if (mode.helperType && help[mode.helperType]) {
              found.push(help[mode.helperType]);
            } else if (help[mode.name]) {
              found.push(help[mode.name]);
            }
            for (var i$1 = 0; i$1 < help._global.length; i$1++) {
              var cur = help._global[i$1];
              if (cur.pred(mode, this$1$1) && indexOf(found, cur.val) == -1)
                { found.push(cur.val); }
            }
            return found
          },

          getStateAfter: function(line, precise) {
            var doc = this.doc;
            line = clipLine(doc, line == null ? doc.first + doc.size - 1: line);
            return getContextBefore(this, line + 1, precise).state
          },

          cursorCoords: function(start, mode) {
            var pos, range$$1 = this.doc.sel.primary();
            if (start == null) { pos = range$$1.head; }
            else if (typeof start == "object") { pos = clipPos(this.doc, start); }
            else { pos = start ? range$$1.from() : range$$1.to(); }
            return cursorCoords(this, pos, mode || "page")
          },

          charCoords: function(pos, mode) {
            return charCoords(this, clipPos(this.doc, pos), mode || "page")
          },

          coordsChar: function(coords, mode) {
            coords = fromCoordSystem(this, coords, mode || "page");
            return coordsChar(this, coords.left, coords.top)
          },

          lineAtHeight: function(height, mode) {
            height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
            return lineAtHeight(this.doc, height + this.display.viewOffset)
          },
          heightAtLine: function(line, mode, includeWidgets) {
            var end = false, lineObj;
            if (typeof line == "number") {
              var last = this.doc.first + this.doc.size - 1;
              if (line < this.doc.first) { line = this.doc.first; }
              else if (line > last) { line = last; end = true; }
              lineObj = getLine(this.doc, line);
            } else {
              lineObj = line;
            }
            return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page", includeWidgets || end).top +
              (end ? this.doc.height - heightAtLine(lineObj) : 0)
          },

          defaultTextHeight: function() { return textHeight(this.display) },
          defaultCharWidth: function() { return charWidth(this.display) },

          getViewport: function() { return {from: this.display.viewFrom, to: this.display.viewTo}},

          addWidget: function(pos, node, scroll, vert, horiz) {
            var display = this.display;
            pos = cursorCoords(this, clipPos(this.doc, pos));
            var top = pos.bottom, left = pos.left;
            node.style.position = "absolute";
            node.setAttribute("cm-ignore-events", "true");
            this.display.input.setUneditable(node);
            display.sizer.appendChild(node);
            if (vert == "over") {
              top = pos.top;
            } else if (vert == "above" || vert == "near") {
              var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
              hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
              // Default to positioning above (if specified and possible); otherwise default to positioning below
              if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
                { top = pos.top - node.offsetHeight; }
              else if (pos.bottom + node.offsetHeight <= vspace)
                { top = pos.bottom; }
              if (left + node.offsetWidth > hspace)
                { left = hspace - node.offsetWidth; }
            }
            node.style.top = top + "px";
            node.style.left = node.style.right = "";
            if (horiz == "right") {
              left = display.sizer.clientWidth - node.offsetWidth;
              node.style.right = "0px";
            } else {
              if (horiz == "left") { left = 0; }
              else if (horiz == "middle") { left = (display.sizer.clientWidth - node.offsetWidth) / 2; }
              node.style.left = left + "px";
            }
            if (scroll)
              { scrollIntoView(this, {left: left, top: top, right: left + node.offsetWidth, bottom: top + node.offsetHeight}); }
          },

          triggerOnKeyDown: methodOp(onKeyDown),
          triggerOnKeyPress: methodOp(onKeyPress),
          triggerOnKeyUp: onKeyUp,
          triggerOnMouseDown: methodOp(onMouseDown),

          execCommand: function(cmd) {
            if (commands.hasOwnProperty(cmd))
              { return commands[cmd].call(null, this) }
          },

          triggerElectric: methodOp(function(text) { triggerElectric(this, text); }),

          findPosH: function(from, amount, unit, visually) {
            var this$1$1 = this;

            var dir = 1;
            if (amount < 0) { dir = -1; amount = -amount; }
            var cur = clipPos(this.doc, from);
            for (var i = 0; i < amount; ++i) {
              cur = findPosH(this$1$1.doc, cur, dir, unit, visually);
              if (cur.hitSide) { break }
            }
            return cur
          },

          moveH: methodOp(function(dir, unit) {
            var this$1$1 = this;

            this.extendSelectionsBy(function (range$$1) {
              if (this$1$1.display.shift || this$1$1.doc.extend || range$$1.empty())
                { return findPosH(this$1$1.doc, range$$1.head, dir, unit, this$1$1.options.rtlMoveVisually) }
              else
                { return dir < 0 ? range$$1.from() : range$$1.to() }
            }, sel_move);
          }),

          deleteH: methodOp(function(dir, unit) {
            var sel = this.doc.sel, doc = this.doc;
            if (sel.somethingSelected())
              { doc.replaceSelection("", null, "+delete"); }
            else
              { deleteNearSelection(this, function (range$$1) {
                var other = findPosH(doc, range$$1.head, dir, unit, false);
                return dir < 0 ? {from: other, to: range$$1.head} : {from: range$$1.head, to: other}
              }); }
          }),

          findPosV: function(from, amount, unit, goalColumn) {
            var this$1$1 = this;

            var dir = 1, x = goalColumn;
            if (amount < 0) { dir = -1; amount = -amount; }
            var cur = clipPos(this.doc, from);
            for (var i = 0; i < amount; ++i) {
              var coords = cursorCoords(this$1$1, cur, "div");
              if (x == null) { x = coords.left; }
              else { coords.left = x; }
              cur = findPosV(this$1$1, coords, dir, unit);
              if (cur.hitSide) { break }
            }
            return cur
          },

          moveV: methodOp(function(dir, unit) {
            var this$1$1 = this;

            var doc = this.doc, goals = [];
            var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
            doc.extendSelectionsBy(function (range$$1) {
              if (collapse)
                { return dir < 0 ? range$$1.from() : range$$1.to() }
              var headPos = cursorCoords(this$1$1, range$$1.head, "div");
              if (range$$1.goalColumn != null) { headPos.left = range$$1.goalColumn; }
              goals.push(headPos.left);
              var pos = findPosV(this$1$1, headPos, dir, unit);
              if (unit == "page" && range$$1 == doc.sel.primary())
                { addToScrollTop(this$1$1, charCoords(this$1$1, pos, "div").top - headPos.top); }
              return pos
            }, sel_move);
            if (goals.length) { for (var i = 0; i < doc.sel.ranges.length; i++)
              { doc.sel.ranges[i].goalColumn = goals[i]; } }
          }),

          // Find the word at the given position (as returned by coordsChar).
          findWordAt: function(pos) {
            var doc = this.doc, line = getLine(doc, pos.line).text;
            var start = pos.ch, end = pos.ch;
            if (line) {
              var helper = this.getHelper(pos, "wordChars");
              if ((pos.sticky == "before" || end == line.length) && start) { --start; } else { ++end; }
              var startChar = line.charAt(start);
              var check = isWordChar(startChar, helper)
                ? function (ch) { return isWordChar(ch, helper); }
                : /\s/.test(startChar) ? function (ch) { return /\s/.test(ch); }
                : function (ch) { return (!/\s/.test(ch) && !isWordChar(ch)); };
              while (start > 0 && check(line.charAt(start - 1))) { --start; }
              while (end < line.length && check(line.charAt(end))) { ++end; }
            }
            return new Range(Pos(pos.line, start), Pos(pos.line, end))
          },

          toggleOverwrite: function(value) {
            if (value != null && value == this.state.overwrite) { return }
            if (this.state.overwrite = !this.state.overwrite)
              { addClass(this.display.cursorDiv, "CodeMirror-overwrite"); }
            else
              { rmClass(this.display.cursorDiv, "CodeMirror-overwrite"); }

            signal(this, "overwriteToggle", this, this.state.overwrite);
          },
          hasFocus: function() { return this.display.input.getField() == activeElt() },
          isReadOnly: function() { return !!(this.options.readOnly || this.doc.cantEdit) },

          scrollTo: methodOp(function (x, y) { scrollToCoords(this, x, y); }),
          getScrollInfo: function() {
            var scroller = this.display.scroller;
            return {left: scroller.scrollLeft, top: scroller.scrollTop,
                    height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
                    width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
                    clientHeight: displayHeight(this), clientWidth: displayWidth(this)}
          },

          scrollIntoView: methodOp(function(range$$1, margin) {
            if (range$$1 == null) {
              range$$1 = {from: this.doc.sel.primary().head, to: null};
              if (margin == null) { margin = this.options.cursorScrollMargin; }
            } else if (typeof range$$1 == "number") {
              range$$1 = {from: Pos(range$$1, 0), to: null};
            } else if (range$$1.from == null) {
              range$$1 = {from: range$$1, to: null};
            }
            if (!range$$1.to) { range$$1.to = range$$1.from; }
            range$$1.margin = margin || 0;

            if (range$$1.from.line != null) {
              scrollToRange(this, range$$1);
            } else {
              scrollToCoordsRange(this, range$$1.from, range$$1.to, range$$1.margin);
            }
          }),

          setSize: methodOp(function(width, height) {
            var this$1$1 = this;

            var interpret = function (val) { return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val; };
            if (width != null) { this.display.wrapper.style.width = interpret(width); }
            if (height != null) { this.display.wrapper.style.height = interpret(height); }
            if (this.options.lineWrapping) { clearLineMeasurementCache(this); }
            var lineNo$$1 = this.display.viewFrom;
            this.doc.iter(lineNo$$1, this.display.viewTo, function (line) {
              if (line.widgets) { for (var i = 0; i < line.widgets.length; i++)
                { if (line.widgets[i].noHScroll) { regLineChange(this$1$1, lineNo$$1, "widget"); break } } }
              ++lineNo$$1;
            });
            this.curOp.forceUpdate = true;
            signal(this, "refresh", this);
          }),

          operation: function(f){return runInOp(this, f)},
          startOperation: function(){return startOperation(this)},
          endOperation: function(){return endOperation(this)},

          refresh: methodOp(function() {
            var oldHeight = this.display.cachedTextHeight;
            regChange(this);
            this.curOp.forceUpdate = true;
            clearCaches(this);
            scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
            updateGutterSpace(this.display);
            if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
              { estimateLineHeights(this); }
            signal(this, "refresh", this);
          }),

          swapDoc: methodOp(function(doc) {
            var old = this.doc;
            old.cm = null;
            // Cancel the current text selection if any (#5821)
            if (this.state.selectingText) { this.state.selectingText(); }
            attachDoc(this, doc);
            clearCaches(this);
            this.display.input.reset();
            scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
            this.curOp.forceScroll = true;
            signalLater(this, "swapDoc", this, old);
            return old
          }),

          phrase: function(phraseText) {
            var phrases = this.options.phrases;
            return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText
          },

          getInputField: function(){return this.display.input.getField()},
          getWrapperElement: function(){return this.display.wrapper},
          getScrollerElement: function(){return this.display.scroller},
          getGutterElement: function(){return this.display.gutters}
        };
        eventMixin(CodeMirror);

        CodeMirror.registerHelper = function(type, name, value) {
          if (!helpers.hasOwnProperty(type)) { helpers[type] = CodeMirror[type] = {_global: []}; }
          helpers[type][name] = value;
        };
        CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
          CodeMirror.registerHelper(type, name, value);
          helpers[type]._global.push({pred: predicate, val: value});
        };
      }

      // Used for horizontal relative motion. Dir is -1 or 1 (left or
      // right), unit can be "char", "column" (like char, but doesn't
      // cross line boundaries), "word" (across next word), or "group" (to
      // the start of next group of word or non-word-non-whitespace
      // chars). The visually param controls whether, in right-to-left
      // text, direction 1 means to move towards the next index in the
      // string, or towards the character to the right of the current
      // position. The resulting position will have a hitSide=true
      // property if it reached the end of the document.
      function findPosH(doc, pos, dir, unit, visually) {
        var oldPos = pos;
        var origDir = dir;
        var lineObj = getLine(doc, pos.line);
        function findNextLine() {
          var l = pos.line + dir;
          if (l < doc.first || l >= doc.first + doc.size) { return false }
          pos = new Pos(l, pos.ch, pos.sticky);
          return lineObj = getLine(doc, l)
        }
        function moveOnce(boundToLine) {
          var next;
          if (visually) {
            next = moveVisually(doc.cm, lineObj, pos, dir);
          } else {
            next = moveLogically(lineObj, pos, dir);
          }
          if (next == null) {
            if (!boundToLine && findNextLine())
              { pos = endOfLine(visually, doc.cm, lineObj, pos.line, dir); }
            else
              { return false }
          } else {
            pos = next;
          }
          return true
        }

        if (unit == "char") {
          moveOnce();
        } else if (unit == "column") {
          moveOnce(true);
        } else if (unit == "word" || unit == "group") {
          var sawType = null, group = unit == "group";
          var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
          for (var first = true;; first = false) {
            if (dir < 0 && !moveOnce(!first)) { break }
            var cur = lineObj.text.charAt(pos.ch) || "\n";
            var type = isWordChar(cur, helper) ? "w"
              : group && cur == "\n" ? "n"
              : !group || /\s/.test(cur) ? null
              : "p";
            if (group && !first && !type) { type = "s"; }
            if (sawType && sawType != type) {
              if (dir < 0) {dir = 1; moveOnce(); pos.sticky = "after";}
              break
            }

            if (type) { sawType = type; }
            if (dir > 0 && !moveOnce(!first)) { break }
          }
        }
        var result = skipAtomic(doc, pos, oldPos, origDir, true);
        if (equalCursorPos(oldPos, result)) { result.hitSide = true; }
        return result
      }

      // For relative vertical movement. Dir may be -1 or 1. Unit can be
      // "page" or "line". The resulting position will have a hitSide=true
      // property if it reached the end of the document.
      function findPosV(cm, pos, dir, unit) {
        var doc = cm.doc, x = pos.left, y;
        if (unit == "page") {
          var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
          var moveAmount = Math.max(pageSize - .5 * textHeight(cm.display), 3);
          y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;

        } else if (unit == "line") {
          y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
        }
        var target;
        for (;;) {
          target = coordsChar(cm, x, y);
          if (!target.outside) { break }
          if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break }
          y += dir * 5;
        }
        return target
      }

      // CONTENTEDITABLE INPUT STYLE

      var ContentEditableInput = function(cm) {
        this.cm = cm;
        this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
        this.polling = new Delayed();
        this.composing = null;
        this.gracePeriod = false;
        this.readDOMTimeout = null;
      };

      ContentEditableInput.prototype.init = function (display) {
          var this$1$1 = this;

        var input = this, cm = input.cm;
        var div = input.div = display.lineDiv;
        disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);

        on(div, "paste", function (e) {
          if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }
          // IE doesn't fire input events, so we schedule a read for the pasted content in this way
          if (ie_version <= 11) { setTimeout(operation(cm, function () { return this$1$1.updateFromDOM(); }), 20); }
        });

        on(div, "compositionstart", function (e) {
          this$1$1.composing = {data: e.data, done: false};
        });
        on(div, "compositionupdate", function (e) {
          if (!this$1$1.composing) { this$1$1.composing = {data: e.data, done: false}; }
        });
        on(div, "compositionend", function (e) {
          if (this$1$1.composing) {
            if (e.data != this$1$1.composing.data) { this$1$1.readFromDOMSoon(); }
            this$1$1.composing.done = true;
          }
        });

        on(div, "touchstart", function () { return input.forceCompositionEnd(); });

        on(div, "input", function () {
          if (!this$1$1.composing) { this$1$1.readFromDOMSoon(); }
        });

        function onCopyCut(e) {
          if (signalDOMEvent(cm, e)) { return }
          if (cm.somethingSelected()) {
            setLastCopied({lineWise: false, text: cm.getSelections()});
            if (e.type == "cut") { cm.replaceSelection("", null, "cut"); }
          } else if (!cm.options.lineWiseCopyCut) {
            return
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({lineWise: true, text: ranges.text});
            if (e.type == "cut") {
              cm.operation(function () {
                cm.setSelections(ranges.ranges, 0, sel_dontScroll);
                cm.replaceSelection("", null, "cut");
              });
            }
          }
          if (e.clipboardData) {
            e.clipboardData.clearData();
            var content = lastCopied.text.join("\n");
            // iOS exposes the clipboard API, but seems to discard content inserted into it
            e.clipboardData.setData("Text", content);
            if (e.clipboardData.getData("Text") == content) {
              e.preventDefault();
              return
            }
          }
          // Old-fashioned briefly-focus-a-textarea hack
          var kludge = hiddenTextarea(), te = kludge.firstChild;
          cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
          te.value = lastCopied.text.join("\n");
          var hadFocus = document.activeElement;
          selectInput(te);
          setTimeout(function () {
            cm.display.lineSpace.removeChild(kludge);
            hadFocus.focus();
            if (hadFocus == div) { input.showPrimarySelection(); }
          }, 50);
        }
        on(div, "copy", onCopyCut);
        on(div, "cut", onCopyCut);
      };

      ContentEditableInput.prototype.prepareSelection = function () {
        var result = prepareSelection(this.cm, false);
        result.focus = this.cm.state.focused;
        return result
      };

      ContentEditableInput.prototype.showSelection = function (info, takeFocus) {
        if (!info || !this.cm.display.view.length) { return }
        if (info.focus || takeFocus) { this.showPrimarySelection(); }
        this.showMultipleSelections(info);
      };

      ContentEditableInput.prototype.getSelection = function () {
        return this.cm.display.wrapper.ownerDocument.getSelection()
      };

      ContentEditableInput.prototype.showPrimarySelection = function () {
        var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
        var from = prim.from(), to = prim.to();

        if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
          sel.removeAllRanges();
          return
        }

        var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad &&
            cmp(minPos(curAnchor, curFocus), from) == 0 &&
            cmp(maxPos(curAnchor, curFocus), to) == 0)
          { return }

        var view = cm.display.view;
        var start = (from.line >= cm.display.viewFrom && posToDOM(cm, from)) ||
            {node: view[0].measure.map[2], offset: 0};
        var end = to.line < cm.display.viewTo && posToDOM(cm, to);
        if (!end) {
          var measure = view[view.length - 1].measure;
          var map$$1 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
          end = {node: map$$1[map$$1.length - 1], offset: map$$1[map$$1.length - 2] - map$$1[map$$1.length - 3]};
        }

        if (!start || !end) {
          sel.removeAllRanges();
          return
        }

        var old = sel.rangeCount && sel.getRangeAt(0), rng;
        try { rng = range(start.node, start.offset, end.offset, end.node); }
        catch(e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
        if (rng) {
          if (!gecko && cm.state.focused) {
            sel.collapse(start.node, start.offset);
            if (!rng.collapsed) {
              sel.removeAllRanges();
              sel.addRange(rng);
            }
          } else {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
          if (old && sel.anchorNode == null) { sel.addRange(old); }
          else if (gecko) { this.startGracePeriod(); }
        }
        this.rememberSelection();
      };

      ContentEditableInput.prototype.startGracePeriod = function () {
          var this$1$1 = this;

        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function () {
          this$1$1.gracePeriod = false;
          if (this$1$1.selectionChanged())
            { this$1$1.cm.operation(function () { return this$1$1.cm.curOp.selectionChanged = true; }); }
        }, 20);
      };

      ContentEditableInput.prototype.showMultipleSelections = function (info) {
        removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
        removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
      };

      ContentEditableInput.prototype.rememberSelection = function () {
        var sel = this.getSelection();
        this.lastAnchorNode = sel.anchorNode; this.lastAnchorOffset = sel.anchorOffset;
        this.lastFocusNode = sel.focusNode; this.lastFocusOffset = sel.focusOffset;
      };

      ContentEditableInput.prototype.selectionInEditor = function () {
        var sel = this.getSelection();
        if (!sel.rangeCount) { return false }
        var node = sel.getRangeAt(0).commonAncestorContainer;
        return contains(this.div, node)
      };

      ContentEditableInput.prototype.focus = function () {
        if (this.cm.options.readOnly != "nocursor") {
          if (!this.selectionInEditor())
            { this.showSelection(this.prepareSelection(), true); }
          this.div.focus();
        }
      };
      ContentEditableInput.prototype.blur = function () { this.div.blur(); };
      ContentEditableInput.prototype.getField = function () { return this.div };

      ContentEditableInput.prototype.supportsTouch = function () { return true };

      ContentEditableInput.prototype.receivedFocus = function () {
        var input = this;
        if (this.selectionInEditor())
          { this.pollSelection(); }
        else
          { runInOp(this.cm, function () { return input.cm.curOp.selectionChanged = true; }); }

        function poll() {
          if (input.cm.state.focused) {
            input.pollSelection();
            input.polling.set(input.cm.options.pollInterval, poll);
          }
        }
        this.polling.set(this.cm.options.pollInterval, poll);
      };

      ContentEditableInput.prototype.selectionChanged = function () {
        var sel = this.getSelection();
        return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset ||
          sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset
      };

      ContentEditableInput.prototype.pollSelection = function () {
        if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) { return }
        var sel = this.getSelection(), cm = this.cm;
        // On Android Chrome (version 56, at least), backspacing into an
        // uneditable block element will put the cursor in that element,
        // and then, because it's not editable, hide the virtual keyboard.
        // Because Android doesn't allow us to actually detect backspace
        // presses in a sane way, this code checks for when that happens
        // and simulates a backspace press in this case.
        if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
          this.cm.triggerOnKeyDown({type: "keydown", keyCode: 8, preventDefault: Math.abs});
          this.blur();
          this.focus();
          return
        }
        if (this.composing) { return }
        this.rememberSelection();
        var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var head = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (anchor && head) { runInOp(cm, function () {
          setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
          if (anchor.bad || head.bad) { cm.curOp.selectionChanged = true; }
        }); }
      };

      ContentEditableInput.prototype.pollContent = function () {
        if (this.readDOMTimeout != null) {
          clearTimeout(this.readDOMTimeout);
          this.readDOMTimeout = null;
        }

        var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
        var from = sel.from(), to = sel.to();
        if (from.ch == 0 && from.line > cm.firstLine())
          { from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length); }
        if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine())
          { to = Pos(to.line + 1, 0); }
        if (from.line < display.viewFrom || to.line > display.viewTo - 1) { return false }

        var fromIndex, fromLine, fromNode;
        if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
          fromLine = lineNo(display.view[0].line);
          fromNode = display.view[0].node;
        } else {
          fromLine = lineNo(display.view[fromIndex].line);
          fromNode = display.view[fromIndex - 1].node.nextSibling;
        }
        var toIndex = findViewIndex(cm, to.line);
        var toLine, toNode;
        if (toIndex == display.view.length - 1) {
          toLine = display.viewTo - 1;
          toNode = display.lineDiv.lastChild;
        } else {
          toLine = lineNo(display.view[toIndex + 1].line) - 1;
          toNode = display.view[toIndex + 1].node.previousSibling;
        }

        if (!fromNode) { return false }
        var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
        var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
        while (newText.length > 1 && oldText.length > 1) {
          if (lst(newText) == lst(oldText)) { newText.pop(); oldText.pop(); toLine--; }
          else if (newText[0] == oldText[0]) { newText.shift(); oldText.shift(); fromLine++; }
          else { break }
        }

        var cutFront = 0, cutEnd = 0;
        var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
        while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront))
          { ++cutFront; }
        var newBot = lst(newText), oldBot = lst(oldText);
        var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0),
                                 oldBot.length - (oldText.length == 1 ? cutFront : 0));
        while (cutEnd < maxCutEnd &&
               newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1))
          { ++cutEnd; }
        // Try to move start of change to start of selection if ambiguous
        if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
          while (cutFront && cutFront > from.ch &&
                 newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
            cutFront--;
            cutEnd++;
          }
        }

        newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
        newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");

        var chFrom = Pos(fromLine, cutFront);
        var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
        if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
          replaceRange(cm.doc, newText, chFrom, chTo, "+input");
          return true
        }
      };

      ContentEditableInput.prototype.ensurePolled = function () {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.reset = function () {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.forceCompositionEnd = function () {
        if (!this.composing) { return }
        clearTimeout(this.readDOMTimeout);
        this.composing = null;
        this.updateFromDOM();
        this.div.blur();
        this.div.focus();
      };
      ContentEditableInput.prototype.readFromDOMSoon = function () {
          var this$1$1 = this;

        if (this.readDOMTimeout != null) { return }
        this.readDOMTimeout = setTimeout(function () {
          this$1$1.readDOMTimeout = null;
          if (this$1$1.composing) {
            if (this$1$1.composing.done) { this$1$1.composing = null; }
            else { return }
          }
          this$1$1.updateFromDOM();
        }, 80);
      };

      ContentEditableInput.prototype.updateFromDOM = function () {
          var this$1$1 = this;

        if (this.cm.isReadOnly() || !this.pollContent())
          { runInOp(this.cm, function () { return regChange(this$1$1.cm); }); }
      };

      ContentEditableInput.prototype.setUneditable = function (node) {
        node.contentEditable = "false";
      };

      ContentEditableInput.prototype.onKeyPress = function (e) {
        if (e.charCode == 0 || this.composing) { return }
        e.preventDefault();
        if (!this.cm.isReadOnly())
          { operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0); }
      };

      ContentEditableInput.prototype.readOnlyChanged = function (val) {
        this.div.contentEditable = String(val != "nocursor");
      };

      ContentEditableInput.prototype.onContextMenu = function () {};
      ContentEditableInput.prototype.resetPosition = function () {};

      ContentEditableInput.prototype.needsContentAttribute = true;

      function posToDOM(cm, pos) {
        var view = findViewForLine(cm, pos.line);
        if (!view || view.hidden) { return null }
        var line = getLine(cm.doc, pos.line);
        var info = mapFromLineView(view, line, pos.line);

        var order = getOrder(line, cm.doc.direction), side = "left";
        if (order) {
          var partPos = getBidiPartAt(order, pos.ch);
          side = partPos % 2 ? "right" : "left";
        }
        var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
        result.offset = result.collapse == "right" ? result.end : result.start;
        return result
      }

      function isInGutter(node) {
        for (var scan = node; scan; scan = scan.parentNode)
          { if (/CodeMirror-gutter-wrapper/.test(scan.className)) { return true } }
        return false
      }

      function badPos(pos, bad) { if (bad) { pos.bad = true; } return pos }

      function domTextBetween(cm, from, to, fromLine, toLine) {
        var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
        function recognizeMarker(id) { return function (marker) { return marker.id == id; } }
        function close() {
          if (closing) {
            text += lineSep;
            if (extraLinebreak) { text += lineSep; }
            closing = extraLinebreak = false;
          }
        }
        function addText(str) {
          if (str) {
            close();
            text += str;
          }
        }
        function walk(node) {
          if (node.nodeType == 1) {
            var cmText = node.getAttribute("cm-text");
            if (cmText) {
              addText(cmText);
              return
            }
            var markerID = node.getAttribute("cm-marker"), range$$1;
            if (markerID) {
              var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
              if (found.length && (range$$1 = found[0].find(0)))
                { addText(getBetween(cm.doc, range$$1.from, range$$1.to).join(lineSep)); }
              return
            }
            if (node.getAttribute("contenteditable") == "false") { return }
            var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
            if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) { return }

            if (isBlock) { close(); }
            for (var i = 0; i < node.childNodes.length; i++)
              { walk(node.childNodes[i]); }

            if (/^(pre|p)$/i.test(node.nodeName)) { extraLinebreak = true; }
            if (isBlock) { closing = true; }
          } else if (node.nodeType == 3) {
            addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
          }
        }
        for (;;) {
          walk(from);
          if (from == to) { break }
          from = from.nextSibling;
          extraLinebreak = false;
        }
        return text
      }

      function domToPos(cm, node, offset) {
        var lineNode;
        if (node == cm.display.lineDiv) {
          lineNode = cm.display.lineDiv.childNodes[offset];
          if (!lineNode) { return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true) }
          node = null; offset = 0;
        } else {
          for (lineNode = node;; lineNode = lineNode.parentNode) {
            if (!lineNode || lineNode == cm.display.lineDiv) { return null }
            if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) { break }
          }
        }
        for (var i = 0; i < cm.display.view.length; i++) {
          var lineView = cm.display.view[i];
          if (lineView.node == lineNode)
            { return locateNodeInLineView(lineView, node, offset) }
        }
      }

      function locateNodeInLineView(lineView, node, offset) {
        var wrapper = lineView.text.firstChild, bad = false;
        if (!node || !contains(wrapper, node)) { return badPos(Pos(lineNo(lineView.line), 0), true) }
        if (node == wrapper) {
          bad = true;
          node = wrapper.childNodes[offset];
          offset = 0;
          if (!node) {
            var line = lineView.rest ? lst(lineView.rest) : lineView.line;
            return badPos(Pos(lineNo(line), line.text.length), bad)
          }
        }

        var textNode = node.nodeType == 3 ? node : null, topNode = node;
        if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
          textNode = node.firstChild;
          if (offset) { offset = textNode.nodeValue.length; }
        }
        while (topNode.parentNode != wrapper) { topNode = topNode.parentNode; }
        var measure = lineView.measure, maps = measure.maps;

        function find(textNode, topNode, offset) {
          for (var i = -1; i < (maps ? maps.length : 0); i++) {
            var map$$1 = i < 0 ? measure.map : maps[i];
            for (var j = 0; j < map$$1.length; j += 3) {
              var curNode = map$$1[j + 2];
              if (curNode == textNode || curNode == topNode) {
                var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
                var ch = map$$1[j] + offset;
                if (offset < 0 || curNode != textNode) { ch = map$$1[j + (offset ? 1 : 0)]; }
                return Pos(line, ch)
              }
            }
          }
        }
        var found = find(textNode, topNode, offset);
        if (found) { return badPos(found, bad) }

        // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
        for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
          found = find(after, after.firstChild, 0);
          if (found)
            { return badPos(Pos(found.line, found.ch - dist), bad) }
          else
            { dist += after.textContent.length; }
        }
        for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
          found = find(before, before.firstChild, -1);
          if (found)
            { return badPos(Pos(found.line, found.ch + dist$1), bad) }
          else
            { dist$1 += before.textContent.length; }
        }
      }

      // TEXTAREA INPUT STYLE

      var TextareaInput = function(cm) {
        this.cm = cm;
        // See input.poll and input.reset
        this.prevInput = "";

        // Flag that indicates whether we expect input to appear real soon
        // now (after some event like 'keypress' or 'input') and are
        // polling intensively.
        this.pollingFast = false;
        // Self-resetting timeout for the poller
        this.polling = new Delayed();
        // Used to work around IE issue with selection being forgotten when focus moves away from textarea
        this.hasSelection = false;
        this.composing = null;
      };

      TextareaInput.prototype.init = function (display) {
          var this$1$1 = this;

        var input = this, cm = this.cm;
        this.createField(display);
        var te = this.textarea;

        display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);

        // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
        if (ios) { te.style.width = "0px"; }

        on(te, "input", function () {
          if (ie && ie_version >= 9 && this$1$1.hasSelection) { this$1$1.hasSelection = null; }
          input.poll();
        });

        on(te, "paste", function (e) {
          if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }

          cm.state.pasteIncoming = +new Date;
          input.fastPoll();
        });

        function prepareCopyCut(e) {
          if (signalDOMEvent(cm, e)) { return }
          if (cm.somethingSelected()) {
            setLastCopied({lineWise: false, text: cm.getSelections()});
          } else if (!cm.options.lineWiseCopyCut) {
            return
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({lineWise: true, text: ranges.text});
            if (e.type == "cut") {
              cm.setSelections(ranges.ranges, null, sel_dontScroll);
            } else {
              input.prevInput = "";
              te.value = ranges.text.join("\n");
              selectInput(te);
            }
          }
          if (e.type == "cut") { cm.state.cutIncoming = +new Date; }
        }
        on(te, "cut", prepareCopyCut);
        on(te, "copy", prepareCopyCut);

        on(display.scroller, "paste", function (e) {
          if (eventInWidget(display, e) || signalDOMEvent(cm, e)) { return }
          if (!te.dispatchEvent) {
            cm.state.pasteIncoming = +new Date;
            input.focus();
            return
          }

          // Pass the `paste` event to the textarea so it's handled by its event listener.
          var event = new Event("paste");
          event.clipboardData = e.clipboardData;
          te.dispatchEvent(event);
        });

        // Prevent normal selection in the editor (we handle our own)
        on(display.lineSpace, "selectstart", function (e) {
          if (!eventInWidget(display, e)) { e_preventDefault(e); }
        });

        on(te, "compositionstart", function () {
          var start = cm.getCursor("from");
          if (input.composing) { input.composing.range.clear(); }
          input.composing = {
            start: start,
            range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
          };
        });
        on(te, "compositionend", function () {
          if (input.composing) {
            input.poll();
            input.composing.range.clear();
            input.composing = null;
          }
        });
      };

      TextareaInput.prototype.createField = function (_display) {
        // Wraps and hides input textarea
        this.wrapper = hiddenTextarea();
        // The semihidden textarea that is focused when the editor is
        // focused, and receives input.
        this.textarea = this.wrapper.firstChild;
      };

      TextareaInput.prototype.prepareSelection = function () {
        // Redraw the selection and/or cursor
        var cm = this.cm, display = cm.display, doc = cm.doc;
        var result = prepareSelection(cm);

        // Move the hidden textarea near the cursor to prevent scrolling artifacts
        if (cm.options.moveInputWithCursor) {
          var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
          var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
          result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
                                              headPos.top + lineOff.top - wrapOff.top));
          result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
                                               headPos.left + lineOff.left - wrapOff.left));
        }

        return result
      };

      TextareaInput.prototype.showSelection = function (drawn) {
        var cm = this.cm, display = cm.display;
        removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
        removeChildrenAndAdd(display.selectionDiv, drawn.selection);
        if (drawn.teTop != null) {
          this.wrapper.style.top = drawn.teTop + "px";
          this.wrapper.style.left = drawn.teLeft + "px";
        }
      };

      // Reset the input to correspond to the selection (or to be empty,
      // when not typing and nothing is selected)
      TextareaInput.prototype.reset = function (typing) {
        if (this.contextMenuPending || this.composing) { return }
        var cm = this.cm;
        if (cm.somethingSelected()) {
          this.prevInput = "";
          var content = cm.getSelection();
          this.textarea.value = content;
          if (cm.state.focused) { selectInput(this.textarea); }
          if (ie && ie_version >= 9) { this.hasSelection = content; }
        } else if (!typing) {
          this.prevInput = this.textarea.value = "";
          if (ie && ie_version >= 9) { this.hasSelection = null; }
        }
      };

      TextareaInput.prototype.getField = function () { return this.textarea };

      TextareaInput.prototype.supportsTouch = function () { return false };

      TextareaInput.prototype.focus = function () {
        if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
          try { this.textarea.focus(); }
          catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
        }
      };

      TextareaInput.prototype.blur = function () { this.textarea.blur(); };

      TextareaInput.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      };

      TextareaInput.prototype.receivedFocus = function () { this.slowPoll(); };

      // Poll for input changes, using the normal rate of polling. This
      // runs as long as the editor is focused.
      TextareaInput.prototype.slowPoll = function () {
          var this$1$1 = this;

        if (this.pollingFast) { return }
        this.polling.set(this.cm.options.pollInterval, function () {
          this$1$1.poll();
          if (this$1$1.cm.state.focused) { this$1$1.slowPoll(); }
        });
      };

      // When an event has just come in that is likely to add or change
      // something in the input textarea, we poll faster, to ensure that
      // the change appears on the screen quickly.
      TextareaInput.prototype.fastPoll = function () {
        var missed = false, input = this;
        input.pollingFast = true;
        function p() {
          var changed = input.poll();
          if (!changed && !missed) {missed = true; input.polling.set(60, p);}
          else {input.pollingFast = false; input.slowPoll();}
        }
        input.polling.set(20, p);
      };

      // Read input from the textarea, and update the document to match.
      // When something is selected, it is present in the textarea, and
      // selected (unless it is huge, in which case a placeholder is
      // used). When nothing is selected, the cursor sits after previously
      // seen text (can be empty), which is stored in prevInput (we must
      // not reset the textarea when typing, because that breaks IME).
      TextareaInput.prototype.poll = function () {
          var this$1$1 = this;

        var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
        // Since this is called a *lot*, try to bail out as cheaply as
        // possible when it is clear that nothing happened. hasSelection
        // will be the case when there is a lot of text in the textarea,
        // in which case reading its value would be expensive.
        if (this.contextMenuPending || !cm.state.focused ||
            (hasSelection(input) && !prevInput && !this.composing) ||
            cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq)
          { return false }

        var text = input.value;
        // If nothing changed, bail.
        if (text == prevInput && !cm.somethingSelected()) { return false }
        // Work around nonsensical selection resetting in IE9/10, and
        // inexplicable appearance of private area unicode characters on
        // some key combos in Mac (#2689).
        if (ie && ie_version >= 9 && this.hasSelection === text ||
            mac && /[\uf700-\uf7ff]/.test(text)) {
          cm.display.input.reset();
          return false
        }

        if (cm.doc.sel == cm.display.selForContextMenu) {
          var first = text.charCodeAt(0);
          if (first == 0x200b && !prevInput) { prevInput = "\u200b"; }
          if (first == 0x21da) { this.reset(); return this.cm.execCommand("undo") }
        }
        // Find the part of the input that is actually new
        var same = 0, l = Math.min(prevInput.length, text.length);
        while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) { ++same; }

        runInOp(cm, function () {
          applyTextInput(cm, text.slice(same), prevInput.length - same,
                         null, this$1$1.composing ? "*compose" : null);

          // Don't leave long text in the textarea, since it makes further polling slow
          if (text.length > 1000 || text.indexOf("\n") > -1) { input.value = this$1$1.prevInput = ""; }
          else { this$1$1.prevInput = text; }

          if (this$1$1.composing) {
            this$1$1.composing.range.clear();
            this$1$1.composing.range = cm.markText(this$1$1.composing.start, cm.getCursor("to"),
                                               {className: "CodeMirror-composing"});
          }
        });
        return true
      };

      TextareaInput.prototype.ensurePolled = function () {
        if (this.pollingFast && this.poll()) { this.pollingFast = false; }
      };

      TextareaInput.prototype.onKeyPress = function () {
        if (ie && ie_version >= 9) { this.hasSelection = null; }
        this.fastPoll();
      };

      TextareaInput.prototype.onContextMenu = function (e) {
        var input = this, cm = input.cm, display = cm.display, te = input.textarea;
        if (input.contextMenuPending) { input.contextMenuPending(); }
        var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
        if (!pos || presto) { return } // Opera is difficult.

        // Reset the current text selection only if the click is done outside of the selection
        // and 'resetSelectionOnContextMenu' option is true.
        var reset = cm.options.resetSelectionOnContextMenu;
        if (reset && cm.doc.sel.contains(pos) == -1)
          { operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll); }

        var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
        var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
        input.wrapper.style.cssText = "position: static";
        te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
        var oldScrollY;
        if (webkit) { oldScrollY = window.scrollY; } // Work around Chrome issue (#2712)
        display.input.focus();
        if (webkit) { window.scrollTo(null, oldScrollY); }
        display.input.reset();
        // Adds "Select all" to context menu in FF
        if (!cm.somethingSelected()) { te.value = input.prevInput = " "; }
        input.contextMenuPending = rehide;
        display.selForContextMenu = cm.doc.sel;
        clearTimeout(display.detectingSelectAll);

        // Select-all will be greyed out if there's nothing to select, so
        // this adds a zero-width space so that we can later check whether
        // it got selected.
        function prepareSelectAllHack() {
          if (te.selectionStart != null) {
            var selected = cm.somethingSelected();
            var extval = "\u200b" + (selected ? te.value : "");
            te.value = "\u21da"; // Used to catch context-menu undo
            te.value = extval;
            input.prevInput = selected ? "" : "\u200b";
            te.selectionStart = 1; te.selectionEnd = extval.length;
            // Re-set this, in case some other handler touched the
            // selection in the meantime.
            display.selForContextMenu = cm.doc.sel;
          }
        }
        function rehide() {
          if (input.contextMenuPending != rehide) { return }
          input.contextMenuPending = false;
          input.wrapper.style.cssText = oldWrapperCSS;
          te.style.cssText = oldCSS;
          if (ie && ie_version < 9) { display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos); }

          // Try to detect the user choosing select-all
          if (te.selectionStart != null) {
            if (!ie || (ie && ie_version < 9)) { prepareSelectAllHack(); }
            var i = 0, poll = function () {
              if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 &&
                  te.selectionEnd > 0 && input.prevInput == "\u200b") {
                operation(cm, selectAll)(cm);
              } else if (i++ < 10) {
                display.detectingSelectAll = setTimeout(poll, 500);
              } else {
                display.selForContextMenu = null;
                display.input.reset();
              }
            };
            display.detectingSelectAll = setTimeout(poll, 200);
          }
        }

        if (ie && ie_version >= 9) { prepareSelectAllHack(); }
        if (captureRightClick) {
          e_stop(e);
          var mouseup = function () {
            off(window, "mouseup", mouseup);
            setTimeout(rehide, 20);
          };
          on(window, "mouseup", mouseup);
        } else {
          setTimeout(rehide, 50);
        }
      };

      TextareaInput.prototype.readOnlyChanged = function (val) {
        if (!val) { this.reset(); }
        this.textarea.disabled = val == "nocursor";
      };

      TextareaInput.prototype.setUneditable = function () {};

      TextareaInput.prototype.needsContentAttribute = false;

      function fromTextArea(textarea, options) {
        options = options ? copyObj(options) : {};
        options.value = textarea.value;
        if (!options.tabindex && textarea.tabIndex)
          { options.tabindex = textarea.tabIndex; }
        if (!options.placeholder && textarea.placeholder)
          { options.placeholder = textarea.placeholder; }
        // Set autofocus to true if this textarea is focused, or if it has
        // autofocus and no other element is focused.
        if (options.autofocus == null) {
          var hasFocus = activeElt();
          options.autofocus = hasFocus == textarea ||
            textarea.getAttribute("autofocus") != null && hasFocus == document.body;
        }

        function save() {textarea.value = cm.getValue();}

        var realSubmit;
        if (textarea.form) {
          on(textarea.form, "submit", save);
          // Deplorable hack to make the submit method do the right thing.
          if (!options.leaveSubmitMethodAlone) {
            var form = textarea.form;
            realSubmit = form.submit;
            try {
              var wrappedSubmit = form.submit = function () {
                save();
                form.submit = realSubmit;
                form.submit();
                form.submit = wrappedSubmit;
              };
            } catch(e) {}
          }
        }

        options.finishInit = function (cm) {
          cm.save = save;
          cm.getTextArea = function () { return textarea; };
          cm.toTextArea = function () {
            cm.toTextArea = isNaN; // Prevent this from being ran twice
            save();
            textarea.parentNode.removeChild(cm.getWrapperElement());
            textarea.style.display = "";
            if (textarea.form) {
              off(textarea.form, "submit", save);
              if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function")
                { textarea.form.submit = realSubmit; }
            }
          };
        };

        textarea.style.display = "none";
        var cm = CodeMirror(function (node) { return textarea.parentNode.insertBefore(node, textarea.nextSibling); },
          options);
        return cm
      }

      function addLegacyProps(CodeMirror) {
        CodeMirror.off = off;
        CodeMirror.on = on;
        CodeMirror.wheelEventPixels = wheelEventPixels;
        CodeMirror.Doc = Doc;
        CodeMirror.splitLines = splitLinesAuto;
        CodeMirror.countColumn = countColumn;
        CodeMirror.findColumn = findColumn;
        CodeMirror.isWordChar = isWordCharBasic;
        CodeMirror.Pass = Pass;
        CodeMirror.signal = signal;
        CodeMirror.Line = Line;
        CodeMirror.changeEnd = changeEnd;
        CodeMirror.scrollbarModel = scrollbarModel;
        CodeMirror.Pos = Pos;
        CodeMirror.cmpPos = cmp;
        CodeMirror.modes = modes;
        CodeMirror.mimeModes = mimeModes;
        CodeMirror.resolveMode = resolveMode;
        CodeMirror.getMode = getMode;
        CodeMirror.modeExtensions = modeExtensions;
        CodeMirror.extendMode = extendMode;
        CodeMirror.copyState = copyState;
        CodeMirror.startState = startState;
        CodeMirror.innerMode = innerMode;
        CodeMirror.commands = commands;
        CodeMirror.keyMap = keyMap;
        CodeMirror.keyName = keyName;
        CodeMirror.isModifierKey = isModifierKey;
        CodeMirror.lookupKey = lookupKey;
        CodeMirror.normalizeKeyMap = normalizeKeyMap;
        CodeMirror.StringStream = StringStream;
        CodeMirror.SharedTextMarker = SharedTextMarker;
        CodeMirror.TextMarker = TextMarker;
        CodeMirror.LineWidget = LineWidget;
        CodeMirror.e_preventDefault = e_preventDefault;
        CodeMirror.e_stopPropagation = e_stopPropagation;
        CodeMirror.e_stop = e_stop;
        CodeMirror.addClass = addClass;
        CodeMirror.contains = contains;
        CodeMirror.rmClass = rmClass;
        CodeMirror.keyNames = keyNames;
      }

      // EDITOR CONSTRUCTOR

      defineOptions(CodeMirror);

      addEditorMethods(CodeMirror);

      // Set up methods on CodeMirror's prototype to redirect to the editor's document.
      var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
      for (var prop in Doc.prototype) { if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
        { CodeMirror.prototype[prop] = (function(method) {
          return function() {return method.apply(this.doc, arguments)}
        })(Doc.prototype[prop]); } }

      eventMixin(Doc);
      CodeMirror.inputStyles = {"textarea": TextareaInput, "contenteditable": ContentEditableInput};

      // Extra arguments are stored as the mode's dependencies, which is
      // used by (legacy) mechanisms like loadmode.js to automatically
      // load a mode. (Preferred mechanism is the require/define calls.)
      CodeMirror.defineMode = function(name/*, mode, …*/) {
        if (!CodeMirror.defaults.mode && name != "null") { CodeMirror.defaults.mode = name; }
        defineMode.apply(this, arguments);
      };

      CodeMirror.defineMIME = defineMIME;

      // Minimal default mode.
      CodeMirror.defineMode("null", function () { return ({token: function (stream) { return stream.skipToEnd(); }}); });
      CodeMirror.defineMIME("text/plain", "null");

      // EXTENSIONS

      CodeMirror.defineExtension = function (name, func) {
        CodeMirror.prototype[name] = func;
      };
      CodeMirror.defineDocExtension = function (name, func) {
        Doc.prototype[name] = func;
      };

      CodeMirror.fromTextArea = fromTextArea;

      addLegacyProps(CodeMirror);

      CodeMirror.version = "5.50.2";

      return CodeMirror;

    })));
    });

    /* lib/CodeMirror/CodeMirror.svelte generated by Svelte v3.43.0 */
    const file$1 = "lib/CodeMirror/CodeMirror.svelte";

    function create_fragment$1(ctx) {
    	let textarea;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "textarea");
    			attr_dev(textarea, "tabindex", "0 ");
    			textarea.value = /*text*/ ctx[0];
    			add_location(textarea, file$1, 46, 0, 1058);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			/*textarea_binding*/ ctx[5](textarea);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 1) {
    				prop_dev(textarea, "value", /*text*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[5](null);
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
    	validate_slots('CodeMirror', slots, []);
    	let { text = '' } = $$props;
    	let { autofocus = true } = $$props;
    	let editor;
    	let el;

    	let { highlight = () => {
    		
    	} } = $$props;

    	let { onEnter = e => {
    		return lib.Pass;
    	} } = $$props;

    	const clear = function (doc) {
    		doc.getAllMarks().forEach(m => m.clear());
    	};

    	onMount(() => {
    		// create codemirror instance
    		editor = lib.fromTextArea(el, { autofocus, extraKeys: { Enter: onEnter } });

    		// update each keypress
    		editor.on('change', doc => {
    			clear(doc);
    			$$invalidate(0, text = doc.getValue());
    			let offsets = highlight(text);

    			offsets.forEach(m => {
    				let start = doc.posFromIndex(m.start);
    				let end = doc.posFromIndex(m.end);
    				editor.markText(start, end, { className: m.tag });
    			});
    		});

    		lib.signal(editor, 'change', editor);

    		setTimeout(
    			() => {
    				editor.focus();
    				editor.setCursor(editor.lineCount(), 0);
    			},
    			500
    		);
    	});

    	const writable_props = ['text', 'autofocus', 'highlight', 'onEnter'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CodeMirror> was created with unknown prop '${key}'`);
    	});

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(1, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('autofocus' in $$props) $$invalidate(2, autofocus = $$props.autofocus);
    		if ('highlight' in $$props) $$invalidate(3, highlight = $$props.highlight);
    		if ('onEnter' in $$props) $$invalidate(4, onEnter = $$props.onEnter);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		CodeMirror: lib,
    		text,
    		autofocus,
    		editor,
    		el,
    		highlight,
    		onEnter,
    		clear
    	});

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('autofocus' in $$props) $$invalidate(2, autofocus = $$props.autofocus);
    		if ('editor' in $$props) editor = $$props.editor;
    		if ('el' in $$props) $$invalidate(1, el = $$props.el);
    		if ('highlight' in $$props) $$invalidate(3, highlight = $$props.highlight);
    		if ('onEnter' in $$props) $$invalidate(4, onEnter = $$props.onEnter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, el, autofocus, highlight, onEnter, textarea_binding];
    }

    class CodeMirror_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			text: 0,
    			autofocus: 2,
    			highlight: 3,
    			onEnter: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CodeMirror_1",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get text() {
    		throw new Error("<CodeMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<CodeMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autofocus() {
    		throw new Error("<CodeMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autofocus(value) {
    		throw new Error("<CodeMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlight() {
    		throw new Error("<CodeMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlight(value) {
    		throw new Error("<CodeMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onEnter() {
    		throw new Error("<CodeMirror>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onEnter(value) {
    		throw new Error("<CodeMirror>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    // (33:2) <Left>
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
    			add_location(kbd, file, 33, 4, 1048);
    			set_style(div0, "margin-top", "2rem");
    			add_location(div0, file, 34, 4, 1130);
    			attr_dev(div1, "class", "down tab");
    			add_location(div1, file, 35, 4, 1167);
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
    		source: "(33:2) <Left>",
    		ctx
    	});

    	return block;
    }

    // (39:0) <One >
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
    			add_location(div, file, 40, 2, 1297);
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
    		source: "(39:0) <One >",
    		ctx
    	});

    	return block;
    }

    // (32:0) <Page bottom='40px'>
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
    		source: "(32:0) <Page bottom='40px'>",
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
    			add_location(a, file, 47, 2, 1389);
    			attr_dev(div, "class", "right light f09 svelte-1twwmwr");
    			add_location(div, file, 46, 0, 1357);
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
    		Back,
    		One,
    		Two,
    		Three,
    		Left,
    		CodeMirror: CodeMirror_1,
    		TextArea,
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