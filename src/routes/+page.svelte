<script lang="ts">
	import { Breadcrumbs } from "$lib/classes/stores/Breadcrumbs.svelte";
	import * as Typo from "$lib/components/ui/typography";

	Breadcrumbs.instance.segments = [];
</script>

<Typo.H1>Welcome to Rustory!</Typo.H1>
<Typo.Leading>Your daily source of Vintage Story!</Typo.Leading>

<Typo.P>
	The app is still on early development and it's not really usable yet! If you're seeing this then you are probably a developer, tester or translator,
	if that's the case, hiiiI!
</Typo.P>

<Typo.P>
	I'm trying my best to finish the app as soon as possible while keeping it easy to use, bug free, developer friendly, optimized and... a lot of other
	cool things!
</Typo.P>

<Typo.P>If you have any suggestion feel free to share it here!</Typo.P>
