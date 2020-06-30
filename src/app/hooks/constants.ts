//Regular new client
export const IS_AUTHENTICATED_ANONYMOUSLY = "";
//User Logged
export const ROLE_USER = "ROLE_USER";
//Proyect Owner
export const ROLE_ADMIN = "ROLE_ADMIN";
//Only developpers
export const ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN";

export const OFFER_TYPE_PERCENTAGE = "percentage";
export const OFFER_TYPE_ABSOLUTE = "absolute";

export const USER_EVENT_UPDATED = "user:updated";


export const DISPLAY_MODE_FULL = "full";
export const DISPLAY_MODE_SIDE = "side";
export const DISPLAY_MODE_BASIC = "basic";


export const DEFAULT_PRICElIST_CODE = "pvp";


export const PRODUCT_ATTRIBUTE_TYPE_BASE = "base";
export const PRODUCT_ATTRIBUTE_TYPE_SINGLE = "single";
export const PRODUCT_ATTRIBUTE_TYPE_IMG = "image";
export const PRODUCT_ATTRIBUTE_TYPE_COLOR = "color";

export const ITEMS_PER_PAGE: number = 5;
export const ITEMS_PER_LIST: number = 20;
export const ITEMS_TYPE_PRODUCT: string = 'product';

export const SORT_NEW: string = 'orderCreatedDate';
export const SORT_OLD: string = 'orderCreatedDate-ASC';

export const SORT_POPULAR: string = 'orderSales';
export const SORT_UNPOPULAR: string = 'orderSales-ASC';

export const SORT_FEATURED: string = 'featured-true';
export const SORT_PRICE: string = 'orderPrice';
export const SORT_UPRICE: string = 'orderPrice-ASC';


export const TOAST_DEFAUL_DURATION = 3000;
export const TOAST_DEFAUL_POSITION = "top";
export const TOAST_CLASS_ERROR = "toastMsg toastMsg-error";
export const TOAST_CLASS_SUCCESS = "toastMsg toastMsg-success";
export const TOAST_ERROR_TRANS_KEY = "error";
export const TOAST_ERROR_TRANS_DEFAULT = "server";


export const ORDER_STATUS_PREPARE = 'prepare';
export const ORDER_STATUS_CONFIRM = 'confirm';
export const ORDER_STATUS_COMPLETE = 'complete';
export const ORDER_STATUS_CANCELED = 'canceled';
export const PAYMENT_VALUE_ABSOLUTE = 'absolute';
export const PAYMENT_VALUE_PERCENTAGE = 'percentaje';

//default status
export const PAYMENT_STATUS_PREPARE = 'prepare';
//payment was confirm by entity
export const PAYMENT_STATUS_CONFIRM = 'confirm';
//payment was do it by user
export const PAYMENT_STATUS_COMPLETE = 'complete';
//payment was cancel by user 
export const PAYMENT_STATUS_CANCEL = 'cancel';
//payment was rejected by entity
export const PAYMENT_STATUS_ERROR = 'error';

export const SOLDPRODUCTATTRIBUTE_TYPE_ATTRIBUTECOMBO = "combo";
export const SOLDPRODUCTATTRIBUTE_TYPE_ATTRIBUTEVALUE = "option";

export const NOTIFICATION_EVENT_RECEIVED = "notification:received";
export const NOTIFICATION_EVENT_UPDATED = "notification:updated";


export const CONSOLE_LOG = "log"
export const CONSOLE_INFO = "info"
export const CONSOLE_ERROR = "error"

export const NATIVE_ERROR_FOUND = 2;
export const NATIVE_ERROR_FOUND_TEXT = "plugin_not_installed";
export const NATIVE_ERROR_CORDOVA = "cordova_not_available";


export const VALIDATE_STEP_CART = 1;
export const VALIDATE_STEP_DATA = 2;
export const VALIDATE_STEP_CREATE = 3;

export const QR_PWD_KEY = "Ya que la contraseña para el qr puede ser qualquier texto, la contraseña puede ser este mismo texto";


export const HEADER_SHOW_TITLE = 'title';
export const HEADER_SHOW_IMAGE = 'image';
export const HEADER_SHOW_SELECT = 'select';

export const DEFAULT_VAT = 0.21;

export const SUPPLIER_MODE_EMIT: string = "emit"
export const SUPPLIER_MODE_RECEIVE: string = "receive"

export const DEEPLINKS_SCHEME: string = 'billio';
export const DEEPLINKS_HOST: string = 'com.essedi.billio';
export const DEEPLINKS_URL: string = DEEPLINKS_SCHEME + '://' + DEEPLINKS_HOST;

export const SCAN_MODE_CUSTOMER: string = 'customer';
export const SCAN_MODE_CATALOG: string = 'catalog';
export const SCAN_MODE_SUPPLIER: string = 'supplier';

export const ATTACHMENT_DEFAULT_LIMIT: number = 3;