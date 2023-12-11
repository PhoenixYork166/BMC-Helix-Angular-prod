export const RX_CKEDITOR_CONFIG = {
    title: false,
    skin: 'rich-text,skins/rich-text/',
    toolbar: [
        [
            'Bold',
            'Italic',
            'Strike',
            'Underline',
            '-',
            'Link',
            'Unlink',
            '-',
            'NumberedList',
            'BulletedList',
            'Outdent',
            'Indent',
            '-',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            '-',
            'ExpressionEditor'
        ],
        '/',
        ['Format', 'Styles', 'Font', 'FontSize', 'TextColor']
    ],
    stylesSet: [
        {
            name: 'Italic Title',
            element: 'h2',
            attributes: {
                class: 'italic-title'
            }
        },
        {
            name: 'Subtitle',
            element: 'h3',
            attributes: {
                class: 'subtitle'
            }
        },
        {
            name: 'Special Container',
            element: 'div',
            attributes: {
                class: 'special-containers'
            }
        },
        {
            name: 'Marker',
            element: 'span',
            attributes: {
                class: 'marker'
            }
        },
        {
            name: 'Small',
            element: 'small'
        },
        {
            name: 'Computer Code',
            element: 'code'
        },
        {
            name: 'Keyboard Phrase',
            element: 'kbd'
        },
        {
            name: 'Sample Text',
            element: 'samp'
        },
        {
            name: 'Variable',
            element: 'var'
        },
        {
            name: 'Deleted Text',
            element: 'del'
        },
        {
            name: 'Inserted Text',
            element: 'ins'
        },
        {
            name: 'Cited Work',
            element: 'cite'
        },
        {
            name: 'Inline Quotation',
            element: 'q'
        },
        {
            name: 'Compact Table',
            element: 'table',
            attributes: {
                cellpadding: '5',
                cellspacing: '0',
                class: 'compact-table'
            }
        },
        {
            name: 'Borderless Table',
            element: 'table',
            attributes: {
                class: 'borderless-table'
            }
        },
        {
            name: 'Square Bulleted List',
            element: 'ul',
            attributes: {
                class: 'square-bulleted-list'
            }
        }
    ],
    format_tags: 'p;h1;h2;h3;pre',
    extraPlugins: 'expression-editor, colordialog',
    extraAllowedContent: 'span [rx-expression, contenteditable, title] (rx-expression)'
};
//# sourceMappingURL=ckeditor-config.constant.js.map