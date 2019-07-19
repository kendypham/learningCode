import React, { Component } from 'react'
import GlobalList from './GlobalList.jsx'
import GlobalGrid from './GlobalGrid.jsx'
import Navigation from '../etc/Navigation.jsx'

export default class GeneralView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView: false,
            gridView: true,
            currentAds: this.props.adverts,
            keyword: '',
            fields: {
                "minPrice": "",
                "maxPrice": "3000",
                "minArea": "",
                "maxArea": "1000",
                "minBedrooms": "",
                "maxBedrooms": "7",
                "minFloors": "",
                "maxFloors": "5"
            }
        }
        this.clearKey = this.clearKey.bind(this)
        this.clearFilter = this.clearFilter.bind(this)
        this.submitFilter = this.submitFilter.bind(this)
    }

    componentWillMount() {
        this.props.fetchAllAds()
        this.props.fetchAllProjects()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentAds: nextProps.adverts })
        if (nextProps.filteredEstates.length !== 0){
            this.setState({currentAds: nextProps.filteredEstates})
        }
    }

    clearKey() {
        this.setState({
            currentAds: this.props.adverts,
            keyword: ''
        })
    }

    clearFilter() {
        let fields = this.state.fields
        fields["minArea"] = "";
        fields["minPrice"] = "";
        fields["minBedrooms"] = "";
        fields["minFloors"] = "";
        this.setState({fields:fields})

    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields })
    }


    filterByPrice(filter) {
        if (filter === 'LO_TO_HI') {
            let lowToHigh = this.props.adverts.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
            this.setState({ currentAds: lowToHigh })
        }
        else if (filter === 'HI_TO_LO') {
            let highToLow = this.props.adverts.sort(function (a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            });
            this.setState({ currentAds: highToLow })

        }
    }

    filterByDemand(filter) {
        if (filter === 'BELOW_500') {
            let below500 = this.props.adverts.filter((ad) => ad.area <= 500)
            this.setState({ currentAds: below500 })
        }

        else if (filter === 'OVER_500') {
            let over500 = this.props.adverts.filter((ad) => ad.area > 500)
            this.setState({ currentAds: over500 })
        }

        else if (filter === 'BEDROOMS_1_3') {
            let bedrooms_1_3 = this.props.adverts.filter((ad) => ad.bedrooms >= 1 && ad.bedrooms <= 3)
            this.setState({ currentAds: bedrooms_1_3 })
        }

        else if (filter === 'BEDROOMS_3_') {
            let bedrooms_3_ = this.props.adverts.filter((ad) => ad.bedrooms > 3)
            this.setState({ currentAds: bedrooms_3_ })
        }

        else if (filter === 'FLOORS_1_3') {
            let floors_1_3 = this.props.adverts.filter((ad) => ad.floors >= 1 && ad.floors <= 3)
            this.setState({ currentAds: floors_1_3 })
        }

        else if (filter === 'FLOORS_3_') {
            let floors_3_ = this.props.adverts.filter((ad) => ad.floors > 3)
            this.setState({ currentAds: floors_3_ })
        }

        else {
            let category = this.props.adverts.filter((ad) => ad.project == filter)
            this.setState({ currentAds: category })
        }


    }

    onFind(e) {
        var target = e.target
        var name = target.name
        var value = target.value

        this.setState({
            [name]: value
        })

        var loweredkeyword = this.state.keyword.toLowerCase()
        if (this.state.keyword === undefined) {
            this.setState({ currentAds: this.props.adverts })
        }
        this.setState({
            currentAds: this.props.adverts.filter(ad =>
                ad.title.toLowerCase().indexOf(loweredkeyword) !== -1
            )
        })
    }

    submitFilter(e){
        e.preventDefault()
        this.props.getFilteredEstates(this.state.fields)
        this.clearFilter()
    }

    onViewList() {
        this.setState({
            listView: true,
            gridView: false
        })
    }

    onViewGrid() {
        this.setState({
            listView: false,
            gridView: true
        })
    }



    render() {
        return (
            <div>
                <Navigation />
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1472508249545-917598a8c985?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b47c91eddce4da0ed40852160a4b622&auto=format&fit=crop&w=1350&q=80" style={{ height: "100vh", maxWidth: "100vw" }} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b95599cb95166892018645cd2a22923a&auto=format&fit=crop&w=1350&q=80" style={{ height: "100vh", width: "100vw" }} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=844d3a349e587ef4188df4ddc79c2a70&auto=format&fit=crop&w=1347&q=80" style={{ height: "100vh", width: "100vw" }} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <br />

                <div className="container jumbotron text-center" style={{ backgroundColor: "#ffffff" }}>
                    <div className="row">
                        <div className="col-sm-12" align="center">
                            <h1 className="h1">Featured Estates</h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="input-group add-on">
                                <input type="text" className="form-control" placeholder="Search For Title" name="keyword" id="srch-term" value={this.state.keyword} onChange={this.onFind.bind(this)} />
                                &nbsp;
                                    <button className="btn btn-warning" onClick={this.clearKey}><i className="fas fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Search By</h4> or search with a specific range &nbsp;
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#exampleModal">
                                here
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Filter Form</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form >
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 ">
                                                        <label >Min. Price</label>
                                                        <input type="text" value={this.state.fields.minPrice || ""} name="minPrice" className="form-control" placeholder="Minimum Price" onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group col-md-6 ">
                                                        <label >Max Price</label>
                                                        <input type="text" value={this.state.fields.maxPrice || ""} name="maxPrice" className="form-control" placeholder="Maximum Price" onChange={this.handleChange.bind(this)} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 ">
                                                        <label >Min Area</label>
                                                        <input type="text" value={this.state.fields.minArea || ""} name="minArea" className="form-control" placeholder="Minimum Area" onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group col-md-6 ">
                                                        <label >Max Area</label>
                                                        <input type="text" value={this.state.fields.maxArea || ""} name="maxArea" className="form-control" placeholder="Max Area" onChange={this.handleChange.bind(this)} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 ">
                                                        <label >Min Bedrooms</label>
                                                        <input type="text" value={this.state.fields.minBedrooms || ""} name="minBedrooms" className="form-control" placeholder="Minimum Bedrooms" onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group col-md-6 ">
                                                        <label >Max Bedrooms</label>
                                                        <input type="text" value={this.state.fields.maxBedrooms || ""} name="maxBedrooms" className="form-control" placeholder="Max Bedrooms" onChange={this.handleChange.bind(this)} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 ">
                                                        <label >Min Floors</label>
                                                        <input type="text" value={this.state.fields.minFloors || ""} name="minFloors" className="form-control" placeholder="Minimum Floors" onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group col-md-6 ">
                                                        <label >Max Floors</label>
                                                        <input type="text" value={this.state.fields.maxFloors || ""} name="maxFloors" className="form-control" placeholder="Max Floors" onChange={this.handleChange.bind(this)} disabled />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={this.clearFilter}>Clear</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitFilter} >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-sm-2">
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Price
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByPrice('HI_TO_LO')}>High to Low</a>
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByPrice('LO_TO_HI')}>Low to High</a>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropDownAreaButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Area
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropDownAreaButton">
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('BELOW_500')} >500 or Lower</a>
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('OVER_500')} >Over 500</a>

                                </div>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropDownCategoryButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Bedrooms
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropDownCategoryButton">
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('BEDROOMS_1_3')} >1-3</a>
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('BEDROOMS_3_')} >More than 3</a>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropDownFloorsButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Floors
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropDownFloorsButton">
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('FLOORS_1_3')} >1-3</a>
                                    <a className="dropdown-item" role="button" onClick={() => this.filterByDemand('FLOORS_3_')} >More than 3</a>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropDownProjectButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Project
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropDownProjectButton">
                                    {this.props.projects.map((project, index) => {
                                        return <a key={index} role="button" className="dropdown-item" onClick={() => this.filterByDemand(project.name)} >{project.name}</a>
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-2" align="center">
                            <button className="btn btn-outline-danger" onClick={this.onViewList.bind(this)}>
                                <i className="fas fa-list-ul"></i>
                            </button>
                            &nbsp;&nbsp;
                            <button className="btn btn-outline-danger" onClick={this.onViewGrid.bind(this)} >
                                <i className="fas fa-th"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <br />


                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {this.state.listView ? <GlobalList
                                editAdvert={this.props.editAdvert}
                                getAdvert={(_id) => this.props.getAdvert(_id)}
                                adverts={this.state.currentAds}
                            /> : null}
                            {this.state.gridView ? <GlobalGrid
                                editAdvert={this.props.editAdvert}
                                getAdvert={(_id) => this.props.getAdvert(_id)}
                                adverts={this.state.currentAds}
                            /> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
