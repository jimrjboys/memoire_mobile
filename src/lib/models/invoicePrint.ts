import { Invoice } from "./invoice";

export  class  InvoicePrint {
	private status:string
	private recipient:string
	private dateHour:string
	private clientRef:string
	private invoiceRef:string
	private receivedAmount:string
	private invoiceAmount:string
	private rendering:string
	private mounth:string
	private agent:string
	private agentCode:string
	private transferFees:string
	 
	constructor() {
		this.status = ""
		this.recipient =""
		this.dateHour =""
		this.clientRef =  ""
		this.invoiceRef =  ""
		this.receivedAmount =  ""
		this.invoiceAmount =  ""
		this.rendering =  ""
		this.mounth =  ""
		this.agent =  ""
		this.agentCode = ""
		this.transferFees = ""
	}

	tpePrint(invoice : Invoice) : InvoicePrint {
		console.log("test")

		let date= new Date();
		let facture = new InvoicePrint();
		console.log(date.toLocaleDateString())
		console.log(date.getHours().toString())
		console.log(date.getMinutes().toString())
		console.log(facture.tofrMounth(date.getMonth()))
		console.log(date.getFullYear())
	
		let minutesNow = date.getMinutes().toString();
		let hourNow  = date.getHours().toString()
		let dateNow =  date.toLocaleDateString();
		let dateHour = dateNow + " à " + hourNow + ":" + minutesNow;
		let mounthNow = facture.tofrMounth(date.getMonth())
		let yearNow = date.getFullYear().toString();
		let mounth = mounthNow + "  " + yearNow 
	
		facture.setDateHour(dateHour)
		facture.setRecipient("JIRAMA")
		facture.setStatus("Payé")
		facture.setClientRef(invoice.cust_ref)
		facture.setInvoiceRef(invoice.ref)
		facture.setReceivedAmount(invoice.receivedAmount)
		facture.setInvoiceAmount(invoice.invoiceAmount)
		facture.setRendering(invoice.rendering)
		facture.setMounth(mounth)
		facture.setAgent(invoice.agent)
		facture.setAgentCode(invoice.agentCode)
		facture.setTransferFees(invoice.transferFees)
		return facture;
	}

	public tofrMounth(i:number) :any {
		let frMounth = ['Janvier','Fevrier','Mars','Avril','Mais', 'Juin', 'Juillet','Août','Septembre','Novembre','Décembre'];
		return frMounth[i]
	}

	public setStatus(status:string) {
		this.status = this.returnWithoutUndefined(status);
	}

	public setDateHour(dateHour:string){
		this.dateHour = this.returnWithoutUndefined(dateHour);
	}

	public getStatus() :string {
		return this.status
	}

	public getDateHour() :string {
		return this.dateHour
	}

	public getRecipient() : string {
		return this.recipient
	}

	public setRecipient(recipient : string) {
		this.recipient = this.returnWithoutUndefined(recipient)
	}

	private returnWithoutUndefined(val:any): string{
		if(val == undefined)
			return "";
		else
			return val
	}

    public  getClientRef() :string{
        return this.clientRef;
    }

    public setClientRef(clientRef : string) {
        this.clientRef = this.returnWithoutUndefined(clientRef);
    }

    public getInvoiceRef() : string {
        return this.invoiceRef;
    }

    public  setInvoiceRef(invoiceRef : string) {
        this.invoiceRef = this.returnWithoutUndefined(invoiceRef);
    }

    public getReceivedAmount() :string {
        return this.receivedAmount;
    }

    public setReceivedAmount(receivedAmount : string) {
        this.receivedAmount = this.returnWithoutUndefined(receivedAmount);
    }

    public  getRendering() :string {
        return this.rendering;
    }

    public setRendering(rendering:string) {
        this.rendering = this.returnWithoutUndefined(rendering);
    }

    public getMounth() :string {
        return this.mounth;
    }

    public  setMounth(mounth:string) {
        this.mounth = this.returnWithoutUndefined(mounth);
    }

    public  getAgent() :string {
        return this.agent;
    }

    public setAgent(agent:string) {
        this.agent = this.returnWithoutUndefined(agent);
    }

    publicgetAgentCode() :string {
        return this.agentCode;
    }

    public setAgentCode(agentCode:string) {
        this.agentCode = this.returnWithoutUndefined(agentCode);
    }

    public  getInvoiceAmount() :string {
        return this.invoiceAmount;
    }

    public  setInvoiceAmount(invoiceAmount) {
        this.invoiceAmount = this.returnWithoutUndefined(invoiceAmount);
	}
	
	public  getTransferFees() : string {
        return this.transferFees;
    }

    public setTransferFees(transferFees : string) {
        this.transferFees = this.returnWithoutUndefined(transferFees);
    }
	
}

