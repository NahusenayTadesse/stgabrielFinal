<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import {  Heart, Leaf, User, ChefHat } from "@lucide/svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
    	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";


    const features = [
  {
    Image: Heart,
    title: "Authentic Heritage",
    description: "Every recipe honors traditional Ethiopian cooking methods and flavors passed down through generations."
  },
  {
    Image: Leaf,
    title: "Fresh Ingredients",
    description: "We source the finest, freshest ingredients to ensure every dish meets our high standards of quality."
  },
  {
    Image: User,
    title: "Community Focus",
    description: "Building connections and bringing people together through the shared experience of exceptional food."
  },
  {
    Image: ChefHat,
    title: "Culinary Excellence",
    description: "Our skilled chefs bring years of experience and passion to every dish they prepare."
  }
];


</script>
 <svelte:head>
	<title> About Us</title>
 </svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<HeroSection title="Our Story" subtitle="A Journey of Flavor, Heritage, and Community" description="From our humble beginnings to becoming London's beloved Ethiopian delicatessen, discover the passion and tradition behind every dish we serve." imageSrc="/images/injera.webp" />

	<!-- Story Section -->
	<section class="py-16 bg-muted/30">
		<div class="container mx-auto px-4 max-w-4xl">
			<div class="text-center mb-12">
				<Badge variant="secondary" class="mb-4">Our Heritage</Badge>
				<h2 class="text-3xl font-bold mb-6 text-secondary">Rooted in Tradition</h2>
				<p class="text-lg text-muted-foreground leading-relaxed">At St. Gabriel Ethiopian Delicatessen, our journey began with a passion for sharing the vibrant flavors and rich traditions of Ethiopia with the world. From our humble beginnings, we've grown into a beloved spot in London, where the community comes together to enjoy authentic, healthy, and delicious meals.</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 items-center">
				<div>
					<img src="/images/photo (7).webp" alt="Ethiopian traditional cooking" class="rounded-lg shadow-lg w-full" />
				</div>
				<div class="space-y-6">
					<h3 class="text-2xl font-semibold text-secondary">Crafted with Love</h3>
					<p class="text-muted-foreground">Every dish we serve is a tribute to our heritage, crafted with the freshest ingredients and a deep respect for the culinary arts of our homeland. We believe that food is more than sustenance—it's a bridge that connects cultures and brings people together.</p>
					<p class="text-muted-foreground">Our recipes have been passed down through generations, each one telling a story of tradition, family, and the rich culinary landscape of Ethiopia.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="py-16">
		<div class="container mx-auto px-4 max-w-6xl">
			<div class="text-center mb-12">
				<Badge variant="secondary" class="mb-4">Our Values</Badge>
				<h2 class="text-3xl font-bold mb-6 text-secondary">What Drives Us</h2>
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto">Our commitment goes beyond serving great food. We're dedicated to preserving tradition while building community.</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each features as {Image, title, description}}
                    
<Card class="text-center hover:shadow-lg transition-shadow">
	<CardHeader>
		<div class="w-12 h-12 bg-linear-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
			<Image class="w-6 h-6 text-white" />
		</div>
		<CardTitle class="text-xl text-secondary">{title}</CardTitle>
	</CardHeader>
	<CardContent>
		<CardDescription class="text-base leading-relaxed">
			{description}
		</CardDescription>
	</CardContent>
</Card>
                {/each}			 
			</div>
		</div>
	</section>

	<!-- Mission Section -->
	<section class="py-16 bg-primary/5">
		<div class="container mx-auto px-4 max-w-4xl text-center">
			<Badge variant="secondary" class="mb-4">Our Mission</Badge>
			<h2 class="text-3xl font-bold mb-6">Sharing Ethiopia with London</h2>
			<p class="text-lg text-muted-foreground leading-relaxed mb-8">We're more than just a restaurant—we're cultural ambassadors, sharing the warmth, hospitality, and incredible flavors of Ethiopia with our London community. Every meal is an invitation to experience the rich traditions and vibrant culture of our homeland.</p>
			<Card class="bg-linear-to-r from-primary/10 to-accent/10 border-primary/20">
				<CardContent class="p-8">
					<blockquote class="text-xl italic text-center">"Food is the thread that weaves communities together, and we're honored to be part of London's diverse culinary tapestry."</blockquote>
					<p class="text-sm text-muted-foreground mt-4">— The St. Gabriel Family</p>
				</CardContent>
			</Card>
		</div>
	</section>
</div>
