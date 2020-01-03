import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat&noinfo';
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import 'styles/routes/app/routes/profiles/ProfileOwnerActivities.css';

const sampleDatas = [
    {
        id: "dakflasd",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "notification",
            properties: {
                id: "lakfl",
                text: "Sabah Bildirimi yapıldı"
            },
            time: "24 Mart 2018 , 08:03"
        }
    },
    {
        id: "ta333dad",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "changedstudentattendance",
            properties: {
                id: "afe4d",
                student: {
                    id: "alfalkf",
                    name: "Ahmet Nadir Yücekaya"
                },
                text: "Ahmet Nadir Yücekaya, Erdem Ekin tarafından bir sonraki Sefere 'KATILMAYACAK' olarak ayarlandı."
            }
        }
    },
    {
        id: "dakflasd",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "notification",
            properties: {
                id: "lakfl",
                text: "Sabah Bildirimi yapıldı"
            },
            time: "24 Mart 2018 , 08:03"
        }
    },
    {
        id: "ta333dad",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "changedstudentattendance",
            properties: {
                id: "afe4d",
                student: {
                    id: "alfalkf",
                    name: "Ahmet Nadir Yücekaya"
                },
                text: "Ahmet Nadir Yücekaya, Erdem Ekin tarafından bir sonraki Sefere 'KATILMAYACAK' olarak ayarlandı."
            }
        }
    },
    {
        id: "dakflasd",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "notification",
            properties: {
                id: "lakfl",
                text: "Sabah Bildirimi yapıldı"
            },
            time: "24 Mart 2018 , 08:03"
        }
    },
    {
        id: "ta333dad",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "changedstudentattendance",
            properties: {
                id: "afe4d",
                student: {
                    id: "alfalkf",
                    name: "Ahmet Nadir Yücekaya"
                },
                text: "Ahmet Nadir Yücekaya, Erdem Ekin tarafından bir sonraki Sefere 'KATILMAYACAK' olarak ayarlandı."
            }
        }
    },
    {
        id: "dakflasd",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "notification",
            properties: {
                id: "lakfl",
                text: "Sabah Bildirimi yapıldı"
            },
            time: "24 Mart 2018 , 08:03"
        }
    },
    {
        id: "ta333dad",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "changedstudentattendance",
            properties: {
                id: "afe4d",
                student: {
                    id: "alfalkf",
                    name: "Ahmet Nadir Yücekaya"
                },
                text: "Ahmet Nadir Yücekaya, Erdem Ekin tarafından bir sonraki Sefere 'KATILMAYACAK' olarak ayarlandı."
            }
        }
    },
    {
        id: "dakflasd",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "notification",
            properties: {
                id: "lakfl",
                text: "Sabah Bildirimi yapıldı"
            },
            time: "24 Mart 2018 , 08:03"
        }
    },
    {
        id: "ta333dad",
        owner: {
            id: "afklasdk",
            name: "Erdem Ekin"
        },
        action: {
            type: "changedstudentattendance",
            properties: {
                id: "afe4d",
                student: {
                    id: "alfalkf",
                    name: "Ahmet Nadir Yücekaya"
                },
                text: "Ahmet Nadir Yücekaya, Erdem Ekin tarafından bir sonraki Sefere 'KATILMAYACAK' olarak ayarlandı."
            }
        }
    }
];

export default class ProfileOwnerActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    getData = (callback) => {
        // reqwest({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: (res) => {
        //         callback(res);
        //     },
        // });
        var e = {};
        e.results = sampleDatas;
        callback(e);
    }
    componentWillMount() {
        this.getData((res) => {
            this.setState({
                data: res.results,
            });
        });
    }
    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 20) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    }

    avatarRenderer(item){
        if(item === 'notification'){
            return <Avatar icon='arrow-right' />;
        }
        else if(item === 'changedstudentattendance'){
            return <Avatar icon="arrow-left" />;
        }
    }

    render() {

        return (
            <div className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={this.avatarRenderer(item.action.type)}
                                    title={<a href="https://ant.design">{item.owner.name}</a>}
                                    description={item.action.properties.text}
                                />
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}