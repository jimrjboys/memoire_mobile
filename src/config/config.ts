export class Config {
	/*public static readonly application = {
		name : 'fintek',
		logo : {
			url: 'assets/icon/logo.png',
			alt: 'fintek logo'
		},
		logo_circle : {
			url: 'assets/icon/circle_logo.png',
			alt: 'fintek logo'
		}
	}
	public static readonly host = {
		//local: 'http://192.168.2.165/',
		local: 'http://192.168.1.165',
		preprod: 'http://192.168.1.250/',
		prod: 'http://frhb12419ds.ikexpress.com:5780'
	}
	public static readonly endpoints = {
		bankcard: {
			url: 'http://192.168.1.250/bankcard/app.php/api/',
			//url: Config.host.local + ':8000/api/',
			token: 'bankcardfintek'
			//token: 'josias'
		},
		orchid_api: {
			url: 'http://192.168.1.250:8001/web/app_dev.php/api/',
		},
		mini_orchid_api: {
			url: 'http://192.168.1.250/miniOrchid/app.php/app/account/api/',
			url_local: Config.host.local + '/miniOrchid/app/account/api',
		},
		update: {
			url:  `http://192.168.1.250:8004/finpay/`
		},
		cyclos : Config.host.local + ':8080/cyclos/api/'
	}
	public static readonly apk_beta = {
		url: `http://192.168.1.250:8004/finpay/apk/beta/`
	}
	public static readonly CYCLOS_URL: string = 'CYCLOS_URL';
  public static readonly SESSION_STO: string = 'SESSION_STO';
  public static readonly LOGIN_EVENT: string = 'LOGIN_EVENT';
  public static readonly MOOV_EVENT: string =  'MOOV_EVENT';
  public static readonly MOOV_EVENT_RM: string =  'MOOV_EVENT_RM';

  public static readonly credential = {
  	fintek: {
  		login: 'fintek'
  	}
  }*/

  public static readonly application = {
	name : 'fintek',
	logo : {
		url: 'assets/icon/logo.png',
		alt: 'fintek logo'
	},
	logo_circle : {
		url: 'assets/icon/circle_logo.png',
		alt: 'fintek logo'
	}
}
public static readonly host = {
	//local: 'http://192.168.2.165/',
	local: 'http://192.168.1.165',
	preprod: 'http://192.168.1.250/',
	prod: 'http://frhb12419ds.ikexpress.com:5780'
}
public static readonly endpoints = {
	bankcard: {
		url: 'http://192.168.1.250/bankcard/app.php/api/',
		//url: Config.host.local + ':8000/api/',
		token: 'bankcardfintek'
		//token: 'josias'
	},
	orchid_api: {
		url: 'http://192.168.1.250:8001/web/app_dev.php/api/',
	},
	mini_orchid_api: {
		url: 'http://192.168.1.250/miniOrchid/app.php/app/account/api/',
		//url_local: Config.host.local + '/miniOrchid/app/account/api',
		url_prod: "http://frhb12419ds.ikexpress.com:5780/dev/miniOrchid/web/app_dev.php/app/account/api"
	},
	update: {
		url:  `http://192.168.1.250:8004/finpay/`
	},
	//cyclos : Config.host.local + ':8080/cyclos/api/'
	cyclos : 'http://frhb12419ds.ikexpress.com:5788/cyclos/api/'
}
public static readonly apk_beta = {
	url: `http://192.168.1.250:8004/finpay/apk/beta/`
}
public static readonly CYCLOS_URL: string = 'CYCLOS_URL';
public static readonly SESSION_STO: string = 'SESSION_STO';
public static readonly LOGIN_EVENT: string = 'LOGIN_EVENT';
public static readonly MOOV_EVENT: string =  'MOOV_EVENT';
public static readonly MOOV_EVENT_RM: string =  'MOOV_EVENT_RM';
public static readonly transfertFees: number = 500;
public static readonly FINTEK_ID: string ="1044632311262315080";

public static readonly credential = {
  fintek: {
	  login: 'fintek'
  }
}

}