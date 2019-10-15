import { Injectable } from '@angular/core';
import { SfProvider } from '../sf/sf'
import { Config } from '../../config/config';
import { Observable } from 'rxjs';
import { Individual } from '../../lib/entities/individual';
import { Transfer } from '../../lib/models/transfer';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class OrchidProvider extends SfProvider {

	//protected url = Config.endpoints.mini_orchid_api.url_local
	protected url ="http://frhb12419ds.ikexpress.com:5780/dev/miniOrchid/web/app_dev.php/app/account/api/"

	protected subResponse($ref : Observable<any>) {
		return new Promise((resolve) => {
			$ref.subscribe((response) => {
				let status = response.json().status
				switch (status) {
					case 200:
						resolve(true)
						break;
					
					case 204:
						resolve(false)
						break;
					
					case 404:
						resolve(false)
						break;
				}
			}, (error) => {
				console.error(error)
				resolve(false)
			})
		})
	}

	public alreadyMember(individual: Individual) {
		//let $ref = this.request(`${Config.endpoints.orchid_api.url}cin/${cin}`)
		//let $ref = this.request(`${Config.endpoints.mini_orchid_api.url}cin/${individual.getCin(true)}`)
		let $ref = this.request(this.url +"cin/" + individual.getCin(true))
		return this.subResponse($ref);
	}

	public setTransfer(transfer: Transfer) {
		//let $ref = this.fetch('/transfert', transfer, 'POST')
		let $ref = this.request(this.url + 'transfert', transfer, 'POST')
		return this.subResponse($ref)
	}

	public valideAccount(cin: string, account: string) {
		let $ref = this.request(`${Config.endpoints.orchid_api.url}ibanCin`, 
		{
			cin: cin,
			code: account
		}, 'POST')

		return this.subResponse($ref)
	}

	public isExistAccount(cin:string) {
		return new Promise((resolve,reject) => {
			this.http.get( this.url + "cin/" + cin, {responseType:ResponseContentType.Json})
				.toPromise()
				.then((response:any) => {
					console.log(response)
					var id:string = response._body.account.id
					var status:string = response._body.account.status
					console.log(status)
					var user:any = {
						idOrchid:id,
						//status:	status,
						status:	true
					}
					// if(status)
					// 	resolve(id)
					// else {
					// 	//resolve(false)
					// 	resolve(id)
					// }
					resolve(user)
				}).catch(error => {
					reject(error)
				})
		}) 
	}

}
