import React, { Component } from 'react';
import AppWidget from 'routes/app/components/AppWidget';
import { Table,Input, Icon, Button, Popconfirm , Divider } from 'antd';
import { Link } from 'react-router-dom';
import TableAppWidget from 'routes/app/components/TableAppWidget';
import S from 'routes/app/components/S';

import { ContextMenu, Item, Separator, Submenu, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const onClick = ({ event, ref, data, dataFromProvider }) => console.log('Hello');
// create your menu first
const MyAwesomeMenu = () => (
    <ContextMenu id='menu_id'>
       <Item onClick={onClick}>Lorem</Item>
       <Item onClick={onClick}>Ipsum</Item>
       <Separator />
       <Item disabled>Dolor</Item>
       <Separator />
       <Submenu label="Foobar">
        <Item onClick={onClick}>Foo</Item>
        <Item onClick={onClick}>Bar</Item>
       </Submenu>
    </ContextMenu>
);

export default class AgencyTableWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
    }
    

    render() {
        const previewColumns = [
        {
            title: 'Tur Firması Adı',
            dataIndex: '',
            key: 'a',
            width: 450,
            render: (record) => <Link to={"/profiles/agencies/" + record.id}>{record.name}</Link>
        }, {
            title: 'Tur Firması Adresi',
            dataIndex: 'address',
            key: 'address',
            width: 350,
        },
        {
            title: 'Yetkili Ismi',
            dataIndex: 'admin',
            key: 'admin',
            width: 400,
        },
        {
            title: 'Yetkili Email',
            dataIndex: 'adminemail',
            key: 'adminemail',
            width: 400,
        }
        , {
            title: 'Aksiyon',
            dataIndex: '',
            key: 'x',
            width: 200,
            render: function(text, record){
                return (
                    this.props.data.length > 0 ?
                        (
                            <div>
                                <Link to={'/admin/agencies/' + record.id} >Yönet</Link>
                                <Divider type={'vertical'} />
                                <Popconfirm title="Silmek İstediğinize Emin Misiniz?" onConfirm={() => this.props.onDelete.bind(this)(record.id)}>
                                    <a href="#" >Sil</a>
                                </Popconfirm>
                            </div>
                        ) : null
                );
            }.bind(this),
        }];
        return (
            <TableAppWidget 
                headerText={'Tur Firması Tablosu'}
                headerSubText={'Tur Firması Yönetim Tablosu'}
                headerIcon={'header'}
                bodyStyle={S.styles.wigetbodystyle}
                columns={previewColumns}
                data={this.props.data}
                pagination={this.props.pagination}
                loading={this.props.loading}
                onRowClick={(record) => {
                    return {
                      onClick: () => {},       // click row
                      onMouseEnter: () => {},  // mouse enter row
                      onContextMenu : () => {console.log("Context Madafaka")}
                    };
                  }}
                handleTableChange={this.props.handleTableChange}
            />
        );
    }
}