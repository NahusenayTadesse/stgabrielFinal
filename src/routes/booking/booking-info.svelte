<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { InfoIcon, PhoneIcon, ClockIcon } from "@lucide/svelte";
</script>

<div class="space-y-6">
	<!-- Booking Information -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<InfoIcon class="w-5 h-5 text-primary" />
				Booking Information
			</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="space-y-3 text-sm">
				<div class="flex items-start gap-2">
					<Badge variant="outline" class="mt-0.5">Note</Badge>
					<span class="text-muted-foreground">Reservations are recommended, especially for weekends and larger groups.</span>
				</div>
				<div class="flex items-start gap-2">
					<Badge variant="outline" class="mt-0.5">Policy</Badge>
					<span class="text-muted-foreground">Tables are held for 15 minutes past reservation time.</span>
				</div>
				<div class="flex items-start gap-2">
					<Badge variant="outline" class="mt-0.5">Groups</Badge>
					<span class="text-muted-foreground">Parties of 8+ may require a deposit and set menu.</span>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Contact for Booking -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<PhoneIcon class="w-5 h-5 text-primary" />
				Need Help?
			</CardTitle>
			<CardDescription>Contact us directly for assistance</CardDescription>
		</CardHeader>
		<CardContent class="space-y-3">
			<div class="text-sm">
				<p class="font-medium">Call us at:</p>
				<p class="text-muted-foreground">+44 20 7587 0199</p>
			</div>
			<div class="text-sm">
				<p class="font-medium">Email us at:</p>
				<p class="text-muted-foreground">info@stgabrielcafe.co.uk</p>
			</div>
		</CardContent>
	</Card>

	<!-- Opening Hours -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<ClockIcon class="w-5 h-5 text-primary" />
				Opening Hours
			</CardTitle>
		</CardHeader>
		<CardContent class="space-y-2 text-sm">
			<div class="flex justify-between">
				<span>Mon - Thu</span>
				<span class="text-muted-foreground">12:00 - 22:00</span>
			</div>
			<div class="flex justify-between">
				<span>Fri - Sat</span>
				<span class="text-muted-foreground">12:00 - 23:00</span>
			</div>
			<div class="flex justify-between">
				<span>Sunday</span>
				<span class="text-muted-foreground">13:00 - 21:00</span>
			</div>
		</CardContent>
	</Card>
</div>
