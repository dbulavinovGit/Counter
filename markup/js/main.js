jQuery(function() {
	initchatrsCounter();
});

function initchatrsCounter() {
	jQuery('.textarea-holder').chartsCounter({
	});
}

;(function($){
	function ChartsCounter(options) {
		this.options = $.extend({
			activeClass: 'active',
			maxHolder: '.total',
			currentCharts: '.left',
			defaultMaxLengths: '20',
			maxDisable: true
		}, options);
		this.init();
	}

	ChartsCounter.prototype = {
		init: function() {
			if (this.options.holder) {
				this.findElements();
				this.setMaxLength();
				this.attachEvents();
				this.setDefaultCharts();
				this.disableInput();
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.input = this.holder.find('textarea');
			this.placeholder = this.input.attr('placeholder');
			this.maxHolder = this.holder.find(this.options.maxHolder);
			this.current = this.holder.find(this.options.currentCharts);
			this.maxValue;
		},
		attachEvents: function() {
			var self = this;

			this.eventHandler = function(e) {
				self.setLeftCharsets();
			}

			this.input.on('input', this.eventHandler);
		},
		setMaxLength: function() {
			return this.maxValue = (this.input.attr('maxlength')) ? this.maxValue = this.input.attr('maxlength') : this.maxValue = this.options.defaultMaxLengths;
		},
		setDefaultCharts: function() {
			this.maxHolder.text(this.maxValue);
			this.current.text(this.maxValue);
		},
		calcCharts: function() {
			var inputValue = this.input.val().length;

			return this.maxValue - inputValue;
		},
		setLeftCharsets: function() {
			this.current.text(this.calcCharts());
		},
		disableInput: function() {
			if(this.options.maxDisable) {
				this.input.attr('maxlength', this.maxValue)
			}
		},
		destroy: function() {
			this.input.off('input', this.eventHandler);
			this.input.val(' ');
			this.input.attr('placeholder', this.placeholder);
		}
	};

	// jQuery plugin interface
	$.fn.chartsCounter = function(opt) {
		return this.each(function() {
			jQuery(this).data('ChartsCounter', new ChartsCounter($.extend(opt, { holder: this })));
		});
	};
}(jQuery));