import React, {Component} from 'react';
import './product.css'
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service'
import Wishlist from '../wishlist/wishlist';

let ds=new DataService();
let ns = new NotificationService();
class Product extends Component{
    constructor(props){
        super(props);
        this.state = {onWishlist: ds.itemOnWishlist(this.product)}
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishlistChanged = this.onWishlistChanged.bind(this);
    }

    onButtonClicked = ()=>{
        if(this.state.onWishlist){
            ds.removeWishlistItem(this.props.product);
        } else {
            ds.addWishlistItem(this.props.product);
        }
    }

    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishlistChanged);
    }

    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishlistChanged(newWishlist){
        this.setState({onWishlist: ds.itemOnWishlist(this.props.product)})
    }

    render(){
        var btnClass;

        if (this.state.onWishlist){
            btnClass="btn btn-danger";
        } else {
            btnClass="btn btn-primary";
        }
        return(
            <div className="card product">
                <img className="card-img-top" src={this.props.product.imgUrl} alt="Product" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.product.title}</h5>
                    <p className="card-text">Price: {this.props.product.price}$</p>
                    <a href="#" onClick={()=> this.onButtonClicked()} className={btnClass}>{this.state.onWishlist?"Remove from wishlist":"Add to Wishlist"}</a>
                </div>
            </div>
        );
    }
}

export default Product;