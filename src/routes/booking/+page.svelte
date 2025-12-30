<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { CalendarIcon, UsersIcon, ClockIcon, CheckIcon, Loader } from "@lucide/svelte";
		import BookingInfo from "./booking-info.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Select, SelectContent, SelectItem, SelectTrigger } from "$lib/components/ui/select";
	import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover/index.js";
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { superForm } from 'sveltekit-superforms'
  import { reservationSchema, type ReservationInput } from './schema';
	import { cn } from "$lib/utils";
	import { zod4Client } from "sveltekit-superforms/adapters";

	let rows = 5
	let { data } = $props();

	const { form, errors, enhance, delayed } = superForm(data.form, {
		validators: zod4Client(reservationSchema)
	});

 let todayDate = today(getLocalTimeZone());

 let date = $state(new CalendarDate(todayDate.year, todayDate.month, todayDate.day));	

	const timeSlots = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

	const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

$effect(()=> {
	$form.date = date.toString();
})

	const bookingFeatures = ["Instant confirmation", "Special dietary requirements", "Group bookings welcome", "Flexible cancellation policy"];
</script>

<svelte:head>
	<title>Book a Table</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<HeroSection title="Book Your Table" 
	subtitle="Reserve Your Ethiopian Experience"
	 description="Secure your spot at St. Gabriel Ethiopian Delicatessen and prepare for an authentic culinary journey through the flavors of Ethiopia."
	  imageSrc="/images/photo (8).webp" />

	<!-- Booking Section -->
	<section class="py-16">
		<div class="container mx-auto px-4 max-w-6xl">
			<div class="text-center mb-12">
				<Badge variant="secondary" class="mb-4">Make a Reservation</Badge>
				<h2 class="text-3xl font-bold mb-6">Reserve Your Table</h2>
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto">Book your table in advance to ensure the best dining experience. We recommend reservations, especially for weekends and larger groups.</p>
			</div>

			<div class="grid lg:grid-cols-3 gap-8">
				<!-- Booking Form -->
				<div class="lg:col-span-2">
					{#snippet fe(
	label = '',
	name = '',
	type = '',
	placeholder = '',
	required = false,
	min = '',
	max = ''
)}
	<div class="flex w-full flex-col justify-start gap-2">
		<Label for={name}>{label}</Label>
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

<Card>
	<CardHeader>
		<CardTitle>Make a Reservation</CardTitle>
		<CardDescription>Fill in your details to book your table</CardDescription>
	</CardHeader>
	<CardContent class="space-y-6">
		<form  class="space-y-6" use:enhance method="post" >
			<!-- Date and Time Selection -->
				<!-- <div class="space-y-2">
					<Label>Date</Label>
					<Popover>
						<PopoverTrigger>
							{#snippet child({ props })}
								<Button variant="outline" class="w-full justify-start" {...props}>
									<CalendarIcon class="mr-2 h-4 w-4" />
									{selectedDate.toString()}
								</Button>
							{/snippet}
						</PopoverTrigger>
						<PopoverContent class="w-auto p-0" align="start">
							<Calendar type="single" bind:value={selectedDate} />
						</PopoverContent>
					</Popover>
				</div> -->

<div class="grid md:grid-cols-2 gap-4">
<div>
	<Label class="mb-2">Date</Label>
				<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({
        variant: "outline",
        class: "justify-start w-full"
      }),
      !date && "text-muted-foreground"
    )}
  >  
    <CalendarIcon /> {$form.date ? date.toString() : 'Select Appointment Date'}
   </Popover.Trigger>
    
  <Popover.Content class="p-0 flex flex-wrap gap-1 border-t px-2 ">
	
	{#each [{ label: "Today", value: 0 }, { label: "Tomorrow", value: 1 }, { label: "In a week", value: 7 }] as preset (preset.value)}
      <Button
        variant="outline"
        size="sm"
        class="flex-1"
        onclick={() => {
          date = todayDate?.add({ days: preset.value });
        }}
      >
        {preset.label}
      </Button>
    {/each}
    <Calendar type="single" minValue={todayDate}  bind:value={date} />

  </Popover.Content>
</Popover.Root>
	{#if $errors.date}
			<span class="text-red-500">{$errors.date}</span>
		{/if} 

		 <input type="hidden" name="date" bind:value={$form.date}>
		</div>

				<div class="space-y-2">
					<Label>Time</Label>
					<Select type="single" name="time" bind:value={$form.time}>
						<SelectTrigger class="w-full">
							<ClockIcon class="mr-2 h-4 w-4" />
							{$form.time}
						</SelectTrigger>
						<SelectContent>
							{#each timeSlots as time}
								<SelectItem value={time}>{time}</SelectItem>
							{/each}
						</SelectContent>
					</Select>
					{#if $errors.time}
			<span class="text-red-500">{$errors.time}</span>
		{/if}
				</div>

			<!-- Party Size -->
			<!-- <div class="space-y-2">
				<Label>Party Size</Label>
				<Select type="single" bind:value={$form.partySize}>
					<SelectTrigger class="w-full" >
						{$form.partySize}
						{$form.partySize === "1" ? "person" : "people"}
					</SelectTrigger>
					<SelectContent>
						{#each partySizes as size}
							<SelectItem value={size}>
								{size}
								{size === "1" ? "person" : "people"}
							</SelectItem>
						{/each}
					</SelectContent>
				</Select>
				{#if $errors.time}
			<span class="text-red-500">{$errors.time}</span>
		{/if} -->
			<!-- </div> -->

			<!-- Contact Information -->
				
                {@render fe('Number of Guests', 'partySize', 'number', 'Enter the number of your party', true, "1", "40")}
				{@render fe('Full Name', 'name', 'text', 'Enter Your Full Name', true )}
				{@render fe('Email', 'email', 'email', 'Enter Your Email', true )}
				{@render fe('Phone', 'phone', 'phone', '+44 20 10 10 10', true )}
				

			</div>

			<!-- Special Requests -->
			<div class="space-y-2">
				<Label for="requests">Special Requests</Label>
				<Textarea id="requests" bind:value={$form.specialRequests} 
				placeholder="Any dietary requirements, allergies, or special occasions..." 
				{rows}
		 />
				{#if $errors.specialRequests}
			<span class="text-red-500">{$errors.specialRequests}</span>
		{/if}
			</div>
		

			<!-- Submit Button -->
			<Button type="submit" class="w-full" size="lg">
				{#if $delayed}
					<Loader class="animate-spin" /> 

					Confirming Reservation...
				{:else}
				
				Confirm Reservation 
			 {/if} 
			</Button>
		</form>
	</CardContent>
</Card>

				</div>

				<!-- Booking Information -->
				<div class="space-y-6">
					<BookingInfo />

					<!-- Features -->
					<Card>
						<CardHeader>
							<CardTitle class="flex items-center gap-2">
								<CheckIcon class="w-5 h-5 text-primary" />
								Why Book With Us
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul class="space-y-3">
								{#each bookingFeatures as feature}
									<li class="flex items-center gap-2">
										<CheckIcon class="w-4 h-4 text-primary shrink-0" />
										<span class="text-sm">{feature}</span>
									</li>
								{/each}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<!-- Special Events -->
	<section class="py-16 bg-muted/30">
		<div class="container mx-auto px-4 max-w-4xl">
			<div class="text-center mb-8">
				<Badge variant="secondary" class="mb-4">Special Events</Badge>
				<h2 class="text-3xl font-bold mb-6">Private Dining & Events</h2>
				<p class="text-lg text-muted-foreground mb-8">Planning a special celebration? We offer private dining experiences and can accommodate groups for birthdays, corporate events, and cultural celebrations.</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<UsersIcon class="w-5 h-5 text-primary" />
							Group Dining
						</CardTitle>
						<CardDescription>Perfect for celebrations</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">Groups of 8+ can enjoy our special group menu with traditional Ethiopian sharing platters.</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<CalendarIcon class="w-5 h-5 text-primary" />
							Cultural Events
						</CardTitle>
						<CardDescription>Ethiopian celebrations</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">Join us for special Ethiopian holidays and cultural events throughout the year.</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2">
							<ClockIcon class="w-5 h-5 text-primary" />
							Coffee Ceremony
						</CardTitle>
						<CardDescription>Traditional experience</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">Book our traditional Ethiopian coffee ceremony for an authentic cultural experience.</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</div>
