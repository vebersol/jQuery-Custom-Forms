# jQuery Custom Forms

A plugin to generate accessible custom forms: select, radio, checkbox.

Demo: http://vebersol.net/demos/jquery-custom-forms/

# Usage

```html
<!-- Add jQuery and the plugin file in your HTML page -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery.custom.forms-0.5.js"></script>

<!-- Add the class "cform" to all elements that you want to use as custom form -->
<select name="data[select]" class="cform">
	<option value=""></option>
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
</select>

<input type="radio" name="data[radio]" value="option1" id="option1" class="cform">

<input type="checkbox" name="data[check]" value="female" id="optiona" class="cform">

<!-- Setup the plugin and enjoy yourself! -->
<script type="text/javascript">
	$(function() {
		$('form').customForm();
	});
</script>
```

# API

### $.customForm(options)

Use this method to build the custom forms.

### Options

Options should be an object like:

```javascript
var options = {
	prefix: 'my-own-prefix',
	keyClass: 'my-own-key-class'
};

$.customForm(options);
```

* **prefix:** (String)  
A prefix to add to all class names used on elements created by this plugin.  
*Default value: 'custom-form-'*

* **keyClass:** (String)  
The class used to allow element to be replaced by a custom form element.  
*Default value: 'cform'*

# License

MIT License - http://www.opensource.org/licenses/MIT
GPL License - http://www.gnu.org/licenses/gpl.html