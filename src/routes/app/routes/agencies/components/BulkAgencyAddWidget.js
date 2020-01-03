import React, { Component } from 'react';
import AppWidget from 'routes/app/components/AppWidget';
import Dropzone from 'react-dropzone';

export default class BulkAgencyAddWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readFileArray : [],
            showModal : false
        }
    }

    dropzoneOnDropHandler(accepted, rejected) {
        const reader = new FileReader();
        reader.onload = function () {
            const fileAsText = reader.result;
            // do whatever you want with the file content
            var data = fileAsText.split('\n');
            var myArray = CsvTableAdapter.createJSONArrayFromCsvData(data);
            this.setState({
                readFileArray: myArray,
                showModal: true
            });
        }.bind(this);
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.readAsText(accepted[accepted.length - 1]);
    }

    render() {
        const style = {
            divstyle: {
                minHeight: '100%',
                minWidth: '100%',
                marginTop: '10px'
            },
            wigetBodyStyle: {
                backgroundColor: 'rgba(242,242,242,1)'
            },
            colStyle: {
                marginTop: '10px'
            }
        };
        return (
            <AppWidget
                headerText={'Toplu Tur Firması Ekleme'}
                headerSubText={'Toplu Tur Firması Ekleme Arayüzü'}
                headerIcon={'header'}
                bodyStyle={style.wigetBodyStyle}
            >
                <Dropzone
                    style={{ width: '100%', display: 'flex', flex: '1' }}
                    onDrop={this.dropzoneOnDropHandler.bind(this)}
                >
                    <form className={'dropzone dz-clickable'} style={{ width: '100%' }}>
                        <p>Ajans bilgilerini dosyadan eklemek için dosyayı Sürükleyin ya da Tıklayın.</p>
                        <p>Sadece CSV ve XLS dosyaları kabul eder.</p>
                        <p>Tek seferde sadece 50 Ajans eklenebilir.</p>
                    </form>
                </Dropzone>
            </AppWidget>
        );
    }
}