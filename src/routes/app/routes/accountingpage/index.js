import React from 'react';
import { Row, Col, Table, Tag, Checkbox } from 'antd';
import { connect } from 'react-redux';
import StatCard from 'routes/app/components/StatCard'
import R from './config/R';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';

const reductions = [
    {
        name: "KARDEŞ İNDİRİMİ",
        color: "geekblue"
    },
    {
        name: "PERSONEL İNDİRİMİ",
        color: "green"
    },
    {
        name: "ÖZEL İNDİRİMİ",
        color: "volcano"
    }
]
const data = [
    {
        studentname: "Ogrenci A",
        schoolname: "Okul A",
        parentname: "Veli A",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli A Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "KARDEŞ İNDİRİMİ",
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci B",
        schoolname: "Okul A",
        parentname: "Veli B",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli B Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "KARDEŞ İNDİRİMİ",
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci C",
        schoolname: "Okul A",
        parentname: "Veli C",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli C Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci D",
        schoolname: "Okul A",
        parentname: "Veli D",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli D Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "ÖZEL İNDİRİM"
                ],
                paid: "1200 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "120 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "120 TL"
            }
        ]


    }, {
        studentname: "Ogrenci E",
        schoolname: "Okul A",
        parentname: "Veli E",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli E Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci F",
        schoolname: "Okul A",
        parentname: "Veli F",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli F Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                    "KARDEŞ İNDİRİMİ",
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci G",
        schoolname: "Okul A",
        parentname: "Veli G",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli G Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "B BANKASI",
                installment: "9",
                reductions: [
                    "KARDEŞ İNDİRİMİ",
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci H",
        schoolname: "Okul A",
        parentname: "Veli H",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli H Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "B BANKASI",
                installment: "9",
                reductions: [
                    "KARDEŞ İNDİRİMİ",
                    "PERSONEL İNDİRİMİ"
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }, {
        studentname: "Ogrenci I",
        schoolname: "Okul A",
        parentname: "Veli I",
        tckn: "0000000001",
        phonenumber: "099999999",
        address: "Veli I Adres",
        payments: [
            {
                transactiondate: "01/01/2019",
                paymentmethod: "KREDI KARTI",
                paymentbank: "A BANKASI",
                installment: "9",
                reductions: [
                ],
                paid: "2800 TL",
                balance: "0 TL"
            },
        ],
        invoices: [
            {
                invoiceorder: 1,
                invoiceid: "0000001",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 2,
                invoiceid: "0000002",
                invoicestartdate: "01/11/2019",
                invoiceenddate: "30/11/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 3,
                invoiceid: "0000003",
                invoicestartdate: "01/12/2019",
                invoiceenddate: "31/12/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 4,
                invoiceid: "0000004",
                invoicestartdate: "01/10/2019",
                invoiceenddate: "31/10/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 5,
                invoiceid: "0000005",
                invoicestartdate: "01/01/2019",
                invoiceenddate: "31/01/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 6,
                invoiceid: "0000006",
                invoicestartdate: "01/02/2019",
                invoiceenddate: "28/02/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 7,
                invoiceid: "0000007",
                invoicestartdate: "01/03/2019",
                invoiceenddate: "31/03/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 8,
                invoiceid: "0000008",
                invoicestartdate: "01/04/2019",
                invoiceenddate: "30/04/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 9,
                invoiceid: "0000009",
                invoicestartdate: "01/05/2019",
                invoiceenddate: "31/05/2019",
                amount: "280 TL"
            },
            {
                invoiceorder: 10,
                invoiceid: "0000010",
                invoicestartdate: "01/06/2020",
                invoiceenddate: "30/06/2020",
                amount: "280 TL"
            }
        ]


    }
]
class AccountingPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const columns = [
            { title: 'Öğrenci Ad-Soyad', dataIndex: 'studentname', key: 'studentname' },
            { title: 'Okul', dataIndex: 'schoolname', key: 'schoolname' },
            { title: 'Fatura Veli Ad-Soyad', dataIndex: 'parentname', key: 'parentname' },
            { title: 'Veli TCKN', dataIndex: 'tckn', key: 'tckn' },
            { title: 'Veli Telefon', dataIndex: 'phonenumber', key: 'phonenumber' },
            { title: 'Veli Adres', dataIndex: 'address', key: 'address' },
        ];
        const paymentExtended = [
            { title: 'Ödeme Tarihi', dataIndex: 'transactiondate', key: 'transactiondate' },
            { title: 'Ödeme Yöntemi', dataIndex: 'paymentmethod', key: 'paymentmethod' },
            { title: 'Banka', dataIndex: 'paymentbank', key: 'paymentbank' },
            { title: 'Taksit', dataIndex: 'installment', key: 'installment' },
            {
                title: 'İndirimler', dataIndex: 'reductions', key: 'reductions', render: (items) => {
                    return (
                        <span>
                            {items.map(item => {
                                for (var i = 0; i < reductions.length; i++) {
                                    if (reductions[i].name == item) {
                                        return (
                                            <Tag color={reductions[i].color} key={item}>
                                                {item.toUpperCase()}
                                            </Tag>
                                        );
                                    }
                                }
                            })}
                        </span>
                    )
                }
            },
            { title: 'Ödenen', dataIndex: 'paid', key: 'paid' },
            { title: 'Bakiye', dataIndex: 'balance', key: 'balance' },
        ];
        const invoiceExtended = [
            { title: 'Fatura Sıra', dataIndex: 'invoiceorder', key: 'invoiceorder' },
            { title: 'Fatura No', dataIndex: 'invoiceid', key: 'invoiceid' },
            { title: 'Başlangıç Tarihi', dataIndex: 'invoicestartdate', key: 'invoicestartdate' },
            { title: 'Bitiş Tarihi', dataIndex: 'invoiceenddate', key: 'invoiceenddate' },
            { title: 'Fiyat', dataIndex: 'amount', key: 'amount' },
            {
                title: 'Aksiyon', dataIndex: '', key: '', render: (item) => {
                    return (
                        <Checkbox>
                            Fatura Sistemine Aktar
                        </Checkbox>
                    );
                }
            },
        ];
        return (
            <div>
                <Row gutter={8} type="flex">
                </Row>
                <Row>
                    <Col>
                        <AppWidget
                            headerText={'Fatura Yönetim Ekranı'}
                            headerSubText={'Tur Firması Yönetim Fatura Ekranı'}
                            headerIcon={'cloud'}
                            headerStyle={{}}
                            bodyStyle={S.styles.widget.widgetbodystyle}
                            toolBoxOptions={'HEADER'}
                        >
                            <Table
                                columns={columns}
                                expandedRowRender={record => {
                                    return (
                                        <div>
                                            <Row>
                                                <Col>
                                                    <Table
                                                        columns={paymentExtended}
                                                        dataSource={record.payments}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Table
                                                        columns={invoiceExtended}
                                                        dataSource={record.invoices}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                }}
                                dataSource={data}
                            />
                        </AppWidget>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedAccountingPage = connect(mapStateToProps)(AccountingPage);

export default connectedAccountingPage;