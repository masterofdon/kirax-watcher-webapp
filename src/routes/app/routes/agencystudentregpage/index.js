import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { geolocated } from 'react-geolocated';
import { Row, Col, Spin, notification, Button } from 'antd';
import AgencyStudentRegFieldsPage from './components/AgencyStudentRegFieldsPage';
import AppWidget from 'routes/app/components/AppWidget';
import Invoice from './components/Invoice';
import { connect } from 'react-redux';

import S from 'routes/app/components/S';
import ContractsNetworkAdapter from '../../../../services/network/ContractsNetworkAdapter';

const initialstate = {
  address: '',
  invoiceHolderName: null,
  invoiceHolderAddress: null,
  contract: null,
  districts: [],
  pricingpolicies: [],
  contractdiscounts: [],
  discountsSelected: [],
  districtSelected: undefined,
  selectedGrade: undefined,
  selectedPricingpolicy: undefined,
  studentstobeadded: [{ index: 0 }],
  districtsloading: false,
  pricingpoliciesloading: false,
  discountsloading: false,
}

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialstate
    };
  }

  componentDidMount() {
    this.contractNetworkApi = new ContractsNetworkAdapter(this.props.user.user);
    this.fetchAllData();
  }

  fetchAllData() {
    this.fetchContractDistricts();
    this.fetchContractPricingpolicies();
    this.fetchContractDiscounts();
  }

  fetchContractDistricts = () => {
    this.setState({
      districtsloading: true
    });
    this.contractNetworkApi.getContractDistrictsForContract(this.props.user.user.contractid)
      .then((result) => {
        console.log("Retrieved Districsts for Contract", result);
        this.setState({
          districts: result.data,
          districtsloading: false
        })
      })
      .catch((err) => {
        const btn = (
          <Button type="primary" size="small" onClick={() => this.fetchContractDistricts()}>
            YENİDEN DENE
          </Button>
        );
        this.openNotificationWithIcon("error", "BÖLGE BİLGİLERİ HATASI", btn)
        this.setState({
          districtsloading: false
        });
      });
  }

  fetchContractPricingpolicies = () => {
    this.setState({
      pricingpoliciesloading: true
    });
    this.contractNetworkApi.getContractPricingPolicies(this.props.user.user.contractid)
      .then((result) => {
        console.log("Retrieved Pricing Policies", result);
        this.setState({
          pricingpolicies: result.data,
          pricingpoliciesloading: false
        })
      })
      .catch((err) => {
        const btn = (
          <Button type="primary" size="small" onClick={() => this.fetchContractPricingpolicies()}>
            YENİDEN DENE
          </Button>
        );
        this.openNotificationWithIcon("error", "FİYAT POLİTİKASI HATASI", btn)
        this.setState({
          pricingpoliciesloading: false
        });
      })
  }



  fetchContractDiscounts = () => {
    this.setState({
      discountsloading: true
    });
    this.contractNetworkApi.getContractDiscounts(this.props.user.user.contractid)
      .then((result) => {
        console.log("Retrieved Pricing Policies", result);
        this.setState({
          contractdiscounts: result.data,
          discountsloading: false
        })
      })
      .catch((err) => {
        const btn = (
          <Button type="primary" size="small" onClick={() => this.fetchContractDiscounts()}>
            YENİDEN DENE
          </Button>
        );
        this.openNotificationWithIcon("error", "İNDİRİM BİLGİLERİ HATASI", btn)
        this.setState({
          discountsloading: false
        });
      })
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleParentNameChanged(value) {
    this.setState({
      parentName: value
    })
  }

  handleParentAddressChanged(value) {
    this.setState({
      parentAddress: value
    })
  }

  openNotificationWithIcon = (type, message, btn) => {
    notification[type]({
      message: message,
      duration: 0,
      btn: btn,
    });
  }

  render() {
    const { districtsloading, pricingpoliciesloading, discountsloading } = this.state;
    return (
      <div>
        <AppWidget
          headerText={'Öğrenci Ekleme'}
          headerSubText={'Öğrenci Ekleme ve Yönetim Ekranı'}
          headerIcon={'cloud'}
          headerStyle={{}}
          bodyStyle={S.styles.widget.widgetbodystyle}
          toolBoxOptions={'HEADER'}
        >
          <Spin
            spinning={districtsloading || pricingpoliciesloading || discountsloading}
          >
            <Row>
              <Col span={14}>
                <AgencyStudentRegFieldsPage
                  onParentNameChanged={(name) => this.setState({ invoiceHolderName: name })}
                  onParentAddressSelected={(address) => this.setState({ invoiceHolderAddress: address })}
                  contract={this.state.contract}
                  pricingpolicies={this.state.pricingpolicies}
                  districts={this.state.districts}
                  discounts={this.state.contractdiscounts}
                  onStudentAdded={(index) => {
                    var studentstobeadded = this.state.studentstobeadded;
                    studentstobeadded.push({ index: index });
                    this.setState({ studentstobeadded });
                  }}
                  onStudentDeleted={(index) => {
                    var studentstobeadded = this.state.studentstobeadded;
                    for (var i = 0; i < studentstobeadded.length; i++) {
                      if (studentstobeadded[i].index == index) {
                        studentstobeadded.splice(i, 1);
                      }
                    }
                    this.setState({ studentstobeadded })
                  }}
                  onDistrictSelected={(districtid, index) => {
                    var studentstobeadded = this.state.studentstobeadded;
                    for (var y = 0; y < studentstobeadded.length; y++) {
                      if (studentstobeadded[y].index == index) {
                        for (var i = 0; i < this.state.districts.length; i++) {
                          if (districtid == this.state.districts[i].id) {
                            studentstobeadded[y].district = this.state.districts[i];
                            this.setState({ studentstobeadded })
                            return;
                          }
                        }
                      }
                    }

                  }}
                  onGradeSelected={(grade, index) => {
                    var studentstobeadded = this.state.studentstobeadded;
                    for (var y = 0; y < studentstobeadded.length; y++) {
                      if (studentstobeadded[y].index == index) {
                        studentstobeadded[y].grade = parseInt(grade);
                        this.setState({ studentstobeadded })
                        return;
                      }
                    }
                  }}
                  onDiscountChecked={(discountids, index) => {
                    var { contractdiscounts, studentstobeadded } = this.state;
                    for (var y = 0; y < studentstobeadded.length; y++) {
                      if (studentstobeadded[y].index == index) {
                        studentstobeadded[y].discounts = [];
                        for (var x = 0; x < discountids.length; x++) {
                          for (var i = 0; i < contractdiscounts.length; i++) {
                            if (contractdiscounts[i].id == discountids[x]) {
                              studentstobeadded[y].discounts.push(contractdiscounts[i]);
                            }
                          }
                        }
                      }
                    }
                    this.setState({
                      studentstobeadded
                    });
                  }}
                  onPricingpolicySelected={(pricingpolicy, index) => {
                    var { studentstobeadded } = this.state;
                    for (var y = 0; y < studentstobeadded.length; y++) {
                      if (studentstobeadded[y].index == index) {
                        studentstobeadded[y].pricingpolicy = pricingpolicy;
                        this.setState({
                          studentstobeadded
                        });
                      }
                    }
                  }}
                  onCutByChanged={(cutby, index) => {
                    var { studentstobeadded } = this.state;
                    for (var y = 0; y < studentstobeadded.length; y++) {
                      if (studentstobeadded[y].index == index) {
                        studentstobeadded[y].cutby = cutby;
                        this.setState({
                          studentstobeadded
                        });
                      }
                    }
                  }}
                  onCutByExpChanged={(e) => {
                    console.log(e)
                  }}
                  clear={(e) => {
                    this.setState({
                      ...initialstate
                    })
                  }}
                />
              </Col>
              <Col span={9} style={{ marginTop: '20px', marginRight: '20px', padding: '20px', border: '2px solid gray', borderRadius: '30px' }}>
                <Invoice
                  invoiceHolderName={this.state.invoiceHolderName}
                  invoiceHolderAddress={this.state.invoiceHolderAddress}
                  studentsadded={this.state.studentstobeadded}
                />
              </Col>
            </Row>
          </Spin>
        </AppWidget>

      </div>
    );
  }


}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);

export default connectedRegistrationPage;