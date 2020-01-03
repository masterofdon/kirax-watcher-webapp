import React, { Component } from 'react';
import { Upload, Icon, message, Spin } from 'antd';
import ReactFileReader from 'react-file-reader';
import Student from '../model/Student';
import BulkRouteRegistration from '../model/BulkRouteRegistration';
import BulkVehicleScheduleRegistration from '../model/BulkVehicleScheduleRegistration';
import BulkTabletRegistration from '../model/BulkTabletRegistration';
import BulkDriverRegistration from '../model/BulkDriverRegistration';
import BulkTabletChange from '../model/BulkTabletChange';

const Dragger = Upload.Dragger;

export default class BulkOpsDropArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
        this.beforeUpload = this.beforeUpload.bind(this);
        this.processData = this.processData.bind(this);
    }

    beforeUpload(file, fileList) {
        this.setState({
            processing: true
        });
        console.log("Before Upload");
        setTimeout(this.processData.bind(this, file, fileList), 500);
        return false;
    }

    processData(file, fileList) {
        // Some processing here
        switch (this.props.dataType) {
            case "student":
                this.processStudentList(file, fileList);
                break;
            case "parent":
                this.processParentList(file, fileList);
                break;
            case "vehicle":
                this.processVehicleList(file, fileList);
                break;
            case "tablet":
                this.processTabletList(file, fileList);
                break;
            case "route":
                this.processRouteList(file, fileList);
                break;
            case "vehicleschedule":
                this.processVehicleScheduleList(file, fileList);
                break;
            case "driver":
                this.processDriverList(file, fileList);
                break;
            case "changetablet":
                this.processChangeTabletList(file, fileList);
                break;
            default:
                throw new Error("Nothing to do");
        }
    }

    processStudentList(fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var studentList = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let school = { id: mData[0] };
                let name = mData[1];
                let parent1 = { name: mData[2], phoneNumber: mData[3] };
                let parent2 = { name: mData[4], phoneNumber: mData[5] };
                let morningNotification = { status: mData[6], distance: mData[7], notifee: mData[8], type: mData[9] };
                let eveningNotification = { status: mData[6], distance: mData[7], notifee: mData[8], type: mData[9] };
                let student = new Student(school, name, null, parent1, parent2, morningNotification, eveningNotification);
                studentList.push(student)
            }
            this.setState({
                processing: false
            })
            this.props.onDataProcessed(studentList);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    processDriverList(file, fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var driverList = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let vehicle = { licensePlate: mData[0] };
                let name = mData[1];
                let phoneNumber = mData[2];
                let driverReg = new BulkDriverRegistration(vehicle, name, phoneNumber);
                driverList.push(driverReg)
            }
            this.setState({
                processing: false
            })
            this.props.onDataProcessed(driverList);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    processVehicleList(file, fileList) {

    }

    processChangeTabletList(file, fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var vses = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let prevTabletSerial = mData[0];
                let nextTabletSerial = mData[1];
                let bulkTabletChangeObj = new BulkTabletChange(prevTabletSerial, nextTabletSerial);
                vses.push(bulkTabletChangeObj);
            }
            this.setState({
                processing: false
            });
            console.log(vses);
            this.props.onDataProcessed(vses);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    processTabletList(file, fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var vses = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let vehicle = { licensePlate: mData[0] };
                let serialNumber = mData[1];
                let imei = mData[2];
                let model = mData[3];
                let gsm = mData[4];
                let tablet = {};
                tablet.serialNumber = serialNumber;
                tablet.imei = imei;
                tablet.model = model;
                tablet.gsm = gsm;
                let bulkTabletRegObj = new BulkTabletRegistration(vehicle, tablet);
                vses.push(bulkTabletRegObj);
            }
            this.setState({
                processing: false
            });
            console.log(vses);
            this.props.onDataProcessed(vses);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    processRouteList(file, fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var routes = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let contract = { id: mData[0] };
                let school = { id: mData[1] };
                let agency = { id: mData[2] };
                let designator = mData[4];
                let name = mData[5];
                let student = { name: mData[3] };
                let parent1 = { name: mData[6], phoneNumber: mData[7] };
                let parent2 = { name: mData[8], phoneNumber: mData[9] };
                student.primary = parent1;
                student.secondary = parent2;
                let times = {};
                times.morningST = mData[10];
                times.morningET = mData[11];
                times.eveningST = mData[12];
                times.eveningET = mData[13];
                let bulkRouteRegObj = new BulkRouteRegistration(contract, school, agency, designator, name, student, times);
                routes.push(bulkRouteRegObj);
            }
            this.setState({
                processing: false
            });
            console.log(routes);
            this.props.onDataProcessed(routes);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    processVehicleScheduleList(file, fileList) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            var vehicleScheduleList = [];
            var lines = reader.result.split("\n");
            for (var i = 1; i < lines.length; i++) {
                var mData = lines[i].split(',');
                if (lines[i].indexOf(",") == -1) {
                    mData = lines[i].split(';');
                }
                let contract = { id: mData[0] };
                let designator = mData[1];
                let routeName = mData[2];
                let direction = mData[3] == 'SABAH' ? 'MORNING' : 'EVENING';
                let dayArray = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
                var index = 0;
                let dayArrayMap = dayArray.map(function (e) {
                    var o = {};
                    o.vehicle = {};
                    o.vehicle.licensePlate = mData[4 + index++];
                    o.day = e;
                    return o;
                });
                let vsObject = new BulkVehicleScheduleRegistration(contract, designator, routeName, direction, dayArrayMap);
                vehicleScheduleList.push(vsObject)
            }
            this.setState({
                processing: false
            })
            console.log(vehicleScheduleList);
            this.props.onDataProcessed(vehicleScheduleList);
        }.bind(this)
        reader.readAsText(fileList[0]);
    }

    componentWillUnmount() {
        console.log("Unmount");
    }

    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            beforeUpload: this.beforeUpload,
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const antIcon = <Icon type="loading" style={{ fontSize: 96 }} spin />;
        return (
            <div>
                <Dragger {...props}>
                    {this.state.processing ?
                        <Spin indicator={antIcon} /> :
                        <div>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Dosya İşlenmesi İçin Tıklayın ya da Sürükleyip Bırakın.</p>
                            <p className="ant-upload-hint">Tek ya da çoklu dosya işlemlerini destekler.</p>
                        </div>
                    }
                </Dragger>
            </div>
        );
    }
}