import React, { Component } from 'react';
import { List, Avatar } from 'antd';

export default class ProfileInteractionSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
        this.getData();
    }

    getData(){
        this.state.data.mostcity = "Antalya";
        this.state.data.mostInteraction = "Öğrenci Gelmeyecek Bildirimi";
        this.state.data.lastSeen = "20 Mart 2018 , 15:51";
        this.state.data.lastInteraction = "Giriş";
    }

    render() {
        const style = {
            iconStyle : { 
                color: '#d3dded', 
                backgroundColor: '#3478e5' 
            }
        }
        const data = [
            {
              title: 'En sık etkileşime girilen şehir.',
              data : this.state.data.mostcity,
              render : <Avatar style={style.iconStyle} icon="home"/>
            },
            {
              title: 'En sık etkileşim',
              data : this.state.data.mostInteraction,
              render : <Avatar style={style.iconStyle} icon="check"/>
            },
            {
              title: 'Son Görüntülenme',
              data : this.state.data.lastSeen,
              render : <Avatar style={style.iconStyle} icon="eye"/>
            },
            {
              title: 'Son Etkileşim Tipi',
              data : this.state.data.lastInteraction,
              render : <Avatar style={style.iconStyle} icon="enter"/>
            },
        ];
        var counter = 0;
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.render}
                            title={item.title}
                            description={item.data}
                        />
                    </List.Item>
                )}
            />
        );
    }
}