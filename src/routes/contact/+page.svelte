<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		MapPinIcon,
		ChevronRight,
		PhoneIcon,
		MailIcon,
		ClockIcon,
		NavigationIcon
	} from '@lucide/svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';

	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input/index';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import Errors from '$lib/formComponents/Errors.svelte';
	import { schema } from './schema';
	const contactInfo = [
		{
			icon: MapPinIcon,
			title: 'Address',
			details: ['154 Newington Butts', 'Kennington, London', 'SE11 4RN']
		},
		{
			icon: PhoneIcon,
			title: 'Phone',
			details: ['+44 20 7587 0199', 'Available during opening hours']
		},
		{
			icon: MailIcon,
			title: 'Email',
			details: ['info@stgabrielcafe.co.uk', "We'll respond within 24 hours"]
		}
	];
	let { data } = $props();
	const openingHours = [
		{ day: 'Monday - Thursday', hours: '12:00 PM - 10:00 PM' },
		{ day: 'Friday - Saturday', hours: '12:00 PM - 11:00 PM' },
		{ day: 'Sunday', hours: '1:00 PM - 9:00 PM' }
	];

	const { form, errors, enhance, delayed, allErrors } = superForm(data.form, {
		resetForm: true,
		validators: zod4Client(schema)
	});
</script>

<svelte:head>
	<title>Contact Us</title>
</svelte:head>
{#snippet fe(
	label = '',
	name = '',
	type = '',
	placeholder = '',
	required = false,
	min = '',

	max = ''
)}
	<div class="flex w-auto flex-col justify-start gap-2 lg:w-full">
		<Input
			{type}
			{name}
			{placeholder}
			{required}
			{min}
			{max}
			bind:value={$form[name]}
			aria-invalid={$errors[name] ? 'true' : undefined}
		/>
		{#if $errors[name]}
			<span class="text-red-500">{$errors[name]}</span>
		{/if}
	</div>
{/snippet}

<div class="min-h-screen">
	<!-- Hero Section -->
	<HeroSection
		title="Visit Us"
		subtitle="Find St. Gabriel Ethiopian Delicatessen"
		description="Located in the heart of Camden, we're easily accessible and ready to welcome you with authentic Ethiopian hospitality."
		imageSrc="/images/photo (5).webp"
	/>

	<!-- Contact Information -->
	<section class="py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<Badge variant="secondary" class="mb-4">Get In Touch</Badge>
				<h2 class="mb-6 text-3xl font-bold">Contact Information</h2>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello.
				</p>
			</div>

			<div class="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
				{#each contactInfo as info}
					<Card class="text-center transition-shadow hover:shadow-md">
						<CardHeader>
							<div
								class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-secondary to-accent"
							>
								<info.icon class="h-6 w-6 text-white" />
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
			<div class="grid gap-8 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<ClockIcon class="h-5 w-5 text-primary" />
							Opening Hours
						</CardTitle>
						<CardDescription>We're open throughout the week to serve you</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<form
							action="?/addMessage"
							method="post"
							id="main"
							use:enhance
							class="flex w-full flex-col gap-4 lg:w-md"
						>
							<Errors allErrors={$allErrors} />

							{@render fe('Your Name', 'name', 'text', 'Your Name', true)}
							{@render fe('Your Name', 'phone', 'tel', '+251 XXXXXXXX', '+251 XXXXXXXX', true)}
							{@render fe('Your Name', 'email', 'email', 'Your Email', true)}

							<Textarea
								name="message"
								id=""
								bind:value={$form.message}
								aria-invalid={$errors.message ? 'true' : undefined}
								placeholder="Write Message"
							/>
							{#if $errors.message}
								<span class="text-red-500">{$errors.message}</span>
							{/if}

							<Button type="submit" class="mt-4" form="main">
								{#if $delayed}
									Sending Message
									<Loader class="animate-spin" />
								{:else}
									Send Message
									<ChevronRight class="h-6 w-6" />
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>

				<!-- Location Map Placeholder -->
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center justify-center gap-2">
							<NavigationIcon class="h-5 w-5 text-center text-primary" />
							Location
						</CardTitle>
						<CardDescription class="text-center">Find us in Newington Butts, London</CardDescription
						>
					</CardHeader>
					<CardContent>
						<div class="mb-4 flex h-64 items-center justify-center rounded-lg bg-muted">
							<!-- <div class="text-center text-muted-foreground">
								<MapPinIcon class="w-12 h-12 mx-auto mb-2" />
								<p>Interactive Map</p>
								<p class="text-sm">Address: 154 Newington Butts, Kennington, London SE11 4RN</p>
							</div> -->
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586.1948662439825!2d-0.10431876516512212!3d51.49106374520244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760499b69c9663%3A0x30571e76b124eec6!2s154%20Newington%20Butts%2C%20London%20SE11%204RN%2C%20UK!5e0!3m2!1sen!2set!4v1763276947490!5m2!1sen!2set"
								width="600"
								height="450"
								style="border:0;"
								title="map"
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
						<div class="flex items-center justify-center gap-2">
							<Button
								variant="outline"
								class="flex-1"
								target="_blank"
								href="https://maps.app.goo.gl/ZWrNA9PPqHZwrQfk7"
							>
								<NavigationIcon class="mr-2 h-4 w-4" />
								Get Directions
							</Button>
							<Button
								variant="outline"
								class="flex-1"
								target="_blank"
								href="https://maps.app.goo.gl/ZWrNA9PPqHZwrQfk7"
							>
								<MapPinIcon class="mr-2 h-4 w-4" />
								View on Map
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Transportation -->
	<section class="bg-muted/30 py-16">
		<div class="container mx-auto max-w-9/10 px-4">
			<div class="mb-8 text-center">
				<Badge variant="secondary" class="mb-4">Getting Here</Badge>
				<h2 class="mb-6 text-3xl font-bold">Transportation</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
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

				<Card>
					<CardHeader>
						<CardTitle>Parking</CardTitle>
						<CardDescription>Convenient parking options nearby</CardDescription>
					</CardHeader>
					<CardContent class="space-y-3">
						{#each openingHours as schedule}
							<div
								class="flex items-center justify-between border-b border-border/50 py-2 last:border-b-0"
							>
								<span class="font-medium">{schedule.day}</span>
								<span class="text-muted-foreground">{schedule.hours}</span>
							</div>
						{/each}
						<div class="pt-4">
							<Badge variant="secondary" class="w-full justify-center py-2"
								>Closed on major holidays</Badge
							>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</div>
