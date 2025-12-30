<script>
	import Title from "./Title.svelte";
      import * as Carousel from "$lib/components/ui/carousel/index.js";


    let testimonials = [
        {    
            avatar: "/images/image1.webp",
            name: "John Doe",
            content: "Enjoyed a flavorful lamb casserole with injera. Friendly staff even offered a spoon when I struggled.",
            title: "Food Lover"
        },
        {
            avatar: "/images/image2.webp",
            name: "Jane Smith",
            content: "Such lovely food and staff! Everything felt so homely — my friend loved the food and it was her first time trying Ethiopian cuisine. Definitely authentic all around 😊",
            title: "Culinary Enthusiast"
        },
        {
            avatar: "/images/image3.webp",
            name: "Samuel Tadesse",
            content: "Staff could smile more, but great tasting food everytime.Parking: Depends which day you visit if parking is paid or freeStaff could smile more, but great tasting food everytime.Parking: Depends which day you visit if parking is paid or free",
            title: "Ethiopian Foodie"
        },
        {
            avatar: "/images/image3.webp",
            name: "Emily Johnson",
            content: "A hidden gem in London! The flavors were vibrant and the service was impeccable. I highly recommend the vegetarian platter; it was a delightful experience.",
            title: "Gourmet Explorer"
        }
    ];
</script>
<div class="w-full bg-accent">
<section class="pt-16 lg:w-9/10 justify-self-center lg:my-40 pb-36 my-16 lg:px-0 px-4 w-full flex flex-col gap-4">
    <Title  title="Testimonial" />

    <h3 class="text-foreground">Hear From Our Valued Customers</h3>
    <p>We love to hear from customers, so please leave a comment or say hello in an email.</p>

<Carousel.Root   opts={{
    align: "start"
  }}
  class="pb-4 relative" >
  <Carousel.Content >
    {#each testimonials as { avatar, name, content, title }}
    <Carousel.Item class="lg:basis-1/3 py-2">.
    <div class="flex flex-col items-start shadow-lg rounded-lg p-4 lg:h-96 h-auto">
        <div class="flex flex-row items-start gap-4 mb-4">
       <img src={avatar} alt="">
       <div>
         <h4 class="text-foreground mt-2">{name}</h4>
         <p class="text-gray-600">{title}</p>
         </div>
       </div>
      <blockquote class="flex">
        <p>{content}</p>
      </blockquote>
    </div>
    </Carousel.Item>
    {/each}

    </Carousel.Content> 


    <Carousel.Previous class="absolute left-0 z-10" variant="default" />
  <Carousel.Next class="absolute right-0 z-10" variant="default" />
</Carousel.Root>
</section>
</div>




  