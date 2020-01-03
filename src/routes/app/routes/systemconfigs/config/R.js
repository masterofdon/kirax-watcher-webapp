import { Input } from 'antd';

const R = {

    columns : {
        sysconfigcolumns : [{
            title: 'Kategori',
            dataIndex: '',
            key: 'category',
            width: 350
        }, {
            title: 'Birim',
            dataIndex: 'configkey',
            key: 'configkey',
            width: 550,
            render : item => {
                return (
                    <Input />
                ) 
            }
        }, {
            title: 'Email',
            dataIndex: 'parent1Name',
            key: 'parent1Name',
            width: 350,
        }, {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 200,
        }]
    }
}

export default R;