import { WithContext, WebSite, Organization } from 'schema-dts';
export type JsonLdDefaultType = {
    website?: WithContext<WebSite>;
    publisher?: Organization;
};
export declare const JsonLdData: {
    website?: WithContext<WebSite>;
    publisher?: Organization;
};
