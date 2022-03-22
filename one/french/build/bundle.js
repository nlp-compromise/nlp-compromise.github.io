
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
    function insert(target, node, anchor) {
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
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
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
    const file$6 = "lib/Page.svelte";

    function create_fragment$6(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "side svelte-1qs1965");
    			add_location(div0, file$6, 10, 2, 173);
    			attr_dev(div1, "class", "container svelte-1qs1965");
    			set_style(div1, "margin-bottom", /*bottom*/ ctx[0]);
    			add_location(div1, file$6, 11, 2, 196);
    			attr_dev(div2, "class", "side svelte-1qs1965");
    			add_location(div2, file$6, 14, 2, 276);
    			attr_dev(div3, "class", "row svelte-1qs1965");
    			add_location(div3, file$6, 9, 0, 153);
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

    			if (!current || dirty & /*bottom*/ 1) {
    				set_style(div1, "margin-bottom", /*bottom*/ ctx[0]);
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
    	let { bottom = '140px' } = $$props;
    	let cmp;
    	const writable_props = ['color', 'bottom'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('bottom' in $$props) $$invalidate(0, bottom = $$props.bottom);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ colors, color, bottom, cmp });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('bottom' in $$props) $$invalidate(0, bottom = $$props.bottom);
    		if ('cmp' in $$props) cmp = $$props.cmp;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [bottom, color, $$scope, slots];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 1, bottom: 0 });

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

    	get bottom() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* lib/Two.svelte generated by Svelte v3.43.0 */
    const file$5 = "lib/Two.svelte";

    // (13:6) {#if accent}
    function create_if_block$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "line svelte-s0w7u3");
    			set_style(div, "background-color", /*accent*/ ctx[0]);
    			add_location(div, file$5, 13, 8, 313);
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
    		source: "(13:6) {#if accent}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div2;
    	let div1;
    	let t1;
    	let current;
    	let if_block = /*accent*/ ctx[0] && create_if_block$1(ctx);
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
    			add_location(div0, file$5, 9, 2, 197);
    			attr_dev(div1, "class", "body svelte-s0w7u3");
    			set_style(div1, "border-left", "3px solid " + /*left*/ ctx[1]);
    			add_location(div1, file$5, 11, 4, 229);
    			attr_dev(div2, "class", "box svelte-s0w7u3");
    			add_location(div2, file$5, 10, 2, 207);
    			attr_dev(div3, "class", "column svelte-s0w7u3");
    			add_location(div3, file$5, 8, 0, 174);
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
    			if (detaching) detach_dev(div3);
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { accent: 0, left: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Two",
    			options,
    			id: create_fragment$5.name
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

    /* lib/TextArea.svelte generated by Svelte v3.43.0 */

    const file$4 = "lib/TextArea.svelte";

    function create_fragment$4(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "input svelte-19ejfsy");
    			textarea.readOnly = /*readonly*/ ctx[2];
    			set_style(textarea, "width", /*width*/ ctx[1]);
    			set_style(textarea, "height", /*height*/ ctx[3]);
    			set_style(textarea, "font-size", /*size*/ ctx[4]);
    			set_style(textarea, "line-height", "1.5rem");
    			attr_dev(textarea, "spellcheck", "false");
    			attr_dev(textarea, "type", "text");
    			add_location(textarea, file$4, 18, 0, 374);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*value*/ ctx[0]);
    			/*textarea_binding*/ ctx[9](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*callback*/ ctx[6], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[8])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*readonly*/ 4) {
    				prop_dev(textarea, "readOnly", /*readonly*/ ctx[2]);
    			}

    			if (dirty & /*width*/ 2) {
    				set_style(textarea, "width", /*width*/ ctx[1]);
    			}

    			if (dirty & /*height*/ 8) {
    				set_style(textarea, "height", /*height*/ ctx[3]);
    			}

    			if (dirty & /*size*/ 16) {
    				set_style(textarea, "font-size", /*size*/ ctx[4]);
    			}

    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots('TextArea', slots, []);
    	let { value = '' } = $$props;
    	let el;

    	let { cb = () => {
    		
    	} } = $$props;

    	let { width = '60%' } = $$props;
    	let { readonly = undefined } = $$props;
    	let { height = '' } = $$props;
    	let { size = '1.2rem' } = $$props;

    	const callback = function (e) {
    		cb(e.target.value);
    	};

    	const writable_props = ['value', 'cb', 'width', 'readonly', 'height', 'size'];

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
    			$$invalidate(5, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('cb' in $$props) $$invalidate(7, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('readonly' in $$props) $$invalidate(2, readonly = $$props.readonly);
    		if ('height' in $$props) $$invalidate(3, height = $$props.height);
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({
    		value,
    		el,
    		cb,
    		width,
    		readonly,
    		height,
    		size,
    		callback
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('el' in $$props) $$invalidate(5, el = $$props.el);
    		if ('cb' in $$props) $$invalidate(7, cb = $$props.cb);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('readonly' in $$props) $$invalidate(2, readonly = $$props.readonly);
    		if ('height' in $$props) $$invalidate(3, height = $$props.height);
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		width,
    		readonly,
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

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			value: 0,
    			cb: 7,
    			width: 1,
    			readonly: 2,
    			height: 3,
    			size: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextArea",
    			options,
    			id: create_fragment$4.name
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

    	get readonly() {
    		throw new Error("<TextArea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
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

    const file$3 = "lib/Back.svelte";

    // (19:2) {#if hover}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "spencermountain";
    			attr_dev(div, "class", "name svelte-2hakpb");
    			add_location(div, file$3, 19, 4, 573);
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

    function create_fragment$3(ctx) {
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
    			add_location(path, file$3, 9, 6, 303);
    			attr_dev(g, "stroke", "none");
    			attr_dev(g, "stroke-width", "1");
    			attr_dev(g, "fill", "none");
    			attr_dev(g, "fill-rule", "evenodd");
    			attr_dev(g, "stroke-linejoin", "round");
    			add_location(g, file$3, 8, 4, 206);
    			attr_dev(svg, "width", "15px");
    			attr_dev(svg, "height", "50px");
    			attr_dev(svg, "viewBox", "0 0 90 170");
    			add_location(svg, file$3, 7, 2, 148);
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "class", "container svelte-2hakpb");
    			add_location(a, file$3, 6, 0, 117);
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Back', slots, []);
    	let { href = 'https://compromise.cool' } = $$props;
    	let { color = '#525050' } = $$props;
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { href: 0, color: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Back",
    			options,
    			id: create_fragment$3.name
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

    createCommonjsModule(function (module, exports) {
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

    /* lib/Below.svelte generated by Svelte v3.43.0 */

    const file$2 = "lib/Below.svelte";

    function create_fragment$2(ctx) {
    	let div4;
    	let div0;
    	let t0;
    	let div2;
    	let div1;
    	let t1;
    	let div3;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div3 = element("div");
    			attr_dev(div0, "class", "side svelte-1hre34c");
    			add_location(div0, file$2, 4, 2, 40);
    			attr_dev(div1, "class", "half svelte-1hre34c");
    			add_location(div1, file$2, 6, 4, 91);
    			attr_dev(div2, "class", "container svelte-1hre34c");
    			add_location(div2, file$2, 5, 2, 63);
    			attr_dev(div3, "class", "side svelte-1hre34c");
    			add_location(div3, file$2, 10, 2, 147);
    			attr_dev(div4, "class", "row svelte-1hre34c");
    			add_location(div4, file$2, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div4, t0);
    			append_dev(div4, div2);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div4, t1);
    			append_dev(div4, div3);
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
    			if (detaching) detach_dev(div4);
    			if (default_slot) default_slot.d(detaching);
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
    	validate_slots('Below', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Below> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Below extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Below",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    var deepFreezeEs6 = {exports: {}};

    function deepFreeze(obj) {
        if (obj instanceof Map) {
            obj.clear = obj.delete = obj.set = function () {
                throw new Error('map is read-only');
            };
        } else if (obj instanceof Set) {
            obj.add = obj.clear = obj.delete = function () {
                throw new Error('set is read-only');
            };
        }

        // Freeze self
        Object.freeze(obj);

        Object.getOwnPropertyNames(obj).forEach(function (name) {
            var prop = obj[name];

            // Freeze prop if it is an object
            if (typeof prop == 'object' && !Object.isFrozen(prop)) {
                deepFreeze(prop);
            }
        });

        return obj;
    }

    deepFreezeEs6.exports = deepFreeze;
    deepFreezeEs6.exports.default = deepFreeze;

    var deepFreeze$1 = deepFreezeEs6.exports;

    /** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
    /** @typedef {import('highlight.js').CompiledMode} CompiledMode */
    /** @implements CallbackResponse */

    class Response {
      /**
       * @param {CompiledMode} mode
       */
      constructor(mode) {
        // eslint-disable-next-line no-undefined
        if (mode.data === undefined) mode.data = {};

        this.data = mode.data;
        this.isMatchIgnored = false;
      }

      ignoreMatch() {
        this.isMatchIgnored = true;
      }
    }

    /**
     * @param {string} value
     * @returns {string}
     */
    function escapeHTML(value) {
      return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    }

    /**
     * performs a shallow merge of multiple objects into one
     *
     * @template T
     * @param {T} original
     * @param {Record<string,any>[]} objects
     * @returns {T} a single new object
     */
    function inherit$1(original, ...objects) {
      /** @type Record<string,any> */
      const result = Object.create(null);

      for (const key in original) {
        result[key] = original[key];
      }
      objects.forEach(function(obj) {
        for (const key in obj) {
          result[key] = obj[key];
        }
      });
      return /** @type {T} */ (result);
    }

    /**
     * @typedef {object} Renderer
     * @property {(text: string) => void} addText
     * @property {(node: Node) => void} openNode
     * @property {(node: Node) => void} closeNode
     * @property {() => string} value
     */

    /** @typedef {{kind?: string, sublanguage?: boolean}} Node */
    /** @typedef {{walk: (r: Renderer) => void}} Tree */
    /** */

    const SPAN_CLOSE = '</span>';

    /**
     * Determines if a node needs to be wrapped in <span>
     *
     * @param {Node} node */
    const emitsWrappingTags = (node) => {
      return !!node.kind;
    };

    /**
     *
     * @param {string} name
     * @param {{prefix:string}} options
     */
    const expandScopeName = (name, { prefix }) => {
      if (name.includes(".")) {
        const pieces = name.split(".");
        return [
          `${prefix}${pieces.shift()}`,
          ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
        ].join(" ");
      }
      return `${prefix}${name}`;
    };

    /** @type {Renderer} */
    class HTMLRenderer {
      /**
       * Creates a new HTMLRenderer
       *
       * @param {Tree} parseTree - the parse tree (must support `walk` API)
       * @param {{classPrefix: string}} options
       */
      constructor(parseTree, options) {
        this.buffer = "";
        this.classPrefix = options.classPrefix;
        parseTree.walk(this);
      }

      /**
       * Adds texts to the output stream
       *
       * @param {string} text */
      addText(text) {
        this.buffer += escapeHTML(text);
      }

      /**
       * Adds a node open to the output stream (if needed)
       *
       * @param {Node} node */
      openNode(node) {
        if (!emitsWrappingTags(node)) return;

        let scope = node.kind;
        if (node.sublanguage) {
          scope = `language-${scope}`;
        } else {
          scope = expandScopeName(scope, { prefix: this.classPrefix });
        }
        this.span(scope);
      }

      /**
       * Adds a node close to the output stream (if needed)
       *
       * @param {Node} node */
      closeNode(node) {
        if (!emitsWrappingTags(node)) return;

        this.buffer += SPAN_CLOSE;
      }

      /**
       * returns the accumulated buffer
      */
      value() {
        return this.buffer;
      }

      // helpers

      /**
       * Builds a span element
       *
       * @param {string} className */
      span(className) {
        this.buffer += `<span class="${className}">`;
      }
    }

    /** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */
    /** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */
    /** @typedef {import('highlight.js').Emitter} Emitter */
    /**  */

    class TokenTree {
      constructor() {
        /** @type DataNode */
        this.rootNode = { children: [] };
        this.stack = [this.rootNode];
      }

      get top() {
        return this.stack[this.stack.length - 1];
      }

      get root() { return this.rootNode; }

      /** @param {Node} node */
      add(node) {
        this.top.children.push(node);
      }

      /** @param {string} kind */
      openNode(kind) {
        /** @type Node */
        const node = { kind, children: [] };
        this.add(node);
        this.stack.push(node);
      }

      closeNode() {
        if (this.stack.length > 1) {
          return this.stack.pop();
        }
        // eslint-disable-next-line no-undefined
        return undefined;
      }

      closeAllNodes() {
        while (this.closeNode());
      }

      toJSON() {
        return JSON.stringify(this.rootNode, null, 4);
      }

      /**
       * @typedef { import("./html_renderer").Renderer } Renderer
       * @param {Renderer} builder
       */
      walk(builder) {
        // this does not
        return this.constructor._walk(builder, this.rootNode);
        // this works
        // return TokenTree._walk(builder, this.rootNode);
      }

      /**
       * @param {Renderer} builder
       * @param {Node} node
       */
      static _walk(builder, node) {
        if (typeof node === "string") {
          builder.addText(node);
        } else if (node.children) {
          builder.openNode(node);
          node.children.forEach((child) => this._walk(builder, child));
          builder.closeNode(node);
        }
        return builder;
      }

      /**
       * @param {Node} node
       */
      static _collapse(node) {
        if (typeof node === "string") return;
        if (!node.children) return;

        if (node.children.every(el => typeof el === "string")) {
          // node.text = node.children.join("");
          // delete node.children;
          node.children = [node.children.join("")];
        } else {
          node.children.forEach((child) => {
            TokenTree._collapse(child);
          });
        }
      }
    }

    /**
      Currently this is all private API, but this is the minimal API necessary
      that an Emitter must implement to fully support the parser.

      Minimal interface:

      - addKeyword(text, kind)
      - addText(text)
      - addSublanguage(emitter, subLanguageName)
      - finalize()
      - openNode(kind)
      - closeNode()
      - closeAllNodes()
      - toHTML()

    */

    /**
     * @implements {Emitter}
     */
    class TokenTreeEmitter extends TokenTree {
      /**
       * @param {*} options
       */
      constructor(options) {
        super();
        this.options = options;
      }

      /**
       * @param {string} text
       * @param {string} kind
       */
      addKeyword(text, kind) {
        if (text === "") { return; }

        this.openNode(kind);
        this.addText(text);
        this.closeNode();
      }

      /**
       * @param {string} text
       */
      addText(text) {
        if (text === "") { return; }

        this.add(text);
      }

      /**
       * @param {Emitter & {root: DataNode}} emitter
       * @param {string} name
       */
      addSublanguage(emitter, name) {
        /** @type DataNode */
        const node = emitter.root;
        node.kind = name;
        node.sublanguage = true;
        this.add(node);
      }

      toHTML() {
        const renderer = new HTMLRenderer(this, this.options);
        return renderer.value();
      }

      finalize() {
        return true;
      }
    }

    /**
     * @param {string} value
     * @returns {RegExp}
     * */

    /**
     * @param {RegExp | string } re
     * @returns {string}
     */
    function source(re) {
      if (!re) return null;
      if (typeof re === "string") return re;

      return re.source;
    }

    /**
     * @param {RegExp | string } re
     * @returns {string}
     */
    function lookahead(re) {
      return concat('(?=', re, ')');
    }

    /**
     * @param {RegExp | string } re
     * @returns {string}
     */
    function anyNumberOfTimes(re) {
      return concat('(?:', re, ')*');
    }

    /**
     * @param {RegExp | string } re
     * @returns {string}
     */
    function optional(re) {
      return concat('(?:', re, ')?');
    }

    /**
     * @param {...(RegExp | string) } args
     * @returns {string}
     */
    function concat(...args) {
      const joined = args.map((x) => source(x)).join("");
      return joined;
    }

    /**
     * @param { Array<string | RegExp | Object> } args
     * @returns {object}
     */
    function stripOptionsFromArgs(args) {
      const opts = args[args.length - 1];

      if (typeof opts === 'object' && opts.constructor === Object) {
        args.splice(args.length - 1, 1);
        return opts;
      } else {
        return {};
      }
    }

    /**
     * Any of the passed expresssions may match
     *
     * Creates a huge this | this | that | that match
     * @param {(RegExp | string)[] } args
     * @returns {string}
     */
    function either(...args) {
      /** @type { object & {capture?: boolean} }  */
      const opts = stripOptionsFromArgs(args);
      const joined = '('
        + (opts.capture ? "" : "?:")
        + args.map((x) => source(x)).join("|") + ")";
      return joined;
    }

    /**
     * @param {RegExp | string} re
     * @returns {number}
     */
    function countMatchGroups(re) {
      return (new RegExp(re.toString() + '|')).exec('').length - 1;
    }

    /**
     * Does lexeme start with a regular expression match at the beginning
     * @param {RegExp} re
     * @param {string} lexeme
     */
    function startsWith(re, lexeme) {
      const match = re && re.exec(lexeme);
      return match && match.index === 0;
    }

    // BACKREF_RE matches an open parenthesis or backreference. To avoid
    // an incorrect parse, it additionally matches the following:
    // - [...] elements, where the meaning of parentheses and escapes change
    // - other escape sequences, so we do not misparse escape sequences as
    //   interesting elements
    // - non-matching or lookahead parentheses, which do not capture. These
    //   follow the '(' with a '?'.
    const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;

    // **INTERNAL** Not intended for outside usage
    // join logically computes regexps.join(separator), but fixes the
    // backreferences so they continue to match.
    // it also places each individual regular expression into it's own
    // match group, keeping track of the sequencing of those match groups
    // is currently an exercise for the caller. :-)
    /**
     * @param {(string | RegExp)[]} regexps
     * @param {{joinWith: string}} opts
     * @returns {string}
     */
    function _rewriteBackreferences(regexps, { joinWith }) {
      let numCaptures = 0;

      return regexps.map((regex) => {
        numCaptures += 1;
        const offset = numCaptures;
        let re = source(regex);
        let out = '';

        while (re.length > 0) {
          const match = BACKREF_RE.exec(re);
          if (!match) {
            out += re;
            break;
          }
          out += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);
          if (match[0][0] === '\\' && match[1]) {
            // Adjust the backreference.
            out += '\\' + String(Number(match[1]) + offset);
          } else {
            out += match[0];
            if (match[0] === '(') {
              numCaptures++;
            }
          }
        }
        return out;
      }).map(re => `(${re})`).join(joinWith);
    }

    /** @typedef {import('highlight.js').Mode} Mode */
    /** @typedef {import('highlight.js').ModeCallback} ModeCallback */

    // Common regexps
    const MATCH_NOTHING_RE = /\b\B/;
    const IDENT_RE$1 = '[a-zA-Z]\\w*';
    const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
    const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
    const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
    const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
    const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

    /**
    * @param { Partial<Mode> & {binary?: string | RegExp} } opts
    */
    const SHEBANG = (opts = {}) => {
      const beginShebang = /^#![ ]*\//;
      if (opts.binary) {
        opts.begin = concat(
          beginShebang,
          /.*\b/,
          opts.binary,
          /\b.*/);
      }
      return inherit$1({
        scope: 'meta',
        begin: beginShebang,
        end: /$/,
        relevance: 0,
        /** @type {ModeCallback} */
        "on:begin": (m, resp) => {
          if (m.index !== 0) resp.ignoreMatch();
        }
      }, opts);
    };

    // Common modes
    const BACKSLASH_ESCAPE = {
      begin: '\\\\[\\s\\S]', relevance: 0
    };
    const APOS_STRING_MODE = {
      scope: 'string',
      begin: '\'',
      end: '\'',
      illegal: '\\n',
      contains: [BACKSLASH_ESCAPE]
    };
    const QUOTE_STRING_MODE = {
      scope: 'string',
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [BACKSLASH_ESCAPE]
    };
    const PHRASAL_WORDS_MODE = {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    };
    /**
     * Creates a comment mode
     *
     * @param {string | RegExp} begin
     * @param {string | RegExp} end
     * @param {Mode | {}} [modeOptions]
     * @returns {Partial<Mode>}
     */
    const COMMENT = function(begin, end, modeOptions = {}) {
      const mode = inherit$1(
        {
          scope: 'comment',
          begin,
          end,
          contains: []
        },
        modeOptions
      );
      mode.contains.push({
        scope: 'doctag',
        // hack to avoid the space from being included. the space is necessary to
        // match here to prevent the plain text rule below from gobbling up doctags
        begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
        end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
        excludeBegin: true,
        relevance: 0
      });
      const ENGLISH_WORD = either(
        // list of common 1 and 2 letter words in English
        "I",
        "a",
        "is",
        "so",
        "us",
        "to",
        "at",
        "if",
        "in",
        "it",
        "on",
        // note: this is not an exhaustive list of contractions, just popular ones
        /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
        /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
        /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
      );
      // looking like plain text, more likely to be a comment
      mode.contains.push(
        {
          // TODO: how to include ", (, ) without breaking grammars that use these for
          // comment delimiters?
          // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
          // ---

          // this tries to find sequences of 3 english words in a row (without any
          // "programming" type syntax) this gives us a strong signal that we've
          // TRULY found a comment - vs perhaps scanning with the wrong language.
          // It's possible to find something that LOOKS like the start of the
          // comment - but then if there is no readable text - good chance it is a
          // false match and not a comment.
          //
          // for a visual example please see:
          // https://github.com/highlightjs/highlight.js/issues/2827

          begin: concat(
            /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
            '(',
            ENGLISH_WORD,
            /[.]?[:]?([.][ ]|[ ])/,
            '){3}') // look for 3 words in a row
        }
      );
      return mode;
    };
    const C_LINE_COMMENT_MODE = COMMENT('//', '$');
    const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
    const HASH_COMMENT_MODE = COMMENT('#', '$');
    const NUMBER_MODE = {
      scope: 'number',
      begin: NUMBER_RE,
      relevance: 0
    };
    const C_NUMBER_MODE = {
      scope: 'number',
      begin: C_NUMBER_RE,
      relevance: 0
    };
    const BINARY_NUMBER_MODE = {
      scope: 'number',
      begin: BINARY_NUMBER_RE,
      relevance: 0
    };
    const REGEXP_MODE = {
      // this outer rule makes sure we actually have a WHOLE regex and not simply
      // an expression such as:
      //
      //     3 / something
      //
      // (which will then blow up when regex's `illegal` sees the newline)
      begin: /(?=\/[^/\n]*\/)/,
      contains: [{
        scope: 'regexp',
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [
          BACKSLASH_ESCAPE,
          {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [BACKSLASH_ESCAPE]
          }
        ]
      }]
    };
    const TITLE_MODE = {
      scope: 'title',
      begin: IDENT_RE$1,
      relevance: 0
    };
    const UNDERSCORE_TITLE_MODE = {
      scope: 'title',
      begin: UNDERSCORE_IDENT_RE,
      relevance: 0
    };
    const METHOD_GUARD = {
      // excludes method names from keyword processing
      begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
      relevance: 0
    };

    /**
     * Adds end same as begin mechanics to a mode
     *
     * Your mode must include at least a single () match group as that first match
     * group is what is used for comparison
     * @param {Partial<Mode>} mode
     */
    const END_SAME_AS_BEGIN = function(mode) {
      return Object.assign(mode,
        {
          /** @type {ModeCallback} */
          'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
          /** @type {ModeCallback} */
          'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
        });
    };

    var MODES = /*#__PURE__*/Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: MATCH_NOTHING_RE,
        IDENT_RE: IDENT_RE$1,
        UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
        NUMBER_RE: NUMBER_RE,
        C_NUMBER_RE: C_NUMBER_RE,
        BINARY_NUMBER_RE: BINARY_NUMBER_RE,
        RE_STARTERS_RE: RE_STARTERS_RE,
        SHEBANG: SHEBANG,
        BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
        APOS_STRING_MODE: APOS_STRING_MODE,
        QUOTE_STRING_MODE: QUOTE_STRING_MODE,
        PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
        COMMENT: COMMENT,
        C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
        C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
        HASH_COMMENT_MODE: HASH_COMMENT_MODE,
        NUMBER_MODE: NUMBER_MODE,
        C_NUMBER_MODE: C_NUMBER_MODE,
        BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
        REGEXP_MODE: REGEXP_MODE,
        TITLE_MODE: TITLE_MODE,
        UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
        METHOD_GUARD: METHOD_GUARD,
        END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
    });

    /**
    @typedef {import('highlight.js').CallbackResponse} CallbackResponse
    @typedef {import('highlight.js').CompilerExt} CompilerExt
    */

    // Grammar extensions / plugins
    // See: https://github.com/highlightjs/highlight.js/issues/2833

    // Grammar extensions allow "syntactic sugar" to be added to the grammar modes
    // without requiring any underlying changes to the compiler internals.

    // `compileMatch` being the perfect small example of now allowing a grammar
    // author to write `match` when they desire to match a single expression rather
    // than being forced to use `begin`.  The extension then just moves `match` into
    // `begin` when it runs.  Ie, no features have been added, but we've just made
    // the experience of writing (and reading grammars) a little bit nicer.

    // ------

    // TODO: We need negative look-behind support to do this properly
    /**
     * Skip a match if it has a preceding dot
     *
     * This is used for `beginKeywords` to prevent matching expressions such as
     * `bob.keyword.do()`. The mode compiler automatically wires this up as a
     * special _internal_ 'on:begin' callback for modes with `beginKeywords`
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    function skipIfHasPrecedingDot(match, response) {
      const before = match.input[match.index - 1];
      if (before === ".") {
        response.ignoreMatch();
      }
    }

    /**
     *
     * @type {CompilerExt}
     */
    function scopeClassName(mode, _parent) {
      // eslint-disable-next-line no-undefined
      if (mode.className !== undefined) {
        mode.scope = mode.className;
        delete mode.className;
      }
    }

    /**
     * `beginKeywords` syntactic sugar
     * @type {CompilerExt}
     */
    function beginKeywords(mode, parent) {
      if (!parent) return;
      if (!mode.beginKeywords) return;

      // for languages with keywords that include non-word characters checking for
      // a word boundary is not sufficient, so instead we check for a word boundary
      // or whitespace - this does no harm in any case since our keyword engine
      // doesn't allow spaces in keywords anyways and we still check for the boundary
      // first
      mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
      mode.__beforeBegin = skipIfHasPrecedingDot;
      mode.keywords = mode.keywords || mode.beginKeywords;
      delete mode.beginKeywords;

      // prevents double relevance, the keywords themselves provide
      // relevance, the mode doesn't need to double it
      // eslint-disable-next-line no-undefined
      if (mode.relevance === undefined) mode.relevance = 0;
    }

    /**
     * Allow `illegal` to contain an array of illegal values
     * @type {CompilerExt}
     */
    function compileIllegal(mode, _parent) {
      if (!Array.isArray(mode.illegal)) return;

      mode.illegal = either(...mode.illegal);
    }

    /**
     * `match` to match a single expression for readability
     * @type {CompilerExt}
     */
    function compileMatch(mode, _parent) {
      if (!mode.match) return;
      if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

      mode.begin = mode.match;
      delete mode.match;
    }

    /**
     * provides the default 1 relevance to all modes
     * @type {CompilerExt}
     */
    function compileRelevance(mode, _parent) {
      // eslint-disable-next-line no-undefined
      if (mode.relevance === undefined) mode.relevance = 1;
    }

    // allow beforeMatch to act as a "qualifier" for the match
    // the full match begin must be [beforeMatch][begin]
    const beforeMatchExt = (mode, parent) => {
      if (!mode.beforeMatch) return;
      // starts conflicts with endsParent which we need to make sure the child
      // rule is not matched multiple times
      if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

      const originalMode = Object.assign({}, mode);
      Object.keys(mode).forEach((key) => { delete mode[key]; });

      mode.keywords = originalMode.keywords;
      mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
      mode.starts = {
        relevance: 0,
        contains: [
          Object.assign(originalMode, { endsParent: true })
        ]
      };
      mode.relevance = 0;

      delete originalMode.beforeMatch;
    };

    // keywords that should have no default relevance value
    const COMMON_KEYWORDS = [
      'of',
      'and',
      'for',
      'in',
      'not',
      'or',
      'if',
      'then',
      'parent', // common variable name
      'list', // common variable name
      'value' // common variable name
    ];

    const DEFAULT_KEYWORD_SCOPE = "keyword";

    /**
     * Given raw keywords from a language definition, compile them.
     *
     * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
     * @param {boolean} caseInsensitive
     */
    function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
      /** @type KeywordDict */
      const compiledKeywords = Object.create(null);

      // input can be a string of keywords, an array of keywords, or a object with
      // named keys representing scopeName (which can then point to a string or array)
      if (typeof rawKeywords === 'string') {
        compileList(scopeName, rawKeywords.split(" "));
      } else if (Array.isArray(rawKeywords)) {
        compileList(scopeName, rawKeywords);
      } else {
        Object.keys(rawKeywords).forEach(function(scopeName) {
          // collapse all our objects back into the parent object
          Object.assign(
            compiledKeywords,
            compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
          );
        });
      }
      return compiledKeywords;

      // ---

      /**
       * Compiles an individual list of keywords
       *
       * Ex: "for if when while|5"
       *
       * @param {string} scopeName
       * @param {Array<string>} keywordList
       */
      function compileList(scopeName, keywordList) {
        if (caseInsensitive) {
          keywordList = keywordList.map(x => x.toLowerCase());
        }
        keywordList.forEach(function(keyword) {
          const pair = keyword.split('|');
          compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
        });
      }
    }

    /**
     * Returns the proper score for a given keyword
     *
     * Also takes into account comment keywords, which will be scored 0 UNLESS
     * another score has been manually assigned.
     * @param {string} keyword
     * @param {string} [providedScore]
     */
    function scoreForKeyword(keyword, providedScore) {
      // manual scores always win over common keywords
      // so you can force a score of 1 if you really insist
      if (providedScore) {
        return Number(providedScore);
      }

      return commonKeyword(keyword) ? 0 : 1;
    }

    /**
     * Determines if a given keyword is common or not
     *
     * @param {string} keyword */
    function commonKeyword(keyword) {
      return COMMON_KEYWORDS.includes(keyword.toLowerCase());
    }

    /*

    For the reasoning behind this please see:
    https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

    */

    /**
     * @type {Record<string, boolean>}
     */
    const seenDeprecations = {};

    /**
     * @param {string} message
     */
    const error = (message) => {
      console.error(message);
    };

    /**
     * @param {string} message
     * @param {any} args
     */
    const warn = (message, ...args) => {
      console.log(`WARN: ${message}`, ...args);
    };

    /**
     * @param {string} version
     * @param {string} message
     */
    const deprecated = (version, message) => {
      if (seenDeprecations[`${version}/${message}`]) return;

      console.log(`Deprecated as of ${version}. ${message}`);
      seenDeprecations[`${version}/${message}`] = true;
    };

    /* eslint-disable no-throw-literal */

    /**
    @typedef {import('highlight.js').CompiledMode} CompiledMode
    */

    const MultiClassError = new Error();

    /**
     * Renumbers labeled scope names to account for additional inner match
     * groups that otherwise would break everything.
     *
     * Lets say we 3 match scopes:
     *
     *   { 1 => ..., 2 => ..., 3 => ... }
     *
     * So what we need is a clean match like this:
     *
     *   (a)(b)(c) => [ "a", "b", "c" ]
     *
     * But this falls apart with inner match groups:
     *
     * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
     *
     * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
     * What needs to happen is the numbers are remapped:
     *
     *   { 1 => ..., 2 => ..., 5 => ... }
     *
     * We also need to know that the ONLY groups that should be output
     * are 1, 2, and 5.  This function handles this behavior.
     *
     * @param {CompiledMode} mode
     * @param {Array<RegExp | string>} regexes
     * @param {{key: "beginScope"|"endScope"}} opts
     */
    function remapScopeNames(mode, regexes, { key }) {
      let offset = 0;
      const scopeNames = mode[key];
      /** @type Record<number,boolean> */
      const emit = {};
      /** @type Record<number,string> */
      const positions = {};

      for (let i = 1; i <= regexes.length; i++) {
        positions[i + offset] = scopeNames[i];
        emit[i + offset] = true;
        offset += countMatchGroups(regexes[i - 1]);
      }
      // we use _emit to keep track of which match groups are "top-level" to avoid double
      // output from inside match groups
      mode[key] = positions;
      mode[key]._emit = emit;
      mode[key]._multi = true;
    }

    /**
     * @param {CompiledMode} mode
     */
    function beginMultiClass(mode) {
      if (!Array.isArray(mode.begin)) return;

      if (mode.skip || mode.excludeBegin || mode.returnBegin) {
        error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
        throw MultiClassError;
      }

      if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
        error("beginScope must be object");
        throw MultiClassError;
      }

      remapScopeNames(mode, mode.begin, { key: "beginScope" });
      mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
    }

    /**
     * @param {CompiledMode} mode
     */
    function endMultiClass(mode) {
      if (!Array.isArray(mode.end)) return;

      if (mode.skip || mode.excludeEnd || mode.returnEnd) {
        error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
        throw MultiClassError;
      }

      if (typeof mode.endScope !== "object" || mode.endScope === null) {
        error("endScope must be object");
        throw MultiClassError;
      }

      remapScopeNames(mode, mode.end, { key: "endScope" });
      mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
    }

    /**
     * this exists only to allow `scope: {}` to be used beside `match:`
     * Otherwise `beginScope` would necessary and that would look weird

      {
        match: [ /def/, /\w+/ ]
        scope: { 1: "keyword" , 2: "title" }
      }

     * @param {CompiledMode} mode
     */
    function scopeSugar(mode) {
      if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
        mode.beginScope = mode.scope;
        delete mode.scope;
      }
    }

    /**
     * @param {CompiledMode} mode
     */
    function MultiClass(mode) {
      scopeSugar(mode);

      if (typeof mode.beginScope === "string") {
        mode.beginScope = { _wrap: mode.beginScope };
      }
      if (typeof mode.endScope === "string") {
        mode.endScope = { _wrap: mode.endScope };
      }

      beginMultiClass(mode);
      endMultiClass(mode);
    }

    /**
    @typedef {import('highlight.js').Mode} Mode
    @typedef {import('highlight.js').CompiledMode} CompiledMode
    @typedef {import('highlight.js').Language} Language
    @typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
    @typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
    */

    // compilation

    /**
     * Compiles a language definition result
     *
     * Given the raw result of a language definition (Language), compiles this so
     * that it is ready for highlighting code.
     * @param {Language} language
     * @returns {CompiledLanguage}
     */
    function compileLanguage(language) {
      /**
       * Builds a regex with the case sensitivity of the current language
       *
       * @param {RegExp | string} value
       * @param {boolean} [global]
       */
      function langRe(value, global) {
        return new RegExp(
          source(value),
          'm'
          + (language.case_insensitive ? 'i' : '')
          + (language.unicodeRegex ? 'u' : '')
          + (global ? 'g' : '')
        );
      }

      /**
        Stores multiple regular expressions and allows you to quickly search for
        them all in a string simultaneously - returning the first match.  It does
        this by creating a huge (a|b|c) regex - each individual item wrapped with ()
        and joined by `|` - using match groups to track position.  When a match is
        found checking which position in the array has content allows us to figure
        out which of the original regexes / match groups triggered the match.

        The match object itself (the result of `Regex.exec`) is returned but also
        enhanced by merging in any meta-data that was registered with the regex.
        This is how we keep track of which mode matched, and what type of rule
        (`illegal`, `begin`, end, etc).
      */
      class MultiRegex {
        constructor() {
          this.matchIndexes = {};
          // @ts-ignore
          this.regexes = [];
          this.matchAt = 1;
          this.position = 0;
        }

        // @ts-ignore
        addRule(re, opts) {
          opts.position = this.position++;
          // @ts-ignore
          this.matchIndexes[this.matchAt] = opts;
          this.regexes.push([opts, re]);
          this.matchAt += countMatchGroups(re) + 1;
        }

        compile() {
          if (this.regexes.length === 0) {
            // avoids the need to check length every time exec is called
            // @ts-ignore
            this.exec = () => null;
          }
          const terminators = this.regexes.map(el => el[1]);
          this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
          this.lastIndex = 0;
        }

        /** @param {string} s */
        exec(s) {
          this.matcherRe.lastIndex = this.lastIndex;
          const match = this.matcherRe.exec(s);
          if (!match) { return null; }

          // eslint-disable-next-line no-undefined
          const i = match.findIndex((el, i) => i > 0 && el !== undefined);
          // @ts-ignore
          const matchData = this.matchIndexes[i];
          // trim off any earlier non-relevant match groups (ie, the other regex
          // match groups that make up the multi-matcher)
          match.splice(0, i);

          return Object.assign(match, matchData);
        }
      }

      /*
        Created to solve the key deficiently with MultiRegex - there is no way to
        test for multiple matches at a single location.  Why would we need to do
        that?  In the future a more dynamic engine will allow certain matches to be
        ignored.  An example: if we matched say the 3rd regex in a large group but
        decided to ignore it - we'd need to started testing again at the 4th
        regex... but MultiRegex itself gives us no real way to do that.

        So what this class creates MultiRegexs on the fly for whatever search
        position they are needed.

        NOTE: These additional MultiRegex objects are created dynamically.  For most
        grammars most of the time we will never actually need anything more than the
        first MultiRegex - so this shouldn't have too much overhead.

        Say this is our search group, and we match regex3, but wish to ignore it.

          regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

        What we need is a new MultiRegex that only includes the remaining
        possibilities:

          regex4 | regex5                               ' ie, startAt = 3

        This class wraps all that complexity up in a simple API... `startAt` decides
        where in the array of expressions to start doing the matching. It
        auto-increments, so if a match is found at position 2, then startAt will be
        set to 3.  If the end is reached startAt will return to 0.

        MOST of the time the parser will be setting startAt manually to 0.
      */
      class ResumableMultiRegex {
        constructor() {
          // @ts-ignore
          this.rules = [];
          // @ts-ignore
          this.multiRegexes = [];
          this.count = 0;

          this.lastIndex = 0;
          this.regexIndex = 0;
        }

        // @ts-ignore
        getMatcher(index) {
          if (this.multiRegexes[index]) return this.multiRegexes[index];

          const matcher = new MultiRegex();
          this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
          matcher.compile();
          this.multiRegexes[index] = matcher;
          return matcher;
        }

        resumingScanAtSamePosition() {
          return this.regexIndex !== 0;
        }

        considerAll() {
          this.regexIndex = 0;
        }

        // @ts-ignore
        addRule(re, opts) {
          this.rules.push([re, opts]);
          if (opts.type === "begin") this.count++;
        }

        /** @param {string} s */
        exec(s) {
          const m = this.getMatcher(this.regexIndex);
          m.lastIndex = this.lastIndex;
          let result = m.exec(s);

          // The following is because we have no easy way to say "resume scanning at the
          // existing position but also skip the current rule ONLY". What happens is
          // all prior rules are also skipped which can result in matching the wrong
          // thing. Example of matching "booger":

          // our matcher is [string, "booger", number]
          //
          // ....booger....

          // if "booger" is ignored then we'd really need a regex to scan from the
          // SAME position for only: [string, number] but ignoring "booger" (if it
          // was the first match), a simple resume would scan ahead who knows how
          // far looking only for "number", ignoring potential string matches (or
          // future "booger" matches that might be valid.)

          // So what we do: We execute two matchers, one resuming at the same
          // position, but the second full matcher starting at the position after:

          //     /--- resume first regex match here (for [number])
          //     |/---- full match here for [string, "booger", number]
          //     vv
          // ....booger....

          // Which ever results in a match first is then used. So this 3-4 step
          // process essentially allows us to say "match at this position, excluding
          // a prior rule that was ignored".
          //
          // 1. Match "booger" first, ignore. Also proves that [string] does non match.
          // 2. Resume matching for [number]
          // 3. Match at index + 1 for [string, "booger", number]
          // 4. If #2 and #3 result in matches, which came first?
          if (this.resumingScanAtSamePosition()) {
            if (result && result.index === this.lastIndex) ; else { // use the second matcher result
              const m2 = this.getMatcher(0);
              m2.lastIndex = this.lastIndex + 1;
              result = m2.exec(s);
            }
          }

          if (result) {
            this.regexIndex += result.position + 1;
            if (this.regexIndex === this.count) {
              // wrap-around to considering all matches again
              this.considerAll();
            }
          }

          return result;
        }
      }

      /**
       * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
       * the content and find matches.
       *
       * @param {CompiledMode} mode
       * @returns {ResumableMultiRegex}
       */
      function buildModeRegex(mode) {
        const mm = new ResumableMultiRegex();

        mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

        if (mode.terminatorEnd) {
          mm.addRule(mode.terminatorEnd, { type: "end" });
        }
        if (mode.illegal) {
          mm.addRule(mode.illegal, { type: "illegal" });
        }

        return mm;
      }

      /** skip vs abort vs ignore
       *
       * @skip   - The mode is still entered and exited normally (and contains rules apply),
       *           but all content is held and added to the parent buffer rather than being
       *           output when the mode ends.  Mostly used with `sublanguage` to build up
       *           a single large buffer than can be parsed by sublanguage.
       *
       *             - The mode begin ands ends normally.
       *             - Content matched is added to the parent mode buffer.
       *             - The parser cursor is moved forward normally.
       *
       * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
       *           never matched) but DOES NOT continue to match subsequent `contains`
       *           modes.  Abort is bad/suboptimal because it can result in modes
       *           farther down not getting applied because an earlier rule eats the
       *           content but then aborts.
       *
       *             - The mode does not begin.
       *             - Content matched by `begin` is added to the mode buffer.
       *             - The parser cursor is moved forward accordingly.
       *
       * @ignore - Ignores the mode (as if it never matched) and continues to match any
       *           subsequent `contains` modes.  Ignore isn't technically possible with
       *           the current parser implementation.
       *
       *             - The mode does not begin.
       *             - Content matched by `begin` is ignored.
       *             - The parser cursor is not moved forward.
       */

      /**
       * Compiles an individual mode
       *
       * This can raise an error if the mode contains certain detectable known logic
       * issues.
       * @param {Mode} mode
       * @param {CompiledMode | null} [parent]
       * @returns {CompiledMode | never}
       */
      function compileMode(mode, parent) {
        const cmode = /** @type CompiledMode */ (mode);
        if (mode.isCompiled) return cmode;

        [
          scopeClassName,
          // do this early so compiler extensions generally don't have to worry about
          // the distinction between match/begin
          compileMatch,
          MultiClass,
          beforeMatchExt
        ].forEach(ext => ext(mode, parent));

        language.compilerExtensions.forEach(ext => ext(mode, parent));

        // __beforeBegin is considered private API, internal use only
        mode.__beforeBegin = null;

        [
          beginKeywords,
          // do this later so compiler extensions that come earlier have access to the
          // raw array if they wanted to perhaps manipulate it, etc.
          compileIllegal,
          // default to 1 relevance if not specified
          compileRelevance
        ].forEach(ext => ext(mode, parent));

        mode.isCompiled = true;

        let keywordPattern = null;
        if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
          // we need a copy because keywords might be compiled multiple times
          // so we can't go deleting $pattern from the original on the first
          // pass
          mode.keywords = Object.assign({}, mode.keywords);
          keywordPattern = mode.keywords.$pattern;
          delete mode.keywords.$pattern;
        }
        keywordPattern = keywordPattern || /\w+/;

        if (mode.keywords) {
          mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
        }

        cmode.keywordPatternRe = langRe(keywordPattern, true);

        if (parent) {
          if (!mode.begin) mode.begin = /\B|\b/;
          cmode.beginRe = langRe(cmode.begin);
          if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
          if (mode.end) cmode.endRe = langRe(cmode.end);
          cmode.terminatorEnd = source(cmode.end) || '';
          if (mode.endsWithParent && parent.terminatorEnd) {
            cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
          }
        }
        if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
        if (!mode.contains) mode.contains = [];

        mode.contains = [].concat(...mode.contains.map(function(c) {
          return expandOrCloneMode(c === 'self' ? mode : c);
        }));
        mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

        if (mode.starts) {
          compileMode(mode.starts, parent);
        }

        cmode.matcher = buildModeRegex(cmode);
        return cmode;
      }

      if (!language.compilerExtensions) language.compilerExtensions = [];

      // self is not valid at the top-level
      if (language.contains && language.contains.includes('self')) {
        throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
      }

      // we need a null object, which inherit will guarantee
      language.classNameAliases = inherit$1(language.classNameAliases || {});

      return compileMode(/** @type Mode */ (language));
    }

    /**
     * Determines if a mode has a dependency on it's parent or not
     *
     * If a mode does have a parent dependency then often we need to clone it if
     * it's used in multiple places so that each copy points to the correct parent,
     * where-as modes without a parent can often safely be re-used at the bottom of
     * a mode chain.
     *
     * @param {Mode | null} mode
     * @returns {boolean} - is there a dependency on the parent?
     * */
    function dependencyOnParent(mode) {
      if (!mode) return false;

      return mode.endsWithParent || dependencyOnParent(mode.starts);
    }

    /**
     * Expands a mode or clones it if necessary
     *
     * This is necessary for modes with parental dependenceis (see notes on
     * `dependencyOnParent`) and for nodes that have `variants` - which must then be
     * exploded into their own individual modes at compile time.
     *
     * @param {Mode} mode
     * @returns {Mode | Mode[]}
     * */
    function expandOrCloneMode(mode) {
      if (mode.variants && !mode.cachedVariants) {
        mode.cachedVariants = mode.variants.map(function(variant) {
          return inherit$1(mode, { variants: null }, variant);
        });
      }

      // EXPAND
      // if we have variants then essentially "replace" the mode with the variants
      // this happens in compileMode, where this function is called from
      if (mode.cachedVariants) {
        return mode.cachedVariants;
      }

      // CLONE
      // if we have dependencies on parents then we need a unique
      // instance of ourselves, so we can be reused with many
      // different parents without issue
      if (dependencyOnParent(mode)) {
        return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
      }

      if (Object.isFrozen(mode)) {
        return inherit$1(mode);
      }

      // no special dependency issues, just return ourselves
      return mode;
    }

    var version = "11.3.1";

    class HTMLInjectionError extends Error {
      constructor(reason, html) {
        super(reason);
        this.name = "HTMLInjectionError";
        this.html = html;
      }
    }

    /*
    Syntax highlighting with language autodetection.
    https://highlightjs.org/
    */

    /**
    @typedef {import('highlight.js').Mode} Mode
    @typedef {import('highlight.js').CompiledMode} CompiledMode
    @typedef {import('highlight.js').CompiledScope} CompiledScope
    @typedef {import('highlight.js').Language} Language
    @typedef {import('highlight.js').HLJSApi} HLJSApi
    @typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
    @typedef {import('highlight.js').PluginEvent} PluginEvent
    @typedef {import('highlight.js').HLJSOptions} HLJSOptions
    @typedef {import('highlight.js').LanguageFn} LanguageFn
    @typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
    @typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
    @typedef {import('highlight.js/private').MatchType} MatchType
    @typedef {import('highlight.js/private').KeywordData} KeywordData
    @typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
    @typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
    @typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
    @typedef {import('highlight.js').HighlightOptions} HighlightOptions
    @typedef {import('highlight.js').HighlightResult} HighlightResult
    */


    const escape = escapeHTML;
    const inherit = inherit$1;
    const NO_MATCH = Symbol("nomatch");
    const MAX_KEYWORD_HITS = 7;

    /**
     * @param {any} hljs - object that is extended (legacy)
     * @returns {HLJSApi}
     */
    const HLJS = function(hljs) {
      // Global internal variables used within the highlight.js library.
      /** @type {Record<string, Language>} */
      const languages = Object.create(null);
      /** @type {Record<string, string>} */
      const aliases = Object.create(null);
      /** @type {HLJSPlugin[]} */
      const plugins = [];

      // safe/production mode - swallows more errors, tries to keep running
      // even if a single syntax or parse hits a fatal error
      let SAFE_MODE = true;
      const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
      /** @type {Language} */
      const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

      // Global options used when within external APIs. This is modified when
      // calling the `hljs.configure` function.
      /** @type HLJSOptions */
      let options = {
        ignoreUnescapedHTML: false,
        throwUnescapedHTML: false,
        noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
        classPrefix: 'hljs-',
        cssSelector: 'pre code',
        languages: null,
        // beta configuration options, subject to change, welcome to discuss
        // https://github.com/highlightjs/highlight.js/issues/1086
        __emitter: TokenTreeEmitter
      };

      /* Utility functions */

      /**
       * Tests a language name to see if highlighting should be skipped
       * @param {string} languageName
       */
      function shouldNotHighlight(languageName) {
        return options.noHighlightRe.test(languageName);
      }

      /**
       * @param {HighlightedHTMLElement} block - the HTML element to determine language for
       */
      function blockLanguage(block) {
        let classes = block.className + ' ';

        classes += block.parentNode ? block.parentNode.className : '';

        // language-* takes precedence over non-prefixed class names.
        const match = options.languageDetectRe.exec(classes);
        if (match) {
          const language = getLanguage(match[1]);
          if (!language) {
            warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
            warn("Falling back to no-highlight mode for this block.", block);
          }
          return language ? match[1] : 'no-highlight';
        }

        return classes
          .split(/\s+/)
          .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
      }

      /**
       * Core highlighting function.
       *
       * OLD API
       * highlight(lang, code, ignoreIllegals, continuation)
       *
       * NEW API
       * highlight(code, {lang, ignoreIllegals})
       *
       * @param {string} codeOrLanguageName - the language to use for highlighting
       * @param {string | HighlightOptions} optionsOrCode - the code to highlight
       * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
       *
       * @returns {HighlightResult} Result - an object that represents the result
       * @property {string} language - the language name
       * @property {number} relevance - the relevance score
       * @property {string} value - the highlighted HTML code
       * @property {string} code - the original raw code
       * @property {CompiledMode} top - top of the current mode stack
       * @property {boolean} illegal - indicates whether any illegal matches were found
      */
      function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
        let code = "";
        let languageName = "";
        if (typeof optionsOrCode === "object") {
          code = codeOrLanguageName;
          ignoreIllegals = optionsOrCode.ignoreIllegals;
          languageName = optionsOrCode.language;
        } else {
          // old API
          deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
          deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
          languageName = codeOrLanguageName;
          code = optionsOrCode;
        }

        // https://github.com/highlightjs/highlight.js/issues/3149
        // eslint-disable-next-line no-undefined
        if (ignoreIllegals === undefined) { ignoreIllegals = true; }

        /** @type {BeforeHighlightContext} */
        const context = {
          code,
          language: languageName
        };
        // the plugin can change the desired language or the code to be highlighted
        // just be changing the object it was passed
        fire("before:highlight", context);

        // a before plugin can usurp the result completely by providing it's own
        // in which case we don't even need to call highlight
        const result = context.result
          ? context.result
          : _highlight(context.language, context.code, ignoreIllegals);

        result.code = context.code;
        // the plugin can change anything in result to suite it
        fire("after:highlight", result);

        return result;
      }

      /**
       * private highlight that's used internally and does not fire callbacks
       *
       * @param {string} languageName - the language to use for highlighting
       * @param {string} codeToHighlight - the code to highlight
       * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
       * @param {CompiledMode?} [continuation] - current continuation mode, if any
       * @returns {HighlightResult} - result of the highlight operation
      */
      function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
        const keywordHits = Object.create(null);

        /**
         * Return keyword data if a match is a keyword
         * @param {CompiledMode} mode - current mode
         * @param {string} matchText - the textual match
         * @returns {KeywordData | false}
         */
        function keywordData(mode, matchText) {
          return mode.keywords[matchText];
        }

        function processKeywords() {
          if (!top.keywords) {
            emitter.addText(modeBuffer);
            return;
          }

          let lastIndex = 0;
          top.keywordPatternRe.lastIndex = 0;
          let match = top.keywordPatternRe.exec(modeBuffer);
          let buf = "";

          while (match) {
            buf += modeBuffer.substring(lastIndex, match.index);
            const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
            const data = keywordData(top, word);
            if (data) {
              const [kind, keywordRelevance] = data;
              emitter.addText(buf);
              buf = "";

              keywordHits[word] = (keywordHits[word] || 0) + 1;
              if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
              if (kind.startsWith("_")) {
                // _ implied for relevance only, do not highlight
                // by applying a class name
                buf += match[0];
              } else {
                const cssClass = language.classNameAliases[kind] || kind;
                emitter.addKeyword(match[0], cssClass);
              }
            } else {
              buf += match[0];
            }
            lastIndex = top.keywordPatternRe.lastIndex;
            match = top.keywordPatternRe.exec(modeBuffer);
          }
          buf += modeBuffer.substr(lastIndex);
          emitter.addText(buf);
        }

        function processSubLanguage() {
          if (modeBuffer === "") return;
          /** @type HighlightResult */
          let result = null;

          if (typeof top.subLanguage === 'string') {
            if (!languages[top.subLanguage]) {
              emitter.addText(modeBuffer);
              return;
            }
            result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
            continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
          } else {
            result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
          }

          // Counting embedded language score towards the host language may be disabled
          // with zeroing the containing mode relevance. Use case in point is Markdown that
          // allows XML everywhere and makes every XML snippet to have a much larger Markdown
          // score.
          if (top.relevance > 0) {
            relevance += result.relevance;
          }
          emitter.addSublanguage(result._emitter, result.language);
        }

        function processBuffer() {
          if (top.subLanguage != null) {
            processSubLanguage();
          } else {
            processKeywords();
          }
          modeBuffer = '';
        }

        /**
         * @param {CompiledScope} scope
         * @param {RegExpMatchArray} match
         */
        function emitMultiClass(scope, match) {
          let i = 1;
          // eslint-disable-next-line no-undefined
          while (match[i] !== undefined) {
            if (!scope._emit[i]) { i++; continue; }
            const klass = language.classNameAliases[scope[i]] || scope[i];
            const text = match[i];
            if (klass) {
              emitter.addKeyword(text, klass);
            } else {
              modeBuffer = text;
              processKeywords();
              modeBuffer = "";
            }
            i++;
          }
        }

        /**
         * @param {CompiledMode} mode - new mode to start
         * @param {RegExpMatchArray} match
         */
        function startNewMode(mode, match) {
          if (mode.scope && typeof mode.scope === "string") {
            emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
          }
          if (mode.beginScope) {
            // beginScope just wraps the begin match itself in a scope
            if (mode.beginScope._wrap) {
              emitter.addKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
              modeBuffer = "";
            } else if (mode.beginScope._multi) {
              // at this point modeBuffer should just be the match
              emitMultiClass(mode.beginScope, match);
              modeBuffer = "";
            }
          }

          top = Object.create(mode, { parent: { value: top } });
          return top;
        }

        /**
         * @param {CompiledMode } mode - the mode to potentially end
         * @param {RegExpMatchArray} match - the latest match
         * @param {string} matchPlusRemainder - match plus remainder of content
         * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
         */
        function endOfMode(mode, match, matchPlusRemainder) {
          let matched = startsWith(mode.endRe, matchPlusRemainder);

          if (matched) {
            if (mode["on:end"]) {
              const resp = new Response(mode);
              mode["on:end"](match, resp);
              if (resp.isMatchIgnored) matched = false;
            }

            if (matched) {
              while (mode.endsParent && mode.parent) {
                mode = mode.parent;
              }
              return mode;
            }
          }
          // even if on:end fires an `ignore` it's still possible
          // that we might trigger the end node because of a parent mode
          if (mode.endsWithParent) {
            return endOfMode(mode.parent, match, matchPlusRemainder);
          }
        }

        /**
         * Handle matching but then ignoring a sequence of text
         *
         * @param {string} lexeme - string containing full match text
         */
        function doIgnore(lexeme) {
          if (top.matcher.regexIndex === 0) {
            // no more regexes to potentially match here, so we move the cursor forward one
            // space
            modeBuffer += lexeme[0];
            return 1;
          } else {
            // no need to move the cursor, we still have additional regexes to try and
            // match at this very spot
            resumeScanAtSamePosition = true;
            return 0;
          }
        }

        /**
         * Handle the start of a new potential mode match
         *
         * @param {EnhancedMatch} match - the current match
         * @returns {number} how far to advance the parse cursor
         */
        function doBeginMatch(match) {
          const lexeme = match[0];
          const newMode = match.rule;

          const resp = new Response(newMode);
          // first internal before callbacks, then the public ones
          const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
          for (const cb of beforeCallbacks) {
            if (!cb) continue;
            cb(match, resp);
            if (resp.isMatchIgnored) return doIgnore(lexeme);
          }

          if (newMode.skip) {
            modeBuffer += lexeme;
          } else {
            if (newMode.excludeBegin) {
              modeBuffer += lexeme;
            }
            processBuffer();
            if (!newMode.returnBegin && !newMode.excludeBegin) {
              modeBuffer = lexeme;
            }
          }
          startNewMode(newMode, match);
          return newMode.returnBegin ? 0 : lexeme.length;
        }

        /**
         * Handle the potential end of mode
         *
         * @param {RegExpMatchArray} match - the current match
         */
        function doEndMatch(match) {
          const lexeme = match[0];
          const matchPlusRemainder = codeToHighlight.substr(match.index);

          const endMode = endOfMode(top, match, matchPlusRemainder);
          if (!endMode) { return NO_MATCH; }

          const origin = top;
          if (top.endScope && top.endScope._wrap) {
            processBuffer();
            emitter.addKeyword(lexeme, top.endScope._wrap);
          } else if (top.endScope && top.endScope._multi) {
            processBuffer();
            emitMultiClass(top.endScope, match);
          } else if (origin.skip) {
            modeBuffer += lexeme;
          } else {
            if (!(origin.returnEnd || origin.excludeEnd)) {
              modeBuffer += lexeme;
            }
            processBuffer();
            if (origin.excludeEnd) {
              modeBuffer = lexeme;
            }
          }
          do {
            if (top.scope) {
              emitter.closeNode();
            }
            if (!top.skip && !top.subLanguage) {
              relevance += top.relevance;
            }
            top = top.parent;
          } while (top !== endMode.parent);
          if (endMode.starts) {
            startNewMode(endMode.starts, match);
          }
          return origin.returnEnd ? 0 : lexeme.length;
        }

        function processContinuations() {
          const list = [];
          for (let current = top; current !== language; current = current.parent) {
            if (current.scope) {
              list.unshift(current.scope);
            }
          }
          list.forEach(item => emitter.openNode(item));
        }

        /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
        let lastMatch = {};

        /**
         *  Process an individual match
         *
         * @param {string} textBeforeMatch - text preceding the match (since the last match)
         * @param {EnhancedMatch} [match] - the match itself
         */
        function processLexeme(textBeforeMatch, match) {
          const lexeme = match && match[0];

          // add non-matched text to the current mode buffer
          modeBuffer += textBeforeMatch;

          if (lexeme == null) {
            processBuffer();
            return 0;
          }

          // we've found a 0 width match and we're stuck, so we need to advance
          // this happens when we have badly behaved rules that have optional matchers to the degree that
          // sometimes they can end up matching nothing at all
          // Ref: https://github.com/highlightjs/highlight.js/issues/2140
          if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
            // spit the "skipped" character that our regex choked on back into the output sequence
            modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
            if (!SAFE_MODE) {
              /** @type {AnnotatedError} */
              const err = new Error(`0 width match regex (${languageName})`);
              err.languageName = languageName;
              err.badRule = lastMatch.rule;
              throw err;
            }
            return 1;
          }
          lastMatch = match;

          if (match.type === "begin") {
            return doBeginMatch(match);
          } else if (match.type === "illegal" && !ignoreIllegals) {
            // illegal match, we do not continue processing
            /** @type {AnnotatedError} */
            const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
            err.mode = top;
            throw err;
          } else if (match.type === "end") {
            const processed = doEndMatch(match);
            if (processed !== NO_MATCH) {
              return processed;
            }
          }

          // edge case for when illegal matches $ (end of line) which is technically
          // a 0 width match but not a begin/end match so it's not caught by the
          // first handler (when ignoreIllegals is true)
          if (match.type === "illegal" && lexeme === "") {
            // advance so we aren't stuck in an infinite loop
            return 1;
          }

          // infinite loops are BAD, this is a last ditch catch all. if we have a
          // decent number of iterations yet our index (cursor position in our
          // parsing) still 3x behind our index then something is very wrong
          // so we bail
          if (iterations > 100000 && iterations > match.index * 3) {
            const err = new Error('potential infinite loop, way more iterations than matches');
            throw err;
          }

          /*
          Why might be find ourselves here?  An potential end match that was
          triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
          (this could be because a callback requests the match be ignored, etc)

          This causes no real harm other than stopping a few times too many.
          */

          modeBuffer += lexeme;
          return lexeme.length;
        }

        const language = getLanguage(languageName);
        if (!language) {
          error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
          throw new Error('Unknown language: "' + languageName + '"');
        }

        const md = compileLanguage(language);
        let result = '';
        /** @type {CompiledMode} */
        let top = continuation || md;
        /** @type Record<string,CompiledMode> */
        const continuations = {}; // keep continuations for sub-languages
        const emitter = new options.__emitter(options);
        processContinuations();
        let modeBuffer = '';
        let relevance = 0;
        let index = 0;
        let iterations = 0;
        let resumeScanAtSamePosition = false;

        try {
          top.matcher.considerAll();

          for (;;) {
            iterations++;
            if (resumeScanAtSamePosition) {
              // only regexes not matched previously will now be
              // considered for a potential match
              resumeScanAtSamePosition = false;
            } else {
              top.matcher.considerAll();
            }
            top.matcher.lastIndex = index;

            const match = top.matcher.exec(codeToHighlight);
            // console.log("match", match[0], match.rule && match.rule.begin)

            if (!match) break;

            const beforeMatch = codeToHighlight.substring(index, match.index);
            const processedCount = processLexeme(beforeMatch, match);
            index = match.index + processedCount;
          }
          processLexeme(codeToHighlight.substr(index));
          emitter.closeAllNodes();
          emitter.finalize();
          result = emitter.toHTML();

          return {
            language: languageName,
            value: result,
            relevance: relevance,
            illegal: false,
            _emitter: emitter,
            _top: top
          };
        } catch (err) {
          if (err.message && err.message.includes('Illegal')) {
            return {
              language: languageName,
              value: escape(codeToHighlight),
              illegal: true,
              relevance: 0,
              _illegalBy: {
                message: err.message,
                index: index,
                context: codeToHighlight.slice(index - 100, index + 100),
                mode: err.mode,
                resultSoFar: result
              },
              _emitter: emitter
            };
          } else if (SAFE_MODE) {
            return {
              language: languageName,
              value: escape(codeToHighlight),
              illegal: false,
              relevance: 0,
              errorRaised: err,
              _emitter: emitter,
              _top: top
            };
          } else {
            throw err;
          }
        }
      }

      /**
       * returns a valid highlight result, without actually doing any actual work,
       * auto highlight starts with this and it's possible for small snippets that
       * auto-detection may not find a better match
       * @param {string} code
       * @returns {HighlightResult}
       */
      function justTextHighlightResult(code) {
        const result = {
          value: escape(code),
          illegal: false,
          relevance: 0,
          _top: PLAINTEXT_LANGUAGE,
          _emitter: new options.__emitter(options)
        };
        result._emitter.addText(code);
        return result;
      }

      /**
      Highlighting with language detection. Accepts a string with the code to
      highlight. Returns an object with the following properties:

      - language (detected language)
      - relevance (int)
      - value (an HTML string with highlighting markup)
      - secondBest (object with the same structure for second-best heuristically
        detected language, may be absent)

        @param {string} code
        @param {Array<string>} [languageSubset]
        @returns {AutoHighlightResult}
      */
      function highlightAuto(code, languageSubset) {
        languageSubset = languageSubset || options.languages || Object.keys(languages);
        const plaintext = justTextHighlightResult(code);

        const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
          _highlight(name, code, false)
        );
        results.unshift(plaintext); // plaintext is always an option

        const sorted = results.sort((a, b) => {
          // sort base on relevance
          if (a.relevance !== b.relevance) return b.relevance - a.relevance;

          // always award the tie to the base language
          // ie if C++ and Arduino are tied, it's more likely to be C++
          if (a.language && b.language) {
            if (getLanguage(a.language).supersetOf === b.language) {
              return 1;
            } else if (getLanguage(b.language).supersetOf === a.language) {
              return -1;
            }
          }

          // otherwise say they are equal, which has the effect of sorting on
          // relevance while preserving the original ordering - which is how ties
          // have historically been settled, ie the language that comes first always
          // wins in the case of a tie
          return 0;
        });

        const [best, secondBest] = sorted;

        /** @type {AutoHighlightResult} */
        const result = best;
        result.secondBest = secondBest;

        return result;
      }

      /**
       * Builds new class name for block given the language name
       *
       * @param {HTMLElement} element
       * @param {string} [currentLang]
       * @param {string} [resultLang]
       */
      function updateClassName(element, currentLang, resultLang) {
        const language = (currentLang && aliases[currentLang]) || resultLang;

        element.classList.add("hljs");
        element.classList.add(`language-${language}`);
      }

      /**
       * Applies highlighting to a DOM node containing code.
       *
       * @param {HighlightedHTMLElement} element - the HTML element to highlight
      */
      function highlightElement(element) {
        /** @type HTMLElement */
        let node = null;
        const language = blockLanguage(element);

        if (shouldNotHighlight(language)) return;

        fire("before:highlightElement",
          { el: element, language: language });

        // we should be all text, no child nodes (unescaped HTML) - this is possibly
        // an HTML injection attack - it's likely too late if this is already in
        // production (the code has likely already done its damage by the time
        // we're seeing it)... but we yell loudly about this so that hopefully it's
        // more likely to be caught in development before making it to production
        if (element.children.length > 0) {
          if (!options.ignoreUnescapedHTML) {
            console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
            console.warn("https://github.com/highlightjs/highlight.js/issues/2886");
            console.warn(element);
          }
          if (options.throwUnescapedHTML) {
            const err = new HTMLInjectionError(
              "One of your code blocks includes unescaped HTML.",
              element.innerHTML
            );
            throw err;
          }
        }

        node = element;
        const text = node.textContent;
        const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

        element.innerHTML = result.value;
        updateClassName(element, language, result.language);
        element.result = {
          language: result.language,
          // TODO: remove with version 11.0
          re: result.relevance,
          relevance: result.relevance
        };
        if (result.secondBest) {
          element.secondBest = {
            language: result.secondBest.language,
            relevance: result.secondBest.relevance
          };
        }

        fire("after:highlightElement", { el: element, result, text });
      }

      /**
       * Updates highlight.js global options with the passed options
       *
       * @param {Partial<HLJSOptions>} userOptions
       */
      function configure(userOptions) {
        options = inherit(options, userOptions);
      }

      // TODO: remove v12, deprecated
      const initHighlighting = () => {
        highlightAll();
        deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
      };

      // TODO: remove v12, deprecated
      function initHighlightingOnLoad() {
        highlightAll();
        deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
      }

      let wantsHighlight = false;

      /**
       * auto-highlights all pre>code elements on the page
       */
      function highlightAll() {
        // if we are called too early in the loading process
        if (document.readyState === "loading") {
          wantsHighlight = true;
          return;
        }

        const blocks = document.querySelectorAll(options.cssSelector);
        blocks.forEach(highlightElement);
      }

      function boot() {
        // if a highlight was requested before DOM was loaded, do now
        if (wantsHighlight) highlightAll();
      }

      // make sure we are in the browser environment
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('DOMContentLoaded', boot, false);
      }

      /**
       * Register a language grammar module
       *
       * @param {string} languageName
       * @param {LanguageFn} languageDefinition
       */
      function registerLanguage(languageName, languageDefinition) {
        let lang = null;
        try {
          lang = languageDefinition(hljs);
        } catch (error$1) {
          error("Language definition for '{}' could not be registered.".replace("{}", languageName));
          // hard or soft error
          if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
          // languages that have serious errors are replaced with essentially a
          // "plaintext" stand-in so that the code blocks will still get normal
          // css classes applied to them - and one bad language won't break the
          // entire highlighter
          lang = PLAINTEXT_LANGUAGE;
        }
        // give it a temporary name if it doesn't have one in the meta-data
        if (!lang.name) lang.name = languageName;
        languages[languageName] = lang;
        lang.rawDefinition = languageDefinition.bind(null, hljs);

        if (lang.aliases) {
          registerAliases(lang.aliases, { languageName });
        }
      }

      /**
       * Remove a language grammar module
       *
       * @param {string} languageName
       */
      function unregisterLanguage(languageName) {
        delete languages[languageName];
        for (const alias of Object.keys(aliases)) {
          if (aliases[alias] === languageName) {
            delete aliases[alias];
          }
        }
      }

      /**
       * @returns {string[]} List of language internal names
       */
      function listLanguages() {
        return Object.keys(languages);
      }

      /**
       * @param {string} name - name of the language to retrieve
       * @returns {Language | undefined}
       */
      function getLanguage(name) {
        name = (name || '').toLowerCase();
        return languages[name] || languages[aliases[name]];
      }

      /**
       *
       * @param {string|string[]} aliasList - single alias or list of aliases
       * @param {{languageName: string}} opts
       */
      function registerAliases(aliasList, { languageName }) {
        if (typeof aliasList === 'string') {
          aliasList = [aliasList];
        }
        aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
      }

      /**
       * Determines if a given language has auto-detection enabled
       * @param {string} name - name of the language
       */
      function autoDetection(name) {
        const lang = getLanguage(name);
        return lang && !lang.disableAutodetect;
      }

      /**
       * Upgrades the old highlightBlock plugins to the new
       * highlightElement API
       * @param {HLJSPlugin} plugin
       */
      function upgradePluginAPI(plugin) {
        // TODO: remove with v12
        if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
          plugin["before:highlightElement"] = (data) => {
            plugin["before:highlightBlock"](
              Object.assign({ block: data.el }, data)
            );
          };
        }
        if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
          plugin["after:highlightElement"] = (data) => {
            plugin["after:highlightBlock"](
              Object.assign({ block: data.el }, data)
            );
          };
        }
      }

      /**
       * @param {HLJSPlugin} plugin
       */
      function addPlugin(plugin) {
        upgradePluginAPI(plugin);
        plugins.push(plugin);
      }

      /**
       *
       * @param {PluginEvent} event
       * @param {any} args
       */
      function fire(event, args) {
        const cb = event;
        plugins.forEach(function(plugin) {
          if (plugin[cb]) {
            plugin[cb](args);
          }
        });
      }

      /**
       * DEPRECATED
       * @param {HighlightedHTMLElement} el
       */
      function deprecateHighlightBlock(el) {
        deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
        deprecated("10.7.0", "Please use highlightElement now.");

        return highlightElement(el);
      }

      /* Interface definition */
      Object.assign(hljs, {
        highlight,
        highlightAuto,
        highlightAll,
        highlightElement,
        // TODO: Remove with v12 API
        highlightBlock: deprecateHighlightBlock,
        configure,
        initHighlighting,
        initHighlightingOnLoad,
        registerLanguage,
        unregisterLanguage,
        listLanguages,
        getLanguage,
        registerAliases,
        autoDetection,
        inherit,
        addPlugin
      });

      hljs.debugMode = function() { SAFE_MODE = false; };
      hljs.safeMode = function() { SAFE_MODE = true; };
      hljs.versionString = version;

      hljs.regex = {
        concat: concat,
        lookahead: lookahead,
        either: either,
        optional: optional,
        anyNumberOfTimes: anyNumberOfTimes
      };

      for (const key in MODES) {
        // @ts-ignore
        if (typeof MODES[key] === "object") {
          // @ts-ignore
          deepFreeze$1(MODES[key]);
        }
      }

      // merge all the modes/regexes into our main object
      Object.assign(hljs, MODES);

      return hljs;
    };

    // export an "instance" of the highlighter
    var highlight = HLJS({});

    var core = highlight;
    highlight.HighlightJS = highlight;
    highlight.default = highlight;

    const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
    const KEYWORDS = [
      "as", // for exports
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      // JS handles these with a special rule
      // "get",
      // "set",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ];
    const LITERALS = [
      "true",
      "false",
      "null",
      "undefined",
      "NaN",
      "Infinity"
    ];

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
    const TYPES = [
      // Fundamental objects
      "Object",
      "Function",
      "Boolean",
      "Symbol",
      // numbers and dates
      "Math",
      "Date",
      "Number",
      "BigInt",
      // text
      "String",
      "RegExp",
      // Indexed collections
      "Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Int32Array",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array",
      // Keyed collections
      "Set",
      "Map",
      "WeakSet",
      "WeakMap",
      // Structured data
      "ArrayBuffer",
      "SharedArrayBuffer",
      "Atomics",
      "DataView",
      "JSON",
      // Control abstraction objects
      "Promise",
      "Generator",
      "GeneratorFunction",
      "AsyncFunction",
      // Reflection
      "Reflect",
      "Proxy",
      // Internationalization
      "Intl",
      // WebAssembly
      "WebAssembly"
    ];

    const ERROR_TYPES = [
      "Error",
      "EvalError",
      "InternalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError"
    ];

    const BUILT_IN_GLOBALS = [
      "setInterval",
      "setTimeout",
      "clearInterval",
      "clearTimeout",

      "require",
      "exports",

      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "unescape"
    ];

    const BUILT_IN_VARIABLES = [
      "arguments",
      "this",
      "super",
      "console",
      "window",
      "document",
      "localStorage",
      "module",
      "global" // Node.js
    ];

    const BUILT_INS = [].concat(
      BUILT_IN_GLOBALS,
      TYPES,
      ERROR_TYPES
    );

    /*
    Language: JavaScript
    Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
    Category: common, scripting, web
    Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
    */

    /** @type LanguageFn */
    function javascript(hljs) {
      const regex = hljs.regex;
      /**
       * Takes a string like "<Booger" and checks to see
       * if we can find a matching "</Booger" later in the
       * content.
       * @param {RegExpMatchArray} match
       * @param {{after:number}} param1
       */
      const hasClosingTag = (match, { after }) => {
        const tag = "</" + match[0].slice(1);
        const pos = match.input.indexOf(tag, after);
        return pos !== -1;
      };

      const IDENT_RE$1 = IDENT_RE;
      const FRAGMENT = {
        begin: '<>',
        end: '</>'
      };
      // to avoid some special cases inside isTrulyOpeningTag
      const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
      const XML_TAG = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        /**
         * @param {RegExpMatchArray} match
         * @param {CallbackResponse} response
         */
        isTrulyOpeningTag: (match, response) => {
          const afterMatchIndex = match[0].length + match.index;
          const nextChar = match.input[afterMatchIndex];
          if (
            // HTML should not include another raw `<` inside a tag
            // nested type?
            // `<Array<Array<number>>`, etc.
            nextChar === "<" ||
            // the , gives away that this is not HTML
            // `<T, A extends keyof T, V>`
            nextChar === ",") {
            response.ignoreMatch();
            return;
          }

          // `<something>`
          // Quite possibly a tag, lets look for a matching closing tag...
          if (nextChar === ">") {
            // if we cannot find a matching closing tag, then we
            // will ignore it
            if (!hasClosingTag(match, { after: afterMatchIndex })) {
              response.ignoreMatch();
            }
          }

          // `<blah />` (self-closing)
          // handled by simpleSelfClosing rule

          // `<From extends string>`
          // technically this could be HTML, but it smells like a type
          let m;
          const afterMatch = match.input.substr(afterMatchIndex);
          // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
          if ((m = afterMatch.match(/^\s+extends\s+/))) {
            if (m.index === 0) {
              response.ignoreMatch();
              // eslint-disable-next-line no-useless-return
              return;
            }
          }
        }
      };
      const KEYWORDS$1 = {
        $pattern: IDENT_RE,
        keyword: KEYWORDS,
        literal: LITERALS,
        built_in: BUILT_INS,
        "variable.language": BUILT_IN_VARIABLES
      };

      // https://tc39.es/ecma262/#sec-literals-numeric-literals
      const decimalDigits = '[0-9](_?[0-9])*';
      const frac = `\\.(${decimalDigits})`;
      // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
      const NUMBER = {
        className: 'number',
        variants: [
          // DecimalLiteral
          { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
            `[eE][+-]?(${decimalDigits})\\b` },
          { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

          // DecimalBigIntegerLiteral
          { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

          // NonDecimalIntegerLiteral
          { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
          { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
          { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

          // LegacyOctalIntegerLiteral (does not include underscore separators)
          // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
          { begin: "\\b0[0-7]+n?\\b" },
        ],
        relevance: 0
      };

      const SUBST = {
        className: 'subst',
        begin: '\\$\\{',
        end: '\\}',
        keywords: KEYWORDS$1,
        contains: [] // defined later
      };
      const HTML_TEMPLATE = {
        begin: 'html`',
        end: '',
        starts: {
          end: '`',
          returnEnd: false,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ],
          subLanguage: 'xml'
        }
      };
      const CSS_TEMPLATE = {
        begin: 'css`',
        end: '',
        starts: {
          end: '`',
          returnEnd: false,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ],
          subLanguage: 'css'
        }
      };
      const TEMPLATE_STRING = {
        className: 'string',
        begin: '`',
        end: '`',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ]
      };
      const JSDOC_COMMENT = hljs.COMMENT(
        /\/\*\*(?!\/)/,
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              begin: '(?=@[A-Za-z]+)',
              relevance: 0,
              contains: [
                {
                  className: 'doctag',
                  begin: '@[A-Za-z]+'
                },
                {
                  className: 'type',
                  begin: '\\{',
                  end: '\\}',
                  excludeEnd: true,
                  excludeBegin: true,
                  relevance: 0
                },
                {
                  className: 'variable',
                  begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
                  endsParent: true,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      );
      const COMMENT = {
        className: "comment",
        variants: [
          JSDOC_COMMENT,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.C_LINE_COMMENT_MODE
        ]
      };
      const SUBST_INTERNALS = [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        TEMPLATE_STRING,
        NUMBER,
        // This is intentional:
        // See https://github.com/highlightjs/highlight.js/issues/3288
        // hljs.REGEXP_MODE
      ];
      SUBST.contains = SUBST_INTERNALS
        .concat({
          // we need to pair up {} inside our subst to prevent
          // it from ending too early by matching another }
          begin: /\{/,
          end: /\}/,
          keywords: KEYWORDS$1,
          contains: [
            "self"
          ].concat(SUBST_INTERNALS)
        });
      const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
      const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
        // eat recursive parens in sub expressions
        {
          begin: /\(/,
          end: /\)/,
          keywords: KEYWORDS$1,
          contains: ["self"].concat(SUBST_AND_COMMENTS)
        }
      ]);
      const PARAMS = {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS$1,
        contains: PARAMS_CONTAINS
      };

      // ES6 classes
      const CLASS_OR_EXTENDS = {
        variants: [
          // class Car extends vehicle
          {
            match: [
              /class/,
              /\s+/,
              IDENT_RE$1,
              /\s+/,
              /extends/,
              /\s+/,
              regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
            ],
            scope: {
              1: "keyword",
              3: "title.class",
              5: "keyword",
              7: "title.class.inherited"
            }
          },
          // class Car
          {
            match: [
              /class/,
              /\s+/,
              IDENT_RE$1
            ],
            scope: {
              1: "keyword",
              3: "title.class"
            }
          },

        ]
      };

      const CLASS_REFERENCE = {
        relevance: 0,
        match:
        regex.either(
          // Hard coded exceptions
          /\bJSON/,
          // Float32Array
          /\b[A-Z][a-z]+([A-Z][a-z]+|\d)*/,
          // CSSFactory
          /\b[A-Z]{2,}([A-Z][a-z]+|\d)+/,
          // BLAH
          // this will be flagged as a UPPER_CASE_CONSTANT instead
        ),
        className: "title.class",
        keywords: {
          _: [
            // se we still get relevance credit for JS library classes
            ...TYPES,
            ...ERROR_TYPES
          ]
        }
      };

      const USE_STRICT = {
        label: "use_strict",
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      };

      const FUNCTION_DEFINITION = {
        variants: [
          {
            match: [
              /function/,
              /\s+/,
              IDENT_RE$1,
              /(?=\s*\()/
            ]
          },
          // anonymous function
          {
            match: [
              /function/,
              /\s*(?=\()/
            ]
          }
        ],
        className: {
          1: "keyword",
          3: "title.function"
        },
        label: "func.def",
        contains: [ PARAMS ],
        illegal: /%/
      };

      const UPPER_CASE_CONSTANT = {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
      };

      function noneOf(list) {
        return regex.concat("(?!", list.join("|"), ")");
      }

      const FUNCTION_CALL = {
        match: regex.concat(
          /\b/,
          noneOf([
            ...BUILT_IN_GLOBALS,
            "super"
          ]),
          IDENT_RE$1, regex.lookahead(/\(/)),
        className: "title.function",
        relevance: 0
      };

      const PROPERTY_ACCESS = {
        begin: regex.concat(/\./, regex.lookahead(
          regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
        )),
        end: IDENT_RE$1,
        excludeBegin: true,
        keywords: "prototype",
        className: "property",
        relevance: 0
      };

      const GETTER_OR_SETTER = {
        match: [
          /get|set/,
          /\s+/,
          IDENT_RE$1,
          /(?=\()/
        ],
        className: {
          1: "keyword",
          3: "title.function"
        },
        contains: [
          { // eat to avoid empty params
            begin: /\(\)/
          },
          PARAMS
        ]
      };

      const FUNC_LEAD_IN_RE = '(\\(' +
        '[^()]*(\\(' +
        '[^()]*(\\(' +
        '[^()]*' +
        '\\)[^()]*)*' +
        '\\)[^()]*)*' +
        '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

      const FUNCTION_VARIABLE = {
        match: [
          /const|var|let/, /\s+/,
          IDENT_RE$1, /\s*/,
          /=\s*/,
          regex.lookahead(FUNC_LEAD_IN_RE)
        ],
        className: {
          1: "keyword",
          3: "title.function"
        },
        contains: [
          PARAMS
        ]
      };

      return {
        name: 'Javascript',
        aliases: ['js', 'jsx', 'mjs', 'cjs'],
        keywords: KEYWORDS$1,
        // this will be extended by TypeScript
        exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
        illegal: /#(?![$_A-z])/,
        contains: [
          hljs.SHEBANG({
            label: "shebang",
            binary: "node",
            relevance: 5
          }),
          USE_STRICT,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          HTML_TEMPLATE,
          CSS_TEMPLATE,
          TEMPLATE_STRING,
          COMMENT,
          NUMBER,
          CLASS_REFERENCE,
          {
            className: 'attr',
            begin: IDENT_RE$1 + regex.lookahead(':'),
            relevance: 0
          },
          FUNCTION_VARIABLE,
          { // "value" container
            begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
            keywords: 'return throw case',
            relevance: 0,
            contains: [
              COMMENT,
              hljs.REGEXP_MODE,
              {
                className: 'function',
                // we have to count the parens to make sure we actually have the
                // correct bounding ( ) before the =>.  There could be any number of
                // sub-expressions inside also surrounded by parens.
                begin: FUNC_LEAD_IN_RE,
                returnBegin: true,
                end: '\\s*=>',
                contains: [
                  {
                    className: 'params',
                    variants: [
                      {
                        begin: hljs.UNDERSCORE_IDENT_RE,
                        relevance: 0
                      },
                      {
                        className: null,
                        begin: /\(\s*\)/,
                        skip: true
                      },
                      {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: KEYWORDS$1,
                        contains: PARAMS_CONTAINS
                      }
                    ]
                  }
                ]
              },
              { // could be a comma delimited list of params to a function call
                begin: /,/,
                relevance: 0
              },
              {
                match: /\s+/,
                relevance: 0
              },
              { // JSX
                variants: [
                  { begin: FRAGMENT.begin, end: FRAGMENT.end },
                  { match: XML_SELF_CLOSING },
                  {
                    begin: XML_TAG.begin,
                    // we carefully check the opening tag to see if it truly
                    // is a tag and not a false positive
                    'on:begin': XML_TAG.isTrulyOpeningTag,
                    end: XML_TAG.end
                  }
                ],
                subLanguage: 'xml',
                contains: [
                  {
                    begin: XML_TAG.begin,
                    end: XML_TAG.end,
                    skip: true,
                    contains: ['self']
                  }
                ]
              }
            ],
          },
          FUNCTION_DEFINITION,
          {
            // prevent this from getting swallowed up by function
            // since they appear "function like"
            beginKeywords: "while if switch catch for"
          },
          {
            // we have to count the parens to make sure we actually have the correct
            // bounding ( ).  There could be any number of sub-expressions inside
            // also surrounded by parens.
            begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
              '\\(' + // first parens
              '[^()]*(\\(' +
                '[^()]*(\\(' +
                  '[^()]*' +
                '\\)[^()]*)*' +
              '\\)[^()]*)*' +
              '\\)\\s*\\{', // end parens
            returnBegin:true,
            label: "func.def",
            contains: [
              PARAMS,
              hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
            ]
          },
          // catch ... so it won't trigger the property rule below
          {
            match: /\.\.\./,
            relevance: 0
          },
          PROPERTY_ACCESS,
          // hack: prevents detection of keywords in some circumstances
          // .keyword()
          // $keyword = x
          {
            match: '\\$' + IDENT_RE$1,
            relevance: 0
          },
          {
            match: [ /\bconstructor(?=\s*\()/ ],
            className: { 1: "title.function" },
            contains: [ PARAMS ]
          },
          FUNCTION_CALL,
          UPPER_CASE_CONSTANT,
          CLASS_OR_EXTENDS,
          GETTER_OR_SETTER,
          {
            match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
          }
        ]
      };
    }

    /* lib/JS/Code.svelte generated by Svelte v3.43.0 */
    const file$1 = "lib/JS/Code.svelte";

    function create_fragment$1(ctx) {
    	let pre;
    	let code;
    	let t;

    	const block = {
    		c: function create() {
    			pre = element("pre");
    			code = element("code");
    			t = text(/*js*/ ctx[0]);
    			attr_dev(code, "class", "language-javascript mine svelte-5ej3m3");
    			set_style(code, "width", /*width*/ ctx[1]);
    			add_location(code, file$1, 14, 5, 358);
    			add_location(pre, file$1, 14, 0, 353);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, pre, anchor);
    			append_dev(pre, code);
    			append_dev(code, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*js*/ 1) set_data_dev(t, /*js*/ ctx[0]);

    			if (dirty & /*width*/ 2) {
    				set_style(code, "width", /*width*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(pre);
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
    	validate_slots('Code', slots, []);
    	let { js = '' } = $$props;
    	let { width = '400px' } = $$props;
    	core.registerLanguage('javascript', javascript);

    	onMount(() => {
    		core.highlightAll();
    	});

    	const writable_props = ['js', 'width'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('js' in $$props) $$invalidate(0, js = $$props.js);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    	};

    	$$self.$capture_state = () => ({ onMount, hljs: core, javascript, js, width });

    	$$self.$inject_state = $$props => {
    		if ('js' in $$props) $$invalidate(0, js = $$props.js);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [js, width];
    }

    class Code extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { js: 0, width: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Code",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get js() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set js(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var e={methods:{one:{},two:{},three:{},four:{}},model:{one:{},two:{},three:{}},compute:{},hooks:[]};const r={compute:function(e){const{world:r}=this,i=r.compute;return "string"==typeof e&&i.hasOwnProperty(e)?i[e](this):(e=>"[object Array]"===Object.prototype.toString.call(e))(e)?e.forEach((e=>r.compute.hasOwnProperty(e)&&i[e](this))):"function"==typeof e?e(this):console.warn("no compute:",e),this}};var i=r;var t={forEach:function(e){return this.fullPointer.forEach(((r,i)=>{let t=this.update([r]);e(t,i);})),this},map:function(e,r){let i=this.fullPointer.map(((r,i)=>{let t=this.update([r]);return e(t,i)}));if(0===i.length)return r||this.update([]);if(void 0!==i[0]){if("string"==typeof i[0])return i;if("object"==typeof i[0]&&(null===i[0]||!i[0].isView))return i}let t=[];return i.forEach((e=>{t=t.concat(e.fullPointer);})),this.toView(t)},filter:function(e){let r=this.fullPointer;return r=r.filter(((r,i)=>{let t=this.update([r]);return e(t,i)})),this.update(r)},find:function(e){let r=this.fullPointer.find(((r,i)=>{let t=this.update([r]);return e(t,i)}));return this.update([r])},some:function(e){return this.fullPointer.some(((r,i)=>{let t=this.update([r]);return e(t,i)}))},random:function(e=1){let r=this.fullPointer,i=Math.floor(Math.random()*r.length);return i+e>this.length&&(i=this.length-e,i=i<0?0:i),r=r.slice(i,i+e),this.update(r)}};const s={termList:function(){return this.methods.one.termList(this.docs)},terms:function(e){let r=this.match(".").toView();return "number"==typeof e?r.eq(e):r},groups:function(e){if(e||0===e)return this.update(this._groups[e]||[]);let r={};return Object.keys(this._groups).forEach((e=>{r[e]=this.update(this._groups[e]);})),r},eq:function(e){let r=this.pointer;return r||(r=this.docs.map(((e,r)=>[r]))),r[e]?this.update([r[e]]):this.none()},first:function(){return this.eq(0)},last:function(){let e=this.fullPointer.length-1;return this.eq(e)},firstTerms:function(){return this.match("^.")},lastTerms:function(){return this.match(".$")},slice:function(e,r){let i=this.pointer||this.docs.map(((e,r)=>[r]));return i=i.slice(e,r),this.update(i)},all:function(){return this.update().toView()},fullSentences:function(){let e=this.fullPointer.map((e=>[e[0]]));return this.update(e).toView()},none:function(){return this.update([])},isDoc:function(e){if(!e||!e.isView)return !1;let r=this.fullPointer,i=e.fullPointer;return !r.length!==i.length&&r.every(((e,r)=>!!i[r]&&(e[0]===i[r][0]&&e[1]===i[r][1]&&e[2]===i[r][2])))},wordCount:function(){return this.docs.reduce(((e,r)=>(e+=r.filter((e=>""!==e.text)).length,e)),0)}};s.group=s.groups,s.fullSentence=s.fullSentences,s.sentence=s.fullSentences,s.lastTerm=s.lastTerms,s.firstTerm=s.firstTerms;var n=s;const a=Object.assign({},n,i,t);a.get=a.eq;var o=a;class View{constructor(r,i,t={}){[["document",r],["world",e],["_groups",t],["_cache",null],["viewType","View"]].forEach((e=>{Object.defineProperty(this,e[0],{value:e[1],writable:!0});})),this.ptrs=i;}get docs(){let r=this.document;return this.ptrs&&(r=e.methods.one.getDoc(this.ptrs,this.document)),r}get pointer(){return this.ptrs}get methods(){return this.world.methods}get model(){return this.world.model}get hooks(){return this.world.hooks}get isView(){return !0}get found(){return this.docs.length>0}get length(){return this.docs.length}get fullPointer(){let{docs:e,ptrs:r,document:i}=this,t=r||e.map(((e,r)=>[r]));return t.map((e=>{let[r,t,s,n,a]=e;return t=t||0,s=s||(i[r]||[]).length,i[r]&&i[r][t]&&(n=n||i[r][t].id,i[r][s-1]&&(a=a||i[r][s-1].id)),[r,t,s,n,a]}))}update(e){let r=new View(this.document,e);if(r._cache&&e&&e.length>1){let i=[];e.forEach((e=>{1===e.length&&i.push(r._cache[e[0]]);})),r._cache=i;}return r.world=this.world,r}toView(e){return void 0===e&&(e=this.pointer),new View(this.document,e)}fromText(e){const{methods:r}=this;let i=r.one.tokenize.fromString(e,this.world),t=new View(i);return t.world=this.world,t.compute(["normal","lexicon","preTagger"]),t}clone(){let e=this.document.slice(0);e=e.map((e=>e.map((e=>((e=Object.assign({},e)).tags=new Set(e.tags),e)))));let r=this.update(this.pointer);return r.document=e,r._cache=this._cache,r}}Object.assign(View.prototype,o);var l=View;const u=function(e){return e&&"object"==typeof e&&!Array.isArray(e)};function c(e,r){if(u(r))for(const i in r)u(r[i])?(e[i]||Object.assign(e,{[i]:{}}),c(e[i],r[i])):Object.assign(e,{[i]:r[i]});return e}var d=function(e,r,i,t){const{methods:s,model:n,compute:a,hooks:o}=r;e.methods&&function(e,r){for(const i in r)e[i]=e[i]||{},Object.assign(e[i],r[i]);}(s,e.methods),e.model&&c(n,e.model),e.compute&&Object.assign(a,e.compute),o&&(r.hooks=o.concat(e.hooks||[])),e.api&&e.api(i),e.lib&&Object.keys(e.lib).forEach((r=>t[r]=e.lib[r])),e.tags&&t.addTags(e.tags),e.words&&t.addWords(e.words),e.mutate&&e.mutate(r);};const p=function(e){return "[object Array]"===Object.prototype.toString.call(e)};var h=function(e,r,i){const{methods:t}=i;let s=new r([]);if(s.world=i,"number"==typeof e&&(e=String(e)),!e)return s;if("string"==typeof e){return new r(t.one.tokenize.fromString(e,i))}if(n=e,"[object Object]"===Object.prototype.toString.call(n)&&e.isView)return new r(e.document,e.ptrs);var n;if(p(e)){if(p(e[0])){let i=e.map((e=>e.map((e=>({text:e,normal:e,pre:"",post:" ",tags:new Set})))));return new r(i)}let i=function(e){return e.map((e=>e.terms.map((e=>(p(e.tags)&&(e.tags=new Set(e.tags)),e)))))}(e);return new r(i)}return s};let m=Object.assign({},e);const f=function(e,r){r&&f.addWords(r);let i=h(e,l,m);return i.compute(m.hooks),i};Object.defineProperty(f,"_world",{value:m,writable:!0}),f.tokenize=function(e,r){const{compute:i}=this._world;r&&f.addWords(r);let t=h(e,l,m);return i.contractions&&t.compute(["alias","normal","machine","contractions"]),t},f.plugin=function(e){return d(e,this._world,l,this),this},f.extend=f.plugin,f.world=function(){return this._world},f.model=function(){return this._world.model},f.methods=function(){return this._world.methods},f.hooks=function(){return this._world.hooks},f.verbose=function(e){let r="undefined"==typeof process?self.env||{}:process.env;return r.DEBUG_TAGS="tagger"===e||!0===e||"",r.DEBUG_MATCH="match"===e||!0===e||"",r.DEBUG_CHUNKS="chunker"===e||!0===e||"",this},f.version="13.11.4-rc7";var v=f;const b=(e,r,i)=>{if(i.forEach((e=>e.dirty=!0)),e){let t=[r,0].concat(i);Array.prototype.splice.apply(e,t);}return e},y=function(e){let r=e[e.length-1];!r||/ $/.test(r.post)||/[-–—]/.test(r.post)||(r.post+=" ");},z=(e,r,i)=>{const t=/[-.?!,;:)–—'"]/g;let s=e[r-1];if(!s)return;let n=s.post;if(t.test(n)){let e=n.match(t).join(""),r=i[i.length-1];r.post=e+r.post,s.post=s.post.replace(t,"");}},G=function(e){return /^[A-Z][a-z'\u00C0-\u00FF]/.test(e)||/^[A-Z]$/.test(e)},M=function(e,r,i,t){let[s,n,a]=r;0===n||a===t[s].length?y(i):(y(i),y([e[r[1]]])),function(e,r,i){let t=e[r];if(0!==r||!G(t.text))return;i[0].text=i[0].text.replace(/^[a-z\u00C0-\u00FF]/,(e=>e.toUpperCase()));let s=e[r];s.tags.has("ProperNoun")||s.tags.has("Acronym")||G(s.text)&&s.text.length>1&&(s.text=s.text.replace(/^[A-Z]/,(e=>e.toLowerCase())));}(e,n,i),b(e,n,i);},B=(new Date).getTime(),N=e=>(e=e.length<3?"0"+e:e).length<3?"0"+e:e;var w=function(e){let[r,i]=e.index||[0,0];var t=(new Date).getTime()-B;t=parseInt(t,10),r=r>46655?46655:r,i=i>1294?1294:i;let s=N((t=t>46655?46655:t).toString(36));s+=N(r.toString(36));let n=i.toString(36);return n=n.length<2?"0"+n:n,s+=n,s+=parseInt(36*Math.random(),10).toString(36),e.normal+"|"+s.toUpperCase()};const A=function(e){if(e.has("@hasContraction")){e.grow("@hasContraction").contractions().expand();}},E=e=>"[object Array]"===Object.prototype.toString.call(e),P=function(e,r,i){const{document:t,world:s}=r;let n=r.fullPointer,a=r.fullPointer;r.forEach(((o,l)=>{let u=o.fullPointer[0],[c]=u,d=t[c],p=function(e,r){const{methods:i}=r;return "string"==typeof e?i.one.tokenize.fromString(e,r)[0]:"object"==typeof e&&e.isView?e.docs[0]:E(e)?E(e[0])?e[0]:e:[]}(e,s);p=function(e){return e.forEach((e=>{e.id=w(e);})),e}(p),i?(A(r.update([u]).firstTerm()),M(d,u,p,t)):(A(r.update([u]).lastTerm()),function(e,r,i,t){let[s,,n]=r,a=(t[s]||[]).length;n<a?(z(e,n,i),y(i)):a===n&&(y(e),z(e,n,i),t[s+1]&&(i[i.length-1].post+=" ")),b(e,r[2],i),r[4]=i[i.length-1].id;}(d,u,p,t)),t[c]&&t[c][u[1]]&&(u[3]=t[c][u[1]].id),a[l]=u,u[2]+=p.length,n[l]=u;}));let o=r.toView(n);return r.ptrs=a,o.compute(["index","lexicon","preTagger"]),o},x={insertAfter:function(e){return P(e,this,!1)},insertBefore:function(e){return P(e,this,!0)}};x.append=x.insertAfter,x.prepend=x.insertBefore,x.insert=x.insertAfter;var C=x;const O=/\$[0-9a-z]+/g,j={};j.replaceWith=function(e,r={}){let i=this.fullPointer,t=this;if("function"==typeof e)return function(e,r){return e.forEach((e=>{let i=r(e);e.replaceWith(i);})),e}(t,e);e=function(e,r){if("string"!=typeof e)return e;let i=r.groups();return e=e.replace(O,(e=>{let r=e.replace(/\$/,"");return i.hasOwnProperty(r)?i[r].text():e})),e}(e,t);let s=this.update(i);i=i.map((e=>e.slice(0,3)));let n=(s.docs[0]||[]).map((e=>Array.from(e.tags)));if(t.insertAfter(e),s.has("@hasContraction")&&t.contractions){t.grow("@hasContraction+").contractions().expand();}t.delete(s);let a=t.toView(i).compute(["index","lexicon","preTagger"]);return r.tags&&a.terms().forEach(((e,r)=>{e.tagSafe(n[r]);})),r.case&&a.docs[0]&&a.docs[0][0]&&0===a.docs[0][0].index[1]&&(a.docs[0][0].text=a.docs[0][0].text.replace(/\w\S*/g,(e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()))),a},j.replace=function(e,r,i){if(e&&!r)return this.replaceWith(e,i);let t=this.match(e);return t.found?t.replaceWith(r,i):this};var k=j;const H={remove:function(e){const{indexN:r}=this.methods.one.pointer;let i=this.all(),t=this;if(e&&(i=this,t=this.match(e)),i.has("@hasContraction")&&i.contractions){i.grow("@hasContraction").contractions().expand();}let s=i.fullPointer,n=t.fullPointer.reverse(),a=function(e,r){r.forEach((r=>{let[i,t,s]=r,n=s-t;e[i]&&(s===e[i].length&&s>1&&function(e,r){let i=e.length-1,t=e[i],s=e[i-r];s&&t&&(s.post+=t.post,s.post=s.post.replace(/ +([.?!,;:])/,"$1"),s.post=s.post.replace(/[,;:]+([.?!])/,"$1"));}(e[i],n),e[i].splice(t,n));}));for(let r=e.length-1;r>=0;r-=1)if(0===e[r].length&&(e.splice(r,1),r===e.length&&e[r-1])){let i=e[r-1],t=i[i.length-1];t&&(t.post=t.post.trimEnd());}return e}(this.document,n),o=r(n);return s=s.map((e=>{let[r]=e;return o[r]?(o[r].forEach((r=>{let i=r[2]-r[1];e[1]<=r[1]&&e[2]>=r[2]&&(e[2]-=i);})),e):e})),s=s.filter(((e,r)=>{if(e[2]-e[1]<=0){for(let e=r+1;e<s.length;e+=1)s.filter((r=>r[0]===e)).forEach((e=>{e[0]-=1;}));return !1}return !0})),s=s.map((e=>(e[3]=null,e[4]=null,e))),i.ptrs=s,i.document=a,i.compute("index"),e?i.toView(s):i.none()}};H.delete=H.remove;var F=H;const D={pre:function(e,r){return void 0===e&&this.found?this.docs[0][0].pre:(this.docs.forEach((i=>{let t=i[0];!0===r?t.pre+=e:t.pre=e;})),this)},post:function(e,r){if(void 0===e){let e=this.docs[this.docs.length-1];return e[e.length-1].post}return this.docs.forEach((i=>{let t=i[i.length-1];!0===r?t.post+=e:t.post=e;})),this},trim:function(){if(!this.found)return this;let e=this.docs,r=e[0][0];r.pre=r.pre.trimStart();let i=e[e.length-1],t=i[i.length-1];return t.post=t.post.trimEnd(),this},hyphenate:function(){return this.docs.forEach((e=>{e.forEach(((r,i)=>{0!==i&&(r.pre=""),e[i+1]&&(r.post="-");}));})),this},dehyphenate:function(){const e=/[-–—]/;return this.docs.forEach((r=>{r.forEach((r=>{e.test(r.post)&&(r.post=" ");}));})),this},toQuotations:function(e,r){return e=e||'"',r=r||'"',this.docs.forEach((i=>{i[0].pre=e+i[0].pre;let t=i[i.length-1];t.post=r+t.post;})),this},toParentheses:function(e,r){return e=e||"(",r=r||")",this.docs.forEach((i=>{i[0].pre=e+i[0].pre;let t=i[i.length-1];t.post=r+t.post;})),this}};D.deHyphenate=D.dehyphenate,D.toQuotation=D.toQuotations;var T=D;var I={alpha:(e,r)=>e.normal<r.normal?-1:e.normal>r.normal?1:0,length:(e,r)=>{let i=e.normal.trim().length,t=r.normal.trim().length;return i<t?1:i>t?-1:0},wordCount:(e,r)=>e.words<r.words?1:e.words>r.words?-1:0,sequential:(e,r)=>e[0]<r[0]?1:e[0]>r[0]?-1:e[1]>r[1]?1:-1,byFreq:function(e){let r={};return e.forEach((e=>{r[e.normal]=r[e.normal]||0,r[e.normal]+=1;})),e.sort(((e,i)=>{let t=r[e.normal],s=r[i.normal];return t<s?1:t>s?-1:0})),e}};const q=new Set(["index","sequence","seq","sequential","chron","chronological"]),V=new Set(["freq","frequency","topk","repeats"]),S=new Set(["alpha","alphabetical"]);var J={unique:function(){let e=new Set;return this.filter((r=>{let i=r.text("machine");return !e.has(i)&&(e.add(i),!0)}))},reverse:function(){let e=this.pointer||this.docs.map(((e,r)=>[r]));return e=[].concat(e),e=e.reverse(),this.update(e)},sort:function(e){let{docs:r,pointer:i}=this;if("function"==typeof e)return function(e,r){let i=e.fullPointer;return i=i.sort(((i,t)=>(i=e.update([i]),t=e.update([t]),r(i,t)))),e.ptrs=i,e}(this,e);e=e||"alpha";let t=i||r.map(((e,r)=>[r])),s=r.map(((e,r)=>({index:r,words:e.length,normal:e.map((e=>e.machine||e.normal||"")).join(" "),pointer:t[r]})));return q.has(e)&&(e="sequential"),S.has(e)&&(e="alpha"),V.has(e)?(s=I.byFreq(s),this.update(s.map((e=>e.pointer)))):"function"==typeof I[e]?(s=s.sort(I[e]),this.update(s.map((e=>e.pointer)))):this}};const L=function(e,r){let i=e[e.length-1],t=i[i.length-1];return !1===/ /.test(t.post)&&(t.post+=" "),e=e.concat(r)};var K={concat:function(e){const{methods:r,document:i,world:t}=this;if("string"==typeof e){let s=r.one.tokenize.fromString(e,t),n=this.fullPointer,a=n[n.length-1][0];return b(i,a+1,s),this.compute("index")}if("object"==typeof e&&e.isView)return function(e,r){if(e.document===r.document){let i=e.fullPointer.concat(r.fullPointer);return e.toView(i).compute("index")}return r.fullPointer.forEach((r=>{r[0]+=e.document.length;})),e.document=L(e.document,r.document),e.all()}(this,e);if(s=e,"[object Array]"===Object.prototype.toString.call(s)){let r=L(this.document,e);return this.document=r,this.all()}var s;return this}};const R=Object.assign({},{toLowerCase:function(){return this.termList().forEach((e=>{e.text=e.text.toLowerCase();})),this},toUpperCase:function(){return this.termList().forEach((e=>{e.text=e.text.toUpperCase();})),this},toTitleCase:function(){return this.termList().forEach((e=>{e.text=e.text.replace(/^ *[a-z\u00C0-\u00FF]/,(e=>e.toUpperCase()));})),this},toCamelCase:function(){return this.docs.forEach((e=>{e.forEach(((r,i)=>{0!==i&&(r.text=r.text.replace(/^ *[a-z\u00C0-\u00FF]/,(e=>e.toUpperCase()))),i!==e.length-1&&(r.post="");}));})),this}},C,k,F,T,J,K);var Q=function(e){Object.assign(e.prototype,R);};const U={id:function(e){let r=e.docs;for(let e=0;e<r.length;e+=1)for(let i=0;i<r[e].length;i+=1){let t=r[e][i];t.id=t.id||w(t);}}};var W={api:Q,compute:U};const Z=function(e,r){return r?(e.forEach((e=>{let i=e[0];r[i]&&(e[0]=r[i][0],e[1]+=r[i][1],e[2]+=r[i][1]);})),e):e},Y=function(e,r){let{ptrs:i,byGroup:t}=e;return i=Z(i,r),Object.keys(t).forEach((e=>{t[e]=Z(t[e],r);})),{ptrs:i,byGroup:t}},X=e=>e&&"object"==typeof e&&!0===e.isView;var $={matchOne:function(e,r,i){const t=this.methods.one;if(X(e))return this.intersection(e).eq(0);"string"==typeof e&&(e=t.parseMatch(e,i));let s={regs:e,group:r,justOne:!0},n=t.match(this.docs,s,this._cache),{ptrs:a,byGroup:o}=Y(n,this.fullPointer),l=this.toView(a);return l._groups=o,l},match:function(e,r,i){const t=this.methods.one;if(X(e))return this.intersection(e);"string"==typeof e&&(e=t.parseMatch(e,i));let s={regs:e,group:r},n=t.match(this.docs,s,this._cache),{ptrs:a,byGroup:o}=Y(n,this.fullPointer),l=this.toView(a);return l._groups=o,l},has:function(e,r,i){const t=this.methods.one;let s;if("string"==typeof e){let n={regs:e=t.parseMatch(e,i),group:r,justOne:!0};s=t.match(this.docs,n,this._cache).ptrs;}else X(e)&&(s=e.fullPointer);return s.length>0},if:function(e,r,i){const t=this.methods.one;if("string"==typeof e){let s={regs:e=t.parseMatch(e,i),group:r,justOne:!0},n=this.fullPointer;return n=n.filter((e=>{let r=this.update([e]);return t.match(r.docs,s,this._cache).ptrs.length>0})),this.update(n)}return X(e)?this.filter((r=>r.intersection(e).found)):this.none()},ifNo:function(e,r,i){const{methods:t}=this,s=t.one;return X(e)?this.difference(e):("string"==typeof e&&(e=s.parseMatch(e,i)),this.filter((i=>{let t={regs:e,group:r,justOne:!0};return 0===s.match(i.docs,t,i._cache).ptrs.length})))}};var _={before:function(e,r){const{indexN:i}=this.methods.one.pointer;let t=[],s=i(this.fullPointer);Object.keys(s).forEach((e=>{let r=s[e].sort(((e,r)=>e[1]>r[1]?1:-1))[0];r[1]>0&&t.push([r[0],0,r[1]]);}));let n=this.toView(t);return e?n.match(e,r):n},after:function(e,r){const{indexN:i}=this.methods.one.pointer;let t=[],s=i(this.fullPointer),n=this.document;Object.keys(s).forEach((e=>{let r=s[e].sort(((e,r)=>e[1]>r[1]?-1:1))[0],[i,,a]=r;a<n[i].length&&t.push([i,a,n[i].length]);}));let a=this.toView(t);return e?a.match(e,r):a},growLeft:function(e,r,i){(e=this.world.methods.one.parseMatch(e,i))[e.length-1].end=!0;let t=this.fullPointer;return this.forEach(((i,s)=>{let n=i.before(e,r);if(n.found){let e=n.terms();t[s][1]-=e.length,t[s][3]=e.docs[0][0].id;}})),this.update(t)},growRight:function(e,r,i){(e=this.world.methods.one.parseMatch(e,i))[0].start=!0;let t=this.fullPointer;return this.forEach(((i,s)=>{let n=i.after(e,r);if(n.found){let e=n.terms();t[s][2]+=e.length,t[s][4]=null;}})),this.update(t)},grow:function(e,r){return this.growRight(e,r).growLeft(e,r)}};const ee=function(e,r){return [e[0],e[1],r[2]]},re=(e,r,i)=>{let t=e;return "string"==typeof e&&(t=r.match(e,i)),t},ie=function(e,r){let[i,t]=e;return r.document[i]&&r.document[i][t]&&(e[3]=e[3]||r.document[i][t].id),e},te={splitOn:function(e,r){const{splitAll:i}=this.methods.one.pointer;let t=re(e,this,r).fullPointer,s=i(this.fullPointer,t),n=[];return s.forEach((e=>{n.push(e.passthrough),n.push(e.before),n.push(e.match),n.push(e.after);})),n=n.filter((e=>e)),n=n.map((e=>ie(e,this))),this.update(n)},splitBefore:function(e,r){const{splitAll:i}=this.methods.one.pointer;let t=re(e,this,r).fullPointer,s=i(this.fullPointer,t),n=[];return s.forEach((e=>{n.push(e.passthrough),n.push(e.before),e.match&&e.after?n.push(ee(e.match,e.after)):(n.push(e.match),n.push(e.after));})),n=n.filter((e=>e)),n=n.map((e=>ie(e,this))),this.update(n)},splitAfter:function(e,r){const{splitAll:i}=this.methods.one.pointer;let t=re(e,this,r).fullPointer,s=i(this.fullPointer,t),n=[];return s.forEach((e=>{n.push(e.passthrough),e.before&&e.match?n.push(ee(e.before,e.match)):(n.push(e.before),n.push(e.match)),n.push(e.after);})),n=n.filter((e=>e)),n=n.map((e=>ie(e,this))),this.update(n)}};te.split=te.splitAfter;var se=te;const ne=Object.assign({},$,_,se);ne.lookBehind=ne.before,ne.lookBefore=ne.before,ne.lookAhead=ne.after,ne.lookAfter=ne.after,ne.notIf=ne.ifNo;var ae=function(e){Object.assign(e.prototype,ne);};const oe=/(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/,le=/([!~[^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/,ue=/ /g,ce=e=>/^[![^]*(<[^<]*>)?\//.test(e)&&/\/[?\]+*$~]*$/.test(e),de=function(e){return e=(e=e.map((e=>e.trim()))).filter((e=>e))};var pe=function(e){let r=e.split(oe),i=[];r.forEach((e=>{ce(e)?i.push(e):i=i.concat(e.split(le));})),i=de(i);let t=[];return i.forEach((e=>{(e=>/^[![^]*(<[^<]*>)?\(/.test(e)&&/\)[?\]+*$~]*$/.test(e))(e)||ce(e)?t.push(e):t=t.concat(e.split(ue));})),t=de(t),t};const he=/\{([0-9]+)(, *[0-9]*)?\}/,me=/&&/,fe=new RegExp(/^<\s*(\S+)\s*>/),ge=e=>e.charAt(0).toUpperCase()+e.substr(1),ve=function(e){return e[e.length-1]},be=function(e){return e[0]},ye=function(e){return e.substr(1)},ze=function(e){return e.substr(0,e.length-1)},Ge=function(e){return e=ye(e),e=ze(e)},Me=function(e,r){let i={};for(let t=0;t<2;t+=1){if("$"===ve(e)&&(i.end=!0,e=ze(e)),"^"===be(e)&&(i.start=!0,e=ye(e)),("["===be(e)||"]"===ve(e))&&(i.group=null,"["===be(e)&&(i.groupStart=!0),"]"===ve(e)&&(i.groupEnd=!0),e=(e=e.replace(/^\[/,"")).replace(/\]$/,""),"<"===be(e))){const r=fe.exec(e);r.length>=2&&(i.group=r[1],e=e.replace(r[0],""));}if("+"===ve(e)&&(i.greedy=!0,e=ze(e)),"*"!==e&&"*"===ve(e)&&"\\*"!==e&&(i.greedy=!0,e=ze(e)),"?"===ve(e)&&(i.optional=!0,e=ze(e)),"!"===be(e)&&(i.negative=!0,e=ye(e)),"~"===be(e)&&"~"===ve(e)&&e.length>2&&(e=Ge(e),i.fuzzy=!0,i.min=r.fuzzy||.85,!1===/\(/.test(e)))return i.word=e,i;if("("===be(e)&&")"===ve(e)){me.test(e)?(i.choices=e.split(me),i.operator="and"):(i.choices=e.split("|"),i.operator="or"),i.choices[0]=ye(i.choices[0]);let t=i.choices.length-1;i.choices[t]=ze(i.choices[t]),i.choices=i.choices.map((e=>e.trim())),i.choices=i.choices.filter((e=>e)),i.choices=i.choices.map((e=>e.split(/ /g).map((e=>Me(e,r))))),e="";}if("/"===be(e)&&"/"===ve(e))return e=Ge(e),i.regex=new RegExp(e),i;if("{"===be(e)&&"}"===ve(e))return e=Ge(e),/\//.test(e)?(i.sense=e,i.greedy=!0):i.machine=e,i;if("<"===be(e)&&">"===ve(e))return e=Ge(e),i.chunk=ge(e),i.greedy=!0,i;if("%"===be(e)&&"%"===ve(e))return e=Ge(e),i.switch=e,i}return !0===he.test(e)&&(e=e.replace(he,((e,r,t)=>(void 0===t?(i.min=Number(r),i.max=Number(r)):(t=t.replace(/, */,""),i.min=Number(r),i.max=Number(t||999)),i.greedy=!0,i.optional=!0,"")))),"#"===be(e)?(i.tag=ye(e),i.tag=ge(i.tag),i):"@"===be(e)?(i.method=ye(e),i):"."===e?(i.anything=!0,i):"*"===e?(i.anything=!0,i.greedy=!0,i.optional=!0,i):(e&&(e=(e=e.replace("\\*","*")).replace("\\.","."),i.word=e.toLowerCase()),i)};var Be=Me;var Ne=function(e){return e=function(e){let r=0,i=null;for(let t=0;t<e.length;t++){const s=e[t];!0===s.groupStart&&(i=s.group,null===i&&(i=String(r),r+=1)),null!==i&&(s.group=i),!0===s.groupEnd&&(i=null);}return e}(e),e=function(e){return e.map((e=>(e.fuzzy&&e.choices&&e.choices.forEach((r=>{1===r.length&&r[0].word&&(r[0].fuzzy=!0,r[0].min=e.min);})),e)))}(e=e.map((e=>{if(void 0!==e.choices){if("or"!==e.operator)return e;if(!0===e.fuzzy)return e;!0===e.choices.every((e=>{if(1!==e.length)return !1;let r=e[0];return !0!==r.fuzzy&&!r.start&&!r.end&&void 0!==r.word&&!0!==r.negative&&!0!==r.optional&&!0!==r.method}))&&(e.fastOr=new Set,e.choices.forEach((r=>{e.fastOr.add(r[0].word);})),delete e.choices);}return e}))),e};var we=function(e,r={}){if(null==e||""===e)return [];"number"==typeof e&&(e=String(e));let i=pe(e);return i=i.map((e=>Be(e,r))),i=Ne(i),i};const Ae=function(e,r){for(let i of r)if(e.has(i))return !0;return !1};var Ee=function(e,r){for(let i=0;i<e.length;i+=1){let t=e[i];if(!0!==t.optional&&!0!==t.negation){if(void 0!==t.word&&!1===r.has(t.word))return !0;if(void 0!==t.tag&&!1===r.has("#"+t.tag))return !0;if(t.fastOr&&!1===Ae(t.fastOr,r))return !1}}return !1};var Pe=function(e,r,i=3){if(e===r)return 1;if(e.length<i||r.length<i)return 0;const t=function(e,r){let i=e.length,t=r.length;if(0===i)return t;if(0===t)return i;let s=(t>i?t:i)+1;if(Math.abs(i-t)>(s||100))return s||100;let n,a,o,l,u,c,d=[];for(let e=0;e<s;e++)d[e]=[e],d[e].length=s;for(let e=0;e<s;e++)d[0][e]=e;for(let s=1;s<=i;++s)for(a=e[s-1],n=1;n<=t;++n){if(s===n&&d[s][n]>4)return i;o=r[n-1],l=a===o?0:1,u=d[s-1][n]+1,(c=d[s][n-1]+1)<u&&(u=c),(c=d[s-1][n-1]+l)<u&&(u=c);let t=s>1&&n>1&&a===r[n-2]&&e[s-2]===o&&(c=d[s-2][n-2]+l)<u;d[s][n]=t?c:u;}return d[i][t]}(e,r);let s=Math.max(e.length,r.length);return 1-(0===s?0:t/s)};const xe=/([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/,Ce=/([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/,Oe=/^[-–—]$/,je=/ [-–—] /,ke=(e,r)=>-1!==e.post.indexOf(r),He=(e,r)=>-1!==e.pre.indexOf(r),Fe={hasQuote:e=>xe.test(e.pre)||Ce.test(e.post),hasComma:e=>ke(e,","),hasPeriod:e=>!0===ke(e,".")&&!1===ke(e,"..."),hasExclamation:e=>ke(e,"!"),hasQuestionMark:e=>ke(e,"?")||ke(e,"¿"),hasEllipses:e=>ke(e,"..")||ke(e,"…")||He(e,"..")||He(e,"…"),hasSemicolon:e=>ke(e,";"),hasSlash:e=>/\//.test(e.text),hasHyphen:e=>Oe.test(e.post)||Oe.test(e.pre),hasDash:e=>je.test(e.post)||je.test(e.pre),hasContraction:e=>Boolean(e.implicit),isAcronym:e=>e.tags.has("Acronym"),isKnown:e=>e.tags.size>0,isTitleCase:e=>/^[A-Z][a-z'\u00C0-\u00FF]/.test(e.text)};Fe.hasQuotation=Fe.hasQuote;var De=Fe;let Te=function(){};Te=function(e,r,i,t){let s=function(e,r,i,t){if(!0===r.anything)return !0;if(!0===r.start&&0!==i)return !1;if(!0===r.end&&i!==t-1)return !1;if(void 0!==r.word){if(null!==e.machine&&e.machine===r.word)return !0;if(void 0!==e.alias&&e.alias.hasOwnProperty(r.word))return !0;if(!0===r.fuzzy){if(r.word===e.root)return !0;if(Pe(r.word,e.normal)>=r.min)return !0}return !(!e.alias||!e.alias.some((e=>e===r.word)))||r.word===e.text||r.word===e.normal}return void 0!==r.tag?!0===e.tags.has(r.tag):void 0!==r.method?"function"==typeof De[r.method]&&!0===De[r.method](e):void 0!==r.pre?e.pre&&e.pre.includes(r.pre):void 0!==r.post?e.post&&e.post.includes(r.post):void 0!==r.regex?r.regex.test(e.normal):void 0!==r.chunk?e.chunk===r.chunk:void 0!==r.switch?e.switch===r.switch:void 0!==r.machine?e.normal===r.machine||e.machine===r.machine||e.root===r.machine:void 0!==r.sense?e.sense===r.sense:void 0!==r.fastOr?!(!e.implicit||!0!==r.fastOr.has(e.implicit))||r.fastOr.has(e.normal)||r.fastOr.has(e.text):void 0!==r.choices&&("and"===r.operator?r.choices.every((r=>Te(e,r,i,t))):r.choices.some((r=>Te(e,r,i,t))))}(e,r,i,t);return !0===r.negative?!s:s};var Ie=Te;const qe="undefined"==typeof process?self.env||{}:process.env,Ve=e=>{qe.DEBUG_MATCH&&console.log(`\n  [32m ${e} [0m`);},Se=function(e,r){let i=Object.assign({},e.regs[e.r],{start:!1,end:!1}),t=e.t;for(;e.t<e.terms.length;e.t+=1){if(r&&Ie(e.terms[e.t],r,e.start_i+e.t,e.phrase_length))return e.t;let s=e.t-t+1;if(void 0!==i.max&&s===i.max)return e.t;if(!1===Ie(e.terms[e.t],i,e.start_i+e.t,e.phrase_length))return void 0!==i.min&&s<i.min?null:e.t}return e.t},Je=function(e,r){let i=e.t;if(!r)return e.terms.length;for(;i<e.terms.length;i+=1)if(!0===Ie(e.terms[i],r,e.start_i+i,e.phrase_length))return Ve(`greedyTo ${e.terms[i].normal}`),i;return null},Le=function(e,r){if(!0===e.end&&!0===e.greedy&&r.start_i+r.t<r.phrase_length-1){let i=Object.assign({},e,{end:!1});if(!0===Ie(r.terms[r.t],i,r.start_i+r.t,r.phrase_length))return Ve(`endGreedy ${r.terms[r.t].normal}`),!0}return !1},Ke=function(e,r=0){let i=e.regs[e.r],t=!1;for(let n=0;n<i.choices.length;n+=1){let a=i.choices[n];if(s=a,"[object Array]"!==Object.prototype.toString.call(s))return !1;if(t=a.every(((i,t)=>{let s=0,n=e.t+t+r+s;if(void 0===e.terms[n])return !1;let a=Ie(e.terms[n],i,n+e.start_i,e.phrase_length);if(!0===a&&!0===i.greedy)for(let r=1;r<e.terms.length;r+=1){let t=e.terms[n+r];if(t){if(!0!==Ie(t,i,e.start_i+r,e.phrase_length))break;s+=1;}}return r+=s,a})),t){r+=a.length;break}}var s;return t&&!0===i.greedy?Ke(e,r):r},Re=function(e){let r=0;return !0===e.regs[e.r].choices.every((i=>{let t=i.every(((r,i)=>{let t=e.t+i;return void 0!==e.terms[t]&&Ie(e.terms[t],r,t,e.phrase_length)}));return !0===t&&i.length>r&&(r=i.length),t}))&&(Ve(`doAndBlock ${e.terms[e.t].normal}`),r)},Qe=function(e,r){return e.groups[e.inGroup]||(e.groups[e.inGroup]={start:r,length:0}),e.groups[e.inGroup]};var Ue=function(e,r,i,t){if(0===e.length||0===r.length)return null;let s={t:0,terms:e,r:0,regs:r,groups:{},start_i:i,phrase_length:t,inGroup:null};for(;s.r<r.length;s.r+=1){let e=r[s.r];if(s.hasGroup=Boolean(e.group),!0===s.hasGroup?s.inGroup=e.group:s.inGroup=null,!s.terms[s.t]){if(!1===r.slice(s.r).some((e=>!e.optional)))break;return null}if(!0===e.anything&&!0===e.greedy){let i=Je(s,r[s.r+1]);if(null===i||0===i)return null;if(void 0!==e.min&&i-s.t<e.min)return null;if(void 0!==e.max&&i-s.t>e.max){s.t=s.t+e.max;continue}if(!0===s.hasGroup){Qe(s,s.t).length=i-s.t;}s.t=i;continue}if(void 0!==e.choices&&"or"===e.operator){let r=Ke(s);if(r){if(!0===e.negative)return null;if(!0===s.hasGroup){Qe(s,s.t).length+=r;}if(!0===e.end){let e=s.phrase_length-1;if(s.t+s.start_i!==e)return null}s.t+=r;continue}if(!e.optional)return null}if(void 0!==e.choices&&"and"===e.operator){let r=Re(s);if(r){if(!0===e.negative)return null;if(!0===s.hasGroup){Qe(s,s.t).length+=r;}if(!0===e.end){let e=s.phrase_length-1;if(s.t+s.start_i!==e)return null}s.t+=r;continue}if(!e.optional)return null}let i=s.terms[s.t],n=Ie(i,e,s.start_i+s.t,s.phrase_length);if(!0===e.anything||!0===n||Le(e,s)){let n=s.t;if(e.optional&&r[s.r+1]&&e.negative)continue;if(e.optional&&r[s.r+1]){let t=Ie(i,r[s.r+1],s.start_i+s.t,s.phrase_length);if(e.negative||t){let e=s.terms[s.t+1];e&&Ie(e,r[s.r+1],s.start_i+s.t,s.phrase_length)||(s.r+=1);}}if(s.t+=1,!0===e.end&&s.t!==s.terms.length&&!0!==e.greedy)return null;if(!0===e.greedy){if(s.t=Se(s,r[s.r+1]),null===s.t)return null;if(e.min&&e.min>s.t)return null;if(!0===e.end&&s.start_i+s.t!==t)return null}if(!0===s.hasGroup){const r=Qe(s,n);s.t>1&&e.greedy?r.length+=s.t-n:r.length++;}}else {if(e.negative){let r=Object.assign({},e);if(r.negative=!1,!0===Ie(s.terms[s.t],r,s.start_i+s.t,s.phrase_length))return null}if(!0!==e.optional){if(Boolean(s.terms[s.t].implicit)&&r[s.r-1]&&s.terms[s.t+1]){if(s.terms[s.t-1]&&s.terms[s.t-1].implicit===r[s.r-1].word)return null;if(Ie(s.terms[s.t+1],e,s.start_i+s.t,s.phrase_length)){s.t+=2;continue}}return null}}}let n=[null,i,s.t+i];if(n[1]===n[2])return null;let a={};return Object.keys(s.groups).forEach((e=>{let r=s.groups[e],t=i+r.start;a[e]=[null,t,t+r.length];})),{pointer:n,groups:a}};var We=function(e,r){let i=[],t={};return 0===e.length||("number"==typeof r&&(r=String(r)),r?e.forEach((e=>{e.groups[r]&&i.push(e.groups[r]);})):e.forEach((e=>{i.push(e.pointer),Object.keys(e.groups).forEach((r=>{t[r]=t[r]||[],t[r].push(e.groups[r]);}));}))),{ptrs:i,byGroup:t}};const Ze=function(e,r){return e.pointer[0]=r,Object.keys(e.groups).forEach((i=>{e.groups[i][0]=r;})),e},Ye=function(e,r,i){let t=Ue(e,r,0,e.length);return t?(t=Ze(t,i),t):null};var Xe=function(e,r,i){i=i||[];let{regs:t,group:s,justOne:n}=r,a=[];if(!t||0===t.length)return {ptrs:[],byGroup:{}};const o=t.filter((e=>!0!==e.optional&&!0!==e.negative)).length;e:for(let r=0;r<e.length;r+=1){let s=e[r];if(!i[r]||!Ee(t,i[r]))if(!0!==t[0].start)for(let e=0;e<s.length;e+=1){let i=s.slice(e);if(i.length<o)break;let l=Ue(i,t,e,s.length);if(l){if(l=Ze(l,r),a.push(l),!0===n)break e;let i=l.pointer[2];Math.abs(i-1)>e&&(e=Math.abs(i-1));}}else {let e=Ye(s,t,r);e&&a.push(e);}}return !0===t[t.length-1].end&&(a=a.filter((r=>{let i=r.pointer[0];return e[i].length===r.pointer[2]}))),a=We(a,s),a.ptrs.forEach((r=>{let[i,t,s]=r;r[3]=e[i][t].id,r[4]=e[i][s-1].id;})),a};var $e={api:ae,methods:{one:{termMethods:De,parseMatch:we,match:Xe}},lib:{parseMatch:function(e,r){return this.world().methods.one.parseMatch(e,r)}}};const _e=/^\../,er=/^#./,rr=function(e,r){let i={},t={};return Object.keys(r).forEach((s=>{let n=r[s],a=function(e){let r="",i="</span>";return e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),_e.test(e)?r=`<span class="${e.replace(/^\./,"")}"`:er.test(e)?r=`<span id="${e.replace(/^#/,"")}"`:(r=`<${e}`,i=`</${e}>`),r+=">",{start:r,end:i}}(s);"string"==typeof n&&(n=e.match(n)),n.docs.forEach((e=>{if(e.every((e=>e.implicit)))return;let r=e[0].id;i[r]=i[r]||[],i[r].push(a.start);let s=e[e.length-1].id;t[s]=t[s]||[],t[s].push(a.end);}));})),{starts:i,ends:t}};var ir={html:function(e){let{starts:r,ends:i}=rr(this,e),t="";return this.docs.forEach((e=>{for(let s=0;s<e.length;s+=1){let n=e[s];r.hasOwnProperty(n.id)&&(t+=r[n.id].join("")),t+=n.pre||""+n.text||"",i.hasOwnProperty(n.id)&&(t+=i[n.id].join("")),t+=n.post||"";}})),t}};const tr=/[,:;)\]*.?~!\u0022\uFF02\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+$/,sr=/^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/,nr=/[,:;)('"\u201D\]]/,ar=/^[-–—]$/,or=/ /,lr=function(e,r,i=!0){let t="";return e.forEach((e=>{let i=e.pre||"",s=e.post||"";"some"===r.punctuation&&(i=i.replace(sr,""),ar.test(s)&&(s=" "),s=s.replace(nr,""),s=s.replace(/\?!+/,"?"),s=s.replace(/!+/,"!"),s=s.replace(/\?+/,"?"),s=s.replace(/\.{2,}/,"")),"some"===r.whitespace&&(i=i.replace(/\s/,""),s=s.replace(/\s+/," ")),r.keepPunct||(i=i.replace(sr,""),s="-"===s?" ":s.replace(tr,""));let n=e[r.form||"text"]||e.normal||"";"implicit"===r.form&&(n=e.implicit||e.text),"root"===r.form&&e.implicit&&(n=e.root||e.implicit||e.normal),"machine"!==r.form&&"implicit"!==r.form&&"root"!==r.form||!e.implicit||s&&or.test(s)||(s+=" "),t+=i+n+s;})),!1===i&&(t=t.trim()),!0===r.lowerCase&&(t=t.toLowerCase()),t},ur={text:{form:"text"},normal:{whitespace:"some",punctuation:"some",case:"some",unicode:"some",form:"normal"},machine:{whitespace:"some",punctuation:"some",case:"none",unicode:"some",form:"machine"},root:{whitespace:"some",punctuation:"some",case:"some",unicode:"some",form:"root"},implicit:{form:"implicit"}};ur.clean=ur.normal,ur.reduced=ur.root;var cr=ur;const dr={text:!0,terms:!0};let pr={case:"none",unicode:"some",form:"machine",punctuation:"some"};const hr=function(e,r){return Object.assign({},e,r)},mr={text:e=>lr(e,{keepPunct:!0},!1),normal:e=>lr(e,hr(cr.normal,{keepPunct:!0}),!1),implicit:e=>lr(e,hr(cr.implicit,{keepPunct:!0}),!1),machine:e=>lr(e,pr,!1),root:e=>lr(e,hr(pr,{form:"root"}),!1),offset:e=>{let r=mr.text(e).length;return {index:e[0].offset.index,start:e[0].offset.start,length:r}},terms:e=>e.map((e=>{let r=Object.assign({},e);return r.tags=Array.from(e.tags),r})),confidence:(e,r,i)=>r.eq(i).confidence(),syllables:(e,r,i)=>r.eq(i).syllables(),sentence:(e,r,i)=>r.eq(i).fullSentence().text(),dirty:e=>e.some((e=>!0===e.dirty))};mr.sentences=mr.sentence,mr.clean=mr.normal,mr.reduced=mr.root;const fr={json:function(e){let r=(i=this,"string"==typeof(t=(t=e)||{})&&(t={}),(t=Object.assign({},dr,t)).offset&&i.compute("offset"),i.docs.map(((e,r)=>{let s={};return Object.keys(t).forEach((n=>{t[n]&&mr[n]&&(s[n]=mr[n](e,i,r));})),s})));var i,t;return "number"==typeof e?r[e]:r}};fr.data=fr.json;var gr=fr;var vr=function(e){console.log("%c -=-=- ","background-color:#6699cc;"),e.forEach((e=>{console.groupCollapsed(e.text());let r=e.docs[0].map((e=>{let r=e.text||"-";return e.implicit&&(r="["+e.implicit+"]"),{text:r,tags:"["+Array.from(e.tags).join(", ")+"]"}}));console.table(r,["text","tags"]),console.groupEnd();}));};var br={green:e=>"[32m"+e+"[0m",red:e=>"[31m"+e+"[0m",blue:e=>"[34m"+e+"[0m",magenta:e=>"[35m"+e+"[0m",cyan:e=>"[36m"+e+"[0m",yellow:e=>"[33m"+e+"[0m",black:e=>"[30m"+e+"[0m",dim:e=>"[2m"+e+"[0m",i:e=>"[3m"+e+"[0m"};var yr=function(e){let{docs:r,model:i}=e;0===r.length&&console.log(br.blue("\n     ──────")),r.forEach((e=>{console.log(br.blue("\n  ┌─────────")),e.forEach((e=>{let r=[...e.tags||[]],t=e.text||"-";e.sense&&(t="{"+e.sense+"}"),e.implicit&&(t="["+e.implicit+"]"),t=br.yellow(t);let s="'"+t+"'";s=s.padEnd(18);let n=br.blue("  │ ")+br.i(s)+"  - "+function(e,r){return r.one.tagSet&&(e=e.map((e=>{if(!r.one.tagSet.hasOwnProperty(e))return e;const i=r.one.tagSet[e].color||"blue";return br[i](e)}))),e.join(", ")}(r,i);console.log(n);}));}));};var zr=function(e){let{docs:r}=e;console.log(""),r.forEach((e=>{let r=[];e.forEach((e=>{"Noun"===e.chunk?r.push(br.blue(e.implicit||e.normal)):"Verb"===e.chunk?r.push(br.green(e.implicit||e.normal)):"Adjective"===e.chunk?r.push(br.yellow(e.implicit||e.normal)):"Pivot"===e.chunk?r.push(br.red(e.implicit||e.normal)):r.push(e.implicit||e.normal);})),console.log(r.join(" "),"\n");}));};var Gr=function(e){if(!e.found)return;let r={};e.fullPointer.forEach((e=>{r[e[0]]=r[e[0]]||[],r[e[0]].push(e);})),Object.keys(r).forEach((i=>{let t=e.update([[Number(i)]]).text();e.update(r[i]).json({offset:!0}).forEach(((e,r)=>{t=function(e,r,i){let t=((e,r,i)=>{let t=9*i,s=r.start+t,n=s+r.length;return [e.substring(0,s),e.substring(s,n),e.substring(n,e.length)]})(e,r,i);return `${t[0]}${br.blue(t[1])}${t[2]}`}(t,e.offset,r);})),console.log(t);}));};var Mr=function(e={}){let r=this;if("string"==typeof e){let r={};r[e]=!0,e=r;}return "undefined"!=typeof window&&window.document?(vr(r),r):(!1!==e.tags&&(yr(r),console.log("\n")),!0===e.chunks&&(zr(r),console.log("\n")),!0===e.highlight&&(Gr(r),console.log("\n")),r)};const Br=function(e){let r=e.pre||"",i=e.post||"";return r+e.text+i};var Nr=function(e,r){let i=function(e,r){let i={};return Object.keys(r).forEach((t=>{e.match(t).fullPointer.forEach((e=>{i[e[3]]={fn:r[t],end:e[2]};}));})),i}(e,r),t="";return e.docs.forEach(((r,s)=>{for(let n=0;n<r.length;n+=1){let a=r[n];if(i.hasOwnProperty(a.id)){let{fn:o,end:l}=i[a.id],u=e.update([[s,n,l]]);t+=o(u),n=l-1,t+=r[n].post||"";}else t+=Br(a);}})),t};const wr={debug:Mr,out:function(e){if(r=e,"[object Object]"===Object.prototype.toString.call(r))return Nr(this,e);var r;if("text"===e)return this.text();if("normal"===e)return this.text("normal");if("machine"===e||"reduced"===e)return this.text("machine");if("json"===e)return this.json();if("offset"===e||"offsets"===e)return this.compute("offset"),this.json({offset:!0});if("array"===e){let e=this.docs.map((e=>e.reduce(((e,r)=>e+r.pre+r.text+r.post),"").trim()));return e.filter((e=>e))}if("freq"===e||"frequency"===e||"topk"===e)return function(e){let r={};return e.forEach((e=>{r[e]=r[e]||0,r[e]+=1;})),Object.keys(r).map((e=>({normal:e,count:r[e]}))).sort(((e,r)=>e.count>r.count?-1:0))}(this.json({normal:!0}).map((e=>e.normal)));if("terms"===e){let e=[];return this.docs.forEach((r=>{let i=r.terms.map((e=>e.text));i=i.filter((e=>e)),e=e.concat(i);})),e}return "tags"===e?this.docs.map((e=>e.reduce(((e,r)=>(e[r.implicit||r.normal]=Array.from(r.tags),e)),{}))):"debug"===e?this.debug():this.text()}};var Ar=wr;var Er={text:function(e){let r={keepSpace:!0,keepPunct:!0};var i;if(e&&"string"==typeof e&&cr.hasOwnProperty(e)?r=Object.assign({},cr[e]):e&&(i=e,"[object Object]"===Object.prototype.toString.call(i))&&(r=Object.assign({},e,r)),this.pointer){r.keepSpace=!1;let e=this.pointer[0];e&&e[1]?r.keepPunct=!1:r.keepPunct=!0;}else r.keepPunct=!0;return function(e,r){let i="";for(let t=0;t<e.length;t+=1)i+=lr(e[t],r,!0);return r.keepSpace||(i=i.trim()),!1===r.keepPunct&&(i=i.replace(sr,""),i=i.replace(tr,"")),!0===r.cleanWhitespace&&(i=i.trim()),i}(this.docs,r)}};const Pr=Object.assign({},Ar,Er,gr,ir);var xr=function(e){Object.assign(e.prototype,Pr);},Cr={api:xr};const Or=function(e,r){if(e[0]!==r[0])return !1;let[,i,t]=e,[,s,n]=r;return i<=s&&t>s||s<=i&&n>i},jr=function(e){let r={};return e.forEach((e=>{r[e[0]]=r[e[0]]||[],r[e[0]].push(e);})),r};var kr=function(e,r){let i=jr(r),t=[];return e.forEach((e=>{let[r]=e,s=i[r]||[];if(s=s.filter((r=>function(e,r){return e[1]<=r[1]&&r[2]<=e[2]}(e,r))),0===s.length)return void t.push({passthrough:e});s=s.sort(((e,r)=>e[1]-r[1]));let n=e;s.forEach(((e,r)=>{let i=function(e,r){let[i,t]=e,s=r[1],n=r[2],a={};if(t<s){let r=s<e[2]?s:e[2];a.before=[i,t,r];}return a.match=r,e[2]>n&&(a.after=[i,n,e[2]]),a}(n,e);s[r+1]?(t.push({before:i.before,match:i.match}),i.after&&(n=i.after)):t.push(i);}));})),t};var Hr=function(e,r){let i=[];return e.forEach(((t,s)=>{if(!t)return;let[n,a,o,l,u]=t,c=r[n]||[];if(void 0===a&&(a=0),void 0===o&&(o=c.length),!l||c[a]&&c[a].id===l)c=c.slice(a,o);else {let i=function(e,r,i){for(let t=0;t<4;t+=1){if(r[i-t]){let s=r[i-t].findIndex((r=>r.id===e));if(-1!==s)return [i-t,s]}if(r[i+t]){let s=r[i+t].findIndex((r=>r.id===e));if(-1!==s)return [i+t,s]}}return null}(l,r,n);if(null!==i){let t=o-a;c=r[i[0]].slice(i[1],i[1]+t);let n=c[0]?c[0].id:null;e[s]=[i[0],i[1],i[1]+t,n];}}0!==c.length&&a!==o&&(u&&c[c.length-1].id!==u&&(c=function(e,r){let[i,t,,,s]=e,n=r[i],a=n.findIndex((e=>e.id===s));return -1===a?(e[2]=r[i].length,e[4]=n.length?n[n.length-1].id:null):e[2]=a,r[i].slice(t,e[2]+1)}(t,r)),i.push(c));})),i};var Fr={one:{termList:function(e){let r=[];for(let i=0;i<e.length;i+=1)for(let t=0;t<e[i].length;t+=1)r.push(e[i][t]);return r},getDoc:Hr,pointer:{indexN:jr,splitAll:kr}}};var Dr=function(e,r){let i=e.concat(r),t=jr(i),s=[];return i.forEach((e=>{let[r]=e;if(1===t[r].length)return void s.push(e);let i=t[r].filter((r=>Or(e,r)));i.push(e);let n=function(e){let r=e[0][1],i=e[0][2];return e.forEach((e=>{e[1]<r&&(r=e[1]),e[2]>i&&(i=e[2]);})),[e[0][0],r,i]}(i);s.push(n);})),s=function(e){let r={};for(let i=0;i<e.length;i+=1)r[e[i].join(",")]=e[i];return Object.values(r)}(s),s};var Tr=function(e,r){let i=[];return kr(e,r).forEach((e=>{e.passthrough&&i.push(e.passthrough),e.before&&i.push(e.before),e.after&&i.push(e.after);})),i};var Ir=function(e,r){let i=jr(r),t=[];return e.forEach((e=>{let r=i[e[0]]||[];r=r.filter((r=>Or(e,r))),0!==r.length&&r.forEach((r=>{let i=function(e,r){let i=e[1]<r[1]?r[1]:e[1],t=e[2]>r[2]?r[2]:e[2];return i<t?[e[0],i,t]:null}(e,r);i&&t.push(i);}));})),t};const qr=(e,r)=>"string"==typeof e?r.match(e):e,Vr=function(e,r){return e.map((e=>{let[i,t]=e;return r[i]&&r[i][t]&&(e[3]=r[i][t].id),e}))},Sr={union:function(e){e=qr(e,this);let r=Dr(this.fullPointer,e.fullPointer);return r=Vr(r,this.document),this.toView(r)}};Sr.and=Sr.union,Sr.intersection=function(e){e=qr(e,this);let r=Ir(this.fullPointer,e.fullPointer);return r=Vr(r,this.document),this.toView(r)},Sr.not=function(e){e=qr(e,this);let r=Tr(this.fullPointer,e.fullPointer);return r=Vr(r,this.document),this.toView(r)},Sr.difference=Sr.not,Sr.complement=function(){let e=this.all(),r=Tr(e.fullPointer,this.fullPointer);return r=Vr(r,this.document),this.toView(r)},Sr.settle=function(){let e=this.fullPointer;return e.forEach((r=>{e=Dr(e,[r]);})),e=Vr(e,this.document),this.update(e)};var Jr=function(e){Object.assign(e.prototype,Sr);},Lr={methods:Fr,api:Jr};const Kr=/ /,Rr=function(e,r){"Noun"===r&&(e.chunk=r),"Verb"===r&&(e.chunk=r);},Qr=function(e,r,i,t){if(!0===e.tags.has(r))return null;if("."===r)return null;let s=i[r];if(s){if(s.not&&s.not.length>0)for(let r=0;r<s.not.length;r+=1){if(!0===t&&e.tags.has(s.not[r]))return null;e.tags.delete(s.not[r]);}if(s.parents&&s.parents.length>0)for(let r=0;r<s.parents.length;r+=1)e.tags.add(s.parents[r]),Rr(e,s.parents[r]);}return e.tags.add(r),e.dirty=!0,Rr(e,r),!0},Ur=function(e,r,i={},t,s){const n=i.model.one.tagSet||{};if(!r)return;let a="undefined"==typeof process?self.env||{}:process.env;var o;if(a&&a.DEBUG_TAGS&&((e,r,i="")=>{let t=e.text||"["+e.implicit+"]";var s;"string"!=typeof r&&r.length>2&&(r=r.slice(0,2).join(", #")+" +"),r="string"!=typeof r?r.join(", #"):r,console.log(` ${(s=t,"[33m[3m"+s+"[0m").padEnd(24)} [32m→[0m #${r.padEnd(25)}  ${(e=>"[3m"+e+"[0m")(i)}`);})(e[0],r,s),!0!=(o=r,"[object Array]"===Object.prototype.toString.call(o)))if(r=r.trim(),Kr.test(r))!function(e,r,i,t){let s=r.split(Kr);e.forEach(((e,r)=>{let n=s[r];n&&(n=n.replace(/^#/,""),Qr(e,n,i,t));}));}(e,r,n,t);else {r=r.replace(/^#/,"");for(let i=0;i<e.length;i+=1)Qr(e[i],r,n,t);}else r.forEach((r=>Ur(e,r,i,t)));};var Wr=Ur;var Zr=function(e,r,i){r=r.trim().replace(/^#/,"");for(let t=0;t<e.length;t+=1){let s=e[t];if("*"===r){s.tags.clear();continue}let n=i[r];if(n&&n.children.length>0)for(let e=0;e<n.children.length;e+=1)s.tags.delete(n.children[e]);s.tags.delete(r);}};const Yr=function(e){return e.children=e.children||[],e._cache=e._cache||{},e.props=e.props||{},e._cache.parents=e._cache.parents||[],e._cache.children=e._cache.children||[],e},Xr=/^ *(#|\/\/)/,$r=function(e){let r=e.trim().split(/->/),i=[];r.forEach((e=>{i=i.concat(function(e){if(!(e=e.trim()))return null;if(/^\[/.test(e)&&/\]$/.test(e)){let r=(e=(e=e.replace(/^\[/,"")).replace(/\]$/,"")).split(/,/);return r=r.map((e=>e.trim())).filter((e=>e)),r=r.map((e=>Yr({id:e}))),r}return [Yr({id:e})]}(e));})),i=i.filter((e=>e));let t=i[0];for(let e=1;e<i.length;e+=1)t.children.push(i[e]),t=i[e];return i[0]},_r=(e,r)=>{let i=[],t=[e];for(;t.length>0;){let e=t.pop();i.push(e),e.children&&e.children.forEach((i=>{r&&r(e,i),t.push(i);}));}return i},ei=e=>"[object Array]"===Object.prototype.toString.call(e),ri=e=>(e=e||"").trim(),ii=function(e=[]){return "string"==typeof e?function(e){let r=e.split(/\r?\n/),i=[];r.forEach((e=>{if(!e.trim()||Xr.test(e))return;let r=(e=>{const r=/^( {2}|\t)/;let i=0;for(;r.test(e);)e=e.replace(r,""),i+=1;return i})(e);i.push({indent:r,node:$r(e)});}));let t=function(e){let r={children:[]};return e.forEach(((i,t)=>{0===i.indent?r.children=r.children.concat(i.node):e[t-1]&&function(e,r){let i=e[r].indent;for(;r>=0;r-=1)if(e[r].indent<i)return e[r];return e[0]}(e,t).node.children.push(i.node);})),r}(i);return t=Yr(t),t}(e):ei(e)?function(e){let r={};e.forEach((e=>{r[e.id]=e;}));let i=Yr({});return e.forEach((e=>{if((e=Yr(e)).parent)if(r.hasOwnProperty(e.parent)){let i=r[e.parent];delete e.parent,i.children.push(e);}else console.warn(`[Grad] - missing node '${e.parent}'`);else i.children.push(e);})),i}(e):(_r(r=e).forEach(Yr),r);var r;},ti=function(e,r){let i="-> ";r&&(i=(e=>"[2m"+e+"[0m")("→ "));let t="";return _r(e).forEach(((e,s)=>{let n=e.id||"";if(r&&(n=(e=>"[31m"+e+"[0m")(n)),0===s&&!e.id)return;let a=e._cache.parents.length;t+="    ".repeat(a)+i+n+"\n";})),t},si=function(e){let r=_r(e);r.forEach((e=>{delete(e=Object.assign({},e)).children;}));let i=r[0];return i&&!i.id&&0===Object.keys(i.props).length&&r.shift(),r},ni={text:ti,txt:ti,array:si,flat:si},ai=function(e,r){return "nested"===r||"json"===r?e:"debug"===r?(console.log(ti(e,!0)),null):ni.hasOwnProperty(r)?ni[r](e):e},oi=e=>{_r(e,((e,r)=>{e.id&&(e._cache.parents=e._cache.parents||[],r._cache.parents=e._cache.parents.concat([e.id]));}));},li=/\//;class g{constructor(e={}){Object.defineProperty(this,"json",{enumerable:!1,value:e,writable:!0});}get children(){return this.json.children}get id(){return this.json.id}get found(){return this.json.id||this.json.children.length>0}props(e={}){let r=this.json.props||{};return "string"==typeof e&&(r[e]=!0),this.json.props=Object.assign(r,e),this}get(e){if(e=ri(e),!li.test(e)){let r=this.json.children.find((r=>r.id===e));return new g(r)}let r=((e,r)=>{let i=(e=>"string"!=typeof e?e:(e=e.replace(/^\//,"")).split(/\//))(r=r||"");for(let r=0;r<i.length;r+=1){let t=e.children.find((e=>e.id===i[r]));if(!t)return null;e=t;}return e})(this.json,e)||Yr({});return new g(r)}add(e,r={}){if(ei(e))return e.forEach((e=>this.add(ri(e),r))),this;e=ri(e);let i=Yr({id:e,props:r});return this.json.children.push(i),new g(i)}remove(e){return e=ri(e),this.json.children=this.json.children.filter((r=>r.id!==e)),this}nodes(){return _r(this.json).map((e=>(delete(e=Object.assign({},e)).children,e)))}cache(){return (e=>{let r=_r(e,((e,r)=>{e.id&&(e._cache.parents=e._cache.parents||[],e._cache.children=e._cache.children||[],r._cache.parents=e._cache.parents.concat([e.id]));})),i={};r.forEach((e=>{e.id&&(i[e.id]=e);})),r.forEach((e=>{e._cache.parents.forEach((r=>{i.hasOwnProperty(r)&&i[r]._cache.children.push(e.id);}));})),e._cache.children=Object.keys(i);})(this.json),this}list(){return _r(this.json)}fillDown(){var e;return e=this.json,_r(e,((e,r)=>{r.props=((e,r)=>(Object.keys(r).forEach((i=>{if(r[i]instanceof Set){let t=e[i]||new Set;e[i]=new Set([...t,...r[i]]);}else if((e=>e&&"object"==typeof e&&!Array.isArray(e))(r[i])){let t=e[i]||{};e[i]=Object.assign({},r[i],t);}else ei(r[i])?e[i]=r[i].concat(e[i]||[]):void 0===e[i]&&(e[i]=r[i]);})),e))(r.props,e.props);})),this}depth(){oi(this.json);let e=_r(this.json),r=e.length>1?1:0;return e.forEach((e=>{if(0===e._cache.parents.length)return;let i=e._cache.parents.length+1;i>r&&(r=i);})),r}out(e){return oi(this.json),ai(this.json,e)}debug(){return oi(this.json),ai(this.json,"debug"),this}}const ui=function(e){let r=ii(e);return new g(r)};ui.prototype.plugin=function(e){e(this);};var ci={Noun:"blue",Verb:"green",Negative:"green",Date:"red",Value:"red",Adjective:"magenta",Preposition:"cyan",Conjunction:"cyan",Determiner:"cyan",Adverb:"cyan"};const di=function(e){if(ci.hasOwnProperty(e.id))return ci[e.id];if(ci.hasOwnProperty(e.is))return ci[e.is];let r=e._cache.parents.find((e=>ci[e]));return ci[r]};var pi=function(e){const r={};return e.forEach((e=>{let{not:i,also:t,is:s}=e.props,n=e._cache.parents;t&&(n=n.concat(t)),r[e.id]={is:s,not:i,also:t,parents:n,children:e._cache.children,color:di(e)};})),Object.keys(r).forEach((e=>{let i=new Set(r[e].not);r[e].not.forEach((e=>{r[e]&&r[e].children.forEach((e=>i.add(e)));})),r[e].not=Array.from(i);})),r};const hi=function(e){return e?"string"==typeof e?[e]:e:[]};var mi=function(e,r){return e=function(e,r){return Object.keys(e).forEach((i=>{e[i].isA&&(e[i].is=e[i].isA),e[i].notA&&(e[i].not=e[i].notA),e[i].is&&"string"==typeof e[i].is&&(r.hasOwnProperty(e[i].is)||e.hasOwnProperty(e[i].is)||(e[e[i].is]={})),e[i].not&&"string"==typeof e[i].not&&!e.hasOwnProperty(e[i].not)&&(r.hasOwnProperty(e[i].not)||e.hasOwnProperty(e[i].not)||(e[e[i].not]={}));})),e}(e,r),Object.keys(e).forEach((r=>{e[r].children=hi(e[r].children),e[r].not=hi(e[r].not);})),Object.keys(e).forEach((r=>{(e[r].not||[]).forEach((i=>{e[i]&&e[i].not&&e[i].not.push(r);}));})),e};var fi=function(e,r){e=mi(e,r);const i=function(e){const r=Object.keys(e).map((r=>{let i=e[r];const t={not:new Set(i.not),also:i.also,is:i.is};return {id:r,parent:i.is,props:t,children:[]}}));return ui(r).cache().fillDown().out("array")}(Object.assign({},r,e));return pi(i)},gi={one:{setTag:Wr,unTag:Zr,addTags:fi}};const vi=function(e){return "[object Array]"===Object.prototype.toString.call(e)},bi={tag:function(e,r="",i){if(!this.found||!e)return this;let t=this.termList();if(0===t.length)return this;const{methods:s,verbose:n,world:a}=this;return !0===n&&console.log(" +  ",e,r||""),vi(e)?e.forEach((e=>s.one.setTag(t,e,a,i))):s.one.setTag(t,e,a,i),this.uncache(),this},tagSafe:function(e,r=""){return this.tag(e,r,!0)},unTag:function(e,r){if(!this.found||!e)return this;let i=this.termList();if(0===i.length)return this;const{methods:t,verbose:s,model:n}=this;!0===s&&console.log(" -  ",e,r||"");let a=n.one.tagSet;return vi(e)?e.forEach((e=>t.one.unTag(i,e,a))):t.one.unTag(i,e,a),this.uncache(),this},canBe:function(e){let r=this.model.one.tagSet;if(!r.hasOwnProperty(e))return this;let i=r[e].not||[],t=[];this.document.forEach(((e,r)=>{e.forEach(((e,s)=>{i.find((r=>e.tags.has(r)))&&t.push([r,s,s+1]);}));}));let s=this.update(t);return this.difference(s)}};var yi=bi;var zi=function(e){Object.assign(e.prototype,yi);};var Gi={addTags:function(e){const{model:r,methods:i}=this.world(),t=r.one.tagSet;let s=(0, i.one.addTags)(e,t);return r.one.tagSet=s,this}};const Mi=new Set(["Auxiliary","Possessive"]);var Bi=function(e){const{document:r,world:i}=e,t=i.model.one.tagSet;r.forEach((e=>{e.forEach((e=>{let r=Array.from(e.tags);e.tagRank=function(e,r){return e=e.sort(((e,i)=>{if(Mi.has(e)||!r.hasOwnProperty(i))return 1;if(Mi.has(i)||!r.hasOwnProperty(e))return -1;let t=r[e].children||[],s=t.length;return t=r[i].children||[],s-t.length})),e}(r,t);}));}));},Ni={model:{one:{tagSet:{}}},compute:{tagRank:Bi},methods:gi,api:zi,lib:Gi};const wi=/(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s|$)/g,Ai=/((?:\r?\n|\r)+)/;var Ei=function(e){let r=[],i=e.split(Ai);for(let e=0;e<i.length;e++){let t=i[e].split(wi);for(let e=0;e<t.length;e++)r.push(t[e]);}return r};const Pi=/[ .][A-Z]\.? *$/i,xi=/(?:\u2026|\.{2,}) *$/,Ci=/[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;var Oi=function(e,r){if(!1===Ci.test(e))return !1;if(!0===Pi.test(e))return !1;if(!0===xi.test(e))return !1;let i=e.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/,"").split(" "),t=i[i.length-1].toLowerCase();return !0!==r.hasOwnProperty(t)};const ji=/\S/,ki=/^\s+/,Hi=/[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;var Fi=function(e,r){let i=r.one.abbreviations||new Set;e=e||"";let t=[],s=[];if(!(e=String(e))||"string"!=typeof e||!1===ji.test(e))return t;e=e.replace(" "," ");let n=Ei(e);for(let e=0;e<n.length;e++){let r=n[e];if(void 0!==r&&""!==r){if(!1===ji.test(r)||!1===Hi.test(r)){if(s[s.length-1]){s[s.length-1]+=r;continue}if(n[e+1]){n[e+1]=r+n[e+1];continue}}s.push(r);}}for(let e=0;e<s.length;e++){let r=s[e];s[e+1]&&!1===Oi(r,i)?s[e+1]=r+(s[e+1]||""):r&&r.length>0&&(t.push(r),s[e]="");}if(0===t.length)return [e];for(let e=1;e<t.length;e+=1){let r=t[e].match(ki);null!==r&&(t[e-1]+=r[0],t[e]=t[e].replace(ki,""));}return t};const Di=function(e,r){let i=e.split(/[-–—]/);if(i.length<=1)return !1;const{prefixes:t,suffixes:s}=r.one;if(t.hasOwnProperty(i[0]))return !1;if(i[1]=i[1].trim().replace(/[.?!]$/,""),s.hasOwnProperty(i[1]))return !1;if(!0===/^([a-z\u00C0-\u00FF`"'/]+)[-–—]([a-z0-9\u00C0-\u00FF].*)/i.test(e))return !0;return !0===/^([0-9]{1,4})[-–—]([a-z\u00C0-\u00FF`"'/-]+$)/i.test(e)},Ti=function(e){let r=[];const i=e.split(/[-–—]/);let t="-",s=e.match(/[-–—]/);s&&s[0]&&(t=s);for(let e=0;e<i.length;e++)e===i.length-1?r.push(i[e]):r.push(i[e]+t);return r};var Ii=function(e){const r=/^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?[-–—] ?$/,i=/^[0-9]{1,4}([a-z]{1,2})? ?$/;for(let t=0;t<e.length-1;t+=1)e[t+1]&&r.test(e[t])&&i.test(e[t+1])&&(e[t]=e[t]+e[t+1],e[t+1]=null);return e};const qi=/[a-z] ?\/ ?[a-z]+$/;var Vi=function(e){for(let r=1;r<e.length-1;r++)qi.test(e[r])&&(e[r-1]+=e[r]+e[r+1],e[r]=null,e[r+1]=null);return e};const Si=/\S/,Ji=/^[!?.]+$/,Li=/(\S+)/;let Ki=[".","?","!",":",";","-","–","—","--","...","(",")","[","]",'"',"'","`"];Ki=Ki.reduce(((e,r)=>(e[r]=!0,e)),{});var Ri=function(e,r){let i=[],t=[];if("number"==typeof(e=e||"")&&(e=String(e)),function(e){return "[object Array]"===Object.prototype.toString.call(e)}(e))return e;const s=e.split(Li);for(let e=0;e<s.length;e++)!0!==Di(s[e],r)?t.push(s[e]):t=t.concat(Ti(s[e]));let n="";for(let e=0;e<t.length;e++){let r=t[e];!0===Si.test(r)&&!1===Ki.hasOwnProperty(r)&&!1===Ji.test(r)?(i.length>0?(i[i.length-1]+=n,i.push(r)):i.push(n+r),n=""):n+=r;}return n&&(0===i.length&&(i[0]=""),i[i.length-1]+=n),i=Vi(i),i=Ii(i),i=i.filter((e=>e)),i};const Qi=/^[ \n\t.[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/,Ui=/[ \n\t.'[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/,Wi=/['’]/,Zi=/^[a-z]\.([a-z]\.)+/i,Yi=/^[-+.][0-9]/,Xi=/^'[0-9]{2}/;var $i=function(e){let r=e,i="",t="";return ""===(e=(e=e.replace(Qi,(r=>(i=r,"-"!==i&&"+"!==i&&"."!==i||!Yi.test(e)?"'"===i&&Xi.test(e)?(i="",r):"":(i="",r))))).replace(Ui,(s=>(t=s,Wi.test(s)&&/[sn]['’]$/.test(r)&&!1===Wi.test(i)?(t=t.replace(Wi,""),"'"):!0===Zi.test(e)?(t=t.replace(/\./,""),"."):""))))&&(r=r.replace(/ *$/,(e=>(t=e||"",""))),e=r,i=""),{str:e,pre:i,post:t}};var _i=function(e){let r=e=(e=(e=e||"").toLowerCase()).trim();return e=(e=(e=e.replace(/[,;.!?]+$/,"")).replace(/\u2026/g,"...")).replace(/\u2013/g,"-"),!1===/^[:;]/.test(e)&&(e=(e=(e=e.replace(/\.{3,}$/g,"")).replace(/[",.!:;?)]+$/g,"")).replace(/^['"(]+/g,"")),""===(e=(e=e.replace(/[\u200B-\u200D\uFEFF]/g,"")).trim())&&(e=r),e=e.replace(/([0-9]),([0-9])/g,"$1$2")};const et=/([A-Z]\.)+[A-Z]?,?$/,rt=/^[A-Z]\.,?$/,it=/[A-Z]{2,}('s|,)?$/,tt=/([a-z]\.)+[a-z]\.?$/;var st=function(e){return function(e){return !0===et.test(e)||!0===tt.test(e)||!0===rt.test(e)||!0===it.test(e)}(e)&&(e=e.replace(/\./g,"")),e};var nt=function(e,r){const i=r.methods.one.killUnicode;let t=e.text||"";t=_i(t),t=i(t,r),t=st(t),e.normal=t;};var at=function(e,r){const i=r.model.one.unicode||{};let t=e.split("");return t.forEach(((e,r)=>{i[e]&&(t[r]=i[e]);})),t.join("")};var ot={one:{killUnicode:at,tokenize:{splitSentences:Fi,splitTerms:Ri,splitWhitespace:e=>{let{str:r,pre:i,post:t}=$i(e);return {text:r,pre:i,post:t,tags:new Set}},fromString:function(e,r){const{methods:i,model:t}=r,{splitSentences:s,splitTerms:n,splitWhitespace:a}=i.one.tokenize;return e=s(e=e||"",t).map((e=>{let i=n(e,t);return i=i.map(a),i.forEach((e=>{nt(e,r);})),i})),e}}}};var lt={"&":"and","@":"at","%":"percent"};let ut={},ct={};[[["approx","apt","bc","cyn","eg","esp","est","etc","ex","exp","prob","pron","gal","min","pseud","fig","jd","lat","lng","vol","fm","def","misc","plz","ea","ps","sec","pt","pref","pl","pp","qt","fr","sq","nee","ss","tel","temp","vet","ver","fem","masc","eng","adj","vb","rb","inf","situ","vivo","vitro","wr"]],[["dl","ml","gal","ft","qt","pt","tbl","tsp","tbsp","km","dm","cm","mm","mi","td","hr","hrs","kg","hg","dg","cg","mg","µg","lb","oz","sq ft","hz","mps","mph","kmph","kb","mb","gb","tb","lx","lm","pa","fl oz","yb"],"Unit"],[["ad","al","arc","ba","bl","ca","cca","col","corp","ft","fy","ie","lit","ma","md","pd","tce"],"Noun"],[["adj","adm","adv","asst","atty","bldg","brig","capt","cmdr","comdr","cpl","det","dr","esq","gen","gov","hon","jr","llb","lt","maj","messrs","mister","mlle","mme","mr","mrs","ms","mstr","phd","prof","pvt","rep","reps","res","rev","sen","sens","sfc","sgt","sir","sr","supt","surg"],"Honorific"],[["jan","feb","mar","apr","jun","jul","aug","sep","sept","oct","nov","dec"],"Month"],[["dept","univ","assn","bros","inc","ltd","co"],"Organization"],[["rd","st","dist","mt","ave","blvd","cl","cres","hwy","ariz","cal","calif","colo","conn","fla","fl","ga","ida","ia","kan","kans","minn","neb","nebr","okla","penna","penn","pa","dak","tenn","tex","ut","vt","va","wis","wisc","wy","wyo","usafa","alta","ont","que","sask"],"Place"]].forEach((e=>{e[0].forEach((r=>{ut[r]=!0,ct[r]="Abbreviation",void 0!==e[1]&&(ct[r]=[ct[r],e[1]]);}));}));var dt=["anti","bi","co","contra","counter","de","extra","infra","inter","intra","macro","micro","mid","mis","mono","multi","non","over","peri","post","pre","pro","proto","pseudo","re","semi","sub","supra","trans","tri","un","out"].reduce(((e,r)=>(e[r]=!0,e)),{});let pt={"!":"¡","?":"¿Ɂ",'"':'“”"❝❞',"'":"‘‛❛❜’","-":"—–",a:"ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",b:"ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",c:"¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",d:"ÐĎďĐđƉƊȡƋƌ",e:"ÈÉÊËèéêëĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ",f:"ƑƒϜϝӺӻҒғſ",g:"ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",h:"ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",I:"ÌÍÎÏ",i:"ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",j:"ĴĵǰȷɈɉϳЈј",k:"ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",l:"ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",m:"ΜϺϻМмӍӎ",n:"ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",o:"ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",p:"ƤΡρϷϸϼРрҎҏÞ",q:"Ɋɋ",r:"ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",s:"ŚśŜŝŞşŠšƧƨȘșȿЅѕ",t:"ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",u:"µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",v:"νѴѵѶѷ",w:"ŴŵƜωώϖϢϣШЩшщѡѿ",x:"×ΧχϗϰХхҲҳӼӽӾӿ",y:"ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",z:"ŹźŻżŽžƵƶȤȥɀΖ"},ht={};Object.keys(pt).forEach((function(e){pt[e].split("").forEach((function(r){ht[r]=e;}));}));const mt=/\//,ft=/[a-z]\.[a-z]/i,gt=/[0-9]/;var vt=function(e,r){let i=e.normal||e.text;const t=r.model.one.aliases;if(t.hasOwnProperty(i)&&(e.alias=e.alias||[],e.alias.push(t[i])),mt.test(i)&&!ft.test(i)&&!gt.test(i)){let r=i.split(mt);r.length<=2&&r.forEach((r=>{""!==(r=r.trim())&&(e.alias=e.alias||[],e.alias.push(r));}));}return e};var bt=function(e){let r=e.implicit||e.normal||e.text;r=r.replace(/['’]s$/,""),r=r.replace(/s['’]$/,"s"),r=r.replace(/([aeiou][ktrp])in'$/,"$1ing"),!0===/^(re|un)-?[^aeiou]./.test(r)&&(r=r.replace("-","")),r=r.replace(/^[#@]/,""),r!==e.normal&&(e.machine=r);};var yt=function(e){let r=e.docs,i={};for(let e=0;e<r.length;e+=1)for(let t=0;t<r[e].length;t+=1){let s=r[e][t],n=s.machine||s.normal;i[n]=i[n]||0,i[n]+=1;}for(let e=0;e<r.length;e+=1)for(let t=0;t<r[e].length;t+=1){let s=r[e][t],n=s.machine||s.normal;s.freq=i[n];}};var zt=function(e){let r=0,i=0,t=e.document;for(let e=0;e<t.length;e+=1)for(let s=0;s<t[e].length;s+=1){let n=t[e][s];n.offset={index:i,start:r+n.pre.length,length:n.text.length},r+=n.pre.length+n.text.length+n.post.length,i+=1;}};var Gt=function(e){let r=e.document;for(let e=0;e<r.length;e+=1)for(let i=0;i<r[e].length;i+=1)r[e][i].index=[e,i];};var Mt=function(e){let r=0,i=e.docs;for(let e=0;e<i.length;e+=1)for(let t=0;t<i[e].length;t+=1)""!==i[e][t].normal&&(r+=1,i[e][t].wordCount=r);};const Bt=function(e,r){let i=e.docs;for(let t=0;t<i.length;t+=1)for(let s=0;s<i[t].length;s+=1)r(i[t][s],e.world);};var Nt={compute:{alias:e=>Bt(e,vt),machine:e=>Bt(e,bt),normal:e=>Bt(e,nt),freq:yt,offset:zt,index:Gt,wordCount:Mt},methods:ot,model:{one:{aliases:lt,abbreviations:ut,prefixes:dt,suffixes:{like:!0,ish:!0,less:!0,able:!0,elect:!0,type:!0,designate:!0},lexicon:ct,unicode:ht}},hooks:["alias","machine","index","id"]};var wt=function(e,r){let i=[{}],t=[null],s=[0],n=[],a=0;e.forEach((function(e){let s=0,n=function(e,r){const{methods:i,model:t}=r;return i.one.tokenize.splitTerms(e,t).map(i.one.tokenize.splitWhitespace).map((e=>e.text.toLowerCase()))}(e,r);for(let e=0;e<n.length;e++){let r=n[e];i[s]&&i[s].hasOwnProperty(r)?s=i[s][r]:(a++,i[s][r]=a,i[a]={},s=a,t[a]=null);}t[s]=[n.length];}));for(let e in i[0])a=i[0][e],s[a]=0,n.push(a);for(;n.length;){let e=n.shift(),r=Object.keys(i[e]);for(let o=0;o<r.length;o+=1){let l=r[o],u=i[e][l];for(n.push(u),a=s[e];a>0&&!i[a].hasOwnProperty(l);)a=s[a];if(i.hasOwnProperty(a)){let e=i[a][l];s[u]=e,t[e]&&(t[u]=t[u]||[],t[u]=t[u].concat(t[e]));}else s[u]=0;}}return {goNext:i,endAs:t,failTo:s}};const At=function(e,r,i){let t=0,s=[];for(let n=0;n<e.length;n++){let a=e[n][i.form]||e[n].normal;for(;t>0&&(void 0===r.goNext[t]||!r.goNext[t].hasOwnProperty(a));)t=r.failTo[t]||0;if(r.goNext[t].hasOwnProperty(a)&&(t=r.goNext[t][a],r.endAs[t])){let i=r.endAs[t];for(let r=0;r<i.length;r++){let t=i[r],a=e[n-t+1],[o,l]=a.index;s.push([o,l,l+t,a.id]);}}}return s},Et=function(e,r){for(let i=0;i<e.length;i+=1)if(!0===r.has(e[i]))return !1;return !0};var Pt=function(e,r,i){let t=[];i.form=i.form||"normal";let s=e.docs;if(!r.goNext||!r.goNext[0])return console.error("Compromise invalid lookup trie"),e.none();let n=Object.keys(r.goNext[0]);for(let a=0;a<s.length;a++){if(e._cache&&e._cache[a]&&!0===Et(n,e._cache[a]))continue;let o=s[a],l=At(o,r,i);l.length>0&&(t=t.concat(l));}return e.update(t)};const xt=(e,r)=>{for(let i=e.length-1;i>=0;i-=1)if(e[i]!==r)return e=e.slice(0,i+1),e;return e};var Ct=function(e){return e.goNext=e.goNext.map((e=>{if(0!==Object.keys(e).length)return e})),e.goNext=xt(e.goNext,void 0),e.failTo=xt(e.failTo,0),e.endAs=xt(e.endAs,null),e};var Ot={api:function(e){e.prototype.lookup=function(e,r={}){if(!e)return this.none();"string"==typeof e&&(e=[e]);let i=(t=e,"[object Object]"===Object.prototype.toString.call(t)?e:wt(e,this.world));var t;let s=Pt(this,i,r);return s=s.settle(),s};},lib:{compile:function(e){const r=wt(e,this.world());return Ct(r)}}};var jt=function(e){let r=e.map((e=>{let r=new Set;return e.forEach((e=>{""!==e.normal&&r.add(e.normal),e.switch&&r.add(`%${e.switch}%`),e.implicit&&r.add(e.implicit);let i=Array.from(e.tags);for(let e=0;e<i.length;e+=1)r.add("#"+i[e]);})),r}));return r};const kt={cache:function(){return this._cache=this.methods.one.cacheDoc(this.document),this},uncache:function(){return this._cache=null,this}};var Ht=function(e){Object.assign(e.prototype,kt);},Ft={api:Ht,compute:{cache:function(e){e._cache=e.methods.one.cacheDoc(e.document);}},methods:{one:{cacheDoc:jt,cacheMatch:function(e){let r=new Set;return e.forEach((e=>{!0!==e.optional&&!0!==e.negative&&(e.tag&&r.add("#"+e.tag),e.word&&r.add(e.word));})),r}}}};var Dt={typeahead:function(e){const r=e.model.one.typeahead,i=e.docs;if(0===i.length||0===Object.keys(r).length)return;let t=i[i.length-1]||[],s=t[t.length-1];if(!s.post&&r.hasOwnProperty(s.normal)){let i=r[s.normal];s.implicit=i,s.machine=i,s.typeahead=!0,e.compute.preTagger&&e.last().unTag("*").compute(["lexicon","preTagger"]);}}};const Tt=function(){const e=this.docs;if(0===e.length)return this;let r=e[e.length-1]||[],i=r[r.length-1];return !0===i.typeahead&&i.machine&&(i.text=i.machine,i.normal=i.machine),this};var It=function(e){e.prototype.autoFill=Tt;};var qt=function(e,r,i){let t={},s=[],n=i.prefixes||{};return e.forEach((e=>{let a=(e=e.toLowerCase().trim()).length;r.max&&a>r.max&&(a=r.max);for(let o=r.min;o<a;o+=1){let a=e.substr(0,o);r.safe&&i.model.one.lexicon.hasOwnProperty(a)||(!0!==n.hasOwnProperty(a)&&!0!==t.hasOwnProperty(a)?t[a]=e:s.push(a));}})),t=Object.assign({},n,t),s.forEach((e=>{delete t[e];})),t};const Vt={safe:!0,min:3};var St={typeahead:function(e=[],r={}){let i=this.model();var t;r=Object.assign({},Vt,r),t=e,"[object Object]"===Object.prototype.toString.call(t)&&(Object.assign(i.one.lexicon,e),e=Object.keys(e));let s=qt(e,r,this.world());return Object.keys(s).forEach((e=>{i.one.typeahead.hasOwnProperty(e)?delete i.one.typeahead[e]:i.one.typeahead[e]=s[e];})),this}};var Jt={model:{one:{typeahead:{}}},api:It,lib:St,compute:Dt,hooks:["typeahead"]};var Lt=function(e,r,i){const{model:t,methods:s}=i,n=s.one.setTag,a=t.one._multiCache||{},o=t.one.lexicon||{};let l=e[r],u=l.machine||l.normal;return void 0!==e[r+1]&&!0===a[u]?function(e,r,i,t,s){let n=r+4>e.length?e.length-r:4,a=e[r].machine||e[r].normal;for(let o=1;o<n;o+=1){let n=e[r+o];if(a+=" "+(n.machine||n.normal),!0===i.hasOwnProperty(a)){let n=i[a];return t(e.slice(r,r+o+1),n,s,!1,"1-multi-lexicon"),!0}}return !1}(e,r,o,n,i):null};const Kt=/^(under|over|mis|re|un|dis|semi|pre|post)-?/,Rt=new Set(["Verb","Infinitive","PastTense","Gerund","PresentTense","Adjective","Participle"]);var Qt=function(e,r,i){const{model:t,methods:s}=i,n=s.one.setTag,a=t.one.lexicon;let o=e[r],l=o.machine||o.normal;if(void 0!==a[l]&&a.hasOwnProperty(l)){return n([o],a[l],i,!1,"1-lexicon"),!0}if(o.alias){let e=o.alias.find((e=>a.hasOwnProperty(e)));if(e){return n([o],a[e],i,"1-lexicon-alias"),!0}}if(!0===Kt.test(l)){let e=l.replace(Kt,"");if(a.hasOwnProperty(e)&&e.length>3&&Rt.has(a[e]))return n([o],a[e],i,"1-lexicon-prefix"),!0}return null};var Ut={lexicon:function(e){const r=e.world;e.docs.forEach((e=>{for(let i=0;i<e.length;i+=1)if(0===e[i].tags.size){let t=null;t=t||Lt(e,i,r),t=t||Qt(e,i,r);}}));}};var Wt=function(e){let r={},i={};return Object.keys(e).forEach((t=>{let s=e[t],n=(t=t.toLowerCase().trim()).split(/ /);n.length>1&&(i[n[0]]=!0),r[t]=r[t]||s;})),delete r[""],delete r.null,delete r[" "],{lex:r,_multi:i}};var Zt={addWords:function(e){const r=this.world(),{methods:i,model:t}=r;if(e)if(Object.keys(e).forEach((r=>{"string"==typeof e[r]&&e[r].startsWith("#")&&(e[r]=e[r].replace(/^#/,""));})),i.two.expandLexicon){let{lex:s,_multi:n}=i.two.expandLexicon(e,r);Object.assign(t.one.lexicon,s),Object.assign(t.one._multiCache,n);}else if(i.one.expandLexicon){let{lex:s,_multi:n}=i.one.expandLexicon(e,r);Object.assign(t.one.lexicon,s),Object.assign(t.one._multiCache,n);}else Object.assign(t.one.lexicon,e);}};var Yt={model:{one:{lexicon:{},_multiCache:{}}},methods:{one:{expandLexicon:Wt}},compute:Ut,lib:Zt,hooks:["lexicon"]},Xt={one:{contractions:[{word:"@",out:["at"]},{word:"alot",out:["a","lot"]},{word:"brb",out:["be","right","back"]},{word:"cannot",out:["can","not"]},{word:"cant",out:["can","not"]},{word:"dont",out:["do","not"]},{word:"dun",out:["do","not"]},{word:"wont",out:["will","not"]},{word:"can't",out:["can","not"]},{word:"shan't",out:["should","not"]},{word:"won't",out:["will","not"]},{word:"that's",out:["that","is"]},{word:"dunno",out:["do","not","know"]},{word:"gonna",out:["going","to"]},{word:"gotta",out:["have","got","to"]},{word:"gtg",out:["got","to","go"]},{word:"im",out:["i","am"]},{word:"imma",out:["I","will"]},{word:"imo",out:["in","my","opinion"]},{word:"irl",out:["in","real","life"]},{word:"ive",out:["i","have"]},{word:"rn",out:["right","now"]},{word:"tbh",out:["to","be","honest"]},{word:"wanna",out:["want","to"]},{word:"howd",out:["how","did"]},{word:"whatd",out:["what","did"]},{word:"whend",out:["when","did"]},{word:"whered",out:["where","did"]},{word:"'tis",out:["it","is"]},{word:"'twas",out:["it","was"]},{word:"twas",out:["it","was"]},{word:"y'know",out:["you","know"]},{word:"ne'er",out:["never"]},{word:"o'er ",out:["over"]},{after:"ll",out:["will"]},{after:"ve",out:["have"]},{after:"re",out:["are"]},{after:"m",out:["am"]},{before:"c",out:["ce"]},{before:"m",out:["me"]},{before:"n",out:["ne"]},{before:"qu",out:["que"]},{before:"s",out:["se"]},{before:"t",out:["tu"]}]}};var $t=function(e,r,i){let[t,s]=r;i&&0!==i.length&&((i=i.map((e=>(e.implicit=e.text,e.machine=e.text,e.pre="",e.post="",e.text="",e.normal="",e))))[0]&&(i[0].pre=e[t][s].pre,i[i.length-1].post=e[t][s].post,i[0].text=e[t][s].text,i[0].normal=e[t][s].normal),e[t].splice(s,1,...i));};const _t=/'/,es=new Set(["what","how","when","where","why"]),rs=new Set(["be","go","start","think","need"]),is=new Set(["been","gone"]);var ts=function(e,r){let i=e[r].normal.split(_t)[0];if(es.has(i))return [i,"did"];if(e[r+1]){if(is.has(e[r+1].normal))return [i,"had"];if(rs.has(e[r+1].normal))return [i,"would"]}return null};const ss=/'/;var ns=function(e,r){let i=e[r].normal.split(ss)[0];if(((e,r)=>e.slice(r+1,r+3).some((e=>e.tags.has("PastTense"))))(e,r))return [i,"has"];if("let"===i)return [i,"us"];if("there"===i){let t=e[r+1];if(t&&t.tags.has("Plural"))return [i,"are"]}return [i,"is"]};var as=function(e,r){if("ain't"===e[r].normal||"aint"===e[r].normal)return null;return [e[r].normal.replace(/n't/,""),"not"]};const os=/'/;var ls=(e,r)=>["je",e[r].normal.split(os)[1]],us=(e,r)=>{let i=e[r].normal.split(os)[1];return i&&i.endsWith("e")?["la",i]:["le",i]},cs=(e,r)=>{let i=e[r].normal.split(os)[1];return i&&i.endsWith("e")?["du",i]:i&&i.endsWith("s")?["des",i]:["de",i]};const ds=/^([0-9.]{1,3}[a-z]{0,2}) ?[-–—] ?([0-9]{1,3}[a-z]{0,2})$/i,ps=/^([0-9]{1,2}(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9]{1,2}(:[0-9][0-9])?(am|pm)?)$/i;var hs=function(e,r){let i=e[r];if(!0===i.tags.has("PhoneNumber"))return null;let t=i.text.match(ds);return null!==t?[t[1],"to",t[2]]:(t=i.text.match(ps),null!==t?[t[1],"to",t[4]]:null)};const ms=new Set(["here","there","she","it","he","that","here","there","your","who","what","where","why","when","how","let","else","name"]),fs=new Set(["really","very","barely","also","not","just","more","only","often","quite","so","too","well"]);var gs=(e,r)=>{let i=e[r];let[t]=i.normal.split(/'s/);if(ms.has(t))return !0;let s=e[r+1];return !(!s||!fs.has(s.normal))};const vs=/'/,bs=/^[0-9][^-–—]*[-–—].*?[0-9]/,ys=function(e,r){let i=r.update();i.document=[e],i.compute(["lexicon","preTagger","index"]);},zs={t:(e,r)=>as(e,r),d:(e,r)=>ts(e,r),s:(e,r)=>!0===gs(e,r)?ns(e,r):null},Gs={j:(e,r)=>ls(e,r),l:(e,r)=>us(e,r),d:(e,r)=>cs(e,r)},Ms=function(e,r,i,t){for(let s=0;s<e.length;s+=1){let n=e[s];if(n.word===r.normal)return n.out;if(null!==t&&t===n.after)return [i].concat(n.out);if(null!==i&&i===n.before)return n.out.concat(t)}return null},Bs=function(e,r){return r.fromText(e.join(" ")).docs[0]};var Ns=e=>{let{world:r,document:i}=e;const{model:t,methods:s}=r;let n=t.one.contractions||[];i.forEach(((t,a)=>{for(let o=t.length-1;o>=0;o-=1){let l=null,u=null;!0===vs.test(t[o].normal)&&([l,u]=t[o].normal.split(vs));let c=Ms(n,t[o],l,u);!c&&zs.hasOwnProperty(u)&&(c=zs[u](t,o,r)),!c&&Gs.hasOwnProperty(l)&&(c=Gs[l](t,o)),c?(c=Bs(c,e),$t(i,[a,o],c),ys(i[a],e)):bs.test(t[o].normal)&&(c=hs(t,o),c&&(c=Bs(c,e),$t(i,[a,o],c),s.one.setTag(c,"NumberRange",r),c[2]&&c[2].tags.has("Time")&&s.one.setTag([c[0]],"Time",r),ys(i[a],e)));}}));};var ws={model:Xt,compute:{contractions:Ns},hooks:["contractions"]};v.extend(W),v.extend(Cr),v.extend($e),v.extend(Lr),v.extend(Ni),v.plugin(ws),v.extend(Nt),v.plugin(Ft),v.extend(Ot),v.extend(Jt),v.extend(Yt);let As={"!":"¡","?":"¿Ɂ",'"':'“”"❝❞',"'":"‘‛❛❜’","-":"—–",a:"ªÁÃÄÅáãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",b:"ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",c:"¢©ĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",d:"ÐĎďĐđƉƊȡƋƌ",e:"ĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ",f:"ƑƒϜϝӺӻҒғſ",g:"ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",h:"ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",I:"Í",i:"íĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",j:"ĴĵǰȷɈɉϳЈј",k:"ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",l:"ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",m:"ΜϺϻМмӍӎ",n:"ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",o:"ÓÕÖØðóõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",p:"ƤΡρϷϸϼРрҎҏÞ",q:"Ɋɋ",r:"ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",s:"ŚśŜŝŞşŠšƧƨȘșȿЅѕ",t:"ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",u:"µÚúŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",v:"νѴѵѶѷ",w:"ŴŵƜωώϖϢϣШЩшщѡѿ",x:"×ΧχϗϰХхҲҳӼӽӾӿ",y:"ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",z:"ŹźŻżŽžƵƶȤȥɀΖ"},Es={};Object.keys(As).forEach((function(e){As[e].split("").forEach((function(r){Es[r]=e;}));}));var Ps=Es,xs=[{word:"n'y",out:["ne","a"]},{word:"aux",out:["à","les"]},{word:"au",out:["à","le"]},{before:"m",out:["me"]},{before:"s",out:["se"]},{before:"t",out:["tu"]},{before:"n",out:["ne"]}],Cs={mutate:e=>{e.model.one.unicode=Ps,e.model.one.contractions=xs;}};const Os=/^.([0-9]+)/;var js=function(e,r,i){if(r.exceptions.hasOwnProperty(e))return i&&console.log("exception, ",e,r.exceptions[e]),function(e,r){let i=r.exceptions[e],t=i.match(Os);if(null===t)return r.exceptions[e];let s=Number(t[1])||0;return e.substr(0,s)+i.replace(Os,"")}(e,r);let t=r.rules;r.reversed&&(t=r.rev),t=function(e,r={}){let i=r[e[e.length-1]]||[];return r[""]&&(i=i.concat(r[""])),i}(e,t);for(let r=0;r<t.length;r+=1){let s=t[r][0];if(e.endsWith(s)){i&&console.log("rule, ",t[r]);let n=new RegExp(s+"$");return e.replace(n,t[r][1])}}return i&&console.log(" x - "+e),e};const ks=function(e){let r={};return e.forEach((e=>{let i=e[0]||"",t=i[i.length-1]||"";r[t]=r[t]||[],r[t].push(e);})),r},Hs=/^([0-9]+)/,Fs=function(e){const r=/\|/;return e.split(/,/).map((e=>{let i=e.split(r);return function(e="",r=""){let i=(r=String(r)).match(Hs);if(null===i)return [e,r];let t=Number(i[1])||0,s=e.substring(0,t);return [e,s+r.replace(Hs,"")]}(i[0],i[1])}))};var Ds=function(e={}){return (e=Object.assign({},e)).rules=Fs(e.rules),e.rules=ks(e.rules),e.rev&&(e.rev=Fs(e.rev),e.rev=ks(e.rev)),e.exceptions=Fs(e.exceptions),e.exceptions=e.exceptions.reduce(((e,r)=>(e[r[0]]=r[1],e)),{}),e},Ts={noun:{female:{rules:"bbé|2esse,é|1e,fghan|5e,stillan|7e,opain|2ine,urtisan|7e,émon|4e,itan|4e,mportun|7e,usulman|7e,ersan|5e,exan|4e,in|2e,n|1ne,culteur|4rice,ssadeur|4rice,faiteur|4rice,ituteur|4rice,ocuteur|4rice,ajeur|5e,oir|3e,peaker|6ine,diteur|3rice,niteur|3rice,érieur|6e,cteur|2rice,ateur|2rice,er|ère,eur|2se,ndalou|6se,hou|3te,eau|1lle,u|1e,ll girl|2-girl,areil|5le,el|2le,l|1e,ane|2ard,ègre|égresse,oète|1étesse,e|1sse,hat|3te,et|2te,t|1e,and-duc|3e-duchesse,rec|3que,urc|2que,oup|2ve,ex shop|2-shop,f|ve,i|1e,d|1e",exceptions:"beau-frère|2lle-soeur,heur|demi-heure,duc|3hesse,fou|2lle,meilleur|8e,mineur|6e,pécheur|5resse,sot|3te,copain|3ine,grand-duc|5e-duchesse",rev:"bbesse|2é,dalouse|5,hamelle|4au,houte|3,ivile|4,émone|4,olle|1u,recque|3,portune|6,ouve|2p,oire|3,ouvelle|4au,égresse|ègre,oétesse|1ète,incesse|4,êtresse|4,heresse|2ur,idelle|3au,akerine|4,issesse|4,igresse|4,urque|2c,omtesse|4,ole|2,celle|2au,ule|2,relle|2au,tte|1,eure|3,ane|2,ve|f,ie|1,ue|1,ale|2,lle|1,de|1,ine|2,rice|eur,ère|er,nne|1,te|1,ée|1,euse|2r,ll-girl|2 girl,anard|2e,ex-shop|2 shop"},plural:{rules:"normal|5ux,mercial|6ux,incipal|6ux,ival|3ux,éral|3ux,ental|4ux,nal|2ux,l|1s,u-frère|1x-frères,e|1s,hou|3x,eau|3x,u|1s,and-duc|3s-ducs,c|1s,p|1s,f|1s,i|1s,d|1s,t|1s,é|1s,n|1s,r|1s",exceptions:"aide-soignant|4s-soignants,beau-frère|4x-frères",rev:"houx|3,eaux|3,aux|1l,ds-ducs|1-duc,s|"},femalePlural:{rules:"bbé|2esses,é|1es,fghan|5es,stillan|7es,opain|2ines,urtisan|7es,émon|4es,itan|4es,mportun|7es,usulman|7es,ersan|5es,exan|4es,in|2es,n|1nes,culteur|4rices,ssadeur|4rices,faiteur|4rices,quêteur|4rices,ituteur|4rices,ocuteur|4rices,ajeur|5es,oir|3es,peaker|6ines,diteur|3rices,niteur|3rices,érieur|6es,cteur|2rices,ateur|2rices,er|ères,eur|2ses,ndalou|6ses,hou|3tes,eau|1lles,u|1es,ll girl|2-girls,areil|5les,el|2les,l|1es,ane|2ards,ègre|égresses,oète|1étesses,e|1sses,hat|3tes,et|2tes,t|1es,and-duc|3es-duchesses,rec|3ques,urc|2ques,oup|2ves,ex shop|2-shops,f|ves,i|1es,d|1es",exceptions:"aide-soignant|4s-soignantes,beau-frère|2lles-soeurs,heur|demi-heures,duc|3hesses,fou|2lles,meilleur|8es,mineur|6es,pécheur|5resses,sot|3tes,copain|3ines,grand-duc|5es-duchesses,nègre|1égresses,tigre|5sses",rev:"bbesses|2é,alouses|4,l-girls|1 girl,anards|2e,amelles|3au,houtes|3,iviles|4,émones|4,olles|1u,recques|3,ortunes|5,ouves|2p,oires|3,uvelles|3au,étesses|ète,ncesses|3,tresses|3,eresses|1ur,idelles|3au,x-shops|1 shop,kerines|3,ssesses|3,urques|2c,mtesses|3,oles|2,celles|2au,ules|2,relles|2au,ttes|1,eures|3,anes|2,ves|f,ies|1,ues|1,ales|2,lles|1,des|1,ines|2,rices|eur,ères|er,nnes|1,tes|1,ées|1,euses|2r"}},adjective:{female:{rules:"ndalou|6se,eau|1lle,igu|3ë,u|1e,ouffeur|6se,routeur|6se,harmeur|6se,hanteur|5resse,lâneur|5se,uisseur|6se,ureteur|6se,utur|4e,agyar|5e,ajeur|5e,artyr|5e,eilleur|7e,ineur|5e,bscur|5e,ointeur|6se,orteur|5se,écheur|4resse,êveur|4se,rompeur|6se,engeur|4resse,reur|3se,tteur|4se,pur|3e,ûr|2e,ceur|3se,ueur|3se,deur|3se,ir|2e,cheur|4se,geur|3se,érieur|6e,leur|3se,teur|1rice,er|ère,ouffon|6ne,énin|3gne,aysan|5ne,olisson|7ne,saxon|5ne,ron|3ne,ignon|5ne,illon|5ne,chon|4ne,ton|3ne,en|2ne,n|1e,oulot|5te,ésuet|3ète,âlot|4te,eplet|3ète,ieillot|7te,complet|5ète,quiet|3ète,cret|2ète,et|2te,t|1e,ref|1ève,f|ve,êta|3sse,oi|2te,avori|5te,i|1e,û|ue,entil|5le,eil|3le,el|2le,l|1e,rec|3que,ublic|4que,urc|2que,anc|3he,nouï|4e,igolo|5te,aître|5sse,long|4ue,d|1e,é|1e",exceptions:"bon|3ne,con|3ne,dur|3e,fou|2lle,malin|4gne,menteur|6se,sec|1èche,sot|3te,sur|3e,tout-puissant|4e-puissante,beau|2lle,coi|3te,dû|1ue",rev:"dalouse|5,rève|1ef,êtasse|3,avorite|5,olle|1u,recque|3,ucelle|3au,igolote|5,èche|ec,angelle|4au,anche|3,igne|1n,îtresse|4,longue|4,que|c,eresse|1ur,ète|et,tte|1,trice|1eur,euse|2r,ère|er,lle|1,nne|1,ve|f,e|,iguë|3"},plural:{rules:"ancal|5s,orfal|5s,naval|5s,ol|2s,ul|2s,il|2s,el|2s,al|1ux,êta|3s,û|us,nouï|4s,igolo|5s,aître|5s,long|4s,eau|3x,u|1s,c|1s,d|1s,i|1s,f|1s,r|1s,n|1s,t|1s,é|1s",exceptions:"fatal|5s,natal|5s,dû|1us",rev:"eaux|3,aux|1l,s|"},femalePlural:{rules:"ndalou|6ses,eau|1lles,igu|3ës,u|1es,ouffeur|6ses,routeur|6ses,harmeur|6ses,hanteur|5resses,lâneur|5ses,uisseur|6ses,ureteur|6ses,utur|4es,agyar|5es,ajeur|5es,artyr|5es,eilleur|7es,ineur|5es,bscur|5es,ointeur|6ses,orteur|5ses,écheur|4resses,êveur|4ses,rompeur|6ses,engeur|4resses,reur|3ses,tteur|4ses,pur|3es,ûr|2es,ceur|3ses,ueur|3ses,deur|3ses,ir|2es,cheur|4ses,geur|3ses,érieur|6es,leur|3ses,teur|1rices,er|ères,ouffon|6nes,énin|3gnes,aysan|5nes,olisson|7nes,saxon|5nes,ron|3nes,ignon|5nes,illon|5nes,chon|4nes,ton|3nes,en|2nes,n|1es,oulot|5tes,ésuet|3ètes,âlot|4tes,eplet|3ètes,ieillot|7tes,complet|5ètes,quiet|3ètes,cret|2ètes,et|2tes,t|1es,ref|1èves,f|ves,êta|3sses,oi|2tes,avori|5tes,i|1es,û|ues,entil|5les,eil|3les,el|2les,l|1es,rec|3ques,ublic|4ques,urc|2ques,anc|3hes,nouï|4es,igolo|5tes,aître|5sses,long|4ues,d|1es,é|1es",exceptions:"bon|3nes,con|3nes,dur|3es,fou|2lles,malin|4gnes,menteur|6ses,sec|1èches,sot|3tes,sur|3es,tout-puissant|4es-puissantes,beau|2lles,coi|3tes,dû|1ues",rev:"alouses|4,rèves|1ef,êtasses|3,vorites|4,olles|1u,recques|3,ucelles|3au,golotes|4,èches|ec,ngelles|3au,anches|3,ignes|1n,tresses|3,longues|4,ques|c,eresses|1ur,iguës|3,ètes|et,ttes|1,trices|1eur,euses|2r,ères|er,lles|1,nnes|1,ves|f,es|"}},futureTense:{je:{rules:"cheter|2èterai,eser|èserai,evrer|èvrerai,ppuyer|3ierai,eborder|éborderai,echirer|échirerai,emarrer|émarrerai,ueillir|5erai,uérir|1errai,ssener|2ènerai,ujettir|1,elleter|5terai,rturber|1,epartir|épartirai,ieillir|2,oleter|4terai,filtrer|1,illeter|,acturer|2,ureter|2èterai,aleter|2èterai,arteler|3èlerai,odeler|2èlerai,precier|2écierai,ssieger|3égerai,reer|1éerai,rreter|2êterai,eplacer|éplacerai,eresser|éresserai,referer|1éférerai,ucceder|3éderai,eunir|éunirai,eussir|éussirai,cquerir|5rai,uïr|irai,ecer|ècerai,mouvoir|4rai,avoir|1urai,nturer|1,mener|1ènerai,envoyer|3errai,vouloir|3drai,iliser|,iliter|,choir|2errai,faillir|2udrai,erer|érerai,valoir|2udrai,evoir|2rai,ever|èverai,ourir|3rai,eler|2lerai,iller|,enir|iendrai,oyer|1ierai,r|1ai,ariâtre|5trai,araitre|3îtrai,epondre|épondrai,faire|1erai,re|1ai",exceptions:"geler|1èlerai,aller|irai,jeter|3terai,montrer|4erai,declencher|1éclencherai,elancer|élancerai,pouvoir|3rrai,voir|1errai,être|serai,peler|1èlerai,revoir|3errai,familiariser|3,ecouter|écouterai,eclaircir|éclaircirai,etablir|établirai,reflechir|1éfléchirai,ecrire|écrirai,ouir|2ïrai,eteindre|éteindrai,deborder|1éborderai,dechirer|1échirerai,demarrer|1émarrerai,circonvenir|7iendrai,convenir|4iendrai,quérir|2errai,venir|1iendrai,frire|4ai,boire|4ai,dire|3ai,lire|3ai,luire|4ai,rire|3ai,uire|3ai,atteler|5lerai,babiller|3,bateler|5lerai,devenir|3iendrai,disconvenir|7iendrai,parvenir|4iendrai,pelleter|6terai,renouveler|8lerai,repartir|1épartirai,retenir|3iendrai,revenir|3iendrai,veiller|2,voleter|5terai,faciliter|3,ficeler|5lerai,habiliter|3,harceler|6lerai,interdire|8ai,intervenir|6iendrai,maintenir|5iendrai,nuire|4ai,niveler|5lerai,obtenir|3iendrai,appeler|5lerai,deplacer|1éplacerai,interesser|3éresserai,preferer|2éférerai,rappeler|6lerai,succeder|4éderai,reussir|1éussirai,acquerir|6rai,cuire|4ai,tenir|1iendrai,repondre|1épondrai,ouïr|1irai",rev:"èserai|eser,èvrerai|evrer,puierai|2yer,illerai|3ir,iâttrai|3re,oncirai|5e,audirai|5e,roirai|4e,everrai|2oir,truirai|5e,écierai|ecier,iégerai|1eger,réerai|1eer,rêterai|1eter,éunirai|eunir,uïrai|1ir,raîtrai|2itre,ourirai|5e,ècerai|ecer,nverrai|2oyer,aurai|1voir,clorai|4e,firai|3e,aincrai|5e,ferai|1aire,voudrai|3loir,cherrai|2oir,faudrai|2illir,èterai|eter,érerai|erer,vaudrai|2loir,airai|3e,ivrai|3e,èverai|ever,ènerai|ener,duirai|4e,crirai|4e,omprai|4e,èlerai|eler,clurai|4e,ourrai|3ir,vrai|1oir,oierai|1yer,trai|2e,drai|2e,rai|1,ssu|3jettir,eu|2illeter,u|1iller,sc|2iller,rac|3turer,er|2turber,t|1iliser,ie|2illir,xf|2iltrer,am|2iliariser,oss|3iliser,asp|3iller,n|1turer,a|1iller"},tu:{rules:"cheter|2èteras,eser|èseras,evrer|èvreras,ppuyer|3ieras,eborder|éborderas,echirer|échireras,emarrer|émarreras,ueillir|5eras,uérir|1erras,ssener|2èneras,elleter|5teras,epartir|épartiras,oleter|4teras,ureter|2èteras,aleter|2èteras,arteler|3èleras,odeler|2èleras,precier|2écieras,ssieger|3égeras,reer|1éeras,rreter|2êteras,eplacer|éplaceras,eresser|éresseras,referer|1éféreras,ucceder|3éderas,eunir|éuniras,eussir|éussiras,cquerir|5ras,uïr|rras,ecer|èceras,mouvoir|4ras,avoir|1uras,mener|1èneras,envoyer|3erras,vouloir|3dras,choir|2erras,faillir|2udras,erer|éreras,valoir|2udras,evoir|2ras,ever|èveras,ourir|3ras,eler|2leras,enir|iendras,oyer|1ieras,r|1as,ariâtre|5tras,araitre|3îtras,epondre|épondras,faire|1eras,re|1as",exceptions:"geler|1èleras,aller|iras,jeter|3teras,montrer|4eras,declencher|1éclencheras,elancer|élanceras,pouvoir|3rras,voir|1erras,être|seras,assujettir|ttirai,aventurer|rerai,babiller|lerai,peler|1èleras,perturber|rberai,revoir|3erras,utiliser|iserai,vieillir|lirai,exfiltrer|trerai,faciliter|iterai,familiariser|iariserai,feuilleter|letterai,ecouter|écouteras,eclaircir|éclairciras,etablir|établiras,reflechir|1éfléchiras,ecrire|écriras,ouir|2ïras,eteindre|éteindras,deborder|1éborderas,dechirer|1échireras,demarrer|1émarreras,circonvenir|7iendras,convenir|4iendras,quérir|2erras,venir|1iendras,frire|4as,boire|4as,dire|3as,lire|3as,luire|4as,rire|3as,uire|3as,atteler|5leras,bateler|5leras,devenir|3iendras,disconvenir|7iendras,parvenir|4iendras,pelleter|6teras,renouveler|8leras,repartir|1épartiras,retenir|3iendras,revenir|3iendras,voleter|5teras,ficeler|5leras,harceler|6leras,interdire|8as,intervenir|6iendras,maintenir|5iendras,nuire|4as,niveler|5leras,obtenir|3iendras,appeler|5leras,deplacer|1éplaceras,interesser|3éresseras,preferer|2éféreras,rappeler|6leras,succeder|4éderas,reussir|1éussiras,acquerir|6ras,cuire|4as,tenir|1iendras,repondre|1épondras,ouïr|1rras",rev:"èseras|eser,èvreras|evrer,puieras|2yer,illeras|3ir,iâttras|3re,onciras|5e,audiras|5e,roiras|4e,everras|2oir,truiras|5e,écieras|ecier,iégeras|1eger,réeras|1eer,rêteras|1eter,éuniras|eunir,uïras|1ir,raîtras|2itre,ouriras|5e,èceras|ecer,nverras|2oyer,auras|1voir,cloras|4e,firas|3e,aincras|5e,feras|1aire,voudras|3loir,cherras|2oir,faudras|2illir,èteras|eter,éreras|erer,vaudras|2loir,airas|3e,ivras|3e,èveras|ever,èneras|ener,duiras|4e,criras|4e,ompras|4e,èleras|eler,cluras|4e,ourras|3ir,vras|1oir,oieras|1yer,tras|2e,dras|2e,ras|1"},il:{rules:"cheter|2ètera,eser|èsera,evrer|èvrera,ppuyer|3iera,eborder|ébordera,echirer|échirera,emarrer|émarrera,ueillir|5era,uérir|1erra,ssener|2ènera,ujettir|1,elleter|5tera,rturber|1,epartir|épartira,ieillir|2,oleter|4tera,filtrer|1,illeter|,acturer|2,ureter|2ètera,aleter|2ètera,arteler|3èlera,odeler|2èlera,precier|2éciera,ssieger|3égera,reer|1éera,rreter|2êtera,eplacer|éplacera,eresser|éressera,referer|1éférera,ucceder|3édera,eunir|éunira,eussir|éussira,cquerir|5ra,uïr|rra,ecer|ècera,mouvoir|4ra,avoir|1ura,nturer|1,mener|1ènera,envoyer|3erra,vouloir|3dra,iliser|,iliter|,choir|2erra,faillir|2udra,erer|érera,valoir|2udra,evoir|2ra,ever|èvera,ourir|3ra,eler|2lera,iller|,enir|iendra,oyer|1iera,r|1a,ariâtre|5tra,araitre|3îtra,epondre|épondra,faire|1era,re|1a",exceptions:"geler|1èlera,aller|ira,jeter|3tera,montrer|4era,declencher|1éclenchera,elancer|élancera,pouvoir|3rra,voir|1erra,être|sera,peler|1èlera,revoir|3erra,familiariser|3,ecouter|écoutera,eclaircir|éclaircira,etablir|établira,reflechir|1éfléchira,ecrire|écrira,ouir|2ïra,eteindre|éteindra,deborder|1ébordera,dechirer|1échirera,demarrer|1émarrera,quérir|2erra,frire|4a,boire|4a,dire|3a,lire|3a,luire|4a,rire|3a,uire|3a,babiller|3,bailler|2,repartir|1épartira,veiller|2,faciliter|3,habiliter|3,nuire|4a,appeler|5lera,deplacer|1éplacera,interesser|3éressera,rappeler|6lera,cuire|4a,ouïr|1rra",rev:"èsera|eser,èvrera|evrer,ppuiera|3yer,eillera|4ir,riâttra|4re,concira|6e,audira|5e,roira|4e,everra|2oir,struira|6e,terdira|6e,réciera|1ecier,siégera|2eger,réera|1eer,rrêtera|2eter,éférera|eferer,ccédera|2eder,rava|4iller,éunira|eunir,éussira|eussir,cquerra|5ir,uïra|1ir,araîtra|3itre,épondra|epondre,ourira|5e,ècera|ecer,aura|1voir,clora|4e,fira|3e,tellera|3er,fera|1aire,lettera|3er,vellera|3er,enverra|3oyer,voudra|3loir,cellera|3er,vaincra|6e,cherra|2oir,faudra|2illir,ètera|eter,érera|erer,vaudra|2loir,aira|3e,ivra|3e,èvera|ever,ènera|ener,duira|4e,crira|4e,ompra|4e,èlera|eler,clura|4e,tiendra|1enir,ourra|3ir,vra|1oir,viendra|1enir,oiera|1yer,tra|2e,dra|2e,ra|1,ssu|3jettir,eu|2illeter,u|1iller,sc|2iller,rac|3turer,er|2turber,t|1iliser,ie|2illir,xf|2iltrer,am|2iliariser,oss|3iliser,asp|3iller,n|1turer"},nous:{rules:"cheter|2èterons,eser|èserons,evrer|èvrerons,ppuyer|3ierons,eborder|éborderons,echirer|échirerons,emarrer|émarrerons,ueillir|5erons,uérir|1errons,ssener|2ènerons,elleter|5terons,epartir|épartirons,oleter|4terons,ureter|2èterons,aleter|2èterons,arteler|3èlerons,odeler|2èlerons,precier|2écierons,ssieger|3égerons,reer|1éerons,rreter|2êterons,eplacer|éplacerons,eresser|éresserons,referer|1éférerons,ucceder|3éderons,eunir|éunirons,eussir|éussirons,cquerir|5rons,uïr|rrons,ecer|ècerons,mouvoir|4rons,avoir|1urons,mener|1ènerons,envoyer|3errons,vouloir|3drons,choir|2errons,erer|érerons,valoir|2udrons,evoir|2rons,ever|èverons,ourir|3rons,eler|2lerons,enir|iendrons,oyer|1ierons,r|1ons,ariâtre|5trons,araitre|3îtrons,epondre|épondrons,faire|1erons,re|1ons",exceptions:"geler|1èlerons,aller|irons,jeter|3terons,montrer|4erons,declencher|1éclencherons,elancer|élancerons,pouvoir|3rrons,voir|1errons,être|serons,assujettir|ttiras,aventurer|reras,babiller|leras,peler|1èlerons,perturber|rberas,revoir|3errons,utiliser|iseras,vieillir|liras,exfiltrer|treras,faciliter|iteras,familiariser|iariseras,feuilleter|letteras,ecouter|écouterons,eclaircir|éclaircirons,etablir|établirons,reflechir|1éfléchirons,ecrire|écrirons,ouir|2ïrons,eteindre|éteindrons,envoyer|3errons,sevrer|1èvrerons,deborder|1éborderons,dechirer|1échirerons,demarrer|1émarrerons,circonvenir|7iendrons,convenir|4iendrons,cueillir|6erons,quérir|2errons,venir|1iendrons,vouloir|3drons,circoncire|9ons,frire|4ons,boire|4ons,dire|3ons,lire|3ons,luire|4ons,rire|3ons,uire|3ons,atteler|5lerons,bateler|5lerons,devenir|3iendrons,disconvenir|7iendrons,parvenir|4iendrons,pelleter|6terons,renouveler|8lerons,renvoyer|4errons,repartir|1épartirons,retenir|3iendrons,revenir|3iendrons,revouloir|5drons,voleter|5terons,ficeler|5lerons,harceler|6lerons,interdire|8ons,intervenir|6iendrons,maintenir|5iendrons,nuire|4ons,niveler|5lerons,obtenir|3iendrons,apprecier|4écierons,assieger|4égerons,appeler|5lerons,deplacer|1éplacerons,interesser|3éresserons,preferer|2éférerons,rappeler|6lerons,succeder|4éderons,reunir|1éunirons,reussir|1éussirons,acquerir|6rons,cuire|4ons,tenir|1iendrons,paraitre|4îtrons,repondre|1épondrons,sourire|6ons,ouïr|1rrons",rev:"èserons|eser,uierons|1yer,âttrons|2re,udirons|4e,roirons|4e,ruirons|4e,réerons|1eer,êterons|eter,uïrons|1ir,ècerons|ecer,aurons|1voir,clorons|4e,firons|3e,incrons|4e,ferons|1aire,herrons|1oir,èterons|eter,érerons|erer,audrons|1loir,airons|3e,ivrons|3e,èverons|ever,ènerons|ener,duirons|4e,crirons|4e,omprons|4e,èlerons|eler,clurons|4e,ourrons|3ir,vrons|1oir,oierons|1yer,trons|2e,drons|2e,rons|1"},vous:{rules:"cheter|2èterez,eser|èserez,evrer|èvrerez,ppuyer|3ierez,eborder|éborderez,echirer|échirerez,emarrer|émarrerez,ueillir|5erez,uérir|1errez,ssener|2ènerez,ujettir|1,elleter|5terez,rturber|1,epartir|épartirez,ieillir|2,oleter|4terez,filtrer|1,illeter|,acturer|2,ureter|2èterez,aleter|2èterez,arteler|3èlerez,odeler|2èlerez,precier|2écierez,ssieger|3égerez,reer|1éerez,rreter|2êterez,eplacer|éplacerez,eresser|éresserez,referer|1éférerez,ucceder|3éderez,eunir|éunirez,eussir|éussirez,cquerir|5rez,uïr|rrez,ecer|ècerez,mouvoir|4rez,avoir|1urez,nturer|1,mener|1ènerez,envoyer|3errez,vouloir|3drez,iliser|,iliter|,choir|2errez,erer|érerez,valoir|2udrez,evoir|2rez,ever|èverez,ourir|3rez,eler|2lerez,iller|,enir|iendrez,oyer|1ierez,r|1ez,ariâtre|5trez,araitre|3îtrez,epondre|épondrez,faire|1erez,re|2z",exceptions:"geler|1èlerez,aller|irez,jeter|3terez,montrer|4erez,declencher|1éclencherez,elancer|élancerez,pouvoir|3rrez,voir|1errez,être|serez,peler|1èlerez,revoir|3errez,familiariser|3,ecouter|écouterez,eclaircir|éclaircirez,etablir|établirez,reflechir|1éfléchirez,ecrire|écrirez,ouir|2ïrez,eteindre|éteindrez,deborder|1éborderez,dechirer|1échirerez,demarrer|1émarrerez,circonvenir|7iendrez,convenir|4iendrez,quérir|2errez,venir|1iendrez,frire|5z,boire|5z,dire|4z,lire|4z,luire|5z,rire|4z,uire|4z,atteler|5lerez,babiller|3,bateler|5lerez,devenir|3iendrez,disconvenir|7iendrez,parvenir|4iendrez,pelleter|6terez,renouveler|8lerez,repartir|1épartirez,retenir|3iendrez,revenir|3iendrez,veiller|2,voleter|5terez,faciliter|3,ficeler|5lerez,habiliter|3,harceler|6lerez,interdire|9z,intervenir|6iendrez,maintenir|5iendrez,nuire|5z,niveler|5lerez,obtenir|3iendrez,appeler|5lerez,deplacer|1éplacerez,interesser|3éresserez,preferer|2éférerez,rappeler|6lerez,succeder|4éderez,reussir|1éussirez,acquerir|6rez,cuire|5z,tenir|1iendrez,repondre|1épondrez,ouïr|1rrez",rev:"èserez|eser,èvrerez|evrer,puierez|2yer,illerez|3ir,iâttrez|3re,oncirez|6,audirez|6,roirez|5,everrez|2oir,truirez|6,écierez|ecier,iégerez|1eger,réerez|1eer,rêterez|1eter,éunirez|eunir,uïrez|1ir,raîtrez|2itre,ourirez|6,ècerez|ecer,nverrez|2oyer,aurez|1voir,clorez|5,firez|4,aincrez|6,ferez|1aire,voudrez|3loir,cherrez|2oir,èterez|eter,érerez|erer,vaudrez|2loir,airez|4,ivrez|4,èverez|ever,ènerez|ener,duirez|5,crirez|5,omprez|5,èlerez|eler,clurez|5,ourrez|3ir,vrez|1oir,oierez|1yer,trez|3,drez|3,rez|1,ssu|3jettir,eu|2illeter,u|1iller,sc|2iller,rac|3turer,er|2turber,t|1iliser,ie|2illir,xf|2iltrer,am|2iliariser,oss|3iliser,asp|3iller,n|1turer,a|1iller"},ils:{rules:"cheter|2èteront,eser|èseront,evrer|èvreront,ppuyer|3ieront,eborder|éborderont,echirer|échireront,emarrer|émarreront,ueillir|5eront,uérir|1erront,ssener|2èneront,elleter|5teront,epartir|épartiront,oleter|4teront,ureter|2èteront,aleter|2èteront,arteler|3èleront,odeler|2èleront,precier|2écieront,ssieger|3égeront,reer|1éeront,rreter|2êteront,eplacer|éplaceront,eresser|éresseront,referer|1éféreront,ucceder|3éderont,eunir|éuniront,eussir|éussiront,cquerir|5ront,uïr|rront,ecer|èceront,mouvoir|4ront,avoir|1uront,mener|1èneront,envoyer|3erront,vouloir|3dront,choir|2erront,erer|éreront,valoir|2udront,evoir|2ront,ever|èveront,ourir|3ront,eler|2leront,enir|iendront,oyer|1ieront,r|1ont,ariâtre|5tront,araitre|3îtront,epondre|épondront,faire|1eront,re|1ont",exceptions:"geler|1èleront,aller|iront,jeter|3teront,montrer|4eront,declencher|1éclencheront,elancer|élanceront,pouvoir|3rront,voir|1erront,être|seront,assujettir|ttira,aventurer|rera,babiller|lera,peler|1èleront,perturber|rbera,revoir|3erront,utiliser|isera,vieillir|lira,exfiltrer|trera,faciliter|itera,familiariser|iarisera,feuilleter|lettera,ecouter|écouteront,eclaircir|éclairciront,etablir|établiront,reflechir|1éfléchiront,ecrire|écriront,ouir|2ïront,eteindre|éteindront,envoyer|3erront,sevrer|1èvreront,deborder|1éborderont,dechirer|1échireront,demarrer|1émarreront,circonvenir|7iendront,convenir|4iendront,cueillir|6eront,quérir|2erront,venir|1iendront,vouloir|3dront,circoncire|9ont,frire|4ont,boire|4ont,dire|3ont,lire|3ont,luire|4ont,rire|3ont,uire|3ont,atteler|5leront,bateler|5leront,devenir|3iendront,disconvenir|7iendront,parvenir|4iendront,pelleter|6teront,renouveler|8leront,renvoyer|4erront,repartir|1épartiront,retenir|3iendront,revenir|3iendront,revouloir|5dront,voleter|5teront,ficeler|5leront,harceler|6leront,interdire|8ont,intervenir|6iendront,maintenir|5iendront,nuire|4ont,niveler|5leront,obtenir|3iendront,apprecier|4écieront,assieger|4égeront,appeler|5leront,deplacer|1éplaceront,interesser|3éresseront,preferer|2éféreront,rappeler|6leront,succeder|4éderont,reunir|1éuniront,reussir|1éussiront,acquerir|6ront,cuire|4ont,tenir|1iendront,paraitre|4îtront,repondre|1épondront,sourire|6ont,ouïr|1rront",rev:"èseront|eser,uieront|1yer,âttront|2re,udiront|4e,roiront|4e,ruiront|4e,réeront|1eer,êteront|eter,uïront|1ir,èceront|ecer,auront|1voir,cloront|4e,firont|3e,incront|4e,feront|1aire,herront|1oir,èteront|eter,éreront|erer,audront|1loir,airont|3e,ivront|3e,èveront|ever,èneront|ener,duiront|4e,criront|4e,ompront|4e,èleront|eler,cluront|4e,ourront|3ir,vront|1oir,oieront|1yer,tront|2e,dront|2e,ront|1"}},imperfect:{je:{rules:"énir|3ssais,ésir|isais,révoir|4yais,urseoir|3oyais,ssoir|3yais,aïr|2ssais,ourvoir|5yais,sombrir|6ssais,ssoupir|6ssais,ssouvir|6ssais,tendrir|6ssais,epartir|épartissais,etentir|6ssais,ouiller|2,ieillir|2,omir|3ssais,leurir|5ssais,arantir|6ssais,ravir|4ssais,luminer|,nvestir|6ssais,aigrir|5ssais,eurtrir|6ssais,precier|2éciais,ssieger|3égeais,reer|1éais,rreter|2êtais,eplacer|éplaçais,eresser|éressais,referer|1éférais,ucceder|3édais,eunir|éunissais,eussir|éussissais,ubir|3ssais,cquerir|3érais,sortir|4ais,vêtir|3ais,inir|3ssais,utir|3ssais,anchir|5ssais,unir|3ssais,uir|2ssais,erer|érais,partir|4ais,dormir|4ais,rrir|3ssais,vertir|5ssais,nnir|3ssais,servir|4ais,rnir|3ssais,entir|3ais,gir|2ssais,illir|3ais,cir|2ssais,sir|2ssais,dir|2ssais,lir|2ssais,rir|1ais,oir|ais,enir|2ais,ger|2ais,cer|çais,er|ais,ariâtre|5tais,mbatre|4ais,audire|4ssais,épandre|5ais,roire|2yais,outre|3ais,raire|2yais,araitre|4ssais,epondre|épondais,ourire|4ais,rdre|2ais,ondre|3ais,vaincre|4quais,soudre|2lvais,ivre|2ais,crire|3vais,ompre|3ais,clure|3ais,prendre|4ais,ttre|2ais,ître|issais,endre|3ais,indre|1gnais,ire|1sais",exceptions:"asservir|7ssais,fuir|2yais,voir|2yais,être|étais,iendre|2gnais,boire|1uvais,coudre|3sais,moudre|3lais,rire|2ais,assortir|7ssais,revoir|4yais,ecouter|écoutais,eclaircir|éclaircissais,etablir|établissais,reflechir|1éfléchissais,ecrire|écrivais,eteindre|éteignais,avoir|2ais,gésir|1isais,mentir|4ais,pouvoir|4ais,devoir|3ais,pourvoir|6yais,quérir|4ais,savoir|3ais,servir|4ais,valoir|3ais,croître|3issais,maudire|5ssais,paître|2issais,recroître|5issais,renaître|4issais,repaître|4issais,aindre|2gnais,connaître|5issais,croire|3yais,accroître|5issais,foutre|4ais,lire|2sais,naître|2issais,cloître|3issais,braire|3yais,abolir|5ssais,accomplir|8ssais,assouplir|8ssais,assouvir|7ssais,astreindre|6gnais,atteindre|5gnais,desservir|7ais,embellir|7ssais,emplir|5ssais,empreindre|6gnais,peindre|3gnais,plaindre|4gnais,polir|4ssais,pondre|4ais,repartir|1épartissais,repeindre|5gnais,ressentir|7ais,resservir|7ais,restreindre|7gnais,faiblir|6ssais,feindre|3gnais,geindre|3gnais,gravir|5ssais,mollir|5ssais,mordre|4ais,morfondre|7ais,deplacer|1éplaçais,gerer|1érais,interesser|3éressais,remplir|6ssais,reunir|1éunissais,reussir|1éussissais,acquerir|4érais,craindre|4gnais,sentir|4ais,paraitre|5ssais,repondre|1épondais",rev:"évalais|4oir,évoyais|3ir,pentais|4ir,rsoyais|2eoir,ssoyais|3ir,aïssais|2r,iâttais|3re,ncisais|3re,mbatais|4re,egnais|1ndre,pandais|4re,uivais|3re,pissais|2r,erdais|3re,evoyais|3ir,missais|2r,ffrais|3ir,réciais|1ecier,iégeais|1eger,réais|1eer,rrêtais|2eter,éférais|eferer,ccédais|2eder,sférais|2erer,bissais|2r,ouriais|4re,sortais|4ir,cevais|3oir,mouvais|4oir,vêtais|3ir,fisais|2re,inquais|2cre,hissais|2r,vivais|3re,voulais|4oir,disais|2re,uissais|2r,battais|4re,partais|4ir,dormais|4ir,solvais|2udre,crivais|3re,ompais|3re,cluais|3re,aisais|2re,oignais|2ndre,gissais|2r,prenais|4dre,tenais|3ir,ouvrais|4ir,illais|3ir,ourais|3ir,cissais|2r,mettais|4re,sissais|2r,dissais|2r,venais|3ir,uisais|2re,rissais|2r,tissais|2r,endais|3re,nissais|2r,geais|2r,çais|cer,ais|er,errou|5iller,ie|2illir,l|1luminer"},tu:{rules:"énir|3ssais,ésir|isais,révoir|4yais,urseoir|3oyais,ssoir|3yais,aïr|2ssais,ourvoir|5yais,sombrir|6ssais,ssoupir|6ssais,ssouvir|6ssais,tendrir|6ssais,epartir|épartissais,etentir|6ssais,omir|3ssais,leurir|5ssais,arantir|6ssais,ravir|4ssais,nvestir|6ssais,aigrir|5ssais,eurtrir|6ssais,precier|2éciais,ssieger|3égeais,reer|1éais,rreter|2êtais,eplacer|éplaçais,eresser|éressais,referer|1éférais,ucceder|3édais,eunir|éunissais,eussir|éussissais,ubir|3ssais,cquerir|3érais,sortir|4ais,vêtir|3ais,inir|3ssais,utir|3ssais,anchir|5ssais,unir|3ssais,uir|2ssais,erer|érais,partir|4ais,dormir|4ais,rrir|3ssais,vertir|5ssais,nnir|3ssais,servir|4ais,rnir|3ssais,entir|3ais,gir|2ssais,illir|3ais,cir|2ssais,sir|2ssais,dir|2ssais,lir|2ssais,rir|1ais,oir|ais,enir|2ais,ger|2ais,cer|çais,er|ais,ariâtre|5tais,mbatre|4ais,audire|4ssais,épandre|5ais,roire|2yais,outre|3ais,raire|2yais,araitre|4ssais,epondre|épondais,ourire|4ais,rdre|2ais,ondre|3ais,vaincre|4quais,soudre|2lvais,ivre|2ais,crire|3vais,ompre|3ais,clure|3ais,prendre|4ais,ttre|2ais,ître|issais,endre|3ais,indre|1gnais,ire|1sais",exceptions:"asservir|7ssais,fuir|2yais,voir|2yais,être|étais,iendre|2gnais,boire|1uvais,coudre|3sais,moudre|3lais,rire|2ais,assortir|7ssais,revoir|4yais,verrouiller|lais,vieillir|lissais,illuminer|tu,ecouter|écoutais,eclaircir|éclaircissais,etablir|établissais,reflechir|1éfléchissais,ecrire|écrivais,eteindre|éteignais,avoir|2ais,gésir|1isais,mentir|4ais,pouvoir|4ais,devoir|3ais,pourvoir|6yais,quérir|4ais,savoir|3ais,servir|4ais,valoir|3ais,croître|3issais,maudire|5ssais,paître|2issais,recroître|5issais,renaître|4issais,repaître|4issais,aindre|2gnais,connaître|5issais,croire|3yais,accroître|5issais,foutre|4ais,lire|2sais,naître|2issais,cloître|3issais,braire|3yais,abolir|5ssais,accomplir|8ssais,assouplir|8ssais,assouvir|7ssais,astreindre|6gnais,atteindre|5gnais,desservir|7ais,embellir|7ssais,emplir|5ssais,empreindre|6gnais,peindre|3gnais,plaindre|4gnais,polir|4ssais,pondre|4ais,repartir|1épartissais,repeindre|5gnais,ressentir|7ais,resservir|7ais,restreindre|7gnais,faiblir|6ssais,feindre|3gnais,geindre|3gnais,gravir|5ssais,mollir|5ssais,mordre|4ais,morfondre|7ais,deplacer|1éplaçais,gerer|1érais,interesser|3éressais,remplir|6ssais,reunir|1éunissais,reussir|1éussissais,acquerir|4érais,craindre|4gnais,sentir|4ais,paraitre|5ssais,repondre|1épondais",rev:"évalais|4oir,évoyais|3ir,pentais|4ir,rsoyais|2eoir,ssoyais|3ir,aïssais|2r,iâttais|3re,ncisais|3re,mbatais|4re,egnais|1ndre,pandais|4re,uivais|3re,pissais|2r,erdais|3re,evoyais|3ir,missais|2r,ffrais|3ir,réciais|1ecier,iégeais|1eger,réais|1eer,rrêtais|2eter,éférais|eferer,ccédais|2eder,sférais|2erer,bissais|2r,ouriais|4re,sortais|4ir,cevais|3oir,mouvais|4oir,vêtais|3ir,fisais|2re,inquais|2cre,hissais|2r,vivais|3re,voulais|4oir,disais|2re,uissais|2r,battais|4re,partais|4ir,dormais|4ir,solvais|2udre,crivais|3re,ompais|3re,cluais|3re,aisais|2re,oignais|2ndre,gissais|2r,prenais|4dre,tenais|3ir,ouvrais|4ir,illais|3ir,ourais|3ir,cissais|2r,mettais|4re,sissais|2r,dissais|2r,venais|3ir,uisais|2re,rissais|2r,tissais|2r,endais|3re,nissais|2r,geais|2r,çais|cer,ais|er"},il:{rules:"énir|3ssait,ésir|isait,révoir|4yait,urseoir|3oyait,ssoir|3yait,aïr|2ssait,ourvoir|5yait,sombrir|6ssait,ssoupir|6ssait,ssouvir|6ssait,tendrir|6ssait,epartir|épartissait,etentir|6ssait,ouiller|2,ieillir|2,omir|3ssait,leurir|5ssait,arantir|6ssait,ravir|4ssait,nvestir|6ssait,aigrir|5ssait,eurtrir|6ssait,precier|2éciait,ssieger|3égeait,reer|1éait,rreter|2êtait,eplacer|éplaçait,eresser|éressait,referer|1éférait,ucceder|3édait,eunir|éunissait,eussir|éussissait,ubir|3ssait,cquerir|3érait,vêtir|3ait,inir|3ssait,utir|3ssait,anchir|5ssait,unir|3ssait,uir|2ssait,erer|érait,dormir|4ait,rrir|3ssait,nnir|3ssait,servir|4ait,rnir|3ssait,entir|3ait,gir|2ssait,illir|3ait,rtir|3ssait,cir|2ssait,sir|2ssait,dir|2ssait,lir|2ssait,rir|1ait,oir|ait,enir|2ait,ger|2ait,cer|çait,er|ait,ariâtre|5tait,mbatre|4ait,audire|4ssait,épandre|5ait,roire|2yait,outre|3ait,raire|2yait,araitre|4ssait,epondre|épondait,ourire|4ait,rdre|2ait,ondre|3ait,vaincre|4quait,soudre|2lvait,ivre|2ait,crire|3vait,ompre|3ait,clure|3ait,prendre|4ait,ttre|2ait,ître|issait,endre|3ait,indre|1gnait,ire|1sait",exceptions:"asservir|7ssait,partir|4ait,ressortir|7ait,sortir|4ait,fuir|2yait,voir|2yait,être|était,iendre|2gnait,boire|1uvait,coudre|3sait,moudre|3lait,rire|2ait,revoir|4yait,illuminer|luminais,illusionner|lusionnais,illustrer|lustrais,ecouter|écoutait,eclaircir|éclaircissait,etablir|établissait,reflechir|1éfléchissait,ecrire|écrivait,eteindre|éteignait,avoir|2ait,gésir|1isait,mentir|4ait,pouvoir|4ait,devoir|3ait,pourvoir|6yait,quérir|4ait,savoir|3ait,servir|4ait,valoir|3ait,croître|3issait,maudire|5ssait,paître|2issait,recroître|5issait,renaître|4issait,repaître|4issait,aindre|2gnait,connaître|5issait,croire|3yait,accroître|5issait,foutre|4ait,lire|2sait,naître|2issait,cloître|3issait,braire|3yait,abolir|5ssait,accomplir|8ssait,assouplir|8ssait,assouvir|7ssait,astreindre|6gnait,atteindre|5gnait,desservir|7ait,embellir|7ssait,emplir|5ssait,empreindre|6gnait,peindre|3gnait,plaindre|4gnait,polir|4ssait,pondre|4ait,repartir|1épartissait,repeindre|5gnait,ressentir|7ait,resservir|7ait,restreindre|7gnait,faiblir|6ssait,feindre|3gnait,geindre|3gnait,gravir|5ssait,mollir|5ssait,mordre|4ait,morfondre|7ait,deplacer|1éplaçait,gerer|1érait,interesser|3éressait,remplir|6ssait,reunir|1éunissait,reussir|1éussissait,acquerir|4érait,craindre|4gnait,sentir|4ait,paraitre|5ssait,repondre|1épondait",rev:"artait|3ir,évalait|4oir,évoyait|3ir,pentait|4ir,rsoyait|2eoir,ssoyait|3ir,aïssait|2r,iâttait|3re,ncisait|3re,mbatait|4re,egnait|1ndre,pandait|4re,uivait|3re,pissait|2r,erdait|3re,evoyait|3ir,missait|2r,ffrait|3ir,réciait|1ecier,iégeait|1eger,réait|1eer,rrêtait|2eter,éférait|eferer,ccédait|2eder,sférait|2erer,bissait|2r,ouriait|4re,sortait|4ir,cevait|3oir,mouvait|4oir,vêtait|3ir,fisait|2re,inquait|2cre,hissait|2r,vivait|3re,voulait|4oir,disait|2re,uissait|2r,battait|4re,dormait|4ir,solvait|2udre,crivait|3re,ompait|3re,cluait|3re,aisait|2re,oignait|2ndre,gissait|2r,prenait|4dre,tenait|3ir,ouvrait|4ir,illait|3ir,ourait|3ir,cissait|2r,mettait|4re,sissait|2r,dissait|2r,venait|3ir,uisait|2re,rissait|2r,endait|3re,tissait|2r,nissait|2r,geait|2r,çait|cer,ait|er,errou|5iller,ie|2illir"},nous:{rules:"énir|3ssions,ésir|isions,révoir|4yions,urseoir|3oyions,ssoir|3yions,aïr|2ssions,ourvoir|5yions,sombrir|6ssions,ssoupir|6ssions,ssouvir|6ssions,tendrir|6ssions,epartir|épartissions,etentir|6ssions,omir|3ssions,leurir|5ssions,arantir|6ssions,ravir|4ssions,luminer|,nvestir|6ssions,aigrir|5ssions,eurtrir|6ssions,precier|2éciions,ssieger|3égions,reer|1éions,rreter|2êtions,eplacer|éplacions,eresser|éressions,referer|1éférions,ucceder|3édions,eunir|éunissions,eussir|éussissions,ubir|3ssions,cquerir|3érions,sortir|5ons,vêtir|4ons,inir|3ssions,utir|3ssions,anchir|5ssions,unir|3ssions,uir|2ssions,erer|érions,partir|5ons,dormir|5ons,rrir|3ssions,vertir|5ssions,nnir|3ssions,servir|5ons,rnir|3ssions,entir|4ons,gir|2ssions,illir|4ons,cir|2ssions,sir|2ssions,dir|2ssions,lir|2ssions,rir|2ons,oir|ions,enir|3ons,er|ions,ariâtre|5tions,mbatre|4ions,audire|4ssions,épandre|5ions,roire|2yions,outre|3ions,raire|2yions,araitre|4ssions,epondre|épondions,ourire|4ions,rdre|2ions,ondre|3ions,vaincre|4quions,soudre|2lvions,ivre|2ions,crire|3vions,ompre|3ions,clure|3ions,prendre|4ions,ttre|2ions,ître|issions,endre|3ions,indre|1gnions,ire|1sions",exceptions:"asservir|7ssions,fuir|2yions,voir|2yions,être|étions,iendre|2gnions,boire|1uvions,coudre|3sions,moudre|3lions,rire|2ions,assortir|7ssions,revoir|4yions,verrouiller|lais,vieillir|lissais,ecouter|écoutions,eclaircir|éclaircissions,etablir|établissions,reflechir|1éfléchissions,ecrire|écrivions,eteindre|éteignions,choisir|6ssions,avoir|2ions,bénir|4ssions,gésir|1isions,mentir|5ons,mouvoir|4ions,pouvoir|4ions,prévaloir|6ions,prévoir|5yions,repentir|7ons,ressortir|8ons,sortir|5ons,surseoir|4oyions,assoir|4yions,devoir|3ions,endormir|7ons,dormir|5ons,promouvoir|7ions,pourvoir|6yions,quérir|5ons,savoir|3ions,servir|5ons,valoir|3ions,finir|4ssions,croître|3issions,maudire|5ssions,oindre|2gnions,paître|2issions,recroître|5issions,renaître|4issions,repaître|4issions,aindre|2gnions,battre|4ions,répandre|6ions,connaître|5issions,crire|3vions,croire|3yions,accroître|5issions,foutre|4ions,lire|2sions,mettre|4ions,naître|2issions,joindre|3gnions,cloître|3issions,braire|3yions,vaincre|4quions,abolir|5ssions,aboutir|6ssions,abrutir|6ssions,accomplir|8ssions,approfondir|10ssions,arrondir|7ssions,assagir|6ssions,assainir|7ssions,assombrir|8ssions,assoupir|7ssions,assouplir|8ssions,assouvir|7ssions,astreindre|6gnions,atteindre|5gnions,attendrir|8ssions,atterrir|7ssions,avertir|6ssions,bannir|5ssions,barrir|5ssions,blanchir|7ssions,dessaisir|8ssions,desservir|8ons,disjoindre|6gnions,divertir|7ssions,durcir|5ssions,embellir|7ssions,emplir|5ssions,empreindre|6gnions,omettre|5ions,ourdir|5ssions,peindre|3gnions,permettre|7ions,plaindre|4gnions,polir|4ssions,pondre|4ions,rendormir|8ons,repartir|1épartissions,repeindre|5gnions,resplendir|9ssions,ressaisir|8ssions,ressentir|8ons,resservir|8ons,restreindre|7gnions,retentir|7ssions,retranscrire|10vions,retransmettre|11ions,rougir|5ssions,vagir|4ssions,verdir|5ssions,vernir|5ssions,vomir|4ssions,faiblir|6ssions,farcir|5ssions,feindre|3gnions,fleurir|6ssions,fournir|6ssions,franchir|7ssions,garantir|7ssions,garnir|5ssions,geindre|3gnions,grandir|6ssions,gravir|5ssions,grossir|6ssions,hennir|5ssions,honnir|5ssions,inscrire|6vions,interagir|8ssions,intervertir|10ssions,investir|7ssions,jaunir|5ssions,jouir|4ssions,languir|6ssions,maigrir|6ssions,meurtrir|7ssions,mincir|5ssions,moisir|5ssions,mollir|5ssions,mordre|4ions,morfondre|7ions,munir|4ssions,noircir|6ssions,nourrir|6ssions,obscurcir|8ssions,deplacer|1éplacions,gerer|1érions,interesser|3éressions,preferer|2éférions,succeder|4édions,transferer|6érions,rebondir|7ssions,remplir|6ssions,reunir|1éunissions,reussir|1éussissions,saisir|5ssions,subir|4ssions,acquerir|4érions,craindre|4gnions,sentir|5ons,convaincre|7quions,paraitre|5ssions,rabattre|6ions,rejoindre|5gnions,remettre|6ions,repondre|1épondions",rev:"ïssions|1r,âttions|2re,cisions|2re,bations|3re,egnions|1ndre,uivions|3re,erdions|3re,ffrions|4r,éciions|ecier,iégions|1eger,réions|1eer,rêtions|1eter,uriions|3re,artions|4r,cevions|3oir,oulions|3oir,vêtions|4r,fisions|2re,vivions|3re,disions|2re,olvions|1udre,ompions|3re,uvrions|4r,cluions|3re,aisions|2re,renions|3dre,tenions|4r,illions|4r,ourions|4r,venions|4r,uisions|2re,endions|3re,ions|er,l|1luminer"},vous:{rules:"énir|3ssiez,ésir|isiez,révoir|4yiez,urseoir|3oyiez,ssoir|3yiez,aïr|2ssiez,ourvoir|5yiez,sombrir|6ssiez,ssoupir|6ssiez,ssouvir|6ssiez,tendrir|6ssiez,epartir|épartissiez,etentir|6ssiez,ouiller|2,ieillir|2,omir|3ssiez,leurir|5ssiez,arantir|6ssiez,ravir|4ssiez,nvestir|6ssiez,aigrir|5ssiez,eurtrir|6ssiez,precier|2éciiez,ssieger|3égiez,reer|1éiez,rreter|2êtiez,eplacer|éplaciez,eresser|éressiez,referer|1éfériez,ucceder|3édiez,eunir|éunissiez,eussir|éussissiez,ubir|3ssiez,cquerir|3ériez,sortir|5ez,vêtir|4ez,inir|3ssiez,utir|3ssiez,anchir|5ssiez,unir|3ssiez,uir|2ssiez,erer|ériez,partir|5ez,dormir|5ez,rrir|3ssiez,vertir|5ssiez,nnir|3ssiez,servir|5ez,rnir|3ssiez,entir|4ez,gir|2ssiez,illir|4ez,cir|2ssiez,sir|2ssiez,dir|2ssiez,lir|2ssiez,rir|2ez,oir|iez,enir|3ez,er|iez,ariâtre|5tiez,mbatre|4iez,audire|4ssiez,épandre|5iez,roire|2yiez,outre|3iez,raire|2yiez,araitre|4ssiez,epondre|épondiez,ourire|4iez,rdre|2iez,ondre|3iez,vaincre|4quiez,soudre|2lviez,ivre|2iez,crire|3viez,ompre|3iez,clure|3iez,prendre|4iez,ttre|2iez,ître|issiez,endre|3iez,indre|1gniez,ire|1siez",exceptions:"asservir|7ssiez,fuir|2yiez,voir|2yiez,être|étiez,iendre|2gniez,boire|1uviez,coudre|3siez,moudre|3liez,rire|2iez,assortir|7ssiez,revoir|4yiez,illuminer|nous,ecouter|écoutiez,eclaircir|éclaircissiez,etablir|établissiez,reflechir|1éfléchissiez,ecrire|écriviez,eteindre|éteigniez,avoir|2iez,gésir|1isiez,mentir|5ez,pouvoir|4iez,devoir|3iez,pourvoir|6yiez,quérir|5ez,savoir|3iez,servir|5ez,valoir|3iez,croître|3issiez,maudire|5ssiez,paître|2issiez,recroître|5issiez,renaître|4issiez,repaître|4issiez,aindre|2gniez,connaître|5issiez,croire|3yiez,accroître|5issiez,foutre|4iez,lire|2siez,naître|2issiez,cloître|3issiez,braire|3yiez,abolir|5ssiez,accomplir|8ssiez,assouplir|8ssiez,assouvir|7ssiez,astreindre|6gniez,atteindre|5gniez,desservir|8ez,embellir|7ssiez,emplir|5ssiez,empreindre|6gniez,peindre|3gniez,plaindre|4gniez,polir|4ssiez,pondre|4iez,repartir|1épartissiez,repeindre|5gniez,ressentir|8ez,resservir|8ez,restreindre|7gniez,faiblir|6ssiez,feindre|3gniez,geindre|3gniez,gravir|5ssiez,mollir|5ssiez,mordre|4iez,morfondre|7iez,deplacer|1éplaciez,gerer|1ériez,interesser|3éressiez,remplir|6ssiez,reunir|1éunissiez,reussir|1éussissiez,acquerir|4ériez,craindre|4gniez,sentir|5ez,paraitre|5ssiez,repondre|1épondiez",rev:"évaliez|4oir,évoyiez|3ir,pentiez|5r,rsoyiez|2eoir,ssoyiez|3ir,aïssiez|2r,iâttiez|3re,ncisiez|3re,mbatiez|4re,egniez|1ndre,pandiez|4re,uiviez|3re,pissiez|2r,erdiez|3re,evoyiez|3ir,missiez|2r,ffriez|4r,réciiez|1ecier,siégiez|2eger,réiez|1eer,rrêtiez|2eter,éfériez|eferer,ccédiez|2eder,sfériez|2erer,bissiez|2r,ouriiez|4re,sortiez|5r,ceviez|3oir,mouviez|4oir,vêtiez|4r,fisiez|2re,inquiez|2cre,hissiez|2r,viviez|3re,vouliez|4oir,disiez|2re,uissiez|2r,battiez|4re,partiez|5r,dormiez|5r,solviez|2udre,criviez|3re,ompiez|3re,cluiez|3re,aisiez|2re,oigniez|2ndre,gissiez|2r,preniez|4dre,teniez|4r,ouvriez|5r,illiez|4r,ouriez|4r,cissiez|2r,mettiez|4re,sissiez|2r,dissiez|2r,veniez|4r,uisiez|2re,rissiez|2r,tissiez|2r,endiez|3re,nissiez|2r,iez|er,errou|5iller,ie|2illir"},ils:{rules:"énir|3ssaient,ésir|isaient,révoir|4yaient,urseoir|3oyaient,ssoir|3yaient,aïr|2ssaient,ourvoir|5yaient,sombrir|6ssaient,ssoupir|6ssaient,ssouvir|6ssaient,tendrir|6ssaient,epartir|épartissaient,etentir|6ssaient,omir|3ssaient,leurir|5ssaient,arantir|6ssaient,ravir|4ssaient,nvestir|6ssaient,aigrir|5ssaient,eurtrir|6ssaient,precier|2éciaient,ssieger|3égeaient,reer|1éaient,rreter|2êtaient,eplacer|éplaçaient,eresser|éressaient,referer|1éféraient,ucceder|3édaient,eunir|éunissaient,eussir|éussissaient,ubir|3ssaient,cquerir|3éraient,sortir|4aient,vêtir|3aient,inir|3ssaient,utir|3ssaient,anchir|5ssaient,unir|3ssaient,uir|2ssaient,erer|éraient,partir|4aient,dormir|4aient,rrir|3ssaient,vertir|5ssaient,nnir|3ssaient,servir|4aient,rnir|3ssaient,entir|3aient,gir|2ssaient,illir|3aient,cir|2ssaient,sir|2ssaient,dir|2ssaient,lir|2ssaient,rir|1aient,oir|aient,enir|2aient,ger|2aient,cer|çaient,er|aient,ariâtre|5taient,mbatre|4aient,audire|4ssaient,épandre|5aient,roire|2yaient,outre|3aient,raire|2yaient,araitre|4ssaient,epondre|épondaient,ourire|4aient,rdre|2aient,ondre|3aient,vaincre|4quaient,soudre|2lvaient,ivre|2aient,crire|3vaient,ompre|3aient,clure|3aient,prendre|4aient,ttre|2aient,ître|issaient,endre|3aient,indre|1gnaient,ire|1saient",exceptions:"asservir|7ssaient,fuir|2yaient,voir|2yaient,être|étaient,iendre|2gnaient,boire|1uvaient,coudre|3saient,moudre|3laient,rire|2aient,assortir|7ssaient,revoir|4yaient,verrouiller|lait,vieillir|lissait,illuminer|luminions,illusionner|lusionnions,illustrer|lustrions,ecouter|écoutaient,eclaircir|éclaircissaient,etablir|établissaient,reflechir|1éfléchissaient,ecrire|écrivaient,eteindre|éteignaient,choisir|6ssaient,avoir|2aient,bénir|4ssaient,circonvenir|9aient,convenir|6aient,défaillir|7aient,faillir|5aient,gésir|1isaient,mentir|4aient,mourir|4aient,mouvoir|4aient,partir|4aient,pouvoir|4aient,prévaloir|6aient,prévoir|5yaient,repentir|6aient,ressortir|7aient,sortir|4aient,surseoir|4oyaient,assoir|4yaient,bouillir|6aient,recevoir|5aient,courir|4aient,cueillir|6aient,devoir|3aient,endormir|6aient,dormir|4aient,haïr|3ssaient,promouvoir|7aient,ouvrir|4aient,pourvoir|6yaient,quérir|4aient,assaillir|7aient,savoir|3aient,servir|4aient,valoir|3aient,venir|3aient,vouloir|4aient,finir|4ssaient,acariâtre|7taient,circoncire|8saient,croître|3issaient,embatre|5aient,inclure|5aient,maudire|5ssaient,oindre|2gnaient,paître|2issaient,recroître|5issaient,renaître|4issaient,repaître|4issaient,suffire|5saient,taire|3saient,aindre|2gnaient,battre|4aient,prendre|4aient,répandre|6aient,clure|3aient,confire|5saient,connaître|5issaient,crire|3vaient,croire|3yaient,accroître|5issaient,dire|2saient,faire|3saient,foutre|4aient,lire|2saient,luire|3saient,mettre|4aient,naître|2issaient,joindre|3gnaient,ompre|3aient,cloître|3issaient,plaire|4saient,braire|3yaient,suivre|4aient,uire|2saient,vaincre|4quaient,vivre|3aient,abolir|5ssaient,aboutir|6ssaient,abrutir|6ssaient,accomplir|8ssaient,accourir|6aient,approfondir|10ssaient,arrondir|7ssaient,assagir|6ssaient,assainir|7ssaient,assombrir|8ssaient,assoupir|7ssaient,assouplir|8ssaient,assouvir|7ssaient,astreindre|6gnaient,atteindre|5gnaient,attendre|6aient,attendrir|8ssaient,atterrir|7ssaient,avertir|6ssaient,bannir|5ssaient,barrir|5ssaient,blanchir|7ssaient,descendre|7aient,dessaisir|8ssaient,desservir|7aient,devenir|5aient,disconvenir|9aient,discourir|7aient,disjoindre|6gnaient,divertir|7ssaient,durcir|5ssaient,embellir|7ssaient,emplir|5ssaient,empreindre|6gnaient,omettre|5aient,ourdir|5ssaient,parcourir|7aient,parfaire|6saient,parvenir|6aient,peindre|3gnaient,pendre|4aient,percevoir|6aient,perdre|4aient,permettre|7aient,plaindre|4gnaient,polir|4ssaient,pondre|4aient,rendre|4aient,rendormir|7aient,repartir|1épartissaient,repeindre|5gnaient,rependre|6aient,reprendre|6aient,reproduire|8saient,resplendir|9ssaient,ressaisir|8ssaient,ressentir|7aient,resservir|7aient,restreindre|7gnaient,retenir|5aient,retentir|7ssaient,retranscrire|10vaient,retransmettre|11aient,revenir|5aient,revivre|5aient,revouloir|6aient,revendre|6aient,rompre|4aient,rouvrir|5aient,rougir|5ssaient,vagir|4ssaient,vendre|4aient,verdir|5ssaient,vernir|5ssaient,vomir|4ssaient,exclure|5aient,faiblir|6ssaient,farcir|5ssaient,feindre|3gnaient,fendre|4aient,fleurir|6ssaient,fournir|6ssaient,franchir|7ssaient,garantir|7ssaient,garnir|5ssaient,geindre|3gnaient,grandir|6ssaient,gravir|5ssaient,grossir|6ssaient,hennir|5ssaient,honnir|5ssaient,induire|5saient,inscrire|6vaient,instruire|7saient,interagir|8ssaient,interdire|7saient,interrompre|9aient,intervenir|8aient,intervertir|10ssaient,introduire|8saient,investir|7ssaient,jaunir|5ssaient,jouir|4ssaient,languir|6ssaient,maigrir|6ssaient,maintenir|7aient,meurtrir|7ssaient,mincir|5ssaient,moisir|5ssaient,mollir|5ssaient,mordre|4aient,morfondre|7aient,munir|4ssaient,nuire|3saient,noircir|6ssaient,nourrir|6ssaient,obscurcir|8ssaient,obtenir|5aient,apprecier|4éciaient,assieger|4égeaient,arreter|3êtaient,deplacer|1éplaçaient,gerer|1éraient,interesser|3éressaient,preferer|2éféraient,succeder|4édaient,transferer|6éraient,rebondir|7ssaient,remplir|6ssaient,reunir|1éunissaient,reussir|1éussissaient,saisir|5ssaient,subir|4ssaient,acquerir|4éraient,cuire|3saient,conclure|6aient,couvrir|5aient,craindre|4gnaient,sentir|4aient,tenir|3aient,apprendre|6aient,comprendre|7aient,convaincre|7quaient,entendre|6aient,paraitre|5ssaient,rabattre|6aient,recouvrir|7aient,rejoindre|5gnaient,remettre|6aient,repondre|1épondaient,sourire|5aient,départir|6aient",rev:"fraient|2ir,réaient|1eer,êtaient|2ir,lvaient|udre,geaient|2r,çaient|cer,aient|er"}},pastParticiple:{prt:{rules:"éer|2,baturer|4,icher|3u,énir|3t,assir|4s,leuvoir|1u,uérir|1is,ujettir|1,rturber|1,epartir|éparti,ieillir|2,filtrer|1,illeter|,ilmer|,umilier|2,ortuner|2,ffrir|2ert,precier|2écié,ssieger|3égé,reer|1éé,rreter|2êté,eplacer|éplacé,eresser|éressé,referer|1éféré,ucceder|3édé,eunir|éuni,eussir|éussi,cquerir|3is,etir|ê,ïr|1,cevoir|çu,vêtir|3u,iliser|,iliter|,erer|éré,ouvoir|u,seoir|1is,turer|,courir|4u,ouvrir|3ert,enir|2u,iller|,oir|u,ir|1,er|é,ariâtre|5tu,mbatre|4u,eclure|4s,uffire|4,istre|2su,épandre|5u,outre|3u,bsoudre|4t,araitre|2u,abattre|4,epondre|épondu,ourire|4,cire|2s,suivre|4i,croître|2û,aître|u,soudre|2lu,oire|u,rdre|2u,vivre|1écu,vaincre|5u,ondre|3u,ompre|3u,clure|3,prendre|2is,clore|3s,mettre|1is,endre|3u,indre|2t,ire|1t",exceptions:"avoir|eu,férir|3u,issir|3u,mourir|2rt,devoir|1û,savoir|1u,bruire|4,inclure|5s,taire|1u,être|été,battre|4u,iendre|3t,coudre|3su,accroître|4u,lire|1u,luire|3,moudre|3lu,naître|1é,rire|2,arriver|suis arrivé,devenir|suis devenu,parvenir|suis parvenu,rester|suis resté,retomber|suis retombé,revenir|suis revenu,familiariser|3,intervenir|suis intervenu,jaillir|2,ecouter|écouté,eclaircir|éclairci,etablir|établi,reflechir|1éfléchi,ecrire|écrit,naitre|suis né,eteindre|éteint,pouvoir|1u,rassir|5s,pleuvoir|2u,quérir|2is,tistre|3su,boire|1u,croire|2u,assujettir|4,babiller|3,repartir|1éparti,utiliser|2,veiller|2,faciliter|3,feuilleter|3,filmer|1,habiliter|3",rev:"ée|2r,ie|2illir,ourbatu|7rer,ichu|3er,allu|3oir,ariâttu|5re,mbatu|4re,epu|2aître,attu|3re,onnu|3aître,ousu|2dre,ccru|3oître,outu|3re,aqu|3iller,aru|2aitre,épondu|epondre,valu|3oir,çu|cevoir,mu|1ouvoir,vêtu|3ir,solu|2udre,vécu|1ivre,voulu|4oir,vaincu|5re,chu|2oir,ompu|3re,ou|2iller,clu|3re,vu|1oir,ru|1ir,enu|2ir,du|1re,énit|3r,ort|1urir,bsout|4dre,abat|4tre,ert|rir,nt|1dre,it|1re,rui|3re,uffi|4re,éfléchi|eflechir,éuni|eunir,éussi|eussir,ouri|4re,suivi|4re,i|1r,sc|2iller,rac|3turer,er|2turber,mpor|4tuner,xf|2iltrer,am|2iliariser,um|2ilier,oss|3iliser,cquis|3erir,cis|2re,clus|3re,sis|1eoir,pris|2endre,clos|3re,mis|1ettre,asp|3iller,pprécié|3ecier,ssiégé|3eger,réé|1eer,rrêté|2eter,éplacé|eplacer,téressé|1eresser,référé|1eferer,uccédé|3eder,éré|erer,é|er,ê|etir,ï|1r,crû|2oître,n|1turer,a|1iller"}},presentTense:{je:{rules:"cheter|2ète,apiécer|3èce,eser|èse,evrer|èvre,élébrer|2èbre,éder|ède,brécher|2èche,égler|ègle,rotéger|3ège,théquer|2èque,ppuyer|3ie,eborder|éborde,echirer|échire,emarrer|émarre,ésir|is,uïr|is,epentir|4s,urseoir|3ois,ouillir|2s,ueillir|5e,aïr|1is,uérir|1iers,saillir|5e,avoir|1is,ssener|2ène,inturer|2,elleter|5te,rturber|1,epartir|épartis,ieillir|2,oleter|4te,filtrer|1,illeter|,acturer|2,ureter|2ète,aleter|2ète,arteler|3èle,odeler|2èle,ffrir|3e,precier|2écie,ssieger|3ège,reer|1ée,rreter|2ête,eplacer|éplace,eresser|éresse,referer|1éfère,ucceder|3ède,eunir|éunis,eussir|éussis,cquerir|3iers,épartir|4s,ecer|èce,valoir|2ux,cevoir|çois,mouvoir|1eus,vêtir|3s,mener|1ène,sentir|3s,vouloir|1eux,iliser|,iliter|,erer|ère,dormir|3s,ever|ève,courir|4s,ouvrir|4e,eler|2le,enir|iens,oyer|1ie,ir|1s,er|1,outre|2s,araitre|4s,epondre|éponds,vivre|2s,soudre|3s,ttre|1s,ître|is,indre|2s,re|s",exceptions:"geler|1èle,aller|vais,jeter|3te,montrer|4e,declencher|1éclenche,elancer|élance,mentir|3s,mourir|1eurs,partir|3s,pouvoir|1eux,ressortir|6s,sortir|3s,devoir|1ois,servir|3s,croître|4s,être|suis,iendre|3s,desservir|6s,peler|1èle,resservir|6s,familiariser|3,ecouter|écoute,eclaircir|éclaircis,etablir|établis,reflechir|1éfléchis,ecrire|écris,eteindre|éteins,défaillir|4us,faillir|2ux,céder|1ède,gésir|1is,ouïr|1is,bouillir|3s,haïr|2is,quérir|2iers,savoir|2is,taire|3s,boire|3s,croire|4s,dire|2s,foutre|3s,lire|2s,luire|3s,braire|4s,rire|2s,uire|2s,vivre|2s,vieillir|3,faciliter|3,nuire|3s,cuire|3s",rev:"apièce|3écer,èse|eser,èvre|evrer,élèbre|2ébrer,brèche|2écher,ègle|égler,rotège|3éger,othèque|3équer,ppuie|3yer,éborde|eborder,échire|echirer,émarre|emarrer,ffre|3ir,pprécie|3ecier,ssiège|3eger,rée|1eer,rrête|2eter,éplace|eplacer,téresse|1eresser,réfère|1eferer,uccède|3eder,èce|ecer,ille|3ir,telle|3er,lette|3er,velle|3er,celle|3er,appelle|5er,ète|eter,ère|erer,ève|ever,ène|ener,èle|eler,ouvre|4ir,oie|1yer,e|1r,eurs|ourir,epens|4tir,ursois|3eoir,cariâts|6re,rconcis|6re,roîs|3tre,nclos|4re,audis|4re,lois|2ître,épartis|epartir,evis|3vre,oss|3iliser,nstruis|6re,nterdis|6re,éunis|eunir,éussis|eussir,cquiers|3erir,arais|4tre,éponds|epondre,ouris|4re,éfaus|3illir,lais|3re,sors|3tir,çois|cevoir,meus|1ouvoir,vêts|3ir,fais|3re,crois|3ître,pais|2ître,fis|2re,sens|3tir,vaincs|5re,pars|3tir,dors|3mir,nais|2ître,sous|3dre,sers|3vir,duis|3re,cris|3re,omps|3re,clus|3re,cours|4ir,ts|1tre,iens|enir,ins|2dre,ds|1re,is|1r,ein|3turer,er|2turber,t|1iliser,xf|2iltrer,am|2iliariser,eu|2illeter,rac|3turer,ab|2iliter,vaux|2loir,veux|1ouloir"},tu:{rules:"cheter|2ètes,apiécer|3èces,eser|èses,evrer|èvres,élébrer|2èbres,éder|èdes,brécher|2èches,égler|ègles,rotéger|3èges,théquer|2èques,ppuyer|3ies,eborder|ébordes,echirer|échires,emarrer|émarres,ésir|is,uïr|is,epentir|4s,urseoir|3ois,ouillir|2s,ueillir|5es,aïr|1is,uérir|1iers,saillir|5es,avoir|1is,ssener|2ènes,elleter|5tes,epartir|épartis,oleter|4tes,ureter|2ètes,aleter|2ètes,arteler|3èles,odeler|2èles,ffrir|3es,precier|2écies,ssieger|3èges,reer|1ées,rreter|2êtes,eplacer|éplaces,eresser|éresses,referer|1éfères,ucceder|3èdes,eunir|éunis,eussir|éussis,cquerir|3iers,épartir|4s,ecer|èces,valoir|2ux,cevoir|çois,mouvoir|1eus,vêtir|3s,mener|1ènes,sentir|3s,vouloir|1eux,erer|ères,dormir|3s,ever|èves,courir|4s,ouvrir|4es,eler|2les,enir|iens,oyer|1ies,r|s,outre|2s,araitre|4s,epondre|éponds,soudre|3s,ivre|1s,ttre|1s,ître|is,indre|2s,re|s",exceptions:"geler|1èles,aller|vas,jeter|3tes,montrer|4es,declencher|1éclenches,elancer|élances,mentir|3s,mourir|1eurs,partir|3s,pouvoir|1eux,ressortir|6s,sortir|3s,devoir|1ois,servir|3s,croître|4s,être|es,iendre|3s,desservir|6s,peler|1èles,peinturer|re,perturber|rbe,resservir|6s,utiliser|ise,exfiltrer|tre,faciliter|ite,familiariser|iarise,feuilleter|lette,ecouter|écoutes,eclaircir|éclaircis,etablir|établis,reflechir|1éfléchis,ecrire|écris,eteindre|éteins,défaillir|4us,faillir|2ux,céder|1èdes,gésir|1is,ouïr|1is,bouillir|3s,haïr|2is,quérir|2iers,savoir|2is,taire|3s,boire|3s,croire|4s,dire|2s,foutre|3s,lire|2s,luire|3s,braire|4s,rire|2s,suivre|3s,uire|2s,vivre|2s,nuire|3s,cuire|3s",rev:"apièces|3écer,èses|eser,èvres|evrer,élèbres|2ébrer,brèches|2écher,ègles|égler,rotèges|3éger,thèques|2équer,ppuies|3yer,ébordes|eborder,échires|echirer,émarres|emarrer,eurs|ourir,epens|4tir,ursois|3eoir,cariâts|6re,rconcis|6re,roîs|3tre,nclos|4re,audis|4re,lois|2ître,épartis|epartir,evis|3vre,nstruis|6re,nterdis|6re,ffres|3ir,précies|2ecier,ssièges|3eger,rées|1eer,rrêtes|2eter,éplaces|eplacer,éresses|eresser,réfères|1eferer,uccèdes|3eder,éunis|eunir,éussis|eussir,cquiers|3erir,arais|4tre,éponds|epondre,ouris|4re,éfaus|3illir,lais|3re,èces|ecer,sors|3tir,çois|cevoir,illes|3ir,meus|1ouvoir,vêts|3ir,fais|3re,crois|3ître,pais|2ître,fis|2re,telles|3er,lettes|3er,velles|3er,sens|3tir,celles|3er,ppelles|4er,vaincs|5re,pars|3tir,ètes|eter,ères|erer,dors|3mir,nais|2ître,sous|3dre,èves|ever,ènes|ener,sers|3vir,duis|3re,cris|3re,omps|3re,èles|eler,clus|3re,cours|4ir,ouvres|4ir,ts|1tre,iens|enir,ins|2dre,oies|1yer,ds|1re,s|r,vaux|2loir,veux|1ouloir"},il:{rules:"cheter|2ète,apiécer|3èce,eser|èse,evrer|èvre,élébrer|2èbre,éder|ède,brécher|2èche,égler|ègle,rotéger|3ège,théquer|2èque,ppuyer|3ie,eborder|éborde,echirer|échire,emarrer|émarre,ésir|ît,uïr|it,epentir|5,urseoir|3oit,ouillir|2t,ueillir|5e,aïr|1it,uérir|1iert,saillir|5e,avoir|1it,ssener|2ène,inturer|2,elleter|5te,rturber|1,epartir|épartit,ieillir|2,oleter|4te,filtrer|1,illeter|,acturer|2,ureter|2ète,aleter|2ète,arteler|3èle,odeler|2èle,ffrir|3e,precier|2écie,ssieger|3ège,reer|1ée,rreter|2ête,eplacer|éplace,eresser|éresse,referer|1éfère,ucceder|3ède,eunir|éunit,eussir|éussit,cquerir|3iert,échoir|3et,ecer|èce,valoir|2ut,cevoir|çoit,vêtir|3,mener|1ène,sentir|4,vouloir|1eut,iliser|,iliter|,faillir|2ut,erer|ère,ouvoir|eut,dormir|3t,ever|ève,courir|4t,ouvrir|4e,eler|2le,enir|ient,oyer|1ie,ir|1t,er|1,ariâtre|5,nclore|4t,outre|3,araitre|3ît,epondre|épond,laire|2ît|plait,vaincre|5,soudre|3t,ivre|1t,ompre|3t,clure|3t,ttre|1,ître|2,indre|2t,dre|1,ire|1t",exceptions:"geler|1èle,aller|va,jeter|3te,montrer|4e,declencher|1éclenche,elancer|élance,mentir|4,mourir|1eurt,partir|4,ressortir|7,sortir|4,devoir|1oit,servir|3t,être|est,iendre|3t,accroître|5it,desservir|6t,peler|1èle,resservir|6t,familiariser|3,ecouter|écoute,eclaircir|éclaircit,etablir|établit,reflechir|1éfléchit,ecrire|écrit,eteindre|éteint,céder|1ède,gésir|1ît,ouïr|1it,bouillir|3t,haïr|2it,quérir|2iert,savoir|2it,boire|3t,croire|4t,dire|2t,foutre|4,lire|2t,luire|3t,rire|2t,suivre|3t,uire|2t,vivre|2t,repartir|1épartit,utiliser|2,vieillir|3,faciliter|3,nuire|3t,cuire|3t,plaire|3ît|plait",rev:"apièce|3écer,èse|eser,èvre|evrer,élèbre|2ébrer,brèche|2écher,ègle|égler,rotège|3éger,othèque|3équer,ppuie|3yer,éborde|eborder,échire|echirer,émarre|emarrer,ffre|3ir,pprécie|3ecier,ssiège|3eger,rée|1eer,rrête|2eter,éplace|eplacer,téresse|1eresser,réfère|1eferer,uccède|3eder,èce|ecer,ille|3ir,telle|3er,lette|3er,velle|3er,celle|3er,appelle|5er,ète|eter,ère|erer,ève|ever,ène|ener,èle|eler,ouvre|4ir,oie|1yer,e|1r,eurt|ourir,art|3ir,epent|5ir,ursoit|3eoir,cariât|6re,rconcit|6re,nclot|4re,audit|4re,ccroit|4ître,evit|3vre,nstruit|6re,nterdit|6re,éunit|eunir,éussit|eussir,cquiert|3erir,araît|3itre,ourit|4re,échet|3oir,vaut|2loir,sort|4ir,çoit|cevoir,vêt|3ir,fit|2re,sent|4ir,veut|1ouloir,bat|3tre,faut|2illir,eut|ouvoir,dort|3mir,sout|3dre,sert|3vir,duit|3re,crit|3re,ompt|3re,clut|3re,ait|2re,court|4ir,met|3tre,ît|2re,ient|enir,int|2dre,it|1r,ein|3turer,er|2turber,xf|2iltrer,am|2iliariser,eu|2illeter,oss|3iliser,rac|3turer,vainc|5re,ab|2iliter,épond|epondre,d|1re"},nous:{rules:"eborder|ébordons,echirer|échirons,emarrer|émarrons,énir|3ssons,ésir|isons,mpartir|6ssons,révoir|4yons,urseoir|3oyons,ssoir|3yons,aïr|2ssons,ourvoir|5yons,sombrir|6ssons,ssoupir|6ssons,ssouvir|6ssons,tendrir|6ssons,epartir|épartissons,etentir|6ssons,omir|3ssons,leurir|5ssons,arantir|6ssons,ravir|4ssons,nvestir|6ssons,aigrir|5ssons,eurtrir|6ssons,precier|2écions,ssieger|3égeons,reer|1éons,rreter|2êtons,eplacer|éplaçons,eresser|éressons,referer|1éférons,ucceder|3édons,eunir|éunissons,eussir|éussissons,ubir|3ssons,cquerir|3érons,échoir|4yons,épartir|5ons,sortir|4ons,vêtir|3ons,inir|3ssons,utir|3ssons,anchir|5ssons,unir|3ssons,erer|érons,uir|2ssons,dormir|4ons,rrir|3ssons,vertir|5ssons,nnir|3ssons,servir|4ons,rnir|3ssons,entir|3ons,gir|2ssons,illir|3ons,cir|2ssons,sir|2ssons,dir|2ssons,lir|2ssons,rir|1ons,oir|1ns,enir|2ons,ger|2ons,cer|çons,er|ons,ariâtre|5tons,nclore|4sons,audire|4ssons,épandre|5ons,roire|2yons,outre|3ons,araitre|4ssons,epondre|épondons,ourire|4ons,rdre|2ons,ondre|3ons,vaincre|4quons,soudre|2lvons,ivre|2ons,crire|3vons,ompre|3ons,clure|3ons,prendre|4ons,ttre|2ons,ître|issons,endre|3ons,indre|1gnons,ire|1sons",exceptions:"montrer|4ons,declencher|1éclenchons,elancer|élançons,asservir|7ssons,partir|4ons,fuir|2yons,voir|2yons,être|sommes,iendre|2gnons,boire|1uvons,coudre|3sons,moudre|3lons,rire|2ons,assortir|7ssons,peinturer|res,perturber|rbes,revoir|4yons,utiliser|ises,vieillir|lis,exfiltrer|tres,faciliter|ites,familiariser|iarises,feuilleter|lettes,ecouter|écoutons,eclaircir|éclaircissons,etablir|établissons,reflechir|1éfléchissons,ecrire|écrivons,eteindre|éteignons,deborder|1ébordons,dechirer|1échirons,demarrer|1émarrons,choir|3ns,gésir|1isons,mentir|4ons,pouvoir|5ns,devoir|4ns,pourvoir|6yons,quérir|4ons,savoir|4ns,servir|4ons,valoir|4ns,croître|3issons,maudire|5ssons,paître|2issons,recroître|5issons,renaître|4issons,repaître|4issons,aindre|2gnons,connaître|5issons,croire|3yons,accroître|5issons,foutre|4ons,lire|2sons,naître|2issons,cloître|3issons,abolir|5ssons,accomplir|8ssons,assouplir|8ssons,assouvir|7ssons,astreindre|6gnons,atteindre|5gnons,desservir|7ons,embellir|7ssons,emplir|5ssons,empreindre|6gnons,peindre|3gnons,plaindre|4gnons,polir|4ssons,pondre|4ons,repartir|1épartissons,repeindre|5gnons,ressentir|7ons,resservir|7ons,restreindre|7gnons,faiblir|6ssons,feindre|3gnons,geindre|3gnons,gravir|5ssons,mollir|5ssons,mordre|4ons,morfondre|7ons,deplacer|1éplaçons,gerer|1érons,interesser|3éressons,remplir|6ssons,reunir|1éunissons,reussir|1éussissons,acquerir|4érons,craindre|4gnons,sentir|4ons,paraitre|5ssons,repondre|1épondons,déchoir|5yons",rev:"idérons|2erer,évalons|5ir,évoyons|3ir,pentons|4ir,rsoyons|2eoir,ssoyons|3ir,aïssons|2r,iâttons|3re,ncisons|3re,closons|3re,egnons|1ndre,pandons|4re,uivons|3re,pissons|2r,erdons|3re,evoyons|3ir,missons|2r,ffrons|3ir,récions|1ecier,iégeons|1eger,réons|1eer,rrêtons|2eter,éférons|eferer,ccédons|2eder,sférons|2erer,bissons|2r,ourions|4re,sortons|4ir,cevons|4ir,mouvons|5ir,vêtons|3ir,fisons|2re,inquons|2cre,hissons|2r,vivons|3re,voulons|5ir,disons|2re,battons|4re,partons|4ir,uissons|2r,dormons|4ir,solvons|2udre,oignons|2ndre,crivons|3re,ompons|3re,cluons|3re,aisons|2re,gissons|2r,prenons|4dre,tenons|3ir,ouvrons|4ir,ourons|3ir,illons|3ir,cissons|2r,mettons|4re,sissons|2r,dissons|2r,venons|3ir,uisons|2re,rissons|2r,endons|3re,tissons|2r,nissons|2r,geons|2r,çons|cer,ons|er"},vous:{rules:"eborder|ébordez,echirer|échirez,emarrer|émarrez,énir|3ssez,ésir|isez,mpartir|6ssez,révoir|4yez,urseoir|3oyez,ssoir|3yez,aïr|2ssez,ourvoir|5yez,sombrir|6ssez,ssoupir|6ssez,ssouvir|6ssez,tendrir|6ssez,inturer|2,rturber|1,epartir|épartissez,etentir|6ssez,ieillir|2,omir|3ssez,filtrer|1,illeter|,leurir|5ssez,acturer|2,arantir|6ssez,ravir|4ssez,nvestir|6ssez,aigrir|5ssez,eurtrir|6ssez,precier|2éciez,ssieger|3égez,reer|1éez,rreter|2êtez,eplacer|éplacez,eresser|éressez,referer|1éférez,ucceder|3édez,eunir|éunissez,eussir|éussissez,ubir|3ssez,cquerir|3érez,échoir|4yez,épartir|5ez,sortir|4ez,vêtir|3ez,inir|3ssez,utir|3ssez,anchir|5ssez,iliser|,iliter|,unir|3ssez,erer|érez,uir|2ssez,dormir|4ez,rrir|3ssez,vertir|5ssez,nnir|3ssez,servir|4ez,rnir|3ssez,entir|3ez,gir|2ssez,illir|3ez,cir|2ssez,sir|2ssez,dir|2ssez,lir|2ssez,rir|1ez,oir|ez,enir|2ez,er|1z,ariâtre|5tez,nclore|4sez,audire|4ssez,épandre|5ez,roire|2yez,outre|3ez,araitre|4ssez,epondre|épondez,ourire|4ez,faire|3tes,rdre|2ez,ondre|3ez,dire|2tes,vaincre|4quez,soudre|2lvez,ivre|2ez,crire|3vez,ompre|3ez,clure|3ez,prendre|4ez,ttre|2ez,ître|issez,endre|3ez,ire|1sez,indre|1gnez",exceptions:"montrer|4ez,declencher|1éclenchez,elancer|élancez,asservir|7ssez,partir|4ez,fuir|2yez,voir|2yez,être|2es,iendre|2gnez,boire|1uvez,coudre|3sez,moudre|3lez,rire|2ez,assortir|7ssez,revoir|4yez,familiariser|3,ecouter|écoutez,eclaircir|éclaircissez,etablir|établissez,reflechir|1éfléchissez,ecrire|écrivez,eteindre|éteignez,gésir|1isez,mentir|4ez,pouvoir|4ez,devoir|3ez,pourvoir|6yez,quérir|4ez,savoir|3ez,servir|4ez,valoir|3ez,croître|3issez,recroître|5issez,aindre|2gnez,croire|3yez,accroître|5issez,foutre|4ez,lire|2sez,atteindre|5gnez,pondre|4ez,repartir|1épartissez,faciliter|3,faiblir|6ssez,feindre|3gnez,geindre|3gnez,mordre|4ez,gerer|1érez,reunir|1éunissez,reussir|1éussissez,sentir|4ez",rev:"sidérez|3erer,ébordez|eborder,échirez|echirer,émarrez|emarrer,rvissez|3r,révalez|5oir,révoyez|4ir,epentez|5ir,ursoyez|3eoir,ssoyez|3ir,aïssez|2r,riâttez|4re,oncisez|4re,nclosez|4re,udissez|3re,egnez|1ndre,épandez|5re,loissez|2ître,uivez|3re,upissez|3r,uvissez|3r,erdez|3re,laignez|3ndre,ssentez|5ir,evoyez|3ir,omissez|3r,avissez|3r,rfondez|5re,ffrez|3ir,préciez|2ecier,ssiégez|3eger,réez|1eer,rrêtez|2eter,éplacez|eplacer,éressez|eresser,référez|1eferer,uccédez|3eder,nsférez|3erer,ubissez|3r,cquérez|3erir,raignez|3ndre,raissez|3tre,épondez|epondre,ouriez|4re,échoyez|4ir,sortez|4ir,cevez|3oir,mouvez|4oir,vêtez|3ir,paissez|2ître,fisez|2re,aisez|2re,ainquez|3cre,olissez|3r,chissez|3r,sservez|5ir,llissez|3r,peignez|3ndre,vivez|3re,voulez|4oir,battez|4re,partez|4ir,uissez|2r,dormez|4ir,naissez|2ître,solvez|2udre,reignez|3ndre,joignez|3ndre,crivez|3re,ompez|3re,cluez|3re,plissez|3r,gissez|2r,prenez|4dre,tenez|3ir,ouvrez|4ir,ourez|3ir,illez|3ir,cissez|2r,mettez|4re,sissez|2r,dissez|2r,venez|3ir,uisez|2re,rissez|2r,endez|3re,tissez|2r,nissez|2r,ez|1r,ein|3turer,er|2turber,t|1iliser,ie|2illir,xf|2iltrer,am|2iliariser,eu|2illeter,oss|3iliser,ites|1re,rac|3turer,ab|2iliter"},ils:{rules:"cheter|2ètent,apiécer|3ècent,eser|èsent,evrer|èvrent,élébrer|2èbrent,éder|èdent,brécher|2èchent,égler|èglent,rotéger|3ègent,théquer|2èquent,ppuyer|3ient,eborder|ébordent,echirer|échirent,emarrer|émarrent,énir|3ssent,ésir|isent,mpartir|6ssent,révoir|5ent,urseoir|3oient,ssoir|4ent,aïr|2ssent,ourvoir|6ent,uérir|1ièrent,avoir|2ent,ssener|2ènent,sombrir|6ssent,ssoupir|6ssent,ssouvir|6ssent,tendrir|6ssent,elleter|5tent,epartir|épartissent,etentir|6ssent,oleter|4tent,omir|3ssent,leurir|5ssent,ureter|2ètent,arantir|6ssent,ravir|4ssent,aleter|2ètent,nvestir|6ssent,aigrir|5ssent,arteler|3èlent,eurtrir|6ssent,odeler|2èlent,ffrir|3ent,precier|2écient,ssieger|3ègent,reer|1éent,rreter|2êtent,eplacer|éplacent,eresser|éressent,referer|1éfèrent,ucceder|3èdent,eunir|éunissent,eussir|éussissent,ubir|3ssent,cquerir|3ièrent,échoir|5ent,épartir|5ent,ecer|ècent,valoir|3ent,sortir|4ent,cevoir|çoivent,vêtir|3ent,inir|3ssent,utir|3ssent,anchir|5ssent,mener|1ènent,vouloir|1eulent,unir|3ssent,erer|èrent,uir|2ssent,ouvoir|euvent,dormir|4ent,ever|èvent,rrir|3ssent,vertir|5ssent,nnir|3ssent,servir|4ent,rnir|3ssent,entir|3ent,courir|4ent,gir|2ssent,ouvrir|4ent,illir|3ent,cir|2ssent,sir|2ssent,dir|2ssent,eler|2lent,lir|2ssent,enir|iennent,oyer|1ient,er|1nt,ariâtre|5tent,nclore|4sent,audire|4ssent,épandre|5ent,roire|3ent,outre|3ent,raire|3ent,araitre|4ssent,epondre|épondent,ourire|4ent,faire|1ont,rdre|2ent,ondre|3ent,vaincre|4quent,soudre|2lvent,ivre|2ent,crire|3vent,ompre|3ent,clure|3ent,prendre|4nent,ttre|2ent,ître|issent,endre|3ent,indre|1gnent,ire|1sent",exceptions:"geler|1èlent,aller|vont,jeter|3tent,montrer|4ent,declencher|1éclenchent,elancer|élancent,asservir|7ssent,mourir|1eurent,partir|4ent,devoir|1oivent,fuir|3ent,voir|3ent,être|sont,iendre|2gnent,boire|3vent,coudre|3sent,moudre|3lent,rire|2ent,assortir|7ssent,peler|1èlent,peinturer|re,perturber|rbe,revoir|5ent,utiliser|ise,vieillir|lit,exfiltrer|tre,faciliter|ite,familiariser|iarise,feuilleter|lette,ecouter|écoutent,eclaircir|éclaircissent,etablir|établissent,reflechir|1éfléchissent,ecrire|écrivent,eteindre|éteignent,céder|1èdent,deborder|1ébordent,dechirer|1échirent,demarrer|1émarrent,gésir|1isent,mentir|4ent,pouvoir|1euvent,pourvoir|7ent,quérir|2ièrent,savoir|3ent,servir|4ent,valoir|3ent,croître|3issent,maudire|5ssent,paître|2issent,recroître|5issent,renaître|4issent,repaître|4issent,aindre|2gnent,connaître|5issent,croire|4ent,accroître|5issent,foutre|4ent,lire|2sent,naître|2issent,cloître|3issent,abolir|5ssent,accomplir|8ssent,assouplir|8ssent,assouvir|7ssent,astreindre|6gnent,atteindre|5gnent,desservir|7ent,embellir|7ssent,emplir|5ssent,empreindre|6gnent,peindre|3gnent,plaindre|4gnent,polir|4ssent,pondre|4ent,repartir|1épartissent,repeindre|5gnent,ressentir|7ent,resservir|7ent,restreindre|7gnent,faiblir|6ssent,feindre|3gnent,geindre|3gnent,gravir|5ssent,mollir|5ssent,mordre|4ent,morfondre|7ent,appeler|5lent,deplacer|1éplacent,gerer|1èrent,interesser|3éressent,rappeler|6lent,remplir|6ssent,reunir|1éunissent,reussir|1éussissent,acquerir|4ièrent,craindre|4gnent,sentir|4ent,paraitre|5ssent,repondre|1épondent,déchoir|6ent",rev:"piècent|2écer,èsent|eser,èvrent|evrer,lèbrent|1ébrer,rèchent|1écher,èglent|égler,otègent|2éger,hèquent|1équer,ppuient|3yer,idèrent|2erer,évalent|4oir,évoient|4r,pentent|4ir,rsoient|2eoir,ssoient|4r,aïssent|2r,iâttent|3re,ncisent|3re,closent|3re,egnent|1ndre,pandent|4re,oulent|2dre,raient|3re,uivent|3re,pissent|2r,erdent|3re,evoient|4r,missent|2r,ffrent|3ir,récient|1ecier,siègent|2eger,réent|1eer,rrêtent|2eter,éfèrent|eferer,ccèdent|2eder,sfèrent|2erer,bissent|2r,ourient|4re,ècent|ecer,sortent|4ir,çoivent|cevoir,meuvent|1ouvoir,vêtent|3ir,font|1aire,fisent|2re,aisent|2re,inquent|2cre,tellent|3er,hissent|2r,lettent|3er,vellent|3er,vivent|3re,veulent|1ouloir,cellent|3er,disent|2re,battent|4re,partent|4ir,ètent|eter,uissent|2r,dorment|4ir,solvent|2udre,oignent|2ndre,èvent|ever,ènent|ener,crivent|3re,ompent|3re,èlent|eler,cluent|3re,rennent|3dre,courent|4ir,gissent|2r,ouvrent|4ir,illent|3ir,cissent|2r,mettent|4re,sissent|2r,dissent|2r,uisent|2re,rissent|2r,endent|3re,tissent|2r,nissent|2r,iennent|enir,oient|1yer,ent|1r"}}};Object.keys(Ts).forEach((e=>{Object.keys(Ts[e]).forEach((r=>{Ts[e][r]=Ds(Ts[e][r]);}));}));const Is=function(e,r){return {first:js(e,r.je),second:js(e,r.tu),third:js(e,r.il),firstPlural:js(e,r.nous),secondPlural:js(e,r.vous),thirdPlural:js(e,r.ils)}};var qs={presentTense:e=>Is(e,Ts.presentTense),futureTense:e=>Is(e,Ts.futureTense),imperfect:e=>Is(e,Ts.imperfect),noun:function(e){return {male:e,female:js(e,Ts.noun.female),plural:js(e,Ts.noun.plural),femalePlural:js(e,Ts.noun.femalePlural)}},adjective:function(e){return {male:e,female:js(e,Ts.adjective.female),plural:js(e,Ts.adjective.plural),femalePlural:js(e,Ts.adjective.femalePlural)}},pastParticiple:e=>js(e,Ts.pastParticiple.prt)},Vs={Negative:"true¦aucun,n0;!e,i",Auxiliary:"true¦ai,ont,se",Possessive:"true¦l2m1t0;e,oi;!e;eur,ui",Conjunction:"true¦&,car,donc,et,ma2o1pu2s0voire;inon,oit;r,u;is",Preposition:"true¦aQbecause,cMdIeDgrace,horCjusquBlors9malgPoutPp6qu4s1v0y,à;eGia,oici;a1elEoTu0;ivaPr;ns,uf;elqu0i,oi4;!';ar1endaLour0rPuis2;!quoi;! Lmi;qu0;!e;',e;m8s;n0xcepte;!tAv0;e1ir0;on;rs;!ans,e1u0;!ra8;!pu0rrie4s,va7;is;hez,o0;mme,n0ura4;cerna3t0;re;!fin,pr5u2v0;a0ec;nt; 0pr2;dess0;us;es",Adverb:"true¦0:12;a0Ub0Qc0Jd0Ee07f05g04h03i02jZlVmTnSoQpHquDr0Ls9t2ultra,vi1;s a v0Yte;a5ertio,o2r1;es,op;t,u1;jou13t1;!e0S;n1rd;d0Rt;ecu0Bi3o1urto09;i-disa0u1;da01ve0;!c,de0t0G;!a2e1;!lque;n1si;d,t;a7e5lu4o3r1;esqu1imo;',e;i0urta0;s,t07;le mePu1;!t-etQ;r1s;fo0AtoT;rZu1;i,tre m04;agCeanmoiPon;a1eDieux,oiO;intena0l,tI;a2o1;in,ngDrs; 1-dedaK;b08dess05;a2us1;que 04te;dYmaY;ci,dem,ntT;aFiS;ue9;er1i,ort;me;n1tc;co5f4s2tre 1;temps;emb1uite;le;in;re;avantage,e1orenN;bo3ca,da2hoTja,s1;ormaJs7;ns;ut;a,e5i3omb2resce1;ndo;ien;! dess1;oGus;penda0rt1;es;e3ien1ref;!t1;ot;aucoup,l;iDlBssez,u2vant hi1;er; de8-desso7par5ssi4t1;a0our,re1;fo1;is;!tôt;ava0;nt;us;la;i1o3;as;lleu1nsi;rs",Determiner:"true¦au4ce3l1ol,un0;!e;a,e0;!s;s,tte;!x",QuestionWord:"true¦quelle",Noun:"true¦aujourd'hui",FirstName:"true¦aEblair,cCdevBj8k6lashawn,m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g1ne;ar1el,org0;an;ion,lo;as8e0r9;ls7nyatta,rry;am0ess1ude;ie,m0;ie;an,on;as0heyenne;ey,sidy;lex1ndra,ubr0;ey;is",LastName:"true¦0:34;1:3B;2:39;3:2Y;4:2E;5:30;a3Bb31c2Od2Ee2Bf25g1Zh1Pi1Kj1Ek17l0Zm0Nn0Jo0Gp05rYsMtHvFwCxBy8zh6;a6ou,u;ng,o;a6eun2Uoshi1Kun;ma6ng;da,guc1Zmo27sh21zaR;iao,u;a7eb0il6o3right,u;li3Bs2;gn0lk0ng,tanabe;a6ivaldi;ssilj37zqu1;a9h8i2Go7r6sui,urn0;an,ynisJ;lst0Prr1Uth;at1Uomps2;kah0Vnaka,ylor;aEchDeChimizu,iBmiAo9t7u6zabo;ar1lliv2AzuE;a6ein0;l23rm0;sa,u3;rn4th;lva,mmo24ngh;mjon4rrano;midt,neid0ulz;ito,n7sa6to;ki;ch1dLtos,z;amBeag1Zi9o7u6;bio,iz,sD;b6dri1MgIj0Tme24osevelt,ssi,ux;erts,ins2;c6ve0F;ci,hards2;ir1os;aEeAh8ic6ow20;as6hl0;so;a6illips;m,n1T;ders5et8r7t6;e0Nr4;ez,ry;ers;h21rk0t6vl4;el,te0J;baBg0Blivei01r6;t6w1O;ega,iz;a6eils2guy5ix2owak,ym1E;gy,ka6var1K;ji6muW;ma;aEeCiBo8u6;ll0n6rr0Bssolini,ñ6;oz;lina,oKr6zart;al0Me6r0U;au,no;hhail4ll0;rci0ssi6y0;!er;eWmmad4r6tsu07;in6tin1;!o;aCe8i6op1uo;!n6u;coln,dholm;fe7n0Qr6w0J;oy;bv6v6;re;mmy,rs5u;aBennedy,imuAle0Lo8u7wo6;k,n;mar,znets4;bay6vacs;asY;ra;hn,rl9to,ur,zl4;aAen9ha3imen1o6u3;h6nYu3;an6ns2;ss2;ki0Es5;cks2nsse0D;glesi9ke8noue,shik7to,vano6;u,v;awa;da;as;aBe8itchcock,o7u6;!a3b0ghNynh;a3ffmann,rvat;mingw7nde6rN;rs2;ay;ns5rrQs7y6;asDes;an4hi6;moJ;a9il,o8r7u6;o,tierr1;ayli3ub0;m1nzal1;nd6o,rcia;hi;erAis9lor8o7uj6;ita;st0urni0;es;ch0;nand1;d7insteHsposi6vaL;to;is2wards;aCeBi9omin8u6;bo6rand;is;gu1;az,mitr4;ov;lgado,vi;nkula,rw7vi6;es,s;in;aFhBlarkAo6;h5l6op0rbyn,x;em7li6;ns;an;!e;an8e7iu,o6ristens5u3we;i,ng,u3w,y;!n,on6u3;!g;mpb7rt0st6;ro;ell;aBe8ha3lanco,oyko,r6yrne;ooks,yant;ng;ck7ethov5nnett;en;er,ham;ch,h8iley,rn6;es,i0;er;k,ng;dDl9nd6;ers6rA;en,on,s2;on;eks7iy8var1;ez;ej6;ev;ams",MaleName:"true¦0:CD;1:BK;2:C1;3:BS;4:B4;5:BY;6:AS;7:9U;8:BC;9:AW;A:AN;aB3bA7c96d86e7Ff6Xg6Fh5Vi5Hj4Kk4Al3Qm2On2Do27p21qu1Zr1As0Qt06u05v00wNxavi3yGzB;aBor0;cBh8Hne;hCkB;!aB0;ar50eAZ;ass2i,oCuB;sDu24;nEsDusB;oBsC;uf;ef;at0g;aJeHiCoByaAO;lfgang,odrow;lBn1N;bDey,frBIlB;aA4iB;am,e,s;e88ur;i,nde7sB;!l6t1;de,lCrr5yB;l1ne;lBt3;a92y;aEern1iB;cCha0nceBrg9Ava0;!nt;ente,t59;lentin48n8Xughn;lyss4Lsm0;aTeOhKiIoErCyB;!l3ro8s1;av9PeBist0oy,um0;nt9Hv53y;bDd7WmBny;!as,mBoharu;aAXie,y;i82y;mBt9;!my,othy;adDeoCia7ComB;!as;!do7L;!de9;dErB;en8GrB;an8FeBy;ll,n8E;!dy;dgh,ic9Snn3req,ts44;aRcotPeNhJiHoFpenc3tBur1Nylve8Gzym1;anDeBua7A;f0phAEvBwa79;e56ie;!islaw,l6;lom1nA2uB;leyma8ta;dBl7Im1;!n6;aDeB;lBrm0;d1t1;h6Rne,qu0Tun,wn,y8;aBbasti0k1Wl40rg3Zth,ymo9H;m9n;!tB;!ie,y;lCmBnti20q4Hul;!mAu4;ik,vato6U;aVeRhe91iNoFuCyB;an,ou;b6KdCf9pe6PssB;!elAH;ol2Ty;an,bHcGdFel,geEh0landA8meo,nDry,sCyB;!ce;coe,s;!a94nA;l3Jr;e4Qg3n6olfo,ri68;co,ky;bAe9U;cBl6;ar5Oc5NhCkBo;!ey,ie,y;a85ie;gCid,ub5x,yBza;ansh,nS;g8WiB;na8Ss;ch5Yfa4lDmCndBpha4sh6Uul,ymo70;al9Yol2By;i9Ion;f,ph;ent2inB;cy,t1;aFeDhilCier62ol,reB;st1;!ip,lip;d9Brcy,tB;ar,e2V;b3Sdra6Ft44ul;ctav2Vliv3m96rFsCtBum8Uw5;is,to;aCc8SvB;al52;ma;i,l49vJ;athJeHiDoB;aBel,l0ma0r2X;h,m;cCg4i3IkB;h6Uola;hol5XkBol5X;!ol5W;al,d,il,ls1vB;il50;anBy;!a4i4;aWeTiKoFuCyB;l21r1;hamCr5ZstaB;fa,p4G;ed,mF;dibo,e,hamDis1XntCsBussa;es,he;e,y;ad,ed,mB;ad,ed;cGgu4kElDnCtchB;!e7;a78ik;house,o03t1;e,olB;aj;ah,hBk6;a4eB;al,l;hClv2rB;le,ri7v2;di,met;ck,hNlLmOrHs1tDuricCxB;!imilian8Cwe7;e,io;eo,hCi52tB;!eo,hew,ia;eBis;us,w;cDio,k86lCqu6Gsha7tBv2;i2Hy;in,on;!el,oKus;achBcolm,ik;ai,y;amBdi,moud;adB;ou;aReNiMlo2RoIuCyB;le,nd1;cEiDkBth3;aBe;!s;gi,s;as,iaB;no;g0nn6RrenDuBwe7;!iB;e,s;!zo;am,on4;a7Bevi,la4SnDoBst3vi;!nB;!a60el;!ny;mCnBr67ur4Twr4T;ce,d1;ar,o4N;aIeDhaled,iBrist4Vu48y3B;er0p,rB;by,k,ollos;en0iEnBrmit,v2;!dCnBt5C;e0Yy;a7ri4N;r,th;na68rBthem;im,l;aYeQiOoDuB;an,liBst2;an,o,us;aqu2eJhnInGrEsB;eChBi7Bue;!ua;!ph;dBge;an,i,on;!aBny;h,s,th4X;!ath4Wie,nA;!l,sBy;ph;an,e,mB;!mA;d,ffGrDsB;sBus;!e;a5JemCmai8oBry;me,ni0O;i6Uy;!e58rB;ey,y;cHd5kGmFrDsCvi3yB;!d5s1;on,p3;ed,od,rBv4M;e4Zod;al,es,is1;e,ob,ub;k,ob,quB;es;aNbrahMchika,gKkeJlija,nuIrGsDtBv0;ai,sB;uki;aBha0i6Fma4sac;ac,iaB;h,s;a,vinBw2;!g;k,nngu52;!r;nacBor;io;im;in,n;aJeFina4VoDuByd56;be25gBmber4CsD;h,o;m3ra33sBwa3X;se2;aDctCitCn4ErB;be20m0;or;th;bKlJmza,nIo,rDsCyB;a43d5;an,s0;lEo4FrDuBv6;hi40ki,tB;a,o;is1y;an,ey;k,s;!im;ib;aQeMiLlenKoIrEuB;illerCsB;!tavo;mo;aDegBov3;!g,orB;io,y;dy,h57nt;nzaBrd1;lo;!n;lbe4Qno,ovan4R;ne,oDrB;aBry;ld,rd4U;ffr6rge;bri4l5rBv2;la1Zr3Eth,y;aReNiLlJorr0IrB;anDedBitz;!dAeBri24;ri23;cDkB;!ie,lB;in,yn;esJisB;!co,zek;etch3oB;yd;d4lBonn;ip;deriDliCng,rnB;an01;pe,x;co;bi0di;arZdUfrTit0lNmGnFo2rCsteb0th0uge8vBym5zra;an,ere2V;gi,iCnBrol,v2w2;est45ie;c07k;och,rique,zo;aGerFiCmB;aFe2P;lCrB;!h0;!io;s1y;nu4;be09d1iEliDmCt1viBwood;n,s;er,o;ot1Ts;!as,j43sB;ha;a2en;!dAg32mEuCwB;a25in;arB;do;o0Su0S;l,nB;est;aYeOiLoErDuCwByl0;ay8ight;a8dl6nc0st2;ag0ew;minFnDri0ugCyB;le;!l03;!a29nBov0;e7ie,y;go,icB;!k;armuCeBll1on,rk;go;id;anIj0lbeHmetri9nFon,rEsDvCwBxt3;ay8ey;en,in;hawn,mo08;ek,ri0F;is,nBv3;is,y;rt;!dB;re;lKmInHrDvB;e,iB;!d;en,iDne7rByl;eBin,yl;l2Vn;n,o,us;!e,i4ny;iBon;an,en,on;e,lB;as;a06e04hWiar0lLoGrEuCyrB;il,us;rtB;!is;aBistobal;ig;dy,lEnCrB;ey,neli9y;or,rB;ad;by,e,in,l2t1;aGeDiByI;fBnt;fo0Ct1;meCt9velaB;nd;nt;rDuCyB;!t1;de;enB;ce;aFeErisCuB;ck;!tB;i0oph3;st3;d,rlBs;eBie;s,y;cBdric,s11;il;lEmer1rB;ey,lCro7y;ll;!os,t1;eb,v2;ar02eUilTlaSoPrCuByr1;ddy,rtI;aJeEiDuCyB;an,ce,on;ce,no;an,ce;nCtB;!t;dCtB;!on;an,on;dCndB;en,on;!foBl6y;rd;bCrByd;is;!by;i8ke;al,lA;nFrBshoi;at,nCtB;!r10;aBie;rd0S;!edict,iCjam2nA;ie,y;to;n6rBt;eBy;tt;ey;ar0Xb0Nd0Jgust2hm0Gid5ja0ElZmXnPputsiOrFsaEuCveBya0ziz;ry;gust9st2;us;hi;aIchHi4jun,maFnDon,tBy0;hBu06;ur;av,oB;ld;an,nd0A;el;ie;ta;aq;dGgel05tB;hoEoB;i8nB;!i02y;ne;ny;reBy;!as,s,w;ir,mBos;ar;an,beOd5eIfFi,lEonDphonHt1vB;aMin;on;so,zo;an,en;onCrB;edP;so;c,jaEksandDssaExB;!and3;er;ar,er;ndB;ro;rtH;ni;en;ad,eB;d,t;in;aColfBri0vik;!o;mBn;!a;dFeEraCuB;!bakr,lfazl;hBm;am;!l;allEel,oulaye,ulB;!lCrahm0;an;ah,o;ah;av,on",MaleAdjective:"true¦0:032;1:034;2:020;3:02T;4:014;5:024;6:038;7:039;8:01V;9:02N;A:01A;B:02H;C:UA;D:02X;E:02D;F:00K;G:022;H:YT;I:031;J:Z5;K:02R;L:00A;aY2bW3cRIdNXeLFfJMgIHhHWiEYjESlE7mC8nBJoAOp7Squ7Rr5Js3Ht2Bu24v11zé10â011éMô4;b0Wc0Ld0Kg0Ihon4l0Cm08n07oYFp03qu01r00tSvM;aPeNiHAoM;ca003l9;il5ntM;ré,uGé;c9nMpo2s034;es027o014;aSeRhQinceEoOrMudi3;angMiq9oK;er,l02R;fYOi5nn3uM;fUVrYM;iopiFé2;i0rnG;b01Rgé;a01Bein4o02EudK;ar016iM;disClNRvaRY;aOerQ4iNlo2ouMrouv3uis3;stoufEvML;cé,scop1;no00Prp015ta0;amou2erv3;aOiGUoMu,écH;ti6BuM;s7va0;cJil5nciZB;aQePimOoNu,éM;ga0vaZD;ig6qSB;i6é;ct9Bvé;bo2nXF;aMrilVQypTY;l,ré;en4ifZFuc01D;aVerUhSlaRoOrNuM;lé,ma0;as3it;euIrNuM;lé,r4;cHné;boI2ir3t3;aMeN;nc2pYT;ve5;il5rtQ3;aNerl9l4LouMrécH;illLSrifXM;hi,ucH;b2lé;a0Ie09iYoRrai,u,éMê02B;cu,gétaPhéme0nNrM;ifJo5;al,iMérHZ;el,tiF;l,riFt8;cRiQlOt8uNyaMû4;geBnt;lu,é;aMeBé;nt,tHP;lé,sA;al,i9J;bIcVdé,eTf,giElSnd4SolRrQsPtNvM;a0ifYL;aMré;l,mi6;cTTsé,uGé;al,g01Qil,tuGuQI;aWDeU9;!aA;illMtnamiF;i01Fot;eULtoZ1;in0WlTnQrMspTMuf,x3;b1dOmNnFTrZLsé,tM;!-de-gNEic1ébr1;eH8ouSW;i,oWC;dNgeBtMu;i5ru;u,éF;ou4u;cQgPiNll01FntaVIrJuM;dY2t2;lEnM;!cu;aHEin1;a0haVDilE;kraiW9lQniPrOsNtM;iYOérA;aYGuGé;baAge0;!latT3versG;cé2tM;raviolYTérX7;a0Me0Gh0Fi0Co04rQuOyroVQâtUUéMê011;léMnu,t86;pho6vi7;!a0méfJniSTrMé;buPMc,gZH;aTemRiPoNuq9éM;buY3pi00O;mp004nq9pX4uM;bl3vé,é;b1cYNmestESomphaMvi1;l,nt;blMpé;a0oCé;ceBdZEhi,itVZnOpNumatiDvaillZYîM;na0tA3;u,ézoïd1;ch3quilliDsM;cVZi,pMvers1;aYQlJX;caUMléImb3nSquRrPscYNt1uM;ch3ffu,lousaArMt-puWC;ang4RbillU9mL2nM;a0oV8é;dUBrQAtuM;!r3;aUGé;du,itrR7na0;béRDg2mNntinnabuEré,ssTDtM;ré,uba0;b2o2;e71éâWY;i0mpQnPrMutWRxYB;m002ni,rM;iMoLX;en,fi3toNI;du,taPKu;or76é2;bWPil5mi7nPpOquArNs7tM;illWKo9;abisco4d8i,é;ageBé;ge0né;a17c15e0Zi0SnobiS0o0Lp0Ht0BuSyPéMûr;dMlectiURmZRpa2roposVN;at8uM;cW7i1A;mpathiDnMriF;coW1diM;c1q9;a0b01cZd-XffWggeN0iVjXFpRrNspeM;ct,nMJ;aObaDTdévelJXfaKge5huF9me6naturGpNvM;iva0ol4;eup5reU0;igu,n6;erNpMérVN;lW5o7;fMpo7;iUXlu;ciYHnCvi;iDoca0;aMc7E;fVYméVY;cMeBré;eX6uNY;conscOUit,jePUlimZ5merWIordZ9sNtEWurbaAveM;nP6rs8;tanP3éqOK;aQimuEomac1rOupéfNy5érM;iWLéotyVF;aKia0;esDiMucUT;ct,de0é;biWHliU1ndardi7;aSRecVQiriP2oOécM;iMulXK;alWMfJ;n8Art8;ci1ign3leXNmnoNKnRphistUWrCt,uM;dé,fOleXUrNs93teMveO5;nu,rO4;d,ia0;fMré;lé,ra0;geBn3;bRciTDdEMgnPmNnMt9;guV4i5V;plWDulM;ta6é;a5ifiMé;a0cX5;yMSéVV;cQigneuLWmpiOAnNrMul,xuGya0;eApeR0ré,vi;sNtiM;!meOP;atX4it8oCDuGé;!oVOrW3;andaVSel5intXHulptMélérWT;ur1é;b5cZhaVMiWlVngTouSrrasAtPuNvMxUU;a0oyaSC;greRTtM;ilEé;a6iMu2;né,sfaiM;sa0t;diFl;la0uinM;!oMP;i6Fé;gSElEnNsM;iXNonPQ;!t;caWYerdot1rM;ifJo-sai0é;a1De0Ki0Ho09u06ythX6âU4éMêvX3ôUQ;a04barbWEc02duKel,f01gZjYn1pUsRtOusP0vM;olMélNC;t3u;iNrM;ospeOAéGY;ce0f;erWMiMoOY;dMg6sC;enNHuG;aOuNétM;it8é;bliVKgRXté;nKCraTV;ouiX5;lé,ulMéIW;aTSiL;lécG9orWPrigér3ugJ;alcitIeMhaufSJonforCurVI;nt,pt8;ct8li7;bicoUKgT3iNr1sMtiE;taLQé;né,sseE;mRnQtVRuMy1;couEgNl3maAquAsOCtiM;er,niL;eMisD;aLKoRU;d,fEgeBrQT;aMpu;in,n;a0caNdé,golMngaR1sq9tuGv1;aR0o;in,na0;b0Dc06do05f04je4l01m00nZpVsRtPvMçu;enMu,êWT;dMu;icVD;arVTenMi2rous7;tSKu;caSZpOseNtM;a0rei0;mbEnTJr2;eUXlendSG;entOlUBoNrMtiR9u;odK4ésentTO;sa0usD;a0i;aSBcont2du,omVTtIvLI;pUUua0;aMeVEié,uiDâcHég9;tiMxa0;f,oV4;aKou5roiSBu7;nW3ub5;hercHoOrNuM;eilUNit,lé;oquevU7u;mmV8nNuM;rG2veKK;nMstitN0;aRYu;atW2onR9uC;b00cZdiYfXgWilQ0mVnTpRsPtOvNyM;onQGé;agV9iVP;aAXioUQé;a0sM;asJuI;ide,pM;or4rocH;cMgé;i,uNL;as7ifJolU6pa0;eBoûC;fi6raîchRK;al,c1n,oaMA;i1oPM;atVMelaiNHougTI;alNAiTCotiSG;a1Te1Kh1Ii1Gl14o0QrXuSyramid1âlD6éM;cTEda0jLYnPriUWtM;aNilErMuEé;ifJoRY;nt,raV9;aMétI;l,rd;a0bPcOdiBHisDni,rMtasNAérB1;!iMpurAuK1;ficaRQtaA;eau;iFlic;e0Ci07oUuTéMêtQJ;cQdesA6fPmOnat1oc7Epo7sNtenI3vMétabTM;eOSoPZ;e0idL1uUI;aGAédi4;abrR4é2;iMé8N;pi4té;de0sMV;ba0chaAduXfWgramUChiEWlVmUnonPKpSsRtPuTZvMémi8Q;enç1iNoM;ca0q9;dKSnR3;eMubéIéS5;cR9sC;crKt2;oMrSJ;rKQsé;etR5pt,u;i29onRZétaS2;essTFoS0;ctIPit;mPnNsM6vM;at8ilégJé;ciMtaMD;er,p1;it8ordi1é;miLna0ssM;a0enRDé;cHiXlVmp01nUrtTsPtNuM;d2rS6ssTX;agLeM;lé,nK9;it8sOtMé;al,éM;!rQE;eS5éTB;at8eBoQU;cK9dé2tifQG;iMynéM0;!cOBssQPtiRA;gOJlu,ntMv2;eBu,é;aTeQiPoOuIVéM;bMniL;éiF;mDVnS8;a0s7;in,urM;a0nichM;aNYeB;cé,iOnNq9tM;!i6;!a0q9té;nt8sa0;afL5caNTmMqu3voCétQA;en4pa0;ilippAosphorS7énM;iQSomén1;ct01inTlé,nSrNsMtKup5;a0tilJG;cuCdu,forPlé,ma7ApéJMsNtMverQGçNG;i79urDF;an,isCoS9uaFJéM;cu4véI;a0ma0é;aHXcHdu,sa0tu;aNHt;i08lpiCn07rXsRtNuSPvé,yMïF;a0sRGé;aHTeOie0rM;iMon1;arc1ciF;ntOIrnG;sNtM;or1;aOiMé;f,onnM;a0el,é;gLnt;aTcheFYeSfRiQl3oissi1tMveMMé;aOiM;al,cMel,sR3;iP5uPE;gé,nt;gAHsiF;aKuS7;il,ntLH;dox1guayFlys3noM;rm1;su,teEé;ll1Sr;b0Cc09dor07ff05is8lfaJAm04nd03pYrRsé,ttomQTuMxygé6;a4blJtOvM;eH1rM;aPViL;il5rM;aQTecuiSCé;aRbI7cheQdPgOiMné,phelA;eAEginM;al,el;ani7;on6u7E;st2;l,nPM;alApNt4UuH0érM;atR1é;oNrM;esDiRL;r4Dsé;oMZul3;b0Gniprése0;ensMiNMra0usq9;a0if,é;a0iM;féI;cMtogFH;asQQiMup3;deI9pHN;jeIJlOsMéNS;cBeMti6éd3;rQVssQM;igJGong;a01e00iZoPuOéM;!gMvro7;at8liP1;!anMBlKNméro4pLItrNJ;c8irUmSnchaErOté,uMvaO4yé;rriMé;!ciLsD;d-NmaMvéJT;l,nd;afO7cM;oréF;inaMmé;l,t8;!aFZci;cke5ppO0;stoORt,urEV;c2iTpolSrrPZsRtPuNvMzi,ïf;al,r3;fMséa7F;raOK;al,iMurG;f,on1;al,ilK4;iI9éoM7;n,sD;a12e0Ui0Mo02uVéNûrM;!isD;cSdNfNQl47nagLpriDriMtropoliI5;diEIta0;iMu7;aOcNtMév1;at8erranéF;al,in1o-lég1;n,teB;ha0onH1;et,gMPltiRnicip1rQsOtM;a0iMuG;lé,n;c5icMq9ulmOW;al,iF;al,muI;na2FplJ;biN4d04i02llOEm00nVqueBrStRuMyF;chPil5lOra0sNtKFvM;a0emB7;su,tacES;a0u,é;aKMe4;eBiPHoCA;al,dNf1i6KmN1tM;!-6el,ifN3;a0o2u;dPgolOopareGOtMuGN;aMé;gIGnt;!iF;aAi1;enMifJ;ta6;ndMré,si;re;ifJé2;gQliCnOroNtM;oyFé;boEiC;eBiMér1;er,m1sté3Z;nMraMD;aK1onM;!nNN;ilJUnPsOuMxiNY;b5rtriMsiF;!er;quAu2;aOsNtMu;al,eB;ongLtruGuG;cé,ça0;boul,chPKg02igr01jeBlXmeGZnUrQsPtNudKîtrM;e,i7;eFFin1riMutPIé3L;ciGmoni1;culAq9s8;b2chaMUgPFiOoNLqu3ra0tM;iMyr;al,en;t1é;ié2qu3uM;el,sM;crK;aNfJ1in,oMsaAveOH;doIuA;dMi7;if,roK;elMYichLS;isLXyar;aZeYiToPuOâcHéM;cHgMn16zarO7;al,er,islNP;!brGRcrNOiDminNMst2théMFxurLQ;calMQinG4mbaJ5nNrECti,uMy1;rdDHé;doK0gM;!itudOV;bOgo4mNp18tMé;tGVuaJX;i4ousA;ertAidORérM;a3Mé;nt,vé;bi1cRiQnPq9rOsNtMvé,xND;e0in,ér1;c8sa0;g9moJH;ciJ3guKI;d,tiL;rym1é2;aQePoNuM;biEif,ré;i0li,ncHuMvi1;eBffFTiMErnaKYé;té,unM7;casDillKAuniO5;di60gnor3ll2Hm1TnRrOsNtM;aJ2inéI;o5raéJ1su;aJCi7rM;atN1iCéM;el,guKQsoFL;a1Hc16d0Ye0Tf0Mg0Lh0Ki0HjustFXn0Go0Cqui0Bs02tRuQvNéM;dKg1;aincu,estiNiMé1I;o5t3;!gaKJ;si4tiLK;aNWePo87rOuJVéM;gr5ZrM;eKJieB;ansiM9i5T;llRmpeBAnQrMstinGM;allJcontineE8dKlB0mitE3nNpo7roM;gMIm07;aMé;tiBB;s8tiNU;ecDViB2;atisfaKcrKen7iSoQpir3tNuM;ffiDlC;antNinEBruM;ct8it;!a6;le0uM;cK9pçNM;gnMnEGsC;ifK7;et,siAWéC;cOffeDPnMKpMuï;porMéI;tun;cuJP;oM0é;ntMti1;erromMéresD;pu;abitCDos1Lu2WéLG;rLQéGU;aKQeRiniPlCLoMérJC;nM9rM;mMtu6;aIIel,é;!tésM;im1;ctICrn1;mploIWxM;aMTisCpM;lMreKVérim7K;iq9oM;i4ré;iPoOuNéM;ce0fi82pI9ter9S;!lA3st0T;-eurALle0;caJ6en,fféKYgOq9reMLsMviduG;cMtinMK;i9VrKG;e0né;aUeThSiRli6oMurLN;héKTmplKDnM;dLBg9Nnu,sNtMveH1;i0Brô5;cC5iMo5;dé2sC;de0s8;anJQ;ndJrDIsD;ndKYrM;cé2né;cQdPlOniLPpNrticu5ssouHMttenMvo9;du,t8;erçu,proprJ;té2;ap4éKP;heL7t8;ag08b07i4m00pM;aXerVlUoSrOuNérM;at8i1;de0isDls8r;essiFVoOuNéM;g6vu;de0;duCLmpLZvi7;ll9rtMs3te0;a0un,é;an4oI;soKNtiM;ne0;ir,rMtBFyé;faKti1;aQerJ1iPoNéM;diK8mo95ri4;biI6dé2rM;al,tG;g2ne0;cu5téM;riG;i5Hu;inK5é;imi4uMég1;mi6st2;aZeXiWoRuPydraCâOéMôteHX;bé4rMsiCtérU;is7;lé,t8;i5mMpHNrE;aAili3;llywooI5mPrNsM;pitaHQ;izoBJm8PriM;fJpiE;oseER;laIndHUtléIIvern1;rMur4xag8L;bu,culéF;biPcHgaF6lOnNrMuC5;aHKceEdi,n4R;dicaHBté;eCluc5D;lNtM;uKDé;i4lé;a0Ke0Hi0Fl0Co09rWuQâ4éMên3;a0mGPnMorD1;iNéraM;l,teB;al,t1;erQiMtGHéIM;llNnM;dé,éF;erIEoM;ti6;riL;aUeTiPoMéco-ro07;ndeBssiNuM;ilEpé;er,sD;ffDJllOmNnIHsM;a0onEVé;aIFpa0;aHNé;c,lotCnu;is7mmatGLndNssoui6TtuKvM;e,itatJ1é;!iM;loq9MsD;gueCCnNuM;aE4drK7lu,rHHverneAG;do5fl3;aNisDoMua0;usD;cé,pFX;rondMtI6v2;!in;igC4ntNrMsticuE;maA;il;gn3iQlOmAn4rMuf2;antCKdMni;iFé;a0bé,oM;n6pa0;!lCO;a14e0Zi0Ul0Ko08rXuQâcHéMê5;cOdNlAmMod1ru;inAor1;ér1L;al,oGY;gRlQm3rOsNtMya0;ur,é;e5il5;eFXiMt8;boGT;guImiDW;it8ueB;aUeTiRoOuNéMôDD;mF8quentEOtIJ;g1itDJst2;iNnMufrouC;cé,taFR;d,s7;aGKgorAXn12pé,q9sM;sD0é;la4uG1;cMgm3Rnco-aFRpp3te8Z;aFNtu2;c1et1llGUnTrOuM;!droDVisseBrMtu;bu,c79ni,ré;aAcPesBBmOtM;ifJuM;it,né;el,u5é;e6é;cOdM;aMé;ment,nt,teB;iLtHJé;aQePi9YoNuMâneBécH;et,orHAvi1;rMtCu;al,eB8isD;mmaCRuGJ;gOmMpi,tF1;aFXbM;a0oDD;eMra0;l5oE;cPer,gOli1nMsc1xé;!aMiI6;l,nciL;urFJé;e5hu,t8;i0n58rOsA9uM;illMt2;e4u;mMré,ve0;en4é;ci1go4iUlTmRnQrPsciCNtNuMvoG3;bouFJcHt8;al,igM;a0ué;ci,fe9F;farENé;iliMé;al,er;ot;nBNsH0t;ff1Wm1In0Drr0Cs07ur5QxM;a04c00eZiXorbiCpRtNuM;béIlC;erminaE9raNéM;nu3rDY;conjug1vaM;ga0;a7Ye65lPo7reFNul7éM;dDIrimeM;ntM;al,é;icG8oM;i4raE0s8;gMlé,sC;ea0u;mpt,rC3;eNit3luM;!s8;l64ptMss8;ioG6é;cMgé2lt3spéI;er19t;carDMpaPsNtM;iv1omDLudia9U;eMouff5;n75u5;cé,gnol;a0o6;c0Kd0Ef0Ag08ivIj07l06n04rZsVtOvM;a01elopp3iMoûC;rAWsaED;aF2eRiLou2rMurXêt3;'oPaOeMoP;bâF0couDBlaBLpMteAM;o7reBF;nt,vé,î6;uve5C;n3Sr2;aOeNoM;leEUmmeEUrce5;igB9veF8;b5ngl06;aPegistB1huG4icOoNuM;ban6;bé,ué;hiGE;ci6gé;eMuCI;iDVmi;eFKu3I;o9ôAI;ag84l9oM;rDRurCH;a90erFTiOlNoMuFT;nB0ui;amFRé;lé,év2;euECiOoNurM;ci;loE6mmaDKrmi;aMma1P;b5mM;an4;aQhOlNoMr44u5;mbr3uraEF;e1Kin;aMevêt2;ntFCî6;is7st2;bSmRpM;aOe7ier2loBVoNrMâ4êt2;es7isFZun4;r4ussié2;il5nMq21;acH;erd7Dito8Wu2ê5;aRouPrNuMêC;sq9é;asMouDRuF4;sé,é;cHrM;bé;l5rraC6;aPeOiNlanq9ond2rM;ay3on4é6;c56lé;ct8rvE3;cé,rM;a0oMé;ucH;a34e2Xi21o1Vr1Tu1RéMû;b1Nc19dica9Zf11g0Vha0Ul0Rm0Ln0Jp09r06sVtQvMçu;ast4YeNoM;lu,ra0t,ué,yé;lMrgonEE;opBL;aPeMo4Eraq9;nNrmM;in3;du,teBu;cHil5;aVeUhTiRoOuNéquilM;ib2;et,ni;bliDBeuv2l3piErM;dF1iM;en4;g6nMré;car6téres7;abCWonoIydra4éri4;mpa2rtA6spé2;bu7ffec4pprobaB9rE7;aNiDToMég5;bé,uC;ci6ng6D;aTeRlPoNrM;aDPeCMim3;itraCOli,r4uM;il5rvu;aMoAI;cé,iD;i0nMup5;aCJda0;rMs7;eCHte4R;aMuDJ;tu2;eOoNuM;ni;dé,n4raBT;ntMsu2;!iM;!el;aNiM;bé2cCPnq53ra0é;b2is7vé;ncH;aBEingD6ling9oPrOuNéM;né2;enC2i7;ad3os59;nf5uMût3;li8Fr9ZtC;aQenPiNoMraîcC7u0éC5;n8Irm3;c3Igu2niM;!t8;du,s8;iNvoM;ri7;lEt;aYeXhTiSla2oOrMulot4éCT;iMo9KépK;t,é;lOmpo7nNrASuM;pé,rag58su,ve21;cerCtrac4;le4o2;dé,s8;aOiMu;qMr3;ue4;r6us7î6;nt,va0;de0lé;aNorD5rMuC;aBBiCE;rq9ucH;bitBVc1rMve4;!ci;aco88es7oMu;g9it;du,le0mPn6rOté,uM;a4Xb5iMé;llAU;ma0s1é;inMp4;a2Iic1;a0Fcta0Dffér0Cg0Al08m07plôCCr06sPt,vM;erNiMor7J;n,sé;ge0t8R;cZgracJjoi0lYpWqual4KsStM;a0enQinOrM;aMib9;it,ya0;ctMg9;!if;du;iOolNéM;mi6;u,va0;de0mul26pé;aMer7o7ropor2Ju4;ru;oq9;iNoMrA8;nti62rC9;pli6;ect11ig40;ensB4in9;a4iM;ge0;eMit1;st8;e0é;toM;ri1;gMma4P;on1;mRntQr3WsM;cOsa5tM;i6rM;uc8F;enBSript8;e5é;eu2i;ctylogra6Wlto6XmMnD;as7né;a3Le3Hh2Vi2Sl2Ko07rTuOyclNâlAéréMô45;a8Abr1;opéF;baAiNltMrADta6;iAQurG;rNsMt,v2;a0i6;as7;aXiVoRuPéM;atNne5pM;iCu;eBif;!ciMel;al,fJ;cOisNq2Ct4uMya0;la0stAL;sa0é;hu;a5GminGstaM;llA;int8moi2IquM;a0e5;c1Xdé,gn71hé9Fi1Wl1Rm1Cn00opér9UquZrSsQté,uM;cHl4Ip3rNsu,tumiLveM;rt;bé,on6tMu;!aN;su,taM;ud;di1n44pPrMsé,t7BéF;eMi8Aos8;ctMsponAS;!eBio9Q;orNuM;le0;at8el;et,in;!c0Td0Rf0Kg0Hj0Gnu,quéIs05tTvMçu;aReNiMulsAB;vi1;nNrM;ge0ti;tMu;io9FuG;inc4Jl96;eTiRoQrM;aNit,ovM;er7;ctMi0ri3s4;uGé;ur6;gu,nM;e0Pge0uG;mpNnM;t,u;l8XoM;raA;ac2cVeTiSolQtOéM;cut8qM;ue0;a0ern3ituMru0S;a0t8Wé;aMi97;nt,teB;g6sC;nCrvM;a6Fé;ie0;oi0ug1;eNénM;it1;lé,sU;iPlicXond3RrM;aMon4;teM;rnG;a0dMné,r93sq9t;enM;tiG;am6iMuc62;ti9N;eNil69l0Hor9Er7CuM;pis87r7R;nt2pMr4;tuG;bZmVpMé6C;aTen7lSoPrNuls8éM;te0;es7i8RometCéheM;ns8;rteMs3;meM;nt1;aiDet,iq9;ct,r6Ds7t53;an8AeNun1VémM;or7S;n76rM;ci1ça0;atCi6lé;lNoM;ni1ré,ss1;aNeMégi1;ct8;nt,t0X;!f45n3I;ardiLh5Hu;aQiPoNéM;me0r54;is8UuMît2;té,é;gnoCma45nqNqueC;irNndestAqMs7;ua0;!on34se81;nNrconspe8Hse5tMvil6C;adAé;gl3t2;aYeViToQréPuchoCâNéM;ri,t8;taA;ta0;tiF;cola4iNqu3r1uMyé;ca2I;si;a0ffMliFrurg4M;on6ré;nu,rNveM;lu;!c63;grAm1UnSpeau4rOs7to30uM;d,fMs7;fa0;bOgé,mNnM;el,u;a0eB;onU;ceEgMta0;ea0é;nOrM;né,tMv47;ifJ;d2sé,tr1;botAch04de03l02mYnne5outchou4pWrOsMtal5ZuDva4B;aMq9s3till5Y;niL;aRcQd7OesDiPmi6nNré,téM;siF;asMé;siL;ca3Et69;ér1;ctériMmé52;el,sé;itMt8;al,on6;bNpagMé;na1K;odMré;giF;ci6ifor2Eé;n1Xt;otMé;tiL;a14e10i0Sl0Mo07rVuUyzaTâRéNêM;c53ta;aOdouAga20nMt78;iMédictA;n,t;nt,t;cHtM;a16i;ntA;cc1ri6té;aUeTiSoPuMési1Oûl3;isDnNtMya0;!al;!i;cHdé,nzé,uMyé;illMteB;on,é;dé,lEnguebaEsa0;ss4Wt3Cve4;ilNnM;cHla0;la0S;i7mbZnXr6ssWt4uMvA;cUdTffSillRlQrMs4Mt6N;d0Eguign36rOsM;iLoM;uf5;u,é;evers3ot;a0i,on0W;a0eBi,on;eBi6;hé,lé;e5u;!dMna0F;isDé;ar5Cé;aPeNin5BoM;nd,q9t34;ss3t,uM;!i,té;fa08ncMsé;!hi5T;enQgPrm47sM;corNeM;xuG;nu;ar2;-ai5AfNsMve53;éa0;aiD;auOdNlligéIrceBsMur2;ti1;on08;!cer2C;fo9gZlVnTptism1rRsQtMvaU;aNtM;a0u;ilM;leB;a6é;bMio5ré;a0e5ou3Ju;c1d3lieusaMni;rd;aOeinNlMza2M;a0on6;iLé;deBnY;arMué;reB;b4Sc43d3Qf3Cg33hu32i2Xj2Vl2Bm22n1Cp12r0Qs0Ct00uWvOzu2érMî6;iFoMé;nav1por4;aRePiOoMé2;isiMr4ué;na0;l0Zné,sé;nMr20ugE;a0tu2;c3AnMrJ;cé;d0Sr21straOtMvergn3H;oMrichiF;colEma0Bri7;liF;héWroVtM;aTePiOrMén9;aMib9;ya0;ra0t2;i0nM;dNtiM;f,on6;r0Iu;b5cHr3P;phJ;niF;cYeWo0QpVsNtrM;al,ei0;assinSerRiQoMu2y1U;cJifOm1Zr1DuM;pi,rM;di44;fé;du,mi5s4é1M;vi;!é;hyxJir3;pMx9;ti7;en3Z;chitecWdVgentUméTq9rOtiMyF;cu5fiMsan1;ciG;aOiNoMê4;ga0n01sé;vé,é2;cHn29;hé;!niF;in,é;e0u;tur1;aiDeu2la0QpNérM;it8;a1YlSrOuNétM;isD;yé;oMê4;fonNprJu2Nxim29;ié;di;iq9;al,c09dal08esthés07g01imZkylo7nWoVtM;iOéM;diluviFrM;ieB;aé0ScOdéraNsoM;ci1;pa0;iNlérM;ic1;pé;dArm1;e5onciaNuM;el,lé;teB;aMé;liL;lo-NoiM;ss3;aNsaxM;on;méM;ri11;ia0;ou;esMiFré;tr1;aig0LbSer,iRorQpPuDéM;lio2riM;caAnM;diF;ou5u4;ti;!c1nci2D;iMré,uE;a0gu;a02c00eZgéXig6lRpAsaQtNvM;éo5;ernNiLé2;er;at8é;ciF;ePié,onOuNéM;cha0;mé,s8;gé;maM;nd;riF;en;r4xandrAz0B;alAooM;li7;ngNrM;ma0;ui;ouMus4;ré,té;gMlé,m3sé;rNuM;!i7;elMi;et;ri1J;aTenRi4oniDrePuM;erNicM;heB;ri;ss8;té;ouM;il5;ça0;fPghOriM;caA;in;an;aSeRilQliPol3rNéM;re0;ancMioE;hi;gea0;ié,é;ct0S;iMmé;bMré;li;dVhéTjaSmiQoOroKéM;quM;at;lMpt0L;esO;nistrMrM;at8;ce0;re0s8;if;itM;ioM;nnG;cWhRidu5tNé2;ré;iNuG;el;f,vé;lé;aNeM;vé;lMr6;anM;dé;abl3ent9identXoTrPuM;eMsé;ilE;la0;oMu;chMupi;eBé;ur;mNrt,utuM;mé;mo00pM;ag6li;el,é;ué;a02dom00erIjeXoVrRsNusM;if,é;e0oNtraK;it;lu,rb3;a0é;acadabIuM;pt,tiM;!sD;sa0;li,nM;da0;ct;ra0;nt;in1;al;is7ndNtM;tu;on6;né;sé",FemaleName:"true¦0:FV;1:FZ;2:FO;3:FA;4:F9;5:FP;6:EO;7:EM;8:EW;9:GC;A:G8;B:E2;C:G5;D:FL;E:FI;F:ED;aE0bD2cB5dAGe9Ef8Zg8Gh82i7Rj6Tk5Zl4Nm37n2So2Pp2Equ2Dr1Ns0Pt03ursu6vUwOyLzG;aJeHoG;e,la,ra;lGna;da,ma;da,ra;as7DeHol1SvG;et7onB6;le0sen3;an8endBLhiB1iG;lInG;if39niGo0;e,f38;a,helmi0lGma;a,ow;aLeIiG;ckCZviG;an9VenFY;da,l8Unus,rG;a,nGoniD1;a,iDB;leGnesEA;nDJrG;i1y;aSePhNiMoJrGu6y4;acG1iGu0E;c3na,sG;h9Lta;nHrG;a,i;i9Iya;a5IffaCFna,s5;al3eGomasi0;a,l8Fo6Xres1;g7To6WrHssG;!a,ie;eFi,ri9;bNliMmKnIrHs5tGwa0;ia0um;a,yn;iGya;a,ka,s5;a4e4iGmC9ra;!ka;a,t5;at5it5;a05carlet2Ye04hUiSkye,oQtMuHyG;bFHlvi1;e,sHzG;an2Tet7ie,y;anGi9;!a,e,nG;aEe;aIeG;fGl3DphG;an2;cF6r6;f3nGphi1;d4ia,ja,ya;er4lv3mon1nGobh74;dy;aKeGirlBKo0y6;ba,e0i6lIrG;iGrBOyl;!d6Z;ia,lBU;ki4nIrHu0w0yG;la,na;i,leAon,ron;a,da,ia,nGon;a,on;l5Yre0;bMdLi8lKmIndHrGs5vannaE;aEi0;ra,y;aGi4;nt5ra;lBMome;e,ie;in1ri0;a02eXhViToHuG;by,thBJ;bQcPlOnNsHwe0xG;an92ie,y;aHeGie,lC;ann9ll1marBEtB;!lGnn1;iGyn;e,nG;a,d7V;da,i,na;an8;hel53io;bin,erByn;a,cGkki,na,ta;helBXki;ea,iannDVoG;da,n12;an0bIgi0i0nGta,y0;aGee;!e,ta;a,eG;cAQkaE;chGe,i0mo0n5EquCBvDy0;aCAelGi8;!e,le;een2ia0;aMeLhJoIrG;iGudenAV;scil1Uyamva8;lly,rt3;ilome0oebe,ylG;is,lis;arl,ggy,nelope,r6t4;ige,m0Fn4Oo6rvaB9tHulG;a,et7in1;ricGsy,tA7;a,e,ia;ctav3deHfAUlGphAU;a,ga,iv3;l3t7;aQePiJoGy6;eHrG;aEeDma;ll1mi;aKcIkGla,na,s5ta;iGki;!ta;hoB0k8AolG;a,eBF;!mh;l7Rna,risF;dIi5OnHo23taG;li1s5;cy,et7;eAiCM;a01ckenz2eViLoIrignayani,uriBEyG;a,rG;a,na,tAQ;i4ll9WnG;a,iG;ca,ka,qB2;a,chOkaNlJmi,nIrGtzi;aGiam;!n8;a,dy,erva,h,n2;a,dIi9IlG;iGy;cent,e;red;!e6;ae6el3G;ag4JgKi,lHrG;edi60isFyl;an2iGliF;nGsAK;a,da;!an,han;b08c9Dd06e,g04i03l01nZrKtJuHv6Qx86yGz2;a,bell,ra;de,rG;a,eD;h73il8t2;a,cSgOiJjor2l6Gn2s5tIyG;!aGbe5PjaAlou;m,n9Q;a,ha,i0;!aIbAJeHja,lCna,sGt52;!a,ol,sa;!l06;!h,m,nG;!a,e,n1;arIeHie,oGr3Kueri7;!t;!ry;et3IiB;elGi5Zy;a,l1;dGon,ue6;akranBy;iGlo36;a,ka,n8;a,re,s2;daGg2;!l2W;alCd2elGge,isBEon0;eiAin1yn;el,le;a0Ie08iWoQuKyG;d3la,nG;!a,dHe9QnGsAO;!a,e9P;a,sAM;aAZcJelIiFlHna,pGz;e,iB;a,u;a,la;iGy;a2Ae,l25n8;is,l1GrHtt2uG;el6is1;aIeHi9na,rG;a6Yi9;lei,n1tB;!in1;aQbPd3lLnIsHv3zG;!a,be4Jet7z2;a,et7;a,dG;a,sGy;ay,ey,i,y;a,iaIlG;iGy;a8Ee;!n4E;b7Serty;!n5P;aNda,e0iLla,nKoIslAPtGx2;iGt2;c3t3;la,nGra;a,ie,o4;a,or1;a,gh,laG;!ni;!h,nG;a,d4e,n4L;cNdon7Ri6kes5na,rMtKurIvHxGy6;mi;ern1in3;a,eGie,yn;l,n;as5is5oG;nya,ya;a,isF;ey,ie,y;aZeUhadija,iMoLrIyG;lGra;a,ee,ie;istGy5A;a,en,iGy;!e,n46;ri,urtn98;aMerLl97mIrGzzy;a,stG;en,in;!berlG;eGi,y;e,y;a,stD;!na,ra;el6OiJlInHrG;a,i,ri;d4na;ey,i,l9Os2y;ra,s5;c8Ui5WlOma6nyakumari,rMss5KtJviByG;!e,lG;a,eG;e,i76;a5DeHhGi3NlCri0y;ar5Ber5Bie,leDr9Dy;!lyn71;a,en,iGl4Tyn;!ma,n30sF;ei70i,l2;a04eVilToMuG;anKdJliGst55;aHeGsF;!nAt0W;!n8V;i2Qy;a,iB;!anLcelCd5Uel6Zhan6HlJni,sHva0yG;a,ce;eGie;fi0lCph4W;eGie;en,n1;!a,e,n34;!i0ZlG;!i0Y;anLle0nIrHsG;i5Psi5P;i,ri;!a,el6Nif1QnG;a,et7iGy;!e,f1O;a,e70iHnG;a,e6ZiG;e,n1;cLd1mi,nHqueliAsmin2Svie4yAzG;min9;a9eHiG;ce,e,n1s;!lGsFt06;e,le;inHk2lCquelG;in1yn;da,ta;da,lPmNnMo0rLsHvaG;!na;aHiGob6S;do4;!belGdo4;!a,e,l2E;en1i0ma;a,di4es,gr5P;el8ogG;en1;a,eAia0o0se;aNeKilHoGyacin1M;ll2rten1G;aHdGlaH;a,egard;ry;ath0ViHlGnrietBrmiAst0V;en22ga;di;il73lKnJrGtt2yl73z6B;iGmo4Eri4F;etG;!te;aEnaE;ey,l2;aXeSiNlLold11rIwG;enGyne17;!dolC;acieHetGisel8;a,chD;!la;adys,enGor3yn1X;a,da,na;aJgi,lHna,ov70selG;a,e,le;da,liG;an;!n0;mYnIorgHrG;ald35i,m2Stru72;et7i0;a,eGna;s1Mvieve;briel3Fil,le,rnet,yle;aReOio0loMrG;anHe8iG;da,e8;!cG;esHiGoi0G;n1s3V;!ca;!rG;a,en43;lHrnG;!an8;ec3ic3;rHtiGy9;ma;ah,rah;d0FileDkBl00mUn49rRsMtLuKvG;aIelHiG;e,ta;in0Ayn;!ngel2H;geni1la,ni3R;h51ta;meral8peranJtG;eHhGrel6;er;l2Pr;za;iGma,nest29yn;cGka,n;a,ka;eJilImG;aGie,y;!liA;ee,i1y;lGrald;da,y;aTeRiMlLma,no4oJsIvG;a,iG;na,ra;a,ie;iGuiG;se;a,en,ie,y;a0c3da,nJsGzaH;aGe;!beG;th;!a,or;anor,nG;!a;in1na;en,iGna,wi0;e,th;aVeKiJoGul2U;lor50miniq3Xn30rGtt2;a,eDis,la,othGthy;ea,y;an08naEonAx2;anObNde,eMiLlImetr3nGsir4T;a,iG;ce,se;a,iHla,orGphiA;es,is;a,l5I;d0Grd0G;!d4Mna;!b2DoraEra;a,d4nG;!a,e;hl3i0mMnKphn1rHvi1XyG;le,na;a,by,cHia,lG;a,en1;ey,ie;a,et7iG;!ca,el1Bka;arGia;is;a0Re0Nh05i03lUoJrHynG;di,th3;istGy05;al,i0;lOnLrHurG;tn1E;aId28iGn28riA;!nG;a,e,n1;!l1T;n2sG;tanGuelo;ce,za;eGleD;en,t7;aIeoHotG;il4B;!pat4;iKrIudG;et7iG;a,ne;a,e,iG;ce,sY;re;a4er4ndG;i,y;aPeMloe,rG;isHyG;stal;sy,tG;aHen,iGy;!an1e,n1;!l;lseHrG;i9yl;a,y;nLrG;isJlHmG;aiA;a,eGot7;n1t7;!sa;d4el1OtG;al,el1N;cHlG;es7i3E;el3ilG;e,ia,y;iYlXmilWndVrNsLtGy6;aJeIhGri0;erGleDrCy;in1;ri0;li0ri0;a2FsG;a2Eie;a,iMlKmeIolHrG;ie,ol;!e,in1yn;lGn;!a,la;a,eGie,y;ne,y;na,sF;a0Di0D;a,e,l1;isBl2;tlG;in,yn;arb0CeYianXlVoTrG;andRePiIoHyG;an0nn;nwCok9;an2MdgKg0HtG;n26tG;!aHnG;ey,i,y;ny;etG;!t9;an0e,nG;da,na;i9y;bbi9nG;iBn2;ancGossom,ythe;a,he;ca;aRcky,lin8niBrNssMtIulaEvG;!erlG;ey,y;hHsy,tG;e,i0Yy9;!anG;ie,y;!ie;nGt5yl;adHiG;ce;et7iA;!triG;ce,z;a4ie,ra;aliy28b23d1Kg1Gi18l0Rm0Mn00rVsMthe0uIva,yG;anGes5;a,na;drIgusHrG;el3;ti0;a,ey,i,y;hHtrG;id;aKlGt1P;eHi9yG;!n;e,iGy;gh;!nG;ti;iIleHpiB;ta;en,n1t7;an19elG;le;aYdWeUgQiOja,nHtoGya;inet7n3;!aJeHiGmI;e,ka;!mGt7;ar2;!belHliFmT;sa;!le;ka,sGta;a,sa;elGie;a,iG;a,ca,n1qG;ue;!t7;te;je6rea;la;!bHmGstas3;ar3;el;aIberHel3iGy;e,na;!ly;l3n8;da;aTba,eNiKlIma,ta,yG;a,c3sG;a,on,sa;iGys0J;e,s0I;a,cHna,sGza;a,ha,on,sa;e,ia;c3is5jaIna,ssaIxG;aGia;!nd4;nd4;ra;ia;i0nHyG;ah,na;a,is,naE;c5da,leDmLnslKsG;haElG;inGyW;g,n;!h;ey;ee;en;at5g2nG;es;ie;ha;aVdiSelLrG;eIiG;anLenG;a,e,ne;an0;na;aKeJiHyG;nn;a,n1;a,e;!ne;!iG;de;e,lCsG;on;yn;!lG;iAyn;ne;agaJbHiG;!gaI;ey,i9y;!e;il;ah",Month:"true¦a6déc4févr3j1ma0nov4octo5sept4;i,rs;anv1ui0;llet,n;ier;em0;bre;out,vril",Country:"true¦0:3I;1:2Q;a31b2Hc25d21e1Tf1Ng1Ch1Ai13j10k0Yl0Tm0Fn04om3MpZqat1KrXsKtCu6v4wal3yemTz2;a28imbabwe;es,lis and futu33;a2enezue38ietnam;nuatu,tican city;.5gTkrai3Cnited 3ruXs2zbeE;a,sr;arab emirat0Jkingdom,states2;! of amer31;k.,s.2; 2Ba.;a7haBimor-les0Ao6rinidad4u2;nis0rk2valu;ey,me37s and caic1X; and 2-2;toba1N;go,kel0Znga;iw35ji2nz31;ki33;aCcotl1eBi8lov7o5pa2Gri lanka,u4w2yr0;az2ed9itzerl1;il1;d30isse,riname;lomon1Zmal0uth 2;afr2LkKsud2Y;ak0en0;erra leo2Rn2;gapo2Lt maart2;en;negJrb0ychellX;int 2moa,n marino,udi arab0;hele2Aluc0mart24;epublic of ir0Dom2Mussi27w2;an2B;a3eGhilippinSitcairn1Oo2uerto riL;l1rtugD;ki2Ll3nama,pua new0Xra2;gu5;au,esti2F;aAe8i6or2;folk1Mth3w2;ay; k2ern mariana1G;or0R;caragua,ger2ue;!ia;p2ther1Dw zeal1;al;mib0u2;ru;a6exi5icro0Co2yanm06;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagasc01l6r4urit3yot2;te;an0i1A;shall10tin2;iq1R;a3div2i,ta;es;wi,ys0;ao,ed05;a5e4i2uxembourg;b2echtenste16thu1P;er0ya;ban0Lsotho;os,tv0;azakh1Oe2iriba07osovo,uwait,yrgyz1O;eling0Onya;a2erH;ma19p2;an,on;c7nd6r4s3tal2vory coast;ie,y;le of m1Irael;a2el1;n,q;ia,oJ;el1;aiVon2ungary;dur0Qg kong;aBeAha0Uibralt9re7u2;a5ern4inea2ya0T;!-biss2;au;sey;deloupe,m,tema0V;e2na0R;ce,nl1;ar;orgie,rmany;bVmb0;a6i5r2;ance,ench 2;guia0Hpoly2;nes0;ji,nl1;lklandVroeV;ast tim8cu7gypt,l salv7ngl1quatorial5ritr6s3t2;ats unis,hiop0;p0Mt2;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprRzech2; 8ia;ba,racao;c3lo2morQngo-brazzaville,okFsta r02te d'ivoi05;mb0;osD;i2ristmasG;le,nS;republic;m2naVpe verde,yman9;bod0ero2;on;aGeChut06o9r4u2;lgar0r2;kina faso,ma,undi;az5etXitish 2unei,és5;virgin2; is2;lands;il;liv0naiOsnia and herzegoviHtswaHuvet2; isl1;and;l2n8rmuH;ar3gi2ize;qLum;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaKlFmeriDn6r4ustr2zerbaijM;ali2ia;a,e;genti2men0uba;na;dorra,g5t2;arct3igua and barbu2;da;ica;leter3o2uil2;la;re;ca,q2;ue;b4ger0lem2;ag2;ne;an0;ia;ni2;st2;an",Region:"true¦a20b1Sc1Id1Des1Cf19g13h10i0Xj0Vk0Tl0Qm0FnZoXpSqPrMsDtAut9v5w2y0zacatec22;o05u0;cat18kZ;a0est vir4isconsin,yomi14;rwick1Qshington0;! dc;er2i0;ctor1Sr0;gin1R;acruz,mont;ah,tar pradesh;a1e0laxca1Cusca9;nnessee,x1Q;bas0Jmaulip1PsmI;a5i3o1taf0Nu0ylh12;ffUrrZs0X;me0Zno19uth 0;cRdQ;ber1Hc0naloa;hu0Rily;n1skatchew0Qxo0;ny; luis potosi,ta catari1H;a0hode6;j0ngp01;asth0Lshahi;inghai,u0;e0intana roo;bec,ensVreta0D;ara3e1rince edward0; isT;i,nnsylv0rnambu01;an13;!na;axa0Mdisha,h0klaho1Antar0reg3x03;io;ayarit,eAo2u0;evo le0nav0K;on;r0tt0Qva scot0W;f5mandy,th0; 0ampton0P;c2d1yo0;rk0N;ako0X;aroli0U;olk;bras0Wva00w0; 1foundland0;! and labrador;brunswick,hamp0Gjers0mexiIyork state;ey;a5i1o0;nta0Mrelos;ch2dlanAn1ss0;issippi,ouri;as geraFneso0L;igPoacP;dhya,harasht03ine,ni2r0ssachusetts;anhao,y0;land;p0toba;ur;anca03e0incoln03ouis7;e0iG;ds;a0entucky,hul09;ns07rnata0Cshmir;alis0iangxi;co;daho,llino1nd0owa;ia04;is;a1ert0idalDun9;fordS;mpRwaii;ansu,eorgVlou4u0;an1erre0izhou,jarat;ro;ajuato,gdo0;ng;cesterL;lori1uji0;an;da;sex;e3o1uran0;go;rs0;et;lawaDrbyC;a7ea6hi5o0umbrG;ahui3l2nnectic1rsi0ventry;ca;ut;iLorado;la;apDhuahua;ra;l7m0;bridge2peche;a4r3uck0;ingham0;shi0;re;emen,itish columb2;h1ja cal0sque,var1;iforn0;ia;guascalientes,l3r0;izo1kans0;as;na;a1ber0;ta;ba1s0;ka;ma",Honorific:"true¦aPbrigadiOcHdGexcellency,fiBjudge,king,liDmaAofficOp6queen,r3s0taoiseach,vice5;e0ultK;c0rgeaC;ond liAretary;abbi,e0;ar0verend; adK;astGr0;eside6i0ofessF;me ministFnce0;!ss;gistrate,r4yC;eld mar3rst l0;ady,i0;eutena0;nt;shB;oct6utchess;aptain,hance4o0;lonel,ngress1un0;ci2t;m0wom0;an;ll0;or;er;d0yatullah;mir0;al",Infinitive:"true¦0:MV;1:MR;2:MF;3:MM;4:K8;5:JJ;6:MN;7:MU;8:L9;9:LI;A:MT;B:M2;C:JS;D:LM;E:EI;F:MI;aJFbIEcFQdD4eBHfAHgA2h9Ti94j8ZkidnaLTl8Nm80n7To7Ip64qu62r2Os1Nt0Pu0Nv0BéGêt2ôt0;b06cYdu4ga3jeJ2lWmouKVnVpQquOtKvG;aIeHit0oG;lu0qu0;i9nt83;cu0lu0n2W;aIeALoGr2Ou47;nn0uG;ff0rd1;bl1l0;aLHiG;p0vaB3;aIel0iHlu5oGroMNu8;ng0us0;er,ngl0;iDQn2MrG;gn0pi9;e7BumB;aGev0imCoiM7;bo3gu0rg1;arMhJlHoGras0;nom8p0r5ut0;aGips0o2;irBYt0;aHoG;ir,u0;ng0pp0uI9;qL5t0;aHl29rG;uEé5;h1uG;b1d1;aPeMiJoHromb1éGêt1;g8JnBriK9;iGl0m1t0uAGyDM;l0r;d0eiLJol0re6sGv2;er,iG;oAt0;i9nHrGx0;d1n1roKSs0;g0ir;g1inc2lGnt0;o1s0;i2n1rGs0tEN;g0in0;a08e04i01oYrKuJâIéG;léGt0;chaDCg5Sphon0;ch0t0;er,tJG;aMeKiIoGu4ébu5;mp0ttGuv0;er,in0;cGmbal0n4omph0;h0ot0;mGssaiKZ;bl0p0;cLfi4h1it0nIqu0vGînL;ai9eG;rs0st1;ch0sG;fGg7Lir,poFD;o7Rè2ér0;a7er;lBmb0p0rHuG;ch0rn0ss0;ch0tu3;rHsGtub0éd1;s0t2;ai9e6;mpHOnEKrGst0;giveDDmCn1rG;er,iG;fi0r;bJch0iIpHrGss0;d0ir,t1;er,ir,ot0;ll0re;a7l0;a09c08e06hoFMi03oWtTuIyHéG;ch0jouJ5pa3v1;mpath8nchron8;bPccOer,ffNggBiMpKrGspeGS;enchEEf0g1ir,moJOpa7sIvG;eGol0;i9n1;aJ6eo1;erv8pG;li0oEMr95;c6Bv2;i2o4;o9Véd0;ir,stiE2ve6S;aHimGMoGupéf8B;ck0pp0;bD7tHV;iK0ll7UmLnKrt1uGûl0;ci0d2ffIhaElHpGrd2s-est8WtFvF;er,i3çoA;ag0ev0iJX;l0r1;d0g0n0;b3m0;gnHlFNmGrEYtu0ég0;pI8ul0;al0er;cou37mGnt1o1rCOvr0;bl0er;aAe9rIK;bLcKiJlInctHHoG6uHvoG;ir,u3;poud3rFRt0v0;er,ir,u0;gn0ll1s1;cBDriHZ;ot0re6;a24e07hA7i06o04u03éHêv0ôG;d0t1;a00cXdCYeVfUgTinRjQpNquisitH8sKtIuHvG;ei9is0oD9él0;n1ss1;aIRrG;éc1;e4CiHoud2uG;lt0m0;d0gn0st0;aGroJGuJ6ét0;nd2rG;e6t1;ou1;sta9tGvest1;èg2égr0;al0ir,l0n0;léDugi0;nvah1ss9CxG;amCpé0L;apitFFhaHit0lIYoGupB;lt0m1Inci49;pp0uF4;g1l8n7Qp8Bs9O;g1in0;id1s1uG;g1ir,l0s49vr1;gEPm0poHKre,s4;-1Bb1Ac10d0Tf0Rg0Mj0Ll0Jm0Bn07p00quCPreZsQtLvG;a7CeHoGêt1;ir,m1u7B;nHrG;d1n1;di4ir;aEZenJi3oIrG;aGoIR;c0n5;mb0uH4;ir,t1;al1erv1pNsHtGurg1;au3iCA;aKeIoHuG;rg1scE;rt1uvF;mFOnt1rG;re6v1;is1ss0;eEJi3leG0;m8Xs8Z;aKeGClJoIrHè2éG;r0tr1;o5éseHC;rt0s0u7;ac0i0;rGss0ît2;coGXl0t1;aBZcIdo12foAEi0oHseiHWt3vGâ7Y;eAJoy0;nc0uvBY;hBUont3;aLbKerDKis0oJpHu0éG;di0;lGoFM;ac0ir;nt0r4;ouABr1C;iG9rG;i0qu0;aGev0â5;nc0x0y0;aiHCet0ou0;aIrG;eH4imp0oG;ss1up0;gn0rG;d0n1;e45leGCo45rGus0;anDoid1;eKiffus0oIre7éG;couFBf0ZmG;ar3ol1;nn0rm1uG;bl0t0;maEXvG;en1o1;eFAhNlu2oIrHtiFKuG;eiGWl0;oB4ut0ép1;mInHuG;p0r1vr1;quAZve7U;mGpt0;aEOeF8;aGer5;mp1rg0;lanDoEOrou7ât1;pe1Q;bo03cYdouc1fWgaillaH7iVjUlSmQnPpNqu0sKtIvGy0;al0iGo1;r,tC2;er,i7tG;a5rap0;er,sG;eGir,o7Hu3;mE0o1;eti7iéc0oiESpG;el0oEEro5;c1g0im0;a7eGoGAp0;n0r,ut0;eENlG;i0um0;e01oF8;d1re,soA;feGr7V;rm1;cHkeFWoG;nt0rn1;oGro5;mGu1D;mG5paG4;nn1uEQ;adri9eGiFQér1;re9stDV;a0Me0Ghotog0Fi0Dl08o03rKuJâIéGê5;nAZr1tG;er,r1;l1t1;b1Ais0lvér8n1riED;ati4eWiVoOéGêt0ôn0;cLdéfKfBlev0mJoccup0pa3sHvGétaFA;a4Ien1o1;eGid0um0;nt0rv0;un1;in1;iGonDUéd0;pEs0;cLfKgrJj47loEDmInoDYp52steEBtHuv0vG;en1o4;eEFég0;en0ouDQ;amm0e7;e7it0è2ér0;lFIu3éd0;er,s0v0;nd2sseG;nt1r;inJl1mp0rt0sIuG;rGss0vo1;cha7r1vo1;er,séd0t0;d2t0;aHeuGi0oDY;re6vo1;c0iHnG;er,iDLqu0t0;d0re,saEE;g0ll0nc0queGss0étC;-ni4r;raphi0;iKlA4nJrGs0;ceHfo3mett2sGve5U;iDSonnAEuBJévB;r,vo1;ch0s0;gn0n0;ct8lp0nLrIss0tGv9Zy0ît2;aug0iGroDZ;eE2n0;achDMcoDQdoAf2Yi0l0tGvF;ag0iG;cCYr;i4s0;bMccLe0HffJi1Pmp2pIrHs0uGy0;bZrd1vr1ïr;doAgan8;p3Zè2ér0;eGiAAr1;ns0;i2up0;jeATl7ZsHteGé1;mpBn1;cuLeGtC;rv0;aLeKi8UoHégG;l7UoA2;iHmm0n-saCGtGuDBy0;er,iCP;rc1;ig0ttCBu9M;g0nt1r6Zvi6Zît2;aUeQiOoJuHâ5éGêl0ûr1;dEfi0laCUpr8rEtamorph3J;g1ltipGn1rmu3;li0;b76diCHiJll1ntIqu0uG;ch0d2fGi9r1vo1;et0t0;er,re6;s1t1;j90nGs0;c1im8;nHsGtt2urtr1;seo1u3;ac0di0er,tiG;oAr;gn0iMnJqCWrHsGt9Vudi2îtr8;sac3ti4;chGi0qu0re6;aBEer;g0iHoeGqu0;uv3;feCEpA2;gr1ntF;aOeNiKoIuHyn5â5éG;ch0gu0;i2tt0;c8Vg0ng0t1uG;ch0er;bBer,g8HmHquGre,ss0v3;id0;er,it0;ur3v0;i7mHnGr62ss0v0;c0gu1;bCeCH;aJeIoHuG;g0re6;i06u99;t0ûn0;ct0iCVun1;dentiBHe03gno3mXnHrrEsG;ol0s1;cTdi4fQiti0oAQquiPsNtJvG;eGit0o4;nt0rGst1;s0t1;erHéG;re7;ag1ceCVfBrog0veG;n1rt1;iBLpGta9u6Mè2ér0;e93i3;ét0;ilt3lHoG;rm0;ig0éD;aB9lGo2Aulp0;in0u2;agCit0mKpG;a3DlIoHrG;im0ov8;rt3Ss0;aBPi4o3;e4Cob5J;nd2;aLeKi7oIuHypothé4ât0éG;be49rEsE;ir,m0rl0;ch0nG;n1o3;nn1uA2;biGllucCrc69u7ïr;ll0tG;er,u0;aRel0lPoOrIuHâ5è2éGên0;m1nér7Ir0s1;eBOid0ér1;aKiIoG;ss1uG;i9p0;ll0mGnD;ac0p0;nd1tt0v80;b0rg0uveAIût0;aGi7oriA9;c0nd0p1;gHlop0mbe3PrGspi9uDv0z0;a9Yd0e6n1;er,n0;a0Ae07i04lZoQrJuIâ5éGêt0;lGr1;icE;ir,m0si9;aKeJi4ToHéGôl0;m1queAT;iGtt0;d1ss0;doAin0;nDpp0teGy0îD;rn8;c6TnMrIuG;eAZi79l0rGt2;b1n1re6;cIfHmGti9Q;e0Dul0;ai2;er,ir,lo2;cGd0;er,t8Y;aJeA3iIoHéG;ch1tr1;r1tt0;n3Urt0;mb0n4tt0;a9Ach0gu3lHnGx0;a99ir;er,m0;rHst90uillG;et0;m0re6t3Z;bri4cJiIlHn0rc1ti3MuGx0;f94ss0;lo1;bl1ll1re;ilEtu3;ff10m0RnXrr0sQxG;aOcNe34hib0iMorc8pHtGéc9I;a8ZermCrap6L;i3lIo4YrHu4XéG;di0ri7I;im0;i4oG;it0re6s0;g0st0;it0us0;gBmCuc0;ba8BcKpJsItG;imeGourb1;nt,r;ay0uy0;ac0ioAè2ér0;al6ToG;mA9rt0;c03d00fXgWhaALiv3jaVlTnSorguei9Zqu46rRsPtIvG;ah1elo98i0NoG;l0y0;aLer3ou3rGêt0;aIeGou83;pGr,tFvo1;os0;id0pGîn0;er83;m0ss0;eGuiv2;i9Uvel1;eg9DiDôl0;o98uy0;aGev0;c0id1;mb0;ag0end3lo16ouA4rai7ue67;erHil0oGu1;nc0u1;m0re6;oHurG;c1e6;lor1rm1;aKerJhHlo2ourG;ag0ir;aGér1;nt0în0;cl0;d3i7;bLmJpG;a3il0lHoGru8Lua7Jê5;i99rt0;ir,oy0;eGén12;n0rd0;aGe8Zo0Nra7;ll0r1Bt2uG;ch0m0;ac0ec30o1KrG;ay0;a20e1Vi1Go1Cr1Au19ynamEéGîn0;amb5Ib11c0Pd0Nf0Jg0Dj0Bl09m06n05pYrWsOtKvG;eIiHoGêt1;il0re6;er,s0R;lo7Zrn1;aIeGou7J;ct0n1rGst0;mCre6;ch0i9;aKeIhHiGobé1un1épai06;gn0re6;abi9;mGng92spB;pl1;ct87mo13sGvou0;soG;rt1;a79iv0oG;b0ul0;aLeKlIoGér1ê5;l1s0uG;i9r6L;ac0oG;re6y0;c0ns0;nn0rt1ss0;a6Ii5o6L;aHe6HoGun1én03;l1nt3;nt2Ar3s4;e4JiGog0é0Z;mEv3;eGou0;un0;aKlJoIroHuG;erp1is0st0;ss1;mm0u8E;ut1;g0rn1uD;ai7PiIle6VoHrG;aîD;nc0ul0;er,l0n1;i0oG;mmLu56;aQePhMid0lLoIrG;o5éG;p1t0;d0ll0nne40uG;p0rGvr1;ag0;a3en5in0o2;aHiGo1;ff3re6;rg0;rn0vo1;mp0pEt1;aJouIrHuG;s4t0;an5o6I;c3Hl0;ll0rG;qu0ra7;it0;p0rc1;aGe7;gu0mat8;mCnn0rIuG;bl0cGt0;h0ir;l25m1;aloTct0ffSrRsJvG;erHis0oGulS;rc0;g0t1;cKpIsHtG;a56inOri3X;im3Cé4;eGos0ut0;rs0;oGut0;nGur1;ti3PvF;e,ig0;us0è2ér0;gu0;mJssHvG;a4Ven1in0o1;aXerGin0;re6t1v1;a48eu3;i6Fns0;a1We1Sh1Di19l15oUrLuIéG;d0lG;èb2ébr0;ei65isClG;pabGt5W;il8;aLeKiJoHéG;er,p1;iGqu0up1ît2;re,s0;er,re,ti4;us0v0;ch0mG;oGpoA;is1;exi4Uff3gn0i4Bl0Mm0AnLoKrrJt1uGût0;ch0d2l0p0rGvr1;bGir;atur0er;ig0;pBr6C;c02damn0fYgXnVquUsOtJvG;eGi0o4;n1rG;g0s0t1;a23eIi2Qou4ErG;aGevFi2Rôl0;ct0ri0;mpl0nGr,st0;ir,t0;ac3eKidBoJtHuG;lt0;at0iG;tu0;l0mm0;i9nt1rv0;ér1;aGe1R;ît2;el0;eIiGro4L;er,rGs4;e,m0;ct31ss0;eGo46éd0;nt3rt0vo1;bQmMpG;aJlIoHt0uG;ls0;rt0s0;i4ot0ét0;rGt1;e6o1;a2PeHuniG;er,qu0;nGrc0;c0t0;in0l0;lGmat0on8;abo3eG;ctGr;er,ioA;aHi4OoGu2;re,u0ît2;meGp1qu0ss0;c0r;bl0rGt0;cGe6;onGul0;ci2vF;aPeNiKoHronomGuchLér1;èt2étr0;iHpGqu0;er,p0;r,s1;cHpG;ot0;an0;r5vG;au5ir;lo1mJnIrHss0to3DuG;ff0v1;g0ri0;c1g0t0;ai9;nHrGss0;n0ti2H;trG;al8;ch0lLmKnJpHre7sGus0;s0tr0;it0EtG;er,u3;al8d1toA;briSp0;c0AmXt0;a05e04ienvFlZoTrLut0âJéGû5;er,nG;ir,éfiG;ci0;cl0ilGt1;loA;aLiJoHuGûl0;i2n1s4;n5uiG;ll0r;cGdg0ll0s0;ol0;i2nGss0v0;ch0d1;i2mbaTnKrn0ss0tt0uGx0;cId0ffHg0i35m0r3sG;cTi9;er,ir;h0l0;d1ir,n1;aJeIoHuGâm0êm1;ff0;nd1qu0tt1;ss0tt1u1;gu0nD;ct0;digeoAgar3iOlaNnn1pt8rrKsItt2vG;aGer;rd0;cGer;ul0;e6iG;cGr;ad0;nc0y0;gn0sG;er,s0;b2Vc2Ad26ff1Yg1Qh1Pi1Mj1Jl1Dm14n0Xp0Dr09sWttPuMvGè2ér0;aKeIiHoG;ir,rt0u0;l1s0;ntu3rt1uG;gl0l1;ch1l0nc0;gHtG;or8;me1R;aLeKiJrHéG;nu0;ap0iG;bu0;re6s0éd1;l0n0Urr1;ch0qu0rd0;pi3sGti4;aOeMi12oIuHé5;ch0;jett1m0re6;ci0ir,mIrt1uG;pGrd1v1;ir,l1;br1m0;mGo1rv1;bl0;g1iHssCvo1;in0;ll1n1;bo3ch1Hm0pe16rG;aHiv0oGêt0;nd1s0;ch0ng0;a8erXitWlaVpGâl1;aReQlNoMrGuy0ât0;ivo8oIéGêt0;ci0heG;nd0;ch0foHuv0visG;ioA;nd1;rt0;aHi4;qu0;ud1;l0saO;rHuG;vr1;ei9o1tF;n1t1;oy0;ceG;vo1;alys0esthéLnIo0NticHéaG;nt1;ip0;ihHoGul0;nc0;il0;si0;aMeLinc1oIpGus0élio3;liG;fi0;ch1inHll1rG;c0t1;dr1;n0rr1;iGss0t1;gr1;angu1eKiJlHou17teGun1;rn0;er,oGum0;ng0;gn0meY;nt1rt0;oHuG;st0;ut0;d0gGm0nd2;r1u8;is0;ur1;enoLgrav0iKon1rHueG;rr1;aHe7iGé0;pp0;f0nd1;r,t0;ui9;ll0;aLeKiJol0rG;anDoGét0;nt0;ch1;ch0rm0;ct0rm1;d1iGl0;bl1;a01ir0miHoGre7vF;nn0pt0re6uc1;nGre6;ist3;ariât2cKheJquHtG;iv0;iGér1;tt0;t0v0;aTeSlRoLroKuIéG;d0lB;è2ér0;eiGs0;ll1;ch0i2up1ît2;mHrd0st0urG;c1ir;mIpG;aGl1;gn0;od0;am0;pt0;bl0lm1;re;aNju3oKrIsGus0âtaPêt1îm0;orb0tF;en1;eGit0ut1ég0;uv0;l1rd0ut1;re6;!r;i7nJsG;ouG;rd1;ir;doA;nn0;ss0;er",Person:"true¦ashton kutchSbRcMdKeIgastNhGinez,jEkDleCmBnettJoAp8r4s3t2v0;a0irgin maG;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussain,carlett johanssJlobodan milosevic,uB;ay romano,eese witherspoIo1ush limbau0;gh;d stewart,nald0;inho,o;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0ruz;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",City:"true¦a2Yb28c1Yd1Te1Sf1Qg1Kh1Ci1Ajakar2Jk11l0Um0Gn0Co0ApZquiYrVsLtCuBv8w3y1z0;agreb,uri21;ang1Ve0okohama;katerin1Jrev36;ars3e2i0rocl3;ckl0Xn0;nipeg,terth0Y;llingt1Qxford;aw;a1i0;en2Jlni31;lenc2Wncouv0Hr2I;lan bat0Etrecht;a6bilisi,e5he4i3o2rondheim,u0;nVr0;in,ku;kyo,ronIulouC;anj25l15miso2Lra2C; haJssaloni0Z;gucigalpa,hr2Ql av0N;i0llinn,mpe2Dngi08rtu;chu24n2OpT;a3e2h1kopje,t0ydney;ockholm,uttga14;angh1Henzh1Z;o0Mv00;int peters0Wl3n0ppo1H; 0ti1D;jo0salv2;se;v0z0S;adV;eykjavik,i1o0;me,sario,t27;ga,o de janei19;to;a8e6h5i4o2r0ueb1Syongya1P;a0etor26;gue;rt0zn26; elizabe3o;ls1Irae26;iladelph21nom pe09oenix;r0tah tik1B;th;lerKr0tr12;is;dessa,s0ttawa;a1Jlo;a2ew 0;delVtaip0york;ei;goya,nt0Wpl0Wv1T;a6e5i4o1u0;mb0Nni0K;nt1sco0;u,w;evideo,real;l1Nn02skolc;dellín,lbour0T;drid,l5n3r0;ib1se0;ille;or;chest0dalXi10;er;mo;a5i2o0vBy02;nd0s angel0G;on,r0F;ege,ma0nz,sbZverpo1;!ss0;ol; pla0Iusan0F;a5hark4i3laipeda,o1rak0uala lump2;ow;be,pavog0sice;ur;ev,ng8;iv;b3mpa0Kndy,ohsiu0Hra0un03;c0j;hi;ncheMstanb0̇zmir;ul;a5e3o0; chi mi1ms,u0;stI;nh;lsin0rakliG;ki;ifa,m0noi,va0A;bu0SiltD;alw4dan3en2hent,iza,othen1raz,ua0;dalaj0Gngzhou;bu0P;eUoa,ève;sk;ay;es,rankfu0;rt;dmont4indhovU;a1ha01oha,u0;blRrb0Eshanbe;e0kar,masc0FugavpiJ;gu,je0;on;a7ebu,h2o0raioJuriti01;lo0nstanJpenhagNrk;gFmbo;enn3i1ristchur0;ch;ang m1c0ttagoL;ago;ai;i0lgary,pe town,rac4;ro;aHeBirminghWogoAr5u0;char3dap3enos air2r0sZ;g0sa;as;es;est;a2isba1usse0;ls;ne;silPtisla0;va;ta;i3lgrade,r0;g1l0n;in;en;ji0rut;ng;ku,n3r0sel;celo1ranquil0;la;na;g1ja lu0;ka;alo0kok;re;aBb9hmedabad,l7m4n2qa1sh0thens,uckland;dod,gabat;ba;k0twerp;ara;m5s0;terd0;am;exandr0maty;ia;idj0u dhabi;an;lbo1rh0;us;rg",Place:"true¦aMbKcIdHeFfEgBhAi9jfk,kul,l7m5new eng4ord,p2s1the 0upJyyz;bronx,hamptons;fo,oho,under2yd;acifMek,h0;l,x;land;a0co,idDuc;libu,nhattK;a0gw,hr;s,x;ax,cn,ndianGst;arlem,kg,nd;ay village,re0;at 0enwich;britain,lak2;co,ra;urope,verglad0;es;en,fw,own1xb;dg,gk,hina0lt;town;cn,e0kk,rooklyn;l air,verly hills;frica,m5ntar1r1sia,tl0;!ant1;ct0;ic0; oce0;an;ericas,s",Currency:"true¦$,aud,bTcRdMeurLfKgbp,hkd,iJjpy,kHlFnis,p8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotyTł;en,uanS;af,of;h0t6;e0il6;k0q0;elN;iel,oubleMp,upeeM;e3ound0;! st0s;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",Cardinal:"true¦cinqDdBhuit,mill9neuf,onCqu4s2tr0v8zero;e0ois;iAnD;e0ix,oixB;i8pt;a0in7;drillion,r8t0;or5re0;! v0;ingt;e,i0;ard,on;eux,ix,ou0;ze;!u0;an0;te",Ordinal:"true¦biHcEd9hDmilli8nCo7qu4s2tr0unIvingtIzeroI;e0iGoisH;izGntG;e0ixFoixaD;izEptE;a0i2;raAt0;orzBrB;nzA;ard9eAon9;eux8ix0ouz8; 0ie8;h1n0sept6;euv5;uit4;e1inqu0;a0ie3;nt1;llion0;ie0;me",Unit:"true¦b9celsius,e7fahrenheitAgig8hertz,jouleAk6m5pe4ter8y2z1°0µs;c,f,n;b,e1;b,o0;tt4;rcent,t3;eg2³;elvin3ilob2m/h;b,x0;ab0;yte0;!s",MaleNoun:"true¦0:0L;a0Ab08c05d01eZfVgThiv04iPjOlieu,mKniv09pDr7s6t4v3é1;chel0Al1qui01tabl0Ivé0D;èQé0;en09égéta08;a1echniIrai8;b06rif,ux;ala0Ceg0tatis9;e1èg3és02;c3mbour0Cn1staura0E;de0forPouvel1;le0;en09ru1;te0;a5er4la3oli2r1;a1ofS;ti7;inWnW;fectiWspecA;ie0r1;apluie,le0teB;er,o3us1;i1ée;que;biOmeZuve0;eu,ournT;dRn1;itia1vestT;ti1;ve;estion1ouverL;naO;i2onctionn1;aMe0;le,nan1;ce0;au,n1space;dro6ga7registre0seigEtenCvirD;egré,o2évelop1;pe0;cu0nnDssi1;er;han2ommentaDréd1;it;ge0;at1ur1énéficiaA;eau;ccro9ffa8gré0ir,n5pprovisi3ttein2utomobi1venir;le;te;on1;ne0;im2n1;ée;al;ire;is1;se0;me1;nt",Organization:"true¦0:43;a38b2Pc29d21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2Q;a3e1orld trade organizati3Y;lls fargo,st1;fie22inghou16;l1rner br3A;-m11gree2Zl street journ24m11;an halNeriz3Tisa,o1;dafo2Fl1;kswagLvo;bs,kip,n2ps,s1;a tod2Pps;es32i1;lev2Vted natio2S; mobi2Iaco bePd bMeAgi frida9h3im horto2Rmz,o1witt2U;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen30daily ma2Uguess w2holli0rolling st1Ms1w2;mashing pumpki2Muprem0;ho;ea1lack eyed pe3Cyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Enp,o2pice gir5ta1ubaru;rbucks,to2K;ny,undgard1;en;a2Ox pisto1;ls;few23insbu24msu1V;.e.m.,adiohead,b6e3oyal 1yan2U;b1dutch she4;ank;/max,aders dige1Dd 1vl2Z;bu1c1Shot chili peppe2Hlobst26;ll;c,s;ant2Sizno2C;an5bs,e3fiz22hilip morrBi2r1;emier24octer & gamb1Pudenti13;nk floyd,zza hut;psi25tro1uge08;br2Nchina,n2N; 2ason1Vda2D;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Ctflix,w1; 1sweek;kids on the block,york08;a,c;nd1Rs2t1;ional aca2Co,we0P;a,cYd0N;aAcdonald9e5i3lb,o1tv,yspace;b1Knsanto,ody blu0t1;ley crue,or0N;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt11z1V;'ore08a3e1g,ittle caesa1H;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1H;art;iffy lu0Jo3pmorgan1sa;! cha1;se;hnson & johns1Py d1O;bm,hop,n1tv;g,te1;l,rpol; & m,asbro,ewlett-packaSi3o1sbc,yundai;me dep1n1G;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Gu1;cci,ns n ros0;ldman sachs,o1;dye1g09;ar;axo smith kliYencore;electr0Gm1;oto0S;a3bi,da,edex,i1leetwood mac,oFrito-l08;at,nancial1restoU; tim0;cebook,nnie mae;b04sa,u3xxon1; m1m1;ob0E;!rosceptics;aiml08e5isney,o3u1;nkin donuts,po0Tran dur1;an;j,w j1;on0;a,f leppa2ll,peche mode,r spiegXstiny's chi1;ld;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra03;al;ca c5l4m1o08st03;ca2p1;aq;st;dplLgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Fy;dbury,pital o1rl's jr;ne;aFbc,eBf9l5mw,ni,o1p,rexiteeV;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roW;ckbuster video,omingda1;le; g1g1;oodriM;cht3e ge0n & jer2rkshire hathaw1;ay;ryG;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bWcRdidQerosmith,ig,lKmEnheuser-busDol,pple9r6s3t&t,v2y1;er;is,on;hland1sociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",FemaleNoun:"true¦ambulance,confiture,géolog1l0poule,rue;ibrair0utte;ie",SportsTeam:"true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",Pronoun:"true¦c2elle1il,j2moi,n0on,t,v0;ous;!s;!e",Date:"true¦aujourd hui,demain,heir,weekend",Expression:"true¦a02b01dXeVfuck,gShLlImHnGoDpBshAtsk,u7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",WeekDay:"true¦dimanche,jeu2lun2m0same2vend1;ar1erc0;re0;di"};const Ss="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",Js=Ss.split("").reduce((function(e,r,i){return e[r]=i,e}),{});var Ls=function(e){if(void 0!==Js[e])return Js[e];let r=0,i=1,t=36,s=1;for(;i<e.length;r+=t,i++,t*=36);for(let i=e.length-1;i>=0;i--,s*=36){let t=e.charCodeAt(i)-48;t>10&&(t-=7),r+=t*s;}return r};var Ks=function(e){const r=new RegExp("([0-9A-Z]+):([0-9A-Z]+)");for(let i=0;i<e.nodes.length;i++){const t=r.exec(e.nodes[i]);if(!t){e.symCount=i;break}e.syms[Ls(t[1])]=Ls(t[2]);}e.nodes=e.nodes.slice(e.symCount,e.nodes.length);};const Rs=function(e,r,i){const t=Ls(r);return t<e.symCount?e.syms[t]:i+t+1-e.symCount};var Qs=function(e){const r={nodes:e.split(";"),syms:[],symCount:0};return e.match(":")&&Ks(r),function(e){const r=[],i=(t,s)=>{let n=e.nodes[t];"!"===n[0]&&(r.push(s),n=n.slice(1));const a=n.split(/([A-Z0-9,]+)/g);for(let n=0;n<a.length;n+=2){const o=a[n],l=a[n+1];if(!o)continue;const u=s+o;if(","===l||void 0===l){r.push(u);continue}const c=Rs(e,l,t);i(c,u);}};return i(0,""),r}(r)};var Us=function(e){if(!e)return {};const r=e.split("|").reduce(((e,r)=>{const i=r.split("¦");return e[i[0]]=i[1],e}),{}),i={};return Object.keys(r).forEach((function(e){const t=Qs(r[e]);"true"===e&&(e=!0);for(let r=0;r<t.length;r++){const s=t[r];!0===i.hasOwnProperty(s)?!1===Array.isArray(i[s])?i[s]=[i[s],e]:i[s].push(e):i[s]=e;}})),i};let Ws={};Object.keys(Vs).forEach((e=>{let r=Us(Vs[e]);Object.keys(r).forEach((r=>{if(Ws[r]=e,"MaleAdjective"===e){let e=qs.adjective(r);Ws[e.female]="FemaleAdjective",Ws[e.plural]="MaleAdjective",Ws[e.femalePlural]="FemaleAdjective";}if("MaleNoun"===e){let e=qs.noun(r);Ws[e.plural]="Plural";}if("Infinitive"===e){let e=qs.futureTense(r);Object.keys(e).forEach((r=>Ws[e[r]]="FutureTense")),e=qs.presentTense(r),Object.keys(e).forEach((r=>Ws[e[r]]=Ws[e[r]]||"PresentTense")),e=qs.imperfect(r),Object.keys(e).forEach((r=>Ws[e[r]]="Verb"));let i=qs.pastParticiple(r);Ws[i]="PastTense";}}));}));let Zs=Object.assign({},Ws,{es:["Copula","PresentTense"],est:["Copula","PresentTense"],suis:["Copula","PresentTense"],sommes:["Copula","PresentTense"],etes:["Copula","PresentTense"],sont:["Copula","PresentTense"],ete:["Copula","PastTense"],etais:["Copula","PastTense"],etions:["Copula","PastTense"],serons:["Copula","FutureTense"],seront:["Copula","FutureTense"],serai:["Copula","FutureTense"]});var Ys={methods:{one:{transform:{conjugate:qs}}},model:{one:{lexicon:Zs}}};const Xs=/['‘’‛‵′`´]/,$s=function(e,r){for(let i=0;i<r.length;i+=1)if(!0===r[i][0].test(e))return r[i];return null};var _s=function(e,r,i){let t=i.methods.one.setTag,s=e[r],{regexText:n,regexNormal:a,regexNumbers:o}=i.model.two,l=s.machine||s.normal,u=s.text;Xs.test(s.post)&&!Xs.test(s.pre)&&(u+=s.post.trim());let c=$s(u,n)||$s(l,a);return !c&&/[0-9]/.test(l)&&(c=$s(l,o)),c?(t([s],c[1],i,!1,`2-regex- '${c[2]||c[0]}'`),s.confidence=.6,!0):null};var en=function(e,r,i){let t=i.methods.one.setTag,s=e[r];return 0===r||s.tags.size>0?null:(n=s.text,/^[A-Z][a-z'\u00C0-\u00FF]/.test(n)||/^[A-Z]$/.test(n)?(t([s],"ProperNoun",i,!1,"title-case"),!0):null);var n;};const rn=new Set(["pendant","dans","avant","apres","pour","en"]),tn=function(e){return !!e&&(!!rn.has(e.normal)||!!(e.tags.has("Date")||e.tags.has("Month")||e.tags.has("WeekDay")))},sn=function(e){return !!e&&!!e.tags.has("Ordinal")};var nn=function(e,r,i){let t=i.methods.one.setTag;const s=e[r];if(s.tags.has("NumericValue")&&s.tags.has("Cardinal")&&4===s.normal.length){let n=Number(s.normal);if(n&&!isNaN(n)&&n>1400&&n<2100){if(tn(e[r-1])||tn(e[r+1]))return t([s],"Year",i,!1,"2-tagYear"),!0;if(n>1950&&n<2025&&(sn(e[r-1])||sn(e[r+1])))return t([s],"Year",i,!1,"2-tagYear-close"),!0}}return null};const an=/^[A-Z]('s|,)?$/,on=/^[A-Z-]+$/,ln=/([A-Z]\.)+[A-Z]?,?$/,un=/[A-Z]{2,}('s|,)?$/,cn=/([a-z]\.)+[a-z]\.?$/,dn={I:!0,A:!0};var pn=function(e,r,i){let t=i.methods.one.setTag,s=e[r];return s.tags.has("RomanNumeral")||s.tags.has("Acronym")?null:function(e,r){let i=e.text;return !(!1===on.test(i)||i.length>5||dn.hasOwnProperty(i)||r.one.lexicon.hasOwnProperty(e.normal)||!0!==ln.test(i)&&!0!==cn.test(i)&&!0!==an.test(i)&&!0!==un.test(i))}(s,i.model)?(s.tags.clear(),t([s],["Acronym","Noun"],i,!1,"3-no-period-acronym"),!0):!dn.hasOwnProperty(s.text)&&an.test(s.text)?(s.tags.clear(),t([s],["Acronym","Noun"],i,!1,"3-one-letter-acronym"),!0):s.tags.has("Organization")&&s.text.length<=3?(t([s],"Acronym",i,!1,"3-org-acronym"),!0):s.tags.has("Organization")&&on.test(s.text)&&s.text.length<=6?(t([s],"Acronym",i,!1,"3-titlecase-acronym"),!0):null};const hn={la:"FemaleNoun",une:"FemaleNoun",un:"MaleNoun",du:"MaleNoun",au:"MaleNoun",des:"Plural",aux:"Plural",de:"Noun",dois:"Verb",doit:"Verb",devons:"Verb",devez:"Verb",doivent:"Verb",peux:"Verb",peut:"Verb",pouvons:"Verb",pouvez:"Verb",peuvent:"Verb",pouvait:"Verb",pourrait:"Verb",pourrais:"Verb",pourrions:"Verb",pourriez:"Verb",pourraient:"Verb",avoir:"Noun",pas:"Verb"};var mn=function(e,r,i){let t=i.methods.one.setTag;if(e[r-1]){let s=e[r-1].normal;if(0===e[r].tags.size&&hn.hasOwnProperty(s))return t([e[r]],hn[s],i,!1,"neighbour"),!0}return null};var fn=function(e,r,i){let t=i.methods.one.setTag,s=e[r];return 0===s.tags.size?(t([s],"Noun",i,!1,"fallback"),!0):null};const gn=function(e="",r=[]){const i=e.length;let t=7;i<=t&&(t=i-1);for(let s=t;s>1;s-=1){let t=e.substr(i-s,i);if(!0===r[t.length].hasOwnProperty(t)){return r[t.length][t]}}return null};var vn=function(e,r,i){let t=i.methods.one.setTag,s=i.model.two.suffixPatterns,n=e[r];if(0===n.tags.size){let e=gn(n.normal,s);if(null!==e)return t([n],e,i,!1,"2-suffix"),n.confidence=.7,!0;if(n.implicit&&(e=gn(n.implicit,s),null!==e))return t([n],e,i,!1,"2-implicit-suffix"),n.confidence=.7,!0}return null};var bn=function(e,r,i){let t=i.methods.one.setTag;const s=i.methods.one.guessGender;let{tags:n}=e[r];if(n.has("Noun")&&!n.has("MaleNoun")&&!n.has("FemaleNoun")){let a=e[r];if(n.has("ProperNoun")||n.has("Pronoun")||n.has("Possessive"))return null;let o=s(e,r);if(o)return t([a],o,i,!1,"3-noun-gender")}return null};var yn=function(e){let r=e.world;return e.docs.forEach((e=>{!function(e,r){for(let i=0;i<e.length;i+=1){let t=en(e,i,r);t=t||_s(e,i,r),nn(e,i,r);}}(e,r),function(e,r){for(let i=0;i<e.length;i+=1){let t=pn(e,i,r);t=t||vn(e,i,r),t=t||mn(e,i,r),t=t||fn(e,i,r);}}(e,r),function(e,r){for(let i=0;i<e.length;i+=1)bn(e,i,r);}(e,r);})),e};const zn=new Set(["Auxiliary","Possessive"]);var Gn=function(e){const{document:r,world:i}=e,t=i.model.one.tagSet;r.forEach((e=>{e.forEach((e=>{let r=Array.from(e.tags);e.tagRank=function(e,r){return e=e.sort(((e,i)=>{if(zn.has(e)||!r.hasOwnProperty(i))return 1;if(zn.has(i)||!r.hasOwnProperty(e))return -1;let t=r[e].children||[],s=t.length;return t=r[i].children||[],s-t.length})),e}(r,t);}));}));};const Mn="Noun",Bn="Verb",Nn="Adjective";var wn={regexNormal:[[/^[\w.]+@[\w.]+\.[a-z]{2,3}$/,"Email"],[/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/,"Url","http.."],[/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/,"Url",".com"],[/^[PMCE]ST$/,"Timezone","EST"],[/^ma?c'.*/,"LastName","mc'neil"],[/^o'[drlkn].*/,"LastName","o'connor"],[/^ma?cd[aeiou]/,"LastName","mcdonald"],[/^(lol)+[sz]$/,"Expression","lol"],[/^wo{2,}a*h?$/,"Expression","wooah"],[/^(hee?){2,}h?$/,"Expression","hehe"],[/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/,"Verb","un-vite"],[/^(m|k|cm|km)\/(s|h|hr)$/,"Unit","5 k/m"],[/^(ug|ng|mg)\/(l|m3|ft3)$/,"Unit","ug/L"]],regexNumbers:[[/^@1?[0-9](am|pm)$/i,"Time","3pm"],[/^@1?[0-9]:[0-9]{2}(am|pm)?$/i,"Time","3:30pm"],[/^'[0-9]{2}$/,"Year"],[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/,"Time","3:12:31"],[/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i,"Time","1:12pm"],[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i,"Time","1:12:31pm"],[/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i,"Date","iso-date"],[/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/,"Date","iso-dash"],[/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/,"Date","iso-slash"],[/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/,"Date","iso-dot"],[/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i,"Date","12-dec-2019"],[/^utc ?[+-]?[0-9]+$/,"Timezone","utc-9"],[/^(gmt|utc)[+-][0-9]{1,2}$/i,"Timezone","gmt-3"],[/^[0-9]{3}-[0-9]{4}$/,"PhoneNumber","421-0029"],[/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/,"PhoneNumber","1-800-"],[/^[-+]?[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6][-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?([kmb]|bn)?\+?$/,["Money","Value"],"$5.30"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]\+?$/,["Money","Value"],"5.30£"],[/^[-+]?[$£]?[0-9]([0-9,.])+(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i,["Money","Value"],"$400usd"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/,["Cardinal","NumericValue"],"5,999"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/,["Ordinal","NumericValue"],"53rd"],[/^\.[0-9]+\+?$/,["Cardinal","NumericValue"],".73th"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/,["Percent","Cardinal","NumericValue"],"-4%"],[/^\.[0-9]+%$/,["Percent","Cardinal","NumericValue"],".3%"],[/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/,["Fraction","NumericValue"],"2/3rds"],[/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/,["Value","NumberRange"],"3-4"],[/^[0-9]{1,2}(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9]{1,2}(:[0-9][0-9])?(am|pm)$/,["Time","NumberRange"],"3-4pm"],[/^[0-9.]+([a-z]{1,4})$/,"Value","9km"]],regexText:[[/^#[a-z0-9_\u00C0-\u00FF]{2,}$/i,"HashTag"],[/^@\w{2,}$/,"AtMention"],[/^([A-Z]\.){2}[A-Z]?/i,["Acronym","Noun"],"F.B.I"],[/.{3}[lkmnp]in['‘’‛‵′`´]$/,"Gerund","chillin'"],[/.{4}s['‘’‛‵′`´]$/,"Possessive","flanders'"]],suffixPatterns:[null,null,{ce:Mn,ge:Mn,ie:Mn,er:Bn,ir:Bn,"ée":Bn,"és":Bn,"sé":Bn,"ré":Bn,"çu":Bn,ra:Bn,it:Bn,ez:Bn,if:Nn},{"ité":Mn,eur:Mn,ces:Mn,"ées":Bn,ait:Bn,era:Bn,ser:Bn,ter:Bn,ive:Nn,ifs:Nn,ile:Nn,ale:Nn,ble:Nn,aux:Nn,eux:Nn,nte:Nn},{ment:"Adverb",elle:Nn,bles:Nn,ales:Nn,ique:Nn,aire:Nn,ives:Nn,ntes:Nn,sent:Bn,sion:Mn,eurs:Mn,tion:Mn,ance:Mn},{tions:Mn,ments:Mn,sions:Mn,aient:Bn,arant:Bn,irant:Bn,orant:Bn,urant:Bn,trant:Bn,llant:Bn,elles:Nn,iques:Nn,aires:Nn},{},{}]};let An=new Set(["le","un","du"]),En=new Set(["la","une"]);const Pn=["anse","ette","esse","ance","eine","ure"],xn=["age","isme","eau","ment","in","ou","et","ege","eme","ome","aume","age","isme","an","ent","ai","out","et","eu","ut","is","il","ex"];var Cn=function(e,r){let{tags:i}=e[r];if(!i.has("Noun"))return null;if(i.has("MaleNoun"))return "MaleNoun";if(i.has("FemaleNoun"))return "FemaleNoun";let t=function(e,r){for(let i=1;i<3;i+=1){if(!e[r-i])return null;let t=e[r-i];if(An.has(t.normal))return "MaleNoun";if(En.has(t.normal))return "FemaleNoun"}return null}(e,r);return t=t||function(e,r){for(let i=1;i<2;i+=1){if(!e[r+i])return null;let t=e[r+i];if(t.tags.has("MaleAdjective"))return "MaleNoun";if(t.tags.has("FemaleAdjective"))return "FemaleAdjective"}return null}(e,r),t=t||function(e){return Pn.find((r=>e.normal.endsWith(r)))||xn.find((r=>e.normal.endsWith(r)))?"FemaleNoun":null}(e[r]),t=t||function(e){return e.normal.endsWith("e")?"FemaleNoun":"MaleNoun"}(e[r]),t},On={compute:{tagger:yn,tagRank:Gn},methods:{one:{guessGender:Cn}},model:{two:wn},hooks:["tagger"]};var jn={compute:{postTagger:function(e){e.match("le [#Adjective]",0).tag("MaleNoun","le-adj"),e.match("la [#Adjective]",0).tag("FemaleNoun","la-adj"),e.match("un [#Adjective]",0).tag("MaleNoun","un-adj"),e.match("une [#Adjective]",0).tag("FemaleNoun","une-adj"),e.match("se [#Noun]",0).tag("Verb","se-noun"),e.match("me [#Noun]",0).tag("Verb","me-noun");}},hooks:["postTagger"]};const kn=["Person","Place","Organization"];var Hn={Noun:{not:["Verb","Adjective","Adverb","Value","Determiner"]},Singular:{is:"Noun",not:["Plural"]},ProperNoun:{is:"Noun"},Person:{is:"Singular",also:["ProperNoun"],not:["Place","Organization","Date"]},FirstName:{is:"Person"},MaleName:{is:"FirstName",not:["FemaleName","LastName"]},FemaleName:{is:"FirstName",not:["MaleName","LastName"]},LastName:{is:"Person",not:["FirstName"]},Honorific:{is:"Noun",not:["FirstName","LastName","Value"]},Place:{is:"Singular",not:["Person","Organization"]},Country:{is:"Place",also:["ProperNoun"],not:["City"]},City:{is:"Place",also:["ProperNoun"],not:["Country"]},Region:{is:"Place",also:["ProperNoun"]},Address:{},Organization:{is:"ProperNoun",not:["Person","Place"]},SportsTeam:{is:"Organization"},School:{is:"Organization"},Company:{is:"Organization"},Plural:{is:"Noun",not:["Singular"]},Uncountable:{is:"Noun"},Pronoun:{is:"Noun",not:kn},Actor:{is:"Noun",not:kn},Activity:{is:"Noun",not:["Person","Place"]},Unit:{is:"Noun",not:kn},Demonym:{is:"Noun",also:["ProperNoun"],not:kn},Possessive:{is:"Noun"},MaleNoun:{is:"Noun",not:["FemaleNoun"]},FemaleNoun:{is:"Noun",not:["MaleNoun"]}};var Fn={Adjective:{not:["Noun","Verb","Adverb","Value"]},Comparable:{is:"Adjective"},Comparative:{is:"Adjective"},Superlative:{is:"Adjective",not:["Comparative"]},MaleAdjective:{is:"Adjective",not:["FemaleAdjective"]},FemaleAdjective:{is:"Adjective",not:["MaleAdjective"]},NumberRange:{},Adverb:{not:["Noun","Verb","Adjective","Value"]},Determiner:{not:["Noun","Verb","Adjective","Adverb","QuestionWord","Conjunction"]},Conjunction:{not:["Noun","Verb","Adjective","Adverb","Value","QuestionWord"]},Preposition:{not:["Noun","Verb","Adjective","Adverb","QuestionWord"]},QuestionWord:{not:["Determiner"]},Currency:{is:"Noun"},Expression:{not:["Noun","Adjective","Verb","Adverb"]},Abbreviation:{},Url:{not:["HashTag","PhoneNumber","Verb","Adjective","Value","AtMention","Email"]},PhoneNumber:{not:["HashTag","Verb","Adjective","Value","AtMention","Email"]},HashTag:{},AtMention:{is:"Noun",not:["HashTag","Email"]},Emoji:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Emoticon:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Email:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Acronym:{not:["Plural","RomanNumeral"]},Negative:{not:["Noun","Adjective","Value"]},Condition:{not:["Verb","Adjective","Noun","Value"]}};var Dn={tags:Object.assign({},Hn,{Verb:{not:["Noun","Adjective","Adverb","Value","Expression"]},PresentTense:{is:"Verb",not:["PastTense"]},Infinitive:{is:"PresentTense",not:["Gerund"]},Imperative:{is:"Infinitive"},Gerund:{is:"PresentTense",not:["Copula"]},PastTense:{is:"Verb",not:["PresentTense","Gerund"]},Copula:{is:"Verb"},Modal:{is:"Verb",not:["Infinitive"]},PerfectTense:{is:"Verb",not:["Gerund"]},Pluperfect:{is:"Verb"},Participle:{is:"PastTense"},PhrasalVerb:{is:"Verb"},Particle:{is:"PhrasalVerb",not:["PastTense","PresentTense","Copula","Gerund"]},Auxiliary:{is:"Verb",not:["PastTense","PresentTense","Gerund","Conjunction"]},PresentParticiple:{is:"PresentTense",not:["PastTense","FutureTense"]},PastParticiple:{is:"PastTense",not:["PresentTense","FutureTense"]},PastSimple:{is:"PastTense",not:["PresentTense","FutureTense"]},ConditionalVerb:{is:"Verb"},FutureTense:{is:"Verb",not:["PresentTense","PastTense","Gerund"]}},{Value:{not:["Verb","Adjective","Adverb"]},Ordinal:{is:"Value",not:["Cardinal"]},Cardinal:{is:"Value",not:["Ordinal"]},Fraction:{is:"Value",not:["Noun"]},Multiple:{is:"Value"},RomanNumeral:{is:"Cardinal",not:["TextValue"]},TextValue:{is:"Value",not:["NumericValue"]},NumericValue:{is:"Value",not:["TextValue"]},Money:{is:"Cardinal"},Percent:{is:"Value"}},{Date:{not:["Verb","Adverb","Adjective"]},Month:{is:"Singular",also:["Date"],not:["Year","WeekDay","Time"]},WeekDay:{is:"Noun",also:["Date"]},Year:{is:"Date",not:["RomanNumeral"]},FinancialQuarter:{is:"Date",not:"Fraction"},Holiday:{is:"Date",also:["Noun"]},Season:{is:"Date"},Timezone:{is:"Noun",also:["Date"],not:["ProperNoun"]},Time:{is:"Date",not:["AtMention"]},Duration:{is:"Noun",also:["Date"]}},Fn)};v.plugin(Cs),v.plugin(Dn),v.plugin(Ys),v.plugin(On),v.plugin(jn);const Tn=function(e,r){return v(e,r)};Tn.verbose=function(e){let r="undefined"==typeof process?self.env||{}:process.env;return r.DEBUG_TAGS="tagger"===e||!0===e||"",r.DEBUG_MATCH="match"===e||!0===e||"",r.DEBUG_CHUNKS="chunker"===e||!0===e||"",this};

    /* one/french/App.svelte generated by Svelte v3.43.0 */
    const file = "one/french/App.svelte";

    // (56:4) <Two>
    function create_default_slot_2(ctx) {
    	let code;
    	let current;

    	code = new Code({
    			props: { js: /*example*/ ctx[3], width: "500px" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(code.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(code, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(code.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(code.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(code, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(56:4) <Two>",
    		ctx
    	});

    	return block;
    }

    // (43:2) <Page bottom="40px">
    function create_default_slot_1(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div5;
    	let div4;
    	let div2;
    	let textarea;
    	let t4;
    	let div3;
    	let t5;
    	let two;
    	let current;

    	textarea = new TextArea({
    			props: {
    				value: /*text*/ ctx[1],
    				size: "18px",
    				cb: /*onchange*/ ctx[2],
    				width: "80%",
    				height: "130px"
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

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "fr-compromise";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "part-of speech tagging in french";
    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			create_component(textarea.$$.fragment);
    			t4 = space();
    			div3 = element("div");
    			t5 = space();
    			create_component(two.$$.fragment);
    			attr_dev(div0, "class", "lib");
    			add_location(div0, file, 43, 4, 1102);
    			attr_dev(div1, "class", "down tab desc");
    			add_location(div1, file, 44, 4, 1143);
    			attr_dev(div2, "class", "top");
    			add_location(div2, file, 47, 8, 1272);
    			attr_dev(div3, "class", "res svelte-da5iiy");
    			set_style(div3, "position", "relative");
    			add_location(div3, file, 50, 8, 1402);
    			set_style(div4, "flex-grow", "1");
    			add_location(div4, file, 46, 6, 1238);
    			attr_dev(div5, "class", "both");
    			add_location(div5, file, 45, 4, 1213);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			mount_component(textarea, div2, null);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			div3.innerHTML = /*html*/ ctx[0];
    			insert_dev(target, t5, anchor);
    			mount_component(two, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*html*/ 1) div3.innerHTML = /*html*/ ctx[0];			const two_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				two_changes.$$scope = { dirty, ctx };
    			}

    			two.$set(two_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			transition_in(two.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			transition_out(two.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			destroy_component(textarea);
    			if (detaching) detach_dev(t5);
    			destroy_component(two, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(43:2) <Page bottom=\\\"40px\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:2) <Below>
    function create_default_slot(ctx) {
    	let a0;
    	let t1;
    	let a1;

    	const block = {
    		c: function create() {
    			a0 = element("a");
    			a0.textContent = "docs";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "github";
    			attr_dev(a0, "href", "https://observablehq.com/@spencermountain/fr-compromise");
    			attr_dev(a0, "class", "");
    			add_location(a0, file, 60, 4, 1596);
    			attr_dev(a1, "href", "https://github.com/spencermountain/fr-compromise");
    			attr_dev(a1, "class", "");
    			add_location(a1, file, 61, 4, 1684);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, a1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(a1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(60:2) <Below>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let back;
    	let t0;
    	let page;
    	let t1;
    	let below;
    	let current;

    	back = new Back({
    			props: { href: "https://compromise.cool" },
    			$$inline: true
    		});

    	page = new Page({
    			props: {
    				bottom: "40px",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	below = new Below({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(back.$$.fragment);
    			t0 = space();
    			create_component(page.$$.fragment);
    			t1 = space();
    			create_component(below.$$.fragment);
    			attr_dev(div, "class", "col");
    			add_location(div, file, 40, 0, 1015);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(back, div, null);
    			append_dev(div, t0);
    			mount_component(page, div, null);
    			append_dev(div, t1);
    			mount_component(below, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page_changes = {};

    			if (dirty & /*$$scope, html*/ 17) {
    				page_changes.$$scope = { dirty, ctx };
    			}

    			page.$set(page_changes);
    			const below_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				below_changes.$$scope = { dirty, ctx };
    			}

    			below.$set(below_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(back.$$.fragment, local);
    			transition_in(page.$$.fragment, local);
    			transition_in(below.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(back.$$.fragment, local);
    			transition_out(page.$$.fragment, local);
    			transition_out(below.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(back);
    			destroy_component(page);
    			destroy_component(below);
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

    	let text = `Je m'baladais sur l'avenue le cœur ouvert à l'inconnu
J'avais envie de dire bonjour à n'importe qui
N'importe qui et ce fut toi, je t'ai dit n'importe quoi
Il suffisait de te parler, pour t'apprivoiser
Aux Champs-Elysées, aux Champs-Elysées
Au soleil, sous la pluie, à midi ou à minuit
Il y a tout ce que vous voulez aux Champs-Elysées `;

    	let html = '';

    	const onchange = function () {
    		let doc = Tn(text);

    		$$invalidate(0, html = doc.html({
    			'.nouns': '#Noun+',
    			'.verbs': '#Verb+',
    			'.adjectives': '#Adjective'
    		}));
    	};

    	onchange();

    	let example = `import tal from 'fr-compromise'

let tal = nlp('Aux Champs-Elysées ...')
doc.json()
/*
{
  "text": "Aux Champs-Elysées",
  "terms": [
    {
      "text": "Aux",
      "tags": ["Preposition"],
      "normal": "aux",
      "implicit": "à",
    },
  ...
  ]
}
`;

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Page,
    		Back,
    		Two,
    		TextArea,
    		Below,
    		Code,
    		nlp: Tn,
    		text,
    		html,
    		onchange,
    		example
    	});

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('html' in $$props) $$invalidate(0, html = $$props.html);
    		if ('example' in $$props) $$invalidate(3, example = $$props.example);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [html, text, onchange, example];
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
