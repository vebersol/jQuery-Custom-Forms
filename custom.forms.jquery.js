/**!

	jQuery Custom Forms Plugin
	Version: 0.6.2.1
	Site: http://vebersol.net/demos/jquery-custom-forms/
	
	Author: Vinícius Ebersol
	
	License: MIT License
	
*/

(function($){

	var CustomForm = function(element, options) {
		this.element = element;
		this.options = options;
		this.formElements = this.element.find('input, select');
		
		this.init();
	};
	
	CustomForm.prototype = {
		init: function() {
			this.setup();
			this.bind();
		},
		
		setup: function() {
			var _this = this;
			this.formElements.each(function() {
				_this.create($(this));
			});
		},
		
		bind: function() {
			var _this = this;
			
			$(document).bind('toggleFormElement', function(ev, element, fakeElement, className) {
				if (_this.isRadio(element)) {
					_this.toggleRadio(element, fakeElement, className);
				}
				else {
					_this.toggleCheckbox(element, fakeElement, className);
				}
			});
			
			$(document).bind('changeSelectValue', function(ev, element, fakeSelect) {
				var optionName = $(element).find('option:selected').html();
				fakeSelect.html(optionName);
			});
		},
		
		create: function(element) {
			var i,
				keyClass = this.options.keyClass.split(',');

			for (i = keyClass.length - 1; i >= 0; i--) {
				if (element.hasClass($.trim(keyClass[i]))) {
					if (element.get(0).nodeName == 'INPUT') {
						this.createCustomInput(element);
						return;
					}
					
					this.createCustomSelect(element);
				}
			}

		},
		
		createCustomSelect: function(element) {
			var _this = this,
				newValue,
				fakeSelect = this.createFakeElement(element, 'select');
			
			newValue = function() {
				$(document).trigger('changeSelectValue', [element, fakeSelect]);
			};
			
			if (this.options.enableWrapper === true) {
				element.wrap('<div class="' + this.setClass('wrapper') + '"></div>');
			}

			element.before(fakeSelect);
			element.on({
				change: function() {
					newValue();
				},
				focus: function() {
					fakeSelect.addClass(_this.setClass('focused'));
					newValue();
				},
				blur: function() {
					fakeSelect.removeClass(_this.setClass('focused'));
				},
				keyup: function() {
					newValue();
				},
				mousedown: function() {
					newValue();
				}
			});

			
			fakeSelect.attr('id', 'label_' + element.attr('id'));
			element.css({
				opacity: 0,
				position: 'relative',
				zIndex: 10,
				width: fakeSelect.outerWidth(),
				height: fakeSelect.outerHeight()
			});
		},
		
		createCustomInput: function(element) {
			var _this = this,
				toggleFormElement,
				fakeElement = this.createFakeElement(element, element.get(0).type),
				className = this.toSlug(element.attr('name'));

			fakeElement.addClass(className);
			element.addClass(className);
			
			
			element.before(fakeElement);
			element.css({
				opacity:0,
				position: 'absolute',
				left: -99999
			});
			
			toggleFormElement = function() {
				$(document).trigger('toggleFormElement', [element, fakeElement, className]);
			};
			
			if (element.attr('checked')) {
				fakeElement.addClass(this.setClass('checked'));
			}
			
			element.on({
				focus: function() {
					fakeElement.addClass(_this.setClass('focused'));
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
				},
				blur: function() {
					fakeElement.removeClass(_this.setClass('focused'));
				},
				keypress: function(ev) {
					if (!ev.which && ((ev.charCode || ev.charCode === 0) ? ev.charCode: ev.keyCode)) {
						ev.which = ev.charCode || ev.keyCode;
					}
					
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					
				},
				change: function() {
					fakeElement.addClass(_this.setClass('focused'));
					if (_this.isRadio(element)) {
						toggleFormElement();
					} else {
						fakeElement.toggleClass(_this.setClass('checked'));
					}
				}
			});
			
			fakeElement.on({
				click: function() {
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					else {
						_this.toggleCheckbox(element, fakeElement, className);
					}
				}
			});
		},
		
		toggleRadio: function(element, fakeElement, className) {
			$('input.' + className).attr('checked', false);
			$('span.' + className).removeClass(this.setClass('checked')).removeClass(this.setClass('focused'));				
			
			fakeElement.addClass(this.setClass('checked')).addClass(this.setClass('focused'));
			fakeElement.next('input.' + className).attr('checked', true);
		},
		
		toggleCheckbox: function(element, fakeElement, className) {
			if (element.attr('checked')) {
				fakeElement.next('input.' + className).attr('checked', false);
				fakeElement.removeClass(this.setClass('checked'));
			}
			else {
				fakeElement.next('input.' + className).attr('checked', true);
				fakeElement.addClass(this.setClass('checked'));
			}
		},
		
		createFakeElement: function(element, type) {
			var value = (type == 'select') ? $(element).find('option:selected').html() : '',
				fakeElement = $('<span class="'+ this.setClass(type) +'">'+ value +'</span>');

			if (element.attr('disabled') !== undefined) {
				fakeElement.addClass(this.setClass('disabled'));
			}

			return fakeElement;
		},
		
		isRadio: function(element) {
			return element.get(0).type == 'radio';
		},
		
		setClass: function(name) {
			return this.options.prefix + name;
		},
		
		toSlug: function(text) {
			return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
				
		}
	};

	var defaultOptions = {
		prefix: 'custom-form-',
		keyClass: 'cform',
		enableWrapper: false
	};
	
	
	$.fn.customForm = function(options) {
		options = $.extend(defaultOptions, options);
		return new CustomForm(this, options);
	};

})(jQuery);