<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
		description: string;
		imageSrc: string;
	}

	let { title, subtitle, description, imageSrc }: Props = $props();
</script>

<section class="relative py-20 lg:py-32 overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img src={imageSrc} alt="Hero background" class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-black/50"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-4 text-center text-white">
		<div class="max-w-4xl mx-auto">
			<h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
				{title}
			</h1>
			<p class="text-xl md:text-2xl mb-6 text-white/90">
				{subtitle}
			</p>
			<p class="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
				{description}
			</p>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div class="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
	<div class="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
</section>
