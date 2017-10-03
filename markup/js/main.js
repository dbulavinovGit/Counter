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
			maxData: 'data-max',
			currentCharts: '.left',
			maxDisable: true
		}, options);
		this.init();
	}

	ChartsCounter.prototype = {
		init: function() {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.setDefaultCharts();
				this.disableInput();
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.input = this.holder.find('textarea');
			this.placeholder = this.input.attr('placeholder');
			this.maxValue = this.input.attr(this.options.maxData);
			this.maxHolder = this.holder.find(this.options.maxHolder);
			this.current = this.holder.find(this.options.currentCharts);
		},
		attachEvents: function() {
			var self = this;

			this.eventHandler = function(e) {
				self.setLeftCharsets();
			}

			this.input.on('input', this.eventHandler);
		},
		setDefaultCharts: function() {
			if(this.maxValue) {
				this.maxHolder.text(this.maxValue);
				this.current.text(this.maxValue);
			}
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