import {expect, it, describe,vi} from 'vitest'
import { render, screen } from '@testing-library/react';
import {Product} from './Product'; 
import userEvent from '@testing-library/user-event'; // for button testing
import axios from 'axios';

vi.mock('axios')

describe('Product component',()=>{
    it('displays the product details correctly',()=>{
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        const loadCart = vi.fn(); // vi.fn() create fake version of loadCart that doesn't do anything
        //for integration test or component testing we will use render()
        render(<Product product={product} loadCart={loadCart}/>)

        // screen is used to render fake web page
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument(); // for text test

        expect(screen.getByText('$10.90')).toBeInTheDocument();// text

        expect(screen.getByTestId('product-image')).toHaveAttribute('src','images/products/athletic-cotton-socks-6-pairs.jpg') //for image test

        expect(screen.getByTestId('rating-image')).toHaveAttribute('src',`images/ratings/rating-45.png`) //image
 
        expect(screen.getByText('87')).toBeInTheDocument(); //text
    });

    it('adds a product to the cart', async()=>{
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        const loadCart = vi.fn();

        render(<Product product={product} loadCart={loadCart}/>)

        const user = userEvent.setup();
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        )

        expect(loadCart).toHaveBeenCalled();
    });
});