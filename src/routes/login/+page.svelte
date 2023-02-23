<script lang="ts">
	import Button from '$components/Button.svelte';
</script>

<Button
	element="button"
	variant="danger">Warning</Button>
<Button
	element="a"
	href="/api/auth/login"
	variant="outline">Outline</Button>
<Button element="button">Solid</Button>
