import React, { Component } from 'react';
import ApiService from '../../api/api.service';
import ComicModal from '../ComicModal/ComicModal';
import InputSearch from '../InputSearch/InputSearch';

import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            attribution: '',
            comicSelected: undefined,
            loading: true
        }
    }

    componentDidMount() {
        this.mainContainer = document.querySelector('.main-container');
        this.mainContainer.classList.add('main-container--sidebar');
        this.getData();
    }

    componentWillUnmount() {
        this.mainContainer.classList.remove('main-container--sidebar');
    }

    findByComic = (e, id) => {
        const currentEle = e.target;
        this.props.actions.comic(id, currentEle.classList.contains('sidebar__link-comic--active'));
        currentEle.classList.toggle('sidebar__link-comic--active');
    }

    selectComic = (comic) => {
        this.setState({
            comicSelected: comic
        });
    }

    closeModal = () => {
        this.setState({
            comicSelected: undefined
        });
    }

    getData = (value) => {
        const query = value ? `&titleStartsWith=${value}` : '';
        this.setState({ loading: true });

        ApiService().getData('comics', `limit=30&format=comic${query}`)
            .then(response => {
                if (response.status !== 200) throw new Error('Error');
                return response.json();
            })
            .then(response => {
                this.setState({
                    data: response.data.results,
                    attribution: response.attributionText,
                    loading: false
                });
            })
            .catch(err => {
                console.log('Error', err);
            });
    }

    orderBy = (e) => {
        this.props.actions.order(e.target.checked);
    }

    changePagination = (e) => {
        this.props.actions.changePagination(Number(e.target.value));
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar">
                    <div className="sidebar__item sidebar__item--search">
                        <InputSearch onSearch={this.props.actions.search} placeHolder="Name starts with"/>
                        <div className="select__container">
                            <label htmlFor="perPage">Per page</label>
                            <select name="perPage" id="perPage" onChange={this.changePagination}>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="30">30</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                        <div className="sidebar__filters">
                            Order by Name
                            <div className="checkbox">
                                <input type="checkbox" name="name" id="name" onChange={this.orderBy}/>
                                <label htmlFor="name">Descending</label>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar__item">
                        <h2 className="sidebar__title">comics</h2>
                        <InputSearch onSearch={this.getData} placeHolder="Title starts with"/>
                        <div className="sidebar-comic-container">
                            { this.state.loading ? 'Loading ...' :
                                <React.Fragment>
                                    {this.state.data.map((comic) => {
                                        return comic.title ?
                                            <div key={comic.id} className="sidebar__filters sidebar__filters--comic">
                                                <a className="sidebar__link-comic" onClick={(e) => this.findByComic(e, comic.id)}>
                                                    {comic.title}
                                                </a>
                                                <a className="sidebar__link-view-comic" onClick={() => this.selectComic(comic)}><i className="material-icons">book</i></a>
                                            </div> : ''
                                    })}
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    <div className="sidebar__item">
                        <a className="sidebar__link-attribution" href="http://marvel.com" target="blank">{this.state.attribution}</a> <br />
                    </div>
                </div>
                <ComicModal data={this.state.comicSelected} close={this.closeModal}/>
            </React.Fragment>
        );
    }
}

export default Sidebar;