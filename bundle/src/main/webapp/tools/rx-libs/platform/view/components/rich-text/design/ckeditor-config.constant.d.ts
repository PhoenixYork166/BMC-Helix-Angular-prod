export declare const RX_CKEDITOR_CONFIG: {
    title: boolean;
    skin: string;
    toolbar: (string | string[])[];
    stylesSet: ({
        name: string;
        element: string;
        attributes: {
            class: string;
            cellpadding?: undefined;
            cellspacing?: undefined;
        };
    } | {
        name: string;
        element: string;
        attributes?: undefined;
    } | {
        name: string;
        element: string;
        attributes: {
            cellpadding: string;
            cellspacing: string;
            class: string;
        };
    })[];
    format_tags: string;
    extraPlugins: string;
    extraAllowedContent: string;
};
