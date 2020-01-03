import React, { Component } from 'react';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';

export default class AppConfigs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            pagination : { position : 'bottom'},
            loading : false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange(){

    }

    render() {
        const { data , pagination , loading } = this.state;
        const appversionscolumns = [{
            title: 'Uygulama Adı',
            dataIndex: 'appname',
            key: 'appname',
            width: 400
        }, {
            title: 'Versiyon',
            dataIndex: 'version',
            key: 'version',
            width: 400,

        }];
        return (
            <div>
                <AppWidget
                    headerText={"Uygulama Versiyonları Ekranları"}
                    headerSubText={''}
                    headerIcon={'header'}
                    bodyStyle={S.styles.widget.wigetbodystyle}
                >
                    <Table
                        size={'large'}
                        columns={appversionscolumns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        locale={{ emptyText: "Veri Yok" }}
                        onChange={this.handleTableChange}
                    >

                    </Table>
                </AppWidget>
            </div>
        );
    }
}