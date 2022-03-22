
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

    var r={methods:{one:{},two:{},three:{},four:{}},model:{one:{},two:{},three:{}},compute:{},hooks:[]};const a={compute:function(r){const{world:a}=this,e=a.compute;return "string"==typeof r&&e.hasOwnProperty(r)?e[r](this):(r=>"[object Array]"===Object.prototype.toString.call(r))(r)?r.forEach((r=>a.compute.hasOwnProperty(r)&&e[r](this))):"function"==typeof r?r(this):console.warn("no compute:",r),this}};var e=a;var s={forEach:function(r){return this.fullPointer.forEach(((a,e)=>{let s=this.update([a]);r(s,e);})),this},map:function(r,a){let e=this.fullPointer.map(((a,e)=>{let s=this.update([a]);return r(s,e)}));if(0===e.length)return a||this.update([]);if(void 0!==e[0]){if("string"==typeof e[0])return e;if("object"==typeof e[0]&&(null===e[0]||!e[0].isView))return e}let s=[];return e.forEach((r=>{s=s.concat(r.fullPointer);})),this.toView(s)},filter:function(r){let a=this.fullPointer;return a=a.filter(((a,e)=>{let s=this.update([a]);return r(s,e)})),this.update(a)},find:function(r){let a=this.fullPointer.find(((a,e)=>{let s=this.update([a]);return r(s,e)}));return this.update([a])},some:function(r){return this.fullPointer.some(((a,e)=>{let s=this.update([a]);return r(s,e)}))},random:function(r=1){let a=this.fullPointer,e=Math.floor(Math.random()*a.length);return e+r>this.length&&(e=this.length-r,e=e<0?0:e),a=a.slice(e,e+r),this.update(a)}};const i={termList:function(){return this.methods.one.termList(this.docs)},terms:function(r){let a=this.match(".").toView();return "number"==typeof r?a.eq(r):a},groups:function(r){if(r||0===r)return this.update(this._groups[r]||[]);let a={};return Object.keys(this._groups).forEach((r=>{a[r]=this.update(this._groups[r]);})),a},eq:function(r){let a=this.pointer;return a||(a=this.docs.map(((r,a)=>[a]))),a[r]?this.update([a[r]]):this.none()},first:function(){return this.eq(0)},last:function(){let r=this.fullPointer.length-1;return this.eq(r)},firstTerms:function(){return this.match("^.")},lastTerms:function(){return this.match(".$")},slice:function(r,a){let e=this.pointer||this.docs.map(((r,a)=>[a]));return e=e.slice(r,a),this.update(e)},all:function(){return this.update().toView()},fullSentences:function(){let r=this.fullPointer.map((r=>[r[0]]));return this.update(r).toView()},none:function(){return this.update([])},isDoc:function(r){if(!r||!r.isView)return !1;let a=this.fullPointer,e=r.fullPointer;return !a.length!==e.length&&a.every(((r,a)=>!!e[a]&&(r[0]===e[a][0]&&r[1]===e[a][1]&&r[2]===e[a][2])))},wordCount:function(){return this.docs.reduce(((r,a)=>(r+=a.filter((r=>""!==r.text)).length,r)),0)}};i.group=i.groups,i.fullSentence=i.fullSentences,i.sentence=i.fullSentences,i.lastTerm=i.lastTerms,i.firstTerm=i.firstTerms;var n=i;const o=Object.assign({},n,e,s);o.get=o.eq;var t=o;class View{constructor(a,e,s={}){[["document",a],["world",r],["_groups",s],["_cache",null],["viewType","View"]].forEach((r=>{Object.defineProperty(this,r[0],{value:r[1],writable:!0});})),this.ptrs=e;}get docs(){let a=this.document;return this.ptrs&&(a=r.methods.one.getDoc(this.ptrs,this.document)),a}get pointer(){return this.ptrs}get methods(){return this.world.methods}get model(){return this.world.model}get hooks(){return this.world.hooks}get isView(){return !0}get found(){return this.docs.length>0}get length(){return this.docs.length}get fullPointer(){let{docs:r,ptrs:a,document:e}=this,s=a||r.map(((r,a)=>[a]));return s.map((r=>{let[a,s,i,n,o]=r;return s=s||0,i=i||(e[a]||[]).length,e[a]&&e[a][s]&&(n=n||e[a][s].id,e[a][i-1]&&(o=o||e[a][i-1].id)),[a,s,i,n,o]}))}update(r){let a=new View(this.document,r);if(a._cache&&r&&r.length>1){let e=[];r.forEach((r=>{1===r.length&&e.push(a._cache[r[0]]);})),a._cache=e;}return a.world=this.world,a}toView(r){return void 0===r&&(r=this.pointer),new View(this.document,r)}fromText(r){const{methods:a}=this;let e=a.one.tokenize.fromString(r,this.world),s=new View(e);return s.world=this.world,s.compute(["normal","lexicon","preTagger"]),s}clone(){let r=this.document.slice(0);r=r.map((r=>r.map((r=>((r=Object.assign({},r)).tags=new Set(r.tags),r)))));let a=this.update(this.pointer);return a.document=r,a._cache=this._cache,a}}Object.assign(View.prototype,t);var c=View;const u=function(r){return r&&"object"==typeof r&&!Array.isArray(r)};function l(r,a){if(u(a))for(const e in a)u(a[e])?(r[e]||Object.assign(r,{[e]:{}}),l(r[e],a[e])):Object.assign(r,{[e]:a[e]});return r}var m=function(r,a,e,s){const{methods:i,model:n,compute:o,hooks:t}=a;r.methods&&function(r,a){for(const e in a)r[e]=r[e]||{},Object.assign(r[e],a[e]);}(i,r.methods),r.model&&l(n,r.model),r.compute&&Object.assign(o,r.compute),t&&(a.hooks=t.concat(r.hooks||[])),r.api&&r.api(e),r.lib&&Object.keys(r.lib).forEach((a=>s[a]=r.lib[a])),r.tags&&s.addTags(r.tags),r.words&&s.addWords(r.words),r.mutate&&r.mutate(a);};const d=function(r){return "[object Array]"===Object.prototype.toString.call(r)};var p=function(r,a,e){const{methods:s}=e;let i=new a([]);if(i.world=e,"number"==typeof r&&(r=String(r)),!r)return i;if("string"==typeof r){return new a(s.one.tokenize.fromString(r,e))}if(n=r,"[object Object]"===Object.prototype.toString.call(n)&&r.isView)return new a(r.document,r.ptrs);var n;if(d(r)){if(d(r[0])){let e=r.map((r=>r.map((r=>({text:r,normal:r,pre:"",post:" ",tags:new Set})))));return new a(e)}let e=function(r){return r.map((r=>r.terms.map((r=>(d(r.tags)&&(r.tags=new Set(r.tags)),r)))))}(r);return new a(e)}return i};let h=Object.assign({},r);const v=function(r,a){a&&v.addWords(a);let e=p(r,c,h);return e.compute(h.hooks),e};Object.defineProperty(v,"_world",{value:h,writable:!0}),v.tokenize=function(r,a){const{compute:e}=this._world;a&&v.addWords(a);let s=p(r,c,h);return e.contractions&&s.compute(["alias","normal","machine","contractions"]),s},v.plugin=function(r){return m(r,this._world,c,this),this},v.extend=v.plugin,v.world=function(){return this._world},v.model=function(){return this._world.model},v.methods=function(){return this._world.methods},v.hooks=function(){return this._world.hooks},v.verbose=function(r){let a="undefined"==typeof process?self.env||{}:process.env;return a.DEBUG_TAGS="tagger"===r||!0===r||"",a.DEBUG_MATCH="match"===r||!0===r||"",a.DEBUG_CHUNKS="chunker"===r||!0===r||"",this},v.version="13.11.4-rc7";var f=v;const b=(r,a,e)=>{if(e.forEach((r=>r.dirty=!0)),r){let s=[a,0].concat(e);Array.prototype.splice.apply(r,s);}return r},y=function(r){let a=r[r.length-1];!a||/ $/.test(a.post)||/[-–—]/.test(a.post)||(a.post+=" ");},j=(r,a,e)=>{const s=/[-.?!,;:)–—'"]/g;let i=r[a-1];if(!i)return;let n=i.post;if(s.test(n)){let r=n.match(s).join(""),a=e[e.length-1];a.post=r+a.post,i.post=i.post.replace(s,"");}},z=function(r){return /^[A-Z][a-z'\u00C0-\u00FF]/.test(r)||/^[A-Z]$/.test(r)},x=function(r,a,e,s){let[i,n,o]=a;0===n||o===s[i].length?y(e):(y(e),y([r[a[1]]])),function(r,a,e){let s=r[a];if(0!==a||!z(s.text))return;e[0].text=e[0].text.replace(/^[a-z\u00C0-\u00FF]/,(r=>r.toUpperCase()));let i=r[a];i.tags.has("ProperNoun")||i.tags.has("Acronym")||z(i.text)&&i.text.length>1&&(i.text=i.text.replace(/^[A-Z]/,(r=>r.toLowerCase())));}(r,n,e),b(r,n,e);},w=(new Date).getTime(),G=r=>(r=r.length<3?"0"+r:r).length<3?"0"+r:r;var C=function(r){let[a,e]=r.index||[0,0];var s=(new Date).getTime()-w;s=parseInt(s,10),a=a>46655?46655:a,e=e>1294?1294:e;let i=G((s=s>46655?46655:s).toString(36));i+=G(a.toString(36));let n=e.toString(36);return n=n.length<2?"0"+n:n,i+=n,i+=parseInt(36*Math.random(),10).toString(36),r.normal+"|"+i.toUpperCase()};const A=function(r){if(r.has("@hasContraction")){r.grow("@hasContraction").contractions().expand();}},E=r=>"[object Array]"===Object.prototype.toString.call(r),k=function(r,a,e){const{document:s,world:i}=a;let n=a.fullPointer,o=a.fullPointer;a.forEach(((t,c)=>{let u=t.fullPointer[0],[l]=u,m=s[l],d=function(r,a){const{methods:e}=a;return "string"==typeof r?e.one.tokenize.fromString(r,a)[0]:"object"==typeof r&&r.isView?r.docs[0]:E(r)?E(r[0])?r[0]:r:[]}(r,i);d=function(r){return r.forEach((r=>{r.id=C(r);})),r}(d),e?(A(a.update([u]).firstTerm()),x(m,u,d,s)):(A(a.update([u]).lastTerm()),function(r,a,e,s){let[i,,n]=a,o=(s[i]||[]).length;n<o?(j(r,n,e),y(e)):o===n&&(y(r),j(r,n,e),s[i+1]&&(e[e.length-1].post+=" ")),b(r,a[2],e),a[4]=e[e.length-1].id;}(m,u,d,s)),s[l]&&s[l][u[1]]&&(u[3]=s[l][u[1]].id),o[c]=u,u[2]+=d.length,n[c]=u;}));let t=a.toView(n);return a.ptrs=o,t.compute(["index","lexicon","preTagger"]),t},q={insertAfter:function(r){return k(r,this,!1)},insertBefore:function(r){return k(r,this,!0)}};q.append=q.insertAfter,q.prepend=q.insertBefore,q.insert=q.insertAfter;var P=q;const O=/\$[0-9a-z]+/g,F={};F.replaceWith=function(r,a={}){let e=this.fullPointer,s=this;if("function"==typeof r)return function(r,a){return r.forEach((r=>{let e=a(r);r.replaceWith(e);})),r}(s,r);r=function(r,a){if("string"!=typeof r)return r;let e=a.groups();return r=r.replace(O,(r=>{let a=r.replace(/\$/,"");return e.hasOwnProperty(a)?e[a].text():r})),r}(r,s);let i=this.update(e);e=e.map((r=>r.slice(0,3)));let n=(i.docs[0]||[]).map((r=>Array.from(r.tags)));if(s.insertAfter(r),i.has("@hasContraction")&&s.contractions){s.grow("@hasContraction+").contractions().expand();}s.delete(i);let o=s.toView(e).compute(["index","lexicon","preTagger"]);return a.tags&&o.terms().forEach(((r,a)=>{r.tagSafe(n[a]);})),a.case&&o.docs[0]&&o.docs[0][0]&&0===o.docs[0][0].index[1]&&(o.docs[0][0].text=o.docs[0][0].text.replace(/\w\S*/g,(r=>r.charAt(0).toUpperCase()+r.substr(1).toLowerCase()))),o},F.replace=function(r,a,e){if(r&&!a)return this.replaceWith(r,e);let s=this.match(r);return s.found?s.replaceWith(a,e):this};var D=F;const N={remove:function(r){const{indexN:a}=this.methods.one.pointer;let e=this.all(),s=this;if(r&&(e=this,s=this.match(r)),e.has("@hasContraction")&&e.contractions){e.grow("@hasContraction").contractions().expand();}let i=e.fullPointer,n=s.fullPointer.reverse(),o=function(r,a){a.forEach((a=>{let[e,s,i]=a,n=i-s;r[e]&&(i===r[e].length&&i>1&&function(r,a){let e=r.length-1,s=r[e],i=r[e-a];i&&s&&(i.post+=s.post,i.post=i.post.replace(/ +([.?!,;:])/,"$1"),i.post=i.post.replace(/[,;:]+([.?!])/,"$1"));}(r[e],n),r[e].splice(s,n));}));for(let a=r.length-1;a>=0;a-=1)if(0===r[a].length&&(r.splice(a,1),a===r.length&&r[a-1])){let e=r[a-1],s=e[e.length-1];s&&(s.post=s.post.trimEnd());}return r}(this.document,n),t=a(n);return i=i.map((r=>{let[a]=r;return t[a]?(t[a].forEach((a=>{let e=a[2]-a[1];r[1]<=a[1]&&r[2]>=a[2]&&(r[2]-=e);})),r):r})),i=i.filter(((r,a)=>{if(r[2]-r[1]<=0){for(let r=a+1;r<i.length;r+=1)i.filter((a=>a[0]===r)).forEach((r=>{r[0]-=1;}));return !1}return !0})),i=i.map((r=>(r[3]=null,r[4]=null,r))),e.ptrs=i,e.document=o,e.compute("index"),r?e.toView(i):e.none()}};N.delete=N.remove;var B=N;const T={pre:function(r,a){return void 0===r&&this.found?this.docs[0][0].pre:(this.docs.forEach((e=>{let s=e[0];!0===a?s.pre+=r:s.pre=r;})),this)},post:function(r,a){if(void 0===r){let r=this.docs[this.docs.length-1];return r[r.length-1].post}return this.docs.forEach((e=>{let s=e[e.length-1];!0===a?s.post+=r:s.post=r;})),this},trim:function(){if(!this.found)return this;let r=this.docs,a=r[0][0];a.pre=a.pre.trimStart();let e=r[r.length-1],s=e[e.length-1];return s.post=s.post.trimEnd(),this},hyphenate:function(){return this.docs.forEach((r=>{r.forEach(((a,e)=>{0!==e&&(a.pre=""),r[e+1]&&(a.post="-");}));})),this},dehyphenate:function(){const r=/[-–—]/;return this.docs.forEach((a=>{a.forEach((a=>{r.test(a.post)&&(a.post=" ");}));})),this},toQuotations:function(r,a){return r=r||'"',a=a||'"',this.docs.forEach((e=>{e[0].pre=r+e[0].pre;let s=e[e.length-1];s.post=a+s.post;})),this},toParentheses:function(r,a){return r=r||"(",a=a||")",this.docs.forEach((e=>{e[0].pre=r+e[0].pre;let s=e[e.length-1];s.post=a+s.post;})),this}};T.deHyphenate=T.dehyphenate,T.toQuotation=T.toQuotations;var H=T;var S={alpha:(r,a)=>r.normal<a.normal?-1:r.normal>a.normal?1:0,length:(r,a)=>{let e=r.normal.trim().length,s=a.normal.trim().length;return e<s?1:e>s?-1:0},wordCount:(r,a)=>r.words<a.words?1:r.words>a.words?-1:0,sequential:(r,a)=>r[0]<a[0]?1:r[0]>a[0]?-1:r[1]>a[1]?1:-1,byFreq:function(r){let a={};return r.forEach((r=>{a[r.normal]=a[r.normal]||0,a[r.normal]+=1;})),r.sort(((r,e)=>{let s=a[r.normal],i=a[e.normal];return s<i?1:s>i?-1:0})),r}};const V=new Set(["index","sequence","seq","sequential","chron","chronological"]),I=new Set(["freq","frequency","topk","repeats"]),$=new Set(["alpha","alphabetical"]);var M={unique:function(){let r=new Set,a=this.filter((a=>{let e=a.text("machine");return !r.has(e)&&(r.add(e),!0)}));return a},reverse:function(){let r=this.pointer||this.docs.map(((r,a)=>[a]));return r=[].concat(r),r=r.reverse(),this.update(r)},sort:function(r){let{docs:a,pointer:e}=this;if("function"==typeof r)return function(r,a){let e=r.fullPointer;return e=e.sort(((e,s)=>(e=r.update([e]),s=r.update([s]),a(e,s)))),r.ptrs=e,r}(this,r);r=r||"alpha";let s=e||a.map(((r,a)=>[a])),i=a.map(((r,a)=>({index:a,words:r.length,normal:r.map((r=>r.machine||r.normal||"")).join(" "),pointer:s[a]})));return V.has(r)&&(r="sequential"),$.has(r)&&(r="alpha"),I.has(r)?(i=S.byFreq(i),this.update(i.map((r=>r.pointer)))):"function"==typeof S[r]?(i=i.sort(S[r]),this.update(i.map((r=>r.pointer)))):this}};const L=function(r,a){let e=r[r.length-1],s=e[e.length-1];return !1===/ /.test(s.post)&&(s.post+=" "),r=r.concat(a)};var _={concat:function(r){const{methods:a,document:e,world:s}=this;if("string"==typeof r){let i=a.one.tokenize.fromString(r,s),n=this.fullPointer,o=n[n.length-1][0];return b(e,o+1,i),this.compute("index")}if("object"==typeof r&&r.isView)return function(r,a){if(r.document===a.document){let e=r.fullPointer.concat(a.fullPointer);return r.toView(e).compute("index")}return a.fullPointer.forEach((a=>{a[0]+=r.document.length;})),r.document=L(r.document,a.document),r.all()}(this,r);if(i=r,"[object Array]"===Object.prototype.toString.call(i)){let a=L(this.document,r);return this.document=a,this.all()}var i;return this}};const J=Object.assign({},{toLowerCase:function(){return this.termList().forEach((r=>{r.text=r.text.toLowerCase();})),this},toUpperCase:function(){return this.termList().forEach((r=>{r.text=r.text.toUpperCase();})),this},toTitleCase:function(){return this.termList().forEach((r=>{r.text=r.text.replace(/^ *[a-z\u00C0-\u00FF]/,(r=>r.toUpperCase()));})),this},toCamelCase:function(){return this.docs.forEach((r=>{r.forEach(((a,e)=>{0!==e&&(a.text=a.text.replace(/^ *[a-z\u00C0-\u00FF]/,(r=>r.toUpperCase()))),e!==r.length-1&&(a.post="");}));})),this}},P,D,B,H,M,_);var K=function(r){Object.assign(r.prototype,J);};const W={id:function(r){let a=r.docs;for(let r=0;r<a.length;r+=1)for(let e=0;e<a[r].length;e+=1){let s=a[r][e];s.id=s.id||C(s);}}};var U={api:K,compute:W};const Z=function(r,a){return a?(r.forEach((r=>{let e=r[0];a[e]&&(r[0]=a[e][0],r[1]+=a[e][1],r[2]+=a[e][1]);})),r):r},R=function(r,a){let{ptrs:e,byGroup:s}=r;return e=Z(e,a),Object.keys(s).forEach((r=>{s[r]=Z(s[r],a);})),{ptrs:e,byGroup:s}},Y=r=>r&&"object"==typeof r&&!0===r.isView;var Q={matchOne:function(r,a,e){const s=this.methods.one;if(Y(r))return this.intersection(r).eq(0);"string"==typeof r&&(r=s.parseMatch(r,e));let i={regs:r,group:a,justOne:!0},n=s.match(this.docs,i,this._cache),{ptrs:o,byGroup:t}=R(n,this.fullPointer),c=this.toView(o);return c._groups=t,c},match:function(r,a,e){const s=this.methods.one;if(Y(r))return this.intersection(r);"string"==typeof r&&(r=s.parseMatch(r,e));let i={regs:r,group:a},n=s.match(this.docs,i,this._cache),{ptrs:o,byGroup:t}=R(n,this.fullPointer),c=this.toView(o);return c._groups=t,c},has:function(r,a,e){const s=this.methods.one;let i;if("string"==typeof r){let n={regs:r=s.parseMatch(r,e),group:a,justOne:!0};i=s.match(this.docs,n,this._cache).ptrs;}else Y(r)&&(i=r.fullPointer);return i.length>0},if:function(r,a,e){const s=this.methods.one;if("string"==typeof r){let i={regs:r=s.parseMatch(r,e),group:a,justOne:!0},n=this.fullPointer;return n=n.filter((r=>{let a=this.update([r]);return s.match(a.docs,i,this._cache).ptrs.length>0})),this.update(n)}return Y(r)?this.filter((a=>a.intersection(r).found)):this.none()},ifNo:function(r,a,e){const{methods:s}=this,i=s.one;return Y(r)?this.difference(r):("string"==typeof r&&(r=i.parseMatch(r,e)),this.filter((e=>{let s={regs:r,group:a,justOne:!0};return 0===i.match(e.docs,s,e._cache).ptrs.length})))}};var X={before:function(r,a){const{indexN:e}=this.methods.one.pointer;let s=[],i=e(this.fullPointer);Object.keys(i).forEach((r=>{let a=i[r].sort(((r,a)=>r[1]>a[1]?1:-1))[0];a[1]>0&&s.push([a[0],0,a[1]]);}));let n=this.toView(s);return r?n.match(r,a):n},after:function(r,a){const{indexN:e}=this.methods.one.pointer;let s=[],i=e(this.fullPointer),n=this.document;Object.keys(i).forEach((r=>{let a=i[r].sort(((r,a)=>r[1]>a[1]?-1:1))[0],[e,,o]=a;o<n[e].length&&s.push([e,o,n[e].length]);}));let o=this.toView(s);return r?o.match(r,a):o},growLeft:function(r,a,e){(r=this.world.methods.one.parseMatch(r,e))[r.length-1].end=!0;let s=this.fullPointer;return this.forEach(((e,i)=>{let n=e.before(r,a);if(n.found){let r=n.terms();s[i][1]-=r.length,s[i][3]=r.docs[0][0].id;}})),this.update(s)},growRight:function(r,a,e){(r=this.world.methods.one.parseMatch(r,e))[0].start=!0;let s=this.fullPointer;return this.forEach(((e,i)=>{let n=e.after(r,a);if(n.found){let r=n.terms();s[i][2]+=r.length,s[i][4]=null;}})),this.update(s)},grow:function(r,a){return this.growRight(r,a).growLeft(r,a)}};const rr=function(r,a){return [r[0],r[1],a[2]]},ar=(r,a,e)=>{let s=r;return "string"==typeof r&&(s=a.match(r,e)),s},er=function(r,a){let[e,s]=r;return a.document[e]&&a.document[e][s]&&(r[3]=r[3]||a.document[e][s].id),r},sr={splitOn:function(r,a){const{splitAll:e}=this.methods.one.pointer;let s=ar(r,this,a).fullPointer,i=e(this.fullPointer,s),n=[];return i.forEach((r=>{n.push(r.passthrough),n.push(r.before),n.push(r.match),n.push(r.after);})),n=n.filter((r=>r)),n=n.map((r=>er(r,this))),this.update(n)},splitBefore:function(r,a){const{splitAll:e}=this.methods.one.pointer;let s=ar(r,this,a).fullPointer,i=e(this.fullPointer,s),n=[];return i.forEach((r=>{n.push(r.passthrough),n.push(r.before),r.match&&r.after?n.push(rr(r.match,r.after)):(n.push(r.match),n.push(r.after));})),n=n.filter((r=>r)),n=n.map((r=>er(r,this))),this.update(n)},splitAfter:function(r,a){const{splitAll:e}=this.methods.one.pointer;let s=ar(r,this,a).fullPointer,i=e(this.fullPointer,s),n=[];return i.forEach((r=>{n.push(r.passthrough),r.before&&r.match?n.push(rr(r.before,r.match)):(n.push(r.before),n.push(r.match)),n.push(r.after);})),n=n.filter((r=>r)),n=n.map((r=>er(r,this))),this.update(n)}};sr.split=sr.splitAfter;var ir=sr;const nr=Object.assign({},Q,X,ir);nr.lookBehind=nr.before,nr.lookBefore=nr.before,nr.lookAhead=nr.after,nr.lookAfter=nr.after,nr.notIf=nr.ifNo;var or=function(r){Object.assign(r.prototype,nr);};const tr=/(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/,cr=/([!~[^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/,ur=/ /g,lr=r=>/^[![^]*(<[^<]*>)?\//.test(r)&&/\/[?\]+*$~]*$/.test(r),mr=function(r){return r=(r=r.map((r=>r.trim()))).filter((r=>r))};var dr=function(r){let a=r.split(tr),e=[];a.forEach((r=>{lr(r)?e.push(r):e=e.concat(r.split(cr));})),e=mr(e);let s=[];return e.forEach((r=>{(r=>/^[![^]*(<[^<]*>)?\(/.test(r)&&/\)[?\]+*$~]*$/.test(r))(r)||lr(r)?s.push(r):s=s.concat(r.split(ur));})),s=mr(s),s};const pr=/\{([0-9]+)(, *[0-9]*)?\}/,gr=/&&/,hr=new RegExp(/^<\s*(\S+)\s*>/),vr=r=>r.charAt(0).toUpperCase()+r.substr(1),fr=function(r){return r[r.length-1]},br=function(r){return r[0]},yr=function(r){return r.substr(1)},jr=function(r){return r.substr(0,r.length-1)},zr=function(r){return r=yr(r),r=jr(r)},xr=function(r,a){let e={};for(let s=0;s<2;s+=1){if("$"===fr(r)&&(e.end=!0,r=jr(r)),"^"===br(r)&&(e.start=!0,r=yr(r)),("["===br(r)||"]"===fr(r))&&(e.group=null,"["===br(r)&&(e.groupStart=!0),"]"===fr(r)&&(e.groupEnd=!0),r=(r=r.replace(/^\[/,"")).replace(/\]$/,""),"<"===br(r))){const a=hr.exec(r);a.length>=2&&(e.group=a[1],r=r.replace(a[0],""));}if("+"===fr(r)&&(e.greedy=!0,r=jr(r)),"*"!==r&&"*"===fr(r)&&"\\*"!==r&&(e.greedy=!0,r=jr(r)),"?"===fr(r)&&(e.optional=!0,r=jr(r)),"!"===br(r)&&(e.negative=!0,r=yr(r)),"~"===br(r)&&"~"===fr(r)&&r.length>2&&(r=zr(r),e.fuzzy=!0,e.min=a.fuzzy||.85,!1===/\(/.test(r)))return e.word=r,e;if("("===br(r)&&")"===fr(r)){gr.test(r)?(e.choices=r.split(gr),e.operator="and"):(e.choices=r.split("|"),e.operator="or"),e.choices[0]=yr(e.choices[0]);let s=e.choices.length-1;e.choices[s]=jr(e.choices[s]),e.choices=e.choices.map((r=>r.trim())),e.choices=e.choices.filter((r=>r)),e.choices=e.choices.map((r=>r.split(/ /g).map((r=>xr(r,a))))),r="";}if("/"===br(r)&&"/"===fr(r))return r=zr(r),e.regex=new RegExp(r),e;if("{"===br(r)&&"}"===fr(r))return r=zr(r),/\//.test(r)?(e.sense=r,e.greedy=!0):e.machine=r,e;if("<"===br(r)&&">"===fr(r))return r=zr(r),e.chunk=vr(r),e.greedy=!0,e;if("%"===br(r)&&"%"===fr(r))return r=zr(r),e.switch=r,e}return !0===pr.test(r)&&(r=r.replace(pr,((r,a,s)=>(void 0===s?(e.min=Number(a),e.max=Number(a)):(s=s.replace(/, */,""),e.min=Number(a),e.max=Number(s||999)),e.greedy=!0,e.optional=!0,"")))),"#"===br(r)?(e.tag=yr(r),e.tag=vr(e.tag),e):"@"===br(r)?(e.method=yr(r),e):"."===r?(e.anything=!0,e):"*"===r?(e.anything=!0,e.greedy=!0,e.optional=!0,e):(r&&(r=(r=r.replace("\\*","*")).replace("\\.","."),e.word=r.toLowerCase()),e)};var wr=xr;var Gr=function(r){return r=function(r){let a=0,e=null;for(let s=0;s<r.length;s++){const i=r[s];!0===i.groupStart&&(e=i.group,null===e&&(e=String(a),a+=1)),null!==e&&(i.group=e),!0===i.groupEnd&&(e=null);}return r}(r),r=function(r){return r.map((r=>(r.fuzzy&&r.choices&&r.choices.forEach((a=>{1===a.length&&a[0].word&&(a[0].fuzzy=!0,a[0].min=r.min);})),r)))}(r=r.map((r=>{if(void 0!==r.choices){if("or"!==r.operator)return r;if(!0===r.fuzzy)return r;!0===r.choices.every((r=>{if(1!==r.length)return !1;let a=r[0];return !0!==a.fuzzy&&!a.start&&!a.end&&void 0!==a.word&&!0!==a.negative&&!0!==a.optional&&!0!==a.method}))&&(r.fastOr=new Set,r.choices.forEach((a=>{r.fastOr.add(a[0].word);})),delete r.choices);}return r}))),r};var Cr=function(r,a={}){if(null==r||""===r)return [];"number"==typeof r&&(r=String(r));let e=dr(r);return e=e.map((r=>wr(r,a))),e=Gr(e),e};const Ar=function(r,a){for(let e of a)if(r.has(e))return !0;return !1};var Er=function(r,a){for(let e=0;e<r.length;e+=1){let s=r[e];if(!0!==s.optional&&!0!==s.negation){if(void 0!==s.word&&!1===a.has(s.word))return !0;if(void 0!==s.tag&&!1===a.has("#"+s.tag))return !0;if(s.fastOr&&!1===Ar(s.fastOr,a))return !1}}return !1};var kr=function(r,a,e=3){if(r===a)return 1;if(r.length<e||a.length<e)return 0;const s=function(r,a){let e=r.length,s=a.length;if(0===e)return s;if(0===s)return e;let i=(s>e?s:e)+1;if(Math.abs(e-s)>(i||100))return i||100;let n,o,t,c,u,l,m=[];for(let r=0;r<i;r++)m[r]=[r],m[r].length=i;for(let r=0;r<i;r++)m[0][r]=r;for(let i=1;i<=e;++i)for(o=r[i-1],n=1;n<=s;++n){if(i===n&&m[i][n]>4)return e;t=a[n-1],c=o===t?0:1,u=m[i-1][n]+1,(l=m[i][n-1]+1)<u&&(u=l),(l=m[i-1][n-1]+c)<u&&(u=l);let s=i>1&&n>1&&o===a[n-2]&&r[i-2]===t&&(l=m[i-2][n-2]+c)<u;m[i][n]=s?l:u;}return m[e][s]}(r,a);let i=Math.max(r.length,a.length);return 1-(0===i?0:s/i)};const qr=/([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/,Pr=/([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/,Or=/^[-–—]$/,Fr=/ [-–—] /,Dr=(r,a)=>-1!==r.post.indexOf(a),Nr=(r,a)=>-1!==r.pre.indexOf(a),Br={hasQuote:r=>qr.test(r.pre)||Pr.test(r.post),hasComma:r=>Dr(r,","),hasPeriod:r=>!0===Dr(r,".")&&!1===Dr(r,"..."),hasExclamation:r=>Dr(r,"!"),hasQuestionMark:r=>Dr(r,"?")||Dr(r,"¿"),hasEllipses:r=>Dr(r,"..")||Dr(r,"…")||Nr(r,"..")||Nr(r,"…"),hasSemicolon:r=>Dr(r,";"),hasSlash:r=>/\//.test(r.text),hasHyphen:r=>Or.test(r.post)||Or.test(r.pre),hasDash:r=>Fr.test(r.post)||Fr.test(r.pre),hasContraction:r=>Boolean(r.implicit),isAcronym:r=>r.tags.has("Acronym"),isKnown:r=>r.tags.size>0,isTitleCase:r=>/^[A-Z][a-z'\u00C0-\u00FF]/.test(r.text)};Br.hasQuotation=Br.hasQuote;var Tr=Br;let Hr=function(){};Hr=function(r,a,e,s){let i=function(r,a,e,s){if(!0===a.anything)return !0;if(!0===a.start&&0!==e)return !1;if(!0===a.end&&e!==s-1)return !1;if(void 0!==a.word){if(null!==r.machine&&r.machine===a.word)return !0;if(void 0!==r.alias&&r.alias.hasOwnProperty(a.word))return !0;if(!0===a.fuzzy){if(a.word===r.root)return !0;if(kr(a.word,r.normal)>=a.min)return !0}return !(!r.alias||!r.alias.some((r=>r===a.word)))||a.word===r.text||a.word===r.normal}return void 0!==a.tag?!0===r.tags.has(a.tag):void 0!==a.method?"function"==typeof Tr[a.method]&&!0===Tr[a.method](r):void 0!==a.pre?r.pre&&r.pre.includes(a.pre):void 0!==a.post?r.post&&r.post.includes(a.post):void 0!==a.regex?a.regex.test(r.normal):void 0!==a.chunk?r.chunk===a.chunk:void 0!==a.switch?r.switch===a.switch:void 0!==a.machine?r.normal===a.machine||r.machine===a.machine||r.root===a.machine:void 0!==a.sense?r.sense===a.sense:void 0!==a.fastOr?!(!r.implicit||!0!==a.fastOr.has(r.implicit))||a.fastOr.has(r.normal)||a.fastOr.has(r.text):void 0!==a.choices&&("and"===a.operator?a.choices.every((a=>Hr(r,a,e,s))):a.choices.some((a=>Hr(r,a,e,s))))}(r,a,e,s);return !0===a.negative?!i:i};var Sr=Hr;const Vr="undefined"==typeof process?self.env||{}:process.env,Ir=r=>{Vr.DEBUG_MATCH&&console.log(`\n  [32m ${r} [0m`);},$r=function(r,a){let e=Object.assign({},r.regs[r.r],{start:!1,end:!1}),s=r.t;for(;r.t<r.terms.length;r.t+=1){if(a&&Sr(r.terms[r.t],a,r.start_i+r.t,r.phrase_length))return r.t;let i=r.t-s+1;if(void 0!==e.max&&i===e.max)return r.t;if(!1===Sr(r.terms[r.t],e,r.start_i+r.t,r.phrase_length))return void 0!==e.min&&i<e.min?null:r.t}return r.t},Mr=function(r,a){let e=r.t;if(!a)return r.terms.length;for(;e<r.terms.length;e+=1)if(!0===Sr(r.terms[e],a,r.start_i+e,r.phrase_length))return Ir(`greedyTo ${r.terms[e].normal}`),e;return null},Lr=function(r,a){if(!0===r.end&&!0===r.greedy&&a.start_i+a.t<a.phrase_length-1){let e=Object.assign({},r,{end:!1});if(!0===Sr(a.terms[a.t],e,a.start_i+a.t,a.phrase_length))return Ir(`endGreedy ${a.terms[a.t].normal}`),!0}return !1},_r=function(r,a=0){let e=r.regs[r.r],s=!1;for(let n=0;n<e.choices.length;n+=1){let o=e.choices[n];if(i=o,"[object Array]"!==Object.prototype.toString.call(i))return !1;if(s=o.every(((e,s)=>{let i=0,n=r.t+s+a+i;if(void 0===r.terms[n])return !1;let o=Sr(r.terms[n],e,n+r.start_i,r.phrase_length);if(!0===o&&!0===e.greedy)for(let a=1;a<r.terms.length;a+=1){let s=r.terms[n+a];if(s){if(!0!==Sr(s,e,r.start_i+a,r.phrase_length))break;i+=1;}}return a+=i,o})),s){a+=o.length;break}}var i;return s&&!0===e.greedy?_r(r,a):a},Jr=function(r){let a=0;return !0===r.regs[r.r].choices.every((e=>{let s=e.every(((a,e)=>{let s=r.t+e;return void 0!==r.terms[s]&&Sr(r.terms[s],a,s,r.phrase_length)}));return !0===s&&e.length>a&&(a=e.length),s}))&&(Ir(`doAndBlock ${r.terms[r.t].normal}`),a)},Kr=function(r,a){return r.groups[r.inGroup]||(r.groups[r.inGroup]={start:a,length:0}),r.groups[r.inGroup]};var Wr=function(r,a,e,s){if(0===r.length||0===a.length)return null;let i={t:0,terms:r,r:0,regs:a,groups:{},start_i:e,phrase_length:s,inGroup:null};for(;i.r<a.length;i.r+=1){let r=a[i.r];if(i.hasGroup=Boolean(r.group),!0===i.hasGroup?i.inGroup=r.group:i.inGroup=null,!i.terms[i.t]){if(!1===a.slice(i.r).some((r=>!r.optional)))break;return null}if(!0===r.anything&&!0===r.greedy){let e=Mr(i,a[i.r+1]);if(null===e||0===e)return null;if(void 0!==r.min&&e-i.t<r.min)return null;if(void 0!==r.max&&e-i.t>r.max){i.t=i.t+r.max;continue}if(!0===i.hasGroup){Kr(i,i.t).length=e-i.t;}i.t=e;continue}if(void 0!==r.choices&&"or"===r.operator){let a=_r(i);if(a){if(!0===r.negative)return null;if(!0===i.hasGroup){Kr(i,i.t).length+=a;}if(!0===r.end){let r=i.phrase_length-1;if(i.t+i.start_i!==r)return null}i.t+=a;continue}if(!r.optional)return null}if(void 0!==r.choices&&"and"===r.operator){let a=Jr(i);if(a){if(!0===r.negative)return null;if(!0===i.hasGroup){Kr(i,i.t).length+=a;}if(!0===r.end){let r=i.phrase_length-1;if(i.t+i.start_i!==r)return null}i.t+=a;continue}if(!r.optional)return null}let e=i.terms[i.t],n=Sr(e,r,i.start_i+i.t,i.phrase_length);if(!0===r.anything||!0===n||Lr(r,i)){let n=i.t;if(r.optional&&a[i.r+1]&&r.negative)continue;if(r.optional&&a[i.r+1]){let s=Sr(e,a[i.r+1],i.start_i+i.t,i.phrase_length);if(r.negative||s){let r=i.terms[i.t+1];r&&Sr(r,a[i.r+1],i.start_i+i.t,i.phrase_length)||(i.r+=1);}}if(i.t+=1,!0===r.end&&i.t!==i.terms.length&&!0!==r.greedy)return null;if(!0===r.greedy){if(i.t=$r(i,a[i.r+1]),null===i.t)return null;if(r.min&&r.min>i.t)return null;if(!0===r.end&&i.start_i+i.t!==s)return null}if(!0===i.hasGroup){const a=Kr(i,n);i.t>1&&r.greedy?a.length+=i.t-n:a.length++;}}else {if(r.negative){let a=Object.assign({},r);if(a.negative=!1,!0===Sr(i.terms[i.t],a,i.start_i+i.t,i.phrase_length))return null}if(!0!==r.optional){if(Boolean(i.terms[i.t].implicit)&&a[i.r-1]&&i.terms[i.t+1]){if(i.terms[i.t-1]&&i.terms[i.t-1].implicit===a[i.r-1].word)return null;if(Sr(i.terms[i.t+1],r,i.start_i+i.t,i.phrase_length)){i.t+=2;continue}}return null}}}let n=[null,e,i.t+e];if(n[1]===n[2])return null;let o={};return Object.keys(i.groups).forEach((r=>{let a=i.groups[r],s=e+a.start;o[r]=[null,s,s+a.length];})),{pointer:n,groups:o}};var Ur=function(r,a){let e=[],s={};return 0===r.length||("number"==typeof a&&(a=String(a)),a?r.forEach((r=>{r.groups[a]&&e.push(r.groups[a]);})):r.forEach((r=>{e.push(r.pointer),Object.keys(r.groups).forEach((a=>{s[a]=s[a]||[],s[a].push(r.groups[a]);}));}))),{ptrs:e,byGroup:s}};const Zr=function(r,a){return r.pointer[0]=a,Object.keys(r.groups).forEach((e=>{r.groups[e][0]=a;})),r},Rr=function(r,a,e){let s=Wr(r,a,0,r.length);return s?(s=Zr(s,e),s):null};var Yr=function(r,a,e){e=e||[];let{regs:s,group:i,justOne:n}=a,o=[];if(!s||0===s.length)return {ptrs:[],byGroup:{}};const t=s.filter((r=>!0!==r.optional&&!0!==r.negative)).length;r:for(let a=0;a<r.length;a+=1){let i=r[a];if(!e[a]||!Er(s,e[a]))if(!0!==s[0].start)for(let r=0;r<i.length;r+=1){let e=i.slice(r);if(e.length<t)break;let c=Wr(e,s,r,i.length);if(c){if(c=Zr(c,a),o.push(c),!0===n)break r;let e=c.pointer[2];Math.abs(e-1)>r&&(r=Math.abs(e-1));}}else {let r=Rr(i,s,a);r&&o.push(r);}}return !0===s[s.length-1].end&&(o=o.filter((a=>{let e=a.pointer[0];return r[e].length===a.pointer[2]}))),o=Ur(o,i),o.ptrs.forEach((a=>{let[e,s,i]=a;a[3]=r[e][s].id,a[4]=r[e][i-1].id;})),o};var Qr={api:or,methods:{one:{termMethods:Tr,parseMatch:Cr,match:Yr}},lib:{parseMatch:function(r,a){return this.world().methods.one.parseMatch(r,a)}}};const Xr=/^\../,ra=/^#./,aa=function(r,a){let e={},s={};return Object.keys(a).forEach((i=>{let n=a[i],o=function(r){let a="",e="</span>";return r=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"),Xr.test(r)?a=`<span class="${r.replace(/^\./,"")}"`:ra.test(r)?a=`<span id="${r.replace(/^#/,"")}"`:(a=`<${r}`,e=`</${r}>`),a+=">",{start:a,end:e}}(i);"string"==typeof n&&(n=r.match(n)),n.docs.forEach((r=>{if(r.every((r=>r.implicit)))return;let a=r[0].id;e[a]=e[a]||[],e[a].push(o.start);let i=r[r.length-1].id;s[i]=s[i]||[],s[i].push(o.end);}));})),{starts:e,ends:s}};var ea={html:function(r){let{starts:a,ends:e}=aa(this,r),s="";return this.docs.forEach((r=>{for(let i=0;i<r.length;i+=1){let n=r[i];a.hasOwnProperty(n.id)&&(s+=a[n.id].join("")),s+=n.pre||""+n.text||"",e.hasOwnProperty(n.id)&&(s+=e[n.id].join("")),s+=n.post||"";}})),s}};const sa=/[,:;)\]*.?~!\u0022\uFF02\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+$/,ia=/^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/,na=/[,:;)('"\u201D\]]/,oa=/^[-–—]$/,ta=/ /,ca=function(r,a,e=!0){let s="";return r.forEach((r=>{let e=r.pre||"",i=r.post||"";"some"===a.punctuation&&(e=e.replace(ia,""),oa.test(i)&&(i=" "),i=i.replace(na,""),i=i.replace(/\?!+/,"?"),i=i.replace(/!+/,"!"),i=i.replace(/\?+/,"?"),i=i.replace(/\.{2,}/,"")),"some"===a.whitespace&&(e=e.replace(/\s/,""),i=i.replace(/\s+/," ")),a.keepPunct||(e=e.replace(ia,""),i="-"===i?" ":i.replace(sa,""));let n=r[a.form||"text"]||r.normal||"";"implicit"===a.form&&(n=r.implicit||r.text),"root"===a.form&&r.implicit&&(n=r.root||r.implicit||r.normal),"machine"!==a.form&&"implicit"!==a.form&&"root"!==a.form||!r.implicit||i&&ta.test(i)||(i+=" "),s+=e+n+i;})),!1===e&&(s=s.trim()),!0===a.lowerCase&&(s=s.toLowerCase()),s},ua={text:{form:"text"},normal:{whitespace:"some",punctuation:"some",case:"some",unicode:"some",form:"normal"},machine:{whitespace:"some",punctuation:"some",case:"none",unicode:"some",form:"machine"},root:{whitespace:"some",punctuation:"some",case:"some",unicode:"some",form:"root"},implicit:{form:"implicit"}};ua.clean=ua.normal,ua.reduced=ua.root;var la=ua;const ma={text:!0,terms:!0};let da={case:"none",unicode:"some",form:"machine",punctuation:"some"};const pa=function(r,a){return Object.assign({},r,a)},ga={text:r=>ca(r,{keepPunct:!0},!1),normal:r=>ca(r,pa(la.normal,{keepPunct:!0}),!1),implicit:r=>ca(r,pa(la.implicit,{keepPunct:!0}),!1),machine:r=>ca(r,da,!1),root:r=>ca(r,pa(da,{form:"root"}),!1),offset:r=>{let a=ga.text(r).length;return {index:r[0].offset.index,start:r[0].offset.start,length:a}},terms:r=>r.map((r=>{let a=Object.assign({},r);return a.tags=Array.from(r.tags),a})),confidence:(r,a,e)=>a.eq(e).confidence(),syllables:(r,a,e)=>a.eq(e).syllables(),sentence:(r,a,e)=>a.eq(e).fullSentence().text(),dirty:r=>r.some((r=>!0===r.dirty))};ga.sentences=ga.sentence,ga.clean=ga.normal,ga.reduced=ga.root;const ha={json:function(r){let a=(e=this,"string"==typeof(s=(s=r)||{})&&(s={}),(s=Object.assign({},ma,s)).offset&&e.compute("offset"),e.docs.map(((r,a)=>{let i={};return Object.keys(s).forEach((n=>{s[n]&&ga[n]&&(i[n]=ga[n](r,e,a));})),i})));var e,s;return "number"==typeof r?a[r]:a}};ha.data=ha.json;var va=ha;var fa=function(r){console.log("%c -=-=- ","background-color:#6699cc;"),r.forEach((r=>{console.groupCollapsed(r.text());let a=r.docs[0].map((r=>{let a=r.text||"-";return r.implicit&&(a="["+r.implicit+"]"),{text:a,tags:"["+Array.from(r.tags).join(", ")+"]"}}));console.table(a,["text","tags"]),console.groupEnd();}));};var ba={green:r=>"[32m"+r+"[0m",red:r=>"[31m"+r+"[0m",blue:r=>"[34m"+r+"[0m",magenta:r=>"[35m"+r+"[0m",cyan:r=>"[36m"+r+"[0m",yellow:r=>"[33m"+r+"[0m",black:r=>"[30m"+r+"[0m",dim:r=>"[2m"+r+"[0m",i:r=>"[3m"+r+"[0m"};var ya=function(r){let{docs:a,model:e}=r;0===a.length&&console.log(ba.blue("\n     ──────")),a.forEach((r=>{console.log(ba.blue("\n  ┌─────────")),r.forEach((r=>{let a=[...r.tags||[]],s=r.text||"-";r.sense&&(s="{"+r.sense+"}"),r.implicit&&(s="["+r.implicit+"]"),s=ba.yellow(s);let i="'"+s+"'";i=i.padEnd(18);let n=ba.blue("  │ ")+ba.i(i)+"  - "+function(r,a){return a.one.tagSet&&(r=r.map((r=>{if(!a.one.tagSet.hasOwnProperty(r))return r;const e=a.one.tagSet[r].color||"blue";return ba[e](r)}))),r.join(", ")}(a,e);console.log(n);}));}));};var ja=function(r){let{docs:a}=r;console.log(""),a.forEach((r=>{let a=[];r.forEach((r=>{"Noun"===r.chunk?a.push(ba.blue(r.implicit||r.normal)):"Verb"===r.chunk?a.push(ba.green(r.implicit||r.normal)):"Adjective"===r.chunk?a.push(ba.yellow(r.implicit||r.normal)):"Pivot"===r.chunk?a.push(ba.red(r.implicit||r.normal)):a.push(r.implicit||r.normal);})),console.log(a.join(" "),"\n");}));};var za=function(r){if(!r.found)return;let a={};r.fullPointer.forEach((r=>{a[r[0]]=a[r[0]]||[],a[r[0]].push(r);})),Object.keys(a).forEach((e=>{let s=r.update([[Number(e)]]).text();r.update(a[e]).json({offset:!0}).forEach(((r,a)=>{s=function(r,a,e){let s=((r,a,e)=>{let s=9*e,i=a.start+s,n=i+a.length;return [r.substring(0,i),r.substring(i,n),r.substring(n,r.length)]})(r,a,e);return `${s[0]}${ba.blue(s[1])}${s[2]}`}(s,r.offset,a);})),console.log(s);}));};var xa=function(r={}){let a=this;if("string"==typeof r){let a={};a[r]=!0,r=a;}return "undefined"!=typeof window&&window.document?(fa(a),a):(!1!==r.tags&&(ya(a),console.log("\n")),!0===r.chunks&&(ja(a),console.log("\n")),!0===r.highlight&&(za(a),console.log("\n")),a)};const wa=function(r){let a=r.pre||"",e=r.post||"";return a+r.text+e};var Ga=function(r,a){let e=function(r,a){let e={};return Object.keys(a).forEach((s=>{r.match(s).fullPointer.forEach((r=>{e[r[3]]={fn:a[s],end:r[2]};}));})),e}(r,a),s="";return r.docs.forEach(((a,i)=>{for(let n=0;n<a.length;n+=1){let o=a[n];if(e.hasOwnProperty(o.id)){let{fn:t,end:c}=e[o.id],u=r.update([[i,n,c]]);s+=t(u),n=c-1,s+=a[n].post||"";}else s+=wa(o);}})),s};const Ca={debug:xa,out:function(r){if(a=r,"[object Object]"===Object.prototype.toString.call(a))return Ga(this,r);var a;if("text"===r)return this.text();if("normal"===r)return this.text("normal");if("machine"===r||"reduced"===r)return this.text("machine");if("json"===r)return this.json();if("offset"===r||"offsets"===r)return this.compute("offset"),this.json({offset:!0});if("array"===r){let r=this.docs.map((r=>r.reduce(((r,a)=>r+a.pre+a.text+a.post),"").trim()));return r.filter((r=>r))}if("freq"===r||"frequency"===r||"topk"===r)return function(r){let a={};return r.forEach((r=>{a[r]=a[r]||0,a[r]+=1;})),Object.keys(a).map((r=>({normal:r,count:a[r]}))).sort(((r,a)=>r.count>a.count?-1:0))}(this.json({normal:!0}).map((r=>r.normal)));if("terms"===r){let r=[];return this.docs.forEach((a=>{let e=a.terms.map((r=>r.text));e=e.filter((r=>r)),r=r.concat(e);})),r}return "tags"===r?this.docs.map((r=>r.reduce(((r,a)=>(r[a.implicit||a.normal]=Array.from(a.tags),r)),{}))):"debug"===r?this.debug():this.text()}};var Aa=Ca;var Ea={text:function(r){let a={keepSpace:!0,keepPunct:!0};var e;if(r&&"string"==typeof r&&la.hasOwnProperty(r)?a=Object.assign({},la[r]):r&&(e=r,"[object Object]"===Object.prototype.toString.call(e))&&(a=Object.assign({},r,a)),this.pointer){a.keepSpace=!1;let r=this.pointer[0];r&&r[1]?a.keepPunct=!1:a.keepPunct=!0;}else a.keepPunct=!0;return function(r,a){let e="";for(let s=0;s<r.length;s+=1)e+=ca(r[s],a,!0);return a.keepSpace||(e=e.trim()),!1===a.keepPunct&&(e=e.replace(ia,""),e=e.replace(sa,"")),!0===a.cleanWhitespace&&(e=e.trim()),e}(this.docs,a)}};const ka=Object.assign({},Aa,Ea,va,ea);var qa=function(r){Object.assign(r.prototype,ka);},Pa={api:qa};const Oa=function(r,a){if(r[0]!==a[0])return !1;let[,e,s]=r,[,i,n]=a;return e<=i&&s>i||i<=e&&n>e},Fa=function(r){let a={};return r.forEach((r=>{a[r[0]]=a[r[0]]||[],a[r[0]].push(r);})),a};var Da=function(r,a){let e=Fa(a),s=[];return r.forEach((r=>{let[a]=r,i=e[a]||[];if(i=i.filter((a=>function(r,a){return r[1]<=a[1]&&a[2]<=r[2]}(r,a))),0===i.length)return void s.push({passthrough:r});i=i.sort(((r,a)=>r[1]-a[1]));let n=r;i.forEach(((r,a)=>{let e=function(r,a){let[e,s]=r,i=a[1],n=a[2],o={};if(s<i){let a=i<r[2]?i:r[2];o.before=[e,s,a];}return o.match=a,r[2]>n&&(o.after=[e,n,r[2]]),o}(n,r);i[a+1]?(s.push({before:e.before,match:e.match}),e.after&&(n=e.after)):s.push(e);}));})),s};var Na=function(r,a){let e=[];return r.forEach(((s,i)=>{if(!s)return;let[n,o,t,c,u]=s,l=a[n]||[];if(void 0===o&&(o=0),void 0===t&&(t=l.length),!c||l[o]&&l[o].id===c)l=l.slice(o,t);else {let e=function(r,a,e){for(let s=0;s<4;s+=1){if(a[e-s]){let i=a[e-s].findIndex((a=>a.id===r));if(-1!==i)return [e-s,i]}if(a[e+s]){let i=a[e+s].findIndex((a=>a.id===r));if(-1!==i)return [e+s,i]}}return null}(c,a,n);if(null!==e){let s=t-o;l=a[e[0]].slice(e[1],e[1]+s);let n=l[0]?l[0].id:null;r[i]=[e[0],e[1],e[1]+s,n];}}0!==l.length&&o!==t&&(u&&l[l.length-1].id!==u&&(l=function(r,a){let[e,s,,,i]=r,n=a[e],o=n.findIndex((r=>r.id===i));return -1===o?(r[2]=a[e].length,r[4]=n.length?n[n.length-1].id:null):r[2]=o,a[e].slice(s,r[2]+1)}(s,a)),e.push(l));})),e};var Ba={one:{termList:function(r){let a=[];for(let e=0;e<r.length;e+=1)for(let s=0;s<r[e].length;s+=1)a.push(r[e][s]);return a},getDoc:Na,pointer:{indexN:Fa,splitAll:Da}}};var Ta=function(r,a){let e=r.concat(a),s=Fa(e),i=[];return e.forEach((r=>{let[a]=r;if(1===s[a].length)return void i.push(r);let e=s[a].filter((a=>Oa(r,a)));e.push(r);let n=function(r){let a=r[0][1],e=r[0][2];return r.forEach((r=>{r[1]<a&&(a=r[1]),r[2]>e&&(e=r[2]);})),[r[0][0],a,e]}(e);i.push(n);})),i=function(r){let a={};for(let e=0;e<r.length;e+=1)a[r[e].join(",")]=r[e];return Object.values(a)}(i),i};var Ha=function(r,a){let e=[];return Da(r,a).forEach((r=>{r.passthrough&&e.push(r.passthrough),r.before&&e.push(r.before),r.after&&e.push(r.after);})),e};var Sa=function(r,a){let e=Fa(a),s=[];return r.forEach((r=>{let a=e[r[0]]||[];a=a.filter((a=>Oa(r,a))),0!==a.length&&a.forEach((a=>{let e=function(r,a){let e=r[1]<a[1]?a[1]:r[1],s=r[2]>a[2]?a[2]:r[2];return e<s?[r[0],e,s]:null}(r,a);e&&s.push(e);}));})),s};const Va=(r,a)=>"string"==typeof r?a.match(r):r,Ia=function(r,a){return r.map((r=>{let[e,s]=r;return a[e]&&a[e][s]&&(r[3]=a[e][s].id),r}))},$a={union:function(r){r=Va(r,this);let a=Ta(this.fullPointer,r.fullPointer);return a=Ia(a,this.document),this.toView(a)}};$a.and=$a.union,$a.intersection=function(r){r=Va(r,this);let a=Sa(this.fullPointer,r.fullPointer);return a=Ia(a,this.document),this.toView(a)},$a.not=function(r){r=Va(r,this);let a=Ha(this.fullPointer,r.fullPointer);return a=Ia(a,this.document),this.toView(a)},$a.difference=$a.not,$a.complement=function(){let r=this.all(),a=Ha(r.fullPointer,this.fullPointer);return a=Ia(a,this.document),this.toView(a)},$a.settle=function(){let r=this.fullPointer;return r.forEach((a=>{r=Ta(r,[a]);})),r=Ia(r,this.document),this.update(r)};var Ma=function(r){Object.assign(r.prototype,$a);},La={methods:Ba,api:Ma};const _a=/ /,Ja=function(r,a){"Noun"===a&&(r.chunk=a),"Verb"===a&&(r.chunk=a);},Ka=function(r,a,e,s){if(!0===r.tags.has(a))return null;if("."===a)return null;let i=e[a];if(i){if(i.not&&i.not.length>0)for(let a=0;a<i.not.length;a+=1){if(!0===s&&r.tags.has(i.not[a]))return null;r.tags.delete(i.not[a]);}if(i.parents&&i.parents.length>0)for(let a=0;a<i.parents.length;a+=1)r.tags.add(i.parents[a]),Ja(r,i.parents[a]);}return r.tags.add(a),r.dirty=!0,Ja(r,a),!0},Wa=function(r,a,e={},s,i){const n=e.model.one.tagSet||{};if(!a)return;let o="undefined"==typeof process?self.env||{}:process.env;var t;if(o&&o.DEBUG_TAGS&&((r,a,e="")=>{let s=r.text||"["+r.implicit+"]";var i;"string"!=typeof a&&a.length>2&&(a=a.slice(0,2).join(", #")+" +"),a="string"!=typeof a?a.join(", #"):a,console.log(` ${(i=s,"[33m[3m"+i+"[0m").padEnd(24)} [32m→[0m #${a.padEnd(25)}  ${(r=>"[3m"+r+"[0m")(e)}`);})(r[0],a,i),!0!=(t=a,"[object Array]"===Object.prototype.toString.call(t)))if(a=a.trim(),_a.test(a))!function(r,a,e,s){let i=a.split(_a);r.forEach(((r,a)=>{let n=i[a];n&&(n=n.replace(/^#/,""),Ka(r,n,e,s));}));}(r,a,n,s);else {a=a.replace(/^#/,"");for(let e=0;e<r.length;e+=1)Ka(r[e],a,n,s);}else a.forEach((a=>Wa(r,a,e,s)));};var Ua=Wa;var Za=function(r,a,e){a=a.trim().replace(/^#/,"");for(let s=0;s<r.length;s+=1){let i=r[s];if("*"===a){i.tags.clear();continue}let n=e[a];if(n&&n.children.length>0)for(let r=0;r<n.children.length;r+=1)i.tags.delete(n.children[r]);i.tags.delete(a);}};const Ra=function(r){return r.children=r.children||[],r._cache=r._cache||{},r.props=r.props||{},r._cache.parents=r._cache.parents||[],r._cache.children=r._cache.children||[],r},Ya=/^ *(#|\/\/)/,Qa=function(r){let a=r.trim().split(/->/),e=[];a.forEach((r=>{e=e.concat(function(r){if(!(r=r.trim()))return null;if(/^\[/.test(r)&&/\]$/.test(r)){let a=(r=(r=r.replace(/^\[/,"")).replace(/\]$/,"")).split(/,/);return a=a.map((r=>r.trim())).filter((r=>r)),a=a.map((r=>Ra({id:r}))),a}return [Ra({id:r})]}(r));})),e=e.filter((r=>r));let s=e[0];for(let r=1;r<e.length;r+=1)s.children.push(e[r]),s=e[r];return e[0]},Xa=(r,a)=>{let e=[],s=[r];for(;s.length>0;){let r=s.pop();e.push(r),r.children&&r.children.forEach((e=>{a&&a(r,e),s.push(e);}));}return e},re=r=>"[object Array]"===Object.prototype.toString.call(r),ae=r=>(r=r||"").trim(),ee=function(r=[]){return "string"==typeof r?function(r){let a=r.split(/\r?\n/),e=[];a.forEach((r=>{if(!r.trim()||Ya.test(r))return;let a=(r=>{const a=/^( {2}|\t)/;let e=0;for(;a.test(r);)r=r.replace(a,""),e+=1;return e})(r);e.push({indent:a,node:Qa(r)});}));let s=function(r){let a={children:[]};return r.forEach(((e,s)=>{0===e.indent?a.children=a.children.concat(e.node):r[s-1]&&function(r,a){let e=r[a].indent;for(;a>=0;a-=1)if(r[a].indent<e)return r[a];return r[0]}(r,s).node.children.push(e.node);})),a}(e);return s=Ra(s),s}(r):re(r)?function(r){let a={};r.forEach((r=>{a[r.id]=r;}));let e=Ra({});return r.forEach((r=>{if((r=Ra(r)).parent)if(a.hasOwnProperty(r.parent)){let e=a[r.parent];delete r.parent,e.children.push(r);}else console.warn(`[Grad] - missing node '${r.parent}'`);else e.children.push(r);})),e}(r):(Xa(a=r).forEach(Ra),a);var a;},se=function(r,a){let e="-> ";a&&(e=(r=>"[2m"+r+"[0m")("→ "));let s="";return Xa(r).forEach(((r,i)=>{let n=r.id||"";if(a&&(n=(r=>"[31m"+r+"[0m")(n)),0===i&&!r.id)return;let o=r._cache.parents.length;s+="    ".repeat(o)+e+n+"\n";})),s},ie=function(r){let a=Xa(r);a.forEach((r=>{delete(r=Object.assign({},r)).children;}));let e=a[0];return e&&!e.id&&0===Object.keys(e.props).length&&a.shift(),a},ne={text:se,txt:se,array:ie,flat:ie},oe=function(r,a){return "nested"===a||"json"===a?r:"debug"===a?(console.log(se(r,!0)),null):ne.hasOwnProperty(a)?ne[a](r):r},te=r=>{Xa(r,((r,a)=>{r.id&&(r._cache.parents=r._cache.parents||[],a._cache.parents=r._cache.parents.concat([r.id]));}));},ce=/\//;class g{constructor(r={}){Object.defineProperty(this,"json",{enumerable:!1,value:r,writable:!0});}get children(){return this.json.children}get id(){return this.json.id}get found(){return this.json.id||this.json.children.length>0}props(r={}){let a=this.json.props||{};return "string"==typeof r&&(a[r]=!0),this.json.props=Object.assign(a,r),this}get(r){if(r=ae(r),!ce.test(r)){let a=this.json.children.find((a=>a.id===r));return new g(a)}let a=((r,a)=>{let e=(r=>"string"!=typeof r?r:(r=r.replace(/^\//,"")).split(/\//))(a=a||"");for(let a=0;a<e.length;a+=1){let s=r.children.find((r=>r.id===e[a]));if(!s)return null;r=s;}return r})(this.json,r)||Ra({});return new g(a)}add(r,a={}){if(re(r))return r.forEach((r=>this.add(ae(r),a))),this;r=ae(r);let e=Ra({id:r,props:a});return this.json.children.push(e),new g(e)}remove(r){return r=ae(r),this.json.children=this.json.children.filter((a=>a.id!==r)),this}nodes(){return Xa(this.json).map((r=>(delete(r=Object.assign({},r)).children,r)))}cache(){return (r=>{let a=Xa(r,((r,a)=>{r.id&&(r._cache.parents=r._cache.parents||[],r._cache.children=r._cache.children||[],a._cache.parents=r._cache.parents.concat([r.id]));})),e={};a.forEach((r=>{r.id&&(e[r.id]=r);})),a.forEach((r=>{r._cache.parents.forEach((a=>{e.hasOwnProperty(a)&&e[a]._cache.children.push(r.id);}));})),r._cache.children=Object.keys(e);})(this.json),this}list(){return Xa(this.json)}fillDown(){var r;return r=this.json,Xa(r,((r,a)=>{a.props=((r,a)=>(Object.keys(a).forEach((e=>{if(a[e]instanceof Set){let s=r[e]||new Set;r[e]=new Set([...s,...a[e]]);}else if((r=>r&&"object"==typeof r&&!Array.isArray(r))(a[e])){let s=r[e]||{};r[e]=Object.assign({},a[e],s);}else re(a[e])?r[e]=a[e].concat(r[e]||[]):void 0===r[e]&&(r[e]=a[e]);})),r))(a.props,r.props);})),this}depth(){te(this.json);let r=Xa(this.json),a=r.length>1?1:0;return r.forEach((r=>{if(0===r._cache.parents.length)return;let e=r._cache.parents.length+1;e>a&&(a=e);})),a}out(r){return te(this.json),oe(this.json,r)}debug(){return te(this.json),oe(this.json,"debug"),this}}const ue=function(r){let a=ee(r);return new g(a)};ue.prototype.plugin=function(r){r(this);};var le={Noun:"blue",Verb:"green",Negative:"green",Date:"red",Value:"red",Adjective:"magenta",Preposition:"cyan",Conjunction:"cyan",Determiner:"cyan",Adverb:"cyan"};const me=function(r){if(le.hasOwnProperty(r.id))return le[r.id];if(le.hasOwnProperty(r.is))return le[r.is];let a=r._cache.parents.find((r=>le[r]));return le[a]};var de=function(r){const a={};return r.forEach((r=>{let{not:e,also:s,is:i}=r.props,n=r._cache.parents;s&&(n=n.concat(s)),a[r.id]={is:i,not:e,also:s,parents:n,children:r._cache.children,color:me(r)};})),Object.keys(a).forEach((r=>{let e=new Set(a[r].not);a[r].not.forEach((r=>{a[r]&&a[r].children.forEach((r=>e.add(r)));})),a[r].not=Array.from(e);})),a};const pe=function(r){return r?"string"==typeof r?[r]:r:[]};var ge=function(r,a){return r=function(r,a){return Object.keys(r).forEach((e=>{r[e].isA&&(r[e].is=r[e].isA),r[e].notA&&(r[e].not=r[e].notA),r[e].is&&"string"==typeof r[e].is&&(a.hasOwnProperty(r[e].is)||r.hasOwnProperty(r[e].is)||(r[r[e].is]={})),r[e].not&&"string"==typeof r[e].not&&!r.hasOwnProperty(r[e].not)&&(a.hasOwnProperty(r[e].not)||r.hasOwnProperty(r[e].not)||(r[r[e].not]={}));})),r}(r,a),Object.keys(r).forEach((a=>{r[a].children=pe(r[a].children),r[a].not=pe(r[a].not);})),Object.keys(r).forEach((a=>{(r[a].not||[]).forEach((e=>{r[e]&&r[e].not&&r[e].not.push(a);}));})),r};var he=function(r,a){r=ge(r,a);const e=function(r){const a=Object.keys(r).map((a=>{let e=r[a];const s={not:new Set(e.not),also:e.also,is:e.is};return {id:a,parent:e.is,props:s,children:[]}}));return ue(a).cache().fillDown().out("array")}(Object.assign({},a,r));return de(e)},ve={one:{setTag:Ua,unTag:Za,addTags:he}};const fe=function(r){return "[object Array]"===Object.prototype.toString.call(r)},be={tag:function(r,a="",e){if(!this.found||!r)return this;let s=this.termList();if(0===s.length)return this;const{methods:i,verbose:n,world:o}=this;return !0===n&&console.log(" +  ",r,a||""),fe(r)?r.forEach((r=>i.one.setTag(s,r,o,e))):i.one.setTag(s,r,o,e),this.uncache(),this},tagSafe:function(r,a=""){return this.tag(r,a,!0)},unTag:function(r,a){if(!this.found||!r)return this;let e=this.termList();if(0===e.length)return this;const{methods:s,verbose:i,model:n}=this;!0===i&&console.log(" -  ",r,a||"");let o=n.one.tagSet;return fe(r)?r.forEach((r=>s.one.unTag(e,r,o))):s.one.unTag(e,r,o),this.uncache(),this},canBe:function(r){let a=this.model.one.tagSet;if(!a.hasOwnProperty(r))return this;let e=a[r].not||[],s=[];this.document.forEach(((r,a)=>{r.forEach(((r,i)=>{e.find((a=>r.tags.has(a)))&&s.push([a,i,i+1]);}));}));let i=this.update(s);return this.difference(i)}};var ye=be;var je=function(r){Object.assign(r.prototype,ye);};var ze={addTags:function(r){const{model:a,methods:e}=this.world(),s=a.one.tagSet;let i=(0, e.one.addTags)(r,s);return a.one.tagSet=i,this}};const xe=new Set(["Auxiliary","Possessive"]);var we=function(r){const{document:a,world:e}=r,s=e.model.one.tagSet;a.forEach((r=>{r.forEach((r=>{let a=Array.from(r.tags);r.tagRank=function(r,a){return r=r.sort(((r,e)=>{if(xe.has(r)||!a.hasOwnProperty(e))return 1;if(xe.has(e)||!a.hasOwnProperty(r))return -1;let s=a[r].children||[],i=s.length;return s=a[e].children||[],i-s.length})),r}(a,s);}));}));},Ge={model:{one:{tagSet:{}}},compute:{tagRank:we},methods:ve,api:je,lib:ze};const Ce=/(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s|$)/g,Ae=/((?:\r?\n|\r)+)/;var Ee=function(r){let a=[],e=r.split(Ae);for(let r=0;r<e.length;r++){let s=e[r].split(Ce);for(let r=0;r<s.length;r++)a.push(s[r]);}return a};const ke=/[ .][A-Z]\.? *$/i,qe=/(?:\u2026|\.{2,}) *$/,Pe=/[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;var Oe=function(r,a){if(!1===Pe.test(r))return !1;if(!0===ke.test(r))return !1;if(!0===qe.test(r))return !1;let e=r.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/,"").split(" "),s=e[e.length-1].toLowerCase();return !0!==a.hasOwnProperty(s)};const Fe=/\S/,De=/^\s+/,Ne=/[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i;var Be=function(r,a){let e=a.one.abbreviations||new Set;r=r||"";let s=[],i=[];if(!(r=String(r))||"string"!=typeof r||!1===Fe.test(r))return s;r=r.replace(" "," ");let n=Ee(r);for(let r=0;r<n.length;r++){let a=n[r];if(void 0!==a&&""!==a){if(!1===Fe.test(a)||!1===Ne.test(a)){if(i[i.length-1]){i[i.length-1]+=a;continue}if(n[r+1]){n[r+1]=a+n[r+1];continue}}i.push(a);}}for(let r=0;r<i.length;r++){let a=i[r];i[r+1]&&!1===Oe(a,e)?i[r+1]=a+(i[r+1]||""):a&&a.length>0&&(s.push(a),i[r]="");}if(0===s.length)return [r];for(let r=1;r<s.length;r+=1){let a=s[r].match(De);null!==a&&(s[r-1]+=a[0],s[r]=s[r].replace(De,""));}return s};const Te=function(r,a){let e=r.split(/[-–—]/);if(e.length<=1)return !1;const{prefixes:s,suffixes:i}=a.one;if(s.hasOwnProperty(e[0]))return !1;if(e[1]=e[1].trim().replace(/[.?!]$/,""),i.hasOwnProperty(e[1]))return !1;if(!0===/^([a-z\u00C0-\u00FF`"'/]+)[-–—]([a-z0-9\u00C0-\u00FF].*)/i.test(r))return !0;return !0===/^([0-9]{1,4})[-–—]([a-z\u00C0-\u00FF`"'/-]+$)/i.test(r)},He=function(r){let a=[];const e=r.split(/[-–—]/);let s="-",i=r.match(/[-–—]/);i&&i[0]&&(s=i);for(let r=0;r<e.length;r++)r===e.length-1?a.push(e[r]):a.push(e[r]+s);return a};var Se=function(r){const a=/^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?[-–—] ?$/,e=/^[0-9]{1,4}([a-z]{1,2})? ?$/;for(let s=0;s<r.length-1;s+=1)r[s+1]&&a.test(r[s])&&e.test(r[s+1])&&(r[s]=r[s]+r[s+1],r[s+1]=null);return r};const Ve=/[a-z] ?\/ ?[a-z]+$/;var Ie=function(r){for(let a=1;a<r.length-1;a++)Ve.test(r[a])&&(r[a-1]+=r[a]+r[a+1],r[a]=null,r[a+1]=null);return r};const $e=/\S/,Me=/^[!?.]+$/,Le=/(\S+)/;let _e=[".","?","!",":",";","-","–","—","--","...","(",")","[","]",'"',"'","`"];_e=_e.reduce(((r,a)=>(r[a]=!0,r)),{});var Je=function(r,a){let e=[],s=[];if("number"==typeof(r=r||"")&&(r=String(r)),function(r){return "[object Array]"===Object.prototype.toString.call(r)}(r))return r;const i=r.split(Le);for(let r=0;r<i.length;r++)!0!==Te(i[r],a)?s.push(i[r]):s=s.concat(He(i[r]));let n="";for(let r=0;r<s.length;r++){let a=s[r];!0===$e.test(a)&&!1===_e.hasOwnProperty(a)&&!1===Me.test(a)?(e.length>0?(e[e.length-1]+=n,e.push(a)):e.push(n+a),n=""):n+=a;}return n&&(0===e.length&&(e[0]=""),e[e.length-1]+=n),e=Ie(e),e=Se(e),e=e.filter((r=>r)),e};const Ke=/^[ \n\t.[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/,We=/[ \n\t.'[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/,Ue=/['’]/,Ze=/^[a-z]\.([a-z]\.)+/i,Re=/^[-+.][0-9]/,Ye=/^'[0-9]{2}/;var Qe=function(r){let a=r,e="",s="";return ""===(r=(r=r.replace(Ke,(a=>(e=a,"-"!==e&&"+"!==e&&"."!==e||!Re.test(r)?"'"===e&&Ye.test(r)?(e="",a):"":(e="",a))))).replace(We,(i=>(s=i,Ue.test(i)&&/[sn]['’]$/.test(a)&&!1===Ue.test(e)?(s=s.replace(Ue,""),"'"):!0===Ze.test(r)?(s=s.replace(/\./,""),"."):""))))&&(a=a.replace(/ *$/,(r=>(s=r||"",""))),r=a,e=""),{str:r,pre:e,post:s}};var Xe=function(r){let a=r=(r=(r=r||"").toLowerCase()).trim();return r=(r=(r=r.replace(/[,;.!?]+$/,"")).replace(/\u2026/g,"...")).replace(/\u2013/g,"-"),!1===/^[:;]/.test(r)&&(r=(r=(r=r.replace(/\.{3,}$/g,"")).replace(/[",.!:;?)]+$/g,"")).replace(/^['"(]+/g,"")),""===(r=(r=r.replace(/[\u200B-\u200D\uFEFF]/g,"")).trim())&&(r=a),r=r.replace(/([0-9]),([0-9])/g,"$1$2")};const rs=/([A-Z]\.)+[A-Z]?,?$/,as=/^[A-Z]\.,?$/,es=/[A-Z]{2,}('s|,)?$/,ss=/([a-z]\.)+[a-z]\.?$/;var is=function(r){return function(r){return !0===rs.test(r)||!0===ss.test(r)||!0===as.test(r)||!0===es.test(r)}(r)&&(r=r.replace(/\./g,"")),r};var ns=function(r,a){const e=a.methods.one.killUnicode;let s=r.text||"";s=Xe(s),s=e(s,a),s=is(s),r.normal=s;};var os=function(r,a){const e=a.model.one.unicode||{};let s=r.split("");return s.forEach(((r,a)=>{e[r]&&(s[a]=e[r]);})),s.join("")};var ts={one:{killUnicode:os,tokenize:{splitSentences:Be,splitTerms:Je,splitWhitespace:r=>{let{str:a,pre:e,post:s}=Qe(r);return {text:a,pre:e,post:s,tags:new Set}},fromString:function(r,a){const{methods:e,model:s}=a,{splitSentences:i,splitTerms:n,splitWhitespace:o}=e.one.tokenize;return r=i(r=r||"",s).map((r=>{let e=n(r,s);return e=e.map(o),e.forEach((r=>{ns(r,a);})),e})),r}}}};var cs={"&":"and","@":"at","%":"percent"};let us={},ls={};[[["approx","apt","bc","cyn","eg","esp","est","etc","ex","exp","prob","pron","gal","min","pseud","fig","jd","lat","lng","vol","fm","def","misc","plz","ea","ps","sec","pt","pref","pl","pp","qt","fr","sq","nee","ss","tel","temp","vet","ver","fem","masc","eng","adj","vb","rb","inf","situ","vivo","vitro","wr"]],[["dl","ml","gal","ft","qt","pt","tbl","tsp","tbsp","km","dm","cm","mm","mi","td","hr","hrs","kg","hg","dg","cg","mg","µg","lb","oz","sq ft","hz","mps","mph","kmph","kb","mb","gb","tb","lx","lm","pa","fl oz","yb"],"Unit"],[["ad","al","arc","ba","bl","ca","cca","col","corp","ft","fy","ie","lit","ma","md","pd","tce"],"Noun"],[["adj","adm","adv","asst","atty","bldg","brig","capt","cmdr","comdr","cpl","det","dr","esq","gen","gov","hon","jr","llb","lt","maj","messrs","mister","mlle","mme","mr","mrs","ms","mstr","phd","prof","pvt","rep","reps","res","rev","sen","sens","sfc","sgt","sir","sr","supt","surg"],"Honorific"],[["jan","feb","mar","apr","jun","jul","aug","sep","sept","oct","nov","dec"],"Month"],[["dept","univ","assn","bros","inc","ltd","co"],"Organization"],[["rd","st","dist","mt","ave","blvd","cl","cres","hwy","ariz","cal","calif","colo","conn","fla","fl","ga","ida","ia","kan","kans","minn","neb","nebr","okla","penna","penn","pa","dak","tenn","tex","ut","vt","va","wis","wisc","wy","wyo","usafa","alta","ont","que","sask"],"Place"]].forEach((r=>{r[0].forEach((a=>{us[a]=!0,ls[a]="Abbreviation",void 0!==r[1]&&(ls[a]=[ls[a],r[1]]);}));}));var ms=["anti","bi","co","contra","counter","de","extra","infra","inter","intra","macro","micro","mid","mis","mono","multi","non","over","peri","post","pre","pro","proto","pseudo","re","semi","sub","supra","trans","tri","un","out"].reduce(((r,a)=>(r[a]=!0,r)),{});let ds={"!":"¡","?":"¿Ɂ",'"':'“”"❝❞',"'":"‘‛❛❜’","-":"—–",a:"ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",b:"ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",c:"¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",d:"ÐĎďĐđƉƊȡƋƌ",e:"ÈÉÊËèéêëĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ",f:"ƑƒϜϝӺӻҒғſ",g:"ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",h:"ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",I:"ÌÍÎÏ",i:"ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",j:"ĴĵǰȷɈɉϳЈј",k:"ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",l:"ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",m:"ΜϺϻМмӍӎ",n:"ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",o:"ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",p:"ƤΡρϷϸϼРрҎҏÞ",q:"Ɋɋ",r:"ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",s:"ŚśŜŝŞşŠšƧƨȘșȿЅѕ",t:"ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",u:"µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",v:"νѴѵѶѷ",w:"ŴŵƜωώϖϢϣШЩшщѡѿ",x:"×ΧχϗϰХхҲҳӼӽӾӿ",y:"ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",z:"ŹźŻżŽžƵƶȤȥɀΖ"},ps={};Object.keys(ds).forEach((function(r){ds[r].split("").forEach((function(a){ps[a]=r;}));}));const gs=/\//,hs=/[a-z]\.[a-z]/i,vs=/[0-9]/;var fs=function(r,a){let e=r.normal||r.text;const s=a.model.one.aliases;if(s.hasOwnProperty(e)&&(r.alias=r.alias||[],r.alias.push(s[e])),gs.test(e)&&!hs.test(e)&&!vs.test(e)){let a=e.split(gs);a.length<=2&&a.forEach((a=>{""!==(a=a.trim())&&(r.alias=r.alias||[],r.alias.push(a));}));}return r};var bs=function(r){let a=r.implicit||r.normal||r.text;a=a.replace(/['’]s$/,""),a=a.replace(/s['’]$/,"s"),a=a.replace(/([aeiou][ktrp])in'$/,"$1ing"),!0===/^(re|un)-?[^aeiou]./.test(a)&&(a=a.replace("-","")),a=a.replace(/^[#@]/,""),a!==r.normal&&(r.machine=a);};var ys=function(r){let a=r.docs,e={};for(let r=0;r<a.length;r+=1)for(let s=0;s<a[r].length;s+=1){let i=a[r][s],n=i.machine||i.normal;e[n]=e[n]||0,e[n]+=1;}for(let r=0;r<a.length;r+=1)for(let s=0;s<a[r].length;s+=1){let i=a[r][s],n=i.machine||i.normal;i.freq=e[n];}};var js=function(r){let a=0,e=0,s=r.document;for(let r=0;r<s.length;r+=1)for(let i=0;i<s[r].length;i+=1){let n=s[r][i];n.offset={index:e,start:a+n.pre.length,length:n.text.length},a+=n.pre.length+n.text.length+n.post.length,e+=1;}};var zs=function(r){let a=r.document;for(let r=0;r<a.length;r+=1)for(let e=0;e<a[r].length;e+=1)a[r][e].index=[r,e];};var xs=function(r){let a=0,e=r.docs;for(let r=0;r<e.length;r+=1)for(let s=0;s<e[r].length;s+=1)""!==e[r][s].normal&&(a+=1,e[r][s].wordCount=a);};const ws=function(r,a){let e=r.docs;for(let s=0;s<e.length;s+=1)for(let i=0;i<e[s].length;i+=1)a(e[s][i],r.world);};var Gs={compute:{alias:r=>ws(r,fs),machine:r=>ws(r,bs),normal:r=>ws(r,ns),freq:ys,offset:js,index:zs,wordCount:xs},methods:ts,model:{one:{aliases:cs,abbreviations:us,prefixes:ms,suffixes:{like:!0,ish:!0,less:!0,able:!0,elect:!0,type:!0,designate:!0},lexicon:ls,unicode:ps}},hooks:["alias","machine","index","id"]};var Cs=function(r,a){let e=[{}],s=[null],i=[0],n=[],o=0;r.forEach((function(r){let i=0,n=function(r,a){const{methods:e,model:s}=a;return e.one.tokenize.splitTerms(r,s).map(e.one.tokenize.splitWhitespace).map((r=>r.text.toLowerCase()))}(r,a);for(let r=0;r<n.length;r++){let a=n[r];e[i]&&e[i].hasOwnProperty(a)?i=e[i][a]:(o++,e[i][a]=o,e[o]={},i=o,s[o]=null);}s[i]=[n.length];}));for(let r in e[0])o=e[0][r],i[o]=0,n.push(o);for(;n.length;){let r=n.shift(),a=Object.keys(e[r]);for(let t=0;t<a.length;t+=1){let c=a[t],u=e[r][c];for(n.push(u),o=i[r];o>0&&!e[o].hasOwnProperty(c);)o=i[o];if(e.hasOwnProperty(o)){let r=e[o][c];i[u]=r,s[r]&&(s[u]=s[u]||[],s[u]=s[u].concat(s[r]));}else i[u]=0;}}return {goNext:e,endAs:s,failTo:i}};const As=function(r,a,e){let s=0,i=[];for(let n=0;n<r.length;n++){let o=r[n][e.form]||r[n].normal;for(;s>0&&(void 0===a.goNext[s]||!a.goNext[s].hasOwnProperty(o));)s=a.failTo[s]||0;if(a.goNext[s].hasOwnProperty(o)&&(s=a.goNext[s][o],a.endAs[s])){let e=a.endAs[s];for(let a=0;a<e.length;a++){let s=e[a],o=r[n-s+1],[t,c]=o.index;i.push([t,c,c+s,o.id]);}}}return i},Es=function(r,a){for(let e=0;e<r.length;e+=1)if(!0===a.has(r[e]))return !1;return !0};var ks=function(r,a,e){let s=[];e.form=e.form||"normal";let i=r.docs;if(!a.goNext||!a.goNext[0])return console.error("Compromise invalid lookup trie"),r.none();let n=Object.keys(a.goNext[0]);for(let o=0;o<i.length;o++){if(r._cache&&r._cache[o]&&!0===Es(n,r._cache[o]))continue;let t=i[o],c=As(t,a,e);c.length>0&&(s=s.concat(c));}return r.update(s)};const qs=(r,a)=>{for(let e=r.length-1;e>=0;e-=1)if(r[e]!==a)return r=r.slice(0,e+1),r;return r};var Ps=function(r){return r.goNext=r.goNext.map((r=>{if(0!==Object.keys(r).length)return r})),r.goNext=qs(r.goNext,void 0),r.failTo=qs(r.failTo,0),r.endAs=qs(r.endAs,null),r};var Os={api:function(r){r.prototype.lookup=function(r,a={}){if(!r)return this.none();"string"==typeof r&&(r=[r]);let e=(s=r,"[object Object]"===Object.prototype.toString.call(s)?r:Cs(r,this.world));var s;let i=ks(this,e,a);return i=i.settle(),i};},lib:{compile:function(r){const a=Cs(r,this.world());return Ps(a)}}};var Fs=function(r){let a=r.map((r=>{let a=new Set;return r.forEach((r=>{""!==r.normal&&a.add(r.normal),r.switch&&a.add(`%${r.switch}%`),r.implicit&&a.add(r.implicit);let e=Array.from(r.tags);for(let r=0;r<e.length;r+=1)a.add("#"+e[r]);})),a}));return a};const Ds={cache:function(){return this._cache=this.methods.one.cacheDoc(this.document),this},uncache:function(){return this._cache=null,this}};var Ns=function(r){Object.assign(r.prototype,Ds);},Bs={api:Ns,compute:{cache:function(r){r._cache=r.methods.one.cacheDoc(r.document);}},methods:{one:{cacheDoc:Fs,cacheMatch:function(r){let a=new Set;return r.forEach((r=>{!0!==r.optional&&!0!==r.negative&&(r.tag&&a.add("#"+r.tag),r.word&&a.add(r.word));})),a}}}};var Ts={typeahead:function(r){const a=r.model.one.typeahead,e=r.docs;if(0===e.length||0===Object.keys(a).length)return;let s=e[e.length-1]||[],i=s[s.length-1];if(!i.post&&a.hasOwnProperty(i.normal)){let e=a[i.normal];i.implicit=e,i.machine=e,i.typeahead=!0,r.compute.preTagger&&r.last().unTag("*").compute(["lexicon","preTagger"]);}}};const Hs=function(){const r=this.docs;if(0===r.length)return this;let a=r[r.length-1]||[],e=a[a.length-1];return !0===e.typeahead&&e.machine&&(e.text=e.machine,e.normal=e.machine),this};var Ss=function(r){r.prototype.autoFill=Hs;};var Vs=function(r,a,e){let s={},i=[],n=e.prefixes||{};return r.forEach((r=>{let o=(r=r.toLowerCase().trim()).length;a.max&&o>a.max&&(o=a.max);for(let t=a.min;t<o;t+=1){let o=r.substr(0,t);a.safe&&e.model.one.lexicon.hasOwnProperty(o)||(!0!==n.hasOwnProperty(o)&&!0!==s.hasOwnProperty(o)?s[o]=r:i.push(o));}})),s=Object.assign({},n,s),i.forEach((r=>{delete s[r];})),s};const Is={safe:!0,min:3};var $s={typeahead:function(r=[],a={}){let e=this.model();var s;a=Object.assign({},Is,a),s=r,"[object Object]"===Object.prototype.toString.call(s)&&(Object.assign(e.one.lexicon,r),r=Object.keys(r));let i=Vs(r,a,this.world());return Object.keys(i).forEach((r=>{e.one.typeahead.hasOwnProperty(r)?delete e.one.typeahead[r]:e.one.typeahead[r]=i[r];})),this}};var Ms={model:{one:{typeahead:{}}},api:Ss,lib:$s,compute:Ts,hooks:["typeahead"]};var Ls=function(r,a,e){const{model:s,methods:i}=e,n=i.one.setTag,o=s.one._multiCache||{},t=s.one.lexicon||{};let c=r[a],u=c.machine||c.normal;return void 0!==r[a+1]&&!0===o[u]?function(r,a,e,s,i){let n=a+4>r.length?r.length-a:4,o=r[a].machine||r[a].normal;for(let t=1;t<n;t+=1){let n=r[a+t];if(o+=" "+(n.machine||n.normal),!0===e.hasOwnProperty(o)){let n=e[o];return s(r.slice(a,a+t+1),n,i,!1,"1-multi-lexicon"),!0}}return !1}(r,a,t,n,e):null};const _s=/^(under|over|mis|re|un|dis|semi|pre|post)-?/,Js=new Set(["Verb","Infinitive","PastTense","Gerund","PresentTense","Adjective","Participle"]);var Ks=function(r,a,e){const{model:s,methods:i}=e,n=i.one.setTag,o=s.one.lexicon;let t=r[a],c=t.machine||t.normal;if(void 0!==o[c]&&o.hasOwnProperty(c)){return n([t],o[c],e,!1,"1-lexicon"),!0}if(t.alias){let r=t.alias.find((r=>o.hasOwnProperty(r)));if(r){return n([t],o[r],e,"1-lexicon-alias"),!0}}if(!0===_s.test(c)){let r=c.replace(_s,"");if(o.hasOwnProperty(r)&&r.length>3&&Js.has(o[r]))return n([t],o[r],e,"1-lexicon-prefix"),!0}return null};var Ws={lexicon:function(r){const a=r.world;r.docs.forEach((r=>{for(let e=0;e<r.length;e+=1)if(0===r[e].tags.size){let s=null;s=s||Ls(r,e,a),s=s||Ks(r,e,a);}}));}};var Us=function(r){let a={},e={};return Object.keys(r).forEach((s=>{let i=r[s],n=(s=s.toLowerCase().trim()).split(/ /);n.length>1&&(e[n[0]]=!0),a[s]=a[s]||i;})),delete a[""],delete a.null,delete a[" "],{lex:a,_multi:e}};var Zs={addWords:function(r){const a=this.world(),{methods:e,model:s}=a;if(r)if(Object.keys(r).forEach((a=>{"string"==typeof r[a]&&r[a].startsWith("#")&&(r[a]=r[a].replace(/^#/,""));})),e.two.expandLexicon){let{lex:i,_multi:n}=e.two.expandLexicon(r,a);Object.assign(s.one.lexicon,i),Object.assign(s.one._multiCache,n);}else if(e.one.expandLexicon){let{lex:i,_multi:n}=e.one.expandLexicon(r,a);Object.assign(s.one.lexicon,i),Object.assign(s.one._multiCache,n);}else Object.assign(s.one.lexicon,r);}};var Rs={model:{one:{lexicon:{},_multiCache:{}}},methods:{one:{expandLexicon:Us}},compute:Ws,lib:Zs,hooks:["lexicon"]},Ys={one:{contractions:[{word:"@",out:["at"]},{word:"alot",out:["a","lot"]},{word:"brb",out:["be","right","back"]},{word:"cannot",out:["can","not"]},{word:"cant",out:["can","not"]},{word:"dont",out:["do","not"]},{word:"dun",out:["do","not"]},{word:"wont",out:["will","not"]},{word:"can't",out:["can","not"]},{word:"shan't",out:["should","not"]},{word:"won't",out:["will","not"]},{word:"that's",out:["that","is"]},{word:"dunno",out:["do","not","know"]},{word:"gonna",out:["going","to"]},{word:"gotta",out:["have","got","to"]},{word:"gtg",out:["got","to","go"]},{word:"im",out:["i","am"]},{word:"imma",out:["I","will"]},{word:"imo",out:["in","my","opinion"]},{word:"irl",out:["in","real","life"]},{word:"ive",out:["i","have"]},{word:"rn",out:["right","now"]},{word:"tbh",out:["to","be","honest"]},{word:"wanna",out:["want","to"]},{word:"howd",out:["how","did"]},{word:"whatd",out:["what","did"]},{word:"whend",out:["when","did"]},{word:"whered",out:["where","did"]},{word:"'tis",out:["it","is"]},{word:"'twas",out:["it","was"]},{word:"twas",out:["it","was"]},{word:"y'know",out:["you","know"]},{word:"ne'er",out:["never"]},{word:"o'er ",out:["over"]},{after:"ll",out:["will"]},{after:"ve",out:["have"]},{after:"re",out:["are"]},{after:"m",out:["am"]},{before:"c",out:["ce"]},{before:"m",out:["me"]},{before:"n",out:["ne"]},{before:"qu",out:["que"]},{before:"s",out:["se"]},{before:"t",out:["tu"]}]}};var Qs=function(r,a,e){let[s,i]=a;e&&0!==e.length&&((e=e.map((r=>(r.implicit=r.text,r.machine=r.text,r.pre="",r.post="",r.text="",r.normal="",r))))[0]&&(e[0].pre=r[s][i].pre,e[e.length-1].post=r[s][i].post,e[0].text=r[s][i].text,e[0].normal=r[s][i].normal),r[s].splice(i,1,...e));};const Xs=/'/,ri=new Set(["what","how","when","where","why"]),ai=new Set(["be","go","start","think","need"]),ei=new Set(["been","gone"]);var si=function(r,a){let e=r[a].normal.split(Xs)[0];if(ri.has(e))return [e,"did"];if(r[a+1]){if(ei.has(r[a+1].normal))return [e,"had"];if(ai.has(r[a+1].normal))return [e,"would"]}return null};const ii=/'/;var ni=function(r,a){let e=r[a].normal.split(ii)[0];if(((r,a)=>r.slice(a+1,a+3).some((r=>r.tags.has("PastTense"))))(r,a))return [e,"has"];if("let"===e)return [e,"us"];if("there"===e){let s=r[a+1];if(s&&s.tags.has("Plural"))return [e,"are"]}return [e,"is"]};var oi=function(r,a){if("ain't"===r[a].normal||"aint"===r[a].normal)return null;return [r[a].normal.replace(/n't/,""),"not"]};const ti=/'/;var ci=(r,a)=>["je",r[a].normal.split(ti)[1]],ui=(r,a)=>{let e=r[a].normal.split(ti)[1];return e&&e.endsWith("e")?["la",e]:["le",e]},li=(r,a)=>{let e=r[a].normal.split(ti)[1];return e&&e.endsWith("e")?["du",e]:e&&e.endsWith("s")?["des",e]:["de",e]};const mi=/^([0-9.]{1,3}[a-z]{0,2}) ?[-–—] ?([0-9]{1,3}[a-z]{0,2})$/i,di=/^([0-9]{1,2}(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9]{1,2}(:[0-9][0-9])?(am|pm)?)$/i;var pi=function(r,a){let e=r[a];if(!0===e.tags.has("PhoneNumber"))return null;let s=e.text.match(mi);return null!==s?[s[1],"to",s[2]]:(s=e.text.match(di),null!==s?[s[1],"to",s[4]]:null)};const gi=new Set(["here","there","she","it","he","that","here","there","your","who","what","where","why","when","how","let","else","name"]),hi=new Set(["really","very","barely","also","not","just","more","only","often","quite","so","too","well"]);var vi=(r,a)=>{let e=r[a];let[s]=e.normal.split(/'s/);if(gi.has(s))return !0;let i=r[a+1];return !(!i||!hi.has(i.normal))};const fi=/'/,bi=/^[0-9][^-–—]*[-–—].*?[0-9]/,yi=function(r,a){let e=a.update();e.document=[r],e.compute(["lexicon","preTagger","index"]);},ji={t:(r,a)=>oi(r,a),d:(r,a)=>si(r,a),s:(r,a)=>!0===vi(r,a)?ni(r,a):null},zi={j:(r,a)=>ci(r,a),l:(r,a)=>ui(r,a),d:(r,a)=>li(r,a)},xi=function(r,a,e,s){for(let i=0;i<r.length;i+=1){let n=r[i];if(n.word===a.normal)return n.out;if(null!==s&&s===n.after)return [e].concat(n.out);if(null!==e&&e===n.before)return n.out.concat(s)}return null},wi=function(r,a){return a.fromText(r.join(" ")).docs[0]};var Gi=r=>{let{world:a,document:e}=r;const{model:s,methods:i}=a;let n=s.one.contractions||[];e.forEach(((s,o)=>{for(let t=s.length-1;t>=0;t-=1){let c=null,u=null;!0===fi.test(s[t].normal)&&([c,u]=s[t].normal.split(fi));let l=xi(n,s[t],c,u);!l&&ji.hasOwnProperty(u)&&(l=ji[u](s,t,a)),!l&&zi.hasOwnProperty(c)&&(l=zi[c](s,t)),l?(l=wi(l,r),Qs(e,[o,t],l),yi(e[o],r)):bi.test(s[t].normal)&&(l=pi(s,t),l&&(l=wi(l,r),Qs(e,[o,t],l),i.one.setTag(l,"NumberRange",a),l[2]&&l[2].tags.has("Time")&&i.one.setTag([l[0]],"Time",a),yi(e[o],r)));}}));};var Ci={model:Ys,compute:{contractions:Gi},hooks:["contractions"]};f.extend(U),f.extend(Pa),f.extend(Qr),f.extend(La),f.extend(Ge),f.plugin(Ci),f.extend(Gs),f.plugin(Bs),f.extend(Os),f.extend(Ms),f.extend(Rs);var Ai={Conjunction:"true¦aun2e1mas,ni,o,p0sino,u,y;ero,or1;!ntonces;que",Determiner:"true¦algun8c7e3l2muchos,otr1su6tod2un0vari8;!a,os;a4o;a3os;l,s0;e,t0;a0e;!s;ada,ualquier;as,os",Pronoun:"true¦alguna,cu5donde,e2le4n1otr1quien,se,é0;l,ste;os;ll0sto;a0o0;!s;al0yo;!es",Preposition:"true¦aGcBd8e5f3ha2junEmedi9p1que,s0tras;egún,in,ob6;aBor;cia,sta;rente 0uerB;a,de;n0xcepto;!cim8t0;re;e1ur0;ante;! acuerdo con,baj8lante Antr8sA;erc3on0;! respec1t0;ra;to a;a 5;! pesa3demás 4l1nte0;!s 3; lad0rededo1;o 1;r 0;de",Adverb:"true¦0:1P;1:1Q;a14b12c0Qd0Ne0Ff0Cg0Ah09i06jam1Okm²,l02mYnVoTpFquizáErBs7t2usu0ya,ún13;a3o2radicTíp12;!davía,t0;m3n2rde;!to;bién,pL;egu0Ui3ola1u2í,óI;ce0Afic01pues0S;empre,gnifica1Dm2quie1B;p0Oultánea1;a0Qe2ápi0Y;al1ci2la1Aspec1A;e0Xén;!s;arDerf0Ao5r2u0Mylori,úbl0P;e3incip0o2áct0O;b0Gfun0Sgre01p0Z;cisa1v0Y;co7pAr 3s2;ib0Eter0V;e3lo 2supues08;menKt06;jemp2l contrario,ntonces;lo;! a p2;oco;ci0tic2;ular1;cas2fiTrigin0;ion0;atur0eces7o3u2;e0Rn06;!rm0t00;a3en8u2ás;cho,y;l,yorit2;ar0F;e3i2oc0uego;geYt9;j2nW;os;gu0n2;!cluso,depend2iFmediaT;ie02;abi0HistórVoy;en2radu0;er0;in0orm0recueYu2ácil1;er2ndament0;a,te1;conómPn 8s4ven0Bx2;acKclu2treS;si06;en4pec3tr2;echa1icH;i0ífK;ci0;consecuencia,gran medida,línea;e3ir2;ecC;finiXla04masia06ntro,spués;asi,erClaBo4u2;an2;to;m6n2;cre6jun6s2tinJ;ider2taF;ab2;le1;ple2ún1;ta1;ra1;ca;astaRien,ás2;ica1; Qbajo,cMdHhFlDmplCn7p3quí,rriba,s2trLun,ún;imismo,í;are4enas,roxi2;ma2;da1;nte1;t2u0;e3ig2;ua1;r2s;ior1;ia1;go,l2ta1;á,í;o2í;ra;e4ministra2;ti2;va1;la6m2;ás;tu0;al1;me2;nte;bor2la vez;do",Adjective:"true¦0:6I;1:60;2:6C;3:6H;4:64;5:4H;6:46;7:5R;a5Qb5Ec40d3Ke2Xf2Mg2Gh2Ei1Yj1Vl1Pm17n0Zo0Wp0Fquím5Ir06sStHuFv9web,árabe3ú8;ltim4n3Ht3K;ari4JeAi8;ej0ol5Or35s8t1vo3;ib4Iu1;cKr8;d8t08;ader0e3;ni8rb3X;for2Kvers1;eChe,ill,oBrAur9é8íp38;cni5Ermi4X;bul5Fco,íst36;adi63emen5;do,t1;atr1mpCr8;cerAr8;estre3i8;to1U;!a;or1r4P;aJeHiEoAu8úp52;a4Yfi3Lper8;!fi2Pi5G;cialAl8vié4M;a8itLo;!r;!es,is40;g9m8;il0Op2Y;nifica0Aui6;c8gun1Encill0ptentr3Oxu2;o,undari3A;gr30n8;!gri4T;adFeAi49o9u8ápid0;r2s0;cocó,j0m43t0E;al5IcBdon5gAl9nomb14spons3Jvolucion8;ario;a2Uigios4;i5Cular48;i6tang3R;ic1;arMeKl3ToHr8u27úbl4A;eEiBo8ác2UóxZ;b3Bced6f9pi4v8;eni6in21;esi55und0;m8nZ;a48er8;!a3os;s8vi0;en56iden4E;b2Jderos0lít40pDs8;i8te4J;b27tiv0;or,queñ4r8;man7s4Vteneci6ua4B;ci1tic8;ulT;ccide10fi46peraFr8scur0;al,i8;e0Ygin2un5;aDeAo9u8óm25;cleOev4meros1W;b1Xmbra5rm2tab1X;cesari4g8rvioso;a8r2A;tivo;ci4Jt8v1zi;al,ur2;aLeIiGoDu9áx8édi3Pín8óv1Lúltipl3D;im0;n9s8;c2Uic2;di1i8;cip2;dern4r8;al,ib8;un5;lit8sm4;ar4A;di9j3Sn8rid28tropolit2Yx3U;or48t1u5;a,ev1o;gné2WlArítimo,s9te8y3P;mática3ri1;culi3Hi1J;a,vaS;aBeAi8oc2;b8ne1terari0;er1re3;g2n3O;nceoladas,rg4t8;er2in0;aponGem2Zov42u8óven2P;d8nt37s3K;i0Mí0;de1gu2lMmpJn8tali1Ezquierd0;aGdFespeEfDglCi0Kmedia3Hte8usitaH;lec0Fns0r8;!es3Si1Tn8;a8o3;!ci3Ls;e0Gés;ant0Ne34;raA;epe1Cividu2ustri2ígena3;caba8decua8;da;e9o8;rt3Isib1I;ri1;imitad0ustr27;abitu2istór2Bo8um1Xúme5;n5rizo2Y;eBig2Alob1r8;a8ieg0;n8ve3;!de3;n8ográfi1V;er2é0P;aGeFiDorm1rBu8ác06ísic30;er37n8tu0T;c12dame8;nt2;anc8ecu6í0;esa3és;el,n1r8;me;der1menin0;lPm8vor0X;ili1Hos4;conóm1SfTlQnOquival7sEurope4vid7x8;!ac10cel7en2Iist6perime2Ft8;eAr8;anjer8em0;a,os;ns0r8;i27n0A;caGenFpAt8;a8rWánd18;b0Ndounidense3t2;aAec9iri8;tu1;i2ífG;ci2ñol8;!a3es;ci1;sa;orme3te8;ro;ect8éctr1L;or1rón8;icV;ecMicaz;eGiBoAu9éb8;il;lce,r0;b06min13;fBgit1rect0s9vers8;as,os;ponib8tint4;le3;er6íc0B;finiClAportiv9r8;echa;as,o;g8ic8;ada3;ti8;va;a0Ee09h06i02l01oFrBu9éleb8;re;arWltur2án8;ti0C;eAisti8;an8;a,o3;ci7;loSmOnDr9ste8;ra;por1re8t4;ct0spo8;ndi6;en1H;oci5sAt8;en11in8;e0Xu0;ervadDiAt8;an1Cituc8;ion1;der8st7;ab8;le;or;do;er0DpleAun8ún;es,is8;ta;j0t0;mbia0Bni1;ar0ás07;eArc9v8;il0V;ulG;ntíf03rt4;artVi8;l8no;en0;lAntr2r8;c8ebr1;an4;es01ul8;ar;li7ntJpBracterísAstell9tóli8;ca;ana;tiM;a8it1;c8z;es;aHerebGinaFlanEr9uen8ásB;!a3o3;eBi8;ll9tán8;ic4;anN;ve;c4do;ria;er;j4rro8;co;b02ctZdVgrícola3lRmLnHpar7r9t8utónoma,zul,ére0;enP;gentiCqueológicBt8;ifi9íst8;ic0;ci2;os;no;en8;te;t8u2;e8igu4;ri8;orO;arillBbie9er8pli0;ican0;nt1;al;a,en8o;to;em9t4;a3o3;an8án;a3es;i9ministrativ8;a3o;ci8;on2;iv0u2;al8;!es;origCsolut0und8;an8;te3;!s;a,o;en",Noun:"true¦0:2J;1:2A;2:1W;3:27;4:2H;5:24;6:1U;7:1R;8:1V;a29b26c1Bd16e0Vf0Qg0Mh0Ki0Fj0Dl0Bm03n01oXpQrKsGtCunión sovié0Yv9web2é0Y;ar1Kenta6iAo9;c1lum0;rg0si0F;a1XeAr9ác0Uécn1A;abajo,en,ibun1áf5;m9rmin1ór5;po0Xá0R;aBe9oviét1K;m9ñ1;a6ifina7;b1Ul28ntand2;adica7eCiAo9égim0ío;b1Sn;tu1v9;al24er;p9stau27;o0Lresen01úbl0X;aEerDiMlBo9ráct0Wuerto r5órt5;rta9tenci3;da,l;a9ur3á0O;c2n;iódiHspec1Z;cCn,r8;céano Ar9so,t1J;b18d0ig0;atl1Kpac9;íf5;e9inten1L;ga1Solít5;aDeCiBo1VuAéd0Xúsi9;co11;eb7j2n1H;ner1r8;mbra6nest2t1;drug8nAquinaria,rg0te9ña6;mát5ria7;u3za6;a6eva4i9leg8ás2íd2;bera7ngüísUtor3;orna02u9úpit2;egos olímp0Mg8;d0Imag0n9;fBicia1EsAte9;gr3lectua7;ta4;a4orD;a9erma6imml2ospit1;ba6rry pott2;a7en,obBr9;a9áf0D;máI;erna4ierno;aCestiv1iBoAu9ábrWís0A;erzas armZner3;n0Urma;li3na7;bri12ch8;ditori3jecu13mInGs9xam0;pDt9;adBudiAé9;tica;a4oB;o,í04;aEo9;so;a6t9;raB;baj8ir;esCiAocument3éca9ía de las amérG;daY;agnó9buja4pu0Dsposi0Q;st5;arrollo,ord0;aNerMhicLientífPlKoErAu9ánc2;an0Al0M;iBát2íticAón9;icD;aQoQ;m0st1;mBnceja7orden9s04;ad9;as;andAbustibTerc9;ia4;a4o;an,ásD;as,oH;ea7;bNdáv2lz8mpa6nIpGrDsCt9ud3;edrAól9;icW;al,át5;a,o;acterí9den1m0nav3áct2;stica9;!s;ita7;les;alRci9;ll2;na;ada;er;le;a9ienestar;nFtm9;an;bdom0djePlJma4nGquellFrsen3t9yuda4;enBl9racO;ánt5;ico;ta9;do;al;os;a,im1;al9;!es;iCmiBt9;ar,erna9;tiva;ra4;ca4;nte;tivo;en",Ordinal:"true¦cVdKmilJnoIoctHpGquinEs8t2unMvigésimo0;! 0;cuRpEs5teM;eLr0;esTi0;ceWgésimo0;! 0;p9s0;eg5;e1é0;ptTtT;g2pt1x0;agQcePto;iNu2;undo;cu0geMto;agM;rim8;aCingKogK;nGv8;lonIésJ;ecimo2osCu0écI;ceFo0;décG;c4nov3quinAs2te0;rc0;ero;ex7éptC;eno;ta1u0;ar4;vo;e5ua0;dr2r1tro0;mil4;to;ag2i0;nge0;nt0;és0;imo",Cardinal:"true¦cLdDmilCnAo8quin7s5tre4u3veint0;e,i0;c0dós,nuIoHsFtrés,u1;inco,uatro;no;ce,inNsI;e0iC;isGsKte4;ce,iG;ch0nK;enIoD;ove0u9;ciCnG;!lones;ie1o0;ce,s8;ci0z;nu3o2s0;i0éis;ete;cho;eve;ator7i3ua0;r4tro0;!ci0;entos;en,nc0;o,u0;en0;ta;ce",City:"true¦0:3B;a2Zb29c1Zd1Ue1Tf1Rg1Lh1Di1Bjakar2Kk12l0Vm0Hn0Do0Bp00quiZrWsMtDuCv9w4y2z1;agreb,uri22;ang1We1okohama;katerin1Krev0;ars4e3i1rocl4;ckl0Yn1;nipeg,terth0Z;llingt1Rxford;aw;a2i1;en2Klni33;lenc2Yncouv0Ir2J;lan bat0Ftrecht;a7bilisi,e6he5i4o3rondheim,u1;nWr1;in,ku;kyo,ronJulouD;anj26l16miso2Mra2D; haKssaloni10;gucigalpa,hr0l av0O;i1llinn,mpe2Engi09rtu;chu25n0pU;a4e3h2kopje,t1ydney;ockholm,uttga15;angh1Ienzh20;o0Nv01;int peters0Xl4n1ppo1I; 1ti1E;jo1salv3;se;v1z0T;adW;eykjavik,i2o1;me,sario,t28;ga,o de janei1A;to;a9e7h6i5o3r1ueb1Tyongya1Q;a1etor28;gue;rt1zn0; elizabe4o;ls1Jrae28;iladelph23nom pe0Aoenix;r1tah tik1C;th;lerLr1tr13;is;dessa,s1ttawa;a1Klo;a3ew 1is;delWtaip1york ci1U;ei;goya,nt0Xpl0Xv0;a7e6i5o2u1;mb0Oni0L;nt2sco1;u,w;evideo,real;l0n03skolc;dellín,lbour0U;drid,l6n4r1;ib2se1;ille;or;chest1dalYi11;er;mo;a6i3o1vCy03;nd1s angel0H;on,r0G;ege,ma1nz,sb00verpo2;!ss1;ol; pla0Jusan0G;a6hark5i4laipeda,o2rak1uala lump3;ow;be,pavog1sice;ur;ev,ng9;iv;b4mpa0Lndy,ohsiu0Ira1un04;c1j;hi;ncheNstanb1̇zmir;ul;a6e4o1; chi mi2ms,u1;stJ;nh;lsin1rakliH;ki;ifa,m1noi,va0B;bu0UiltE;alw5dan4en3hent,iza,othen2raz,ua1;dalaj0Hngzhou;bu0R;eVoa,ève;sk;ay;es,rankfu1;rt;dmont5indhovV;a2ha02oha,u1;blSrb0shanbe;e1kar,masc0HugavpiK;gu,je1;on;a8ebu,h3o1raioKuriti02;lo1nstanKpenhagOrk;gGmbo;enn4i2ristchur1;ch;ang m2c1ttagoM;ago;ai;i1lgary,pe town,rac5;ro;aIeCirminghXogoBr6u1;char4dap4enos air3r1s0;g1sa;as;es;est;a3isba2usse1;ls;ne;silRtisla1;va;ta;i4lgrade,r1;g2l1n;in;en;ji1rut;ng;ku,n4r1sel;celo2ranquil1;la;na;g2ja lu1;ka;alo1kok;re;aDbBhmedabad,l8m5n3qa2sh1thens,uckland;dod,gabat;ba;k1twerp;ara;m0s1;terd1;am;exandr2ma1;ty;ia;idj0u dhabi;an;lbo2rh1;us;rg",Country:"true¦0:2M;a2Cb1Yc1Nd1Me1Df19g12h11i0Sj0Qk0Nl0Gm08n04om2Op00rRsFtAu6v4wal3y2z1;a1Rimbab0A;emen,ibu0N;es,lis and futu2D;a1enezue2FietD;nuatu,tican city;cr2Fg0Snited 2ruXs1zbek2H;a,sr;arab emiratIkingdom,states1;! of ameB;a4imor orient0Vo3rinidad y toba08u1únez;r1valu;kmen2Bqu12;go,nS;i0Xnz27yik29;a8e7i6om0Eri lanka,u1;azi0Vdá2ec0iza,ri1;nam;f2n1;! del s18;ri1F;erra leo1Vngap16r0;neg0Jrb0ychell4;moa,n1o tomé y príncipe; 1ta luc0Q;cristóbal y niev1mariSvicente y las granad0N;es;e2u1;an1Qm1Ts0;ino unido,pública 1;c4d1;e1omin4; macedQl1mocrática del1; conL;entroafr1he11;ica1H;a2erú,o1;lLrtug04;k1Lla18namá,púa nueva guin0Gra1íses baj18;guay;a3ep01i2orue1ueva zelUíger;ga;caragua,ger0;mib0uru;a5icroSo2éxi1óna1;co;ldav0n2zambiq1;ue;gol0tenegro;dagasc0Jl1rruec0Xurit18;a1div0Xta,í;s0ui;a0Ue5i3uxembur2íba1;no;go;b1echtenste0Qtu12;er0ia;soZt1;on0;azaj10en0ir1uwait;gu0Ziba1;ti;a1ord0V;mai08pH;nd7r5s2t1;al0;la1rael;nd0s 1;marshall,salomC;ak,l1án;an0K;ia,o1;nes0;aití,ondur0AungrD;a5ha0Er4u1;atema0Ginea1ya0D;! ecuatori1-bisáu;al;ana0Cec0;b1mb0;ón;i1ranc0;lip2n1yi;land0;inZ;cu8gip7l salv8miratos árabe6ritr5s2tiop1;ía;lov2paña,t1;ado3on0;aqu0en0;ea;s unidR;to;ador;inamarDominiD;a8hi6o1roac0uba;lo4morNrea del 2sta 1te d'ivoi6;de marfEriA;norte,s1;ur;mb0;le,na,p1;re;bo verde,m2nadá,t1;ar;boya,erún;a9e8i7o6r4u2élgi1;ca;lgar0r1tO;kina faso,undi;as1unéi;il;liv0snia-herzegoviCtsuaC;elorrus0rmG;lice,nín;ham4ngladés,r1;bad2é1;in;os;as;fganBl8n5r2ustr1zerbaiyC;al0ia;abia saudita,ge1men0;l0nti1;na;dorra,go2tigua y barbu1;da;la;b1em1;an0;ia;ist1;án",Place:"true¦aLbJcHdGeEfDgAh9i8jfk,kul,l7m5new eng4ord,p2s1the 0upIyyz;bronx,hamptons;fo,oho,under2yd;acifLek,h0;l,x;land;a0co,idCuc;libu,nhattJ;ax,gw,hr;ax,cn,ndianGst;arlem,kg,nd;ay village,re0;at 0enwich;britain,lak2;co,ra;urope,verglad0;es;en,fw,own1xb;dg,gk,hina0lt;town;cn,e0kk,rooklyn;l air,verly hills;frica,m5ntar1r1sia,tl0;!ant1;ct0;ic0; oce0;an;ericas,s",Region:"true¦0:23;1:1U;a21b1Tc1Jd1Ees1Df1Ag14h11i0Yj0Wk0Ul0Rm0GnZoXpTqQrNsEtButAv7w4y2zacatec23;o05u2;cat19kZ;a2est vi5isconsin,yomi15;rwick1shington2;! dc;er3i2;rgin1T;acruz,mont;ah,tar pradesh;a3e2laxca1EuscaB;nnessee,x1S;bas0Lmaulip1RsmK;a7i5o3taf0Pu2ylh14;ffVrr01s0Z;me11no1Buth 2;cSdR;ber1Jc2naloa;hu0Tily;n3skatchew0Sxo2;ny; luis potosi,ta catari0;a2hode8;j2ngp03;asth0Nshahi;inghai,u2;e2intana roo;bec,ensXreta0F;ara0e3rince edward2; isV;i,nnsylv2rnambu03;an15;axa0Pdisha,h2klaho1Dntar2reg5x06;io;ayarit,eCo4u2;evo le2nav0N;on;r2tt0Tva scot0Z;f7mandy,th2; 2ampton1;c4d3yo2;rk1;ako10;aroli0;olk;bras0Zva03w2; 3foundland2;! and labrador;brunswick,hamp1jers3mexiLyork2;! state;ey;a7i3o2;nta0relos;ch4dlanCn3ss2;issippi,ouri;as geraHneso0N;igRoacR;dhya,harasht05ine,ni4r2ssachusetts;anhao,y2;land;p2toba;ur;anca1e2incoln1ouis9;e2iI;ds;a2entucky,hul0;ns09rnata0Eshmir;alis2iangxi;co;daho,llino3nd2owa;ia0;is;a3ert2idalFunB;ford1;mp1waii;ansu,eorgXlou6u2;an3erre2izhou,jarat;ro;ajuato,gdo2;ng;cester1;lori3uji2;an;da;sex;e5o3uran2;go;rs2;et;lawaFrby1;a9ea8hi7o2umbrI;ahui5l4nnectic3rsi2ventry;ca;ut;iNorado;la;apFhuahua;ra;l9m2;bridge1peche;a6r5uck2;ingham1;shi2;re;emen,itish columb4;h3ja cal2sque,var3;iforn2;ia;guascalientes,l5r2;izo0kans2;as;na;a3ber2;ta;ba3s2;ka;ma",Infinitive:"true¦0:76;1:6M;2:6U;3:6X;4:6T;5:5O;6:4W;a5Ob5Fc40d3Be2Hf2Bg26h22i1Nj1Ll1Fm18n14o10p0Fque0Er00sNtHuFv7y3Pzambulli60;aDeAi9o7;l7mit,t0;ar,v2;aj0ol0s3Sv1;n8r7st72;!if6;c2d2ir;ci0l2ri0;b6n7s0t4U;ir,t0;aBeAir0o9r7;a7iunf0opez0;baj0d1Fer,g0t0;c0m0rc2s2;m2n2rm6Eñ1;p0rd0ñ2;aFeCiBo9u7;b1ced2fr1g06p02rg1s7;p5Dti44;breviv1l2n7po1Hrpre5ñ0;ar,r1S;gn4Fmbol51tu0;c3gu1nt8r7ñ1A;!v1;ar6Jir6J;b2c9l8ti7;r4Wsf2Y;ir,t0ud0v0;ar,r48ud1;e8o7;b0g0mp2;al4RcFd0WgChus0in0nBp9quSs7v5Dz0ír,ñ1;erv0olv2p7u0Z;et0ir0o5;a7et1l6o12;r0s0;ac2ov0un57;a8i7r4Rul0;r,str3;l0r,te0;h56i8o7;g2mend0noc2rd0;b1cl0;br3d3ja4Sm3r2;aPeKiJlaHoGr8u7;bl6r3R;act6eAo7;b0d0Gh2Fmet2p8se26te7voc0;g2st0;on2;d46f9gu3Zpar3se7v2;nt7rv0;ar,ir;er1;d2n23;n7t6;ch0t0;c0nt0;d1g0in3le0ns0r8s7;ar,c0;d8m7se1Tten4;an4it1;er,on0;d4g0r7s0t51;ar,ec2ticip0;b9curr1di0f8l7pon1Srgan3Tír;er,vid3;e5r4;ed4l3Dt13;a9e7ot0;ces1Xg7v0;ar58o48;c2d0veg0;aAe8ir0o7ud3;d2Yle2Mnt0r1s1Uv1J;d1nt1re7t2zcl0;c2nd0;d31n8qui1Nrc0st6t7;ar,ricul3;d0ej0t0S;aBeAimpi0l7o10u0K;am3e8o7;r0v2;g0n0v0;er,gWva31;dr0me44nz0stim0v3;acta3Lu7;g0nt3r0;lus1GmpJn7r4R;clu1dHfGi3Qmi0RsDt9v7;ad1e7it0oc0;nt0rt1st2Q;e8rod7;uc1;nt0r7;es0pret0;i38t8u7;lt0;al0;lu1o3V;ic0uc1;o7r11;rt0;a9e7u1;l0r7;ed0ir,v1;bl0c2ll3;aAener9lor21obern0r8u7;ard0i0st0;adu3it0uñ1;al2K;n0st0;aBelic0RiAlor4or9r8u7;m0nci45;eír;m0tal4;j0ng1rm0;br6lt0sc3J;ch3duc0fectu0jerc2lZmWnKquivoc3rr0sEvDx7;h0Fig1p8t7;e5in05;l8o7r2F;n2rt0;ic0o7;r0t0;acu0it0;c9per0qui0t7;a7im0udi0;bl4r;o8r05u7;ch0;g2ndY;amor3cHfEg3Coj3riFsDt8v7;ejFi0;eAr7usiasm3;ar,e7;g0t7vi0W;en2;nd2ra25;eñ0u2C;ad3erm3la7;qu7;ecN;a2Ie5onX;borrach3i8p7;ez0le0;gr0;eg1im2P;ar,eEi9o8u7;ch3d0r0;bl0l2rm30;buj0r2Es8v7;ert2Yorci3;eñ0frut0gu0Fminu1t7;in7ri07;gu1;b2cLd0Hfe5j0mosKpHrret1sAte8vo7;lv2r0;n7st0;er2S;aBc9e0h8pe7tru1;d1rt3;ac2;ans0e5r7ubr1;ib1;gr1Xpar4rro7yun0;ll3;e5os8r7;im1;it0;tr0;i7lar0or0;d2Er;a0Ee0Bh0Aiv09la06oDr9u7;br1id0l7mpl1r0;p0tiv0;e9i8u7;c03z0;ar29t6;ar,c2er;br0c1Sg2lXmSnApi0r8s7;er,t0;re7t0;g1r;dNfLjug0oc2quiKsGtBv7;e7id0;n8r7;s0t1;c2ir;aAe9inu0r7;i7ol0;bu1;n2st0;m1Fr;e9i0It7um1;i7ru1;tu1;gu1nt1rv0;st0;es0i7;ar,rm0sc0;en0uc1;bat1eAp8un7;ic3;a10et1on2r7;ar,e5;nz0r;g0o7;c0nU;r7s7;if6;ic0;ilQ;arl0isme0oc0;lebr0n7pill0rr0s0;ar,s7;ur0;b2er,lBm0RnAr9s7us0z0;ar15t7;ig0;acterIg0;c03s3;cul0e7l3m3;nt3;aDeBorAr8u7;ce0rl3sc0;i7onceaP;ll0nd0;d0r0;b2nd7s0;ec1;il0j0rr2t1ut7ñ3;iz0;b0Nc0Cd06f03gZhorYlVmSnPpJrrGsDt8ume00v7yud0ñad1;aWerigu0is0;ac0e5r7;a7eveF;er,v7;es0;nd2;i8oJp7ust3;ir0;st1;e7oj0;gl0penti7;rse;aBlAo9r7;e7ob0;ci0nd2t0;st0y0;aud1ic0;g0r4;d0h8un7;ci0;el0;a8en7;az0;n4r;ca8e7ivi0morz0quil0;gr3nt0;nz0;c0r0;or0r8ua7;nt0;ad7;ar,ec2;eit3i8l7;ig1;rm0;ivBmi9or8ve7;rt1;ar,n0;r0t1;ir;in0;aGeEo7tu0;mpCn9r8st7;arIumbr3;d3t0;sej0t4;ec2;er;añ0;pt0rc3;arB;b0mp0;andCorBrAu7;rr7s0;ir7;!se;az0ir;d0t0;on0;ar",Modal:"true¦debEhBp7qu5s2t0;en0iene8;emHgo,éDíaG;ab0ol3uel5é;e0éB;!mEn,s;er0ier2;emCé8;od2ued0;e0o;!n,s;em8r6é4;a1e0;!m6;!bé1n,s;e1o,é0;is;!m2n,r0s;ía0;!is,m0n,s;os",Copula:"true¦eGfu8s0é9;e2i1o0;is,mAn,y;do,endo;a3d,r0áis;em7á1é6ía0;!is,m6n,s;!n,s;!m4n,s;e4i1é0;ram2;!m1ste0;!is;os;!r0;a0on;is,n,s;r0s;a0es;!is,n,s",Month:"true¦a6dic4en3febr3ju1ma0nov4octu5sept4;rzo,yo;l0n0;io;ero;iem0;bre;bril,gosto",WeekDay:"true¦domingo,juev1lun1m0sábado,viern1;art0iércol0;es",FemaleName:"true¦0:FV;1:FZ;2:FO;3:FA;4:F9;5:FP;6:EO;7:GC;8:EW;9:EM;A:G8;B:E2;C:G5;D:FL;E:FI;F:ED;aDZbD1cB8dAIe9Gf91g8Hh83i7Sj6Uk60l4Om38n2To2Qp2Fqu2Er1Os0Qt04ursu6vUwOyLzG;aJeHoG;e,la,ra;lGna;da,ma;da,ra;as7EeHol1TvG;et9onB8;le0sen3;an8endBMhiB3iG;lInG;if3AniGo0;e,f39;a,helmi0lGma;a,ow;aMeJiG;cHviG;an9XenFY;kCWtor3;da,l8Vnus,rG;a,nGoniCZ;a,iD9;leGnesE9;nDIrG;i1y;aSePhNiMoJrGu6y4;acG0iGu0E;c3na,sG;h9Mta;nHrG;a,i;i9Jya;a5IffaCDna,s5;al3eGomasi0;a,l8Go6Xres1;g7Uo6WrHssG;!a,ie;eFi,ri7;bNliMmKnIrHs5tGwa0;ia0um;a,yn;iGya;a,ka,s5;a4e4iGmC7ra;!ka;a,t5;at5it5;a05carlet2Ye04hUiSkye,oQtMuHyG;bFGlvi1;e,sHzG;an2Tet9ie,y;anGi7;!a,e,nG;aEe;aIeG;fGl3DphG;an2;cF5r6;f3nGphi1;d4ia,ja,ya;er4lv3mon1nGobh75;dy;aKeGirlBIo0y6;ba,e0i6lIrG;iGrBMyl;!d70;ia,lBS;ki4nIrHu0w0yG;la,na;i,leAon,ron;a,da,ia,nGon;a,on;l5Yre0;bMdLi8lKmIndHrGs5vannaE;aEi0;ra,y;aGi4;nt5ra;lBKome;e,ie;in1ri0;a02eXhViToHuG;by,thBH;bQcPlOnNsHwe0xG;an93ie,y;aHeGie,lC;ann7ll1marBCtB;!lGnn1;iGyn;e,nG;a,d7W;da,i,na;an8;hel53io;bin,erByn;a,cGkki,na,ta;helBWki;ea,iannDUoG;da,n12;an0bIgi0i0nGta,y0;aGee;!e,ta;a,eG;cAOkaE;chGe,i0mo0n5EquCAvDy0;aC9elGi8;!e,le;een2ia0;aMeLhJoIrG;iGudenAT;scil1Uyamva8;lly,rt3;ilome0oebe,ylG;is,lis;arl,ggy,nelope,r6t4;ige,m0Fn4Oo6rvaB8tHulG;a,et9in1;ricGsy,tA5;a,e,ia;ctav3deHfATlGphAT;a,ga,iv3;l3t9;aQePiJoGy6;eHrG;aEeDma;ll1mi;aKcIkGla,na,s5ta;iGki;!ta;hoAZk8AolG;a,eBE;!mh;l7Sna,risF;dIi5PnHo23taG;li1s5;cy,et9;eAiCL;a01ckenz2eViLoIrignayani,uriBDyG;a,rG;a,na,tAP;i4ll9UnG;a,iG;ca,ka,qB1;a,chOkaNlJmi,nIrGtzi;aGiam;!n8;a,dy,erva,h,n2;a,dIi9GlG;iGy;cent,e;red;!e6;ae6el3G;ag4KgKi,lHrG;edi61isFyl;an2iGliF;nGsAJ;a,da;!an,han;b08c9Bd06e,g04i03l01nZrKtJuHv6Sx85yGz2;a,bell,ra;de,rG;a,eD;h74il8t2;a,cSgOiJjor2l6In2s5tIyG;!aGbe5QjaAlou;m,n9P;a,ha,i0;!aIbAIeHja,lCna,sGt53;!a,ol,sa;!l06;!h,m,nG;!a,e,n1;arIeHie,oGr3Kueri9;!t;!ry;et3IiB;elGi61y;a,l1;dGon,ue6;akranBy;iGlo36;a,ka,n8;a,re,s2;daGg2;!l2W;alCd2elGge,isBDon0;eiAin1yn;el,le;a0Ie08iWoQuKyG;d3la,nG;!a,dHe9PnGsAN;!a,e9O;a,sAL;aAYcJelIiFlHna,pGz;e,iB;a,u;a,la;iGy;a2Ae,l25n8;is,l1GrHtt2uG;el6is1;aIeHi7na,rG;a6Xi7;lei,n1tB;!in1;aQbPd3lLnIsHv3zG;!a,be4Ket9z2;a,et9;a,dG;a,sGy;ay,ey,i,y;a,iaIlG;iGy;a8De;!n4F;b7Qerty;!n5Q;aNda,e0iLla,nKoIslAOtGx2;iGt2;c3t3;la,nGra;a,ie,o4;a,or1;a,gh,laG;!ni;!h,nG;a,d4e,n4N;cNdon7Pi6kes5rMtKurIvHxGy6;mi;ern1in3;a,eGie,yn;l,n;as5is5oG;nya,ya;a,isF;ey,ie,y;aZeUhadija,iMoLrIyG;lGra;a,ee,ie;istGy5A;a,en,iGy;!e,n48;ri,urtn97;aMerLl96mIrGzzy;a,stG;en,in;!berlG;eGi,y;e,y;a,stD;!na,ra;el6MiJlInHrG;a,i,ri;d4na;ey,i,l9Ns2y;ra,s5;c8Ti5UlOma6nyakumari,rMss5JtJviByG;!e,lG;a,eG;e,i75;a5CeHhGi3PlCri0y;ar5Aer5Aie,leDr9Cy;!lyn70;a,en,iGl4Tyn;!ma,n31sF;ei6Zi,l2;a04eVilToMuG;anKdJliGst54;aHeGsF;!nAt0W;!n8U;i2Ry;a,iB;!anLcelCd5Sel6Yhan6FlJni,sHva0yG;a,ce;eGie;fi0lCph4V;eGie;en,n1;!a,e,n36;!i10lG;!i0Z;anLle0nIrHsG;i5Nsi5N;i,ri;!a,el6Mif1RnG;a,et9iGy;!e,f1P;a,e6ZiHnG;a,e6YiG;e,n1;cLd1mi,nHqueliAsmin2Uvie4yAzG;min7;a7eHiG;ce,e,n1s;!lGsFt06;e,le;inHk2lCquelG;in1yn;da,ta;da,lPmNnMo0rLsHvaG;!na;aHiGob6R;do4;!belGdo4;!a,e,l2G;en1i0ma;a,di4es,gr5O;el8ogG;en1;a,eAia0o0se;aNeKilHoGyacin1N;ll2rten1H;aHdGlaH;a,egard;ry;ath0WiHlGnrietBrmiAst0W;en24ga;di;il72lKnJrGtt2yl72z6A;iGmo4Cri4D;etG;!te;aEnaE;ey,l2;aYeTiOlMold12rIwG;enGyne18;!dolC;acHetGisel8;a,chD;e,ieG;!la;adys,enGor3yn1Y;a,da,na;aJgi,lHna,ov6YselG;a,e,le;da,liG;an;!n0;mYnIorgHrG;ald33i,m2Rtru70;et9i0;a,eGna;s1Nvieve;briel3Cil,le,rnet,yle;aReOio0loMrG;anHe8iG;da,e8;!cG;esHiGoi0G;n1s3S;!ca;!rG;a,en40;lHrnG;!an8;ec3ic3;rHtiGy7;ma;ah,rah;d0FileDkBl00mUn47rRsMtLuKvG;aIelHiG;e,ta;in0Ayn;!ngel2F;geni1la,ni3O;h4Zta;meral8peranJtG;eHhGrel6;er;l2Mr;za;iGma,nest27yn;cGka,n;a,ka;eJilImG;aGie,y;!liA;ee,i1y;lGrald;da,y;aTeRiMlLma,no4oJsIvG;a,iG;na,ra;a,ie;iGuiG;se;en,ie,y;a0c3da,nJsGzaH;aGe;!beG;th;!a,or;anor,nG;!a;in1na;en,iGna,wi0;e,th;aWeKiJoG;lor4Yminiq3Vn2XrGtt2;a,eDis,la,othGthy;ea,y;an08naEonAx2;anPbOde,eNiLja,lImetr3nGsir4R;a,iG;ce,se;a,iHla,orGphiA;es,is;a,l5G;dGrdG;re;!d4Jna;!b29oraEra;a,d4nG;!a,e;hl3i0mMnKphn1rHvi1TyG;le,na;a,by,cHia,lG;a,en1;ey,ie;a,et9iG;!ca,el17ka;arGia;is;a0Oe0Lh03i01lToIrHynG;di,th3;is2Ay03;lOnLrHurG;tn1B;aId26iGn26riA;!nG;a,e,n1;!l1Q;n2sG;tanGuelo;ce,za;eGleD;en,t9;aIeoHotG;il49;!pat4;ir7rIudG;et9iG;a,ne;e,iG;ce,sX;a4er4ndG;i,y;aPeMloe,rG;isHyG;stal;sy,tG;aHen,iGy;!an1e,n1;!l;lseHrG;!i7yl;a,y;nLrG;isJlHmG;aiA;a,eGot9;n1t9;!sa;d4el1NtG;al,el1M;cGli3E;el3ilG;e,ia,y;iXlWmilVndUrNsLtGy6;aJeIhGri0;erGleDrCy;in1;ri0;li0ri0;a2FsG;a2Eie;a,iLlJmelIolHrG;ie,ol;!e,in1yn;!a,la;a,eGie,y;ne,y;na,sF;a0Di0D;a,e,l1;isBl2;tlG;in,yn;arb0CeYianXlVoTrG;andRePiIoHyG;an0nn;nwCok7;an2NdgKg0ItG;n27tG;!aHnG;ey,i,y;ny;etG;!t7;an0e,nG;da,na;i7y;bbi7nG;iBn2;ancGossom,ytG;he;ca;aRcky,lin8niBrNssMtIulaEvG;!erlG;ey,y;hHsy,tG;e,i0Zy7;!anG;ie,y;!ie;nGt5yl;adHiG;ce;et9iA;!triG;ce,z;a4ie,ra;aliy29b24d1Lg1Hi19l0Sm0Nn01rWsNthe0uJvIyG;anGes5;a,na;a,r25;drIgusHrG;el3;ti0;a,ey,i,y;hHtrG;id;aKlGt1P;eHi7yG;!n;e,iGy;gh;!nG;ti;iIleHpiB;ta;en,n1t9;an19elG;le;aYdWeUgQiOja,nHtoGya;inet9n3;!aJeHiGmI;e,ka;!mGt9;ar2;!belHliFmT;sa;!le;ka,sGta;a,sa;elGie;a,iG;a,ca,n1qG;ue;!t9;te;je6rea;la;bHmGstas3;ar3;el;aIberHel3iGy;e,na;!ly;l3n8;da;aTba,eNiKlIma,yG;a,c3sG;a,on,sa;iGys0J;e,s0I;a,cHna,sGza;a,ha,on,sa;e,ia;c3is5jaIna,ssaIxG;aGia;!nd4;nd4;ra;ia;i0nHyG;ah,na;a,is,naE;c5da,leDmLnslKsG;haElG;inGyW;g,n;!h;ey;ee;en;at5g2nG;es;ie;ha;aVdiSelLrG;eIiG;anLenG;a,e,ne;an0;na;aKeJiHyG;nn;a,n1;a,e;!ne;!iG;de;e,lCsG;on;yn;!lG;iAyn;ne;agaJbHiG;!gaI;ey,i7y;!e;il;ah",MaleName:"true¦0:CB;1:BI;2:BZ;3:BQ;4:B2;5:BW;6:AQ;7:9S;8:BA;9:AU;A:AL;B:C1;aB2bA6c95d86e7Gf6Yg6Gh5Wi5Ij4Lk4Bl3Rm2Pn2Eo28p22qu20r1As0Rt07u06v01wOxavi3yHzC;aCor0;cCh8Gne;hDkC;!aAZ;ar51eAY;ass2i,oDuC;sEu25;nFsEusC;oCsD;uf;ef;at0g;aKeIiDoCyaAN;lfgang,odrow;lCn1O;bEey,frBHlC;aA3iC;am,e,s;e87ur;i,nde7sC;!l6t1;de,lDrr5yC;l1ne;lCt3;a91y;aFern1iC;cDha0nceCrg99va0;!nt;ente,t5A;lentin49n8Wughn;lyss4Msm0;aUePhLiJoFrDyC;!l3ro8s1;av9OeCist0oy,um0;nt9Gv54y;bEd7VmCny;!as,mCoharu;aAWie,y;i81y;mCt9;!my,othy;adEeoDia7BomC;!as;!do7K;!de9;dFrC;en8FrC;an8EeCy;ll,n8D;!dy;dgh,ic9Rnn3req,ts45;aRcotPeOhKiIoGpenc3tCur1Oylve8Fzym1;anEeCua79;f0phADvCwa78;e57ie;!islaw,l6;lom1nA1uC;leyma8ta;dCl7Hm1;!n6;aEeC;lCrm0;d1t1;h6Qne,qu0Uun,wn,y8;am9basti0k1Xl41rg40th,ymo9G;!tC;!ie,y;lDmCnti22q4Jul;!mAu4;ik,vato6U;aXeThe91iPoGuDyC;an,ou;b6KdDf9pe6PssC;!elAH;ol2Vy;an,bJcIdHel,geGh0landBmFnEry,sDyC;!ce;coe,s;a94nA;an,eo;l3Kr;e4Rg3n6olfo,ri67;co,ky;bAe9T;cCl6;ar5Oc5NhDkCo;!ey,ie,y;a84ie;gDid,ub5x,yCza;ansh,nT;g8ViC;na8Rs;ch5Xfa4lEmDndCpha4sh6Tul,ymo6Z;al9Xol2Cy;i9Hon;f,ph;ent2inC;cy,t1;aGeEhilDier61ol,reC;st1;!ip,lip;d9Arcy,tC;ar,e2W;b3Tdra6Et45ul;ctav2Wliv3m95rGsDtCum8Tw5;is,to;aDc8RvC;al52;ma;i,l4AvK;athKeIiEoC;aCel,l0ma0r2Y;h,m;cDg4i3JkC;h6Tola;hol5WkCol5W;!ol5V;al,d,il,ls1vC;il50;anCy;!a4i4;aXeUiLoGuDyC;l22r1;hamDr5YstaC;fa,p4G;ed,mG;dibo,e,hamEis1YntDsCussa;es,he;e,y;ad,ed,mC;ad,ed;cHgu4kFlEnDtchC;!e7;a77ik;house,o04t1;e,olC;aj;ah,hCk6;a4eC;al,l;hDlv2rC;le,ri7v2;di,met;ck,hOlMmPnu4rIs1tEuricDxC;!imilianBwe7;e,io;eo,hDi51tC;!eo,hew,ia;eCis;us,w;cEio,kBlDqu6Fsha7tCv2;i2Iy;in,on;!el,oLus;achCcolm,ik;ai,y;amCdi,moud;adC;ou;aSeOiNlo2SoJuDyC;le,nd1;cFiEkCth3;aCe;!s;gi,s;as,iaC;no;g0nn6QrenEuCwe7;!iC;e,s;!zo;am,on4;a7Aevi,la4RnEoCst3vi;!nC;!a5Zel;!ny;mDnCr66ur4Swr4S;ce,d1;ar,o4M;aJeEhaled,iCrist4Uu47y3B;er0p,rC;by,k,ollos;en0iFnCrmit,v2;!dDnCt5B;e0Zy;a7ri4M;r,th;na67rCthem;im,l;aZeRiPoEuC;an,liCst2;an,us;aqu2eKhnJnHrFsC;eDhCi7Aue;!ua;!ph;dCge;an,i,on;!aCny;h,s,th4W;!ath4Vie,nA;!l,sCy;ph;an,e,mC;!mA;d,ffHrEsC;sCus;!e;a5IemDmai8oCry;me,ni0P;i6Ty;!e57rC;ey,y;cId5kHmGrEsDvi3yC;!d5s1;on,p3;ed,od,rCv4L;e4Yod;al,es,is1;e,ob,ub;k,ob,quC;es;aObrahNchika,gLkeKlija,nuJrHsEtCv0;ai,sC;uki;aCha0i6Ema4sac;ac,iaC;h,s;a,vinCw2;!g;k,nngu51;!r;nacCor;io;im;in,n;aKeGina4UoEuCyd55;be24gCmber4BsE;h,o;m3ra32sCwa3W;se2;aEctDitDn4DrC;be1Zm0;or;th;bLlKmza,nJo,rEsDyC;a42d5;an,s0;lFo4ErEuCv6;hi3Zki,tC;a,o;is1y;an,ey;k,s;!im;ib;aReNiMlenLoJrFuC;illerDsC;!tavo;mo;aEegCov3;!g,orC;io,y;dy,h56nt;nzaCrd1;lo;!n;lbe4Pno,ovan4Q;ne,oErC;aCry;ld,rdB;ffr6rge;bri4l5rCv2;la1Yr3Dth,y;aSeOiMlKorr0IrC;anEedCitz;!dAeCri23;ri22;cEkC;!ie,lC;in,yn;esKisC;!co,zek;etch3oC;yd;d4lConn;ip;deriEliDng,rnC;an01;pe,x;co;bi0di;arZdUfrTit0lNmHnGo2rDsteb0th0uge8vCym5zra;an,ere2U;gi,iDnCrol,v2w2;estBie;c06k;och,rique,zo;aGerFiDmC;aFe2O;lCrh0;!io;s1y;nu4;be09d1iFliEmDt1viCwood;n,s;er,o;ot1Ts;!as,j43sC;ha;a2en;!dAg32mFuDwC;a25in;arC;do;o0Su0S;l,nC;est;aYeOiLoFrEuDwCyl0;ay8ight;a8dl6nc0st2;ag0ew;minicGnEri0ugDyC;le;!l03;!a29nCov0;e7ie,y;!k;armuDeCll1on,rk;go;id;anJj0lbeImetri9nGon,rFsEvDwCxt3;ay8ey;en,in;hawn,mo09;ek,ri0G;is,nCv3;is,y;rt;!dC;re;lLmJnIrEvC;e,iC;!d;en,iEne7rCyl;eCin,yl;l2Wn;n,o,us;!e,i4ny;iCon;an,en,on;e,lC;as;a07e05hXiar0lMoHrFuDyrC;il,us;rtC;!is;aCistobal;ig;dy,lFnDrC;ey,neli9y;or,rC;ad;by,e,in,l2t1;aHeEiCyJ;fCnt;fo0Dt1;meDt9velaC;nd;nt;rEuDyC;!t1;de;enC;ce;aGeFrisDuC;ck;!tC;i0oph3;st3;d,rlCs;eCie;s,y;cCdric;il;lFmer1rC;ey,lDro7y;ll;!os,t1;eb,v2;ar03eVilUlaToQrDuCyr1;ddy,rtJ;aKeFiEuDyC;an,ce,on;ce,no;an,ce;nDtC;!t;dDtC;!on;an,on;dDndC;en,on;!foCl6y;rd;bDrCyd;is;!by;i8ke;al,lA;nGrCshoi;at,nDtC;!r11;aCie;rdB;!edict,iDjam2nA;ie,y;to;n6rCt;eCy;tt;ey;ar0Yb0Od0Kgust2hm0Hid5ja0Fl00mYnQputsiPrGsaFuDveCya0ziz;ry;gust9st2;us;hi;aJchIi4jun,maGnEon,tCy0;hCu07;ur;av,oC;ld;an,ndB;el;ie;ta;aq;dHgelBtC;hoFoC;i8nC;!iBy;ne;ny;reCy;!as,s,w;ir,mCos;ar;an,bePd5eJfGi,lFonEphonIt1vC;aNin;on;so,zo;an,en;onDrC;edB;so;c,jaFksandEssaFxC;!and3;er;ar,er;ndC;ro;rtB;ni;en;ad,eC;d,t;in;aDolfBri0vik;!o;mCn;!a;dGeFraDuC;!bakr,lfazl;hCm;am;!l;allFel,oulaye,ulC;!lDrahm0;an;ah,o;ah;av,on",FirstName:"true¦aEblair,cCdevBj8k6lashawn,m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g1ne;ar1el,org0;an;ion,lo;as8e0r9;ls7nyatta,rry;am0ess1ude;ie,m0;ie;an,on;as0heyenne;ey,sidy;lex1ndra,ubr0;ey;is",LastName:"true¦0:33;1:3A;2:38;3:2X;4:2D;5:2Z;a3Ab30c2Nd2De2Af25g1Zh1Pi1Kj1Ek17l0Zm0Nn0Jo0Gp05rYsMtHvFwCxBy8zh6;a6ou,u;ng,o;a6eun2Toshi1Kun;ma6ng;da,guc1Zmo26sh21zaR;iao,u;a7il6o3right,u;li3As2;gn0lk0ng,tanabe;a6ivaldi;ssilj36zqu1;a9h8i2Fo7r6sui,urn0;an,ynisJ;lst0Prr1Uth;atch0omps2;kah0Vnaka,ylor;aEchDeChimizu,iBmiAo9t7u6zabo;ar1lliv29zuE;a6ein0;l22rm0;sa,u3;rn4th;lva,mmo23ngh;mjon4rrano;midt,neid0ulz;ito,n7sa6to;ki;ch1dLtos,z;amBeag1Yi9o7u6;bio,iz,sD;b6dri1LgIj0Tme23osevelt,ssi,ux;erts,ins2;c6ve0F;ci,hards2;ir1os;aEeAh8ic6ow1Z;as6hl0;so;a6illips;m,n1S;ders5et8r7t6;e0Nr4;ez,ry;ers;h20rk0t6vl4;el,te0J;baBg0Blivei01r6;t6w1N;ega,iz;a6eils2guy5ix2owak,ym1D;gy,ka6var1J;ji6muW;ma;aEeCiBo8u6;ll0n6rr0Bssolini,ñ6;oz;lina,oKr6zart;al0Me6r0T;au,no;hhail4ll0;rci0ssi6y0;!er;eWmmad4r6tsu07;in6tin1;!o;aCe8i6op1uo;!n6u;coln,dholm;fe7n0Pr6w0I;oy;bv6v6;re;mmy,rs5u;aBennedy,imuAle0Ko8u7wo6;k,n;mar,znets4;bay6vacs;asY;ra;hn,rl9to,ur,zl4;aAen9ha3imen1o6u3;h6nYu3;an6ns2;ss2;ki0Ds5;cks2nsse0C;glesi9ke8noue,shik7to,vano6;u,v;awa;da;as;aBe8itchcock,o7u6;!a3b0ghNynh;a3ffmann,rvat;mingw7nde6rM;rs2;ay;ns5rrPs7y6;asDes;an4hi6;moI;a9il,o8r7u6;o,tierr1;ayli3ub0;m1nzal1;nd6o,rcia;hi;er9lor8o7uj6;ita;st0urni0;es;nand1;d7insteHsposi6vaL;to;is2wards;aCeBi9omin8u6;bo6rand;is;gu1;az,mitr4;ov;lgado,vi;nkula,rw7vi6;es,s;in;aFhBlarkAo6;h5l6op0rbyn,x;em7li6;ns;an;!e;an8e7iu,o6ristens5u3we;i,ng,u3w,y;!n,on6u3;!g;mpb7rt0st6;ro;ell;aBe8ha3oyko,r6yrne;ooks,yant;ng;ck7ethov5nnett;en;er,ham;ch,h8iley,rn6;es,i0;er;k,ng;dDl9nd6;ers6rA;en,on,s2;on;eks7iy8var1;ez;ej6;ev;ams",Person:"true¦ashton kutchSbRcMdKeIgastNhGinez,jEkDleCmBnettJoAp8r4s3t2v0;a0irgin maG;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussain,carlett johanssJlobodan milosevic,uB;ay romano,eese witherspoIo1ush limbau0;gh;d stewart,nald0;inho,o;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0ruz;on;dinal wols1son0;! palm2;ey;arack obama,rock;er"};const Ei="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",ki=Ei.split("").reduce((function(r,a,e){return r[a]=e,r}),{});var qi=function(r){if(void 0!==ki[r])return ki[r];let a=0,e=1,s=36,i=1;for(;e<r.length;a+=s,e++,s*=36);for(let e=r.length-1;e>=0;e--,i*=36){let s=r.charCodeAt(e)-48;s>10&&(s-=7),a+=s*i;}return a};var Pi=function(r){const a=new RegExp("([0-9A-Z]+):([0-9A-Z]+)");for(let e=0;e<r.nodes.length;e++){const s=a.exec(r.nodes[e]);if(!s){r.symCount=e;break}r.syms[qi(s[1])]=qi(s[2]);}r.nodes=r.nodes.slice(r.symCount,r.nodes.length);};const Oi=function(r,a,e){const s=qi(a);return s<r.symCount?r.syms[s]:e+s+1-r.symCount};var Fi=function(r){const a={nodes:r.split(";"),syms:[],symCount:0};return r.match(":")&&Pi(a),function(r){const a=[],e=(s,i)=>{let n=r.nodes[s];"!"===n[0]&&(a.push(i),n=n.slice(1));const o=n.split(/([A-Z0-9,]+)/g);for(let n=0;n<o.length;n+=2){const t=o[n],c=o[n+1];if(!t)continue;const u=i+t;if(","===c||void 0===c){a.push(u);continue}const l=Oi(r,c,s);e(l,u);}};return e(0,""),a}(a)};var Di=function(r){if(!r)return {};const a=r.split("|").reduce(((r,a)=>{const e=a.split("¦");return r[e[0]]=e[1],r}),{}),e={};return Object.keys(a).forEach((function(r){const s=Fi(a[r]);"true"===r&&(r=!0);for(let a=0;a<s.length;a++){const i=s[a];!0===e.hasOwnProperty(i)?!1===Array.isArray(e[i])?e[i]=[e[i],r]:e[i].push(r):e[i]=r;}})),e};const Ni=/^.([0-9]+)/;var Bi=function(r,a,e){if(a.exceptions.hasOwnProperty(r))return e&&console.log("exception, ",r,a.exceptions[r]),function(r,a){let e=a.exceptions[r],s=e.match(Ni);if(null===s)return a.exceptions[r];let i=Number(s[1])||0;return r.substr(0,i)+e.replace(Ni,"")}(r,a);let s=a.rules;a.reversed&&(s=a.rev),s=function(r,a={}){let e=a[r[r.length-1]]||[];return a[""]&&(e=e.concat(a[""])),e}(r,s);for(let a=0;a<s.length;a+=1){let i=s[a][0];if(r.endsWith(i)){e&&console.log("rule, ",s[a]);let n=new RegExp(i+"$");return r.replace(n,s[a][1])}}return e&&console.log(" x - "+r),r};const Ti=function(r){let a={};return r.forEach((r=>{let e=r[0]||"",s=e[e.length-1]||"";a[s]=a[s]||[],a[s].push(r);})),a},Hi=/^([0-9]+)/,Si=function(r){const a=/\|/;return r.split(/,/).map((r=>{let e=r.split(a);return function(r="",a=""){let e=(a=String(a)).match(Hi);if(null===e)return [r,a];let s=Number(e[1])||0,i=r.substring(0,s);return [r,i+a.replace(Hi,"")]}(e[0],e[1])}))};var Vi=function(r={}){return (r=Object.assign({},r)).rules=Si(r.rules),r.rules=Ti(r.rules),r.rev&&(r.rev=Si(r.rev),r.rev=Ti(r.rev)),r.exceptions=Si(r.exceptions),r.exceptions=r.exceptions.reduce(((r,a)=>(r[a[0]]=a[1],r)),{}),r};var Ii=function(r){let{rules:a,exceptions:e,rev:s}=r;var i;return i=e,e=Object.entries(i).reduce(((r,a)=>(r[a[1]]=a[0],r)),{}),{reversed:!Boolean(r.reversed),rules:a,exceptions:e,rev:s}},$i={presentTense:{first:{rules:"bicar|4,abricar|6mos,apar|3,ceptar|4áis,nsentir|2iento,astar|4mos,estigar|6n,omponer|6,omenzar|6mos,raduar|4áis,lorecer|6mos,ivertir|2iertes,esentir|5ís,eprimir|6mos,roteger|6mos,sificar|5áis,intar|4,squiar|3ío,espedir|3ide,ontecer|6mos,otestar|6mos,spertar|2ierta,ducar|3áis,estruir|5ís,onfiar|4áis,lonizar|5áis,namorar|6mos,ufrir|3ís,onsejar|6n,lustrar|6n,alcular|5áis,omper|4n,ailar|3o,orcer|uerce,onreír|3ío,arrer|3éis,mpezar|2iezas,epasar|5n,ablecer|6mos,ormir|uermes,erretir|3ite,ropezar|5áis,rindar|5mos,nvitar|5s,erendar|6mos,ngañar|5n,nviar|2ían,obernar|6mos,xigir|3ís,riunfar|6mos,uebrar|1iebran,uerer|1ieren,nfadar|5,sayunar|6s,esultar|6mos,rometer|6,gorar|3áis,legar|4mos,isfacer|6,sgustar|6s,brazar|5n,scender|2iende,busar|4s,onvidar|6n,tirizar|6,eshacer|4go,lanchar|6s,andonar|6,olocar|5s,esolver|2uelves,dvertir|2ierten,orrer|4,onjugar|5o,retener|5go,dmirar|5,ecidir|4e,omprar|5s,horrar|5n,oñar|2áis,xtender|2ienden,postar|4áis,atinar|5mos,terizar|6s,poyar|4mos,anejar|5,ompañar|6mos,ticipar|6,lantar|5,adrar|3o,egular|5,taminar|6mos,xplotar|6,ndicar|5,lenar|4s,evorar|5s,ulpar|4s,onsumir|5ís,eparar|4o,impiar|4áis,uceder|5n,endecir|5ís,sponder|5o,iquecer|6mos,egociar|6s,nseguir|5ís,iseñar|5,contrar|1uentra,liminar|6n,visar|4mos,laticar|6mos,bedecer|4zco,olgar|3áis,dornar|4o,evistar|5o,ocinar|5s,acudir|4ís,eñalar|4o,sperar|4áis,jercer|5,nfluir|4ís,positar|5áis,tilizar|6n,ncender|5éis,legrar|4áis,aciar|2ían,rever|3éis,dmitir|4ís,ituar|2úan,enovar|5mos,licitar|5o,edicar|4o,frecer|5mos,nseñar|4áis,quillar|5o,enacer|3zco,cercar|5mos,nformar|6n,divinar|6mos,reer|2o,iolar|3áis,almar|3áis,ralizar|6n,ratar|4s,onfesar|5áis,ausar|4,dificar|6s,yudar|4s,sminuir|6mos,urgir|3es,redecir|3ices,guantar|6mos,hocar|4,ruñir|3ís,vanzar|5mos,ntrolar|6s,nstruir|6mos,uemar|3áis,scoger|5,ganizar|6,roponer|6,fectuar|4úa,uardar|4áis,legir|1iges,rrollar|5áis,revivir|5ís,rseguir|5ís,ubir|2e,ntregar|6s,campar|4o,omar|2o,liviar|4áis,onvenir|3ienes,mplear|4o,nificar|6mos,nfirmar|6mos,ehusar|2úso,ombatir|5ís,rrojar|4o,ompetir|5ís,bortar|5,municar|6mos,ibujar|5mos,aludar|4áis,eplicar|5áis,aler|2go,levar|4n,umentar|6n,preciar|5o,ijar|3,nojar|4mos,nventar|6s,esentar|6s,evelar|5mos,uscar|4,uponer|4éis,ogar|2áis,rohibir|3íbes,rear|3s,orregir|3ijo,nservar|5áis,uidar|4mos,mprimir|5e,tumbrar|5áis,eriguar|6mos,raducir|6mos,sociar|5n,alir|3mos,sconder|6mos,lcanzar|6n,ograr|4n,siasmar|5áis,lquilar|6n,ermitir|5en,vejecer|4zco,oder|3mos,nhelar|4o,erdonar|6s,ontener|3iene,adurar|5,oblar|4mos,anar|3mos,avar|3s,astimar|6,nfermar|6n,ingir|3en,nversar|6n,ntinuar|6mos,ritar|3áis,ncionar|6,obrar|4s,ricular|5o,lmorzar|6mos,opiar|3o,ablar|4n,ecoger|5mos,studiar|5o,mpartir|5en,alvar|3o,arcar|4s,ealizar|5o,añer|3n,rreglar|5o,ntentar|6,ucear|4mos,oportar|6s,fligir|5mos,erder|ierdo,ncantar|5o,erminar|6s,ruzar|4,niciar|5s,echazar|6mos,espirar|6,umplir|4ís,ecibir|4en,galizar|6s,epender|6mos,quistar|6s,olestar|6mos,irigir|3jo,eredar|5n,autizar|6n,epetir|5mos,btener|4go,ravesar|3iesas,rabajar|6mos,nstalar|6mos,menazar|5áis,referir|3ieres,bolizar|5áis,plaudir|6mos,iajar|3áis,talecer|6,gistrar|5áis,xplorar|5o,omendar|2iendan,vorciar|6s,ancelar|6s,aquecer|6n,dorar|4,cabar|4n,lvidar|4áis,argar|4mos,egalar|5,ultivar|6mos,avegar|5,vacuar|5,umar|2o,sfrutar|6,elebrar|5áis,nsultar|6n,estir|isten,cificar|5o,espetar|6,ensurar|5áis,ecorar|5mos,efender|5éis,evantar|5o,ugerir|2iere,vilizar|6mos,ncluir|4yo,antener|5éis,amentar|6mos,rovocar|6s,educir|4e,ascinar|5áis,horcar|5,xponer|5,oseguir|2igues,nsuciar|6mos,erecer|5mos,nunciar|5o,arar|2áis,roducir|5e,stituir|5ye,nsar|2áis,rlar|3mos,migrar|5mos,spirar|5mos,cordar|5mos,necer|4n,parecer|6s,riar|3mos,enar|2áis,agar|3s,sitar|4mos,igar|2o,asar|3,traer|4n,ustar|3áis,vocar|3o,tender|5mos,pretar|4áis,clar|2o,nducir|4ís,mer|2n,vencer|3zo,untar|4s,volver|1uelve,testar|4o,acar|3n,adir|2ís,scar|3mos,resar|4s,llar|3s,licar|4mos,ibir|3mos,ticar|3áis,ear|1áis,ortar|3áis,char|2áis,rir|2mos,overse|ueves,uedarse|3áis,ncearse|4,ecarse|3,reverse|3éis,lamarse|3áis,udarse|3,actarse|4mos,allarse|4mos,ullirse|3en,uejarse|4mos,rarse|2mos,tarse|2s,omit|4a",exceptions:"dejar|3áis,beber|4mos,yacer|4mos,oponer|4éis,ir|voy,ser|1omos,odiar|4n,andar|3o,mandar|4áis,negar|4mos,regir|4mos,usar|3s,aprender|6éis,votar|3o,cansar|5,crecer|5,cerrar|1ierro,costar|1uesto,unir|2en,llorar|5,extinguir|7ís,desagradecer|11s,desagradar|9mos,meter|3o,errar|yerran,reservar|6o,hacer|3éis,servir|1irve,mostrar|6mos,vivir|3es,teñir|4mos,amar|3mos,afirmar|6,medir|4mos,tocar|4,jugar|2egan,saltar|4o,sentar|5mos,oír|1igo,volar|4mos,apagar|5mos,herir|1ieres,comprender|9,formar|4áis,entrar|5n,montar|5,calentar|3ientas,abordar|6s,notar|3áis,consistir|7o,pesar|4n,faltar|5n,aprobar|5áis,convertir|4ierten,huir|3mos,firmar|4o,venir|1iene,bajar|4,nadar|4n,oler|huelo,nacer|4mos,leer|3mos,jurar|4mos,coser|4,asistir|5e,tener|1ienen,matar|4mos,rezar|3o,bañar|3áis,lanzar|4áis,alentar|6mos,agradar|6s,coger|3éis,evitar|5mos,vender|5s,picar|4mos,peinar|4áis,curar|4,tirar|4s,demostrar|7áis,arrepentirse|5ientes,amanecer|5zco,poner|4s,pedir|1ides,dudar|4mos,cesar|4s,caber|quepo,caminar|5áis,durar|4mos,sorprender|8o,tardar|5n,distinguir|9mos,preservar|8mos,luchar|5s,sentirse|4ís,helar|1iela,toser|4n,insistir|6en,freír|4mos,acostar|6mos,bordar|4o,caer|3s,verificar|8mos,batir|3o,detener|3ienen,seguir|1igue,clarificar|9s,dar|2is,guiar|2ía,sonar|3áis,regar|4mos,robar|3o,mentir|1ientes,invertir|7mos,actuar|3úas,mirar|3o,distribuir|8yen,decir|4mos,saber|4s,reír|3s,agradecer|6zco,purificar|8,deber|3éis,cazar|4mos,padecer|6,sacrificar|9mos,ofender|6mos,glorificar|9,conocer|6,borrar|4o,estimar|6n,contar|5mos,cortar|5mos,probar|5mos,estar|3án,reinar|5mos,soler|1uelo,reñir|1iñe,hervir|1ierves,besar|3áis,pegar|3áis,reconocer|8n,aparecer|7,ver|2mos,contribuir|8yo,juntarse|5s,vestir|1isten",rev:"nsiento|2entir,squío|3iar,onrío|3eír,ierro|errar,uesto|ostar,eto|2er,eshago|4cer,espondo|6er,onsisto|6ir,reo|2er,ehúso|2usar,algo|2er,orrijo|3egir,rprendo|6er,ato|2ir,ierdo|erder,irijo|3gir,tengo|3er,venzo|3cer,uyo|1ir,zco|cer,o|ar,ueves|overse,omos|er,viertes|1ertir,teramos|4rse,mpiezas|2ezar,uedáis|3arse,uermes|ormir,suelves|1olver,ives|2ir,trevéis|4erse,paramos|4rse,lamáis|3arse,lientas|1entar,actamos|4rse,urges|3ir,redices|3ecir,liges|1egir,endes|4r,nvienes|2enir,allamos|4rse,feitas|5rse,rohíbes|3ibir,pientes|1entirse,ones|3r,ides|edir,uejamos|4rse,aes|2r,ais|1r,ctúas|2uar,abes|3r,eís|2r,aviesas|2esar,ierves|ervir,osigues|2eguir,ieres|erir,eces|3r,éis|er,ís|ir,as|1r,áis|ar,mos|r,espide|3edir,uerce|orcer,errite|3etir,romete|6r,sciende|2ender,irve|ervir,orre|4r,ecide|4ir,mprende|7r,ose|3r,siste|4ir,scoge|5r,ube|2ir,mprime|5ir,ontiene|3ener,igue|eguir,iñe|eñir,ugiere|2erir,stituye|5ir,vuelve|1olver,pone|4r,duce|3ir,ce|2r,spierta|2ertar,roncea|6rse,eca|3rse,cuentra|1ontrar,uda|3rse,omita|4,fectúa|4uar,iela|elar,uía|1iar,a|1r,uiebran|1ebrar,uieren|1erer,tienden|1ender,uegan|1gar,itúan|2uar,ermiten|5ir,mbullen|5irse,ingen|3ir,nsisten|5ir,mparten|5ir,eciben|4ir,ribuyen|4ir,miendan|1endar,stán|2ar,ían|iar,vierten|1ertir,tienen|1ener,n|r"},second:{rules:"bicar|4n,abricar|5áis,apar|2o,ceptar|4o,nsentir|2iente,eclarar|5o,astar|3áis,estigar|6s,omponer|6s,omenzar|2ienzas,raduar|3úan,lorecer|5éis,ivertir|2ierten,eprimir|5es,roteger|5éis,sificar|6,intar|3o,egresar|6mos,squiar|3ía,espedir|3ido,ontecer|4zco,spertar|2iertan,ducar|4s,estruir|5yo,onfiar|3ía,lonizar|6mos,namorar|5o,ufrir|3o,onsejar|5áis,lustrar|6s,alcular|6s,egatear|6mos,omper|4s,ailar|4,orcer|uerces,arrer|4s,mpezar|2iezo,epasar|5s,ablecer|4zco,ormir|uermen,ropezar|3iezas,rindar|5,erendar|5áis,urlar|3áis,nviar|2ías,obernar|2iernan,xigir|4mos,riunfar|6s,nmigrar|6s,uebrar|1iebro,uerer|1ieres,nfadar|4áis,sayunar|6n,esultar|6,rometer|5o,gorar|1üeras,legar|4s,isfacer|6n,brazar|5s,scender|2iendo,busar|4n,onvidar|6s,tirizar|5o,eshacer|6mos,lanchar|6n,andonar|5o,olocar|5n,uspirar|6s,esolver|6mos,dvertir|2iertes,orrer|3o,onjugar|6,retener|3iene,dmirar|4áis,rrachar|6,ecidir|4ís,omprar|5n,horrar|5s,oñar|3mos,xtender|2iendes,postar|1uestan,atinar|4áis,terizar|6n,poyar|4,cesitar|6s,anejar|5s,ticipar|5o,ariar|2ía,lantar|4o,adrar|4,egular|4o,bligar|5,taminar|6s,xplotar|5o,ndicar|4o,lenar|4n,evorar|5n,ulpar|4n,onsumir|5o,impiar|4o,uceder|5s,ublicar|5áis,ntender|2ienden,sponder|6,esear|4mos,iquecer|6,egociar|6n,nseguir|2iguen,rpretar|5o,contrar|1uentro,liminar|6s,visar|4s,laticar|5áis,bedecer|6mos,olgar|uelgo,dornar|5,evistar|6,ocinar|4áis,acudir|5mos,sperar|4o,jercer|5mos,nfluir|4yen,positar|5o,tilizar|6mos,ncender|2iende,legrar|5n,aciar|2ías,rever|3é,dmitir|5mos,ituar|2úas,enovar|4áis,licitar|6,edicar|5,ezclar|5,frecer|5n,onducir|6mos,quillar|6,enacer|5s,cercar|4áis,nformar|6s,divinar|5áis,iolar|4s,almar|4,ralizar|6s,onfesar|3iesas,ausar|3áis,dificar|5áis,yudar|4n,sminuir|5ís,urgir|3en,redecir|3icen,guantar|5áis,hocar|3o,ruñir|3en,equerir|3iere,ntrolar|6n,nstruir|5yen,ondenar|6,uemar|4mos,scoger|5mos,eguntar|6n,ganizar|5o,roponer|5go,fectuar|4úo,uardar|4o,legir|1igen,rseguir|2igo,ubir|2o,ntregar|6n,campar|5,omar|3,liviar|5,onvenir|3ienen,nificar|5o,ehusar|2úsa,ombatir|6mos,rrojar|5,bortar|4o,municar|5o,ibujar|5s,aludar|5mos,eplicar|6s,aler|3n,levar|4s,umentar|6s,preciar|6,ijar|2o,nojar|3o,nventar|5o,esentar|6n,evelar|4o,uscar|3o,uponer|5,ogar|uegas,rohibir|3íben,rear|3n,nservar|6s,uidar|4n,mprimir|5o,tumbrar|5o,eriguar|6,raducir|4zco,sociar|5s,alir|2es,sconder|6n,burrir|4en,ograr|4s,siasmar|6mos,lquilar|6s,ermitir|5es,orir|ueren,vejecer|6n,oder|uedo,nhelar|5,erdonar|6n,ecordar|2uerdan,ontener|3ienen,adurar|5mos,oblar|4,hismear|6mos,anar|3n,avar|3n,astimar|5o,nfermar|6s,ingir|3es,nversar|5o,ntinuar|5áis,ncionar|5o,obrar|4n,ricular|6,lmorzar|2uerzan,opiar|4,ablar|4s,ecoger|5,mpartir|5es,alvar|4,arcar|4n,ealizar|6,añer|3s,rreglar|6,ntentar|5o,ucear|3áis,oportar|6n,fligir|3jo,erder|ierde,ncantar|6n,erminar|6n,ruzar|3o,niciar|5n,echazar|6s,ragar|4,espirar|5o,umplir|4e,ecibir|4es,ñadir|4mos,galizar|6n,epender|6,quistar|6n,olestar|5o,irigir|4ís,eredar|5s,autizar|6s,nvadir|4es,epetir|2iten,btener|5mos,xhibir|4ís,ravesar|3iesan,rabajar|6n,menazar|6,referir|6mos,scuchar|6,bolizar|6mos,teresar|6,plaudir|5o,talecer|5éis,gistrar|5o,xplorar|6s,omendar|2iendas,vorciar|6n,ancelar|6n,aquecer|6s,dorar|3o,cabar|4s,lvidar|4o,argar|3áis,eciclar|5áis,egalar|4o,ultivar|6n,avegar|4o,vacuar|4o,umar|3,sfrutar|5o,xpresar|6n,elebrar|6mos,nsultar|6s,estir|istes,cificar|6,espetar|6s,ensurar|6n,ecorar|5s,efender|2iendo,evantar|6,ugerir|2iero,vilizar|5o,ncluir|4ye,antener|3iene,harlar|5,amentar|6n,astigar|6n,tacar|4s,rovocar|6n,educir|4ís,ascinar|6s,horcar|4o,xponer|4go,oseguir|2iguen,nsuciar|5áis,erecer|4éis,diar|3,entir|ienten,stituir|5yo,nsar|3mos,reír|1íe,etir|ito,añar|3s,ustar|4,eservar|6,firmar|4o,asar|2o,traer|4s,parar|4,vocar|4,decir|1igo,lear|3,señar|3o,probar|2ueban,alar|3s,ajar|3s,eer|2,mer|2s,plicar|5n,atar|2áis,vencer|4éis,anzar|4s,volver|1uelvo,regir|3ís,aber|3n,brir|2en,scar|3,conocer|5éis,testar|5,portar|5mos,adecer|5n,necer|4s,vir|2mos,ticar|4mos,rificar|5o,llar|3n,itar|3n,overse|ueven,terarse|3áis,uedarse|4,ncearse|3o,ecarse|2o,reverse|4mos,pararse|4n,lamarse|4s,udarse|2o,actarse|3o,allarse|3áis,ullirse|3o,uejarse|3o,tarse|2n,omit|4o",exceptions:"dejar|4,beber|3éis,renunciar|8s,yacer|4s,oponer|5mos,ir|vais,ser|es,andar|4,mandar|5s,negar|1iegan,introducir|8es,usar|2áis,aprender|7n,votar|4,cansar|4o,parecer|6mos,crecer|3zco,cerrar|1ierra,costar|1uesta,unir|2es,llorar|5n,extinguir|7e,desagradar|9s,meter|4s,errar|yerras,acordar|2uerdas,hacer|2go,servir|1irvo,mostrar|1uestra,desaparecer|10n,criar|3áis,teñir|1iñen,cenar|3o,pagar|4n,amar|2o,medir|3ís,tocar|4n,jugar|2egas,saltar|5mos,sentar|1ientas,oír|2s,volar|3áis,apagar|4áis,herir|1ieren,comprender|9mos,formar|5mos,entrar|4áis,montar|4o,calentar|3ientan,abordar|6n,notar|4s,consistir|7e,pesar|4s,faltar|5s,convertir|7ís,huir|2yes,firmar|5,venir|3go,nadar|4s,oler|huele,aspirar|5áis,nacer|4,describir|7o,jurar|3o,coser|3o,asistir|5o,tener|1ienes,rezar|4,bañar|4mos,lanzar|5mos,alentar|2ienta,agradar|6n,coger|4n,vender|5n,picar|3áis,peinar|5,curar|3o,echar|4mos,tirar|4n,demostrar|8mos,arrepentirse|5ienten,poner|4n,acortar|5o,pedir|1iden,dudar|3áis,cesar|4,cubrir|4es,caminar|6,durar|4s,sorprender|9,tardar|5s,distinguir|8ís,luchar|5n,sentirse|5mos,helar|1ielan,toser|3éis,insistir|6ís,acostar|2uesto,bordar|5,apretar|3ieto,caer|3n,verificar|8,batir|3e,detener|3ienes,seguir|1igues,clarificar|9n,dar|2,guiar|2ías,duchar|5mos,sonar|1uenas,escribir|6ís,regar|3áis,robar|4,sacar|4,invertir|3ierten,actuar|3úan,mirar|4,distribuir|8ís,atender|5éis,reír|1íen,deber|4mos,cazar|4,ofender|6,untar|4mos,borrar|5,estimar|6s,contar|4áis,cortar|4áis,estar|3ás,reinar|4áis,soler|1uele,anunciar|7,producir|5zco,reñir|1iño,besar|4,pegar|4s,gustar|5mos,aparecer|6éis,emigrar|5áis,ver|2n,contribuir|8ye,inducir|4zco,juntarse|5n,mudarse|3o,rogar|1uegas",rev:"nsiente|2entir,xtingue|6ir,nciende|2ender,equiere|3erir,upone|5r,ecoge|5r,ierde|erder,umple|4ir,ríe|1eír,tiene|1ener,ce|2r,te|1ir,ee|2r,uye|1ir,nde|3r,ompones|6r,mienzas|1enzar,nteráis|4arse,eprimes|5ir,roduces|5ir,ompes|4r,uerces|orcer,arres|4r,opiezas|2ezar,uieres|1erer,güeras|1orar,etes|3r,cuerdas|1ordar,viertes|1ertir,revemos|4rse,tiendes|1ender,ientas|entar,lamas|4rse,ucedes|5r,uyes|1ir,itúas|2uar,nfiesas|2esar,alláis|3arse,ales|2ir,ermites|5ir,ubres|3ir,entimos|4rse,inges|3ir,mpartes|5ir,igues|eguir,añes|3r,uenas|onar,ecibes|4ir,nvades|4ir,miendas|1endar,stás|2ar,istes|estir,traes|4r,mes|2r,tienes|1ener,ías|iar,ces|2r,éis|er,ís|ir,áis|ar,mos|r,as|1r,ueven|overse,iegan|egar,piertan|1ertar,uermen|ormir,biernan|1ernar,iñen|eñir,puestan|1ostar,reparan|6rse,ieren|erir,lientan|1entar,tienden|1ender,urgen|3ir,redicen|3ecir,ruñen|3ir,ligen|1egir,nvienen|2enir,feitan|5rse,rohíben|3ibir,pienten|1entirse,iden|edir,ueren|orir,cuerdan|1ordar,ntienen|2ener,ielan|elar,muerzan|1orzar,íen|eír,epiten|2etir,aviesan|2esar,úan|uar,vierten|1ertir,ienten|entir,siguen|1eguir,prueban|2obar,uyen|1ir,ren|1ir,n|r,espido|3edir,ufro|3ir,mpiezo|2ezar,errito|3etir,ronceo|5arse,uiebro|1ebrar,rometo|5er,eco|2arse,ago|1cer,irvo|ervir,orro|3er,onsumo|5ir,cuentro|1ontrar,uelgo|olgar,engo|2ir,oso|2er,acto|3arse,sisto|4ir,omito|4,fectúo|4uar,ersigo|3eguir,ompito|3etir,mprimo|5ir,uedo|oder,ambullo|6irse,cuesto|1ostar,uejo|3arse,prieto|2etar,flijo|3gir,plaudo|5ir,iño|eñir,ugiero|2erir,iendo|ender,digo|1ecir,bo|1ir,pongo|3er,vuelvo|1olver,ezco|1cer,uyo|1ir,duzco|2cir,o|ar,ierra|errar,uesta|ostar,ueda|4rse,uestra|ostrar,lienta|1entar,ehúsa|2usar,ía|iar,a|1r,revé|3er"},third:{rules:"bicar|4mos,abricar|6s,apar|2áis,ceptar|5,nsentir|5ís,eclarar|6,astar|3o,estigar|5áis,omponer|6n,omenzar|2ienzan,raduar|3úas,lorecer|6s,esentir|2ientes,eprimir|5en,roteger|6s,sificar|5o,intar|4mos,squiar|5mos,espedir|5ís,ontecer|5éis,otestar|5o,spertar|2iertas,ducar|4n,estruir|5ye,onfiar|3ío,lonizar|6s,namorar|6,ufrir|3e,onsejar|6mos,lustrar|5o,alcular|6n,egatear|5o,ensar|iensas,omper|4,ailar|4mos,orcer|uercen,onreír|3íes,epillar|6mos,eportar|6s,arrer|4n,mpezar|2ieza,epasar|5mos,mportar|6s,ablecer|6,ormir|4mos,erretir|6mos,allar|3áis,ropezar|3iezan,rindar|4o,nvitar|5,erendar|2iendan,ngañar|4áis,urlar|4s,nviar|3áis,obernar|2iernas,xigir|2jo,riunfar|5o,uebrar|1iebras,uerer|3éis,nfadar|4o,sayunar|5o,esultar|5o,rometer|5éis,gorar|1üeran,legar|4n,isfacer|4go,brazar|5mos,scender|6mos,busar|4mos,onvidar|5áis,tirizar|6mos,eshacer|5éis,lanchar|5o,andonar|6s,olocar|4áis,uspirar|6,esolver|2uelven,orrer|4mos,xportar|6,onjugar|6s,retener|3ienen,dmirar|4o,rrachar|6s,ecidir|4o,omprar|4áis,oñar|ueña,xtender|5éis,postar|1uestas,atinar|4o,terizar|5áis,poyar|3o,cesitar|6n,anejar|5n,ompañar|6n,ticipar|6n,ariar|2ío,lantar|5mos,adrar|4mos,bligar|5mos,taminar|6n,xplotar|6mos,ndicar|4áis,lenar|3áis,evorar|4o,ulpar|3áis,onsumir|5e,eparar|5s,impiar|5,uceder|5mos,uivocar|6n,ublicar|6s,endecir|6mos,ntender|2iendes,esear|4n,elear|3o,iquecer|6n,egociar|6mos,nseguir|2igues,rpretar|6,contrar|1uentran,liminar|5áis,visar|4n,laticar|6s,bedecer|6,olgar|uelga,dornar|5n,evistar|6mos,ocinar|5,sperar|5,jercer|4éis,nfluir|5mos,positar|6,tilizar|5o,ncender|2iendo,legrar|5s,aciar|4mos,rever|4o,dmitir|4en,ituar|2úa,enovar|2uevo,licitar|6mos,edicar|5mos,frecer|5s,onducir|5e,quillar|6n,cercar|4o,emer|3mos,nformar|5o,divinar|5o,reer|3n,iolar|4n,almar|3o,ralizar|6mos,xplicar|5áis,ratar|4n,onfesar|3iesan,ausar|4mos,dificar|6n,yudar|3áis,sminuir|5ye,urgir|3ís,redecir|3igo,guantar|5o,hocar|4s,ruñir|3es,vanzar|5n,equerir|3iero,ntrolar|6mos,nstruir|5yes,asticar|6,ondenar|5o,uemar|4n,scoger|4éis,eguntar|6mos,ganizar|6mos,roponer|5éis,fectuar|4úas,uardar|5n,legir|3ís,rrollar|6s,revivir|5e,rillar|4o,rseguir|6mos,ubir|3mos,ntregar|5áis,campar|5n,omar|3s,liviar|4o,onvenir|5go,mplear|4áis,nificar|5áis,nfirmar|6,ehusar|4áis,ombatir|5e,rrojar|5mos,bortar|4áis,municar|6,ibujar|5n,evolver|6mos,eplicar|6n,levar|4mos,umentar|6mos,preciar|5áis,ijar|3mos,nojar|4,nventar|6mos,esentar|5áis,evelar|5,uscar|4n,uponer|5n,ogar|uegan,rohibir|3íbo,rear|2o,orregir|6mos,nservar|6n,omer|2éis,uidar|4s,mprimir|5ís,tumbrar|6,eriguar|5o,raducir|5ís,sociar|4o,alir|2en,lcanzar|5áis,burrir|4es,ograr|4,siasmar|6,lquilar|6,ermitir|6mos,orir|ueres,vejecer|6,oder|uede,scansar|6n,nhelar|5mos,erdonar|6,ecordar|2uerdas,ontener|3ienes,adurar|4áis,etestar|6mos,oblar|3o,hismear|6s,anar|3s,avar|2o,astimar|5áis,nfermar|5o,ingir|3ís,nversar|6,ntinuar|4úan,ritar|4s,ncionar|6mos,obrar|4mos,lmorzar|2uerzas,opiar|4n,ablar|3áis,ecoger|3jo,studiar|6mos,alvar|4n,ealizar|5áis,añer|2éis,rreglar|6n,ntentar|6n,ucear|4,oportar|6mos,erder|4mos,ncantar|6s,erminar|5o,ruzar|4n,niciar|5,echazar|6n,espirar|6mos,umplir|4es,ecibir|5mos,ñadir|3es,galizar|5o,epender|5éis,quistar|5áis,olestar|6,nvocar|5s,acticar|6s,riticar|5o,eredar|4o,autizar|5áis,nvadir|4en,btener|2iene,ntestar|6s,xhibir|4o,ravesar|3iesa,rabajar|6s,menazar|6s,referir|3ieren,scuchar|5o,bolizar|6s,iajar|4n,talecer|6s,gistrar|6,xplorar|6n,omendar|5áis,vorciar|5o,ancelar|5o,isitar|4áis,aquecer|5éis,dorar|3áis,cabar|3o,lvidar|5,argar|4n,egalar|4áis,ultivar|6s,avegar|5mos,vacuar|4áis,umar|2áis,sfrutar|6mos,elebrar|6s,nsultar|5áis,estir|4mos,cificar|5áis,espetar|6n,ensurar|6s,ecorar|5n,efender|2iende,evantar|5áis,ugerir|4ís,vilizar|6,ncluir|4ís,antener|3ienen,harlar|4o,amentar|6s,astigar|6s,tacar|3áis,rovocar|5áis,educir|4es,ascinar|6n,xponer|4éis,oseguir|2igo,nsuciar|6s,erecer|5,nunciar|6n,prender|6s,otar|3n,migrar|5n,ustar|3o,necer|4mos,parecer|5éis,orrar|4mos,firmar|5mos,ular|3s,asar|2áis,agar|2o,alentar|2iento,onder|4s,señar|4mos,probar|2uebas,udir|2e,alar|3n,ler|2mos,clar|3n,aer|2,oser|3s,nacer|4n,vencer|5mos,petir|1ite,udar|2o,brir|2es,rcar|3mos,igir|2e,adecer|5s,scar|2o,rtir|3mos,resar|3o,vir|1ís,overse|uevo,terarse|4n,uedarse|3o,ncearse|3áis,ecarse|3mos,reverse|4,pararse|4s,lamarse|4n,udarse|3n,actarse|4,allarse|4s,ullirse|4mos,uejarse|4,tarse|2mos,omit|4as",exceptions:"dejar|3o,beber|4n,yacer|4n,oponer|5n,ir|va,ser|1ois,odiar|3o,andar|3áis,mandar|5n,negar|1iegas,introducir|8en,regir|1ige,usar|2o,constituir|8yen,cansar|4áis,crecer|5n,cerrar|4áis,costar|5mos,unir|3mos,llorar|5s,extinguir|7en,desagradecer|9zco,desagradar|9n,meter|4n,errar|yerro,acordar|2uerdan,reservar|7s,hacer|4s,mostrar|1uestro,criar|2ías,teñir|1iñes,cenar|4,pagar|4mos,amar|3,medir|1iden,tocar|4s,jugar|4mos,saltar|5s,sentar|1ientan,oír|1ye,volar|1uela,atraer|5mos,herir|1iere,formar|5s,entrar|5s,montar|5n,abordar|5áis,consistir|7es,pesar|4,faltar|5,convertir|4ierte,huir|2yen,venir|1ienen,bajar|3o,nadar|3o,aspirar|6n,describir|7e,leer|2o,jurar|4n,asistir|5ís,tener|4mos,matar|4,rezar|4s,bañar|3o,lanzar|4o,agradar|5áis,coger|4s,sustituir|8mos,evitar|5s,vender|5mos,picar|3o,peinar|4o,curar|3áis,echar|4,tirar|4mos,demostrar|3uestra,arrepentirse|8ís,amanecer|7n,poner|4mos,acortar|6,pedir|1ido,cesar|3o,cubrir|4en,caber|4s,caminar|5o,durar|4n,sorprender|9mos,tardar|5mos,distinguir|7o,preservar|7o,luchar|5mos,sentirse|1iente,helar|1ielas,insistir|6o,freír|2ío,acostar|2uesta,bordar|5mos,aplicar|6s,apretar|3ieta,verificar|7o,batir|3es,detener|3iene,seguir|1iguen,clarificar|9mos,dar|1oy,guiar|2ían,duchar|5s,sonar|4mos,escribir|6en,regar|1iego,robar|3áis,sacar|3o,mentir|5mos,invertir|3iertes,actuar|5mos,mirar|3áis,distribuir|8yes,volver|4éis,decir|1icen,atender|2iendo,saber|3éis,reír|3mos,purificar|7áis,deber|3o,cazar|3o,sacrificar|9,ofender|5o,glorificar|8áis,parar|3o,conocer|6mos,untar|4n,estimar|6mos,contar|1uentas,cortar|4o,estar|4mos,reinar|5s,soler|1ueles,producir|6ís,reñir|4mos,besar|4n,pegar|4n,gustar|5s,reconocer|8,aparecer|7n,ver|2,contribuir|8ís,inducir|5es,moverse|1uevo,juntarse|5mos,prepararse|7s",rev:"mienzan|1enzar,nteran|5rse,eprimen|5ir,roducen|5ir,uercen|orcer,opiezan|2ezar,riendan|1endar,tinguen|5ir,güeran|1orar,suelven|1olver,cuerdan|1ordar,iden|edir,ientan|entar,laman|4rse,uentran|ontrar,dmiten|4ir,udan|3rse,nfiesan|2esar,uegan|ogar,alen|2ir,ubren|3ir,ntinúan|4uar,iguen|eguir,uían|1iar,scriben|5ir,icen|ecir,nvaden|4ir,efieren|2erir,uyen|1ir,tienen|1ener,n|r,ois|er,sientes|1entir,iegas|egar,piertas|1ertar,iensas|ensar,onríes|3eír,biernas|1ernar,onceáis|4arse,uiebras|1ebrar,ecamos|3rse,rías|1iar,iñes|eñir,puestas|1ostar,tiendes|1ender,nsigues|2eguir,nsistes|5ir,omitas|4,ruñes|3ir,allas|4rse,eitamos|4rse,epentís|5irse,ueres|orir,abes|3r,cuerdas|1ordar,ntienes|2ener,ullimos|4rse,ielas|elar,muerzas|1orzar,ates|2ir,umples|4ir,viertes|1ertir,ñades|3ir,uentas|ontar,ueles|oler,úas|uar,ges|2r,pruebas|2obar,oses|3r,uyes|1ir,duces|3ir,res|1ir,ndes|3r,ces|2r,ís|ir,éis|er,as|1r,áis|ar,mos|r,ufre|3ir,ompe|4r,treve|5rse,iere|erir,onsume|5ir,nvierte|2ertir,onduce|5ir,escribe|6ir,brevive|6ir,ombate|5ir,uede|oder,iente|entirse,efiende|2ender,uye|1ir,ude|2ir,ae|2r,pite|1etir,tiene|1ener,ige|2ir,ce|2r,mpieza|2ezar,ueña|oñar,uela|olar,uelga|olgar,itúa|2uar,acta|4rse,muestra|1ostrar,cuesta|1ostar,ueja|4rse,prieta|2etar,raviesa|3esar,a|1r,uedo|3arse,xijo|2gir,radezco|4cer,tisfago|5cer,uestro|ostrar,ecido|4ir,reveo|4r,enuevo|2ovar,redigo|3ecir,equiero|3erir,onvengo|5ir,rohíbo|3ibir,istingo|6uir,nsisto|5ir,ecojo|3ger,iego|egar,ebo|2er,xhibo|4ir,fendo|4er,rosigo|3eguir,ío|iar,aliento|2entar,iendo|ender,o|ar,oy|ar"},firstPlural:{rules:"bicar|3o,abricar|6n,ceptar|5mos,nsentir|6mos,eclarar|6s,astar|4,estigar|6mos,omponer|6mos,omenzar|2ienza,raduar|3úa,lorecer|6n,ivertir|5ís,esentir|2iente,eprimir|5e,roteger|6n,sificar|6mos,intar|3áis,squiar|3ías,espedir|3iden,ontecer|6n,otestar|5áis,spertar|6mos,ducar|4mos,estruir|6mos,onfiar|5mos,namorar|5áis,ufrir|3en,onsejar|6s,lustrar|6,egatear|6,ensar|iensan,omper|3o,ailar|4s,orcer|4mos,onreír|3íen,epillar|5áis,eportar|6n,arrer|4mos,mpezar|2iezan,epasar|4áis,mportar|6n,ablecer|5éis,ormir|3ís,erretir|3iten,allar|4,ropezar|3iezo,rindar|4áis,nvitar|4o,erendar|2iendas,ngañar|5mos,urlar|4n,nviar|4mos,obernar|2ierno,xigir|3e,riunfar|6,nmigrar|5áis,uebrar|4áis,uerer|1iero,nfadar|5mos,sayunar|6,esultar|5áis,rometer|6s,gorar|1üera,legar|4,isfacer|6mos,scender|5éis,busar|4,onvidar|5o,tirizar|5áis,eshacer|6,lanchar|6,andonar|6n,olocar|4o,uspirar|5o,dvertir|2ierte,orrer|3éis,xportar|5o,onjugar|6n,retener|3ienes,dmirar|5s,rrachar|6n,tenecer|4zco,ecidir|4es,omprar|4o,horrar|4o,oñar|ueño,xtender|6mos,postar|5mos,atinar|5,terizar|5o,poyar|3áis,anejar|4o,ompañar|5o,lantar|5s,adrar|4n,bligar|5s,taminar|5áis,xplotar|5áis,ndicar|5n,evorar|4áis,ulpar|3o,onsumir|5es,eparar|5n,sustar|5mos,uceder|4o,uivocar|6s,ublicar|6n,endecir|3icen,sponder|6n,esear|4s,elear|4s,iquecer|6s,egociar|5áis,nseguir|6mos,rpretar|6n,contrar|1uentras,liminar|5o,visar|4,laticar|6n,bedecer|6s,olgar|uelgan,dornar|5s,evistar|6s,acudir|4en,eñalar|5mos,sperar|5n,jercer|3zo,nfluir|4yo,positar|6n,tilizar|6,ncender|6mos,legrar|4o,aciar|3áis,rever|3és,dmitir|4es,ituar|2úo,enovar|2ueva,licitar|6n,edicar|5s,frecer|5,quillar|6mos,enacer|5mos,cercar|5,emer|3,divinar|6,iolar|4mos,almar|4s,xplicar|6s,ratar|4mos,onfesar|6mos,ausar|4s,nvencer|6s,dificar|5o,yudar|3o,sminuir|5yo,urgir|4mos,redecir|5ís,guantar|6,hocar|4n,ruñir|4mos,equerir|5ís,ntrolar|5áis,nstruir|5yo,asticar|6s,uemar|4s,scoger|5n,eguntar|5o,roponer|6mos,fectuar|4úan,uardar|5s,rrollar|5o,revivir|5o,rillar|5,rseguir|2igue,ubir|2ís,ntregar|6,omar|2áis,liviar|5s,onvenir|6mos,mplear|5n,nificar|6n,nfirmar|5áis,ehusar|5mos,ombatir|5o,ompetir|3ites,bortar|5mos,municar|5áis,ibujar|5,aludar|5n,eplicar|6mos,aler|3s,levar|3áis,preciar|6n,ijar|3s,nventar|6,esentar|6mos,evelar|5n,uscar|4s,uponer|5s,ogar|uego,rohibir|3íbe,rear|3,orregir|3igen,nservar|6mos,omer|3mos,uidar|3áis,mprimir|6mos,tumbrar|6mos,eriguar|6n,sociar|5,alir|2go,sconder|5o,burrir|4e,ograr|3o,siasmar|6n,lquilar|5o,ermitir|5ís,orir|uere,vejecer|6s,oder|uedes,nhelar|4áis,erdonar|5o,ecordar|2uerda,ontener|5go,adurar|4o,etestar|6s,oblar|4s,hismear|6n,anar|3,avar|3,astimar|6mos,nfermar|6,ingir|4mos,nversar|6mos,scubrir|5ís,ntinuar|4úas,ritar|4mos,ncionar|6s,obrar|4,ricular|6n,lmorzar|2uerza,ablar|4mos,ecoger|5s,studiar|6s,mpartir|5e,alvar|4s,arcar|3o,ealizar|6s,añer|2o,rreglar|6s,ntentar|6s,ucear|3o,oportar|5o,fligir|4ís,erder|3éis,ncantar|6mos,erminar|6,ruzar|4s,niciar|4o,espirar|5áis,umplir|4en,ecibir|4e,ñadir|3en,epender|6n,quistar|6mos,olestar|5áis,irigir|4es,nvocar|5n,acticar|6n,riticar|6,eredar|5,autizar|6mos,nvadir|4o,epetir|2ito,btener|2ienes,ntestar|6mos,xhibir|4e,ravesar|3ieso,rabajar|5áis,nstalar|5o,menazar|6n,escar|3áis,referir|3iere,scuchar|6s,bolizar|6n,teresar|6mos,plaudir|5es,iajar|3o,talecer|6n,gistrar|6s,xplorar|6,omendar|2ienda,vorciar|6,ancelar|6,aquecer|6mos,dorar|4mos,cabar|3áis,lvidar|5mos,argar|3o,egalar|5n,ultivar|6,avegar|5s,vacuar|5s,umar|3s,sfrutar|5áis,elebrar|6n,nsultar|5o,estir|3ís,cificar|6s,espetar|5o,ensurar|6mos,ecorar|5,efender|6mos,evantar|6mos,ugerir|2ieren,vilizar|6s,nfiscar|6n,ncluir|4yen,antener|3ienes,harlar|4áis,astigar|6,tacar|3o,rovocar|6mos,horcar|4áis,xponer|5s,oseguir|5ís,nsuciar|6n,erecer|5s,egir|ijo,resar|4,nizar|4n,ular|3mos,radecer|6,gustar|5n,olver|3éis,eservar|6n,riar|1ían,agar|2áis,sitar|3o,aer|1igo,enar|3mos,piar|3s,alentar|5áis,tender|1iende,señar|4n,cinar|3o,clar|3s,scribir|5es,eer|2s,formar|5,alizar|5,einar|4n,ojar|2áis,mentar|4áis,cansar|5s,brir|2e,tribuir|6mos,conocer|4zco,par|2s,azar|2áis,anzar|4,rificar|6s,ducir|3en,overse|ueve,terarse|4s,uedarse|4n,ncearse|4n,ecarse|3n,reverse|3o,pararse|4,lamarse|4,udarse|3s,allarse|3o,eitarse|4,ullirse|3ís,uejarse|4n,tarse|1áis,omit|4an",exceptions:"dejar|4mos,beber|4s,renunciar|8,yacer|2zco,oponer|5s,ir|van,ser|eres,odiar|3áis,andar|4mos,mandar|5,negar|3áis,introducir|7zco,usar|3mos,constituir|8yes,aprender|7mos,votar|4s,parecer|4zco,crecer|5s,cerrar|5mos,costar|4áis,unir|2e,llorar|4áis,extinguir|7es,desagradar|8áis,meter|4,errar|yerra,acordar|5áis,hacer|4n,servir|1irves,permanecer|8éis,mostrar|5áis,desaparecer|10mos,vivir|3en,teñir|3ís,cenar|4s,amar|3n,afirmar|6s,medir|1ides,tocar|3o,jugar|3áis,saltar|5n,sentar|1ienta,oír|1yen,volar|1uelo,casar|4mos,apagar|5,herir|1iero,comprender|9n,entrar|5mos,montar|5s,abordar|6mos,notar|4mos,consistir|7en,pesar|3o,faltar|4o,aprobar|6mos,convertir|4ierto,huir|2ís,firmar|5n,venir|1ienes,bajar|4mos,nadar|4,oler|2éis,aspirar|6s,nacer|4s,traer|4mos,jurar|4s,coser|4n,asistir|5es,tener|1iene,matar|3o,rezar|4mos,bañar|4,agradar|5o,coger|2jo,sustituir|7ís,evitar|4áis,vender|4o,picar|4,curar|4mos,echar|3o,tirar|4,demostrar|3uestro,arrepentirse|9mos,pasar|4n,amanecer|7,poner|4,acortar|6n,pedir|1ide,dudar|4,cesar|4n,caber|4,caminar|6mos,durar|3áis,sorprender|9s,tardar|4áis,distinguir|8e,luchar|4áis,sentirse|1iento,helar|1ielo,toser|4mos,insistir|6e,freír|4s,acostar|2uestas,bordar|4áis,aplicar|5áis,apretar|6mos,batir|3en,detener|5go,seguir|1igo,clarificar|8áis,dar|2mos,guiar|2ío,duchar|5n,sonar|1uenan,regar|1iega,robar|4n,sacar|3áis,mentir|4ís,invertir|6ís,actuar|3úa,mirar|4mos,volver|5mos,decir|1ices,saber|1é,reír|1íe,vencer|5,purificar|8n,deber|4,padecer|4zco,ofender|5éis,parar|4mos,untar|4,borrar|5n,estimar|5áis,contar|1uentan,cortar|5,probar|4áis,estar|3á,soler|1uelen,anunciar|7s,producir|7mos,reñir|1iñen,hervir|1ierve,besar|4s,pegar|3o,aparecer|7s,emigrar|6s,ver|2is,tañer|3o",rev:"ebes|3r,nteras|5rse,squías|3iar,tituyes|4ir,riendas|1endar,tingues|5ir,rometes|6r,irves|ervir,ecides|4ir,untáis|3arse,onsumes|5ir,uentras|ontrar,revés|3er,dmites|4ir,udas|3rse,actáis|3arse,sistes|4ir,ompites|3etir,ales|3r,uedes|oder,prendes|6r,mbullís|5irse,ntinúas|4uar,reís|3r,cuestas|1ostar,ecoges|5r,ices|ecir,iriges|4ir,plaudes|5ir,eis|1r,scribes|5ir,ees|2r,pones|4r,tienes|1ener,ces|2r,éis|er,ís|ir,as|1r,áis|ar,mos|r,ueve|overse,esiente|2entir,eprime|5ir,xige|3ir,ete|3r,dvierte|2ertir,eme|3r,iene|ener,ersigue|3eguir,rohíbe|3ibir,one|3r,ide|edir,uere|orir,abe|3r,stingue|6ir,nsiste|5ir,omparte|6ir,íe|eír,ebe|3r,refiere|3erir,ierve|ervir,tiende|1ender,ibe|2ir,re|1ir,ce|2r,omienza|2enzar,güera|1orar,ienta|entar,repara|6rse,lama|4rse,enueva|2ovar,feita|5rse,ecuerda|2ordar,lmuerza|2orzar,iega|egar,omienda|2endar,úa|uar,a|1r,roduzco|4cir,ompo|3er,ropiezo|3ezar,obierno|2ernar,uiero|1erer,onvido|5ar,trevo|4erse,ueño|oñar,cterizo|6ar,anejo|4ar,compaño|6ar,uelo|olar,ulpo|3ar,ucedo|4er,nvierto|2ertir,jerzo|3cer,itúo|2uar,yudo|3ar,grado|4ar,ojo|1ger,arrollo|6ar,brevivo|6ir,ombato|5ir,cho|2ar,allo|3arse,muestro|1ostrar,uego|ogar,algo|2ir,lquilo|5ar,iento|entirse,ielo|elar,arco|3ar,uío|1iar,uceo|3ar,nicio|4ar,nvado|4ir,epito|2etir,ravieso|3esar,nstalo|5ar,iajo|3ar,argo|3ar,taco|3ar,ico|2ar,ijo|egir,oco|2ar,aigo|1er,ndo|2er,tengo|3er,uyo|1ir,no|1ar,zco|cer,ro|1ar,to|1ar,espiden|3edir,ufren|3ir,iensan|ensar,onríen|3eír,mpiezan|2ezar,uedan|4rse,erriten|3etir,roncean|6rse,ecan|3rse,iven|2ir,endicen|3ecir,uelgan|olgar,acuden|4ir,omitan|4,fectúan|4uar,orrigen|3egir,uejan|4rse,uenan|onar,umplen|4ir,ñaden|3ir,uentan|ontar,uelen|oler,iñen|eñir,ugieren|2erir,ncluyen|4ir,rían|1iar,ten|1ir,ducen|3ir,n|r,é|aber,stá|2ar"},secondPlural:{rules:"bicar|4s,abricar|5o,apar|3n,ceptar|5n,nsentir|2ienten,astar|4s,estigar|5o,omponer|5éis,omenzar|2ienzo,raduar|3úo,lorecer|6,ivertir|2ierte,esentir|2iento,eprimir|5ís,roteger|4jo,sificar|6s,intar|4s,squiar|3ían,espedir|3ides,ontecer|6s,otestar|6s,spertar|5áis,ducar|3o,estruir|5yes,onfiar|3ías,lonizar|6,namorar|6s,ufrir|3es,onsejar|5o,lustrar|6mos,alcular|5o,egatear|6s,ensar|ienso,omper|4mos,ailar|4n,orcer|3éis,onreír|5s,epillar|5o,eportar|6,arrer|4,epasar|5,mportar|5o,ablecer|6s,ormir|uermo,allar|4mos,ropezar|3ieza,rindar|5n,nvitar|5mos,erendar|2ienda,urlar|3o,nviar|2ía,obernar|2ierna,riunfar|6n,uebrar|5mos,uerer|1iere,nfadar|5n,sayunar|5áis,esultar|6n,rometer|6n,gorar|1üero,legar|3áis,isfacer|6s,sgustar|6mos,brazar|5,busar|3o,onvidar|6,tirizar|6n,eshacer|6s,lanchar|5áis,andonar|5áis,olocar|5,uspirar|6n,esolver|2uelvo,dvertir|2ierto,orrer|4s,xportar|6n,onjugar|5áis,dmirar|5n,rrachar|6mos,ecidir|4en,omprar|5,horrar|5,oñar|ueñan,xtender|2iende,postar|1uesto,atinar|5n,terizar|6,poyar|4s,anejar|4áis,ticipar|6mos,ariar|3áis,adrar|4s,egular|5n,bligar|5n,taminar|5o,xplotar|6n,ndicar|5s,lenar|3o,evorar|5,ulpar|4,onsumir|5en,eparar|5mos,sustar|5n,impiar|5n,uceder|5,uivocar|5áis,ublicar|6,endecir|3ices,ntender|2iendo,sponder|5éis,esear|4,elear|4n,iquecer|5éis,egociar|5o,nseguir|2igo,iseñar|4áis,rpretar|6s,contrar|5áis,liminar|6,visar|3o,laticar|6,bedecer|6n,olgar|uelgas,dornar|5mos,evistar|6n,ocinar|5n,acudir|4es,eñalar|4áis,sperar|5s,jercer|5s,nfluir|4ye,positar|6s,tilizar|5áis,aciar|2ío,rever|3én,enovar|2uevan,licitar|6s,edicar|5n,ezclar|4áis,frecer|4éis,onducir|5es,nseñar|5s,quillar|5áis,enacer|5,cercar|5s,emer|2o,nformar|6mos,divinar|6s,reer|2éis,iolar|4,almar|4n,ralizar|5o,ratar|3o,onfesar|3ieso,ausar|4n,nvencer|6n,dificar|6,yudar|4,sminuir|5yen,urgir|2jo,redecir|6mos,hocar|4mos,ruñir|3e,equerir|3ieren,ntrolar|5o,nstruir|5ye,asticar|6n,ondenar|6s,uemar|3o,scoger|5s,eguntar|6,ganizar|6s,roponer|6s,uardar|5mos,legir|1ige,rrollar|6,revivir|5en,rillar|5mos,rseguir|2igues,ubir|2en,ntregar|5o,campar|4áis,omar|3mos,liviar|5n,onvenir|5ís,mplear|5s,nificar|6s,ehusar|2úsan,ombatir|5en,ompetir|3iten,bortar|5n,municar|6s,ibujar|4o,aludar|5s,aler|3,levar|4,preciar|6s,ijar|3n,nventar|5áis,esentar|6,evelar|5s,uscar|3áis,uponer|4go,ogar|uega,rohibir|5ís,rear|3mos,orregir|3iges,nservar|5o,omer|3,uidar|3o,mprimir|5en,tumbrar|6n,eriguar|6s,raducir|5es,alir|2ís,sconder|6,burrir|4o,ograr|3áis,siasmar|6s,lquilar|6mos,orir|uero,vejecer|6mos,oder|2éis,scansar|6,nhelar|5s,erdonar|6mos,ecordar|2uerdo,adurar|5n,oblar|4n,hismear|5o,anar|2áis,avar|2áis,astimar|6n,nfermar|6mos,ingir|3e,nversar|5áis,scubrir|5e,ntinuar|4úa,ritar|3o,ncionar|5áis,obrar|3áis,ricular|6mos,lmorzar|2uerzo,opiar|4mos,ablar|4,ecoger|5n,studiar|6n,mpartir|5o,alvar|4mos,arcar|4,ealizar|6n,añer|3mos,rreglar|5áis,ntentar|6mos,ucear|4n,oportar|6,fligir|4es,erder|ierden,ncantar|6,erminar|6mos,ruzar|4mos,echazar|5o,espirar|6s,umplir|5mos,ecibir|4o,galizar|5áis,epender|6s,quistar|5o,olestar|6s,nvocar|5mos,acticar|5o,riticar|6s,eredar|5mos,autizar|5o,btener|2ienen,xhibir|4es,ravesar|6mos,nstalar|6,menazar|6mos,referir|3iero,scuchar|6mos,bolizar|5o,plaudir|5en,talecer|6mos,gistrar|6mos,xplorar|5áis,omendar|2iendo,ancelar|6mos,aquecer|6,dorar|4s,cabar|4,lvidar|5s,argar|4,eciclar|6,egalar|5s,ultivar|5o,avegar|5n,vacuar|5n,umar|3n,sfrutar|6s,xpresar|6mos,elebrar|6,nsultar|6,estir|iste,cificar|6n,espetar|5áis,ensurar|5o,ecorar|4o,efender|2iendes,ugerir|2ieres,vilizar|6n,ncluir|4yes,harlar|5s,astigar|6mos,rovocar|6,educir|5mos,ascinar|6,horcar|5n,xponer|5n,oseguir|6mos,nsuciar|6,erecer|5n,arar|3n,resar|4n,ezar|2áis,etir|ites,añar|3,igir|2en,radecer|6mos,agradar|6,cender|1ienden,necer|3éis,parecer|4zco,firmar|5n,sitar|4,traer|3éis,agar|3n,probar|2uebo,mitir|3e,tuar|3mos,plicar|4o,anzar|3o,ojar|3n,volver|1uelves,mentar|5,mostrar|1uestran,cortar|5s,brir|2o,testar|5n,acar|3mos,adir|2e,ajar|3,scar|3s,grar|3,antar|4n,rificar|6n,tener|4mos,ciar|2áis,overse|3mos,terarse|4,uedarse|4s,ncearse|4s,ecarse|3s,reverse|4s,pararse|3o,lamarse|3o,udarse|2áis,actarse|4n,allarse|4,ullirse|3e,uejarse|4s,tarse|1o,omit|4amos",exceptions:"dejar|4s,beber|4,yacer|3éis,oponer|5,ir|vas,ser|1on,odiar|4s,andar|4s,mandar|4o,negar|1iego,introducir|8ís,regir|1igen,usar|3n,constituir|9mos,aprender|7,votar|3áis,cansar|5n,parecer|6n,crecer|4éis,cerrar|1ierran,costar|1uestas,unir|2o,llorar|5mos,extinguir|6o,meter|3éis,errar|3áis,acordar|2uerda,reservar|6áis,hacer|4mos,servir|1irven,permanecer|9,criar|2ía,vivir|3e,teñir|1iño,cenar|4n,pagar|3o,amar|3s,medir|1ido,tocar|3áis,jugar|2ega,saltar|4áis,sentar|1iento,oír|1yes,volar|1uelan,casar|4n,herir|4mos,comprender|8éis,formar|5n,entrar|5,montar|4áis,calentar|7mos,abordar|6,notar|4,consistir|7ís,pesar|4mos,faltar|5mos,convertir|4iertes,huir|2yo,firmar|5s,venir|4mos,bajar|4n,nadar|3áis,oler|hueles,aspirar|5o,nacer|2zco,describir|7ís,leer|3n,jurar|4,coser|4mos,asistir|5en,tener|3go,matar|4s,bañar|4n,lanzar|5s,alentar|2ientan,coger|4,sustituir|7yes,evitar|5,vender|5,picar|4n,peinar|5s,curar|4s,echar|4n,tirar|3o,arrepentirse|5iento,pasar|4s,poner|3go,pedir|4mos,dudar|4n,cesar|3áis,caber|3éis,caminar|6n,durar|3o,sorprender|9n,tardar|5,distinguir|8es,preservar|8s,luchar|4o,sentirse|1ientes,helar|4mos,toser|3o,insistir|7mos,freír|2íes,acostar|2uestan,bordar|5s,aplicar|6,apretar|3ietas,caer|3mos,batir|4mos,seguir|4ís,clarificar|8o,dar|2n,guiar|3áis,duchar|5,sonar|1uena,escribir|6e,regar|1iegan,robar|4s,mentir|1iente,invertir|3ierte,actuar|3úo,mirar|4s,distribuir|8yo,decir|3ís,atender|2ienden,saber|4,reír|1ío,vencer|5s,purificar|8s,deber|4n,cazar|4s,padecer|5éis,ofender|6n,conocer|6s,untar|3o,borrar|5s,estimar|6,contar|1uento,estar|3áis,reinar|4o,soler|4mos,producir|6es,reñir|1iñes,hervir|1iervo,besar|3o,pegar|4,gustar|5,reconocer|8mos,ver|2s,contribuir|8yes,inducir|5e,juntarse|4o,temer|3o,rogar|1uega",rev:"sienten|1entir,on|er,squían|3iar,ierran|errar,irven|ervir,eciden|4ir,ueñan|oñar,uelan|olar,revén|3er,enuevan|2ovar,actan|4rse,sisten|4ir,minuyen|4ir,quieren|2erir,lientan|1entar,reviven|5ir,uben|2ir,ehúsan|2usar,ombaten|5ir,ompiten|3etir,cuestan|1ostar,ierden|erder,iegan|egar,btienen|2ener,plauden|5ir,igen|2ir,uestran|ostrar,men|1ir,ienden|ender,n|r,vestigo|6ar,omienzo|2enzar,ando|3ar,esiento|2entir,iego|egar,rotejo|4ger,consejo|6ar,ienso|ensar,mporto|5ar,uermo|ormir,xtingo|5uir,güero|1orar,buso|3ar,esuelvo|2olver,dvierto|2ertir,iño|eñir,puesto|1ostar,ago|2ar,reparo|5arse,lamo|3arse,ntiendo|2ender,egocio|5ar,onsigo|3eguir,viso|3ar,acío|2iar,rato|3ar,onfieso|3esar,urjo|2gir,uemo|3ar,ntrego|5ar,ibujo|4ar,feito|4arse,onservo|6ar,epiento|2entirse,uido|3ar,burro|4ir,uero|orir,ecuerdo|2ordar,ucho|3ar,hismeo|5ar,rito|3ar,oso|2er,lmuerzo|2orzar,omparto|6ir,ecibo|4ir,nquisto|6ar,refiero|3erir,omiendo|2endar,uento|ontar,ultivo|5ar,ecoro|4ar,iervo|ervir,úo|uar,pruebo|2obar,uyo|1ir,iro|2ar,bro|2ir,uro|2ar,zco|cer,no|1ar,ngo|1er,lo|1ar,co|1ar,zo|1ar,ovemos|3rse,espides|3edir,onfías|3iar,ufres|3ir,onreís|5r,uestas|ostar,uedas|4rse,ronceas|6rse,ecas|3rse,orres|4r,treves|5rse,endices|3ecir,uelgas|olgar,acudes|4ir,viertes|1ertir,udáis|2arse,mitamos|3,scoges|5r,ropones|6r,rsigues|2eguir,orriges|3egir,tingues|5ir,ientes|entirse,ríes|1eír,uejas|4rse,prietas|2etar,fliges|4ir,ependes|6r,xhibes|4ir,iñes|eñir,fiendes|1ender,ugieres|2erir,ites|etir,vuelves|1olver,duces|3ir,uyes|1ir,ces|2r,ís|ir,éis|er,áis|ar,as|1r,mos|r,pone|4r,arre|4r,uiere|1erer,ive|2ir,xtiende|2ender,ruñe|3ir,oge|3r,lige|1egir,ale|3r,ome|3r,ambulle|6irse,inge|3ir,escubre|6ir,scribe|5ir,iente|entir,iste|estir,nduce|4ir,be|2r,vierte|1ertir,uye|1ir,mite|3ir,ade|2ir,ce|2r,de|2r,ntera|5rse,ropieza|3ezar,erienda|2endar,obierna|2ernar,cuerda|1ordar,alla|4rse,ontinúa|5uar,uena|onar,ía|iar,a|1r"},thirdPlural:{rules:"bicar|3áis,abricar|6,ceptar|5s,nsentir|2ientes,eclarar|6mos,astar|4n,estigar|6,omponer|5go,omenzar|5áis,raduar|5mos,lorecer|4zco,ivertir|2ierto,esentir|6mos,eprimir|5o,roteger|6,sificar|6n,intar|4n,squiar|4áis,espedir|6mos,ontecer|6,otestar|6n,spertar|2ierto,ducar|4,estruir|5yen,onfiar|3ían,lonizar|5o,namorar|6n,ufrir|4mos,onsejar|6,lustrar|5áis,alcular|6,egatear|6n,ensar|iensa,omper|3éis,orcer|uerzo,onreír|5mos,epillar|6,eportar|5o,arrer|3o,epasar|4o,mportar|6,ablecer|6n,ormir|uerme,allar|3o,rindar|5s,nvitar|4áis,erendar|2iendo,ngañar|4o,urlar|4,nviar|2ío,xigir|3es,riunfar|5áis,uebrar|1iebra,uerer|4mos,nfadar|5s,sayunar|6mos,esultar|6s,gorar|4mos,legar|3o,isfacer|5éis,sgustar|5áis,brazar|4o,busar|3áis,onvidar|6mos,tirizar|6s,eshacer|6n,lanchar|6mos,andonar|6mos,olocar|5mos,uspirar|5áis,esolver|2uelve,dvertir|5ís,orrer|4n,xportar|6s,onjugar|6mos,dmirar|5mos,rrachar|5o,tenecer|6,ecidir|5mos,omprar|5mos,oñar|ueñas,xtender|2iendo,postar|1uesta,atinar|5s,terizar|6mos,poyar|4n,cesitar|5áis,anejar|5mos,ompañar|5áis,ticipar|5áis,ariar|2ías,lantar|4áis,adrar|3áis,taminar|6,xplotar|6s,ndicar|5mos,lenar|4,evorar|5mos,onsumir|6mos,eparar|4áis,sustar|5s,impiar|5mos,uceder|4éis,uivocar|6mos,ublicar|5o,ntender|5éis,sponder|6mos,esear|3o,egociar|6,nseguir|2igue,iseñar|5s,contrar|6mos,liminar|6mos,visar|3áis,laticar|5o,olgar|4mos,evistar|5áis,acudir|4o,eñalar|5,sperar|5mos,jercer|5n,nfluir|4yes,positar|6mos,tilizar|6s,legrar|5mos,aciar|2ía,rever|4mos,enovar|2uevas,licitar|5áis,edicar|4áis,frecer|3zco,onducir|4zco,nseñar|5,quillar|6s,cercar|5n,emer|2éis,divinar|6n,reer|3mos,iolar|3o,almar|4mos,ralizar|5áis,ratar|4,onfesar|3iesa,ausar|3o,nvencer|6,dificar|6mos,yudar|4mos,sminuir|5yes,urgir|3e,guantar|6s,hocar|3áis,ruñir|3o,vanzar|4áis,equerir|3ieres,ntrolar|6,nstruir|5ís,asticar|5o,ondenar|6n,uemar|4,scoger|3jo,ganizar|5áis,roponer|6n,uardar|5,legir|4mos,rrollar|6mos,revivir|5es,rillar|4áis,rseguir|2iguen,ubir|2es,ntregar|6mos,omar|3n,liviar|5mos,onvenir|3iene,nificar|6,nfirmar|6s,ehusar|2úsas,ombatir|5es,ompetir|6mos,bortar|5s,municar|6n,ibujar|4áis,aludar|5,levar|3o,ijar|2áis,nventar|6n,esentar|5o,uscar|4mos,uponer|5mos,ogar|3mos,rohibir|6mos,rear|2áis,orregir|3ige,nservar|6,omer|2o,uidar|4,mprimir|5es,tumbrar|6s,raducir|5e,alir|2e,sconder|5éis,lcanzar|6mos,ograr|4mos,siasmar|5o,vejecer|5éis,oder|ueden,scansar|5o,nhelar|5n,erdonar|5áis,ecordar|5áis,adurar|5s,oblar|3áis,hismear|6,anar|2o,avar|3mos,astimar|6s,ingir|2jo,nversar|6s,scubrir|5o,ntinuar|4úo,ritar|4,ncionar|6n,obrar|3o,lmorzar|5áis,opiar|3áis,ablar|3o,ecoger|4éis,studiar|5áis,mpartir|5ís,alvar|3áis,arcar|3áis,añer|3,rreglar|6mos,ntentar|5áis,ucear|4s,oportar|5áis,fligir|4en,erder|ierdes,ncantar|5áis,erminar|5áis,ruzar|3áis,echazar|6,ragar|4mos,espirar|6n,umplir|4o,ecibir|4ís,ñadir|3o,epender|5o,quistar|6,olestar|6n,irigir|5mos,nvocar|4áis,acticar|6,riticar|6n,eredar|4áis,autizar|6,nvadir|5mos,xhibir|4en,rabajar|5o,nstalar|5áis,menazar|5o,escar|4n,scuchar|6n,bolizar|6,plaudir|5ís,iajar|4mos,talecer|4zco,gistrar|6n,xplorar|6mos,omendar|6mos,isitar|5s,dorar|4n,cabar|4mos,lvidar|5n,argar|4s,egalar|5mos,ultivar|5áis,avegar|4áis,vacuar|5mos,umar|3mos,sfrutar|6n,elebrar|5o,nsultar|6mos,estir|isto,cificar|6mos,ensurar|6,ecorar|4áis,efender|2ienden,evantar|6s,ugerir|5mos,vilizar|5áis,nfiscar|5áis,ncluir|5mos,antener|5go,harlar|5n,tacar|4,rovocar|5o,educir|3zco,horcar|5s,xponer|5mos,oseguir|2igue,nsuciar|5o,erecer|3zco,prender|5o,ilar|2áis,pezar|4mos,etir|2ís,nir|1ís,rnar|2áis,migrar|4o,meter|4mos,cender|1iendes,parecer|6,orrar|3áis,ular|2áis,igar|2áis,lear|3mos,quecer|3zco,etar|3mos,sistir|5mos,probar|2ueba,cinar|4mos,mitir|3o,clar|3mos,nacer|3éis,plicar|5,untar|3áis,ojar|3s,volver|1uelven,ler|1éis,mentar|4o,mostrar|1uestras,aber|3mos,testar|4áis,alizar|5mos,par|2mos,decer|3éis,decir|1ice,elar|2áis,rmar|2áis,uar|1áis,esar|2áis,tener|3éis,ciar|3mos,rir|1ís,overse|2éis,terarse|3o,ncearse|4mos,ecarse|2áis,reverse|4n,untarse|4,pararse|3áis,lamarse|4mos,actarse|4s,allarse|4n,eitarse|3áis,ullirse|3es,uejarse|3áis,darse|2mos,omit|4áis",exceptions:"dejar|4n,beber|3o,yacer|4,oponer|4go,ir|vamos,ser|1oy,odiar|4mos,andar|4n,mandar|5mos,negar|1iega,introducir|9mos,regir|1iges,usar|3,constituir|8ís,votar|4mos,cansar|5mos,crecer|5mos,cerrar|1ierras,costar|1uestan,llorar|4o,extinguir|8mos,desagradar|8o,errar|4mos,acordar|2uerdo,reservar|7mos,hacer|4,servir|5mos,permanecer|7zco,criar|2ío,vivir|3o,teñir|1iñe,cenar|4mos,pagar|4,amar|2áis,medir|1ide,tocar|4mos,jugar|2ego,saltar|5,sentar|4áis,oír|2mos,volar|1uelas,casar|4s,atraer|5,apagar|5s,formar|4o,entrar|4o,montar|5mos,calentar|3ienta,abordar|5o,notar|3o,faltar|4áis,convertir|8mos,huir|2ye,bajar|3áis,nadar|4mos,oler|huelen,aspirar|6,traer|3igo,describir|7en,leer|2éis,jurar|3áis,coser|3éis,matar|4n,rezar|4n,bañar|4s,lanzar|5n,alentar|2ientas,agradar|6mos,coger|4mos,sustituir|7yen,evitar|4o,vender|4éis,picar|4s,peinar|5mos,curar|4n,echar|4s,tirar|3áis,arrepentirse|5iente,pasar|4mos,amanecer|7mos,poner|3éis,acortar|6mos,pedir|3ís,dudar|4s,cesar|4mos,caminar|6s,durar|4,sorprender|8éis,tardar|4o,distinguir|8en,preservar|7áis,luchar|5,sentirse|1ienten,toser|4,insistir|6es,freír|2íen,acostar|5áis,bordar|5n,aplicar|5o,apretar|3ietan,caer|2éis,verificar|7áis,batir|3ís,seguir|5mos,clarificar|9,dar|2s,guiar|4mos,duchar|4o,sonar|1ueno,escribir|6o,regar|1iegas,robar|4mos,sacar|4s,mentir|1iento,invertir|3ierto,mirar|4n,distribuir|8ye,atender|2iendes,reír|1íes,vencer|5n,purificar|8mos,deber|4s,cazar|4n,padecer|6mos,sacrificar|8áis,ofender|6s,glorificar|9mos,parar|4s,conocer|6n,estimar|5o,contar|1uenta,cortar|5n,estar|3oy,reinar|5,producir|6en,reñir|3ís,hervir|1ierven,besar|4mos,pegar|4mos,gustar|4o,reconocer|8s,aparecer|7mos,ver|2o,contribuir|8yen,inducir|6mos,prepararse|6áis,mudarse|4mos",rev:"ebo|2er,ntero|4arse,eprimo|5ir,spierto|2ertar,uerzo|orcer,eporto|5ar,arro|3er,eriendo|2endar,ngaño|4ar,sagrado|6ar,lego|3ar,cuerdo|1ordar,ivo|2ir,xtiendo|2ender,uego|1gar,eseo|3ar,oto|2ar,acudo|4ir,raigo|2er,ruño|3ir,scojo|3ger,vito|3ar,levo|3ar,omo|2er,ano|2ar,injo|2gir,escubro|6ir,ontinúo|5uar,ueno|onar,scribo|5ir,iento|entir,umplo|4ir,ñado|3ir,rabajo|5ar,isto|estir,usto|3ar,rovoco|5ar,nsucio|5ar,vierto|1ertir,ío|iar,cho|2ar,rdo|2ar,mito|3ir,duzco|2cir,ngo|1er,zo|1ar,endo|3er,so|1ar,lo|1ar,mo|1ar,ento|3ar,ico|2ar,ro|1ar,ezco|1cer,sientes|1entir,ovéis|2erse,ierras|errar,uedamos|4rse,nceamos|4rse,xiges|3ir,ecáis|2arse,ueñas|oñar,arías|2iar,uelas|olar,lamamos|4rse,enuevas|2ovar,actas|4rse,omitáis|4,quieres|2erir,lientas|1entar,revives|5ir,ubes|2ir,ehúsas|2usar,feitáis|4arse,mprimes|5ir,mbulles|5irse,uejáis|3arse,ierdes|erder,iegas|egar,íes|eír,ebes|3r,fendes|5r,conoces|6r,uestras|ostrar,uyes|1ir,tes|1ir,iendes|ender,ís|ir,éis|er,as|1r,áis|ar,mos|r,iega|egar,iensa|ensar,uiebra|1ebrar,unta|4rse,puesta|1ostar,alienta|2entar,acía|2iar,onfiesa|3esar,uenta|ontar,prueba|2obar,a|1r,rotege|6r,uerme|ormir,esuelve|2olver,iñe|eñir,ide|edir,trae|4r,urge|3ir,onviene|3enir,orrige|3egir,epiente|2entirse,raduce|5ir,ale|2ir,ose|3r,añe|3r,sigue|1eguir,uye|1ir,dice|1ecir,ce|2r,onfían|3iar,uestan|ostar,treven|5rse,rsiguen|2eguir,allan|4rse,ueden|oder,tinguen|5ir,ienten|entirse,ríen|1eír,prietan|2etar,fligen|4ir,roducen|5ir,ierven|ervir,fienden|1ender,iben|2ir,vuelven|1olver,uyen|1ir,n|r,stoy|2ar"}},pastTense:{first:{rules:"bicar|2qué,abricar|7on,apar|2ó,ceptar|5ste,nsentir|5í,eclarar|6ste,astar|4ste,omponer|3usiste,omenzar|6mos,raduar|6on,lorecer|5iste,ivertir|6mos,esentir|6ste,eprimir|6mos,roteger|5imos,sificar|6steis,intar|3ó,egresar|6mos,squiar|4ó,espedir|6steis,ontecer|5ieron,otestar|6mos,spertar|6steis,ducar|4steis,estruir|5í,onfiar|4ó,lonizar|6mos,namorar|6steis,ufrir|4ste,onsejar|6mos,lustrar|6ste,egatear|7on,ensar|4mos,omper|3í,ailar|4ste,orcer|3isteis,onreír|5steis,epillar|6mos,eportar|6mos,arrer|3imos,mpezar|6on,epasar|5ste,mportar|6ste,ablecer|5imos,ormir|3í,allar|5on,rindar|5mos,nvitar|4ó,erendar|6mos,urlar|4mos,obernar|6ste,xigir|4ste,riunfar|6mos,uebrar|5steis,uerer|1isimos,sayunar|5ó,rometer|5imos,gorar|3ó,legar|5on,isfacer|3icieron,sgustar|5ó,scender|5ió,busar|4steis,onvidar|7on,tirizar|5ó,eshacer|3iciste,lanchar|6steis,andonar|5ó,olocar|5steis,esolver|5ió,dvertir|5í,orrer|3í,xportar|7on,onjugar|5ó,retener|3uvo,dmirar|4ó,rrachar|6steis,tenecer|5imos,ecidir|4í,omprar|5ste,oñar|3ste,atinar|5mos,terizar|6steis,poyar|5on,cesitar|6steis,anejar|4é,ompañar|6steis,ticipar|6ste,lantar|5ste,adrar|5on,egular|6on,bligar|4ó,taminar|6mos,xplotar|5é,ndicar|5steis,lenar|4ste,evorar|5ste,ulpar|5on,onsumir|6ó,eparar|4ó,sustar|4é,impiar|4é,uceder|4iste,uivocar|4qué,ublicar|7on,endecir|3ijo,ntender|5ió,sponder|5isteis,esear|4steis,elear|3ó,iquecer|5ió,egociar|6steis,nseguir|6mos,iseñar|4é,contrar|7on,liminar|7on,visar|4mos,laticar|6steis,bedecer|5isteis,olgar|5on,dornar|4é,evistar|5é,ocinar|5steis,eñalar|5ste,sperar|5steis,jercer|4iste,nfluir|4í,positar|6ste,tilizar|5ó,ncender|5í,legrar|6on,aciar|3é,rever|3iste,ituar|4mos,enovar|4ó,licitar|5é,edicar|5ste,ezclar|4ó,frecer|4ió,onducir|4jo,nseñar|5steis,enacer|4isteis,nformar|6steis,divinar|6steis,reer|2yeron,iolar|4steis,almar|3ó,ralizar|7on,onfesar|7on,ausar|3ó,nvencer|5ieron,dificar|5ó,sminuir|6mos,urgir|4ste,redecir|3ijiste,guantar|6mos,hocar|4steis,ruñir|4steis,vanzar|5mos,equerir|6ste,ntrolar|7on,nstruir|6ste,asticar|7on,ondenar|5é,uemar|4mos,scoger|4í,eguntar|7on,ganizar|5ó,roponer|3use,fectuar|7on,uardar|5ste,legir|1igieron,rrollar|6steis,revivir|6ó,rseguir|2iguió,ubir|3mos,ntregar|6steis,campar|4é,omar|2ó,onvenir|3ino,mplear|5steis,nificar|4qué,nfirmar|6mos,ehusar|4ó,ombatir|5í,rrojar|5ste,ompetir|5í,bortar|4é,municar|4qué,ibujar|5mos,evolver|5imos,eplicar|4qué,aler|2iste,levar|4ste,preciar|5é,ijar|3ste,nojar|4steis,nventar|5ó,evelar|5mos,uscar|2qué,uponer|2uso,ogar|2ó,rohibir|6steis,rear|3steis,nservar|7on,uidar|4mos,mprimir|5í,tumbrar|5é,eriguar|6steis,raducir|4jo,sociar|6on,alir|3steis,sconder|5imos,lcanzar|7on,burrir|5mos,ograr|3é,siasmar|5é,lquilar|7on,orir|2í,vejecer|5imos,oder|ude,scansar|6steis,erdonar|6steis,ecordar|5é,ontener|3uvimos,adurar|4ó,etestar|6steis,oblar|4mos,hismear|7on,anar|3ste,avar|3ste,astimar|5é,nfermar|6ste,ingir|4ó,nversar|7on,ntinuar|7on,ritar|4ste,ncionar|6ste,obrar|4ste,lmorzar|4cé,opiar|4steis,ablar|4steis,studiar|5é,mpartir|6eron,alvar|3é,ealizar|5ó,añer|4on,rreglar|6ste,ucear|4mos,oportar|6ste,fligir|5mos,erder|3ió,ncantar|5ó,erminar|6ste,ruzar|3ó,niciar|5ste,echazar|7on,umplir|5ste,ecibir|5eron,galizar|6steis,epender|5í,quistar|6mos,olestar|6ste,irigir|5eron,acticar|4qué,riticar|7on,eredar|5steis,autizar|7on,btener|2uve,ntestar|5é,xhibir|5mos,ravesar|7on,nstalar|6mos,escar|4mos,referir|3irieron,scuchar|5ó,bolizar|7on,talecer|5ieron,gistrar|5é,xplorar|5ó,omendar|6steis,vorciar|6steis,ancelar|6ste,isitar|5mos,aquecer|5iste,dorar|3ó,cabar|4ste,lvidar|5steis,argar|4mos,eciclar|5é,egalar|4é,ultivar|6steis,avegar|6on,vacuar|5ste,umar|2é,sfrutar|7on,elebrar|6ste,estir|4ste,cificar|6ste,ensurar|5ó,ecorar|5mos,efender|5ieron,evantar|7on,ugerir|2irió,vilizar|6mos,nfiscar|7on,ncluir|4yó,antener|3uvieron,harlar|6on,amentar|6mos,tacar|4steis,educir|3jiste,ascinar|7on,horcar|6on,xponer|2use,oseguir|6ste,nsuciar|7on,erecer|4ió,eber|2ió,stigar|6on,cular|4ste,etir|3mos,ezar|2ó,añar|3ste,viar|3ste,migrar|5mos,sultar|4ó,spirar|6on,manecer|5ieron,riar|3mos,tender|4isteis,ostar|4ste,firmar|4é,agar|3steis,bordar|4ó,probar|6on,udir|3ó,mitir|4ó,illar|3ó,rcar|3steis,mer|1imos,plicar|5mos,atar|3mos,udar|3ste,mostrar|7on,regir|4mos,helar|4steis,cubrir|5ó,coger|3ió,tribuir|6steis,adir|3ó,vocar|4ste,ajar|3ste,resar|4ste,adar|4on,azar|3steis,rrar|3steis,etar|3steis,entar|4ste,terarse|5on,uedarse|5on,ncearse|4ste,ecarse|3ste,untarse|5on,pararse|4steis,lamarse|4steis,udarse|3ste,actarse|4mos,allarse|4mos,eitarse|4steis,ullirse|3eron,uejarse|4steis,verse|1iste,entirse|4ste,omit|4é",exceptions:"dejar|4steis,renunciar|9on,yacer|3imos,oponer|2usiste,ir|fueron,odiar|3ó,andar|3uviste,mandar|4ó,negar|4steis,introducir|7jimos,usar|3steis,constituir|8yó,aprender|6ió,votar|5on,cansar|4ó,parecer|5iste,crecer|4imos,cerrar|4ó,costar|4é,unir|3ste,llorar|5ste,extinguir|8eron,desagradecer|10ieron,meter|3ieron,acordar|6mos,reservar|7ste,hacer|1icisteis,servir|5steis,desaparecer|9isteis,vivir|4ste,teñir|4ste,cenar|4steis,pagar|5on,amar|3mos,medir|4mos,tocar|2qué,jugar|4mos,saltar|5ste,oír|1yeron,volar|4ste,casar|4steis,atraer|4je,herir|1irieron,comprender|8ieron,formar|5mos,entrar|5ste,montar|6on,calentar|6ó,notar|4ste,consistir|8ste,pesar|4steis,faltar|4é,convertir|4irtieron,huir|2yeron,venir|1inisteis,bajar|3é,oler|2isteis,aspirar|6ste,nacer|3ió,traer|3jiste,describir|8steis,leer|2ímos,jurar|4steis,coser|3í,asistir|6eron,tener|1uvisteis,lanzar|5ste,agradar|6ste,sustituir|7yeron,evitar|5ste,vender|4ió,picar|2qué,peinar|5steis,curar|5on,echar|4ste,tirar|4ste,pasar|3é,poner|1usisteis,acortar|5ó,pedir|1idió,dudar|4mos,cesar|4ste,caber|1upisteis,caminar|5é,durar|5on,sorprender|8iste,tardar|5mos,distinguir|9mos,preservar|8mos,luchar|5steis,toser|3isteis,insistir|7ó,freír|4mos,caer|2íste,verificar|6qué,batir|4ste,detener|3uvisteis,seguir|4í,clarificar|9mos,dar|1iste,guiar|3o,duchar|6on,sonar|4mos,escribir|7mos,regar|3ué,robar|4ste,sacar|3ó,mentir|1intió,invertir|7mos,actuar|5ste,mirar|5on,volver|4ieron,decir|1ijeron,saber|1upiste,reír|3ste,vencer|4isteis,agradecer|7iste,purificar|9on,padecer|5í,sacrificar|9ste,ofender|5imos,glorificar|8ó,parar|4steis,conocer|5iste,abrir|4ste,untar|4steis,estimar|6steis,contar|5mos,cortar|5mos,estar|3uvimos,reinar|5ste,soler|3ieron,anunciar|6ó,producir|5jiste,reñir|1iñó,hervir|1irvió,besar|3é,pegar|4steis,gustar|6on,reconocer|7ió,aparecer|6ió,ver|1ieron,inducir|4jeron,atreverse|5iste,extender|6isteis,juntarse|6on,prepararse|7steis,llamarse|5steis,responder|7isteis,prever|4iste,mudarse|4ste,elegir|2igieron,afeitarse|6steis,arrepentirse|9ste,contener|4uvimos,sentirse|5ste,quejarse|5steis,compartir|8eron,atender|5isteis,dirigir|6eron",rev:"oviste|2erse,duviste|1ar,nceaste|4rse,ecaste|3rse,hiciste|1acer,traje|3er,rajiste|2er,dijiste|1ecir,aliste|2er,ude|oder,aíste|1er,upiste|aber,btuve|2ener,pusiste|1oner,diste|1er,puse|1oner,dujiste|2cir,ciste|1er,ste|r,teraron|5se,uedaron|5se,guieron|3r,icieron|acer,stieron|3r,reyeron|2er,ulleron|3irse,ibieron|3r,ijeron|ecir,uvieron|ener,dujeron|2cir,irieron|erir,uyeron|1ir,ieron|er,ron|1,dujimos|2cir,tegimos|3er,arrimos|3er,uisimos|1erer,metimos|3er,actamos|4rse,emimos|2er,allamos|4rse,olvimos|3er,omimos|2er,ndimos|2er,cimos|1er,cisteis|1er,mos|r,steis|r,ompí|3er,orrí|3er,osí|2er,scogí|4er,adecí|4er,endí|3er,í|ir,esolvió|5er,onsumió|6r,ació|2er,revivió|6r,rsiguió|2eguir,idió|edir,ingió|4r,erdió|3er,intió|entir,iñó|eñir,irvió|ervir,ugirió|2erir,conoció|5er,ebió|2er,uyó|1ir,udió|3r,cubrió|5r,cogió|3er,adió|3r,tió|2r,endió|3er,eció|2er,ó|ar,tretuvo|4ener,endijo|3ecir,onvino|3enir,upuso|2oner,uio|2ar,dujo|2cir,omité|4,lmorcé|4zar,egué|2ar,qué|car,é|ar"},second:{rules:"bicar|3ó,abricar|4qué,apar|2é,ceptar|5steis,eclarar|7on,astar|5on,omponer|3uso,omenzar|6steis,raduar|4ó,lorecer|5imos,ivertir|2irtieron,esentir|6steis,eprimir|6steis,roteger|5iste,sificar|4qué,intar|3é,egresar|6steis,squiar|4é,espedir|6ste,ontecer|5í,spertar|7on,ducar|5on,estruir|5yeron,onfiar|4é,lonizar|4cé,namorar|6mos,ufrir|3í,lustrar|5é,alcular|6mos,egatear|6mos,ensar|4steis,omper|3isteis,ailar|5on,orcer|3iste,onreír|5ste,epillar|6steis,eportar|6ste,arrer|3isteis,mpezar|3cé,epasar|5mos,mportar|6steis,ablecer|5iste,ormir|4steis,erretir|5í,allar|4steis,ropezar|6steis,rindar|5steis,nvitar|6on,ngañar|5steis,urlar|3ó,obernar|6mos,riunfar|6steis,nmigrar|6steis,uebrar|4ó,uerer|1isieron,nfadar|5steis,sayunar|5é,rometer|5í,gorar|3é,legar|4ste,isfacer|3izo,sgustar|5é,brazar|5mos,scender|5í,busar|4mos,tirizar|6mos,eshacer|3icimos,lanchar|5é,andonar|5é,olocar|3qué,dvertir|6steis,orrer|3ió,xportar|6steis,onjugar|6steis,retener|3uve,dmirar|4é,rrachar|7on,tenecer|5ió,ecidir|5ó,omprar|5steis,horrar|5mos,oñar|3steis,xtender|5iste,postar|5steis,atinar|6on,terizar|7on,poyar|4mos,cesitar|6ste,anejar|4ó,ompañar|6ste,ticipar|5é,ariar|3é,lantar|6on,adrar|3é,egular|4ó,taminar|6steis,xplotar|5ó,lenar|5on,evorar|4ó,ulpar|4ste,onsumir|6ste,eparar|4é,sustar|4ó,impiar|4ó,uceder|4imos,uivocar|6ste,ublicar|6mos,endecir|3ije,sponder|5ió,esear|4ste,elear|3é,egociar|6ste,nseguir|6steis,iseñar|4ó,contrar|6ste,liminar|6ste,visar|4ste,laticar|4qué,bedecer|5imos,olgar|4steis,dornar|4ó,evistar|5ó,ocinar|4é,acudir|5eron,sperar|4ó,jercer|4í,nfluir|4yeron,tilizar|6mos,ncender|5iste,legrar|5steis,aciar|4mos,rever|3í,dmitir|5ste,ituar|3ó,enovar|5steis,licitar|5ó,ezclar|4é,frecer|4imos,onducir|4je,nseñar|5ste,cercar|3qué,emer|2ió,nformar|5é,divinar|6mos,reer|2í,iolar|5on,almar|3é,ralizar|6mos,xplicar|6ste,ratar|4ste,onfesar|6steis,ausar|3é,nvencer|5ió,dificar|7on,yudar|3ó,sminuir|5yó,urgir|4eron,redecir|3ijisteis,guantar|6steis,hocar|2qué,ruñir|3ó,vanzar|3cé,equerir|6mos,nstruir|6mos,asticar|6mos,ondenar|6mos,uemar|4steis,scoger|4ieron,eguntar|6ste,ganizar|6ste,roponer|3usieron,fectuar|6steis,uardar|4é,revivir|6steis,rseguir|6ste,ubir|3ó,ntregar|7on,campar|4ó,omar|2é,onvenir|3ine,mplear|6on,nificar|6mos,nfirmar|7on,ehusar|5ste,ombatir|6ó,rrojar|4é,bortar|4ó,municar|6ste,ibujar|4ó,aludar|5mos,aler|2imos,levar|4mos,umentar|5é,preciar|5ó,ijar|2ó,nojar|4ste,nventar|5é,uscar|4steis,uponer|2use,ogar|3steis,rohibir|6ste,rear|3ste,nservar|6mos,omer|2ieron,mprimir|6ste,tumbrar|5ó,eriguar|4üé,raducir|4je,sociar|5steis,alir|3ste,sconder|5í,lcanzar|6ste,burrir|5ste,ograr|3ó,siasmar|6ste,lquilar|5ó,ermitir|5í,orir|3ste,vejecer|5ió,oder|udo,scansar|7on,erdonar|7on,etestar|6ste,oblar|3é,hismear|6mos,anar|3steis,avar|3steis,astimar|5ó,nfermar|6steis,ingir|4eron,nversar|5é,ntinuar|6mos,ritar|5on,ncionar|5é,obrar|4mos,ricular|6steis,lmorzar|7on,opiar|5on,ablar|4mos,ecoger|4iste,studiar|5ó,mpartir|6ste,alvar|3ó,arcar|4ste,ealizar|6ste,añer|2isteis,rreglar|5é,ntentar|5ó,ucear|5on,oportar|6mos,fligir|5eron,erder|3imos,ncantar|5é,erminar|5ó,ruzar|4steis,niciar|5steis,echazar|4cé,ragar|5on,espirar|6steis,umplir|5ó,ecibir|5ste,ñadir|4mos,galizar|4cé,epender|5imos,quistar|6steis,olestar|6mos,nvocar|5steis,acticar|7on,riticar|6ste,eredar|4é,autizar|4cé,nvadir|4í,btener|2uvo,xhibir|5ó,ravesar|6ste,rabajar|6mos,nstalar|6steis,menazar|7on,escar|4ste,referir|6mos,scuchar|5é,bolizar|6ste,teresar|5é,plaudir|6mos,iajar|3ó,talecer|5í,gistrar|5ó,xplorar|6steis,vorciar|7on,dorar|3é,cabar|4steis,lvidar|4ó,argar|3ué,eciclar|7on,ultivar|6mos,avegar|4ó,vacuar|4é,umar|2ó,sfrutar|5ó,xpresar|5ó,elebrar|7on,estir|3í,cificar|4qué,espetar|7on,ecorar|5ste,efender|5imos,evantar|5ó,ugerir|5steis,vilizar|6steis,nfiscar|6mos,ncluir|4í,harlar|5mos,amentar|6steis,astigar|6ste,rovocar|4qué,educir|3jisteis,ascinar|6steis,horcar|5steis,xponer|2uso,oseguir|6steis,nsuciar|6ste,erecer|4iste,ejar|2é,entir|4ste,igar|3mos,testar|4ó,endar|5on,viar|3steis,igir|3ó,tinguir|6ó,sultar|4é,idar|3ste,spirar|5mos,olver|3iste,cordar|4ó,eñir|3mos,firmar|4ó,olar|3steis,asar|2ó,pagar|4ste,dicar|3ó,tender|4imos,quecer|4ieron,pretar|5ste,probar|5ste,alar|4on,sitar|3ó,nacer|3imos,egir|2í,petir|1itieron,plicar|5steis,sentar|5mos,ntener|2uvisteis,cubrir|5mos,costar|5mos,acar|3ste,tribuir|5yeron,urar|3mos,llar|2é,elar|2ó,overse|2í,terarse|4steis,ncearse|3é,ecarse|1qué,reverse|3ió,pararse|4mos,lamarse|5on,actarse|3é,allarse|3é,ullirse|3ó,uejarse|4mos,darse|1ó,tarse|2mos,omit|4ó",exceptions:"beber|3iste,renunciar|7é,yacer|3í,oponer|2usimos,ir|fuimos,odiar|3é,andar|3uvimos,mandar|4é,negar|3ó,introducir|7jiste,regir|4ste,usar|3mos,constituir|8yeron,aprender|6isteis,votar|4ste,cansar|4é,parecer|5ió,crecer|4í,cerrar|4é,unir|3mos,llorar|4é,desagradecer|10ió,desagradar|9mos,meter|3iste,errar|4ste,reservar|6ó,hacer|1izo,servir|5ste,permanecer|8iste,mostrar|6ste,desaparecer|9ieron,criar|4steis,vivir|4eron,cenar|3ó,amar|2é,medir|1idieron,tocar|4ste,jugar|4ste,saltar|5steis,oír|2,atraer|4jo,herir|4steis,comprender|8imos,formar|5steis,entrar|5steis,montar|4é,calentar|6é,abordar|6ste,notar|4steis,consistir|8eron,pesar|3ó,faltar|4ó,convertir|7í,huir|3ste,venir|1iniste,bajar|4ste,nadar|3é,oler|2ieron,traer|3jeron,describir|8mos,leer|2yó,coser|3iste,asistir|6ste,tener|1uviste,matar|4steis,rezar|4ste,bañar|5on,lanzar|5mos,alentar|6steis,agradar|7on,coger|3í,sustituir|7yó,evitar|5mos,vender|4ieron,picar|4mos,peinar|4é,curar|3ó,echar|4steis,tirar|4steis,demostrar|8steis,arrepentirse|9steis,amanecer|6í,poner|1usimos,acortar|5é,pedir|4steis,dudar|4steis,cesar|3é,caber|1upiste,caminar|5ó,durar|4ste,sorprender|8í,tardar|5steis,preservar|8ste,luchar|5mos,sentirse|4í,helar|4ste,toser|3ió,insistir|6í,freír|2ieron,bordar|4é,caer|2ímos,verificar|8ste,batir|3í,detener|3uvimos,seguir|1iguieron,clarificar|9ste,dar|1imos,guiar|3e,duchar|5steis,sonar|5on,escribir|7ó,regar|4mos,robar|3ó,invertir|7steis,actuar|6on,mirar|4steis,volver|4isteis,decir|1ijiste,saber|1upisteis,reír|3steis,vencer|4iste,agradecer|7ieron,purificar|7ó,deber|3imos,cazar|2cé,padecer|5iste,sacrificar|7qué,ofender|5ieron,glorificar|10on,parar|4ste,conocer|5í,abrir|4steis,untar|4mos,borrar|4ó,estimar|7on,contar|6on,cortar|5steis,estar|3uviste,reinar|5steis,soler|3í,anunciar|8on,producir|5jisteis,hervir|5mos,besar|3ó,pegar|3ué,gustar|5ste,reconocer|7isteis,aparecer|6í,emigrar|7on,ver|1i,inducir|4jiste,divertir|3irtieron,enterarse|6steis,romper|4isteis,barrer|4isteis,juntarse|5mos,mudarse|3ó,predecir|4ijisteis,contener|4uvisteis,mantener|4uvisteis",rev:"ebiste|2er,tegiste|3er,etiste|2er,tretuve|4ener,endije|3ecir,iniste|enir,osiste|2er,onvine|3enir,upuse|2oner,upiste|aber,cogiste|3er,uie|2ar,ijiste|ecir,dujiste|2cir,olviste|3er,endiste|3er,duje|2cir,ciste|1er,ste|r,oví|2erse,ufrí|3ir,erretí|5ir,onvertí|6ir,ermití|5ir,entí|3irse,atí|2ir,nvadí|4ir,ncluí|4ir,egí|2ir,stí|2ir,í|er,duvimos|1ar,hicimos|1acer,paramos|4rse,cedimos|3er,alimos|2er,eitamos|4rse,uejamos|4rse,aímos|1er,tuvimos|1ener,ñisteis|1er,erdimos|3er,ebimos|2er,cisteis|1er,pusimos|1oner,jisteis|cir,cimos|1er,endimos|3er,mos|r,steis|r,areció|4er,uedó|3arse,radeció|5er,orrió|3er,teneció|5er,ecidió|5r,trevió|4erse,spondió|5er,eyó|1er,emió|2er,nvenció|5er,omitó|4,ruñó|3ir,ombatió|6r,vejeció|5er,ambulló|6irse,osió|2er,umplió|5r,igió|3r,tinguió|6r,uyó|1ir,bió|2r,ó|ar,ronceé|5arse,equé|1carse,acté|3arse,allé|3arse,verigüé|5uar,gué|1ar,cé|zar,qué|car,é|ar,isieron|erer,ivieron|3r,idieron|edir,lamaron|5se,stieron|3r,udieron|3r,lieron|1er,rajeron|2er,ogieron|2er,usieron|oner,omieron|2er,rieron|1eír,ndieron|2er,itieron|etir,gieron|2r,ecieron|2er,uyeron|1ir,aron|2,trajo|3er,udo|oder,btuvo|2ener,puso|1oner,izo|acer,i|er"},third:{rules:"bicar|4ste,abricar|6steis,apar|4on,ceptar|4ó,nsentir|2intió,eclarar|5é,astar|4steis,estigar|5ué,omponer|3use,omenzar|4cé,raduar|4é,lorecer|5í,ivertir|2irtió,eprimir|6eron,roteger|5ió,sificar|7on,intar|5on,egresar|6ste,squiar|5mos,espedir|3idió,ontecer|5iste,otestar|5é,spertar|6mos,ducar|4ste,estruir|6mos,onfiar|5steis,lonizar|7on,namorar|5é,ufrir|4mos,onsejar|5ó,lustrar|5ó,egatear|6steis,ensar|3é,omper|3iste,orcer|3í,onreír|3ió,epillar|7on,eportar|5ó,arrer|3í,mpezar|5steis,epasar|6on,mportar|6mos,ablecer|5ió,ormir|4mos,allar|4mos,ropezar|4cé,rindar|4é,nvitar|4é,erendar|6steis,ngañar|6on,urlar|4steis,obernar|7on,xigir|4mos,riunfar|5ó,nmigrar|5ó,uebrar|6on,uerer|1isisteis,nfadar|4é,sayunar|6steis,esultar|6mos,rometer|5ió,gorar|4ste,legar|3ó,isfacer|3iciste,sgustar|6ste,brazar|6on,scender|5ieron,busar|4ste,onvidar|5ó,tirizar|7on,eshacer|3icisteis,lanchar|5ó,andonar|7on,olocar|6on,uspirar|6ste,esolver|5imos,dvertir|2irtieron,orrer|3iste,xportar|6mos,onjugar|6ste,retener|3uvimos,dmirar|5steis,rrachar|6ste,tenecer|5ieron,ecidir|5ste,omprar|6on,horrar|6on,xtender|5í,atinar|5steis,terizar|4cé,poyar|3ó,cesitar|5ó,anejar|5ste,ticipar|5ó,ariar|3ó,lantar|4ó,adrar|4steis,egular|5ste,bligar|5steis,ndicar|3qué,lenar|4mos,evorar|4é,ulpar|3é,onsumir|6steis,sustar|5mos,impiar|6on,uceder|4ió,uivocar|5ó,ublicar|5ó,endecir|3ijisteis,ntender|5isteis,sponder|5í,esear|4mos,elear|5on,iquecer|5isteis,egociar|7on,nseguir|2iguió,contrar|5ó,liminar|5é,visar|4steis,laticar|7on,bedecer|5ió,olgar|3ó,dornar|5steis,ocinar|4ó,acudir|4í,eñalar|5steis,sperar|4é,jercer|4imos,tilizar|4cé,ncender|5ió,legrar|4é,aciar|4steis,rever|3ieron,dmitir|5steis,ituar|3é,enovar|5ste,licitar|7on,edicar|5mos,frecer|4ieron,onducir|4jeron,quillar|6ste,enacer|4ieron,emer|2isteis,nformar|5ó,divinar|5ó,reer|2yó,almar|4steis,ralizar|6steis,ratar|4steis,onfesar|6mos,ausar|4steis,nvencer|5isteis,dificar|6ste,sminuir|6steis,urgir|4mos,redecir|3ije,guantar|6ste,hocar|3ó,ruñir|4ste,vanzar|5ste,equerir|3irieron,nstruir|5í,asticar|4qué,ondenar|6ste,uemar|5on,eguntar|6steis,ganizar|6mos,roponer|3usimos,fectuar|6ste,uardar|4ó,legir|4steis,rrollar|5ó,rillar|5steis,rseguir|6steis,ntregar|5ué,campar|5steis,omar|3mos,onvenir|3iniste,mplear|4é,nificar|7on,ehusar|4é,ombatir|6eron,bortar|5steis,municar|6mos,ibujar|4é,evolver|5ió,eplicar|7on,aler|2í,levar|4steis,umentar|5ó,preciar|6ste,ijar|2é,nventar|6mos,esentar|5é,uscar|4ste,uponer|2usieron,ogar|3ste,rohibir|5í,rear|2ó,orregir|6ste,nservar|6ste,omer|2iste,uidar|4steis,mprimir|6steis,tumbrar|6steis,eriguar|6mos,raducir|4jiste,sociar|5ste,alir|3mos,sconder|5iste,lcanzar|5ó,burrir|4í,ograr|4mos,siasmar|6mos,ermitir|6ste,orir|3mos,vejecer|5isteis,oder|udieron,erdonar|6ste,ecordar|6mos,ontener|3uviste,adurar|6on,etestar|5ó,oblar|3ó,hismear|6ste,anar|3mos,avar|2é,astimar|7on,nfermar|5ó,ingir|4steis,nversar|5ó,scubrir|6steis,ntinuar|6steis,ritar|4steis,ncionar|5ó,obrar|4steis,lmorzar|6mos,opiar|3é,ablar|5on,studiar|6mos,mpartir|6steis,alvar|4mos,ealizar|7on,añer|2iste,rreglar|6steis,ntentar|5é,ucear|3é,oportar|6steis,erder|3ieron,ncantar|7on,erminar|5é,ruzar|4ste,niciar|6on,echazar|6steis,ragar|3ó,espirar|5ó,umplir|4í,ecibir|5mos,ñadir|4steis,galizar|5ó,epender|5ió,olestar|5ó,nvocar|5mos,acticar|6steis,riticar|4qué,eredar|4ó,autizar|6ste,nvadir|5ste,epetir|4í,btener|2uvimos,ntestar|6mos,ravesar|6mos,rabajar|7on,nstalar|7on,menazar|5ó,scuchar|6mos,bolizar|4cé,teresar|5ó,plaudir|6ste,iajar|3é,talecer|5iste,gistrar|6ste,xplorar|5é,omendar|6ste,vorciar|5ó,aquecer|5imos,dorar|5on,cabar|3é,lvidar|4é,argar|3ó,egalar|4ó,ultivar|5é,avegar|5mos,vacuar|4ó,umar|3ste,sfrutar|5é,xpresar|5é,elebrar|6mos,nsultar|6ste,estir|istieron,cificar|5ó,ensurar|5é,ecorar|4ó,efender|5ió,evantar|5é,vilizar|6ste,antener|3uvimos,harlar|5ste,amentar|6ste,astigar|5ó,tacar|2qué,rovocar|6steis,educir|3jeron,ascinar|6ste,horcar|4ó,xponer|2usiste,oseguir|5í,nsuciar|6mos,erecer|4imos,entir|intieron,cular|3ó,ilar|2é,etir|3ste,viar|4on,radecer|5í,agradar|6steis,eservar|5é,ostar|5on,firmar|5ste,altar|5on,aminar|5ste,otar|4on,pagar|4mos,parar|5on,etar|2é,sistir|5steis,istar|4ste,luir|3ste,sitar|3é,clar|3steis,rcar|3mos,olar|3mos,plicar|3qué,udar|2é,coger|3imos,vivir|4mos,ojar|3mos,mostrar|6mos,cansar|5mos,aber|upimos,uchar|4ste,igir|2í,scar|2ó,parecer|5isteis,erir|3ste,elar|2é,ñar|2mos,bir|2eron,overse|2ieron,terarse|4ste,ncearse|3ó,ecarse|2ó,reverse|3imos,untarse|4steis,pararse|5on,lamarse|3ó,allarse|3ó,ullirse|4mos,uejarse|5on,darse|1é,tarse|1ó,entirse|intieron,omit|4asteis",exceptions:"dejar|4mos,beber|3imos,renunciar|8steis,yacer|3ió,oponer|2uso,ir|fue,odiar|5on,andar|3uve,mandar|5steis,negar|5on,introducir|7jeron,regir|1igió,usar|4on,constituir|9ste,aprender|6iste,votar|3ó,crecer|4iste,cerrar|5steis,costar|4ó,unir|3steis,llorar|4ó,extinguir|8ste,meter|3í,errar|5on,acordar|6steis,hacer|1iciste,servir|1irvió,permanecer|8í,desaparecer|9iste,criar|3o,teñir|1iñeron,cenar|3é,amar|2ó,medir|4steis,tocar|4steis,jugar|3ó,sentar|5steis,oír|1yó,volar|3é,casar|3é,atraer|4jiste,comprender|8ió,formar|5ste,entrar|5mos,montar|5mos,calentar|7ste,abordar|7on,pesar|3é,aprobar|6mos,convertir|8ste,huir|2í,firmar|5mos,venir|1inimos,bajar|4steis,nadar|3ó,oler|2ió,aspirar|7on,nacer|3í,traer|3jimos,leer|2yeron,jurar|3ó,coser|3isteis,tener|1uvo,matar|4ste,rezar|4mos,bañar|4steis,lanzar|6on,alentar|7on,coger|3iste,sustituir|8mos,evitar|5steis,vender|4isteis,picar|5on,peinar|4ó,curar|3é,echar|4mos,tirar|5on,pasar|4steis,amanecer|6imos,poner|1usiste,acortar|6ste,pedir|3í,dudar|5on,cesar|4steis,cubrir|5eron,durar|4mos,sorprender|8ieron,tardar|6on,distinguir|8í,helar|5on,toser|3iste,insistir|7mos,freír|4ste,bordar|5mos,apretar|7on,caer|2ísteis,verificar|8mos,batir|4mos,detener|3uvieron,seguir|5steis,clarificar|10on,dar|1i,guiar|4steis,sonar|4steis,regar|5on,robar|4steis,sacar|4steis,invertir|3irtió,actuar|5mos,mirar|4ste,distribuir|9ste,volver|4í,decir|1ijo,atender|5ió,reír|3,vencer|4ió,purificar|8ste,deber|3isteis,cazar|4mos,padecer|5ieron,sacrificar|9mos,ofender|5í,glorificar|9steis,conocer|5ió,abrir|4mos,untar|4ste,borrar|4é,estimar|6mos,contar|5steis,cortar|6on,probar|4é,estar|3uvisteis,reinar|5mos,soler|3imos,anunciar|7ste,producir|5je,reñir|4steis,hervir|4í,besar|4ste,pegar|5on,gustar|5steis,reconocer|7í,emigrar|5é,ver|1imos,contribuir|8yó,inducir|4je,presentir|4intieron,querer|2isisteis,deshacer|4icisteis,advertir|3irtieron,juntarse|5steis,prepararse|8on,bendecir|4ijisteis,entender|6isteis,mudarse|3é,temer|3isteis,vomit|5asteis,arrepentirse|5intieron,sentirse|1intieron,mentir|1intieron,vestir|1istieron",rev:"ebimos|2er,olvimos|3er,revimos|3erse,inimos|enir,rajimos|2er,pusimos|1oner,ullimos|4rse,aísteis|1er,bisteis|1er,olimos|2er,cogimos|3er,upimos|aber,tuvimos|1ener,cimos|1er,cisteis|1er,steis|r,mos|r,nsintió|2entir,ació|2er,rotegió|5er,igió|egir,espidió|3edir,onrió|3eír,ronceó|5arse,rometió|5er,ecó|2arse,irvió|ervir,lamó|3arse,nsiguió|2eguir,lió|1er,actó|3arse,reyó|2er,alló|3arse,evolvió|5er,feitó|4arse,enció|3er,onoció|4er,tribuyó|5ir,virtió|1ertir,eció|2er,dió|1er,ó|ar,ompuse|3oner,nduve|2ar,teraste|4rse,ompiste|3er,orriste|3er,rajiste|2er,redije|3ecir,ogiste|2er,viniste|1enir,omiste|2er,dujiste|2cir,tuviste|1ener,osiste|2er,añiste|2er,ndiste|2er,iciste|acer,duje|2cir,pusiste|1oner,eciste|2er,ste|r,ovieron|2erse,imieron|3r,iñeron|eñir,evieron|2er,eyeron|1er,irieron|erir,atieron|3r,usieron|oner,udieron|oder,brieron|3r,uejaron|5se,uvieron|ener,dujeron|2cir,dieron|1er,cieron|1er,bieron|2r,aron|2,puso|1oner,rio|2ar,uvo|ener,ijo|ecir,arrí|3er,acudí|4ir,alí|2er,rohibí|5ir,edí|2ir,burrí|4ir,umplí|4ir,olví|3er,eí|2r,epetí|4ir,erví|3ir,igí|2ir,ndí|2er,uí|1ir,cí|1er,uedé|3arse,gué|1ar,cé|zar,qué|car,é|ar,i|ar"},firstPlural:{rules:"bicar|5on,abricar|6ste,apar|3steis,ceptar|4é,nsentir|2intieron,eclarar|6mos,astar|4mos,omponer|3usieron,omenzar|7on,lorecer|5ió,ivertir|6ste,esentir|6mos,eprimir|6ste,roteger|5ieron,sificar|6ste,intar|4mos,egresar|5é,ontecer|5isteis,otestar|6steis,spertar|5ó,ducar|2qué,onfiar|5ste,lonizar|6ste,namorar|5ó,ufrir|4eron,lustrar|6mos,ensar|3ó,omper|3imos,ailar|3ó,orcer|3imos,onreír|5,epillar|5ó,eportar|7on,arrer|3ieron,mpezar|5ste,epasar|4ó,mportar|7on,ablecer|5ieron,ormir|urmieron,allar|4ste,ropezar|6mos,rindar|4ó,nvitar|5mos,erendar|5ó,urlar|5on,nviar|3é,obernar|5ó,xigir|4steis,riunfar|5é,nmigrar|5é,uebrar|5mos,uerer|1isiste,nfadar|4ó,sayunar|7on,rometer|5iste,gorar|4steis,legar|4mos,isfacer|3icisteis,scender|5isteis,busar|5on,onvidar|5é,tirizar|4cé,eshacer|3izo,lanchar|6ste,andonar|6ste,olocar|4ó,uspirar|5ó,esolver|5í,dvertir|6ste,orrer|3isteis,xportar|5ó,onjugar|5ué,retener|3uvieron,dmirar|5mos,rrachar|5é,ecidir|5mos,omprar|4ó,horrar|4é,oñar|2ó,xtender|5ió,postar|5mos,atinar|4é,terizar|5ó,poyar|3é,anejar|5steis,ompañar|7on,ticipar|6steis,ariar|4steis,lantar|4é,adrar|4mos,bligar|4ué,taminar|7on,ndicar|6on,lenar|3é,evorar|6on,ulpar|3ó,onsumir|5í,eparar|5ste,impiar|5steis,uceder|4í,uivocar|6mos,ublicar|6steis,endecir|3ijeron,sponder|5iste,elear|4ste,egociar|6mos,nseguir|2iguieron,iseñar|5ste,liminar|5ó,visar|3é,laticar|6mos,bedecer|5í,olgar|3ué,dornar|5ste,evistar|6mos,ocinar|5mos,acudir|5mos,eñalar|5mos,sperar|5ste,jercer|4ieron,positar|6steis,tilizar|7on,ncender|5imos,legrar|4ó,aciar|5on,rever|3isteis,dmitir|5mos,enovar|5mos,licitar|6mos,edicar|5steis,ezclar|5ste,frecer|4isteis,onducir|4jiste,nseñar|6on,enacer|4í,cercar|6on,emer|2í,nformar|6mos,divinar|7on,reer|2ísteis,almar|4ste,ralizar|5ó,xplicar|5ó,ratar|3ó,onfesar|5ó,ausar|4mos,nvencer|5iste,dificar|6mos,yudar|4steis,sminuir|5yeron,urgir|4ó,redecir|3ijo,guantar|5é,hocar|5on,ruñir|4mos,equerir|6steis,ntrolar|5é,asticar|6ste,ondenar|7on,uemar|4ste,scoger|4ió,eguntar|6mos,ganizar|6steis,roponer|3uso,fectuar|5ó,uardar|5steis,legir|4ste,rrollar|6ste,revivir|5í,rseguir|5í,ubir|3steis,campar|6on,omar|4on,liviar|4ó,onvenir|3inimos,nificar|6steis,nfirmar|5é,ehusar|6on,ombatir|6steis,rrojar|6on,ompetir|6mos,bortar|5ste,municar|5ó,ibujar|5steis,aludar|4ó,evolver|5ieron,eplicar|6mos,aler|2isteis,levar|5on,umentar|6steis,preciar|7on,ijar|4on,nojar|3é,nventar|6steis,esentar|5ó,evelar|5steis,uscar|4mos,uponer|2usimos,ogar|3mos,rohibir|6eron,rear|2é,omer|2isteis,uidar|5on,mprimir|6ó,tumbrar|6mos,eriguar|5ó,raducir|4jisteis,sociar|4ó,alir|3eron,sconder|5ieron,lcanzar|6steis,burrir|5steis,ograr|4steis,siasmar|6steis,lquilar|6mos,ermitir|6steis,orir|3steis,vejecer|5iste,oder|udisteis,scansar|6ste,nhelar|5mos,erdonar|5ó,ecordar|7on,ontener|3uvieron,etestar|5é,oblar|4steis,anar|2ó,avar|2ó,astimar|6steis,nfermar|5é,ingir|4ste,nversar|6steis,scubrir|6ste,ntinuar|5ó,ritar|4mos,ncionar|6mos,obrar|3é,lmorzar|6ste,opiar|3ó,ablar|3é,ecoger|4isteis,mpartir|6mos,alvar|5on,arcar|3ó,ealizar|6steis,añer|2í,rreglar|5ó,ntentar|7on,oportar|5ó,fligir|5ó,erder|3isteis,ncantar|6ste,erminar|6mos,ruzar|5on,niciar|4ó,ragar|4mos,umplir|5mos,ñadir|3í,galizar|7on,epender|5ieron,quistar|5ó,olestar|5é,irigir|5ste,nvocar|4ó,acticar|6mos,riticar|5ó,eredar|5ste,autizar|6steis,nvadir|5mos,btener|2uvisteis,ntestar|7on,ravesar|6steis,nstalar|5ó,escar|2qué,referir|6steis,scuchar|6ste,bolizar|6mos,teresar|6mos,plaudir|5í,iajar|5on,talecer|5isteis,gistrar|6mos,omendar|5é,vorciar|6ste,ancelar|6mos,dorar|4ste,lvidar|5mos,argar|4ste,eciclar|5ó,egalar|5ste,ultivar|5ó,avegar|5steis,umar|4on,sfrutar|6ste,xpresar|7on,elebrar|6steis,estir|4mos,cificar|7on,ensurar|6steis,ecorar|4é,efender|5isteis,evantar|6ste,ugerir|2irieron,vilizar|5ó,nfiscar|6steis,antener|3uvo,harlar|5steis,amentar|7on,rovocar|7on,educir|3jimos,ascinar|5ó,horcar|3qué,xponer|2usisteis,oseguir|2iguió,nsuciar|5ó,erecer|4isteis,ejar|4on,stigar|5steis,diar|3steis,uiar|3ste,edir|2í,struir|4yó,etir|3steis,añar|3mos,lorar|5on,sultar|6on,ustar|5on,necer|3iste,parecer|5imos,sitar|5on,altar|4mos,olar|2ó,otar|3mos,ntrar|3é,tender|4iste,quecer|4í,etar|2ó,luir|3steis,spirar|4é,illar|4mos,anzar|3ó,regar|3ó,regir|1igieron,servar|4ó,durar|3é,acar|3mos,bajar|3ó,ular|2é,bar|1ó,rificar|6steis,uar|2steis,azar|3ste,ibir|2í,ear|1ó,overse|2isteis,terarse|4mos,uedarse|4steis,ncearse|4mos,ecarse|3steis,reverse|3í,pararse|4ste,lamarse|3é,udarse|4on,actarse|4steis,allarse|5on,uejarse|3é,tarse|1é,irse|1steis,omit|4amos",exceptions:"beber|3ieron,renunciar|7ó,yacer|3ieron,oponer|2use,ir|fui,andar|3uvo,mandar|6on,negar|4mos,introducir|7jisteis,usar|3ste,constituir|9mos,aprender|6imos,votar|3é,cansar|5steis,crecer|4isteis,cerrar|6on,costar|6on,unir|3ó,extinguir|7í,desagradecer|10iste,desagradar|8é,meter|3imos,errar|3é,acordar|5é,reservar|7mos,hacer|1icieron,servir|1irvieron,permanecer|8imos,mostrar|6steis,criar|3é,vivir|4ó,teñir|1iñó,cenar|4ste,pagar|3ó,amar|3ste,afirmar|6mos,tocar|4mos,jugar|5on,sentar|6on,oír|2mos,casar|4ste,atraer|4jisteis,apagar|6on,herir|4mos,comprender|8iste,formar|4é,montar|5steis,calentar|8on,abordar|6steis,consistir|8ó,pesar|4ste,convertir|4irtió,huir|3mos,firmar|5ste,venir|1ino,nadar|4ste,oler|2iste,nacer|3isteis,traer|3je,leer|2í,jurar|4ste,coser|3ió,asistir|5í,tener|1uvieron,matar|5on,rezar|2cé,alentar|6mos,agradar|5ó,coger|3imos,sustituir|8ste,evitar|6on,vender|4iste,picar|3ó,peinar|5mos,curar|4mos,echar|5on,tirar|4mos,demostrar|8ste,arrepentirse|9mos,pasar|4mos,poner|1use,acortar|6steis,pedir|4mos,dudar|3é,cesar|4mos,cubrir|4í,caber|1upo,caminar|6steis,sorprender|8ió,tardar|4é,distinguir|9ste,luchar|4é,helar|3é,toser|3imos,insistir|7ste,freír|4steis,acostar|6steis,bordar|6on,aplicar|7on,apretar|6mos,caer|2yeron,verificar|9on,batir|4eron,detener|3uviste,seguir|1iguió,dar|1isteis,duchar|5mos,sonar|3é,robar|5on,mentir|5steis,invertir|3irtieron,mirar|3é,distribuir|9mos,volver|4ió,decir|1ijimos,saber|1upieron,reír|1ieron,vencer|4imos,agradecer|7imos,deber|3í,padecer|5isteis,ofender|5ió,glorificar|7qué,parar|3é,conocer|5isteis,abrir|4eron,untar|5on,borrar|6on,estimar|6ste,contar|4é,cortar|4ó,estar|3uvieron,reinar|6on,soler|3ió,anunciar|6é,producir|5jo,reñir|3í,hervir|5ste,besar|4mos,pegar|3ó,gustar|5mos,reconocer|7imos,aparecer|6iste,emigrar|6ste,ver|1io,contribuir|8í,inducir|4jo,consentir|4intieron,moverse|3isteis,quedarse|5steis,dormir|1urmieron,satisfacer|6icisteis,secarse|4steis,correr|4isteis,prepararse|7ste,conseguir|4iguieron,prever|4isteis,jactarse|5steis,creer|3ísteis,valer|3isteis,poder|1udisteis,zambullirse|8steis,sentirse|5steis,recoger|5isteis,obtener|3uvisteis,exponer|3usisteis",rev:"ebieron|2er,usieron|oner,egieron|2er,frieron|3r,rrieron|2er,icieron|acer,dijeron|1ecir,udaron|4se,nuyeron|2ir,allaron|5se,lvieron|2er,ibieron|3r,alieron|3r,ayeron|1er,atieron|3r,upieron|aber,brieron|3r,irieron|erir,igieron|egir,ndieron|2er,cieron|1er,uvieron|ener,aron|2,loreció|5er,nió|2r,iñó|eñir,nsistió|6r,nvirtió|2ertir,osió|2er,scogió|4er,mprimió|6r,olvió|3er,olió|2er,struyó|4ir,gió|2r,siguió|1eguir,endió|3er,ó|ar,nduvo|2ar,eshizo|3acer,ino|enir,redijo|3ecir,ropuso|3oner,upo|aber,antuvo|3ener,io|er,dujo|2cir,teramos|4rse,ompimos|3er,nceamos|4rse,mitamos|3,ogimos|2er,vinimos|1enir,pusimos|1oner,misteis|1er,osimos|2er,ijimos|ecir,dujimos|2cir,jisteis|cir,endimos|3er,disteis|1er,cimos|1er,cisteis|1er,steis|r,mos|r,onreí|5r,esolví|5er,treví|4erse,ucedí|4er,emí|2er,añí|2er,ebí|2er,cí|1er,í|ir,uisiste|1erer,metiste|3er,liste|1er,dujiste|2cir,raje|2er,tuviste|1ener,puse|1oner,ndiste|2er,ciste|1er,ste|r,unté|3arse,lamé|3arse,feité|4arse,uejé|3arse,cé|zar,gué|1ar,qué|car,é|ar"},secondPlural:{rules:"bicar|4steis,abricar|6mos,ceptar|6on,astar|3é,estigar|5ó,omponer|3usimos,omenzar|5ó,raduar|5ste,lorecer|5isteis,ivertir|6steis,esentir|5í,eprimir|5í,roteger|5isteis,intar|4steis,egresar|5ó,squiar|5steis,espedir|6mos,ontecer|5ió,ducar|4mos,estruir|6steis,onfiar|5mos,lonizar|5ó,namorar|7on,ufrir|4ó,onsejar|6steis,lustrar|7on,egatear|5é,omper|3ieron,ailar|4mos,onreír|3ieron,epillar|5é,arrer|3ió,mpezar|4ó,epasar|4é,mportar|5ó,ablecer|5í,ormir|4ste,erretir|3itió,allar|3ó,nvitar|5ste,urlar|4ste,nviar|4mos,obernar|5é,xigir|3í,riunfar|7on,nmigrar|6ste,uerer|1ise,nfadar|5mos,sayunar|6mos,esultar|6ste,rometer|5ieron,gorar|5on,legar|3ué,isfacer|3ice,sgustar|6mos,brazar|3cé,scender|5imos,busar|3ó,onvidar|6steis,tirizar|6steis,eshacer|3ice,lanchar|7on,andonar|6mos,olocar|5ste,uspirar|5é,esolver|5isteis,dvertir|2irtió,orrer|3ieron,onjugar|7on,retener|3uvisteis,dmirar|6on,rrachar|5ó,tenecer|5í,ecidir|5steis,omprar|4é,horrar|4ó,xtender|5imos,postar|4ó,atinar|4ó,terizar|6mos,poyar|4ste,cesitar|6mos,anejar|6on,ompañar|5ó,ariar|5on,lantar|5mos,adrar|4ste,bligar|5ste,taminar|5ó,ndicar|5ste,lenar|3ó,evorar|5mos,onsumir|6mos,sustar|5ste,uceder|4ieron,uivocar|6steis,sponder|5imos,esear|3é,elear|4mos,iquecer|5iste,nseguir|6ste,iseñar|6on,rpretar|6mos,contrar|6steis,liminar|6mos,visar|5on,laticar|6ste,bedecer|5ieron,olgar|4ste,dornar|5mos,evistar|6steis,ocinar|6on,acudir|5ste,eñalar|4ó,sperar|6on,nfluir|5mos,positar|7on,tilizar|6ste,ncender|5isteis,legrar|5ste,aciar|4ste,rever|3imos,dmitir|5eron,ituar|5on,enovar|4é,licitar|6ste,edicar|3qué,ezclar|6on,frecer|4í,quillar|7on,enacer|4iste,cercar|4ó,emer|2iste,nformar|7on,divinar|6ste,reer|2íste,iolar|3é,almar|5on,xplicar|7on,ratar|3é,onfesar|5é,ausar|5on,nvencer|5imos,dificar|6steis,yudar|4mos,sminuir|5í,urgir|4steis,guantar|5ó,hocar|4mos,ruñir|3í,vanzar|6on,equerir|5í,ntrolar|6ste,nstruir|5yeron,asticar|5ó,ondenar|6steis,uemar|3ó,scoger|4isteis,eguntar|5é,ganizar|4cé,fectuar|5é,uardar|5mos,legir|1igió,rrollar|6mos,revivir|6ste,rillar|5ste,rseguir|6mos,ubir|2í,ntregar|6mos,campar|5ste,omar|3steis,liviar|4é,onvenir|3inisteis,mplear|5ste,nfirmar|5ó,ehusar|5steis,ombatir|6mos,rrojar|5steis,ompetir|6steis,bortar|6on,municar|6steis,ibujar|6on,aludar|6on,evolver|5í,aler|2ieron,levar|3é,umentar|7on,preciar|6steis,ijar|3mos,nojar|5on,nventar|7on,esentar|7on,uponer|2usiste,ogar|4on,rohibir|6mos,rear|3mos,orregir|6steis,nservar|5é,omer|2í,uidar|3ó,mprimir|6mos,tumbrar|7on,eriguar|6ste,raducir|4jimos,alir|2í,sconder|5isteis,lcanzar|6mos,burrir|5eron,ograr|5on,siasmar|7on,lquilar|6steis,ermitir|6mos,orir|urió,vejecer|5í,oder|udiste,scansar|5ó,erdonar|5é,ecordar|6steis,ontener|3uvo,adurar|5steis,etestar|7on,oblar|5on,hismear|5é,anar|2é,avar|4on,astimar|6mos,nfermar|7on,ingir|4mos,nversar|6ste,scubrir|6eron,ntinuar|5é,ritar|3é,ncionar|6steis,obrar|3ó,ricular|7on,lmorzar|6steis,ablar|3ó,ecoger|4í,studiar|6ste,mpartir|5í,alvar|4steis,arcar|2qué,añer|2imos,rreglar|7on,ntentar|6mos,ucear|4steis,erder|3iste,ncantar|6mos,erminar|7on,ruzar|4mos,niciar|4é,echazar|6mos,ragar|4ste,espirar|6mos,umplir|5steis,ecibir|5ó,ñadir|4ste,galizar|6mos,epender|5isteis,quistar|5é,olestar|7on,nvocar|3qué,acticar|6ste,riticar|6steis,eredar|5mos,autizar|6mos,nvadir|5eron,epetir|5ste,btener|2uviste,xhibir|5ste,ravesar|5ó,rabajar|5é,nstalar|5é,menazar|6mos,referir|5í,scuchar|7on,bolizar|6steis,plaudir|6steis,iajar|4steis,talecer|5imos,gistrar|7on,xplorar|6ste,omendar|5ó,vorciar|6mos,isitar|5steis,aquecer|5ió,dorar|4steis,cabar|5on,lvidar|5ste,argar|5on,eciclar|6ste,egalar|5steis,ultivar|6ste,avegar|5ste,vacuar|6on,umar|3mos,sfrutar|6steis,nsultar|6mos,estir|istió,cificar|6steis,espetar|6ste,ensurar|6ste,ecorar|5steis,efender|5iste,evantar|6steis,ugerir|5mos,vilizar|4cé,nfiscar|4qué,ncluir|4yeron,antener|3uve,harlar|4ó,amentar|5é,astigar|5ué,tacar|3ó,rovocar|6mos,educir|3je,ascinar|5é,horcar|5ste,xponer|2usimos,oseguir|2iguieron,nsuciar|5é,erecer|4í,entir|4mos,arar|3steis,testar|5ste,ular|3steis,stituir|5í,nsar|4on,otar|3steis,rcer|2ió,ezar|4on,ebrar|3é,eservar|7on,manecer|5ió,firmar|5steis,pagar|3ué,prender|5isteis,piar|3ste,ontar|3ó,decir|1ijimos,tender|4í,ociar|3é,nducir|3jimos,alizar|3cé,oponer|2usisteis,scar|4on,uchar|3ó,igir|3steis,resar|4steis,robar|4mos,par|2mos,ndar|3ste,licar|4ste,elar|4on,ñar|1é,ificar|4ó,rtar|2é,overse|2ió,terarse|3ó,uedarse|4mos,ncearse|4steis,ecarse|3mos,reverse|3ieron,untarse|3ó,pararse|3é,lamarse|4mos,udarse|3steis,allarse|4steis,uejarse|3ó,tarse|3on,irse|í,omit|4aste",exceptions:"dejar|4ste,beber|3isteis,renunciar|8ste,yacer|3iste,ir|fuisteis,odiar|4mos,andar|3uvisteis,negar|3ué,introducir|7je,regir|3í,usar|2é,aprender|6í,parecer|5ieron,crecer|4ieron,cerrar|5mos,costar|5steis,unir|2í,llorar|5steis,extinguir|8mos,desagradecer|10isteis,desagradar|8ó,meter|3isteis,errar|3ó,acordar|6ste,hacer|1icimos,servir|4í,mostrar|5é,desaparecer|9ió,criar|4ste,vivir|4steis,teñir|4steis,cenar|5on,amar|4on,medir|4ste,tocar|3ó,jugar|4steis,saltar|4ó,sentar|4é,oír|2steis,volar|4mos,casar|4mos,atraer|4jimos,herir|1irió,formar|4ó,entrar|4ó,calentar|7mos,abordar|6mos,notar|3ó,consistir|7í,pesar|4mos,faltar|5ste,aprobar|5é,convertir|8mos,huir|3steis,venir|1ine,bajar|4mos,nadar|4steis,oler|2imos,aspirar|6steis,nacer|3ieron,traer|3jo,describir|8ste,leer|2ísteis,jurar|3é,coser|3imos,asistir|6ó,tener|1uve,matar|3ó,lanzar|5steis,alentar|5é,agradar|5é,coger|3ieron,evitar|4ó,vender|4imos,picar|4steis,peinar|6on,curar|4steis,echar|3é,tirar|3é,demostrar|7ó,pasar|5on,poner|1uso,acortar|7on,pedir|1idieron,dudar|3ó,cesar|5on,cubrir|5ste,caber|1upieron,caminar|6mos,durar|3ó,tardar|4ó,distinguir|9eron,sentirse|5mos,helar|3ó,toser|3í,insistir|7eron,freír|2ió,acostar|5é,bordar|5ste,apretar|5é,caer|2yó,batir|4ó,detener|3uvo,seguir|5ste,dar|1ieron,guiar|5on,sonar|3ó,escribir|7steis,regar|4steis,sacar|2qué,invertir|7ste,actuar|4ó,mirar|3ó,distribuir|8í,volver|4imos,decir|1ije,saber|1upo,reír|3mos,vencer|4í,agradecer|7ió,purificar|8mos,deber|3iste,cazar|3ó,padecer|5imos,ofender|5isteis,glorificar|9ste,parar|3ó,conocer|5imos,abrir|3í,untar|3ó,borrar|5mos,estimar|5é,estar|3uvo,reinar|4ó,soler|3iste,anunciar|7mos,producir|5jeron,reñir|4ste,hervir|1irvieron,besar|4steis,pegar|4mos,gustar|4é,reconocer|7iste,aparecer|6imos,emigrar|6steis,ver|1isteis,contribuir|9ste,oponer|2usisteis,proteger|6isteis,broncearse|7steis,resolver|6isteis,correr|4ieron,entretener|6uvisteis,juntarse|4ó,comprender|8isteis,encender|6isteis,mudarse|4steis,escoger|5isteis,proponer|4usisteis,convenir|4inisteis,hallarse|5steis,esconder|6isteis,aburrir|6eron,poder|1udiste,sorprender|8isteis,depender|6isteis,vestir|1istió,proseguir|4iguieron",rev:"ovió|2erse,nteró|4arse,ufrió|4r,arrió|3er,erritió|3etir,dvirtió|2ertir,irió|erir,sistió|5r,ligió|1egir,urió|orir,uejó|3arse,ayó|1er,atió|3r,ecibió|5r,ció|1er,ó|ar,mpieron|2er,nrieron|2eír,etieron|2er,evieron|2erse,edieron|2er,actaron|5se,ogieron|2er,alieron|2er,eitaron|5se,idieron|edir,upieron|aber,brieron|3r,adieron|3r,dujeron|2cir,tieron|2r,uyeron|1ir,cieron|1er,aron|2,uedamos|4rse,ecamos|3rse,icimos|acer,lamamos|4rse,rajimos|2er,limos|1er,eísteis|1er,osimos|2er,añimos|2er,pusimos|1oner,cisteis|1er,dijimos|1ecir,vimos|1er,dujimos|2cir,ndimos|2er,cimos|1er,steis|r,mos|r,uise|1erer,ine|enir,emiste|2er,reíste|2er,mitaste|3,pusiste|1oner,erdiste|3er,ije|ecir,ebiste|2er,tuviste|1ener,oliste|2er,endiste|3er,duje|2cir,ice|acer,tuve|1ener,ciste|1er,ste|r,reparé|5arse,gué|1ar,cé|zar,qué|car,é|ar,rajo|2er,uso|oner,upo|aber,stuvo|2ar,tuvo|1ener,evolví|5er,repentí|6irse,omí|2er,ambullí|6irse,osí|2er,ecogí|4er,endí|3er,cí|1er,í|ir"},thirdPlural:{rules:"bicar|4mos,abricar|5ó,apar|3ste,ceptar|5mos,nsentir|6steis,eclarar|5ó,astar|3ó,estigar|6ste,omponer|3usisteis,omenzar|6ste,raduar|5mos,lorecer|5ieron,ivertir|5í,esentir|2intió,eprimir|6ó,roteger|5í,sificar|6mos,intar|4ste,squiar|6on,espedir|3idieron,ontecer|5imos,otestar|7on,spertar|6ste,ducar|3ó,estruir|6ste,onfiar|6on,lonizar|6steis,namorar|6ste,ufrir|4steis,onsejar|6ste,lustrar|6steis,alcular|7on,egatear|6ste,omper|3ió,ailar|4steis,orcer|3ieron,onreír|5mos,epillar|6ste,eportar|6steis,arrer|3iste,mpezar|5mos,epasar|5steis,mportar|5é,ablecer|5isteis,ormir|urmió,erretir|3itieron,allar|3é,ropezar|6ste,rindar|6on,nvitar|5steis,erendar|5é,nviar|3ó,obernar|6steis,xigir|4eron,riunfar|6ste,nmigrar|7on,uebrar|5ste,uerer|1iso,nfadar|5ste,sayunar|6ste,rometer|5isteis,legar|4steis,isfacer|3icimos,brazar|4ó,scender|5iste,busar|3é,onvidar|6mos,eshacer|3icieron,lanchar|6mos,andonar|6steis,olocar|5mos,uspirar|6steis,esolver|5ieron,dvertir|6mos,orrer|3imos,xportar|6ste,onjugar|6mos,retener|3uviste,dmirar|5ste,rrachar|6mos,ecidir|5eron,omprar|5mos,oñar|4on,postar|4é,atinar|5ste,poyar|4steis,cesitar|5é,anejar|5mos,ompañar|5é,ticipar|7on,ariar|4ste,lantar|5steis,adrar|3ó,bligar|6on,taminar|5é,xplotar|6ste,ndicar|5mos,lenar|4steis,evorar|5steis,ulpar|4steis,onsumir|6eron,uceder|4isteis,ublicar|4qué,endecir|3ijiste,sponder|5ieron,esear|5on,elear|4steis,iquecer|5imos,egociar|5ó,nseguir|5í,iseñar|5steis,rpretar|7on,contrar|6mos,liminar|6steis,visar|3ó,laticar|5ó,bedecer|5iste,olgar|4mos,dornar|6on,ocinar|5ste,acudir|5steis,eñalar|4é,sperar|5mos,jercer|4isteis,nfluir|4yó,positar|6mos,tilizar|6steis,ncender|5ieron,legrar|5mos,aciar|3ó,rever|3ió,dmitir|4í,ituar|4ste,enovar|6on,licitar|6steis,edicar|6on,frecer|4iste,nseñar|4ó,quillar|6steis,enacer|4ió,cercar|5ste,emer|2ieron,nformar|6ste,divinar|5é,reer|2ímos,iolar|4ste,almar|4mos,xplicar|6steis,ratar|5on,onfesar|6ste,ausar|4ste,nvencer|5í,dificar|4qué,yudar|5on,sminuir|6ste,urgir|3í,redecir|3ijeron,guantar|7on,hocar|4ste,ruñir|3eron,vanzar|5steis,equerir|3irió,ntrolar|5ó,nstruir|6steis,asticar|6steis,ondenar|5ó,uemar|3é,scoger|4iste,eguntar|5ó,ganizar|7on,roponer|3usiste,fectuar|6mos,uardar|6on,legir|4mos,rrollar|7on,revivir|6eron,rillar|6on,rseguir|2iguieron,ubir|3ste,campar|5mos,omar|3ste,liviar|5mos,mplear|5mos,nificar|6ste,nfirmar|6steis,ehusar|5mos,ombatir|6ste,bortar|5mos,municar|7on,ibujar|5ste,aludar|5steis,evolver|5isteis,aler|2ió,levar|3ó,umentar|6mos,preciar|6mos,ijar|3steis,nventar|6ste,esentar|6steis,evelar|5ste,uscar|3ó,uponer|2usisteis,ogar|2ué,rohibir|6ó,rear|4on,orregir|3igió,omer|2ió,uidar|3é,mprimir|6eron,tumbrar|6ste,eriguar|7on,raducir|4jeron,sociar|5mos,alir|3ó,sconder|5ió,burrir|5ó,ograr|4ste,siasmar|5ó,lquilar|6ste,ermitir|6eron,orir|urieron,vejecer|5ieron,oder|udimos,scansar|5é,nhelar|5ste,erdonar|6mos,ecordar|6ste,ontener|3uve,adurar|5ste,etestar|6mos,hismear|6steis,anar|4on,avar|3mos,astimar|6ste,nfermar|6mos,ingir|3í,nversar|6mos,scubrir|5í,ntinuar|6ste,ritar|3ó,ncionar|7on,obrar|5on,lmorzar|5ó,ecoger|4ieron,studiar|7on,mpartir|6ó,alvar|4ste,arcar|5on,ealizar|6mos,añer|2ó,rreglar|6mos,ntentar|6steis,ucear|4ste,oportar|7on,fligir|5ste,erder|3í,ncantar|6steis,erminar|6steis,ruzar|2cé,niciar|5mos,echazar|5ó,ragar|3ué,espirar|6ste,umplir|5eron,ecibir|5steis,ñadir|4eron,epender|5iste,olestar|6steis,irigir|5mos,acticar|5ó,riticar|6mos,eredar|6on,autizar|5ó,nvadir|5steis,btener|2uvieron,ntestar|6steis,xhibir|5steis,ravesar|5é,rabajar|6steis,nstalar|6ste,menazar|4cé,escar|4steis,referir|3irió,scuchar|6steis,bolizar|5ó,plaudir|6eron,iajar|4mos,talecer|5ió,gistrar|6steis,omendar|6mos,vorciar|5é,ancelar|6steis,isitar|5ste,aquecer|5isteis,cabar|4mos,lvidar|6on,argar|4steis,egalar|5mos,ultivar|7on,avegar|4ué,vacuar|5mos,umar|3steis,sfrutar|6mos,xpresar|6mos,elebrar|5ó,estir|4steis,cificar|6mos,espetar|6mos,ensurar|7on,ecorar|6on,efender|5í,evantar|6mos,ugerir|4í,vilizar|7on,nfiscar|6ste,ncluir|5mos,antener|3uviste,amentar|5ó,astigar|6mos,rovocar|5ó,educir|3jo,ascinar|6mos,horcar|5mos,xponer|2usieron,oseguir|6mos,nsuciar|6steis,erecer|4ieron,resar|5on,stituir|6steis,nsar|3ste,añar|2ó,rlar|2é,tinguir|6steis,ustar|4steis,rizar|4ste,parecer|5í,firmar|6on,ular|3mos,parar|4mos,piar|3mos,vocar|5on,ontar|4ste,sistir|5mos,istar|5on,probar|5steis,clar|3mos,nducir|3jisteis,oser|2ieron,alizar|5ste,anzar|2cé,venir|1inieron,ojar|2ó,petir|1itió,plicar|4ó,aber|upe,blar|3ste,acar|4on,conocer|5ieron,rrar|3ste,ltar|3steis,servar|5steis,necer|3isteis,tender|4ieron,egar|3ste,orar|3mos,overse|2imos,terarse|3é,ncearse|5on,ecarse|4on,reverse|3isteis,pararse|3ó,udarse|3mos,ullirse|4ste,entirse|intió,arse|1ste,omit|4aron",exceptions:"dejar|3ó,beber|3í,renunciar|8mos,yacer|3isteis,oponer|2usieron,ir|fuiste,odiar|4ste,andar|3uvieron,mandar|5mos,introducir|7jo,regir|4steis,usar|2ó,aprender|6ieron,votar|4mos,crecer|4ió,costar|5ste,unir|3eron,desagradecer|10imos,desagradar|9ste,meter|3ió,errar|4mos,acordar|7on,hacer|1ice,servir|5mos,mostrar|5ó,criar|5on,vivir|3í,teñir|3í,cenar|4mos,pagar|4steis,amar|3steis,medir|1idió,tocar|5on,jugar|3ué,saltar|4é,sentar|4ó,oír|2ste,volar|5on,casar|5on,atraer|4jeron,apagar|4ó,herir|3í,comprender|8í,formar|6on,entrar|6on,calentar|7steis,abordar|5é,notar|3é,pesar|5on,convertir|8steis,huir|2yó,bajar|5on,nadar|4mos,oler|2í,aspirar|5ó,nacer|3iste,traer|3jisteis,describir|8ó,leer|2íste,jurar|5on,tener|1uvimos,matar|3é,rezar|4steis,alentar|5ó,agradar|6mos,coger|3isteis,evitar|4é,vender|4í,picar|4ste,peinar|5ste,curar|4ste,echar|3ó,tirar|3ó,demostrar|7é,pasar|4ste,poner|1usieron,acortar|6mos,pedir|4ste,dudar|4ste,cesar|3ó,cubrir|5steis,caminar|7on,durar|4steis,sorprender|8imos,tardar|5ste,luchar|6on,helar|4mos,insistir|7steis,freír|4,acostar|5ó,bordar|5steis,apretar|5ó,caer|2í,verificar|8steis,batir|4steis,detener|3uve,seguir|5mos,clarificar|7qué,dar|1io,guiar|4mos,duchar|4é,sonar|4ste,escribir|7ste,robar|3é,mentir|4í,invertir|6í,actuar|4é,mirar|4mos,distribuir|8yó,volver|4iste,decir|1ijisteis,reír|1io,vencer|4ieron,agradecer|7isteis,purificar|6qué,deber|3ieron,cazar|5on,padecer|5ió,sacrificar|10on,ofender|5iste,glorificar|9mos,abrir|4ó,untar|3é,estimar|5ó,cortar|5ste,estar|3uve,reinar|4é,soler|3isteis,anunciar|7steis,producir|5jimos,reñir|1iñeron,hervir|5steis,besar|5on,gustar|4ó,aparecer|6ieron,emigrar|5ó,ver|1iste,contribuir|9mos,componer|4usisteis,despedir|4idieron,derretir|4itieron,prometer|6isteis,decidir|6eron,atreverse|5isteis,suceder|5isteis,conducir|5jisteis,creer|3ímos,perseguir|4iguieron,devolver|6isteis,valer|3ió,suponer|3usisteis,salir|4ó,permitir|7eron,tañer|3ó,obtener|3uvieron,inducir|4jisteis",rev:"ebí|2er,rotegí|5er,iví|2ir,eñí|2ir,onseguí|6ir,lí|1er,reí|3r,aí|1er,gí|1ir,cí|1er,rí|1ir,tí|1ir,dí|1er,ovimos|2erse,ficimos|1acer,orrimos|3er,udamos|3rse,uvimos|ener,udimos|oder,endimos|3er,listeis|1er,dujimos|2cir,ecimos|2er,cisteis|1er,steis|r,mos|r,nteré|4arse,gué|1ar,iqué|1car,cé|zar,é|ar,esintió|2entir,eprimió|6r,ompió|3er,urmió|ormir,etió|2er,idió|edir,reparó|5arse,revió|3er,enació|4er,orrigió|3egir,omió|2er,scondió|5er,burrió|5r,mpartió|6r,brió|3r,ibió|3r,irió|erir,pitió|1etir,intió|entirse,eció|2er,uyó|1ir,ó|ar,arriste|3er,uedaste|4rse,ice|acer,untaste|4rse,lamaste|4rse,dijiste|1ecir,eíste|1er,actaste|4rse,cogiste|3er,pusiste|1oner,allaste|4rse,eitaste|4rse,ulliste|4rse,uejaste|4rse,olviste|3er,stuve|2ar,tuviste|1ener,upe|aber,tuve|1ener,endiste|3er,ciste|1er,ste|r,ncearon|5se,igieron|3r,ecaron|4se,icieron|acer,lvieron|2er,rajeron|2er,emieron|2er,dijeron|1ecir,mitaron|3,ruñeron|3ir,ivieron|3r,dujeron|2cir,urieron|orir,ogieron|2er,plieron|3r,adieron|3r,ebieron|2er,udieron|3r,iñeron|eñir,mieron|2r,inieron|enir,osieron|2er,usieron|oner,ndieron|2er,cieron|1er,aron|2,uiso|1erer,dujo|2cir"}},futureTense:{first:{rules:"bicar|5án,abricar|7emos,apar|4é,ceptar|6á,nsentir|7éis,eclarar|7án,astar|5á,estigar|7éis,omponer|5dremos,omenzar|7ás,raduar|6é,ivertir|7emos,esentir|7emos,eprimir|7á,sificar|7éis,intar|5ás,ontecer|7é,otestar|7á,spertar|7emos,ducar|5é,estruir|7é,onfiar|6emos,namorar|7ás,ufrir|5á,alcular|7án,egatear|7á,omper|5á,ailar|5án,orcer|5ás,onreír|4iréis,epillar|7éis,eportar|7éis,arrer|5emos,epasar|6ás,mportar|7á,ablecer|7án,ormir|5án,erretir|7emos,allar|5éis,rindar|6á,nvitar|6é,erendar|7emos,ngañar|6éis,nviar|5án,obernar|7ás,xigir|5é,riunfar|7ás,nmigrar|7ás,uebrar|6ás,uerer|3rán,nfadar|6á,sayunar|7emos,esultar|7éis,rometer|7é,gorar|5ás,legar|5á,isfacer|4rán,brazar|6éis,scender|7é,busar|5emos,onvidar|7éis,tirizar|7ás,eshacer|4rá,lanchar|7emos,andonar|7ás,olocar|6é,esolver|7emos,dvertir|7emos,orrer|5án,xportar|7éis,onjugar|7án,retener|5dréis,dmirar|6emos,rrachar|7éis,tenecer|7éis,ecidir|6ás,omprar|6emos,horrar|6ás,oñar|4éis,xtender|7é,atinar|6emos,terizar|7emos,poyar|5emos,cesitar|7é,ticipar|7emos,ariar|5emos,lantar|6á,adrar|5emos,bligar|6é,taminar|7án,xplotar|7ás,ndicar|6é,lenar|5á,evorar|6emos,ulpar|5é,onsumir|7ás,impiar|6emos,uceder|6éis,uivocar|7ás,ublicar|7é,endecir|7emos,esear|5emos,elear|5éis,nseguir|7á,iseñar|6emos,rpretar|7ás,liminar|7á,visar|5éis,laticar|7é,bedecer|7ás,olgar|5éis,dornar|6á,evistar|7emos,ocinar|6ás,sperar|6é,jercer|6éis,nfluir|6á,positar|7án,tilizar|7éis,ncender|7emos,legrar|6é,aciar|5éis,rever|5éis,dmitir|6ás,enovar|6ás,licitar|7éis,edicar|6ás,ezclar|6é,onducir|7é,nseñar|6éis,quillar|7ás,enacer|6emos,cercar|6emos,emer|4á,divinar|7ás,reer|4ás,almar|5éis,ralizar|7emos,xplicar|7án,ratar|5é,onfesar|7án,ausar|5án,nvencer|7é,dificar|7éis,yudar|5é,sminuir|7emos,urgir|5é,redecir|7án,guantar|7emos,hocar|5éis,ruñir|5emos,vanzar|6emos,nstruir|7ás,asticar|7á,uemar|5ás,eguntar|7án,roponer|5dréis,rrollar|7é,revivir|7ás,rillar|6á,rseguir|7ás,ubir|4emos,ntregar|7emos,campar|6á,omar|4éis,liviar|6emos,onvenir|5dremos,mplear|6án,nificar|7á,nfirmar|7emos,ehusar|6éis,ombatir|7án,rrojar|6éis,ompetir|7éis,bortar|6ás,municar|7emos,ibujar|6ás,evolver|7ás,eplicar|7éis,aler|2dréis,levar|5éis,umentar|7é,preciar|7á,ijar|4emos,nojar|5án,nventar|7emos,esentar|7é,evelar|6é,uscar|5á,uponer|4drán,ogar|4á,rohibir|7á,rear|4án,orregir|7é,omer|4éis,uidar|5án,mprimir|7emos,tumbrar|7á,eriguar|7ás,raducir|7án,alir|2dremos,lcanzar|7ás,burrir|6á,ograr|5ás,siasmar|7emos,lquilar|7emos,ermitir|7emos,orir|4emos,vejecer|7éis,oder|2réis,nhelar|6éis,erdonar|7éis,ecordar|7á,ontener|5dremos,adurar|6éis,etestar|7án,oblar|5á,hismear|7á,anar|4éis,avar|4éis,nfermar|7ás,ingir|5emos,nversar|7emos,scubrir|7éis,ntinuar|7án,ritar|5ás,ncionar|7án,obrar|5á,lmorzar|7án,opiar|5éis,ablar|5éis,ecoger|6án,studiar|7éis,mpartir|7ás,alvar|5emos,arcar|5ás,ealizar|7án,añer|4á,rreglar|7án,ntentar|7án,ucear|5emos,oportar|7emos,fligir|6éis,erder|5án,ncantar|7á,erminar|7emos,ruzar|5á,niciar|6án,echazar|7ás,ragar|5emos,umplir|6éis,ecibir|6éis,ñadir|5éis,galizar|7é,epender|7emos,quistar|7é,olestar|7emos,irigir|6á,nvocar|6emos,acticar|7éis,riticar|7emos,eredar|6á,autizar|7ás,nvadir|6é,epetir|6é,btener|4drás,ntestar|7éis,xhibir|6emos,ravesar|7éis,rabajar|7é,menazar|7emos,escar|5é,referir|7éis,bolizar|7emos,iajar|5án,talecer|7é,xplorar|7é,omendar|7éis,vorciar|7éis,ancelar|7á,isitar|6á,dorar|5emos,cabar|5ás,lvidar|6emos,argar|5emos,eciclar|7án,egalar|6é,ultivar|7emos,avegar|6á,vacuar|6éis,umar|4é,sfrutar|7emos,xpresar|7á,elebrar|7emos,nsultar|7ás,estir|5éis,cificar|7án,espetar|7éis,ensurar|7ás,ecorar|6án,efender|7emos,evantar|7án,vilizar|7é,nfiscar|7emos,ncluir|6emos,antener|5dréis,amentar|7án,astigar|7ás,tacar|5án,rovocar|7é,educir|6emos,ascinar|7éis,horcar|6án,xponer|4dré,oseguir|7éis,nsuciar|7emos,erecer|6ás,egir|4emos,resar|5án,uiar|4éis,edir|4éis,nizar|5emos,ejar|4é,nsar|4emos,pezar|5éis,rlar|4éis,ustar|5é,spirar|6emos,enar|4emos,ostar|5á,añar|4é,ular|4emos,asar|4án,parar|5ás,ontar|5éis,tender|6ás,onder|5ás,quecer|6ás,ociar|5án,udir|4emos,alar|4án,aer|3emos,ser|3á,formar|6á,olar|4emos,ardar|5ás,udar|4emos,servar|6án,stimar|6éis,uchar|5éis,tribuir|7é,robar|5á,conocer|7éis,ger|3emos,erir|4á,tuar|4emos,recer|5éis,trar|4éis,overse|4emos,terarse|5é,uedarse|5é,ncearse|5éis,ecarse|4é,reverse|5éis,pararse|5éis,lamarse|5éis,udarse|4éis,allarse|5éis,eitarse|5éis,ullirse|5ás,uejarse|5á,tarse|3emos,entirse|5emos,omit|4aréis",exceptions:"dejar|5emos,beber|5emos,renunciar|9ás,yacer|5án,oponer|4drán,ir|2é,odiar|5á,andar|5é,mandar|6éis,negar|5éis,introducir|10emos,usar|4án,constituir|10ás,aprender|8ás,votar|5án,cansar|6án,parecer|7ás,crecer|6á,cerrar|6án,costar|6ás,unir|4á,llorar|6ás,extinguir|9éis,desagradecer|12emos,desagradar|10é,meter|5éis,errar|5ás,acordar|7éis,reservar|8á,hacer|2réis,servir|6éis,permanecer|10é,criar|5éis,vivir|5án,teñir|5é,pagar|5éis,amar|4án,afirmar|7á,tocar|5é,jugar|5emos,saltar|6án,sentar|6ás,oír|1iréis,volar|5á,atraer|6án,apagar|6án,comprender|10emos,entrar|6ás,calentar|8emos,abordar|7emos,notar|5emos,consistir|9éis,pesar|5án,faltar|6éis,aprobar|7ás,convertir|9éis,huir|4emos,firmar|6ás,venir|3dréis,bajar|5ás,nadar|5ás,oler|4án,aspirar|7ás,nacer|5á,describir|9ás,leer|4á,jurar|5á,asistir|7á,tener|3dréis,matar|5án,rezar|5ás,lanzar|6éis,alentar|7án,agradar|7éis,sustituir|9án,evitar|6án,vender|6éis,picar|5é,peinar|6éis,curar|5emos,echar|5á,tirar|5án,demostrar|9á,amanecer|8emos,poner|3drán,acortar|7éis,pedir|5é,cesar|5ás,cubrir|6é,caber|3rás,caminar|7éis,durar|5á,sorprender|10éis,distinguir|10emos,luchar|6án,helar|5á,toser|5é,insistir|8é,freír|3iremos,bordar|6éis,aplicar|7ás,apretar|7á,verificar|9emos,batir|5á,detener|5dremos,seguir|6án,clarificar|10emos,dar|3ás,sonar|5á,escribir|8emos,regar|5éis,sacar|5á,mentir|6é,invertir|8á,mirar|5éis,volver|6á,decir|1iré,saber|3remos,reír|2iré,vencer|6án,agradecer|9án,purificar|9á,deber|5éis,cazar|5emos,padecer|7ás,sacrificar|10é,ofender|7éis,glorificar|10é,abrir|5ás,untar|5é,borrar|6éis,cortar|6emos,estar|5ás,reinar|6án,soler|5ás,anunciar|8emos,producir|8éis,reñir|5á,hervir|6á,besar|5emos,pegar|5emos,gustar|6án,emigrar|7éis,ver|3á,inducir|7ás,moverse|5emos,atreverse|7éis,juntarse|6emos,jactarse|6emos,vomit|5aréis,convenir|6dremos,hallarse|6éis,afeitarse|7éis,arrepentirse|10emos,sentirse|6emos",rev:"nteraré|6se,uedaré|5se,ecaré|4se,eiré|1ír,xpondré|4er,ré|1,reiréis|2ír,cearéis|4se,araréis|4se,amaréis|4se,udaréis|4se,ldremos|1ir,odréis|2er,abrás|2er,ullirás|5se,eiremos|1ír,abremos|2er,tendrás|3er,ndremos|1er,dréis|er,rás|1,réis|1,remos|1,uerrán|3er,isfarán|4cer,pondrán|3er,rán|1,eshará|4cer,uejará|5se,rá|1"},second:{rules:"bicar|5ás,abricar|7éis,apar|4á,ceptar|6ás,nsentir|7ás,eclarar|7ás,astar|5é,omponer|5drán,omenzar|7emos,raduar|6á,lorecer|7é,ivertir|7á,esentir|7éis,eprimir|7é,roteger|7án,sificar|7emos,intar|5á,egresar|7á,squiar|6án,ontecer|7á,otestar|7é,spertar|7é,ducar|5emos,estruir|7á,onfiar|6é,lonizar|7éis,namorar|7emos,ufrir|5é,lustrar|7emos,egatear|7é,omper|5é,ailar|5ás,onreír|4iré,epillar|7á,eportar|7á,epasar|6án,mportar|7emos,ablecer|7ás,ormir|5ás,erretir|7é,allar|5án,rindar|6é,nvitar|6á,erendar|7éis,ngañar|6ás,urlar|5án,nviar|5emos,obernar|7án,xigir|5án,riunfar|7án,uebrar|6emos,uerer|3rás,nfadar|6é,sayunar|7ás,esultar|7á,rometer|7éis,gorar|5án,isfacer|4rás,brazar|6ás,scender|7á,busar|5é,tirizar|7án,eshacer|4ré,lanchar|7éis,andonar|7án,olocar|6á,esolver|7á,dvertir|7éis,xportar|7án,onjugar|7ás,retener|5dremos,dmirar|6ás,rrachar|7emos,tenecer|7ás,ecidir|6án,omprar|6án,horrar|6án,oñar|4ás,xtender|7á,atinar|6ás,terizar|7éis,poyar|5ás,cesitar|7á,ticipar|7ás,ariar|5éis,lantar|6é,adrar|5é,egular|6éis,bligar|6á,taminar|7ás,xplotar|7án,ndicar|6á,lenar|5é,evorar|6án,ulpar|5á,onsumir|7án,eparar|6á,impiar|6é,uceder|6emos,uivocar|7án,ublicar|7á,endecir|7éis,esear|5ás,elear|5emos,nseguir|7ás,iseñar|6é,contrar|7emos,visar|5án,laticar|7ás,olgar|5emos,dornar|6é,evistar|7é,acudir|6éis,eñalar|6ás,sperar|6ás,nfluir|6é,positar|7ás,tilizar|7ás,ncender|7éis,legrar|6á,aciar|5emos,rever|5án,dmitir|6é,ituar|5éis,enovar|6án,licitar|7é,edicar|6án,ezclar|6á,frecer|6án,onducir|7ás,nseñar|6án,quillar|7án,enacer|6ás,cercar|6éis,emer|4ás,divinar|7án,reer|4án,almar|5emos,ralizar|7éis,xplicar|7ás,ratar|5á,onfesar|7ás,nvencer|7á,dificar|7án,yudar|5á,sminuir|7ás,urgir|5á,redecir|7ás,guantar|7éis,hocar|5á,vanzar|6é,equerir|7ás,nstruir|7án,asticar|7é,ondenar|7á,uemar|5án,scoger|6éis,eguntar|7ás,ganizar|7ás,roponer|5drás,fectuar|7ás,uardar|6án,legir|5án,rrollar|7á,rillar|6é,rseguir|7án,ubir|4ás,ntregar|7á,campar|6án,omar|4é,liviar|6á,onvenir|5dréis,mplear|6ás,nificar|7é,nfirmar|7é,ombatir|7ás,rrojar|6emos,ompetir|7emos,bortar|6án,municar|7ás,ibujar|6án,evolver|7án,eplicar|7á,aler|2dré,levar|5ás,umentar|7á,preciar|7é,ijar|4á,nojar|5ás,nventar|7á,esentar|7á,evelar|6án,uponer|4dremos,ogar|4é,rohibir|7é,rear|4ás,orregir|7á,omer|4emos,uidar|5ás,mprimir|7ás,tumbrar|7é,eriguar|7án,raducir|7ás,alir|2dré,burrir|6é,siasmar|7éis,lquilar|7é,ermitir|7ás,orir|4án,vejecer|7á,oder|2ré,erdonar|7emos,ecordar|7é,ontener|5dré,adurar|6emos,etestar|7ás,hismear|7éis,anar|4án,avar|4á,astimar|7emos,nfermar|7án,ingir|5á,nversar|7éis,ntinuar|7éis,ritar|5án,ncionar|7ás,obrar|5é,lmorzar|7ás,opiar|5án,ecoger|6ás,studiar|7án,mpartir|7án,alvar|5án,arcar|5án,ealizar|7ás,añer|4é,rreglar|7éis,ntentar|7ás,ucear|5á,oportar|7é,erder|5ás,ncantar|7é,ruzar|5é,niciar|6ás,echazar|7án,ragar|5éis,espirar|7ás,umplir|6emos,ecibir|6é,ñadir|5án,galizar|7á,epender|7ás,quistar|7á,olestar|7ás,nvocar|6ás,acticar|7ás,riticar|7á,eredar|6é,autizar|7án,nvadir|6á,epetir|6ás,btener|4drán,ntestar|7emos,xhibir|6éis,ravesar|7é,rabajar|7á,nstalar|7emos,menazar|7é,escar|5á,referir|7án,scuchar|7emos,bolizar|7é,teresar|7ás,plaudir|7án,iajar|5ás,talecer|7éis,xplorar|7á,omendar|7án,vorciar|7á,ancelar|7é,isitar|6é,dorar|5á,cabar|5án,argar|5án,eciclar|7ás,egalar|6á,ultivar|7á,vacuar|6ás,umar|4á,sfrutar|7ás,xpresar|7emos,elebrar|7án,nsultar|7án,estir|5ás,cificar|7ás,ensurar|7án,ecorar|6ás,efender|7éis,evantar|7emos,ugerir|6é,vilizar|7emos,ncluir|6án,antener|5dremos,harlar|6emos,amentar|7ás,tacar|5ás,rovocar|7á,educir|6éis,horcar|6ás,xponer|4drán,oseguir|7emos,nsuciar|7á,erecer|6éis,stigar|6án,edir|4emos,ejar|4á,cular|5ás,nsar|4á,otar|4ás,rcer|4án,rrer|4ás,pezar|5é,ustar|5á,vidar|5é,spirar|6án,manecer|7á,ñir|3ás,ostar|5é,añar|4á,quecer|6án,ociar|5ás,etar|4án,cinar|5án,nvertir|7é,aer|3é,ser|3é,formar|6é,olar|4á,anzar|5án,udar|4éis,scar|4é,servar|6ás,helar|5emos,aber|2rán,uchar|5é,blar|4é,cubrir|6á,igir|4é,tribuir|7á,conocer|7emos,grar|4án,decer|5án,vir|3án,strar|5é,minar|5é,usar|4ás,egar|4é,nder|4án,overse|4ás,terarse|5á,ncearse|5ás,ecarse|4á,reverse|5é,pararse|5emos,lamarse|5é,allarse|5án,eitarse|5á,ullirse|5án,uejarse|5é,darse|3á,tarse|3án,omit|4aré",exceptions:"dejar|5án,beber|5éis,renunciar|9án,yacer|5ás,oponer|4dremos,ir|2á,odiar|5é,andar|5emos,mandar|6á,introducir|10án,regir|5ás,constituir|10emos,cansar|6ás,parecer|7án,crecer|6é,cerrar|6ás,costar|6án,unir|4é,llorar|6án,extinguir|9emos,desagradar|10á,meter|5emos,errar|5án,acordar|7ás,reservar|8éis,hacer|2rás,desaparecer|11ás,criar|5án,vivir|5á,cenar|5án,pagar|5emos,amar|4ás,afirmar|7éis,tocar|5emos,jugar|5án,saltar|6ás,sentar|6án,oír|1irán,volar|5é,casar|5ás,atraer|6ás,apagar|6ás,herir|5é,entrar|6éis,montar|6emos,calentar|8á,abordar|7éis,consistir|9emos,pesar|5ás,faltar|6emos,aprobar|7án,huir|4éis,firmar|6án,venir|3dremos,bajar|5án,nadar|5án,oler|4ás,nacer|5é,describir|9án,leer|4é,jurar|5án,asistir|7é,tener|3drán,matar|5ás,rezar|5án,alentar|7ás,agradar|7án,coger|5á,sustituir|9ás,evitar|6ás,picar|5á,peinar|6emos,curar|5éis,echar|5é,tirar|5ás,arrepentirse|10éis,pasar|5éis,poner|3drás,acortar|7emos,pedir|5á,cesar|5éis,durar|5é,tardar|6éis,distinguir|10án,sentirse|6á,toser|5emos,insistir|8á,freír|3irá,bordar|6á,aplicar|7án,apretar|7é,verificar|9ás,batir|5é,detener|5dréis,seguir|6emos,clarificar|10éis,dar|3án,guiar|5á,sonar|5é,escribir|8éis,regar|5emos,robar|5éis,sacar|5é,mentir|6á,actuar|6á,mirar|5é,volver|6é,decir|1irá,reír|2irás,vencer|6ás,agradecer|9á,purificar|9é,deber|5é,cazar|5éis,sacrificar|10á,ofender|7emos,glorificar|10éis,parar|5án,abrir|5án,untar|5á,borrar|6emos,estimar|7é,contar|6á,cortar|6é,probar|6é,estar|5á,reinar|6éis,soler|5án,anunciar|8ás,producir|8á,reñir|5éis,besar|5é,gustar|6ás,aparecer|8á,ver|3é,inducir|7án,prepararse|8emos,mudarse|5á,convenir|6dréis,hallarse|6án,valer|3dré,salir|3dré",rev:"overás|4se,ncearás|5se,uerrás|3er,isfarás|4cer,eirás|1ír,pondrás|3er,ndremos|1er,réis|1,remos|1,rás|1,nterará|6se,uedará|5se,ecará|4se,feitará|6se,reirá|2ír,rá|1,onreiré|4ír,esharé|4cer,treveré|6se,lamaré|5se,omitaré|4,odré|2er,ntendré|4er,uejaré|5se,ré|1,untarán|5se,actarán|5se,ullirán|5se,abrán|2er,ndrán|1er,rán|1"},third:{rules:"bicar|5éis,abricar|7ás,apar|4emos,ceptar|6án,nsentir|7án,astar|5emos,estigar|7ás,omponer|5drás,omenzar|7á,raduar|6emos,lorecer|7án,ivertir|7án,esentir|7á,roteger|7ás,sificar|7á,intar|5é,egresar|7é,squiar|6ás,ontecer|7ás,otestar|7ás,spertar|7á,ducar|5á,onfiar|6á,namorar|7á,ufrir|5éis,onsejar|7emos,lustrar|7á,alcular|7é,egatear|7éis,omper|5emos,ailar|5éis,orcer|5éis,onreír|4irás,epillar|7é,eportar|7é,arrer|5án,epasar|6é,mportar|7é,ablecer|7emos,ormir|5é,erretir|7á,allar|5ás,rindar|6emos,nvitar|6éis,erendar|7án,ngañar|6án,urlar|5ás,nviar|5éis,obernar|7emos,xigir|5ás,riunfar|7emos,nmigrar|7é,uebrar|6á,uerer|3remos,nfadar|6éis,sayunar|7á,gorar|5á,legar|5án,isfacer|4rá,sgustar|7án,brazar|6é,scender|7emos,busar|5á,tirizar|7éis,lanchar|7án,andonar|7emos,olocar|6éis,uspirar|7ás,esolver|7é,dvertir|7á,orrer|5é,xportar|7ás,onjugar|7éis,retener|5drá,dmirar|6án,rrachar|7é,tenecer|7án,ecidir|6emos,omprar|6ás,horrar|6emos,oñar|4án,xtender|7án,atinar|6án,terizar|7é,poyar|5án,anejar|6án,ompañar|7ás,ticipar|7án,ariar|5é,adrar|5á,egular|6á,taminar|7emos,xplotar|7emos,ndicar|6án,lenar|5éis,evorar|6ás,ulpar|5emos,onsumir|7é,sustar|6emos,impiar|6éis,uceder|6ás,uivocar|7é,ublicar|7éis,endecir|7é,ntender|7éis,esear|5án,elear|5án,iquecer|7emos,egociar|7éis,nseguir|7án,rpretar|7á,contrar|7á,liminar|7ás,visar|5ás,bedecer|7éis,olgar|5á,dornar|6éis,evistar|7á,ocinar|6emos,acudir|6é,eñalar|6é,sperar|6án,jercer|6emos,nfluir|6éis,ncender|7é,legrar|6emos,aciar|5é,rever|5ás,dmitir|6á,ituar|5á,enovar|6emos,licitar|7á,edicar|6emos,frecer|6ás,onducir|7án,quillar|7emos,enacer|6án,cercar|6á,nformar|7emos,divinar|7á,reer|4é,iolar|5é,almar|5án,ralizar|7é,ratar|5án,onfesar|7éis,ausar|5éis,nvencer|7emos,dificar|7ás,sminuir|7án,urgir|5ás,redecir|7emos,guantar|7á,hocar|5án,vanzar|6á,equerir|7án,ntrolar|7án,ondenar|7é,uemar|5emos,eguntar|7é,roponer|5drán,fectuar|7án,legir|5ás,rrollar|7éis,revivir|7emos,rillar|6éis,rseguir|7emos,ubir|4án,campar|6é,omar|4á,liviar|6é,mplear|6éis,nificar|7emos,nfirmar|7á,ehusar|6án,rrojar|6án,ompetir|7é,bortar|6emos,municar|7án,ibujar|6éis,aludar|6é,evolver|7á,eplicar|7án,aler|2drá,levar|5án,preciar|7emos,ijar|4é,nojar|5é,nventar|7é,evelar|6ás,uscar|5ás,uponer|4dré,ogar|4éis,rohibir|7éis,rear|4emos,orregir|7emos,nservar|7éis,uidar|5éis,tumbrar|7éis,eriguar|7éis,raducir|7emos,sociar|6á,alir|2drán,lcanzar|7emos,burrir|6emos,ograr|5éis,siasmar|7ás,lquilar|7á,ermitir|7án,orir|4ás,vejecer|7é,oder|2rá,nhelar|6á,erdonar|7é,ecordar|7emos,ontener|5dréis,adurar|6á,etestar|7á,oblar|5éis,hismear|7é,anar|4ás,avar|4é,astimar|7é,nfermar|7é,ingir|5é,nversar|7á,scubrir|7ás,ntinuar|7emos,ncionar|7emos,obrar|5éis,ricular|7án,lmorzar|7á,opiar|5ás,ablar|5á,ecoger|6á,studiar|7ás,mpartir|7é,alvar|5é,ealizar|7emos,añer|4án,rreglar|7á,ucear|5é,oportar|7á,fligir|6á,erder|5á,erminar|7á,ruzar|5emos,niciar|6éis,echazar|7éis,ragar|5án,espirar|7án,umplir|6án,ecibir|6á,ñadir|5ás,galizar|7ás,epender|7éis,quistar|7án,olestar|7án,irigir|6éis,nvocar|6án,riticar|7é,eredar|6ás,autizar|7á,nvadir|6éis,epetir|6án,btener|4dremos,ntestar|7é,xhibir|6ás,ravesar|7á,nstalar|7éis,menazar|7á,escar|5án,referir|7ás,bolizar|7éis,teresar|7á,plaudir|7ás,talecer|7ás,gistrar|7án,xplorar|7éis,omendar|7ás,vorciar|7ás,ancelar|7emos,isitar|6éis,aquecer|7éis,dorar|5é,argar|5ás,egalar|6emos,ultivar|7é,avegar|6án,vacuar|6án,umar|4emos,sfrutar|7án,xpresar|7éis,elebrar|7ás,cificar|7á,espetar|7ás,ensurar|7á,ecorar|6é,efender|7é,ugerir|6éis,nfiscar|7á,ncluir|6ás,antener|5dré,harlar|6án,tacar|5á,rovocar|7emos,educir|6án,ascinar|7ás,xponer|4drás,oseguir|7án,nsuciar|7é,erecer|6á,arar|4éis,primir|6án,edir|4é,struir|6emos,nizar|5án,nsar|4é,pezar|5á,ostar|5éis,sultar|6é,meter|5án,vidar|5á,hacer|2rán,ñir|3án,altar|5á,igar|4emos,prender|7ás,onder|5emos,bordar|6é,señar|5ás,ilizar|6án,clar|4éis,aer|3á,mer|3án,plicar|6á,udar|4án,coger|5é,ardar|5á,regar|5é,venir|3dré,batir|5éis,mentar|6emos,aber|2réis,rcar|4éis,uchar|5án,adecer|6é,ajar|4emos,antar|5éis,ticar|5án,stir|4án,bar|3emos,itar|4emos,entar|5éis,overse|4án,terarse|5emos,uedarse|5ás,ncearse|5án,ecarse|4ás,reverse|5á,pararse|5án,lamarse|5emos,udarse|4é,allarse|5ás,eitarse|5é,ullirse|5emos,uejarse|5éis,tarse|3ás,omit|4arán",exceptions:"dejar|5ás,beber|5ás,renunciar|9emos,yacer|5éis,oponer|4drás,ir|2án,ser|3éis,odiar|5emos,andar|5ás,mandar|6emos,negar|5á,introducir|10ás,regir|5á,usar|4á,constituir|10á,aprender|8é,votar|5é,cansar|6éis,parecer|7éis,crecer|6éis,cerrar|6á,unir|4ás,llorar|6é,extinguir|9á,desagradecer|12ás,desagradar|10éis,errar|5emos,acordar|7án,reservar|8ás,servir|6ás,permanecer|10emos,mostrar|7á,desaparecer|11án,criar|5ás,vivir|5é,cenar|5ás,pagar|5é,amar|4éis,afirmar|7é,tocar|5éis,jugar|5ás,oír|1irá,volar|5éis,casar|5éis,atraer|6emos,apagar|6éis,herir|5éis,formar|6ás,entrar|6án,montar|6ás,notar|5án,pesar|5á,convertir|9á,huir|4é,firmar|6emos,bajar|5á,nadar|5emos,oler|4á,aspirar|7é,nacer|5ás,describir|9éis,leer|4emos,jurar|5ás,coser|5emos,tener|3drás,matar|5á,rezar|5é,bañar|5emos,lanzar|6ás,agradar|7ás,sustituir|9é,vender|6ás,picar|5emos,peinar|6á,curar|5án,echar|5éis,tirar|5emos,demostrar|9emos,arrepentirse|10é,pasar|5ás,amanecer|8é,poner|3dréis,acortar|7ás,pedir|5emos,cesar|5emos,cubrir|6éis,caminar|7á,durar|5ás,distinguir|10ás,preservar|9emos,luchar|6á,sentirse|6ás,helar|5éis,toser|5ás,insistir|8éis,freír|3iré,acostar|7án,apretar|7éis,verificar|9é,detener|5dré,seguir|6ás,clarificar|10á,dar|3emos,guiar|5é,sonar|5án,escribir|8á,robar|5é,sacar|5éis,mentir|6emos,invertir|8éis,actuar|6é,mirar|5á,distribuir|10emos,volver|6éis,decir|1irán,atender|7emos,reír|2irán,vencer|6á,purificar|9éis,deber|5á,cazar|5ás,sacrificar|10emos,ofender|7ás,glorificar|10ás,parar|5é,conocer|7é,abrir|5emos,untar|5emos,borrar|6é,estimar|7á,contar|6é,cortar|6á,estar|5é,reinar|6ás,soler|5emos,anunciar|8án,producir|8é,reñir|5é,hervir|6é,besar|5á,pegar|5á,gustar|6é,reconocer|9án,aparecer|8é,emigrar|7ás,ver|3ás,contribuir|10éis,inducir|7á,enterarse|7emos,hacer|2rán,llamarse|6emos,mudarse|5é,hallarse|6ás",rev:"overán|4se,ncearán|5se,esharán|4cer,pararán|5se,mitarán|3,pondrán|3er,aldrán|2ir,eirán|1ír,rán|1,nreirás|3ír,uedarás|5se,erremos|2er,ecarás|4se,untarás|5se,actarás|5se,liremos|3se,entirás|5se,ejaréis|4se,ndremos|1er,ndréis|1er,abréis|2er,ndrás|1er,rás|1,réis|1,remos|1,tisfará|5cer,treverá|6se,odrá|2er,drá|er,rá|1,feitaré|6se,pentiré|6se,reiré|2ír,vendré|3ir,ndré|1er,ré|1"},firstPlural:{rules:"bicar|5emos,abricar|7án,ceptar|6emos,nsentir|7á,astar|5éis,estigar|7é,omponer|5dré,omenzar|7é,raduar|6éis,lorecer|7ás,ivertir|7ás,esentir|7é,eprimir|7éis,roteger|7éis,sificar|7é,intar|5án,egresar|7ás,ontecer|7án,otestar|7éis,spertar|7ás,ducar|5éis,estruir|7án,onfiar|6ás,lonizar|7ás,namorar|7é,ufrir|5ás,onsejar|7éis,lustrar|7é,alcular|7emos,egatear|7emos,ensar|5éis,omper|5éis,ailar|5é,orcer|5emos,onreír|4irán,epillar|7án,eportar|7ás,arrer|5á,mpezar|6án,mportar|7éis,ablecer|7éis,erretir|7éis,allar|5á,ropezar|7emos,rindar|6éis,nvitar|6emos,erendar|7ás,ngañar|6emos,urlar|5á,nviar|5á,obernar|7é,xigir|5éis,riunfar|7éis,nmigrar|7á,uerer|3rá,nfadar|6emos,sayunar|7é,esultar|7án,gorar|5é,legar|5ás,isfacer|4ré,sgustar|7ás,brazar|6á,scender|7éis,busar|5án,onvidar|7ás,tirizar|7é,eshacer|4rás,andonar|7é,olocar|6emos,uspirar|7é,esolver|7ás,dvertir|7é,orrer|5éis,xportar|7é,onjugar|7emos,retener|5dré,dmirar|6á,rrachar|7á,tenecer|7é,ecidir|6éis,omprar|6éis,oñar|4emos,xtender|7ás,atinar|6éis,terizar|7á,poyar|5á,anejar|6ás,ompañar|7án,ariar|5á,lantar|6án,adrar|5ás,bligar|6án,taminar|7á,ndicar|6ás,lenar|5emos,evorar|6éis,ulpar|5án,eparar|6án,sustar|6éis,impiar|6á,uceder|6án,uivocar|7á,ublicar|7ás,endecir|7á,ntender|7emos,sponder|7á,esear|5éis,elear|5ás,iquecer|7éis,iseñar|6án,rpretar|7é,contrar|7é,liminar|7án,visar|5é,laticar|7emos,bedecer|7emos,olgar|5é,dornar|6ás,ocinar|6é,eñalar|6á,sperar|6éis,jercer|6ás,nfluir|6án,tilizar|7á,ncender|7á,legrar|6án,aciar|5á,rever|5emos,dmitir|6éis,ituar|5é,enovar|6á,licitar|7emos,edicar|6éis,ezclar|6ás,frecer|6é,onducir|7emos,nseñar|6emos,quillar|7é,enacer|6á,cercar|6é,emer|4emos,nformar|7éis,divinar|7é,reer|4á,iolar|5éis,almar|5ás,ralizar|7á,ratar|5ás,onfesar|7emos,ausar|5emos,nvencer|7éis,dificar|7é,sminuir|7éis,urgir|5emos,redecir|7éis,guantar|7é,hocar|5ás,ruñir|5á,vanzar|6éis,equerir|7é,ntrolar|7ás,nstruir|7á,asticar|7ás,uemar|5éis,scoger|6án,eguntar|7á,ganizar|7éis,roponer|5drá,fectuar|7á,legir|5á,rrollar|7emos,revivir|7á,rillar|6emos,ubir|4é,ntregar|7án,omar|4emos,liviar|6éis,onvenir|5drá,mplear|6emos,nificar|7éis,nfirmar|7ás,ehusar|6á,ombatir|7emos,rrojar|6ás,ompetir|7án,bortar|6éis,municar|7é,ibujar|6é,aludar|6á,evolver|7é,eplicar|7ás,aler|2drás,levar|5emos,umentar|7án,preciar|7ás,ijar|4ás,nojar|5éis,nventar|7éis,esentar|7án,evelar|6éis,uscar|5án,uponer|4drá,ogar|4emos,rohibir|7emos,rear|4é,orregir|7án,nservar|7é,omer|4ás,uidar|5emos,tumbrar|7emos,eriguar|7á,raducir|7éis,alir|2dréis,sconder|7éis,lcanzar|7á,burrir|6ás,ograr|5emos,siasmar|7án,lquilar|7éis,ermitir|7é,orir|4éis,vejecer|7emos,oder|2rás,scansar|7ás,nhelar|6é,erdonar|7á,ecordar|7ás,adurar|6é,etestar|7é,oblar|5án,hismear|7emos,anar|4á,avar|4emos,astimar|7á,nfermar|7emos,ingir|5ás,nversar|7é,scubrir|7án,ntinuar|7á,ritar|5éis,ncionar|7á,obrar|5ás,lmorzar|7éis,opiar|5emos,ablar|5ás,ecoger|6é,studiar|7emos,mpartir|7á,alvar|5á,ealizar|7éis,añer|4ás,rreglar|7é,ntentar|7é,ucear|5éis,oportar|7éis,fligir|6emos,erder|5é,ncantar|7emos,erminar|7éis,ruzar|5ás,niciar|6emos,echazar|7á,ragar|5ás,espirar|7éis,umplir|6ás,ecibir|6án,ñadir|5emos,galizar|7án,epender|7é,olestar|7éis,irigir|6án,acticar|7emos,riticar|7éis,eredar|6án,autizar|7é,nvadir|6án,epetir|6emos,btener|4dréis,ntestar|7á,xhibir|6é,ravesar|7emos,rabajar|7án,menazar|7ás,escar|5ás,referir|7é,bolizar|7á,talecer|7án,gistrar|7ás,xplorar|7emos,omendar|7é,vorciar|7án,ancelar|7ás,isitar|6ás,aquecer|7á,dorar|5éis,lvidar|6án,argar|5éis,eciclar|7emos,ultivar|7ás,avegar|6ás,vacuar|6é,umar|4éis,sfrutar|7é,nsultar|7emos,estir|5é,cificar|7é,espetar|7emos,ensurar|7é,ecorar|6éis,efender|7á,evantar|7á,ugerir|6án,vilizar|7ás,nfiscar|7éis,ncluir|6éis,harlar|6ás,amentar|7á,astigar|7éis,tacar|5é,educir|6ás,ascinar|7emos,xponer|4dréis,oseguir|7ás,nsuciar|7éis,erecer|6é,nunciar|7éis,arar|4á,uiar|4emos,edir|4á,ostar|5emos,ebrar|5é,meter|5ás,orrar|5á,enar|4éis,sitar|5éis,ular|4é,otar|4éis,aer|3éis,ociar|5é,sistir|6ás,istar|5ás,udir|4á,ajar|4é,oser|4án,plicar|6é,udar|4ás,ardar|5é,einar|5é,cortar|6án,ntener|4drá,rcar|4emos,vocar|5éis,alar|4ás,resar|5é,oler|4é,par|3éis,asar|4á,mir|3á,bar|3éis,rificar|7án,guir|4é,char|4ás,overse|4éis,terarse|5éis,ncearse|5é,ecarse|4án,reverse|5ás,untarse|5á,pararse|5ás,lamarse|5á,actarse|5éis,allarse|5emos,eitarse|5emos,ullirse|5é,uejarse|5án,darse|3án,omit|4ará",exceptions:"dejar|5é,beber|5án,yacer|5é,oponer|4dréis,ir|2ás,ser|3ás,odiar|5án,andar|5án,mandar|6é,negar|5emos,introducir|10á,regir|5é,usar|4é,constituir|10é,aprender|8á,votar|5á,cansar|6é,parecer|7emos,crecer|6emos,cerrar|6é,unir|4án,llorar|6á,desagradecer|12éis,desagradar|10ás,errar|5éis,acordar|7é,reservar|8án,hacer|2ré,servir|6á,permanecer|10éis,mostrar|7emos,desaparecer|11á,criar|5é,vivir|5ás,teñir|5éis,pagar|5á,amar|4emos,afirmar|7emos,tocar|5á,jugar|5éis,saltar|6éis,sentar|6é,oír|1iremos,volar|5án,apagar|6emos,herir|5emos,comprender|10éis,formar|6án,entrar|6emos,montar|6án,calentar|8é,abordar|7á,pesar|5é,faltar|6é,convertir|9ás,huir|4á,firmar|6éis,venir|3drás,nadar|5éis,aspirar|7á,nacer|5án,traer|5ás,describir|9á,leer|4éis,jurar|5éis,tener|3dré,matar|5é,rezar|5á,bañar|5ás,lanzar|6emos,alentar|7emos,agradar|7emos,coger|5ás,sustituir|9éis,evitar|6á,vender|6é,picar|5éis,curar|5ás,echar|5emos,tirar|5á,demostrar|9án,arrepentirse|10á,amanecer|8án,poner|3drá,pedir|5án,cesar|5án,cubrir|6emos,caber|3remos,caminar|7emos,durar|5emos,sorprender|10é,distinguir|10éis,preservar|9éis,sentirse|6án,helar|5ás,insistir|8án,freír|3iréis,acostar|7ás,bordar|6emos,apretar|7án,batir|5án,detener|5drá,clarificar|10é,dar|3éis,sonar|5ás,escribir|8é,regar|5á,robar|5ás,sacar|5emos,mentir|6ás,invertir|8emos,actuar|6éis,mirar|5án,distribuir|10éis,volver|6án,decir|1irás,atender|7á,saber|3rá,reír|2iremos,vencer|6é,agradecer|9emos,deber|5ás,cazar|5án,padecer|7á,sacrificar|10ás,ofender|7án,conocer|7á,abrir|5éis,untar|5éis,estimar|7emos,contar|6ás,estar|5emos,producir|8emos,reñir|5emos,hervir|6emos,besar|5ás,pegar|5éis,gustar|6á,reconocer|9ás,aparecer|8ás,emigrar|7é,ver|3án,contribuir|10emos,inducir|7é,enterarse|7éis,juntarse|6á,hallarse|6emos,afeitarse|7emos",rev:"overéis|4se,esharás|4cer,reverás|5se,pararás|5se,endrás|2ir,ctaréis|4se,aldrás|2er,aldréis|2ir,odrás|2er,abremos|2er,reiréis|2ír,eiremos|1ír,ndréis|1er,remos|1,rás|1,réis|1,nreirán|3ír,uedarán|5se,ecarán|4se,udarán|4se,entirán|5se,uejarán|5se,rán|1,oncearé|6se,tisfaré|5cer,bulliré|6se,ndré|1er,ré|1,uerrá|3er,lamará|5se,omitará|4,nvendrá|4ir,pentirá|6se,abrá|2er,ndrá|1er,rá|1"},secondPlural:{rules:"bicar|5á,abricar|7á,apar|4ás,ceptar|6éis,nsentir|7é,astar|5án,omponer|5drá,omenzar|7éis,raduar|6ás,lorecer|7emos,ivertir|7é,esentir|7ás,eprimir|7emos,roteger|7á,sificar|7án,intar|5emos,squiar|6á,ontecer|7éis,otestar|7án,spertar|7án,ducar|5ás,estruir|7ás,onfiar|6án,namorar|7án,ufrir|5án,onsejar|7án,lustrar|7án,alcular|7éis,egatear|7án,ensar|5ás,omper|5ás,ailar|5á,orcer|5á,onreír|4irá,epillar|7ás,eportar|7án,arrer|5é,mpezar|6ás,epasar|6éis,mportar|7ás,ablecer|7á,ormir|5emos,allar|5é,ropezar|7án,rindar|6ás,nvitar|6ás,erendar|7é,ngañar|6é,nviar|5é,obernar|7á,xigir|5emos,riunfar|7á,nmigrar|7emos,uebrar|6án,uerer|3ré,nfadar|6án,sayunar|7éis,esultar|7ás,gorar|5éis,legar|5emos,isfacer|4réis,sgustar|7emos,brazar|6án,scender|7án,busar|5ás,onvidar|7án,tirizar|7emos,eshacer|4réis,lanchar|7á,andonar|7á,olocar|6ás,uspirar|7á,esolver|7án,dvertir|7án,orrer|5á,xportar|7á,dmirar|6é,rrachar|7án,tenecer|7á,ecidir|6é,omprar|6á,horrar|6é,oñar|4é,xtender|7emos,postar|6án,atinar|6á,terizar|7án,poyar|5é,anejar|6emos,ompañar|7éis,ticipar|7á,ariar|5án,lantar|6ás,adrar|5án,egular|6ás,bligar|6ás,taminar|7é,xplotar|7é,ndicar|6emos,evorar|6á,ulpar|5ás,onsumir|7éis,sustar|6ás,impiar|6ás,uceder|6á,uivocar|7emos,ublicar|7án,endecir|7án,sponder|7éis,esear|5á,elear|5á,iquecer|7á,egociar|7á,nseguir|7éis,rpretar|7éis,contrar|7ás,liminar|7éis,visar|5á,laticar|7á,bedecer|7é,olgar|5ás,dornar|6án,evistar|7án,eñalar|6emos,sperar|6emos,jercer|6é,nfluir|6ás,positar|7é,tilizar|7é,ncender|7ás,legrar|6ás,aciar|5ás,rever|5é,dmitir|6emos,ituar|5án,enovar|6é,licitar|7ás,edicar|6é,ezclar|6án,frecer|6á,onducir|7á,quillar|7á,enacer|6é,cercar|6án,nformar|7ás,divinar|7emos,reer|4emos,iolar|5án,almar|5é,ralizar|7ás,onfesar|7á,ausar|5é,nvencer|7ás,dificar|7á,yudar|5emos,sminuir|7á,urgir|5án,redecir|7é,guantar|7ás,hocar|5é,ruñir|5é,vanzar|6án,equerir|7éis,ntrolar|7é,nstruir|7é,asticar|7éis,uemar|5é,scoger|6á,eguntar|7éis,roponer|5dré,fectuar|7é,uardar|6éis,legir|5é,rrollar|7án,rillar|6án,rseguir|7á,ubir|4á,campar|6emos,omar|4án,liviar|6án,mplear|6é,nificar|7ás,ehusar|6é,ombatir|7á,rrojar|6é,bortar|6é,municar|7á,ibujar|6á,aludar|6án,eplicar|7é,aler|2dremos,levar|5é,umentar|7éis,preciar|7án,ijar|4án,nojar|5emos,nventar|7ás,esentar|7ás,evelar|6emos,uscar|5emos,uponer|4dréis,ogar|4án,rohibir|7án,rear|4á,orregir|7ás,nservar|7á,uidar|5é,mprimir|7é,tumbrar|7ás,eriguar|7é,raducir|7á,sociar|6éis,alir|2drás,sconder|7á,lcanzar|7é,burrir|6án,ograr|5á,siasmar|7á,lquilar|7án,ermitir|7á,orir|4á,vejecer|7ás,oder|2rán,scansar|7án,erdonar|7ás,ecordar|7án,adurar|6ás,etestar|7éis,oblar|5ás,hismear|7ás,anar|4é,avar|4án,nfermar|7á,ingir|5án,nversar|7ás,scubrir|7é,ntinuar|7é,ritar|5á,ncionar|7é,obrar|5án,ricular|7á,lmorzar|7é,opiar|5á,ablar|5án,ecoger|6éis,studiar|7á,mpartir|7emos,alvar|5ás,ealizar|7á,añer|4éis,rreglar|7emos,ntentar|7á,ucear|5án,oportar|7ás,erder|5emos,ncantar|7án,erminar|7ás,ruzar|5án,niciar|6á,echazar|7é,espirar|7é,umplir|6á,ecibir|6ás,ñadir|5á,galizar|7emos,epender|7á,quistar|7éis,olestar|7é,nvocar|6é,acticar|7é,riticar|7án,eredar|6éis,autizar|7emos,epetir|6éis,btener|4drá,ntestar|7ás,xhibir|6á,ravesar|7án,rabajar|7ás,nstalar|7é,menazar|7án,escar|5éis,referir|7á,bolizar|7án,plaudir|7é,iajar|5á,talecer|7emos,gistrar|7emos,xplorar|7án,omendar|7á,vorciar|7emos,aquecer|7é,dorar|5ás,cabar|5é,lvidar|6ás,argar|5á,eciclar|7á,egalar|6án,ultivar|7án,avegar|6emos,vacuar|6á,umar|4án,sfrutar|7á,xpresar|7án,elebrar|7á,nsultar|7éis,estir|5á,cificar|7éis,espetar|7é,ensurar|7emos,ecorar|6á,efender|7ás,evantar|7é,ugerir|6ás,vilizar|7éis,nfiscar|7ás,ncluir|6á,amentar|7é,tacar|5éis,rovocar|7ás,educir|6é,xponer|4dremos,oseguir|7é,nsuciar|7án,erecer|6emos,arar|4é,stigar|6á,resar|5éis,nizar|5á,etir|4ás,rlar|4é,meter|5á,eservar|7é,jugar|5á,etener|4drán,parecer|7é,firmar|6án,sitar|5án,asar|4é,agar|4á,prender|7á,enar|4án,tender|6é,señar|5á,cinar|5á,mer|3é,plicar|6éis,atar|4emos,regar|5ás,venir|3drán,ntener|4drás,stimar|6ás,rcar|4é,uchar|5á,igir|4ás,tribuir|7án,robar|5án,vir|3éis,ver|3emos,elar|4án,dir|3ás,overse|4é,terarse|5án,uedarse|5emos,ncearse|5emos,ecarse|4emos,reverse|5án,pararse|5é,lamarse|5án,udarse|4ás,allarse|5á,eitarse|5ás,ullirse|5á,uejarse|5ás,tarse|3é,omit|4aremos",exceptions:"dejar|5á,beber|5é,renunciar|9é,yacer|5emos,oponer|4drá,ir|2éis,ser|3án,odiar|5ás,andar|5éis,mandar|6án,negar|5án,introducir|10é,regir|5án,usar|4éis,constituir|10éis,aprender|8emos,votar|5éis,cansar|6á,crecer|6án,cerrar|6emos,costar|6é,unir|4emos,llorar|6éis,extinguir|9án,desagradecer|12é,desagradar|10án,errar|5é,acordar|7á,hacer|2rá,servir|6é,permanecer|10án,mostrar|7án,criar|5á,teñir|5emos,cenar|5é,pagar|5án,amar|4é,tocar|5ás,saltar|6é,sentar|6á,oír|1irás,volar|5ás,atraer|6é,herir|5án,formar|6éis,entrar|6é,montar|6á,calentar|8án,abordar|7án,notar|5á,consistir|9é,pesar|5éis,faltar|6án,aprobar|7á,convertir|9án,huir|4ás,firmar|6é,bajar|5éis,nadar|5é,oler|4éis,aspirar|7emos,nacer|5éis,traer|5éis,describir|9é,leer|4án,jurar|5emos,coser|5ás,asistir|7éis,tener|3drá,rezar|5éis,bañar|5án,lanzar|6á,alentar|7é,agradar|7á,coger|5án,sustituir|9emos,evitar|6é,vender|6emos,picar|5ás,peinar|6án,curar|5á,echar|5án,tirar|5é,demostrar|9ás,arrepentirse|10án,amanecer|8ás,poner|3dré,acortar|7é,dudar|5á,cesar|5é,cubrir|6ás,caber|3rá,caminar|7án,durar|5éis,tardar|6emos,distinguir|10á,luchar|6emos,sentirse|6é,toser|5á,insistir|8ás,freír|3irán,acostar|7emos,bordar|6ás,apretar|7ás,caer|4án,verificar|9á,batir|5ás,seguir|6á,clarificar|10án,dar|3é,guiar|5ás,sonar|5éis,escribir|8ás,sacar|5án,mentir|6án,invertir|8ás,actuar|6ás,mirar|5ás,decir|1iremos,saber|3ré,reír|2iréis,vencer|6emos,agradecer|9ás,purificar|9ás,deber|5án,cazar|5á,padecer|7emos,sacrificar|10án,ofender|7é,glorificar|10á,parar|5éis,conocer|7án,abrir|5á,untar|5án,borrar|6ás,contar|6án,cortar|6ás,estar|5éis,reinar|6á,soler|5á,anunciar|8á,producir|8án,reñir|5án,besar|5án,pegar|5án,gustar|6éis,reconocer|9á,aparecer|8án,emigrar|7á,inducir|7emos,quedarse|6emos,secarse|5emos,prepararse|8é,vomit|5aremos",rev:"overé|4se,uerré|3er,untaré|5se,actaré|5se,abré|2er,pondré|3er,ré|1,terarán|5se,reverán|5se,lamarán|5se,odrán|2er,reirán|2ír,tendrán|3er,vendrán|3ir,rán|1,onreirá|4ír,allará|5se,abrá|2er,bullirá|6se,ndrá|1er,rá|1,earemos|3se,sfaréis|3cer,sharéis|3cer,udarás|4se,eitarás|5se,ondréis|2er,aldrás|2ir,uejarás|5se,eiréis|1ír,dremos|er,tendrás|3er,remos|1,réis|1,rás|1"},thirdPlural:{rules:"bicar|5é,abricar|7é,apar|4án,ceptar|6é,nsentir|7emos,astar|5ás,estigar|7emos,omponer|5dréis,omenzar|7án,raduar|6án,lorecer|7á,ivertir|7éis,esentir|7án,eprimir|7ás,roteger|7é,sificar|7ás,intar|5éis,squiar|6é,ontecer|7emos,spertar|7éis,ducar|5án,onfiar|6éis,namorar|7éis,ufrir|5emos,onsejar|7ás,lustrar|7ás,alcular|7á,egatear|7ás,ensar|5án,omper|5án,ailar|5emos,orcer|5é,onreír|4iremos,epillar|7emos,eportar|7emos,arrer|5éis,mportar|7án,ablecer|7é,ormir|5éis,erretir|7án,allar|5emos,ropezar|7ás,rindar|6án,nvitar|6án,erendar|7á,ngañar|6á,urlar|5emos,obernar|7éis,xigir|5á,riunfar|7é,nmigrar|7éis,uerer|3réis,nfadar|6ás,sayunar|7án,esultar|7emos,rometer|7emos,gorar|5emos,legar|5éis,isfacer|4remos,sgustar|7éis,brazar|6emos,scender|7ás,busar|5éis,onvidar|7emos,tirizar|7á,lanchar|7é,andonar|7éis,olocar|6án,dvertir|7ás,orrer|5emos,xportar|7emos,rrachar|7ás,tenecer|7emos,ecidir|6á,omprar|6é,horrar|6éis,oñar|4á,postar|6ás,atinar|6é,terizar|7ás,poyar|5éis,cesitar|7ás,ompañar|7emos,ticipar|7é,ariar|5ás,lantar|6emos,adrar|5éis,egular|6án,bligar|6éis,taminar|7éis,xplotar|7á,ndicar|6éis,evorar|6é,ulpar|5éis,onsumir|7emos,sustar|6án,impiar|6án,uceder|6é,uivocar|7éis,endecir|7ás,ntender|7á,esear|5é,elear|5é,iquecer|7é,nseguir|7emos,iseñar|6éis,contrar|7án,liminar|7emos,visar|5emos,laticar|7éis,bedecer|7á,olgar|5án,dornar|6emos,evistar|7éis,ocinar|6éis,acudir|6án,sperar|6á,jercer|6á,nfluir|6emos,positar|7á,tilizar|7emos,ncender|7án,legrar|6éis,aciar|5án,rever|5á,dmitir|6án,ituar|5ás,enovar|6éis,licitar|7án,edicar|6á,ezclar|6emos,frecer|6emos,nseñar|6é,quillar|7éis,enacer|6éis,cercar|6ás,emer|4éis,nformar|7án,divinar|7éis,reer|4éis,iolar|5ás,almar|5á,ralizar|7án,onfesar|7é,ausar|5á,nvencer|7án,dificar|7emos,yudar|5éis,sminuir|7é,redecir|7á,guantar|7án,hocar|5emos,ruñir|5éis,vanzar|6ás,ntrolar|7éis,asticar|7emos,uemar|5á,scoger|6ás,eguntar|7emos,roponer|5dremos,fectuar|7éis,uardar|6emos,rrollar|7ás,revivir|7é,rillar|6ás,rseguir|7éis,ubir|4éis,ntregar|7éis,campar|6ás,omar|4ás,onvenir|5drás,mplear|6á,nificar|7án,nfirmar|7éis,ehusar|6emos,ombatir|7é,bortar|6á,municar|7éis,ibujar|6emos,aludar|6ás,aler|2drán,levar|5á,umentar|7ás,preciar|7éis,ijar|4éis,nventar|7án,evelar|6á,uscar|5éis,uponer|4drás,ogar|4ás,rohibir|7ás,rear|4éis,omer|4á,uidar|5á,mprimir|7éis,tumbrar|7án,eriguar|7emos,raducir|7é,alir|2drá,lcanzar|7éis,burrir|6éis,ograr|5é,siasmar|7é,lquilar|7ás,ermitir|7éis,orir|4é,vejecer|7án,oder|2remos,scansar|7éis,nhelar|6ás,erdonar|7án,ecordar|7éis,hismear|7án,anar|4emos,avar|4ás,nfermar|7éis,nversar|7án,scubrir|7emos,ntinuar|7ás,ritar|5é,ncionar|7éis,obrar|5emos,ricular|7éis,lmorzar|7emos,opiar|5é,ecoger|6emos,studiar|7é,mpartir|7éis,alvar|5éis,ealizar|7é,añer|4emos,rreglar|7ás,ntentar|7emos,ucear|5ás,oportar|7án,fligir|6án,erder|5éis,ncantar|7ás,erminar|7án,ruzar|5éis,niciar|6é,echazar|7emos,espirar|7á,umplir|6é,ecibir|6emos,ñadir|5é,galizar|7éis,epender|7án,quistar|7emos,olestar|7á,irigir|6emos,nvocar|6á,acticar|7á,riticar|7ás,eredar|6emos,autizar|7éis,nvadir|6emos,btener|4dré,ntestar|7án,xhibir|6án,ravesar|7ás,nstalar|7á,menazar|7éis,escar|5emos,scuchar|7é,bolizar|7ás,plaudir|7éis,talecer|7á,gistrar|7á,xplorar|7ás,omendar|7emos,vorciar|7é,ancelar|7éis,isitar|6emos,aquecer|7emos,dorar|5án,cabar|5á,lvidar|6éis,argar|5é,eciclar|7é,ultivar|7éis,avegar|6éis,vacuar|6emos,umar|4ás,sfrutar|7éis,xpresar|7ás,nsultar|7á,cificar|7emos,espetar|7á,ensurar|7éis,ecorar|6emos,efender|7án,evantar|7ás,vilizar|7á,nfiscar|7án,ncluir|6é,harlar|6á,amentar|7éis,astigar|7é,tacar|5emos,rovocar|7án,educir|6á,ascinar|7é,xponer|4drá,oseguir|7á,nsuciar|7ás,erecer|6án,ejar|4éis,resar|5emos,edir|4án,testar|6emos,struir|6éis,nizar|5é,ezar|4emos,viar|4ás,ebrar|5éis,hacer|2remos,servar|6emos,jugar|5é,etener|4drás,parecer|7emos,tender|6éis,agar|4é,enar|4ás,onder|5é,ociar|5emos,pretar|6emos,alar|4éis,nducir|6éis,oser|4éis,atar|4éis,ojar|4á,petir|5á,sentar|6emos,ntener|4drán,durar|5án,blar|4emos,stimar|6án,rcar|4á,tribuir|7ás,adecer|6éis,ajar|4éis,arar|4emos,asar|4emos,ver|3éis,stir|4emos,erir|4emos,irar|4éis,licar|5emos,gir|3éis,overse|4á,terarse|5ás,uedarse|5éis,ncearse|5á,ecarse|4éis,reverse|5emos,untarse|5éis,pararse|5á,lamarse|5ás,udarse|4emos,actarse|5á,allarse|5é,eitarse|5án,uejarse|5emos,irse|2éis,omit|4arás",exceptions:"beber|5á,renunciar|9á,yacer|5á,oponer|4dré,ir|2emos,ser|3emos,odiar|5éis,andar|5á,mandar|6ás,negar|5ás,introducir|10éis,usar|4emos,constituir|10án,aprender|8éis,votar|5emos,cansar|6emos,parecer|7á,crecer|6ás,cerrar|6éis,costar|6á,unir|4éis,llorar|6emos,extinguir|9ás,desagradecer|12á,desagradar|10emos,meter|5é,errar|5á,acordar|7emos,servir|6emos,permanecer|10ás,mostrar|7ás,criar|5emos,vivir|5emos,teñir|5á,cenar|5á,pagar|5ás,amar|4á,afirmar|7ás,tocar|5án,saltar|6emos,oír|1iré,volar|5emos,atraer|6á,herir|5ás,comprender|10é,formar|6emos,entrar|6á,montar|6é,calentar|8ás,abordar|7ás,notar|5é,consistir|9á,pesar|5emos,faltar|6ás,aprobar|7é,convertir|9emos,huir|4án,firmar|6á,venir|3drá,bajar|5emos,nadar|5á,oler|4emos,nacer|5emos,traer|5án,describir|9emos,leer|4ás,jurar|5é,tener|3dremos,bañar|5éis,lanzar|6é,alentar|7á,agradar|7é,coger|5éis,sustituir|9á,evitar|6éis,vender|6á,picar|5án,peinar|6ás,curar|5é,echar|5ás,demostrar|9éis,arrepentirse|10ás,amanecer|8éis,poner|3dremos,acortar|7á,pedir|5éis,dudar|5é,cesar|5á,cubrir|6án,caber|3ré,caminar|7ás,sorprender|10emos,tardar|6án,distinguir|10é,preservar|9á,luchar|6éis,helar|5é,freír|3irás,acostar|7éis,bordar|6án,caer|4ás,verificar|9éis,batir|5emos,seguir|6éis,clarificar|10ás,dar|3á,guiar|5án,duchar|6emos,sonar|5emos,escribir|8án,regar|5án,robar|5emos,sacar|5ás,mentir|6éis,invertir|8án,actuar|6án,mirar|5emos,volver|6ás,decir|1iréis,saber|3rás,reír|2irá,vencer|6éis,purificar|9emos,deber|5emos,cazar|5é,sacrificar|10éis,ofender|7á,glorificar|10emos,conocer|7ás,abrir|5é,untar|5ás,borrar|6án,contar|6emos,cortar|6éis,probar|6ás,estar|5án,reinar|6emos,soler|5éis,anunciar|8é,producir|8ás,reñir|5ás,hervir|6ás,besar|5éis,pegar|5ás,gustar|6emos,reconocer|9é,emigrar|7emos,deshacer|5remos,hacer|2remos,juntarse|6éis,mudarse|5emos,sentirse|6éis,quejarse|6emos",rev:"ondréis|2er,terarás|5se,eiremos|1ír,edaréis|4se,uerréis|3er,faremos|2cer,ecaréis|4se,veremos|3se,lamarás|5se,mitarás|3,vendrás|3ir,entirás|5se,odremos|2er,lliréis|4se,reirás|2ír,abrás|2er,ndrás|1er,ndremos|1er,rás|1,réis|1,remos|1,overá|4se,onceará|6se,eparará|6se,actará|5se,eirá|1ír,xpondrá|4er,drá|ir,rá|1,allaré|5se,abré|2er,ndré|1er,ré|1,eitarán|5se,drán|er,rán|1"}},conditional:{first:{rules:"bicar|5ías,abricar|7ían,apar|4ía,ceptar|6ías,nsentir|7íamos,astar|5íais,estigar|7íais,omponer|5dría,omenzar|7ías,raduar|6íamos,lorecer|7ían,ivertir|7ía,esentir|7ía,eprimir|7íais,roteger|7ías,sificar|7íamos,intar|5ía,egresar|7ían,squiar|6íais,espedir|7íais,ontecer|7íamos,otestar|7íais,spertar|7ían,ducar|5ía,estruir|7ían,onfiar|6íais,lonizar|7íais,egatear|7ían,ensar|5íais,omper|5ía,orcer|5íais,epillar|7ías,eportar|7íais,epasar|6íais,mportar|7íais,ablecer|7íais,ormir|5íamos,allar|5íamos,rindar|6íais,nviar|5íais,obernar|7ían,riunfar|7íamos,nmigrar|7íamos,uebrar|6íais,uerer|3ríamos,sayunar|7ías,esultar|7ía,rometer|7íais,gorar|5ían,legar|5íais,isfacer|4ríais,brazar|6íamos,busar|5ían,tirizar|7íais,lanchar|7ía,andonar|7ías,olocar|6íais,uspirar|7íamos,esolver|7íais,dvertir|7íamos,xportar|7íamos,onjugar|7íamos,retener|5drías,dmirar|6ía,rrachar|7ían,tenecer|7íais,ecidir|6íamos,omprar|6ías,horrar|6ías,oñar|4íais,xtender|7íais,atinar|6ías,terizar|7ían,poyar|5ían,cesitar|7ía,ompañar|7íamos,ticipar|7íais,ariar|5íamos,lantar|6íamos,adrar|5íamos,egular|6íais,bligar|6ía,taminar|7íamos,xplotar|7ía,ndicar|6íamos,lenar|5ían,ulpar|5íamos,onsumir|7ía,eparar|6íais,sustar|6ía,impiar|6ía,uceder|6ías,ublicar|7ían,endecir|7ían,ntender|7ías,sponder|7íais,egociar|7ían,nseguir|7íais,iseñar|6ía,rpretar|7íamos,liminar|7íamos,visar|5íais,laticar|7íais,bedecer|7ías,olgar|5íamos,dornar|6ía,evistar|7ías,ocinar|6íais,acudir|6ía,eñalar|6íamos,sperar|6íamos,jercer|6ía,nfluir|6ía,positar|7íais,tilizar|7ían,legrar|6ían,aciar|5ían,rever|5ía,dmitir|6íais,enovar|6ías,licitar|7ía,edicar|6íais,ezclar|6íais,frecer|6ía,nseñar|6íamos,quillar|7ían,enacer|6íais,cercar|6ías,emer|4íamos,nformar|7íais,divinar|7ía,iolar|5ías,almar|5ían,ralizar|7íais,ratar|5ías,onfesar|7ía,ausar|5ía,nvencer|7íais,dificar|7ías,sminuir|7íais,urgir|5ía,redecir|7ía,guantar|7ían,hocar|5ía,ruñir|5íais,equerir|7íamos,ntrolar|7íais,nstruir|7íais,asticar|7íamos,uemar|5íais,scoger|6íamos,eguntar|7íais,ganizar|7ía,roponer|5dríais,fectuar|7íamos,uardar|6ían,legir|5ías,rrollar|7ían,revivir|7íamos,rillar|6íamos,rseguir|7íamos,ubir|4ía,ntregar|7ías,campar|6íais,omar|4ías,liviar|6ía,onvenir|5drían,nificar|7ía,nfirmar|7ía,ehusar|6ías,ombatir|7íais,rrojar|6ía,ompetir|7ían,bortar|6ías,municar|7ía,ibujar|6ías,evolver|7ían,aler|2dríais,levar|5ía,umentar|7íais,preciar|7íais,ijar|4íamos,nojar|5íamos,nventar|7ías,esentar|7íamos,evelar|6íais,uscar|5íais,uponer|4drías,ogar|4ías,orregir|7ía,nservar|7ía,omer|4ías,uidar|5ías,mprimir|7íamos,tumbrar|7íamos,eriguar|7íais,raducir|7íamos,sociar|6íamos,alir|2dría,sconder|7íamos,lcanzar|7íamos,ograr|5íamos,siasmar|7íais,ermitir|7íamos,vejecer|7ía,oder|2rías,scansar|7íamos,nhelar|6ías,erdonar|7íamos,ecordar|7ía,ontener|5dríais,adurar|6ían,etestar|7ías,hismear|7ían,anar|4ían,avar|4íamos,astimar|7íamos,nfermar|7íais,ingir|5íais,nversar|7ías,scubrir|7ía,ntinuar|7ían,ritar|5ía,ncionar|7íais,obrar|5íais,lmorzar|7íais,opiar|5ían,ecoger|6íais,studiar|7ían,mpartir|7ías,alvar|5íais,arcar|5ían,ealizar|7íamos,añer|4íamos,rreglar|7ía,ntentar|7ía,ucear|5ías,oportar|7ías,fligir|6ía,erder|5ías,ncantar|7ías,erminar|7ías,ruzar|5íais,niciar|6ían,echazar|7íais,ragar|5ían,espirar|7ía,umplir|6ías,galizar|7ías,epender|7íais,quistar|7ía,olestar|7ías,nvocar|6ías,acticar|7íais,riticar|7ías,eredar|6íais,autizar|7ían,btener|4dríamos,ntestar|7íamos,xhibir|6ían,ravesar|7ían,nstalar|7ía,menazar|7íamos,escar|5íamos,bolizar|7ía,plaudir|7íamos,talecer|7ía,xplorar|7ían,vorciar|7íais,ancelar|7ían,isitar|6ías,argar|5ía,eciclar|7íamos,egalar|6ían,ultivar|7ía,avegar|6ías,vacuar|6íamos,umar|4ía,sfrutar|7íamos,elebrar|7íamos,nsultar|7íamos,estir|5íamos,cificar|7ían,espetar|7íais,ensurar|7íamos,efender|7ía,evantar|7íamos,vilizar|7íais,nfiscar|7ía,ncluir|6íamos,antener|5dría,amentar|7ías,astigar|7íamos,tacar|5íamos,educir|6íais,ascinar|7ías,horcar|6íamos,xponer|4dríamos,oseguir|7ías,nsuciar|7íais,erecer|6ía,eber|4ía,arar|4ías,roducir|7ías,ejar|4ía,cular|5ía,prender|7íamos,ilar|4ían,reír|2iríais,errar|5íamos,rrer|4íais,pezar|5ían,etir|4íamos,vitar|5íamos,endar|5ías,añar|4íais,rlar|4ía,igir|4ías,gustar|6íamos,cender|6íais,vidar|5ía,hacer|2ría,enar|4ía,ostar|5ías,vocar|5íamos,alentar|7íamos,quecer|6ías,tuar|4ía,nducir|6íamos,eer|3ía,plicar|6íamos,udar|4íais,anzar|5ían,einar|5íamos,blar|4ía,uchar|5ía,adir|4ía,ajar|4ía,resar|5ías,oler|4ías,adar|4íais,bar|3íamos,orar|4íais,trar|4ía,ear|3íamos,ibir|4íais,rir|3íais,overse|4íais,terarse|5ían,uedarse|5ías,ncearse|5ían,ecarse|4íamos,reverse|5ías,untarse|5íais,pararse|5íamos,lamarse|5íais,udarse|4íamos,actarse|5íamos,allarse|5ían,eitarse|5ía,ullirse|5ía,uejarse|5ía,omit|4arían",exceptions:"dejar|5ían,renunciar|9íais,yacer|5íamos,oponer|4dríamos,ir|2ían,ser|3ía,odiar|5íais,andar|5ía,mandar|6ían,negar|5ía,regir|5íamos,usar|4íamos,constituir|10íais,votar|5íamos,cansar|6ía,parecer|7íais,crecer|6íamos,costar|6ían,unir|4ía,llorar|6íamos,extinguir|9íais,desagradecer|12ían,meter|5ían,acordar|7íais,reservar|8ías,servir|6íamos,permanecer|10íamos,mostrar|7ías,desaparecer|11íamos,criar|5ían,vivir|5ían,teñir|5ías,pagar|5íais,amar|4íamos,afirmar|7ías,medir|5ías,tocar|5ía,jugar|5ían,saltar|6íamos,sentar|6íais,oír|1iría,volar|5íamos,casar|5ías,atraer|6íais,apagar|6íamos,herir|5ías,comprender|10ían,formar|6ías,entrar|6ías,montar|6íais,abordar|7ían,notar|5ían,consistir|9ían,pesar|5íais,faltar|6ías,convertir|9íais,huir|4ía,firmar|6íais,venir|3drías,bajar|5ías,nadar|5íamos,aspirar|7ías,nacer|5íamos,traer|5ía,jurar|5íais,coser|5ías,asistir|7ías,tener|3dríais,matar|5íamos,rezar|5íamos,coger|5ía,sustituir|9íamos,vender|6íamos,picar|5ía,curar|5íamos,echar|5ían,tirar|5íais,arrepentirse|10ían,pasar|5íamos,amanecer|8ía,poner|3dríais,acortar|7íamos,pedir|5íamos,dudar|5ía,cesar|5ían,caber|3rías,caminar|7ía,durar|5ía,tardar|6ías,distinguir|10ías,preservar|9íamos,luchar|6íais,sentirse|6íais,helar|5ían,toser|5ían,insistir|8íais,freír|3iríamos,bordar|6íamos,aplicar|7ías,apretar|7ía,caer|4ías,verificar|9íais,batir|5ía,detener|5dríamos,seguir|6íamos,clarificar|10ía,dar|3ían,guiar|5ía,sonar|5íais,regar|5ía,robar|5ía,sacar|5íais,mentir|6íais,invertir|8ían,mirar|5ían,distribuir|10ía,volver|6ía,decir|1iríamos,atender|7íamos,saber|3ríais,vencer|6ía,agradecer|9ía,purificar|9íamos,cazar|5ía,padecer|7ías,sacrificar|10ía,ofender|7íamos,glorificar|10ías,conocer|7íais,abrir|5íamos,untar|5íamos,borrar|6ía,estimar|7ía,contar|6ía,cortar|6ía,estar|5íamos,anunciar|8ías,reñir|5ía,hervir|6íais,besar|5íamos,pegar|5íais,reconocer|9ía,aparecer|8ía,emigrar|7ían,ver|3ías,contribuir|10ían,moverse|5íais,secarse|5íamos,hacer|2ría,juntarse|6íais,prepararse|8íamos,llamarse|6íais,mudarse|5íamos,jactarse|6íamos,hallarse|6ían",rev:"erarían|4se,cearían|4se,itarían|2,endrían|2ir,ntirían|4se,rían|1,edarías|4se,rríamos|1er,faríais|2cer,everías|4se,odrías|2er,abrías|2er,abríais|2er,eiríais|1ír,ndrías|1er,dríamos|er,dríais|er,rías|1,ríais|1,ríamos|1,esharía|4cer,eitaría|5se,aldría|2ir,ulliría|5se,uejaría|5se,ndría|1er,ría|1"},second:{rules:"bicar|5íais,abricar|7ías,apar|4ía,ceptar|6ían,nsentir|7íais,eclarar|7íamos,astar|5ía,estigar|7íamos,omponer|5dría,omenzar|7ían,lorecer|7ías,ivertir|7ía,esentir|7ía,eprimir|7íamos,roteger|7ían,sificar|7íais,intar|5ía,egresar|7ía,squiar|6ías,espedir|7ían,spertar|7ía,ducar|5ía,estruir|7ías,onfiar|6íamos,lonizar|7ías,namorar|7íamos,ufrir|5ías,egatear|7ías,ensar|5íamos,omper|5ía,orcer|5ías,onreír|4irías,epillar|7ían,eportar|7íamos,epasar|6ías,mportar|7íamos,ormir|5íais,erretir|7ía,rindar|6ía,nvitar|6ías,ngañar|6ías,nviar|5ías,obernar|7ías,riunfar|7ía,uebrar|6íamos,uerer|3ríais,nfadar|6ía,sayunar|7ían,esultar|7ía,gorar|5íamos,isfacer|4rían,brazar|6íais,busar|5íais,tirizar|7ía,andonar|7ían,olocar|6íamos,uspirar|7íais,dvertir|7ía,xportar|7ía,onjugar|7ían,retener|5drían,dmirar|6ía,rrachar|7ías,ecidir|6íais,omprar|6ían,horrar|6ían,oñar|4íamos,atinar|6ían,terizar|7ías,poyar|5ías,ompañar|7ía,ticipar|7ían,ariar|5ían,lantar|6ía,adrar|5ías,egular|6íamos,ndicar|6íais,evorar|6ían,ulpar|5ían,onsumir|7ía,eparar|6ías,sustar|6ía,impiar|6ía,uceder|6ían,uivocar|7ías,endecir|7ías,ntender|7ían,esear|5íais,nseguir|7íamos,iseñar|6ía,rpretar|7íais,liminar|7íais,visar|5íamos,laticar|7ían,bedecer|7ían,dornar|6ía,ocinar|6ía,eñalar|6íais,sperar|6ías,jercer|6ía,nfluir|6ía,positar|7íamos,tilizar|7ías,aciar|5ías,dmitir|6ía,enovar|6íamos,edicar|6ías,ezclar|6ías,nseñar|6ías,enacer|6ías,cercar|6ían,emer|4íais,nformar|7ía,divinar|7ía,iolar|5íais,almar|5ías,ralizar|7íamos,ratar|5ían,onfesar|7ía,ausar|5ía,nvencer|7íamos,dificar|7ían,sminuir|7íamos,urgir|5ía,redecir|7ía,guantar|7ías,hocar|5ía,ruñir|5íamos,equerir|7ían,nstruir|7ían,asticar|7ía,uemar|5ías,scoger|6ían,ganizar|7ía,roponer|5dríamos,fectuar|7íais,uardar|6ías,legir|5ían,revivir|7ía,rillar|6ía,rseguir|7ías,ubir|4ía,ntregar|7ían,campar|6ías,omar|4ían,liviar|6ía,onvenir|5drías,nificar|7ía,nfirmar|7ía,ehusar|6íamos,ombatir|7ían,rrojar|6ía,ompetir|7ías,bortar|6ían,municar|7ía,ibujar|6ían,aludar|6ían,evolver|7ías,aler|2dría,umentar|7ía,preciar|7ían,ijar|4íais,nojar|5íais,nventar|7ían,esentar|7íais,evelar|6ía,uscar|5ían,uponer|4drían,rohibir|7ía,rear|4ías,orregir|7ía,omer|4ían,uidar|5ían,mprimir|7ías,tumbrar|7íais,eriguar|7ían,raducir|7íais,alir|2dría,sconder|7íais,lcanzar|7íais,burrir|6íamos,ograr|5ía,siasmar|7ían,ermitir|7ías,orir|4ía,oder|2rían,nhelar|6ía,erdonar|7ías,ecordar|7ía,adurar|6ías,etestar|7ían,hismear|7ías,anar|4ías,nfermar|7ías,ingir|5ía,nversar|7ían,ntinuar|7ías,ncionar|7ían,obrar|5ías,lmorzar|7íamos,opiar|5ías,ecoger|6íamos,studiar|7ías,mpartir|7ían,alvar|5ías,arcar|5ías,ealizar|7íais,añer|4íais,rreglar|7ía,ntentar|7ía,ucear|5ían,oportar|7ían,fligir|6ía,erder|5íamos,ncantar|7ían,erminar|7ían,ruzar|5íamos,niciar|6ías,echazar|7ían,espirar|7ía,umplir|6ían,ecibir|6ían,galizar|7ían,epender|7íamos,olestar|7ían,acticar|7íamos,riticar|7ían,eredar|6ías,autizar|7ías,epetir|6íais,btener|4drían,xhibir|6ías,ravesar|7ías,nstalar|7ía,menazar|7ía,referir|7íamos,bolizar|7ía,xplorar|7ías,vorciar|7íamos,ancelar|7ías,isitar|6ían,dorar|5ía,cabar|5íais,eciclar|7íais,egalar|6ías,avegar|6ían,umar|4ía,sfrutar|7íais,elebrar|7ía,nsultar|7íais,estir|5ían,cificar|7ías,espetar|7ían,ensurar|7ían,ecorar|6íamos,evantar|7íais,ugerir|6ía,vilizar|7íamos,ncluir|6íais,amentar|7ían,tacar|5íais,educir|6ías,ascinar|7ían,horcar|6íais,xponer|4dríais,oseguir|7ían,nsuciar|7ía,eber|4ía,roducir|7ían,testar|6ías,ejar|4ía,cular|5ía,ilar|4ías,errar|5íais,rrer|4ían,pezar|5ías,endar|5ían,rlar|4ía,igir|4ían,meter|5ías,gustar|6íais,vidar|5ía,hacer|2ría,ostar|5ían,altar|5ían,olar|4ías,aminar|6ía,otar|4ía,aer|3ían,lear|4ían,quecer|6ían,ociar|5ías,istar|5ía,nducir|6íais,eer|3ía,udar|4ía,anzar|5ías,untar|5ías,cansar|6ía,ntener|4dría,blar|4ía,stimar|6ía,cubrir|6ía,vocar|5ían,ajar|4ía,scar|4ía,resar|5ían,robar|5ía,conocer|7ía,llar|4ías,grar|4ías,ver|3ía,enar|4ía,licar|5ías,rificar|7ía,uar|3ía,trar|4ía,char|4ía,itar|4ía,var|3ía,dir|3ía,nder|4ía,gar|3ía,ecer|4ía,terarse|5ías,ncearse|5ías,reverse|5ían,pararse|5íais,udarse|4ían,actarse|5íais,allarse|5ías,rse|1ía,omit|4arías",exceptions:"dejar|5ías,renunciar|9íamos,yacer|5ían,oponer|4dría,ir|2ías,ser|3ía,odiar|5ía,andar|5ía,mandar|6ías,regir|5íais,usar|4ía,constituir|10íamos,votar|5ías,parecer|7ían,crecer|6ían,costar|6ías,unir|4ía,llorar|6ían,extinguir|9ía,desagradecer|12ías,desagradar|10ía,acordar|7íamos,reservar|8ían,servir|6íais,mostrar|7ían,desaparecer|11ían,criar|5ías,vivir|5ías,teñir|5ían,pagar|5íamos,amar|4íais,afirmar|7ían,tocar|5ía,jugar|5ías,sentar|6ías,oír|1iría,casar|5ían,apagar|6íais,herir|5ían,comprender|10ías,formar|6ían,entrar|6íamos,montar|6ían,calentar|8ían,abordar|7ías,consistir|9ías,pesar|5íamos,aprobar|7ías,convertir|9íamos,huir|4ía,firmar|6íamos,venir|3dríamos,bajar|5ían,nadar|5ían,oler|4ía,aspirar|7ían,nacer|5ía,traer|5ía,describir|9íamos,jurar|5íamos,coser|5ían,asistir|7ían,tener|3dría,matar|5ías,rezar|5ían,bañar|5íamos,alentar|7ías,agradar|7ías,coger|5ía,sustituir|9íais,vender|6íais,picar|5ía,peinar|6ían,curar|5íais,echar|5ías,tirar|5íamos,arrepentirse|10ías,pasar|5íais,poner|3drías,acortar|7ías,cesar|5ías,caber|3rían,durar|5ía,tardar|6ían,distinguir|10ían,helar|5ías,toser|5ías,insistir|8íamos,freír|3iría,bordar|6ía,aplicar|7ían,apretar|7ía,verificar|9ían,batir|5ía,detener|5drías,seguir|6ía,dar|3ías,guiar|5ía,sonar|5íamos,escribir|8ía,sacar|5ía,mentir|6ías,invertir|8ías,mirar|5ías,distribuir|10ía,decir|1irían,atender|7íais,saber|3ría,reír|2irían,vencer|6ía,purificar|9ías,cazar|5ía,padecer|7íais,parar|5ían,abrir|5ías,borrar|6ía,contar|6ía,cortar|6ía,estar|5íais,reinar|6ías,soler|5ían,anunciar|8ían,reñir|5ía,hervir|6ía,besar|5ías,ver|3ían,contribuir|10ías,enterarse|7ías,hacer|2ría,prepararse|8íais,mudarse|5ían,jactarse|6íais,vomit|5arías,proponer|6dríamos,convenir|6drías,hallarse|6ías,salir|3dría,sentirse|6ía",rev:"overía|4se,uedaría|5se,ecaría|4se,esharía|4cer,untaría|5se,lamaría|5se,eitaría|5se,ulliría|5se,reiría|2ír,uejaría|5se,abría|2er,dría|er,ría|1,reirías|2ír,cearías|4se,erríais|2er,ndríais|1er,ndrías|1er,ríamos|1,ríais|1,rías|1,sfarían|3cer,everían|4se,odrían|2er,abrían|2er,eirían|1ír,ndrían|1er,rían|1"},third:{rules:"bicar|5ía,abricar|7íais,ceptar|6íamos,astar|5ía,omponer|5dríamos,omenzar|7íamos,raduar|6ía,lorecer|7íais,eprimir|7ías,roteger|7ía,sificar|7ía,intar|5íamos,squiar|6ían,espedir|7ías,ontecer|7ía,spertar|7ía,ducar|5íais,estruir|7íais,onfiar|6ía,lonizar|7ían,ufrir|5ían,onsejar|7ías,lustrar|7ían,alcular|7ías,omper|5íamos,ailar|5íais,onreír|4irían,mpezar|6íamos,epasar|6ían,ablecer|7ía,ormir|5ía,allar|5ía,ropezar|7ía,rindar|6ía,nvitar|6ían,urlar|5ías,nviar|5ían,obernar|7íamos,xigir|5íais,riunfar|7ía,nmigrar|7ían,uebrar|6ías,uerer|3ría,nfadar|6ía,sayunar|7ía,rometer|7ían,gorar|5íais,legar|5ía,isfacer|4rías,sgustar|7ían,brazar|6ían,busar|5íamos,onvidar|7íamos,tirizar|7ía,eshacer|4ríamos,lanchar|7ían,andonar|7íais,olocar|6ía,uspirar|7ías,dvertir|7ía,onjugar|7ías,retener|5dría,dmirar|6íais,rrachar|7íamos,ecidir|6ías,omprar|6íamos,horrar|6ía,oñar|4ías,postar|6íais,atinar|6íamos,terizar|7íamos,poyar|5íais,cesitar|7íais,anejar|6íamos,ompañar|7ía,ariar|5ías,adrar|5ían,egular|6ía,bligar|6íamos,taminar|7ía,xplotar|7íais,ndicar|6ías,lenar|5ía,evorar|6ías,onsumir|7íais,sustar|6íamos,impiar|6ían,uivocar|7íais,ublicar|7íais,ntender|7íais,esear|5ían,iquecer|7íamos,egociar|7íais,nseguir|7ía,iseñar|6íais,rpretar|7ían,contrar|7ían,liminar|7ían,visar|5ía,laticar|7ías,bedecer|7íamos,olgar|5ía,dornar|6íais,evistar|7ía,ocinar|6ía,acudir|6íamos,sperar|6ían,nfluir|6ían,positar|7ían,tilizar|7íamos,legrar|6íais,aciar|5ía,rever|5íais,dmitir|6ía,ituar|5íamos,enovar|6ía,licitar|7ías,edicar|6ían,ezclar|6ían,frecer|6íamos,nseñar|6ían,enacer|6íamos,emer|4ían,nformar|7ía,divinar|7íamos,reer|4íais,iolar|5íamos,almar|5ía,ratar|5íais,onfesar|7íamos,ausar|5íais,nvencer|7ía,dificar|7íamos,yudar|5ía,sminuir|7ían,urgir|5íais,hocar|5íamos,ruñir|5ías,vanzar|6íamos,ntrolar|7ían,nstruir|7ías,asticar|7ía,ondenar|7íais,uemar|5ían,scoger|6ías,ganizar|7ías,uardar|6íamos,legir|5íais,revivir|7ía,rillar|6ía,rseguir|7ían,ubir|4íamos,ntregar|7íais,campar|6ían,omar|4íais,liviar|6íais,onvenir|5dría,mplear|6ías,nificar|7ías,nfirmar|7ías,ehusar|6ían,ombatir|7ías,rrojar|6íais,ompetir|7íamos,bortar|6íamos,municar|7íais,ibujar|6íamos,aludar|6ías,aler|2dría,levar|5íamos,umentar|7ía,preciar|7ías,ijar|4ía,nojar|5ías,nventar|7ía,esentar|7ías,uponer|4dríamos,ogar|4ía,nservar|7íais,omer|4ía,mprimir|7ían,tumbrar|7ías,eriguar|7ías,raducir|7ían,sociar|6ían,alir|2dríais,sconder|7ías,lcanzar|7ía,ograr|5ía,siasmar|7ías,lquilar|7íamos,ermitir|7ían,vejecer|7ían,oder|2ría,erdonar|7ían,ecordar|7íais,ontener|5dría,adurar|6ía,etestar|7íais,oblar|5ías,anar|4íamos,avar|4ía,astimar|7ía,nfermar|7ían,ingir|5ía,nversar|7íamos,scubrir|7ías,ntinuar|7ía,ritar|5ías,ncionar|7ías,obrar|5ían,ricular|7íais,lmorzar|7ía,opiar|5íamos,ablar|5íamos,ecoger|6ía,studiar|7íais,alvar|5ían,añer|4ía,rreglar|7íamos,ntentar|7ían,ucear|5íamos,oportar|7íais,fligir|6ías,erder|5íais,erminar|7ía,ruzar|5ía,niciar|6ía,echazar|7ías,umplir|6ía,ecibir|6ías,ñadir|5ían,galizar|7íais,quistar|7íais,olestar|7íais,irigir|6ía,nvocar|6ía,acticar|7ía,riticar|7íais,eredar|6ían,autizar|7íais,nvadir|6íais,btener|4drías,ravesar|7ía,rabajar|7íais,nstalar|7íamos,menazar|7ía,escar|5ía,scuchar|7ían,bolizar|7íais,plaudir|7ía,talecer|7íamos,gistrar|7íais,vorciar|7ía,isitar|6ía,aquecer|7íais,cabar|5ías,argar|5íamos,eciclar|7ías,ultivar|7íamos,avegar|6íais,vacuar|6ía,umar|4íamos,sfrutar|7ías,xpresar|7íamos,elebrar|7ía,estir|5ías,cificar|7íamos,espetar|7ías,ensurar|7ías,efender|7íamos,evantar|7ías,vilizar|7ía,ncluir|6ías,antener|5dríamos,harlar|6íamos,amentar|7íamos,rovocar|7ías,educir|6ían,ascinar|7íamos,horcar|6ías,xponer|4dría,oseguir|7íais,nsuciar|7ía,sentir|6ías,arar|4ían,stigar|6ía,resar|5ía,testar|6ían,nsar|4ía,rcer|4ían,rrer|4ías,etir|4ía,añar|4ían,olver|5ía,eservar|7ía,necer|5ía,agar|4ía,edir|4ía,decir|5íamos,robar|5ían,alar|4ía,ajar|4íamos,spirar|6íais,rcar|4íais,alizar|6ía,plicar|6ían,untar|5ían,oponer|4dría,ctuar|5ías,scar|4ías,regir|5ían,idar|4íais,ser|3íais,costar|6íamos,acar|4ía,par|3ías,ndar|4íais,rtir|4íamos,llar|4íamos,portar|6ía,ltar|4ías,antar|5ía,elar|4ía,ducir|5ía,orar|4ía,ear|3ía,recer|5ías,ibir|4ía,rir|3ía,der|3ía,overse|4ía,terarse|5íamos,uedarse|5ía,ncearse|5íamos,ecarse|4ía,reverse|5íamos,untarse|5ía,pararse|5ían,lamarse|5ía,udarse|4íais,actarse|5ías,allarse|5íais,eitarse|5íamos,ullirse|5íais,uejarse|5íamos,entirse|5ía,omit|4aría",exceptions:"dejar|5íais,beber|5íamos,renunciar|9ías,yacer|5ías,ir|2íamos,odiar|5ía,andar|5íamos,negar|5íamos,usar|4ía,constituir|10ían,votar|5ían,cansar|6ían,crecer|6íais,cerrar|6ía,unir|4ías,llorar|6ías,extinguir|9ía,desagradecer|12íais,desagradar|10ía,meter|5íamos,errar|5ían,acordar|7ían,hacer|2rías,servir|6ían,mostrar|7íais,criar|5íais,vivir|5íais,teñir|5íamos,cenar|5íamos,amar|4ía,afirmar|7íais,tocar|5íais,jugar|5íais,sentar|6ían,oír|1irían,volar|5ía,casar|5íais,atraer|6ías,apagar|6ían,herir|5íamos,comprender|10íais,formar|6íais,entrar|6íais,montar|6íamos,calentar|8ías,abordar|7íamos,notar|5ía,consistir|9íamos,pesar|5ían,faltar|6ía,convertir|9ía,huir|4íamos,firmar|6ían,venir|3drían,nadar|5ías,oler|4ía,nacer|5ía,traer|5íais,leer|4ías,jurar|5ías,coser|5ía,asistir|7íais,tener|3dría,matar|5ía,rezar|5ías,lanzar|6íais,alentar|7ían,agradar|7ían,coger|5íamos,sustituir|9ías,evitar|6ía,vender|6ías,picar|5ías,peinar|6ías,curar|5ía,echar|5ía,tirar|5ía,demostrar|9íamos,pasar|5ía,amanecer|8íamos,poner|3drían,acortar|7ían,dudar|5íais,cesar|5íamos,caber|3ríais,caminar|7íais,durar|5íais,tardar|6ía,distinguir|10íais,luchar|6ía,helar|5íais,insistir|8ían,freír|3iría,bordar|6ía,aplicar|7íamos,apretar|7íamos,caer|4íamos,verificar|9ías,batir|5íamos,detener|5drían,seguir|6ía,clarificar|10ían,dar|3íamos,guiar|5íais,duchar|6ías,sonar|5ían,regar|5ían,mentir|6ían,mirar|5íamos,distribuir|10íamos,volver|6ías,decir|1irías,saber|3ría,reír|2irías,vencer|6íais,agradecer|9ías,purificar|9ían,deber|5ían,cazar|5ías,padecer|7íamos,sacrificar|10ías,glorificar|10ía,parar|5íamos,conocer|7ía,abrir|5ían,borrar|6íamos,estimar|7íais,contar|6íais,cortar|6íamos,probar|6ía,estar|5ías,reinar|6ía,soler|5íamos,anunciar|8íamos,reñir|5íais,hervir|6ía,besar|5ían,pegar|5ía,gustar|6ía,reconocer|9íamos,emigrar|7íamos,ver|3íais,contribuir|10ía,enterarse|7íamos,broncearse|8íamos,deshacer|5ríamos,atreverse|7íamos,prepararse|8ían,mudarse|5íais,hallarse|6íais,afeitarse|7íamos,quejarse|6íamos",rev:"overía|4se,uedaría|5se,uerría|3er,ecaría|4se,untaría|5se,lamaría|5se,mitaría|3,vendría|3ir,odría|2er,reiría|2ír,abría|2er,entiría|5se,dría|er,ría|1,reirían|2ír,ndrían|1er,rían|1,sfarías|3cer,ctarías|4se,ldríais|1ir,abríais|2er,liríais|3se,eirías|1ír,endrías|2er,dríamos|er,rías|1,ríais|1,ríamos|1"},firstPlural:{rules:"bicar|5ía,abricar|7íamos,apar|4ían,ceptar|6ía,astar|5ían,estigar|7ía,omponer|5drías,raduar|6ían,lorecer|7íamos,ivertir|7ías,eprimir|7ían,roteger|7ía,sificar|7ía,intar|5íais,egresar|7íamos,squiar|6íamos,espedir|7ía,ontecer|7ías,spertar|7íais,ducar|5ían,onfiar|6ía,lonizar|7íamos,ufrir|5íamos,lustrar|7ías,alcular|7ían,ensar|5ía,omper|5ían,ailar|5íamos,orcer|5ía,onreír|4iríamos,epillar|7ía,ablecer|7íamos,ormir|5ía,allar|5ía,rindar|6ían,nvitar|6ía,erendar|7íamos,ngañar|6ía,nviar|5íamos,obernar|7ía,riunfar|7ías,nmigrar|7ía,uebrar|6ían,uerer|3ría,nfadar|6íamos,sayunar|7ía,rometer|7íamos,legar|5ían,isfacer|4ría,sgustar|7ías,brazar|6ías,scender|7ían,busar|5ías,onvidar|7ías,tirizar|7ías,eshacer|4ríais,lanchar|7ías,andonar|7íamos,olocar|6ía,dvertir|7ías,xportar|7ían,onjugar|7íais,retener|5dría,dmirar|6íamos,rrachar|7íais,ecidir|6ían,omprar|6íais,horrar|6ía,oñar|4ían,atinar|6íais,poyar|5íamos,cesitar|7íamos,ticipar|7íamos,lantar|6ías,adrar|5íais,egular|6ía,bligar|6ían,taminar|7ías,ndicar|6ían,lenar|5ías,evorar|6íamos,ulpar|5íais,onsumir|7ían,sustar|6íais,impiar|6ías,uceder|6ía,uivocar|7ían,sponder|7íamos,iquecer|7ía,iseñar|6ías,rpretar|7ías,contrar|7ías,liminar|7ías,visar|5ía,laticar|7íamos,bedecer|7íais,olgar|5íais,dornar|6íamos,evistar|7íais,ocinar|6ías,acudir|6ías,sperar|6íais,jercer|6ías,nfluir|6ías,positar|7ías,tilizar|7íais,ncender|7íamos,legrar|6íamos,dmitir|6ían,ituar|5íais,enovar|6ía,licitar|7ían,edicar|6íamos,ezclar|6íamos,frecer|6ías,nseñar|6íais,enacer|6ía,emer|4ías,nformar|7ían,divinar|7ían,reer|4íamos,almar|5ía,onfesar|7íais,ausar|5íamos,nvencer|7ía,dificar|7ía,yudar|5ías,sminuir|7ías,urgir|5íamos,redecir|7ías,hocar|5íais,ntrolar|7íamos,asticar|7ías,uemar|5íamos,scoger|6íais,ganizar|7ían,uardar|6íais,legir|5íamos,revivir|7ías,ubir|4ías,ntregar|7ía,campar|6ía,omar|4íamos,liviar|6ías,nificar|7ían,nfirmar|7ían,ehusar|6íais,ombatir|7ía,bortar|6íais,municar|7ías,ibujar|6íais,aludar|6ía,evolver|7ía,eplicar|7íais,aler|2drías,levar|5ías,umentar|7ías,preciar|7íamos,ijar|4ía,evelar|6íamos,uscar|5ía,ogar|4ían,rohibir|7íamos,nservar|7íamos,omer|4ía,uidar|5íamos,mprimir|7íais,tumbrar|7ían,eriguar|7íamos,raducir|7ías,sociar|6íais,alir|2drían,sconder|7ían,burrir|6ía,ograr|5ías,siasmar|7íamos,lquilar|7ía,ermitir|7ía,orir|4ían,vejecer|7ías,oder|2ría,nhelar|6ían,erdonar|7ía,ecordar|7íamos,ontener|5drías,etestar|7íamos,anar|4íais,avar|4ían,astimar|7ían,nfermar|7íamos,ingir|5íamos,nversar|7íais,scubrir|7ían,ntinuar|7ía,ritar|5ían,ncionar|7íamos,obrar|5ía,ricular|7íamos,opiar|5ía,ecoger|6ía,mpartir|7íais,alvar|5íamos,añer|4ía,rreglar|7ías,ntentar|7ías,ucear|5íais,fligir|6ían,erder|5ían,erminar|7ía,espirar|7íamos,umplir|6ía,ñadir|5ías,epender|7ía,quistar|7ían,olestar|7íamos,acticar|7ía,riticar|7íamos,eredar|6íamos,nvadir|6ían,epetir|6ía,btener|4dría,ravesar|7ía,rabajar|7íamos,nstalar|7íais,menazar|7íais,escar|5ías,scuchar|7ías,bolizar|7íamos,teresar|7ía,plaudir|7ían,iajar|5ían,talecer|7ías,gistrar|7íamos,omendar|7ía,ancelar|7ía,isitar|6ía,aquecer|7íamos,dorar|5ías,cabar|5ían,lvidar|6ían,argar|5ían,eciclar|7ían,ultivar|7ías,avegar|6íamos,vacuar|6ías,umar|4ían,sfrutar|7ían,xpresar|7íais,elebrar|7íais,estir|5íais,cificar|7ía,espetar|7ía,efender|7ías,evantar|7ían,ugerir|6íamos,nfiscar|7ían,ncluir|6ían,antener|5dríais,astigar|7íais,tacar|5ía,educir|6íamos,ascinar|7ía,horcar|6ían,nsuciar|7ías,erecer|6ían,sentir|6ían,diar|4íamos,testar|6ía,struir|6íamos,ejar|4ían,prender|7íais,rrer|4íamos,ostar|5ía,etir|4íais,rlar|4ían,igir|4ía,tinguir|7íamos,sultar|6ían,riar|4ía,enar|4ían,tender|6íamos,añar|4ías,olar|4ía,otar|4ías,traer|5íamos,agar|4ías,sistir|6ía,probar|6íais,alar|4ía,nvertir|7ía,rcar|4ía,atar|4ía,ñir|3ían,ctuar|5ían,einar|5ía,venir|3dría,ojar|4ían,regir|5ías,cansar|6ías,blar|4ían,vocar|5ía,arar|4ía,asar|4ía,ver|3íamos,necer|5ías,erir|4ía,licar|5ía,seguir|6ía,ibir|4ía,llar|4íais,orar|4ía,ortar|5ía,irar|4ía,urar|4ía,poner|3dría,cir|3ía,ciar|4ía,ear|3ía,ntar|4ía,zar|3ía,overse|4ías,terarse|5ía,uedarse|5íamos,ncearse|5íais,ecarse|4íais,reverse|5ía,untarse|5íamos,pararse|5ías,lamarse|5ían,udarse|4ía,allarse|5íamos,ullirse|5ían,uejarse|5íais,tarse|3ían,omit|4aría",exceptions:"dejar|5íamos,beber|5íais,renunciar|9ían,yacer|5ía,oponer|4drían,ir|2íais,ser|3ías,andar|5íais,mandar|6ía,negar|5ías,usar|4ían,constituir|10ías,votar|5ía,parecer|7íamos,crecer|6ía,cerrar|6ía,unir|4ían,llorar|6íais,desagradecer|12íamos,desagradar|10ías,meter|5íais,errar|5ías,acordar|7ías,reservar|8ía,hacer|2rían,servir|6ías,mostrar|7ía,desaparecer|11ía,vivir|5ía,teñir|5ía,pagar|5ía,amar|4ía,afirmar|7íamos,medir|5íais,tocar|5ías,jugar|5ía,saltar|6íais,oír|1irías,comprender|10íamos,formar|6íamos,entrar|6ían,abordar|7íais,pesar|5ías,faltar|6ía,huir|4íais,firmar|6ías,bajar|5íais,nadar|5íais,oler|4ían,nacer|5íais,leer|4ían,coser|5ía,tener|3drías,agradar|7íamos,coger|5ías,sustituir|9ían,evitar|6íais,vender|6ían,picar|5ían,echar|5ía,demostrar|9íais,arrepentirse|10ía,pedir|5ías,dudar|5íamos,cesar|5íais,cubrir|6íamos,caber|3ríamos,caminar|7ían,durar|5íamos,tardar|6ía,preservar|9ían,luchar|6ían,sentirse|6íamos,helar|5ía,toser|5íamos,insistir|8ías,freír|3iríais,acostar|7íais,bordar|6ías,apretar|7ían,caer|4ía,verificar|9ía,batir|5ían,detener|5dríais,seguir|6ían,clarificar|10ías,dar|3ía,guiar|5ías,duchar|6íais,sonar|5ías,escribir|8íamos,regar|5ías,robar|5ías,sacar|5ías,mentir|6íamos,distribuir|10íais,volver|6ían,decir|1iríais,atender|7ía,saber|3rías,reír|2iría,vencer|6íamos,agradecer|9ían,purificar|9íais,deber|5ías,cazar|5ían,padecer|7ía,sacrificar|10ían,ofender|7ían,glorificar|10íamos,conocer|7íamos,abrir|5íais,untar|5íais,borrar|6íais,estimar|7íamos,contar|6ías,cortar|6ías,estar|5ían,soler|5íais,hervir|6íamos,besar|5ía,pegar|5íamos,gustar|6ía,reconocer|9íais,aparecer|8ían,emigrar|7íais,contribuir|10ía,sonreír|5iríamos,quedarse|6íamos,broncearse|8íais,secarse|5íais,deshacer|5ríais,juntarse|6íamos,mudarse|5ía,hallarse|6íamos,afeitarse|7ían,quejarse|6íais",rev:"overías|4se,ararías|4se,bríamos|1er,eiríais|1ír,abrías|2er,ndríais|1er,drías|er,ríais|1,rías|1,ríamos|1,ondrían|2er,amarían|4se,ctarían|4se,aldrían|2ir,llirían|4se,rían|1,teraría|5se,uerría|3er,isfaría|4cer,revería|5se,mitaría|3,entiría|5se,odría|2er,eiría|1ír,vendría|3ir,ndría|1er,ría|1"},secondPlural:{rules:"bicar|5ían,apar|4íais,astar|5ías,omponer|5drían,raduar|6ías,ivertir|7ían,esentir|7íais,roteger|7íais,sificar|7ían,intar|5ían,egresar|7ías,espedir|7ía,ontecer|7ían,spertar|7ías,ducar|5ías,onfiar|6ías,lonizar|7ía,namorar|7ían,ufrir|5ía,onsejar|7íamos,lustrar|7íamos,alcular|7íais,egatear|7íamos,ensar|5ías,omper|5íais,orcer|5ía,eportar|7ían,mportar|7ían,ablecer|7ías,ormir|5ías,erretir|7ías,allar|5ían,ropezar|7íais,rindar|6ías,urlar|5íais,obernar|7ía,xigir|5ía,riunfar|7ían,uerer|3rían,nfadar|6ías,sayunar|7íais,esultar|7íais,legar|5ías,isfacer|4ría,brazar|6ía,scender|7ías,busar|5ía,onvidar|7ían,tirizar|7ían,eshacer|4rían,lanchar|7íamos,olocar|6ías,esolver|7ías,dvertir|7ían,xportar|7ías,retener|5dríais,dmirar|6ían,rrachar|7ía,ecidir|6ía,horrar|6íamos,xtender|7ían,atinar|6ía,terizar|7ía,poyar|5ía,cesitar|7ías,anejar|6ías,ompañar|7ían,lantar|6ían,egular|6ías,taminar|7ían,xplotar|7ían,lenar|5íamos,onsumir|7ías,sustar|6ías,impiar|6íamos,uceder|6íais,endecir|7ía,ntender|7ía,sponder|7ían,esear|5ía,elear|5íais,nseguir|7ías,iseñar|6ían,contrar|7íais,liminar|7ía,visar|5ían,olgar|5ían,dornar|6ían,evistar|7ían,ocinar|6ían,acudir|6ían,eñalar|6ían,jercer|6íamos,nfluir|6íais,tilizar|7ía,ncender|7ían,aciar|5íais,rever|5ías,dmitir|6ías,ituar|5ían,enovar|6ían,licitar|7íais,frecer|6ían,enacer|6ía,emer|4ía,nformar|7ías,divinar|7ías,reer|4ías,almar|5íamos,onfesar|7ían,ausar|5ías,nvencer|7ías,yudar|5ían,urgir|5ías,redecir|7íais,guantar|7íais,hocar|5ías,equerir|7íais,asticar|7ían,uemar|5ía,scoger|6ía,ganizar|7íais,roponer|5drían,fectuar|7ía,revivir|7ían,rillar|6ías,ubir|4ían,ntregar|7ía,omar|4ía,liviar|6ían,onvenir|5dríais,mplear|6ía,nificar|7íamos,nfirmar|7íamos,ehusar|6ía,rrojar|6ías,municar|7ían,ibujar|6ía,aler|2drían,levar|5ían,umentar|7ían,ijar|4ían,nojar|5ía,nventar|7íais,evelar|6ías,uscar|5ía,uponer|4dría,ogar|4íais,rohibir|7ían,rear|4ían,orregir|7íais,nservar|7ían,omer|4íamos,eriguar|7ía,raducir|7ía,alir|2drías,sconder|7ía,lcanzar|7ían,burrir|6ías,ograr|5íais,siasmar|7ía,orir|4ías,vejecer|7íamos,oder|2ríais,scansar|7ían,nhelar|6íamos,ecordar|7ían,ontener|5drían,adurar|6íais,oblar|5íamos,hismear|7íais,anar|4ía,avar|4ías,ingir|5ías,nversar|7ía,scubrir|7íais,ntinuar|7íamos,ritar|5íais,ricular|7ían,lmorzar|7ías,ablar|5ías,alvar|5ía,añer|4ían,rreglar|7ían,ntentar|7íais,ucear|5ía,fligir|6íamos,erder|5ía,ncantar|7íais,erminar|7íais,ruzar|5ías,niciar|6íais,echazar|7ía,ragar|5íamos,espirar|7ías,umplir|6íais,ecibir|6ía,ñadir|5íais,galizar|7ía,epender|7ías,quistar|7ías,irigir|6íais,nvocar|6íais,acticar|7ías,autizar|7ía,nvadir|6ías,epetir|6ías,btener|4dría,xhibir|6íamos,ravesar|7íais,rabajar|7ían,nstalar|7ías,menazar|7ías,escar|5ían,referir|7ían,scuchar|7íais,bolizar|7ías,teresar|7íamos,plaudir|7ías,iajar|5ías,talecer|7ían,gistrar|7ían,xplorar|7íamos,vorciar|7ías,ancelar|7íais,isitar|6íamos,dorar|5ían,cabar|5ía,lvidar|6ías,argar|5ías,egalar|6íamos,ultivar|7ían,avegar|6ía,vacuar|6ían,umar|4ías,xpresar|7ía,elebrar|7ías,ecorar|6ías,efender|7ían,ugerir|6ías,vilizar|7ían,nfiscar|7íamos,antener|5drías,harlar|6ías,astigar|7ían,educir|6ía,ascinar|7ía,xponer|4drías,nsuciar|7ían,erecer|6íais,igar|4ías,primir|6ía,egir|4ía,prender|7ías,ilar|4ía,reír|2iría,rrer|4ía,ezar|4ía,asar|4ía,meter|5ía,jugar|5ía,ñir|3ía,enar|4ías,edir|4ían,aer|3ía,vocar|5ía,quecer|6ía,clar|4ía,nducir|6ían,olar|4ía,alizar|6ías,volver|6íamos,stimar|6ías,coger|5ían,acar|4ían,nzar|4ía,llar|4ía,decer|5ía,necer|5ían,par|3ía,rcar|4ía,recer|5ía,ñar|3ía,onar|4ía,rmar|4ía,uir|3ía,iar|3ía,tir|3ía,dar|3ía,icar|4ía,rar|3ía,tar|3ía,overse|4ían,uedarse|5ían,ncearse|5ía,ecarse|4ían,reverse|5ía,untarse|5ían,lamarse|5ías,udarse|4ía,actarse|5ía,allarse|5ía,eitarse|5ías,uejarse|5ían,rarse|3ía,irse|2ías,omit|4aríais",exceptions:"dejar|5ía,beber|5ían,yacer|5ía,oponer|4drías,ir|2ía,ser|3ían,odiar|5ían,andar|5ían,negar|5íais,introducir|10íamos,usar|4ías,cansar|6íamos,cerrar|6ían,unir|4íais,extinguir|9ían,desagradar|10ían,reservar|8íais,hacer|2ríamos,servir|6ía,vivir|5ía,pagar|5ías,amar|4ías,tocar|5ían,oír|1iríais,volar|5íais,apagar|6ía,herir|5ía,comprender|10ía,notar|5íais,pesar|5ía,faltar|6íais,aprobar|7ía,convertir|9ías,huir|4ían,venir|3dría,bajar|5ía,oler|4íamos,nacer|5ías,traer|5ían,describir|9ías,leer|4íais,coser|5íamos,tener|3drían,matar|5íais,evitar|6ían,vender|6ía,picar|5íamos,peinar|6ía,curar|5ían,echar|5íamos,tirar|5ías,demostrar|9ían,arrepentirse|10íamos,pasar|5ías,poner|3dría,dudar|5ían,cesar|5ía,cubrir|6ías,caber|3ría,caminar|7ías,durar|5ían,tardar|6íais,preservar|9ías,luchar|6ías,helar|5ía,toser|5ía,freír|3irías,bordar|6ían,apretar|7ías,batir|5ías,detener|5dría,seguir|6ías,clarificar|10íais,guiar|5ían,duchar|6ían,escribir|8ían,regar|5íais,robar|5íais,actuar|6íais,distribuir|10ían,decir|1iría,atender|7ías,saber|3ríamos,vencer|6ían,agradecer|9íamos,deber|5íamos,cazar|5íais,sacrificar|10íais,ofender|7ías,glorificar|10ían,conocer|7ían,abrir|5ía,borrar|6ías,contar|6ían,cortar|6ían,probar|6ían,reinar|6íais,soler|5ía,producir|8íais,reñir|5ías,hervir|6ías,besar|5ía,pegar|5ías,gustar|6ías,reconocer|9ías,aparecer|8íamos,ver|3ía,contribuir|10íamos,entretener|8dríais,juntarse|6ían,prepararse|8ía,llamarse|6ías,mudarse|5ía,vomit|5aríais,convenir|6dríais,afeitarse|7ías",rev:"overían|4se,edarían|4se,uerrían|3er,ecarían|4se,sharían|3cer,ejarían|4se,drían|er,rían|1,teraría|5se,ncearía|5se,isfaría|4cer,revería|5se,actaría|5se,allaría|5se,abría|2er,reiría|2ír,ndría|1er,ría|1,aldrías|2ir,odríais|2er,llirías|4se,ntirías|4se,reirías|2ír,bríamos|1er,ndrías|1er,ríamos|1,ríais|1,rías|1"},thirdPlural:{rules:"bicar|5íamos,abricar|7ía,apar|4íamos,ceptar|6íais,astar|5íamos,estigar|7ían,omponer|5dríais,omenzar|7íais,raduar|6íais,lorecer|7ía,esentir|7íamos,roteger|7íamos,sificar|7ías,intar|5ías,squiar|6ía,ontecer|7íais,otestar|7íamos,spertar|7íamos,ducar|5íamos,onfiar|6ían,lonizar|7ía,namorar|7ías,ufrir|5ía,lustrar|7íais,alcular|7íamos,egatear|7íais,ensar|5ían,omper|5ías,ailar|5ía,orcer|5íamos,onreír|4iría,epillar|7íais,eportar|7ías,mportar|7ías,ablecer|7ían,ormir|5ían,allar|5íais,ropezar|7íamos,nvitar|6íais,erendar|7ía,ngañar|6íamos,urlar|5íamos,nviar|5ía,obernar|7íais,riunfar|7íais,nmigrar|7íais,uebrar|6ía,uerer|3rías,nfadar|6ían,sayunar|7íamos,esultar|7íamos,gorar|5ías,legar|5íamos,isfacer|4ríamos,sgustar|7ía,brazar|6ía,scender|7íamos,busar|5ía,onvidar|7íais,tirizar|7íamos,eshacer|4rías,lanchar|7íais,olocar|6ían,esolver|7ían,xportar|7íais,onjugar|7ía,retener|5dríamos,dmirar|6ías,rrachar|7ía,tenecer|7íamos,ecidir|6ía,omprar|6ía,horrar|6íais,oñar|4ía,xtender|7ías,postar|6íamos,atinar|6ía,terizar|7íais,poyar|5ía,cesitar|7ían,ompañar|7íais,ticipar|7ía,ariar|5íais,lantar|6íais,adrar|5ía,egular|6ían,bligar|6íais,taminar|7íais,evorar|6ía,ulpar|5ía,onsumir|7íamos,eparar|6íamos,uceder|6íamos,uivocar|7ía,ublicar|7íamos,endecir|7íais,ntender|7ía,sponder|7ías,esear|5ías,elear|5ías,iquecer|7íais,egociar|7íamos,nseguir|7ían,iseñar|6íamos,rpretar|7ía,contrar|7íamos,liminar|7ía,visar|5ías,laticar|7ía,bedecer|7ía,olgar|5ías,dornar|6ías,ocinar|6íamos,eñalar|6ías,sperar|6ía,jercer|6íais,nfluir|6íamos,positar|7ía,tilizar|7ía,ncender|7ías,legrar|6ía,aciar|5íamos,rever|5ían,dmitir|6íamos,ituar|5ías,licitar|7íamos,frecer|6íais,nseñar|6ía,quillar|7ía,emer|4ía,nformar|7íamos,divinar|7íais,reer|4ían,almar|5íais,ratar|5íamos,onfesar|7ías,ausar|5ían,nvencer|7ían,dificar|7íais,sminuir|7ía,urgir|5ían,redecir|7ían,guantar|7íamos,hocar|5ían,ruñir|5ía,vanzar|6íais,equerir|7ías,ntrolar|7ía,asticar|7íais,ondenar|7íamos,uemar|5ía,scoger|6ía,eguntar|7íamos,ganizar|7íamos,roponer|5drías,fectuar|7ía,uardar|6ía,rrollar|7ía,revivir|7íais,rillar|6ían,rseguir|7íais,ubir|4íais,campar|6íamos,omar|4ía,liviar|6íamos,onvenir|5dríamos,mplear|6íais,nificar|7íais,nfirmar|7íais,ehusar|6ía,ombatir|7íamos,rrojar|6íamos,ompetir|7ía,bortar|6ía,municar|7íamos,ibujar|6ía,eplicar|7ía,aler|2dríamos,umentar|7íamos,preciar|7ía,ijar|4ías,nojar|5ía,nventar|7íamos,esentar|7ían,evelar|6ían,uscar|5íamos,uponer|4dríais,ogar|4íamos,rohibir|7ías,rear|4íais,orregir|7íamos,nservar|7ías,omer|4íais,uidar|5ía,tumbrar|7ía,eriguar|7ía,raducir|7ía,sociar|6ía,alir|2dríamos,sconder|7ía,lcanzar|7ías,burrir|6ían,ograr|5ían,siasmar|7ía,lquilar|7íais,ermitir|7íais,orir|4íamos,vejecer|7íais,oder|2ríamos,nhelar|6íais,erdonar|7íais,ecordar|7ías,ontener|5dríamos,adurar|6íamos,hismear|7íamos,anar|4ía,astimar|7íais,ingir|5ían,nversar|7ía,scubrir|7íamos,ntinuar|7íais,ritar|5íamos,obrar|5íamos,ricular|7ías,lmorzar|7ían,ecoger|6ías,studiar|7ía,mpartir|7ía,alvar|5ía,añer|4ías,rreglar|7íais,ntentar|7íamos,ucear|5ía,oportar|7íamos,fligir|6íais,erder|5ía,ncantar|7íamos,erminar|7íamos,ruzar|5ían,niciar|6íamos,echazar|7íamos,ragar|5íais,umplir|6íamos,ecibir|6íamos,galizar|7íamos,epender|7ían,nvocar|6íamos,acticar|7ían,riticar|7ía,eredar|6ía,autizar|7íamos,btener|4dríais,ntestar|7íais,xhibir|6íais,ravesar|7íamos,rabajar|7ías,nstalar|7ían,menazar|7ían,referir|7ías,bolizar|7ían,iajar|5íais,talecer|7íais,gistrar|7ías,xplorar|7íais,vorciar|7ían,ancelar|7íamos,isitar|6íais,aquecer|7ía,dorar|5íamos,cabar|5ía,lvidar|6íamos,argar|5íais,egalar|6íais,avegar|6ía,vacuar|6íais,umar|4íais,sfrutar|7ía,xpresar|7ía,elebrar|7ían,nsultar|7ía,estir|5ía,cificar|7íais,espetar|7íamos,ensurar|7íais,ecorar|6ían,evantar|7ía,ugerir|6ían,vilizar|7ías,ncluir|6ía,antener|5drían,harlar|6íais,amentar|7íais,astigar|7ías,tacar|5ías,rovocar|7íais,educir|6ía,ascinar|7íais,horcar|6ía,xponer|4drían,oseguir|7íamos,nsuciar|7íamos,erecer|6íamos,entir|5ía,arar|4íais,primir|6ía,egir|4ía,resar|5íais,edir|4íamos,struir|6ía,ejar|4íais,stituir|7ía,prender|7ían,rrer|4ía,ezar|4íais,asar|4íamos,etir|4ían,igir|4íamos,meter|5ía,spirar|6ían,manecer|7íais,parecer|7íais,enar|4íais,olar|4ían,otar|4íamos,dicar|5ía,ustar|5ían,piar|4íais,alentar|7íais,istar|5íamos,udir|4íais,clar|4ía,nducir|6ías,nacer|5ían,rcar|4íamos,alizar|6ían,plicar|6íais,udar|4íamos,regar|5íamos,volver|6íais,cortar|6íais,cansar|6íais,blar|4íais,adir|4íamos,fender|6íais,scar|4íais,ndar|4íamos,vertir|6íais,onar|4ía,uchar|5íamos,estar|5ía,rificar|7íamos,rmar|4ía,var|3íais,overse|4íamos,terarse|5íais,uedarse|5íais,ncearse|5ía,ecarse|4ías,reverse|5íais,untarse|5ías,pararse|5ía,lamarse|5íamos,udarse|4ías,actarse|5ía,allarse|5ía,eitarse|5íais,ullirse|5íamos,uejarse|5ías,omit|4aríamos",exceptions:"dejar|5ía,beber|5ías,renunciar|9ía,yacer|5íais,oponer|4dríais,ir|2ía,ser|3íamos,odiar|5ías,andar|5ías,negar|5ían,introducir|10íais,usar|4íais,votar|5íais,parecer|7ía,crecer|6ías,cerrar|6ías,costar|6íais,unir|4íamos,llorar|6ía,extinguir|9ías,desagradecer|12ía,desagradar|10íamos,errar|5ía,acordar|7ía,reservar|8íamos,hacer|2ríais,servir|6ía,mostrar|7íamos,criar|5íamos,vivir|5íamos,teñir|5íais,pagar|5ían,amar|4ían,tocar|5íamos,jugar|5íamos,saltar|6ía,sentar|6íamos,oír|1iríamos,atraer|6ía,apagar|6ía,herir|5íais,comprender|10ía,entrar|6ía,montar|6ías,abordar|7ía,consistir|9íais,pesar|5ía,faltar|6íamos,aprobar|7ía,convertir|9ían,huir|4ías,venir|3dríais,bajar|5ía,nadar|5ía,oler|4íais,aspirar|7íamos,traer|5ías,describir|9ían,leer|4íamos,jurar|5ían,coser|5íais,asistir|7íamos,tener|3dríamos,matar|5ían,bañar|5ía,lanzar|6íamos,agradar|7ía,coger|5íais,evitar|6ías,vender|6ía,picar|5íais,peinar|6íais,curar|5ías,echar|5íais,tirar|5ían,demostrar|9ías,arrepentirse|10íais,pasar|5ían,poner|3dríamos,pedir|5íais,dudar|5ías,cesar|5ía,cubrir|6ían,caber|3ría,caminar|7íamos,durar|5ías,tardar|6íamos,distinguir|10ía,sentirse|6ían,helar|5íamos,toser|5ía,insistir|8ía,freír|3irían,acostar|7ía,bordar|6íais,apretar|7íais,caer|4íais,batir|5íais,detener|5dría,seguir|6íais,dar|3íais,guiar|5íamos,escribir|8ías,robar|5íamos,sacar|5íamos,actuar|6íamos,mirar|5íais,distribuir|10ías,decir|1iría,atender|7ían,saber|3rían,reír|2iríamos,vencer|6ías,agradecer|9íais,purificar|9ía,deber|5íais,cazar|5íamos,padecer|7ían,glorificar|10íais,conocer|7ías,abrir|5ía,untar|5ía,borrar|6ían,estimar|7ían,contar|6íamos,probar|6ías,reinar|6ían,soler|5ía,anunciar|8íais,producir|8íamos,reñir|5íamos,hervir|6ían,besar|5íais,pegar|5ían,reconocer|9ían,emigrar|7ía,ver|3ía,contribuir|10íais,moverse|5íamos,enterarse|7íais,quedarse|6íais,satisfacer|7ríamos,atreverse|7íais,juntarse|6ías,llamarse|6íamos,mudarse|5ías,vomit|5aríamos,convenir|6dríamos,afeitarse|7íais,salir|3dríamos,poder|3ríamos,zambullirse|9íamos",rev:"nreiría|3ír,ncearía|5se,pararía|5se,actaría|5se,allaría|5se,abría|2er,tendría|3er,ría|1,uerrías|3er,ecarías|4se,sharías|3cer,ondrías|2er,ejarías|4se,ndríais|1er,dríamos|er,rías|1,ríamos|1,ríais|1,ntirían|4se,reirían|2ír,abrían|2er,ndrían|1er,rían|1"}}};Object.keys($i).forEach((r=>{Object.keys($i[r]).forEach((a=>{$i[r][a]=Vi($i[r][a]);}));}));let{presentTense:Mi,pastTense:Li,futureTense:_i,conditional:Ji}=$i;const Ki=function(r){return Object.keys(r).reduce(((a,e)=>(a[e]=Ii(r[e]),a)),{})};let Wi=Ki(Mi),Ui=Ki(Li),Zi=Ki(_i),Ri=Ki(Ji);const Yi=function(r,a){return {first:Bi(r,a.first),second:Bi(r,a.second),third:Bi(r,a.third),firstPlural:Bi(r,a.firstPlural),secondPlural:Bi(r,a.secondPlural),thirdPlural:Bi(r,a.thirdPlural)}};var Qi={toPresent:r=>Yi(r,Mi),fromPresent:r=>Yi(r,Wi),toPast:r=>Yi(r,Li),fromPast:r=>Yi(r,Ui),toFuture:r=>Yi(r,_i),fromFuture:r=>Yi(r,Zi),toConditional:r=>Yi(r,Ji),fromConditional:r=>Yi(r,Ri)};let Xi={se:"Verb",era:"PastTense",que:"QuestionWord",como:"QuestionWord",donde:"QuestionWord",cuando:"QuestionWord",lo:"Pronoun",uno:"Determiner",si:"Conditional",hay:"Adverb","había":"Verb",sido:"Verb"};const rn=function(r,a,e){Object.values(r).forEach((r=>{e[r]=e[r]||a;}));};Object.keys(Ai).forEach((r=>{let a=Di(Ai[r]);Object.keys(a).forEach((a=>{if(Xi[a]=r,"Infinitive"===r){let r=Qi.toPresent(a);rn(r,"PresentTense",Xi),r=Qi.toPast(a),rn(r,"PastTense",Xi),r=Qi.toFuture(a),rn(r,"FutureTense",Xi),r=Qi.toConditional(a),rn(r,"Verb",Xi);}}));}));var an={model:{one:{lexicon:Xi}},methods:{one:{transform:{conjugate:Qi}}}};const en=/['‘’‛‵′`´]/,sn=function(r,a){for(let e=0;e<a.length;e+=1)if(!0===a[e][0].test(r))return a[e];return null};var nn=function(r,a,e){let s=e.methods.one.setTag,i=r[a],{regexText:n,regexNormal:o,regexNumbers:t}=e.model.two,c=i.machine||i.normal,u=i.text;en.test(i.post)&&!en.test(i.pre)&&(u+=i.post.trim());let l=sn(u,n)||sn(c,o);return !l&&/[0-9]/.test(c)&&(l=sn(c,t)),l?(s([i],l[1],e,!1,`1-regex- '${l[2]||l[0]}'`),i.confidence=.6,!0):null};var on=function(r,a,e){let s=e.methods.one.setTag,i=r[a];var n;i.tags.size>0||0!==a&&(n=i.text,(/^[A-ZÄÖÜ][a-zäöü'\u00C0-\u00FF]/.test(n)||/^[A-ZÄÖÜ]$/.test(n))&&s([i],"Noun",e,!1,"1-titlecase"));};const tn=new Set(["pendant","dans","avant","apres","pour","en"]),cn=function(r){return !!r&&(!!tn.has(r.normal)||!!(r.tags.has("Date")||r.tags.has("Month")||r.tags.has("WeekDay")))},un=function(r){return !!r&&!!r.tags.has("Ordinal")};var ln=function(r,a,e){let s=e.methods.one.setTag;const i=r[a];if(i.tags.has("NumericValue")&&i.tags.has("Cardinal")&&4===i.normal.length){let n=Number(i.normal);if(n&&!isNaN(n)&&n>1400&&n<2100){if(cn(r[a-1])||cn(r[a+1]))return s([i],"Year",e,!1,"1-tagYear"),!0;if(n>1950&&n<2025&&(un(r[a-1])||un(r[a+1])))return s([i],"Year",e,!1,"1-tagYear-close"),!0}}return null};const mn=/^[A-ZÄÖÜ]('s|,)?$/,dn=/^[A-Z-ÄÖÜ]+$/,pn=/([A-ZÄÖÜ]\.)+[A-ZÄÖÜ]?,?$/,gn=/[A-ZÄÖÜ]{2,}('s|,)?$/,hn=/([a-zäöü]\.)+[a-zäöü]\.?$/,vn={I:!0,A:!0};var fn=function(r,a,e){let s=e.methods.one.setTag,i=r[a];return i.tags.has("RomanNumeral")||i.tags.has("Acronym")?null:function(r,a){let e=r.text;return !(!1===dn.test(e)||e.length>5||vn.hasOwnProperty(e)||a.one.lexicon.hasOwnProperty(r.normal)||!0!==pn.test(e)&&!0!==hn.test(e)&&!0!==mn.test(e)&&!0!==gn.test(e))}(i,e.model)?(i.tags.clear(),s([i],["Acronym","Noun"],e,!1,"3-no-period-acronym"),!0):!vn.hasOwnProperty(i.text)&&mn.test(i.text)?(i.tags.clear(),s([i],["Acronym","Noun"],e,!1,"3-one-letter-acronym"),!0):i.tags.has("Organization")&&i.text.length<=3?(s([i],"Acronym",e,!1,"3-org-acronym"),!0):i.tags.has("Organization")&&dn.test(i.text)&&i.text.length<=6?(s([i],"Acronym",e,!1,"3-titlecase-acronym"),!0):null};var bn=function(r,a,e){let s=e.methods.one.setTag,i=r[a];0===i.tags.size&&s([i],"Noun",e,!1,"2-fallback");};const yn=function(r="",a=[]){const e=r.length;let s=7;e<=s&&(s=e-1);for(let i=s;i>1;i-=1){let s=r.substr(e-i,e);if(!0===a[s.length].hasOwnProperty(s)){return a[s.length][s]}}return null};var jn=function(r,a,e){let s=e.methods.one.setTag,i=e.model.two.suffixPatterns,n=r[a];if(0===n.tags.size){let r=yn(n.normal,i);if(null!==r)return s([n],r,e,!1,"2-suffix"),n.confidence=.7,!0;if(n.implicit&&(r=yn(n.implicit,i),null!==r))return s([n],r,e,!1,"2-implicit-suffix"),n.confidence=.7,!0}return null};var zn=function(r,a,e){const s=e.methods.one.setTag,i=e.methods.two.guessGender;let n=r[a];if(n.tags.has("Noun")&&!n.tags.has("FemaleNoun")&&!n.tags.has("MaleNoun")){let r=i(n.machine||n.normal);if(r){s([n],"m"===r?"MaleNoun":"FemaleNoun",e,!1,"3-guessGender");}}};var xn=function(r){let a=r.world;return r.docs.forEach((r=>{!function(r,a){for(let e=0;e<r.length;e+=1){let s=on(r,e,a);s=s||nn(r,e,a),ln(r,e,a);}}(r,a),function(r,a){for(let e=0;e<r.length;e+=1){let s=fn(r,e,a);s=s||jn(r,e,a),s=s||bn(r,e,a);}}(r,a),function(r,a){for(let e=0;e<r.length;e+=1)zn(r,e,a);}(r,a);})),r};const wn="Noun",Gn="Verb",Cn="Adjective";var An={regexNormal:[[/^[\w.]+@[\w.]+\.[a-z]{2,3}$/,"Email"],[/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/,"Url","http.."],[/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/,"Url",".com"],[/^[PMCE]ST$/,"Timezone","EST"],[/^ma?c'.*/,"LastName","mc'neil"],[/^o'[drlkn].*/,"LastName","o'connor"],[/^ma?cd[aeiou]/,"LastName","mcdonald"],[/^(lol)+[sz]$/,"Expression","lol"],[/^wo{2,}a*h?$/,"Expression","wooah"],[/^(hee?){2,}h?$/,"Expression","hehe"],[/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/,"Verb","un-vite"],[/^(m|k|cm|km)\/(s|h|hr)$/,"Unit","5 k/m"],[/^(ug|ng|mg)\/(l|m3|ft3)$/,"Unit","ug/L"]],regexNumbers:[[/^@1?[0-9](am|pm)$/i,"Time","3pm"],[/^@1?[0-9]:[0-9]{2}(am|pm)?$/i,"Time","3:30pm"],[/^'[0-9]{2}$/,"Year"],[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/,"Time","3:12:31"],[/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i,"Time","1:12pm"],[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i,"Time","1:12:31pm"],[/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i,"Date","iso-date"],[/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/,"Date","iso-dash"],[/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/,"Date","iso-slash"],[/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/,"Date","iso-dot"],[/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i,"Date","12-dec-2019"],[/^utc ?[+-]?[0-9]+$/,"Timezone","utc-9"],[/^(gmt|utc)[+-][0-9]{1,2}$/i,"Timezone","gmt-3"],[/^[0-9]{3}-[0-9]{4}$/,"PhoneNumber","421-0029"],[/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/,"PhoneNumber","1-800-"],[/^[-+]?[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6][-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?([kmb]|bn)?\+?$/,["Money","Value"],"$5.30"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]\+?$/,["Money","Value"],"5.30£"],[/^[-+]?[$£]?[0-9]([0-9,.])+(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i,["Money","Value"],"$400usd"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/,["Cardinal","NumericValue"],"5,999"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/,["Ordinal","NumericValue"],"53rd"],[/^\.[0-9]+\+?$/,["Cardinal","NumericValue"],".73th"],[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/,["Percent","Cardinal","NumericValue"],"-4%"],[/^\.[0-9]+%$/,["Percent","Cardinal","NumericValue"],".3%"],[/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/,["Fraction","NumericValue"],"2/3rds"],[/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/,["Value","NumberRange"],"3-4"],[/^[0-9]{1,2}(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9]{1,2}(:[0-9][0-9])?(am|pm)$/,["Time","NumberRange"],"3-4pm"],[/^[0-9.]+([a-z]{1,4})$/,"Value","9km"]],regexText:[[/^#[a-zäöü0-9_\u00C0-\u00FF]{2,}$/i,"HashTag"],[/^@\w{2,}$/,"AtMention"],[/^([A-ZÄÖÜ]\.){2}[A-ZÄÖÜ]?/i,["Acronym","Noun"],"F.B.I"],[/.{3}[lkmnp]in['‘’‛‵′`´]$/,"Gerund","chillin'"],[/.{4}s['‘’‛‵′`´]$/,"Possessive","flanders'"]],suffixPatterns:[null,{"ó":Gn},{al:Cn,an:Gn,"ió":Gn,en:Gn,ir:Gn,er:Gn,"tó":Gn},{ico:Cn,ble:Cn,nal:Cn,ial:Cn,oso:Cn,ana:Cn,ndo:Gn,ada:Gn,ron:Gn,aba:Gn,tar:Gn,"ían":Gn,rar:Gn},{ales:Cn,icos:Cn,icas:Cn,tico:Cn,tica:Cn,able:Cn,tivo:Cn,aria:Cn,bles:Cn,tiva:Cn,ante:Cn,"ción":wn,idad:wn,ento:wn,ncia:wn,"sión":wn,ando:Gn,aron:Gn,adas:Gn,tado:Gn},{"ación":wn,mente:"Adverb",iendo:Gn,ieron:Gn},{ciones:wn},{aciones:wn}]};var En=[{},{o:"m",e:"m",s:"m",l:"m",a:"f"},{os:"m",to:"m",io:"m",or:"m",do:"m",ro:"m",no:"m",mo:"m",lo:"m",te:"m",co:"m",go:"m",so:"m",je:"m",as:"f",ia:"f",ra:"f","ía":"f",ta:"f",da:"f",na:"f",la:"f",ca:"f",za:"f",sa:"f"},{tos:"m",dos:"m",ios:"m",ado:"m",ros:"m",nos:"m",los:"m",rio:"m",les:"m",ero:"m",cos:"m",ras:"f",ias:"f",tas:"f",las:"f",nas:"f",ura:"f",das:"f","ría":"f",ada:"f",era:"f","ías":"f",ica:"f",ina:"f"},{ento:"m",ores:"m",ador:"m",ismo:"m",ados:"m","ción":"f",idad:"f","sión":"f",tura:"f"},{entos:"m","ación":"f",encia:"f",lidad:"f","cción":"f",dades:"f",ncias:"f","ición":"f"},{miento:"m",adores:"m",ciones:"f","tación":"f","ración":"f","cación":"f"},{amiento:"m",aciones:"f","ización":"f"}];const kn=new Set(["nombre","año","tiempo","grupo","sistema","and","sur","tipo","álbum","nivel","origen","poder","cuerpo","hecho","campo","papel","carácter","tamaño","aire","problema","metal","idioma","corazón","video","pie","latín","obispo","single","príncipe","catalán","deseo","alemán","filósofo","huevo","tubo","géographique","cráneo","reflejo","vértice","timbre"]);var qn={f:new Set(["ciudad","parte","forma","vez","serie","the","región","muerte","agua","capital","final","línea","área","orden","edad","madre","mujer","superficie","especie","luz","voz","hija","lengua","imagen","fecha","sede","sociedad","noche","gente","calle","ley","clase"]),m:kn};var Pn=function(r){return qn.f.has(r)?"f":qn.m.has(r)?"m":function(r){const a=r.length;let e=7;a<=e&&(e=a-1);for(let s=e;s>1;s-=1){let e=r.substr(a-s,a);if(!0===En[e.length].hasOwnProperty(e))return En[e.length][e]}return null}(r)},On={compute:{tagger:xn},model:{two:An},methods:{two:{guessGender:Pn}},hooks:["tagger"]};const Fn=["Person","Place","Organization"];var Dn={Noun:{not:["Verb","Adjective","Adverb","Value","Determiner"]},Singular:{is:"Noun",not:["Plural"]},ProperNoun:{is:"Noun"},Person:{is:"Singular",also:["ProperNoun"],not:["Place","Organization","Date"]},FirstName:{is:"Person"},MaleName:{is:"FirstName",not:["FemaleName","LastName"]},FemaleName:{is:"FirstName",not:["MaleName","LastName"]},LastName:{is:"Person",not:["FirstName"]},Honorific:{is:"Noun",not:["FirstName","LastName","Value"]},Place:{is:"Singular",not:["Person","Organization"]},Country:{is:"Place",also:["ProperNoun"],not:["City"]},City:{is:"Place",also:["ProperNoun"],not:["Country"]},Region:{is:"Place",also:["ProperNoun"]},Address:{},Organization:{is:"ProperNoun",not:["Person","Place"]},SportsTeam:{is:"Organization"},School:{is:"Organization"},Company:{is:"Organization"},Plural:{is:"Noun",not:["Singular"]},Uncountable:{is:"Noun"},Pronoun:{is:"Noun",not:Fn},Actor:{is:"Noun",not:Fn},Activity:{is:"Noun",not:["Person","Place"]},Unit:{is:"Noun",not:Fn},Demonym:{is:"Noun",also:["ProperNoun"],not:Fn},Possessive:{is:"Noun"},FemaleNoun:{is:"Noun",not:["MaleNoun"]},MaleNoun:{is:"Noun",not:["FemaleNoun"]}};var Nn={Adjective:{not:["Noun","Verb","Adverb","Value"]},Comparable:{is:"Adjective"},Comparative:{is:"Adjective"},Superlative:{is:"Adjective",not:["Comparative"]},NumberRange:{},Adverb:{not:["Noun","Verb","Adjective","Value"]},Determiner:{not:["Noun","Verb","Adjective","Adverb","QuestionWord","Conjunction"]},Conjunction:{not:["Noun","Verb","Adjective","Adverb","Value","QuestionWord"]},Preposition:{not:["Noun","Verb","Adjective","Adverb","QuestionWord"]},QuestionWord:{not:["Determiner"]},Currency:{is:"Noun"},Expression:{not:["Noun","Adjective","Verb","Adverb"]},Abbreviation:{},Url:{not:["HashTag","PhoneNumber","Verb","Adjective","Value","AtMention","Email"]},PhoneNumber:{not:["HashTag","Verb","Adjective","Value","AtMention","Email"]},HashTag:{},AtMention:{is:"Noun",not:["HashTag","Email"]},Emoji:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Emoticon:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Email:{not:["HashTag","Verb","Adjective","Value","AtMention"]},Acronym:{not:["Plural","RomanNumeral"]},Negative:{not:["Noun","Adjective","Value"]},Condition:{not:["Verb","Adjective","Noun","Value"]}};var Bn={tags:Object.assign({},Dn,{Verb:{not:["Noun","Adjective","Adverb","Value","Expression"]},PresentTense:{is:"Verb",not:["PastTense"]},Infinitive:{is:"PresentTense",not:["Gerund"]},Imperative:{is:"Infinitive"},Gerund:{is:"PresentTense",not:["Copula"]},PastTense:{is:"Verb",not:["PresentTense","Gerund"]},Copula:{is:"Verb"},Modal:{is:"Verb",not:["Infinitive"]},PerfectTense:{is:"Verb",not:["Gerund"]},Pluperfect:{is:"Verb"},Participle:{is:"PastTense"},PhrasalVerb:{is:"Verb"},Particle:{is:"PhrasalVerb",not:["PastTense","PresentTense","Copula","Gerund"]},Auxiliary:{is:"Verb",not:["PastTense","PresentTense","Gerund","Conjunction"]}},{Value:{not:["Verb","Adjective","Adverb"]},Ordinal:{is:"Value",not:["Cardinal"]},Cardinal:{is:"Value",not:["Ordinal"]},Fraction:{is:"Value",not:["Noun"]},Multiple:{is:"Value"},RomanNumeral:{is:"Cardinal",not:["TextValue"]},TextValue:{is:"Value",not:["NumericValue"]},NumericValue:{is:"Value",not:["TextValue"]},Money:{is:"Cardinal"},Percent:{is:"Value"}},{Date:{not:["Verb","Adverb","Adjective"]},Month:{is:"Singular",also:["Date"],not:["Year","WeekDay","Time"]},WeekDay:{is:"Noun",also:["Date"]},Year:{is:"Date",not:["RomanNumeral"]},FinancialQuarter:{is:"Date",not:"Fraction"},Holiday:{is:"Date",also:["Noun"]},Season:{is:"Date"},Timezone:{is:"Noun",also:["Date"],not:["ProperNoun"]},Time:{is:"Date",not:["AtMention"]},Duration:{is:"Noun",also:["Date"]}},Nn)};let Tn={"?":"Ɂ",'"':'“”"❝❞',"'":"‘‛❛❜’","-":"—–",a:"ªÃÅãåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",b:"þƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",c:"¢©ĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",d:"ÐĎďĐđƉƊȡƋƌ",e:"ĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗ",f:"ƑƒϜϝӺӻҒғſ",g:"ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",h:"ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",i:"ĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",j:"ĴĵǰȷɈɉϳЈј",k:"ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",l:"ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",m:"ΜϺϻМмӍӎ",n:"ŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",o:"ÕØðõøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",p:"ƤΡρϷϸϼРрҎҏÞ",q:"Ɋɋ",r:"ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",s:"ŚśŜŝŞşŠšƧƨȘșȿЅѕ",t:"ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",u:"µŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",v:"νѴѵѶѷ",w:"ŴŵƜωώϖϢϣШЩшщѡѿ",x:"×ΧχϗϰХхҲҳӼӽӾӿ",y:"ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",z:"ŹźŻżŽžƵƶȤȥɀΖ"},Hn={};Object.keys(Tn).forEach((function(r){Tn[r].split("").forEach((function(a){Hn[a]=r;}));}));var Sn=Hn,Vn=[],In={mutate:r=>{r.model.one.unicode=Sn,r.model.one.contractions=Vn,delete r.model.one.lexicon.que;}};f.plugin(In),f.plugin(Bn),f.plugin(an),f.plugin(On);const $n=function(r,a){return f(r,a)};$n.verbose=function(r){let a="undefined"==typeof process?self.env||{}:process.env;return a.DEBUG_TAGS="tagger"===r||!0===r||"",a.DEBUG_MATCH="match"===r||!0===r||"",a.DEBUG_CHUNKS="chunker"===r||!0===r||"",this};

    /* one/spanish/App.svelte generated by Svelte v3.43.0 */
    const file = "one/spanish/App.svelte";

    // (58:4) <Two>
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
    		source: "(58:4) <Two>",
    		ctx
    	});

    	return block;
    }

    // (45:2) <Page bottom="40px">
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
    			div0.textContent = "es-compromise";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "part-of speech tagging in spanish";
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
    			add_location(div0, file, 45, 4, 1157);
    			attr_dev(div1, "class", "down tab desc");
    			add_location(div1, file, 46, 4, 1198);
    			attr_dev(div2, "class", "top");
    			add_location(div2, file, 49, 8, 1328);
    			attr_dev(div3, "class", "res svelte-da5iiy");
    			set_style(div3, "position", "relative");
    			add_location(div3, file, 52, 8, 1458);
    			set_style(div4, "flex-grow", "1");
    			add_location(div4, file, 48, 6, 1294);
    			attr_dev(div5, "class", "both");
    			add_location(div5, file, 47, 4, 1269);
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
    		source: "(45:2) <Page bottom=\\\"40px\\\">",
    		ctx
    	});

    	return block;
    }

    // (62:2) <Below>
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
    			attr_dev(a0, "href", "https://observablehq.com/@spencermountain/es-compromise");
    			attr_dev(a0, "class", "");
    			add_location(a0, file, 62, 4, 1652);
    			attr_dev(a1, "href", "https://github.com/nlp-compromise/es-compromise");
    			attr_dev(a1, "class", "");
    			add_location(a1, file, 63, 4, 1740);
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
    		source: "(62:2) <Below>",
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
    			add_location(div, file, 42, 0, 1070);
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

    	let text = `Sí, sabes que ya llevo un rato mirándote
Tengo que bailar contigo hoy
Vi que tu mirada ya estaba llamándome
Muéstrame el camino que yo voy
Oh, tú, tú eres el imán y yo soy el metal
Me voy acercando y voy armando el plan
Solo con pensarlo se acelera el pulso (oh yeah)
Ya, ya me estás gustando más de lo normal
Todos mis sentidos van pidiendo más
Esto hay que tomarlo sin ningún apuro`;

    	let html = '';

    	const onchange = function () {
    		let doc = $n(text);

    		$$invalidate(0, html = doc.html({
    			'.nouns': '#Noun+',
    			'.verbs': '#Verb+',
    			'.adjectives': '#Adjective'
    		}));
    	};

    	onchange();

    	let example = `import pln from 'es-compromise'

let doc = pln('Tú eres el imán ..')
doc.json()
/*[{
    "text": "Tú eres el imán ..",
    "terms": [
      {
        "text": "Tú",
        "tags": ["Noun"],
        "normal": "tú",
        "chunk": "Noun"
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
    		nlp: $n,
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
