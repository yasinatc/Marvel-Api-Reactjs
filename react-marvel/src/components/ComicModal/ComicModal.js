import React, { Component } from 'react'
import './ComicModal.css';

export default class ComicModal extends Component {

    convertDate = (date) => {
        const newDate = new Date(date);
        return newDate.toDateString();
    }

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                <div className={`comic-modal ${data ? '' : 'comic-modal--close'}`}>
                    <button className="comic-modal__button-close" onClick={this.props.close}>
                        <i className="material-icons">clear</i>
                    </button>
                    {data ?
                        <React.Fragment>
                            <div className="comic-modal__header">
                                <img className="comic-modal__image" src={`${data.thumbnail.path}/portrait_fantastic.${data.thumbnail.extension}`} alt={data.title} />
                                <h3 className="comic-modal__title">{data.title}</h3>
                                <div className="comic-header__content">
                                    <h6 className="comic-header__page">Pages: <span className="emphasize">{data.pageCount}</span> </h6>
                                    {data.description}
                                    <h5 className="comic-header__title-price">Prices</h5>
                                    <div className="comic-header__prices">
                                        {data.prices.map((el, index) => <div key={index}>{el.type}: <span className="emphasize">{el.price}</span></div>)}
                                    </div>
                                </div>
                                {data.urls.map((el, index) => <a key={index} className="comic-modal__link" href={el.url} target="blank">{el.type}</a>)}
                            </div>

                            <div className="comic-modal__content">
                                <div className="comic-modal__content-item comic-modal__content--creators">
                                    <h3 className="comic-modal__content-title">creators</h3>
                                    <h6 className="comic-modal__content-info">Available: <span className="emphasize">{data.creators.available}</span> </h6>
                                    <ul className="comic-modal__content-list">
                                        {data.creators.items.slice(0, 5).map((el, index) => <li key={index}><span className="emphasize">{el.role}</span>: {el.name}</li>)}
                                    </ul>
                                </div>
                                <div className="comic-modal__content-item comic-modal__content--characters">
                                    <h3 className="comic-modal__content-title">characters</h3>
                                    <h6 className="comic-modal__content-info">Available: <span className="emphasize">{data.characters.available}</span> </h6>
                                    <ul className="comic-modal__content-list">
                                        {data.characters.items.slice(0, 5).map((el, index) => <li key={index}>{el.name}</li>)}
                                    </ul>
                                </div>
                                <div className="comic-modal__content-item comic-modal__content--dates">
                                    <h3 className="comic-modal__content-title">dates</h3>
                                    <ul className="comic-modal__content-list">
                                        {data.dates.map((el, index) => <li key={index}>{el.type} - <span className="emphasize">{this.convertDate(el.date)}</span></li>)}
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment> : ''
                    }
                </div>
                {data ? <div className="backdrop" onClick={this.props.close}></div> : ''}
            </React.Fragment>
        );
    }
}
