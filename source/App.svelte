
<script>
    import {onMount} from 'svelte';
    
    import Rete from 'rete';
    import ConnectionPlugin from 'rete-connection-plugin';
    import SvelteRenderPlugin from 'rete-svelte-render-plugin';

    import {NumComponent} from './num.js';

    let container = null;

    onMount(async () => {
        const components = [new NumComponent()];

        const editor = new Rete.NodeEditor("demo@0.0.1", container);
        const engine = new Rete.Engine("demo@0.0.1");

        editor.use(ConnectionPlugin);
        editor.use(SvelteRenderPlugin);

        components.forEach((component) => {
            editor.register(component);
            engine.register(component);
        });

        let n1 = await components[0].createNode({num:1});
        let n2 = await components[0].createNode({num:2});

        n1.position = [80, 200];
        n2.position = [80, 400];

        editor.addNode(n1);
        editor.addNode(n2);

        const process = async() => {
            console.log('process');
            await engine.abort();
            await engine.process(editor.toJSON());
            console.log(editor.toJSON());
        };

        process();

        editor.on('process', process);
        editor.on('nodecreated', process);
        editor.on('noderemoved', process);
        editor.on('connectioncreated', process);
        editor.on('connectionremoved', process);
    });
</script>

<div class="rete" bind:this={container}></div>

<style>
    .rete {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
</style>
