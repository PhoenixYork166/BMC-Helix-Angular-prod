/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported CKBUILDER_CONFIG */

// This build config was used to build release and debug versions of CKEditor

var CKBUILDER_CONFIG = {
    skin: 'moono',
    ignore: [
        'bender.js',
        '.bender',
        'bender-err.log',
        'bender-out.log',
        'dev',
        'docs',
        '.DS_Store',
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'gruntfile.js',
        '.idea',
        '.jscsrc',
        '.jshintignore',
        '.jshintrc',
        'less',
        '.mailmap',
        'node_modules',
        'package.json',
        'README.md',
        'tests'
    ],
    plugins: {
        // plugins added on top of the basic package
        'colorbutton': 1,
        'contextmenu': 1,
        'font': 1,
        'format': 1,
        'justify': 1,
        'panelbutton': 1,
        'stylescombo': 1,
        'widget': 1,

        // plugins from the basic package
        'about': 1,
        'basicstyles': 1,
        'clipboard': 1,
        'enterkey': 1,
        'entities': 1,
        'floatingspace': 1,
        'indentlist': 1,
        'link': 1,
        'list': 1,
        'toolbar': 1,
        'undo': 1,
        'wysiwygarea': 1,

        /*
	 	 Put plugins below into `plugins` directory when building CKEditor.

	 	 Extra plugins required by other teams:
		 - autogrow
		 - base64image
		 - filebrowser
		 - find
		 - image
		 - imagepaste
		 - maximize
		 - notification
		 - notificationaggregator
		 - pagebreak
		 - pastefromword
		 - popup
		 - scayt
		 - sharedspace
		 - sourcedialog
		 - table
		 - uploadimage
		 - uploadwidget
		 - youtube
		 - autocomplete
		 - textmatch
		 - textwatcher,
		 - divarea,
		 - tabletools,
		 - tableselection,
		 - tableresize,
		 - dialogadvtab,
		 - liststyle,
		 - copyformatting,
		 - indentblock,
		 - indent,
		 - sourcearea,
		 - print,
		 - preview,
		 - showblocks

		 Extra plugin required by rich-text directive:
		 - colordialog

		 Dependency plugins:
		 - ajax -   required by pastetools
		 - button - required by menubutton, toolbar
		 - dialog - required by clipboard, find/replace and 6 other plugins
		 - dialogui - required by dialog
		 - fakeobjects - required by link, pagebreak
		 - floatpanel - required by menu
		 - filetools - required by filebrowser, uploadwidget
		 - indent - required by indentlist
		 - lineutils - required by widget
		 - listblock - required by list
		 - menu - required by menubutton
		 - menubutton - required by scayt
		 - notification - required by clipboard, notificationaggregator
		 - panel - required by floatpanel
		 - pastetools - required by pastefromword
		 - richcombo - required by font, format
		 - widgetselection - required by widget
		 - xml - required by ajax
		*/
    },
    languages: {
        'af': 1,
        'ar': 1,
        'az': 1,
        'bg': 1,
        'bn': 1,
        'bs': 1,
        'ca': 1,
        'cs': 1,
        'cy': 1,
        'da': 1,
        'de': 1,
        'de-ch': 1,
        'el': 1,
        'en': 1,
        'en-au': 1,
        'en-ca': 1,
        'en-gb': 1,
        'eo': 1,
        'es': 1,
        'et': 1,
        'eu': 1,
        'fa': 1,
        'fi': 1,
        'fo': 1,
        'fr': 1,
        'fr-ca': 1,
        'gl': 1,
        'gu': 1,
        'he': 1,
        'hi': 1,
        'hr': 1,
        'hu': 1,
        'id': 1,
        'is': 1,
        'it': 1,
        'ja': 1,
        'ka': 1,
        'km': 1,
        'ko': 1,
        'ku': 1,
        'lt': 1,
        'lv': 1,
        'mk': 1,
        'mn': 1,
        'ms': 1,
        'nb': 1,
        'nl': 1,
        'no': 1,
        'oc': 1,
        'pl': 1,
        'pt': 1,
        'pt-br': 1,
        'ro': 1,
        'ru': 1,
        'si': 1,
        'sk': 1,
        'sl': 1,
        'sq': 1,
        'sr': 1,
        'sr-latn': 1,
        'sv': 1,
        'th': 1,
        'tr': 1,
        'tt': 1,
        'ug': 1,
        'uk': 1,
        'vi': 1,
        'zh': 1,
        'zh-cn': 1
    }
};
