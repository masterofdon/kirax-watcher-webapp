import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class ContractsNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    getContracts(page, size) {
        var apiStr = new ApiStringBuilder()
            .contracts()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getContractPricingPolicies(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .contractPricingPolicies()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getContractDistrictsForContract(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .districts()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getContractsPricingPolicies(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .pricingPolicies()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getCurrentAccountsForContract(contractid, page, size) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .currentAccounts()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getPaymentsForContract(contractid, page, size) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .payments()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getPaymentsForContractForDates(contractid, fromdate, todate, page, size) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .payments()
            .parameter("fromdate", fromdate)
            .parameter("todate", todate)
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getAllPaymentsForContractForDates(contractid, fromdate, todate) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .paymentsByDates()
            .parameter("fromdate", fromdate)
            .parameter("todate", todate)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getContractDiscounts(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .contractDiscounts()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getBanksForContract(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .banks()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    createPaymentForCurrentAccount(accountid, payment) {
        var apiStr = new ApiStringBuilder()
            .currentAccounts(accountid)
            .payments()
            .toApiString();
        return Axios.post(
            apiStr,
            payment,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getAllCurrentAccountsForContractId(contractid) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .currentAccounts()
            .all()
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    queryContractCurrentAccount(contractid, query, page, size) {
        var apiStr = new ApiStringBuilder()
            .contracts(contractid)
            .currentAccounts()
            ._query(query)
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    getAgencyRepDocs(agencyrepid, page, size) {
        var apiStr = new ApiStringBuilder()
            .agencyreps(agencyrepid)
            .agencyRepDocs()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    getFullHistoryItemsOfOrigin(originid) {
        var apiStr = new ApiStringBuilder()
            .historyItems()
            .origins(originid)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    updateCurrentAccount = (accountid , account) => {
        var apiStr = new ApiStringBuilder()
            .currentAccounts(accountid)
            .toApiString();
        return Axios.put(
            apiStr,
            {
                name : account.name
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    updateReceivableOfCurrentAccount(currentaccountid, receivable) {
        var apiStr = new ApiStringBuilder()
            .currentAccounts(currentaccountid)
            .receivables()
            .toApiString();
        return Axios.post(
            apiStr,
            {
                initialamount : parseFloat(receivable.initialamount)
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

    updatePayment = (paymentid , payment) => {
        var paymentSender = {
            ...payment
        }
        paymentSender.amount.amount = parseFloat(payment.amount.amount);
        var apiStr = new ApiStringBuilder()
            .payments(paymentid)
            .toApiString();
        return Axios.put(
            apiStr,
            paymentSender,
            {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            }
        );
    }

}