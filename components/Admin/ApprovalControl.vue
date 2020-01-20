<template>
<div>
    <div class="btn-group border">
    <button v-if="initApproved" type="button" class="btn btn-success">Approved</button>
    <button v-if="!initApproved && !initRejected" type="button" class="btn btn-warning">Unapproved</button>
    <button v-if="initRejected && !initApproved" type="button" class="btn btn-danger">Rejected</button>


    <b-dropdown>
       <b-dropdown-item v-if="initApproved || initRejected" v-on:click="unapproveClicked" href="#">Unapprove</b-dropdown-item>
        <b-dropdown-item v-if="!initApproved || initRejected" v-on:click="approvedClicked">Approve</b-dropdown-item>
        <b-dropdown-item v-if="!initRejected"  v-on:click="rejectClicked">Reject</b-dropdown-item>
    </b-dropdown>
    </div>
    <input @keyup="reasonChanged" placeholder="Rejected Reason" v-model="rejectedReason" type="text" v-if="initRejected" >

</div>
</template>
<script>

    export default {
    data() {
      return {
          rejectedReason: null
      }
    },
    props: [
        'initApproved',
        'initRejected',
        'initRejectedReason'
    ],
    components: {
    },
    methods: {
        approvedClicked: function(){
            this.$emit('updated', 'approved')
        },
        unapproveClicked: function(){
            this.$emit('updated', 'unapproved')
        },
        rejectClicked: function(){
            this.$emit('updated', 'rejected')
        },
        reasonChanged: function(){
            this.$emit('reasonChanged', this.rejectedReason)
        }

    },
}
</script>
