import React , {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, message, Avatar, Spin } from 'antd';

export default class ActivitiesLogScrollWidget extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    // Initial data load.
    loadDataFromServer(){

    }

    // This is required for live data feed.
    establishWebSocketConnection(){

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

    render(){
        const {className} = this.props;
        return(
            <div className={className}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    {this.props.children}
                </InfiniteScroll>
            </div>
        );
    }
}