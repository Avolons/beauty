<template>
    <!--  -->
    <patient-Import
	 title="客户"
	 errLink="客户信息导入错误"
	 downLink="客户信息导入模板"
	></patient-Import>
</template>

<script>
import patientImport from './../commonCompent/dataInteraction/patientImpro.vue'
export default {
    components: {
        patientImport
    }
}
</script>


