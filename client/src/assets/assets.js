import logo from './logo.png'
import video_banner from './home-page-banner.mp4'
import people from './people.png';
import people_org from './people-org.png';
import credits from './dollar.png';
import animals from './animals.png';
import animals_org from './animals-org.jpg';
import cars from './cars.png';
import cars_org from './cars-org.jpg';
import graphics from './graphics.png';
import graphics_org from './graphics-org.jpg';
import products from './products.png';
import products_org from './products-org.jpg';


export const assets = {
    logo,
    video_banner,
    people,
    people_org,
    credits,
    products,
    products_org,
    animals,
    animals_org,
    cars,
    cars_org,
    graphics,
    graphics_org  
}

export const steps = [
    {
        step: "Step 1",
        title: "Select an image",
        description:  ` First, choose the image you want to remove background from by clicking on "Start from a photo". Your image format can be PNG or JPG. We support all image dimensions.`        
        
    },
    {
        step: "Step 2",
        title: "Let magic remove the background",
        description: `Our tool automatically removes the background from your image. Next, you can choose a background color. Our most popular options are white and transparent backgrounds, but you can pick any color you like.`
    },

    {
        step: "Step 3",
        title: "Download you image",
        description: `After selecting a new background color, download you photo and you're done! You can also save you picture in the Photoroom App by creating an account`
    }
]

export const categories = ["People", "Products", "Animals", "Cars", "Graphics"];

export const plans = [
    {
        id: "Basic",
        name: "Basic Package",
        price: "499",
        credits: "100 Credits",
        description: "Best for personal use",
        popular: false
    },

    {
        id: "Premium",
        name: "Premium Package",
        price: 899,
        credits: "250 Credits",
        description: "Best for business use",
        popular: true
    }, 

    {
        id: "Ultimate",
        name: "Ultimate Package",
        price: 1499,
        credits: "1000 Credits",
        description: "Best for enterprise use",
        popular: false
    }
]

export const testimonials = [
    {
        id: 1,
        quote: "We are impressed by the AI and think it's the best choice on the market.",
        author: "Sadhik Binginapalli",
        handle: "@_sadhik_"
    },
    {
        id: 2,
        quote: "remove.bg is leaps and bounds ahead of the competition. A thousand times better. It simplified the whhole process",
        author: "Rushi Kaja",
        handle: "@rushi_kn"
    },
    {
        id: 3,
        quote: "We were inpressed by its abiltiy to account for pesky, feathery hair without making an image look jagged and amateurish",
        author: "Ranga Sai",
        handle: "@ranga_sai"
    }
]

export const footerConstants = [
    {
        url: "https://github.com/DevendraChakrieswar",
        logo: "https://img.icons8.com/fluent/300/github.png"
    },
    {
        url: "https://www.linkedin.com/in/chitroju-devendra-chakrieswar-12986628a/",
        logo: "https://img.icons8.com/fluent/300/linkedin-2.png"
    },
    {
        url: "",
        logo: "https://img.icons8.com/fluent/300/instagram-new.png"
    }
]

