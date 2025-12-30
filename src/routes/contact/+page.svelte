<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, NavigationIcon } from "@lucide/svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";

	const contactInfo = [
		{
			icon: MapPinIcon,
			title: "Address",
			details: ["154 Newington Butts", "Kennington, London", "SE11 4RN"],
		},
		{
			icon: PhoneIcon,
			title: "Phone",
			details: ["+44 20 7587 0199", "Available during opening hours"],
		},
		{
			icon: MailIcon,
			title: "Email",
			details: ["info@stgabrielcafe.co.uk", "We'll respond within 24 hours"],
		},
	];

	const openingHours = [
		{ day: "Monday - Thursday", hours: "12:00 PM - 10:00 PM" },
		{ day: "Friday - Saturday", hours: "12:00 PM - 11:00 PM" },
		{ day: "Sunday", hours: "1:00 PM - 9:00 PM" },
	];
</script>
<svelte:head>
	<title>Contact Us</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<HeroSection title="Visit Us" subtitle="Find St. Gabriel Ethiopian Delicatessen"
     description="Located in the heart of Camden, we're easily accessible and ready to welcome you with authentic Ethiopian hospitality." 
     imageSrc="/images/photo (5).webp" />

	<!-- Contact Information -->
	<section class="py-16">
		<div class="container mx-auto px-4 max-w-6xl">
			<div class="text-center mb-12">
				<Badge variant="secondary" class="mb-4">Get In Touch</Badge>
				<h2 class="text-3xl font-bold mb-6">Contact Information</h2>
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto">We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello.</p>
			</div>

			<div class="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-12">
				{#each contactInfo as info}
                <Card class="text-center hover:shadow-md transition-shadow">
	<CardHeader>
		<div class="w-12 h-12 bg-linear-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
			<info.icon class="w-6 h-6 text-white" />
		</div>
		<CardTitle>{info.title}</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2">
		{#each info.details as detail}
			<CardDescription class="text-base">
				{detail}
			</CardDescription>
		{/each}
	</CardContent>
</Card>

				{/each}
			</div>

			<!-- Opening Hours -->
			<div class="grid lg:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<ClockIcon class="w-5 h-5 text-primary" />
							Opening Hours
						</CardTitle>
						<CardDescription>We're open throughout the week to serve you</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						{#each openingHours as schedule}
							<div class="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
								<span class="font-medium">{schedule.day}</span>
								<span class="text-muted-foreground">{schedule.hours}</span>
							</div>
						{/each}
						<div class="pt-4">
							<Badge variant="secondary" class="w-full justify-center py-2">Closed on major holidays</Badge>
						</div>
					</CardContent>
				</Card>

				<!-- Location Map Placeholder -->
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2 justify-center">
							<NavigationIcon class="w-5 h-5 text-primary text-center" />
							Location
						</CardTitle>
						<CardDescription class="text-center">Find us in Newington Butts,  London</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
							<!-- <div class="text-center text-muted-foreground">
								<MapPinIcon class="w-12 h-12 mx-auto mb-2" />
								<p>Interactive Map</p>
								<p class="text-sm">Address: 154 Newington Butts, Kennington, London SE11 4RN</p>
							</div> -->
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586.1948662439825!2d-0.10431876516512212!3d51.49106374520244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760499b69c9663%3A0x30571e76b124eec6!2s154%20Newington%20Butts%2C%20London%20SE11%204RN%2C%20UK!5e0!3m2!1sen!2set!4v1763276947490!5m2!1sen!2set" width="600" height="450" style="border:0;"  title="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
						<div class="flex gap-2 justify-center items-center">
							<Button variant="outline" class="flex-1" target="_blank" href="https://maps.app.goo.gl/ZWrNA9PPqHZwrQfk7">
								<NavigationIcon class="w-4 h-4 mr-2" />
								Get Directions
							</Button>
							<Button variant="outline" class="flex-1" target="_blank" href="https://maps.app.goo.gl/ZWrNA9PPqHZwrQfk7">
								<MapPinIcon class="w-4 h-4 mr-2" />
								View on Map
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Transportation -->
	<section class="py-16 bg-muted/30">
		<div class="container mx-auto px-4 max-w-4xl">
			<div class="text-center mb-8">
				<Badge variant="secondary" class="mb-4">Getting Here</Badge>
				<h2 class="text-3xl font-bold mb-6">Transportation</h2>
			</div>

			<div class="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Public Transport</CardTitle>
						<CardDescription>Easy access via London's transport network</CardDescription>
					</CardHeader>
					<CardContent class="space-y-3">
						<div class="flex items-center gap-3">
							<Badge variant="outline">Tube</Badge>
							<span class="text-sm">Camden Town Station (5 min walk)</span>
						</div>
						<div class="flex items-center gap-3">
							<Badge variant="outline">Bus</Badge>
							<span class="text-sm">Routes 24, 27, 29, 134, 168</span>
						</div>
						<div class="flex items-center gap-3">
							<Badge variant="outline">Rail</Badge>
							<span class="text-sm">Camden Road Station (8 min walk)</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Parking</CardTitle>
						<CardDescription>Convenient parking options nearby</CardDescription>
					</CardHeader>
					<CardContent class="space-y-3">
						<div class="flex items-center gap-3">
							<Badge variant="outline">Street</Badge>
							<span class="text-sm">Metered parking available</span>
						</div>
						<div class="flex items-center gap-3">
							<Badge variant="outline">Car Park</Badge>
							<span class="text-sm">Camden Market Car Park (2 min walk)</span>
						</div>
						<div class="flex items-center gap-3">
							<Badge variant="outline">Evening</Badge>
							<span class="text-sm">Free parking after 6:30 PM</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</div>
