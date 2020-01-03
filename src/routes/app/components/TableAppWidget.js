import React , {Component} from 'react';
import { Table,Input, Icon, Button, Popconfirm } from 'antd';
import AppWidget from 'routes/app/components/AppWidget';
import S from 'routes/app/components/S';

export default class TableAppWidget extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {headerText , headerSubText , headerIcon , bodyStyle} = this.props;
        const {columns , loading , pagination , handleTableChange , data , rowClassName , toolboxOptions } = this.props;
        const {onRowClick} = this.props;
        return(
            <AppWidget
                headerText={headerText}
                headerSubText={headerSubText}
                headerIcon={'header'}
                bodyStyle={bodyStyle}
                toolboxOptions={toolboxOptions}
            >
                <div>
                    <Table
                        size={'large'}
                        columns={columns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        locale={{emptyText : "Veri Yok"}}
                        onChange={handleTableChange}
                        onRow={onRowClick}
                        expandedRowRender={this.props.expandedRowRender}
                        rowClassName={rowClassName}
                        />
                </div>
            </AppWidget>
        );
    }
}