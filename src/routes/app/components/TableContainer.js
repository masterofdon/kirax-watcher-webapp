import React , {Component} from 'react';

export default class TableContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {position : "top"},
            loading: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        // this.apiadapter = new TabletsNetworkAdapter({ username : "admin" , password : "password"});
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (params = {}) => {
        this.setState({ loading: true });
        this.apiadapter.getRoutes(params.page - 1, params.results)
            .then((data) => {
                const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalElements;
                this.setState({
                    loading: false,
                    data: data.data.content,
                    pagination,
                });
            });
    }

    onDelete = (id) => {
        const data = [...this.state.data];
        this.apiadapter.deleteRoute(id)
            .then(function (e) {
                this.fetchData();
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            });
        // this.setState({ data: data.filter(item => item.id !== id) });
    }

    fetchData = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchTabletTable({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
}