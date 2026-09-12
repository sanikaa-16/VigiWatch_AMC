/**
 * VigiWatch Edge Agent entry point.
 *
 * This process runs locally inside a customer's network. It is responsible for
 * discovering and talking to CCTV/DVR/NVR hardware via vendor-specific adapters,
 * normalizing health data, and reporting it to the VigiWatch cloud application.
 *
 * No business logic is implemented yet — this is structure only.
 */

function main(): void {
  // Bootstrap logic (config loading, adapter registration, health reporting loop)
  // will be implemented in a later step.
}

main();
