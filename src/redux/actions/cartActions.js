import axios from "axios";
import {ADD_LOCAL_CART, GET_REMOTE_CART} from "./actionTypes";
import Cookies from "universal-cookie";
import {clearPromocodes} from "./voucherActions";

const cookies = new Cookies();

export function addLocalCart(classItem) {
    return (dispatch, getState) => {
        let items = getState().cart.items;
        let status = false;

        let classItemDetail = {
            id: classItem.id,
            name: classItem.product.name,
            image_url: classItem.product.image_url,
            price: classItem.product.price,
            set: 0,
            is_set: false,
            product_id: classItem.id,
            type: classItem.type,
            sets: classItem.product.sets,
        };
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === classItem.id) {
                status = true;
            }
        }
        if (!status) {
            items.push(classItemDetail);
        }

        dispatch(importItemsToCart(items));
    };
}

export function importItemsToCart(items) {
    return {
        type: ADD_LOCAL_CART,
        data: {items: items},
    };
}

export function removeLocalCart(id) {
    return async (dispatch, getState) => {
        let items = getState().cart.items;
        let index = items.findIndex((x) => x.id === id);

        items.splice(index, 1);

        dispatch(importItemsToCart(items));
    };
}

export function getRemoteCart() {
    return async (dispatch, getState) => {
        const mainUrl = getState().settings.mainUrl;
        const user = getState().user.user;
        if (!user || !Object.keys(user).length) {
            const cartItems = [...(getState().cart.items || [])];

            return Promise.resolve({
                data: {
                    items: cartItems.map(item => {
                        const setPrice = item.set ? parseFloat(item.sets.find(s => s.id === item.set).price) : 0;

                        return {
                            ...item,
                            product: {
                                product: {
                                    name: item.name
                                }
                            },
                            price_set: parseFloat(item.price) + setPrice,
                        }
                    }),
                }
            })


        }
        let token = cookies.get("token");
        let response = await axios.get(`${mainUrl}/api/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    };
}

export function addRemoteCart(product_id, set, type) {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let token = cookies.get("token");
        let response = await axios.post(
            `${mainUrl}/api/cart`,
            {
                product_id,
                set,
                type,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    };
}

export function removeRemoteCart(cart_id) {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let token = cookies.get("token");
        await axios.delete(`${mainUrl}/api/cart/${cart_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };
}

export function loginCart() {
    return async (dispatch, getState) => {
        // let mainUrl = getState().settings.mainUrl;
        // let token = cookies.get('token');

        let localCarts = getState().cart.items;
        let remoteCarts = await dispatch(getRemoteCart());

        if (localCarts.length > 0) {
            await dispatch(cartClear());

            for (var i = 0; i < localCarts.length; i++) {
                await dispatch(
                    addRemoteCart(localCarts[i].id, localCarts[i].set, localCarts[i].type)
                );
            }
        } else {
        }
    };
}

export function cartClear() {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let token = cookies.get("token");
        let response = await axios.delete(`${mainUrl}/api/cart/clear`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(clearPromocodes());
        return response;
    };
}

export function changeCartIsSet(id, value) {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let token = cookies.get("token");
        let response = await axios.patch(
            `${mainUrl}/api/cart/change-attribute`,
            {
                cart_id: id,
                attribute: "set",
                value: value,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    };
}

export function getStripePublicKey() {
    return async (dispatch, getState) => {
        let mainUrl = getState().settings.mainUrl;
        let token = cookies.get("token");
        let response = await axios.get(`${mainUrl}/api/cart-stripe-public-key`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    };
}
