import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
import { Menu, Icon } from 'antd';
import { Upload, message, Button } from 'antd';

export default class ProfileSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {profileowner , type} = this.props;
        const { logo } = profileowner;
        const style = {
            containerDivStyle : {
                
            },
            socialFeedContainerStyle : {
                padding : '5px',
                border : '1 px solid',
            },
            socialFeedItemStyle : {
                marginTop : '6px',
                marginBottom: '4px'
            }
        };
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
        };
        return (
            <div className={'profile-holder'} style={style.containerDivStyle}>
                <div>
                    <Card
                        hoverable
                        style={{ borderRadius : '5px'}}
                        bordered={false}
                        cover={<Upload {...props}><img style={{width : '256px' , height : '256px' , marginLeft : '30px' , marginRight : '30px'}} alt="example" src={logo ? logo : "/asset/images/noprofilepic.png"} /></Upload>}
                    >
                        <Meta
                            style={{fontSize : '18px'}}
                            title={profileowner.name}
                            description={type}
                        >
                        </Meta>
                        <div style={style.socialFeedContainerStyle}>
                            <div style={style.socialFeedItemStyle}>
                                <Icon type="phone" />
                                <span><a href={"tel:" + profileowner.phone}> {profileowner.phone}</a></span>
                            </div>
                            <div style={style.socialFeedItemStyle}>
                                <Icon type="facebook" />
                                <span><a href={profileowner && profileowner.facebook && profileowner.facebook.link}> {profileowner && profileowner.facebook && profileowner.facebook.displayName}</a></span>
                            </div>
                            <div style={style.socialFeedItemStyle}>
                                <Icon type="twitter" />
                                <span><a href={profileowner && profileowner.twitter && profileowner.twitter.link}> {profileowner && profileowner.twitter &&  profileowner.twitter.displayName}</a></span>
                            </div>
                        </div>
                        <div>

                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}