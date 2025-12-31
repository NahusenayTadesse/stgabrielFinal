<script lang="ts">
	import { MapPinIcon, PhoneIcon, MailIcon, HeartIcon } from '@lucide/svelte';
	import FooterSection from './footer-section.svelte';
	import SocialLinks from './social-link.svelte';
</script>

<footer class="mt-16 border-t bg-secondary/30">
	<div class="container mx-auto px-4 py-12">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Restaurant Info -->
			<FooterSection title="">
				<img src="/Logo.svg" alt="" />
				<p class="mb-4 text-sm text-muted-foreground">
					Authentic Ethiopian cuisine in the heart of London, serving traditional dishes with love
					and heritage.
				</p>
				<div class="space-y-2 text-sm">
					<a
						href="https://maps.app.goo.gl/ofx2Uc9TL9rmo9D3A"
						target="_blank"
						class="flex items-center gap-2"
					>
						<MapPinIcon class="h-4 w-4 text-primary" />
						<span>154 Newington Butts, Kennington, London SE11 4RN</span>
					</a>
					<a href="tel:+442075870199" target="_blank" class="flex items-center gap-2">
						<PhoneIcon class="h-4 w-4 text-primary" />
						<span>+44 20 7587 0199</span>
					</a>
					<a target="_blank" href="mailto:info@stgabrielcafe.com" class="flex items-center gap-2">
						<MailIcon class="h-4 w-4 text-primary" />
						<span>info@stgabrielcafe.com</span>
					</a>
				</div>
			</FooterSection>

			<!-- Opening Hours -->
			<FooterSection title="Opening Hours">
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span>Monday - Thursday</span>
						<span class="text-muted-foreground">12:00 - 22:00</span>
					</div>
					<div class="flex justify-between">
						<span>Friday - Saturday</span>
						<span class="text-muted-foreground">12:00 - 23:00</span>
					</div>
					<div class="flex justify-between">
						<span>Sunday</span>
						<span class="text-muted-foreground">13:00 - 21:00</span>
					</div>
				</div>
				<!-- <Badge variant="secondary" class="mt-4">Closed on major holidays</Badge> -->
			</FooterSection>

			<!-- Quick Links -->
			<FooterSection title="Quick Links">
				<div class="space-y-2 text-sm">
					<a href="/" class="block text-muted-foreground transition-colors hover:text-primary"
						>Home</a
					>
					<a href="/about" class="block text-muted-foreground transition-colors hover:text-primary"
						>About Us</a
					>
					<a href="/menu" class="block text-muted-foreground transition-colors hover:text-primary"
						>Our Menu</a
					>
					<a
						href="/booking"
						class="block text-muted-foreground transition-colors hover:text-primary">Book a Table</a
					>
					<a
						href="/contact"
						class="block text-muted-foreground transition-colors hover:text-primary">Contact Us</a
					>
				</div>
			</FooterSection>

			<!-- Social & Newsletter -->
			<FooterSection title="Stay Connected">
				<p class="mb-4 text-sm text-muted-foreground">
					Follow us for updates on special events and new dishes.
				</p>
				<SocialLinks />
				<!-- <div class="mt-6">
					<Badge variant="outline" class="w-full justify-center py-2">Ethiopian Cultural Events</Badge>
				</div> -->
			</FooterSection>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-8 border-t border-border/50 pt-8 text-center">
			<p class="flex items-center justify-center gap-1 text-sm text-muted-foreground">
				Made with <HeartIcon class="h-4 w-4 text-red-500" /> for the Ethiopian community in London
			</p>
			<p class="mt-2 text-xs text-muted-foreground">
				© {new Date().getFullYear()} St. Gabriel Ethiopian Delicatessen. All rights reserved.
			</p>
		</div>
	</div>
</footer>
